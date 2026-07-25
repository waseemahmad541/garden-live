"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "@/components/ui/button";

export function LogoutButton(props: Omit<ButtonProps, "onClick" | "leftIcon">) {
  return (
    <Button
      variant="secondary"
      leftIcon={<LogOut className="h-4 w-4" />}
      onClick={() => signOut({ callbackUrl: "/login" })}
      {...props}
    >
      Logout
    </Button>
  );
}
