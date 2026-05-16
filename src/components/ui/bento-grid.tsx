"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Project } from "@/types/database";
import Link from "next/link";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[28rem] grid-cols-1 md:grid-cols-2 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) => (
  <div
    key={project.id}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "glass-panel", // Using the existing glass-panel style and will override/extend it
      "border-t-white/80 border-l-white/80", // Specific borders from DESIGN.md
      "hover:backdrop-blur-xl hover:border-t-white hover:border-l-white", // Hover effects from DESIGN.md
      className
    )}
  >
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      {project.image_url ? (
        <Image
          fill
          alt={project.title || "Project Image"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          src={project.image_url}
          unoptimized
        />
      ) : (
        <div className="w-full h-full bg-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-8xl text-on-surface-variant/20">
            image
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>

    {/* Content */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-4">
      {project.category && (
        <span className="font-label-md text-xs px-3 py-1 bg-surface-variant/80 rounded-full text-on-surface-variant uppercase self-start">
          {project.category}
        </span>
      )}
      <h3 className="font-headline-sm text-2xl font-semibold text-white">
        {project.title}
      </h3>
      <p className="font-body-md text-white/80 max-w-lg line-clamp-2">
        {project.description}
      </p>
    </div>

    {/* Hover Content */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-12 transform-gpu flex-col p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <h4 className="font-label-md text-white/90 mb-2">
            Kullanılan Teknolojiler
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 rounded-md text-xs font-label-md text-white/80 border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 items-center">
        {project.github_url && (
          <Link
            className="pointer-events-auto font-label-md text-sm text-white/80 hover:text-white flex items-center gap-1 transition-colors"
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="w-4 h-4" /> GitHub
          </Link>
        )}
        {project.live_url && (
          <Link
            className="pointer-events-auto font-label-md text-sm text-white/80 hover:text-white flex items-center gap-1 transition-colors"
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowRightIcon className="w-4 h-4" /> Canlı Demo
          </Link>
        )}
      </div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
