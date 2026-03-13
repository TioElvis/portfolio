import { Fragment } from "react/jsx-runtime";
import { IconChevronDown } from "@tabler/icons-react";

import { Navbar } from "./components/navbar";

export default function Page() {
  return (
    <Fragment>
      <Navbar />
      {/* HERO */}
      <section className="relative min-h-screen grid place-items-center">
        <header className="absolute top-4 left-4 hidden sm:block">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">🇻🇪</div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold tracking-[0.15em] text-muted-foreground">
                FULL STACK DEVE
              </span>
              <span className="text-[9px] font-bold tracking-[0.15em] text-primary">
                BUILDING THE FUTURE
              </span>
            </div>
          </div>
        </header>
        <div className="text-center">
          <h1 className="text-8xl sm:text-[8rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-black text-caracas">
            TioElvis
          </h1>
          <h3 className="font-light uppercase text-xl md:text-2xl tracking-widest">
            Full stack developer
          </h3>
        </div>
        <div className="absolute bottom-24 flex flex-col items-center text-muted-foreground">
          <IconChevronDown className="animate-bounce" />
        </div>
      </section>
      {/* ABOUT */}
      <main className="relative min-h-screen"></main>
      {/* PROJECTS */}
      <section className="relative min-h-screen"></section>
      {/* CONTACT */}
      <footer className="relative min-h-[50vh]"></footer>
    </Fragment>
  );
}
