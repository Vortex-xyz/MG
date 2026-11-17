import { authClient } from "@/lib/auth/client";

const BEARER_KEY = "grok-auth.bearer-token";

type SessionPayload = { token?: string | null };

export function rememberSession(token: string | null | undefined) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.sessionStorage.setItem(BEARER_KEY, token);
    else window.sessionStorage.removeItem(BEARER_KEY);
  } catch {
    /* storage unavailable */
  }
}

export async function signInWithEmail(email: string, password: string) {
  const result = await authClient.signIn.email({ email, password });
  if (result.error) throw new Error(result.error.message ?? "Could not sign in");
  rememberSession((result.data as SessionPayload | null)?.token);
  await authClient.getSession();
}

export async function registerWithEmail(email: string, password: string) {
  const name = email.split("@")[0]?.slice(0, 40) || "Member";
  const result = await authClient.signUp.email({ email, password, name });
  if (result.error) throw new Error(result.error.message ?? "Could not create the account");
  rememberSession((result.data as SessionPayload | null)?.token);
  await authClient.getSession();
}

export async function replaceSession(token: string) {
  try {
    await authClient.signOut();
  } catch {
    /* a signed-out visitor has nothing to clear */
  }
  rememberSession(null);
  rememberSession(token);
  await authClient.getSession();
}
