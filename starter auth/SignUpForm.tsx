"use client";
import React, { useActionState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { filterError } from "@/lib/helpers";

export default function SignUpForm() {
  const router = useRouter();

  const [error, submitAction, isPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      try {
        const name = formData.get("name");
        const code = formData.get("code");
        const password = formData.get("pass");

        await axios.post("/api/auth/signup", {
          name,
          code,
          password,
        });
        toast.success("Sign up successful");
        router.push("/");
      } catch (error: unknown) {
        toast.error(filterError(error));
        return null;
      }
    },
    null
  );

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="hidden">{error}</div>
    </div>
  );
}
