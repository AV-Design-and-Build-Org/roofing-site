import { NextResponse } from "next/server";
import { setSessionCookie, verifyGoogleCredential } from "@/lib/attendance/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { credential?: string };
    const credential = body.credential?.trim();

    if (!credential) {
      return NextResponse.json({ error: "Google credential is required." }, { status: 400 });
    }

    const user = await verifyGoogleCredential(credential);
    await setSessionCookie(user);

    return NextResponse.json({
      ok: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Google sign-in failed." },
      { status: 400 },
    );
  }
}
