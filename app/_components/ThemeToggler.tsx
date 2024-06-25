"use client";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [themeState, setThemeState] = React.useState<any>(theme);

  useEffect(() => {
    setTheme(themeState);
    console.log(themeState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeState]);
  return (
    <div className="flex items-center justify-center">
      <label htmlFor="theme">
        <Sun className="text-muted-foreground" />
      </label>
      <Switch
        className="mx-4"
        id="theme"
        checked={themeState === "dark"}
        onCheckedChange={(checked) => setThemeState(checked ? "dark" : "light")}
      />
      <label htmlFor="theme">
        <Moon className="text-muted-foreground" />
      </label>
    </div>
  );
}
