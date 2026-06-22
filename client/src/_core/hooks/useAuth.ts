import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

type AuthUser = {
  name: string;
  email: string | null;
};

function mapUser(session: Session | null): AuthUser | null {
  if (!session?.user) return null;
  const meta = session.user.user_metadata as { name?: string } | undefined;
  return {
    name: meta?.name || session.user.email?.split("@")[0] || "User",
    email: session.user.email ?? null,
  };
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
  }, []);

  return {
    user: mapUser(session),
    loading,
    error: null,
    isAuthenticated: Boolean(session),
    refresh: async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    },
    logout,
  };
}
