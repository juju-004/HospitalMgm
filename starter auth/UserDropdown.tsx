"use client";
import React, { useTransition } from "react";
import { filterError } from "@/lib/helpers";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

export default function UserDropdown() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const session = useSession();

  const signOut = () => {
    startTransition(async () => {
      try {
        await axios.post("/api/auth/signout");
        toast.success("Signout successful");
        router.replace("/signin");
      } catch (error) {
        toast.error(filterError(error));
      }
      return;
    });
  };
}
