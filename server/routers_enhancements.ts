import { protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getTrendingMoods, getUserWatchlist, addToWatchlist, removeFromWatchlist } from "./db_enhancements";

export const enhancementRouters = {
  watchlist: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const watchlist = await getUserWatchlist(ctx.user.id);
      return { watchlist };
    }),

    add: protectedProcedure
      .input(z.object({
        movie: z.object({
          title: z.string(),
          genre: z.string(),
          synopsis: z.string(),
          rating: z.number(),
          poster: z.string(),
          streamingPlatforms: z.array(z.string()),
        })
      }))
      .mutation(async ({ ctx, input }) => {
        const success = await addToWatchlist(ctx.user.id, input.movie);
        return { success };
      }),

    remove: protectedProcedure
      .input(z.object({ movieTitle: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const success = await removeFromWatchlist(ctx.user.id, input.movieTitle);
        return { success };
      }),
  }),

  trending: router({
    getMoods: protectedProcedure.query(async ({ ctx }) => {
      const moods = await getTrendingMoods(ctx.user.id);
      return { moods };
    }),
  }),
};
