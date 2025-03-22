import { Showcase } from "@/components/showcase";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-mono)] flex flex-col items-center justify-between h-screen w-full pt-20 pb-8 bg-black text-white relative">
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />

      <div className="w-full max-w-4xl px-4 relative z-10">
        <Navbar />
      </div>

      <div className="w-full max-w-4xl px-4 h-[60%] relative z-10">
        <Showcase />
      </div>

      <div className="flex flex-col items-center gap-2 text-md text-muted-foreground relative z-10">
        <p>
          Powered by{" "}
          <span className="text-white underline underline-offset-6 font-semibold">
            <a href="https://sdk.vercel.ai/">ai-sdk</a>
          </span>
          {", "}
          <span className="text-white underline underline-offset-6 font-semibold">
            <a href="https://github.com/goat-sdk/goat">goat-sdk</a>
          </span>
        </p>
      </div>
    </div>
  );
}
