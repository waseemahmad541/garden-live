import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="mb-3 text-sm font-semibold text-botanical-green">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-[0] text-botanical-black sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-neutral-slate">{description}</p> : null}
    </div>
  );
}
