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
            <div className="size-8 rounded-md flex items-center justify-center">
              🇻🇪
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Full Stack Dev
              </span>
              <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-primary">
                Building the Future
              </span>
            </div>
          </div>
        </header>
        <div className="text-center">
          <h1 className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-black text-caracas">
            TioElvis
          </h1>
          <h3 className="font-light uppercase text-2xl tracking-widest">
            Full stack developer
          </h3>
        </div>
        <div className="absolute bottom-8 flex flex-col items-center text-muted-foreground">
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
