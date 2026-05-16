"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const dockVariants = cva(
  "mx-auto w-max mt-8 h-[58px] p-2 flex items-end gap-2 rounded-2xl border dark:border-[#707070]"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = 60,
      distance = 100,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child: React.ReactNode) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          mouseX: mouseX,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), className)}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockCardProps {
  src?: string;
  children?: React.ReactNode;
  className?: string;
}

const DockCard = ({
  className,
  children,
  ...props
}: DockCardProps & { [key: string]: unknown }) => {
  return (
    <div
      className={cn(
        "flex aspect-square w-10 h-10 items-center justify-center rounded-full",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, props);
        }
        return child;
      })}
    </div>
  );
};

DockCard.displayName = "DockCard";

export interface DockIconProps {
  className?: string;
  mouseX?: import("framer-motion").MotionValue<number>;
  magnification?: number;
  distance?: number;
  children?: React.ReactNode;
}
const DockIcon = ({
  children,
  className,
  mouseX,
  magnification = 60,
  distance = 100,
}: PropsWithChildren<DockIconProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  const defaultMouseX = useMotionValue(0);
  const distanceVal = useTransform(mouseX || defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return (val as number) - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceVal,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const widthSpring = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: widthSpring }}
      className={cn(
        "flex aspect-square w-10 items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockCard, DockIcon };
