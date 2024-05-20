import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";

const Intro = () => {
  return (
    <div className=" max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
        Your ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className=" underline">Ipsum Notion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Ipsum Notion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Button>
        Enter Ipsum
        <ArrowRight className=" h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default Intro;
