"use client";

import { useEffect, useRef, useState } from "react";
import { Project } from "@/types/database";
import ProjectShowcaseCard from "./ProjectShowcaseCard";
import ProjectDetailModal from "./ProjectDetailModal";
import Icon from "@/components/ui/icon";

type ProjectsExplorerProps = {
  projects: Project[];
};

/**
 * Grid + modal state orchestrator. URL (?p=<id>) ile senkron:
 * - open  -> history.pushState (paylaşılabilir)
 * - close -> biz push yaptıysak history.back() (geri tuşu modalı kapatır);
 *           direkt link geldiyse replaceState ile p'yi temizle (sayfadan ayrılmadan).
 * - popstate dinleyicisi state'i URL ile senkron tutar.
 * useSearchParams KULLANILMIYOR -> Suspense gerekmez, SSR güvenli.
 */
export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const didPush = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    if (p && projects.some((pr) => pr.id === p)) {
      setSelectedId(p);
    }
    const onPop = () => {
      const q = new URLSearchParams(window.location.search).get("p");
      const next = q && projects.some((pr) => pr.id === q) ? q : null;
      didPush.current = false;
      setSelectedId(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [projects]);

  const open = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("p", id);
      window.history.pushState({}, "", url.toString());
      didPush.current = true;
    }
  };

  const close = () => {
    if (didPush.current) {
      didPush.current = false;
      window.history.back();
    } else {
      setSelectedId(null);
      if (typeof window !== "undefined" && window.location.search) {
        const url = new URL(window.location.href);
        url.searchParams.delete("p");
        window.history.replaceState({}, "", url.toString());
      }
    }
  };

  const selected = selectedId
    ? projects.find((p) => p.id === selectedId) ?? null
    : null;

  if (projects.length === 0) {
    return (
      <div className="glass-panel p-16 rounded-3xl text-center border border-white/70 flex flex-col items-center">
        <Icon name="folder_open" className="w-20 h-20 text-on-surface-variant/20 mb-4" />
        <p className="font-body-lg text-on-surface-variant">Henüz proje eklenmedi.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectShowcaseCard
            key={project.id}
            project={project}
            onOpen={open}
            index={i}
          />
        ))}
      </div>
      <ProjectDetailModal project={selected} onClose={close} />
    </>
  );
}

