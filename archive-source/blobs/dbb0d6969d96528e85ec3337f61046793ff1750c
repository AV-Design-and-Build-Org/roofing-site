"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  pendingLabel?: string;
};

export function SubmitButton({ children, className, pendingLabel, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button {...props} className={className} disabled={pending || props.disabled} type={props.type ?? "submit"}>
      {pending ? pendingLabel ?? "Working…" : children}
    </button>
  );
}
