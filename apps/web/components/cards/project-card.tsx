import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  location: string;
  timeline: string;
  imageUrl: string;
  status?: string;
  description?: string;
  className?: string;
}

export function ProjectCard({ title, location, timeline, imageUrl, status, description, className }: ProjectCardProps) {
  return (
    <article className={cn("overflow-hidden rounded-gl border border-[#E3E8E2] bg-white shadow-glXs", className)}>
      <div className="relative aspect-[16/10] bg-neutral-mist">
        <Image src={imageUrl} alt={title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        {status ? <Badge tone="success" className="absolute left-3 top-3">{status}</Badge> : null}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-botanical-black">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-neutral-slate">{description}</p> : null}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-slate">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden />
            {location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden />
            {timeline}
          </span>
        </div>
      </div>
    </article>
  );
}
