"use client";

import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

const SKILLS_DATA: Array<{ label: string; value: number }> = [
  { label: "Front-end Engineer", value: 0.95 },
  { label: "Leadership", value: 0.9 },
  { label: "Accessibility", value: 0.9 },
  { label: "Developer Advocacy", value: 0.9 },
  { label: "UX Design", value: 0.75 },
  { label: "DevOps", value: 0.55 },
  { label: "Back-end JS", value: 0.6 },
  { label: "Team Management", value: 0.85 },
];

const DEFAULT_SIZE = 400;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1];
const GRID_COLOR = "#3a3a3a";
const DATA_FILL = "rgba(255, 84, 32, 0.3)";
const DATA_STROKE = "#ff5420";
const TEXT_COLOR = "#e5e5e5";
const LABEL_OFFSET = 1.15; // Place labels slightly outside the chart

function renderChart(container: SVGSVGElement | null, width: number, height: number) {
  if (!container) return;

  d3.select(container).selectAll("*").remove();

  const size = Math.min(width, height, DEFAULT_SIZE);
  const radius = size / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const svg = d3
    .select(container)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

  const numSkills = SKILLS_DATA.length;
  const angleStep = (2 * Math.PI) / numSkills;
  const startAngle = -Math.PI / 2; // Start at top (12 o'clock)

  const getPoint = (angle: number, r: number) => {
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  // Draw concentric polygon rings (grid) at 25%, 50%, 75%, 100%
  GRID_LEVELS.forEach((level) => {
    const points: [number, number][] = [];
    for (let i = 0; i < numSkills; i++) {
      const angle = startAngle + i * angleStep;
      const pt = getPoint(angle, radius * level);
      points.push([pt.x, pt.y]);
    }
    points.push(points[0]);

    const lineGenerator = d3.line<[number, number]>().curve(d3.curveLinearClosed);
    svg
      .append("path")
      .attr("d", lineGenerator(points)!)
      .attr("fill", "none")
      .attr("stroke", GRID_COLOR)
      .attr("stroke-width", 1);
  });

  // Draw axis lines from center to each skill vertex
  for (let i = 0; i < numSkills; i++) {
    const angle = startAngle + i * angleStep;
    const outer = getPoint(angle, radius);

    svg
      .append("line")
      .attr("x1", centerX)
      .attr("y1", centerY)
      .attr("x2", outer.x)
      .attr("y2", outer.y)
      .attr("stroke", GRID_COLOR)
      .attr("stroke-width", 1);
  }

  // Draw data polygon
  const dataPoints: [number, number][] = SKILLS_DATA.map((skill, i) => {
    const angle = startAngle + i * angleStep;
    const pt = getPoint(angle, radius * skill.value);
    return [pt.x, pt.y];
  });
  dataPoints.push(dataPoints[0]);

  const dataLineGenerator = d3.line<[number, number]>().curve(d3.curveLinearClosed);
  svg
    .append("path")
    .attr("d", dataLineGenerator(dataPoints)!)
    .attr("fill", DATA_FILL)
    .attr("stroke", DATA_STROKE)
    .attr("stroke-width", 2);

  // Draw labels at each vertex
  SKILLS_DATA.forEach((skill, i) => {
    const angle = startAngle + i * angleStep;
    const labelRadius = radius * LABEL_OFFSET;
    const pt = getPoint(angle, labelRadius);

    const textAnchor =
      pt.x < centerX - 10 ? "end" : pt.x > centerX + 10 ? "start" : "middle";

    svg
      .append("text")
      .attr("x", pt.x)
      .attr("y", pt.y)
      .attr("text-anchor", textAnchor)
      .attr("dominant-baseline", "central")
      .attr("fill", TEXT_COLOR)
      .attr("font-size", "12px")
      .style("font-family", "inherit")
      .text(skill.label);
  });
}

export function ResumeProfileChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const draw = useCallback(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const width = container.clientWidth || DEFAULT_SIZE;
    const height = container.clientHeight || DEFAULT_SIZE;

    renderChart(svg, width, height);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    // Initial draw
    draw();

    const resizeObserver = new ResizeObserver(() => {
      draw();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ minHeight: DEFAULT_SIZE, aspectRatio: "1 / 1" }}
    >
      <svg ref={svgRef} className="overflow-visible" />
    </div>
  );
}
