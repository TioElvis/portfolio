"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [active, setActive] = useState("");

  const right = useTransform(scrollY, [0, 300], ["1rem", "50%"]);
  const x = useTransform(scrollY, [0, 300], ["0%", "50%"]);

  return (
    <motion.nav
      className="fixed z-50 top-4 right-0 flex items-center gap-2"
      style={{ right, x }}>
      <div className="flex items-center gap-0.5 border bg-background rounded-full p-1">
        {["About", "Work", "Contact"].map((e) => (
          <Button
            variant={active === e ? "default" : "fill-up"}
            className="p-4 rounded-2xl"
            key={e}
            onClick={() => setActive(e)}>
            <span className="text-xs">{e}</span>
          </Button>
        ))}
      </div>
      <ModeToggle />
    </motion.nav>
  );
}
