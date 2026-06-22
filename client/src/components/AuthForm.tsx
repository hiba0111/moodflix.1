import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export default function AuthForm() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signUp") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name: name || email.split("@")[0] } },
        });
        if (error) throw error;
        toast.success("Account created! You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="bg-card border-border p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome to Moodflix</h1>
        <p className="text-muted-foreground mb-6 text-center">
          {mode === "signIn" ? "Sign in to discover movies based on your mood" : "Create an account to get started"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signUp" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === "signIn" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <button
          onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
          className="w-full text-sm text-primary hover:underline mt-4 text-center"
        >
          {mode === "signIn" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </Card>
    </div>
  );
}
