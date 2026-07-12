/**
 * MeshGradient — saf CSS çok-katmanlı radial-gradient "mesh" arka plan.
 *
 * Demo'daki @paper-design/shaders-react WebGL görünümünü birebir taklit eder:
 * - Sol alt köşe: turuncu/kırmızı parlama
 * - Sağ üst köşe: sarı/altın parlama
 * - Ana arka plan: koyu lacivert (#000c66)
 * - Orta: bulanık karışım
 *
 * WebGL shader yerine CSS kullanılıyor: sıfır JS yükü, hydration hatası yok,
 * PageSpeed'e etkisi yok.
 */
import type { CSSProperties } from "react";

export type StaticMeshGradientProps = {
  colors?: string[];
  fit?: "cover" | "contain";
  scale?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
} & Record<string, unknown>;

const DEFAULT_COLORS = ["#000c66", "#c02200", "#ffd500", "#ffffff"];

function buildGradient(colors: string[]): string {
  const [, c2 = "#c02200", c3 = "#ffd500"] = colors;
  // Exactly matches demo screenshot layout:
  // c2 (crimson/red) glows at bottom-left corner
  // c3 (yellow/gold) glows subtly at top-right
  // c1 (dark blue) is the dominant base
  return [
    `radial-gradient(ellipse 80% 70% at -5% 110%, ${c2} 0%, transparent 55%)`,
    `radial-gradient(ellipse 60% 50% at 5% 75%, ${c2}99 0%, transparent 50%)`,
    `radial-gradient(ellipse 70% 60% at 110% -10%, ${c3}55 0%, transparent 55%)`,
    `radial-gradient(ellipse 50% 40% at 90% 10%, ${c3}33 0%, transparent 45%)`,
  ].join(", ");
}

export function StaticMeshGradient({
  colors,
  fit = "cover",
  scale,
  className,
  style,
  ...rest
}: StaticMeshGradientProps) {
  const cols = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
  return (
    <div
      aria-hidden={rest["aria-hidden"] ?? true}
      className={className}
      style={{
        backgroundImage: buildGradient(cols),
        backgroundColor: cols[0] ?? "#000c66",
        backgroundSize: fit === "contain" ? "contain" : "cover",
        backgroundRepeat: "no-repeat",
        transform: typeof scale === "number" ? `scale(${scale})` : undefined,
        ...style,
      }}
    />
  );
}

export const staticMeshGradientPresets: { name: string; params: { colors: string[] } }[] = [
  { name: "Sunset", params: { colors: ["#000c66", "#c02200", "#ffd500", "#ffffff"] } },
  { name: "1960s", params: { colors: ["#000000", "#082400", "#b1aa91", "#8e8c15"] } },
  { name: "Sea", params: { colors: ["#013b65", "#03738c", "#a3d3ff", "#f2faef"] } },
];

export default StaticMeshGradient;
