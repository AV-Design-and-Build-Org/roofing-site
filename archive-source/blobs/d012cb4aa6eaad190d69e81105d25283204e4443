"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            auto_select?: boolean;
            callback: (response: { credential: string }) => void;
            client_id: string;
            hd?: string;
          }) => void;
          prompt: () => void;
          renderButton: (
            element: HTMLElement,
            options: {
              logo_alignment?: "left" | "center";
              shape?: "pill" | "rectangular" | "square";
              size?: "large" | "medium" | "small";
              text?: "continue_with" | "signin_with";
              theme?: "filled_black" | "filled_blue" | "outline";
              width?: number;
            },
          ) => void;
        };
      };
    };
  }
}

type GoogleSignInProps = {
  clientId: string;
  hostedDomain?: string;
};

export function GoogleSignIn({ clientId, hostedDomain }: GoogleSignInProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoaded || !buttonRef.current || !window.google) {
      return;
    }

    buttonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: clientId,
      auto_select: true,
      ...(hostedDomain ? { hd: hostedDomain } : {}),
      callback: async ({ credential }) => {
        try {
          setIsSubmitting(true);
          setErrorMessage(null);

          const response = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential }),
          });

          const payload = (await response.json().catch(() => null)) as { error?: string } | null;

          if (!response.ok) {
            setErrorMessage(payload?.error ?? "Google login failed.");
            return;
          }

          router.refresh();
        } catch {
          setErrorMessage("Google login failed.");
        } finally {
          setIsSubmitting(false);
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "filled_black",
      size: "large",
      shape: "pill",
      text: "continue_with",
      logo_alignment: "left",
      width: 320,
    });

    window.google.accounts.id.prompt();
  }, [clientId, hostedDomain, isLoaded, router]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setIsLoaded(true)} />
      <div className="min-h-12" ref={buttonRef} />
      {isSubmitting ? <p className="mt-3 text-sm text-[color:var(--muted-ink)]">Verifying your Google account…</p> : null}
      {errorMessage ? <p className="mt-3 text-sm text-[color:var(--danger)]">{errorMessage}</p> : null}
    </>
  );
}
