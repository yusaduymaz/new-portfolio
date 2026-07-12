"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/types/database";
import Icon from "@/components/ui/icon";

type ProjectDetailModalProps = {
  project: Project | null;
  onClose: () => void;
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("tr-TR", { year: "numeric", month: "long" });
}

/**
 * Admin textarea'ına düz metin yazıldığı için content'i paragraflara böl.
 * Önce çift-newline'a göre paragraflar; yoksa tek-newline'a göre satırlar.
 */
function renderParagraphs(content: string | null): string[] {
  if (!content || !content.trim()) return [];
  const blocks = content
    .split(/\n\s*\n/)
    .map((b) => b.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (blocks.length > 1) return blocks;
  return content
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * Erişilebilir proje detay modalı (Linear-style overlay).
 * Kapatma: X tuşu / Escape / backdrop tıkı. Focus trap + scroll lock + focus restore.
 * Refero grounding: 01-SPEC.md §2.
 */
export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const getFocusable = useCallback((): HTMLElement[] => {
    if (!panelRef.current) return [];
    const nodes = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    return Array.from(nodes);
  }, []);

  useEffect(() => {
    if (!project) return;
    previousFocus.current = (document.activeElement as HTMLElement) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = getFocusable();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = prevOverflow;
      previousFocus.current?.focus?.();
    };
  }, [project, onClose, getFocusable]);

  const paragraphs = renderParagraphs(project?.content ?? null);
  const categorySlug = project?.category
    ? project.category.toLowerCase().replace(/\s+/g, "_")
    : "project";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0b0d10]/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl glass-panel bg-white/95 border border-white/70 shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-5 sm:px-6 h-12 border-b border-outline-variant/30 bg-white/60 shrink-0">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[11px] tracking-widest uppercase text-on-surface-variant/70 truncate ml-2">{categorySlug}.html</span>
              <button ref={closeBtnRef} type="button" onClick={onClose} aria-label="Kapat" className="ml-auto w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60">
                <Icon name="close" className="w-6 h-6" />
              </button>
            </div>
            <div className="relative h-[220px] sm:h-[320px] shrink-0 bg-surface-container overflow-hidden border-b border-outline-variant/20">
              {project.image_url ? (
                <Image src={project.image_url} alt={project.title || "Project image"} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 768px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="image" className="w-16 h-16 text-on-surface-variant/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            <div className="overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                {project.category && (
                  <span className="font-label-md text-[11px] px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container uppercase tracking-widest">{project.category}</span>
                )}
                {formatDate(project.created_at) && (
                  <span className="font-mono text-[11px] text-on-surface-variant/70 tracking-wider">{formatDate(project.created_at)}</span>
                )}
              </div>
              <h2 id="project-detail-title" className="font-display-lg text-2xl sm:text-3xl font-bold text-primary leading-tight">{project.title}</h2>
              {project.description && (
                <p className="font-body-md text-on-surface-variant leading-relaxed">{project.description}</p>
              )}
              {paragraphs.length > 0 && (
                <div className="flex flex-col gap-3 border-l-2 border-secondary/30 pl-4">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="font-body-md text-on-surface/80 leading-relaxed">{p}</p>
                  ))}
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-label-md text-[11px] tracking-widest uppercase text-on-surface-variant">Teknolojiler</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="font-label-md text-xs px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant border border-outline-variant/30">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-3 pt-3 mt-1 border-t border-outline-variant/30">
                {project.github_url && (
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary px-5 py-2.5 rounded-full font-label-md text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> GitHub
                  </Link>
                )}
                {project.live_url && (
                  <Link href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5 rounded-full font-label-md text-sm flex items-center gap-2">
                    Canlı Demo <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
