import { supabase } from '@/lib/supabase';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    data: { user: User | null; session: Session | null } | null;
    error: AuthError | null;
  }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{
    data: { user: User | null; session: Session | null } | null;
    error: AuthError | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    data: Record<string, never> | null;
    error: AuthError | null;
  }>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get session from Supabase auth
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      console.error('Supabase is not configured');
      return {
        data: null,
        error: { message: 'Supabase is not configured' } as AuthError,
      };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      console.error('Supabase is not configured');
      return {
        data: null,
        error: { message: 'Supabase is not configured' } as AuthError,
      };
    }
    return supabase.auth.signUp({ email, password });
  };

  // Sign out
  const signOut = async () => {
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  // Reset password
  const resetPassword = async (email: string) => {
    if (!supabase) {
      console.error('Supabase is not configured');
      return {
        data: null,
        error: { message: 'Supabase is not configured' } as AuthError,
      };
    }
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
