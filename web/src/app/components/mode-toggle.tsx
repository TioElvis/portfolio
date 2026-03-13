"use client";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      className="h-10 w-10 rounded-full border"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      suppressHydrationWarning>
      <IconSun className="size-4 dark:block hidden" suppressHydrationWarning />
      <IconMoon className="size-4 dark:hidden block" suppressHydrationWarning />
    </Button>
  );
}
