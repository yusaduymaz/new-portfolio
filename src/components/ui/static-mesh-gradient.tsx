"use client";

import React, { useState, useEffect } from "react";
import type { StaticMeshGradientProps } from "@paper-design/shaders-react";

export type { StaticMeshGradientProps };

// Presets matching the exact demo control panel parameters.
export const staticMeshGradientPresets = [
  {
    name: "Sunset",
    params: {
      colors: ["#4b6991ff", "#ff8800ff", "#f5dd07ff", "rgba(255, 255, 255, 1)"],
      positions: 2,
      waveX: 0.65,
      waveXShift: 0.7,
      waveY: 0.7,
      waveYShift: 0.7,
      mixing: 0.5,
      grainMixer: 0,
      grainOverlay: 0,
      scale: 1.0,
      rotation: 0,
      offsetX: 0.15,
      offsetY: 0.15,
    }
  }
];

/**
 * StaticMeshGradient – WebGL shader gradient from @paper-design/shaders-react.
 *
 * Uses a mounted guard so the real WebGL canvas is ONLY rendered after client
 * hydration, eliminating the "Hydration failed" mismatch error that occurs
 * when next/dynamic(ssr:false) renders null on the server but the real element
 * on the client.
 *
 * During SSR (and the brief hydration window) a plain div with the primary
 * background colour is shown, which is visually indistinguishable.
 */
export const StaticMeshGradient = ({
  className,
  style,
  ...rest
}: StaticMeshGradientProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR / pre-hydration: render a plain div so server and initial client HTML match.
  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: "#000c66",
          ...style,
        }}
      />
    );
  }

  // Post-hydration: dynamically load and render the real WebGL component.
  // We import lazily inside the effect so the server never executes WebGL code.
  return <ClientOnlyShader className={className} style={style} {...rest} />;
};

// Lazy inner component – only ever evaluated on the client.
function ClientOnlyShader(props: StaticMeshGradientProps) {
  // We use React.lazy here instead of next/dynamic to keep the import purely
  // client-side without triggering another SSR attempt.
  const [Shader, setShader] = React.useState<React.ComponentType<StaticMeshGradientProps> | null>(null);

  React.useEffect(() => {
    import("@paper-design/shaders-react").then((mod) => {
      setShader(() => mod.StaticMeshGradient as React.ComponentType<StaticMeshGradientProps>);
    });
  }, []);

  if (!Shader) {
    return (
      <div
        className={props.className}
        style={{ backgroundColor: "#000c66", ...props.style }}
      />
    );
  }

  return <Shader {...props} />;
}

export default StaticMeshGradient;
