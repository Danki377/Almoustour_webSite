"use client";

import { Children, cloneElement, isValidElement, useRef, type ReactElement, type ReactNode } from "react";
import { motion, type MotionValue } from "framer-motion";
import { useRamp, useSectionProgress } from "@/lib/motion";

function Word({ progress, index, total, children }: { progress: MotionValue<number>; index: number; total: number; children: ReactNode }) {
  // Each word lights up over its own slice of the scroll range, with a little overlap
  const start = index / total;
  const end = Math.min(1, start + 2.5 / total);
  const opacity = useRamp(progress, [start, end], [0.16, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/**
 * Splits the text of `children` into words that light up one after another as the
 * block scrolls through the viewport. Elements (spans, <br/>) are kept as-is.
 */
export function ScrollWords({ children, className, as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h2" | "h3" | "p" }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const progress = useSectionProgress(ref, ["start 0.92", "start 0.42"]);

  // First pass: count words so each one knows its slot
  let total = 0;
  const count = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (typeof child === "string" || typeof child === "number") total += String(child).split(/\s+/).filter(Boolean).length;
      else if (isValidElement(child)) count((child as ReactElement<{ children?: ReactNode }>).props.children);
    });
  };
  count(children);

  let index = 0;
  const wrap = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .map((part, k) =>
            /^\s+$/.test(part) || part === "" ? (
              part
            ) : (
              <Word key={k} progress={progress} index={index++} total={Math.max(total, 1)}>
                {part}
              </Word>
            )
          );
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>;
        return el.props.children === undefined ? el : cloneElement(el, {}, wrap(el.props.children));
      }
      return child;
    });

  return (
    <Tag ref={ref} className={className}>
      {wrap(children)}
    </Tag>
  );
}
