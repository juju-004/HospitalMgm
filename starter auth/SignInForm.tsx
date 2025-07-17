"use client";
import { filterError } from "@/lib/helpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();

  const [error, submitAction, isPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      try {
        const code = formData.get("code");
        const password = formData.get("pass");

        await axios.post("/api/auth/signin", {
          code,
          password,
        });
        toast.success("Sign in successful");
        router.push("/");
      } catch (error: unknown) {
        toast.error(filterError(error));
        return null;
      }
    },
    null
  );

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="hidden">{error}</div>  
    </div>
  );
}
