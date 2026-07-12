"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types/database";
import Icon from "@/components/ui/icon";

type ProjectShowcaseCardProps = {
  project: Project;
  onOpen: (id: string) => void;
  index?: number;
};

/**
 * Premium, tıklanabilir browser-viewport proje kartı.
 * Kök eleman <button> (tek aksiyon: detayı aç) ve "Detayları Gör" affordance'ı.
 * Native <button> Enter/Space ile onClick tetikler → ayrı onKeyDown gerekmez.
 */
export default function ProjectShowcaseCard({
  project,
  onOpen,
  index = 0,
}: ProjectShowcaseCardProps) {
  const categorySlug = project.category
    ? project.category.toLowerCase().replace(/\s+/g, "_")
    : "project";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project.id)}
      aria-label={`${project.title} projesinin detaylarını gör`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col text-left overflow-hidden rounded-2xl glass-panel border border-white/70 hover:border-secondary/40 transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Browser chrome header */}
      <div className="flex items-center gap-3 px-5 h-11 border-b border-outline-variant/30 bg-white/50 shrink-0">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-on-surface-variant/60 truncate">
          {categorySlug}
        </span>
      </div>

      {/* Screenshot */}
      <div className="relative h-[220px] sm:h-[260px] overflow-hidden bg-surface-container">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title || "Project image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="image" className="w-16 h-16 text-on-surface-variant/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex flex-col gap-3 bg-white/40 flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display-lg text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
            {project.title}
          </h3>
          {project.category && (
            <span className="font-label-md text-[10px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant uppercase tracking-widest shrink-0">
              {project.category}
            </span>
          )}
        </div>

        {project.description && (
          <p className="text-on-surface-variant leading-relaxed font-body-md text-sm line-clamp-2">
            {project.description}
          </p>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-label-md text-[10px] px-2 py-0.5 rounded bg-surface-container-high/70 text-on-surface-variant border border-outline-variant/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-label-md text-[10px] px-2 py-0.5 text-on-surface-variant/60">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 mt-2 font-mono text-[11px] tracking-wider uppercase text-on-surface-variant group-hover:text-secondary transition-colors">
          <Icon name="arrow_outward" className="w-4 h-4" />
          Detayları Gör
        </div>
      </div>
    </motion.button>
  );
}

