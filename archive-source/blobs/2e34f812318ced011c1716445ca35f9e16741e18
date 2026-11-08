import { createHmac, createPublicKey, randomUUID, timingSafeEqual, verify as verifySignature } from "node:crypto";
import { cookies } from "next/headers";
import { attendanceConfig, SESSION_COOKIE_NAME, isProduction } from "@/lib/attendance/config";
import { getUserById, upsertGoogleUser } from "@/lib/attendance/store";
import type { UserRecord } from "@/lib/attendance/types";

type SessionPayload = {
  userId: string;
  exp: number;
  nonce: string;
};

type GoogleTokenHeader = {
  alg: string;
  kid?: string;
  typ?: string;
};

type GoogleTokenPayload = {
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  hd?: string;
  iss: string;
  name?: string;
  picture?: string;
  sub: string;
};

type GoogleJwk = {
  alg?: string;
  e: string;
  kid: string;
  kty: "RSA";
  n: string;
  use?: string;
};

let googleKeyCache: { expiresAt: number; keys: GoogleJwk[] } | null = null;

function decodeBase64Url(value: string): Buffer {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Buffer.from(padded, "base64");
}

function parseJson<T>(value: string): T {
  return JSON.parse(value) as T;
}

async function getGoogleKeys(): Promise<GoogleJwk[]> {
  if (googleKeyCache && googleKeyCache.expiresAt > Date.now()) {
    return googleKeyCache.keys;
  }

  const response = await fetch("https://www.googleapis.com/oauth2/v3/certs", {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Unable to load Google signing keys.");
  }

  const cacheControl = response.headers.get("cache-control") ?? "";
  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
  const maxAge = maxAgeMatch ? Number(maxAgeMatch[1]) : 3600;
  const data = parseJson<{ keys: GoogleJwk[] }>(await response.text());

  googleKeyCache = {
    expiresAt: Date.now() + maxAge * 1000,
    keys: data.keys,
  };

  return data.keys;
}

function signValue(value: string): string {
  return createHmac("sha256", attendanceConfig.sessionSecret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

async function encodeSession(userId: string): Promise<string> {
  const payload: SessionPayload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + attendanceConfig.sessionDays * 24 * 60 * 60,
    nonce: randomUUID(),
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signValue(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

async function decodeSession(value: string): Promise<SessionPayload | null> {
  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  const payload = parseJson<SessionPayload>(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  if (payload.exp * 1000 <= Date.now()) {
    return null;
  }

  return payload;
}

export async function setSessionCookie(user: UserRecord): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = await encodeSession(user.id);

  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    maxAge: attendanceConfig.sessionDays * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });
}

export async function getSessionUser(): Promise<UserRecord | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  const payload = await decodeSession(sessionToken);
  if (!payload) {
    return null;
  }

  return getUserById(payload.userId);
}

export async function getAdminSessionUser(): Promise<UserRecord | null> {
  const user = await getSessionUser();
  return user?.role === "admin" ? user : null;
}

export async function verifyGoogleCredential(credential: string): Promise<UserRecord> {
  if (!attendanceConfig.googleClientId) {
    throw new Error("Google login is not configured.");
  }

  const [headerEncoded, payloadEncoded, signatureEncoded] = credential.split(".");
  if (!headerEncoded || !payloadEncoded || !signatureEncoded) {
    throw new Error("Invalid Google credential.");
  }

  const header = parseJson<GoogleTokenHeader>(decodeBase64Url(headerEncoded).toString("utf8"));
  const payload = parseJson<GoogleTokenPayload>(decodeBase64Url(payloadEncoded).toString("utf8"));

  if (header.alg !== "RS256") {
    throw new Error("Unsupported Google credential algorithm.");
  }

  const keys = await getGoogleKeys();
  const jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) {
    throw new Error("Google signing key was not found.");
  }

  const publicKey = createPublicKey({ key: jwk, format: "jwk" });
  const verified = verifySignature(
    "RSA-SHA256",
    Buffer.from(`${headerEncoded}.${payloadEncoded}`),
    publicKey,
    decodeBase64Url(signatureEncoded),
  );

  if (!verified) {
    throw new Error("Google credential signature validation failed.");
  }

  if (!payload.email_verified) {
    throw new Error("Google account email is not verified.");
  }

  if (!payload.email) {
    throw new Error("Google account email is missing.");
  }

  if (!payload.sub) {
    throw new Error("Google subject is missing.");
  }

  if (payload.exp * 1000 <= Date.now()) {
    throw new Error("Google credential has expired.");
  }

  if (payload.aud !== attendanceConfig.googleClientId) {
    throw new Error("Google credential audience does not match this app.");
  }

  if (!["accounts.google.com", "https://accounts.google.com"].includes(payload.iss)) {
    throw new Error("Google credential issuer is invalid.");
  }

  if (attendanceConfig.googleHostedDomain) {
    if (payload.hd?.toLowerCase() !== attendanceConfig.googleHostedDomain) {
      throw new Error(`Only ${attendanceConfig.googleHostedDomain} Google accounts are allowed.`);
    }
  }

  return upsertGoogleUser({
    googleSub: payload.sub,
    email: payload.email,
    name: payload.name ?? payload.email,
    picture: payload.picture ?? null,
  });
}
