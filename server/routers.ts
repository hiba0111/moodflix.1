import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { saveMovieRecommendation, saveMoodHistory } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  recommendations: router({
    getMovies: protectedProcedure
      .input(z.object({ mood: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        try {
          await saveMoodHistory(ctx.user.id, input.mood);

          const systemPrompt = "You are a movie recommendation expert. When given a mood, recommend exactly 6 movies that match that mood. Include hidden gems and lesser-known films alongside popular ones. Return ONLY a valid JSON array with no markdown formatting, no code blocks, and no additional text. Each movie object must have these exact fields: title (string), genre (string), synopsis (string, 1-2 sentences), rating (number 0-10), poster (string, a valid image URL), streamingPlatforms (array of strings like Netflix, Prime Video, Hulu, Disney+, HBO Max, Apple TV+).";
          
          const userPrompt = `Recommend 6 movies for someone feeling: ${input.mood}. Return ONLY the JSON array, nothing else.`;

          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "movie_recommendations",
                strict: true,
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      genre: { type: "string" },
                      synopsis: { type: "string" },
                      rating: { type: "number" },
                      poster: { type: "string" },
                      streamingPlatforms: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: [
                      "title",
                      "genre",
                      "synopsis",
                      "rating",
                      "poster",
                      "streamingPlatforms",
                    ],
                    additionalProperties: false,
                  },
                },
              },
            },
          });

          const content = response.choices[0]?.message.content;
          if (!content) {
            throw new Error("No content in LLM response");
          }

          let movies;
          try {
            const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
            movies = JSON.parse(contentStr);
          } catch (parseError) {
            console.error("Failed to parse LLM response:", content);
            throw new Error("Invalid JSON response from LLM");
          }

          if (!Array.isArray(movies) || movies.length === 0) {
            throw new Error("Invalid movies array from LLM");
          }

          await saveMovieRecommendation(ctx.user.id, input.mood, movies);

          return { movies, mood: input.mood };
        } catch (error) {
          console.error("Error getting recommendations:", error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
