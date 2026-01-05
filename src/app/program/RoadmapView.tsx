"use client";

import React from 'react';
import { Book, Lightbulb, Target, Star, Trophy, Flag, CheckCircle, Sparkles, Zap, Brain, Rocket, MessageCircle, PenTool } from 'lucide-react';
import { cn } from "@/lib/utils";


interface RoadmapViewProps {
  items: string[];
}

// PlanetSpark-style icons and headers
const ICONS = [MessageCircle, PenTool, Brain, Rocket, Sparkles, Zap, Lightbulb, Star, Target, Trophy, Flag, CheckCircle];

const THEMES = [
  { color: "text-sky-500", bg: "bg-sky-500", border: "border-sky-500", light: "bg-sky-50", label: "Foundation & Basics" },
  { color: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500", light: "bg-yellow-50", label: "Core Skills Development" },
  { color: "text-pink-500", bg: "bg-pink-500", border: "border-pink-500", light: "bg-pink-50", label: "Advanced Techniques" },
  { color: "text-purple-500", bg: "bg-purple-500", border: "border-purple-500", light: "bg-purple-50", label: "Mastery & Application" },
];

interface Group {
  id: number;
  items: string[];
  theme: typeof THEMES[0];
}

const RoadmapView = ({ items }: RoadmapViewProps) => {
  // 1. Chunk items into groups (Modules)
  const GROUP_SIZE = 3;
  const groups: Group[] = [];
  for (let i = 0; i < items.length; i += GROUP_SIZE) {
    groups.push({
      id: i,
      items: items.slice(i, i + GROUP_SIZE),
      theme: THEMES[groups.length % THEMES.length]
    });
  }

  // 2. Flatten for snake grid but keep group metadata
  // We need to render rows. Let's assume 4 items per row for the snake grid.
  const ITEMS_PER_ROW = 4;

  // Create a flattened array with metadata for rendering
  const flatItems = items.map((item, index) => {
    const groupIndex = Math.floor(index / GROUP_SIZE);
    return {
      item,
      index,
      group: groups[groupIndex],
      isGroupStart: index % GROUP_SIZE === 0,
      icon: ICONS[index % ICONS.length]
    };
  });

  const rows = [];
  for (let i = 0; i < flatItems.length; i += ITEMS_PER_ROW) {
    rows.push(flatItems.slice(i, i + ITEMS_PER_ROW));
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {/* Mobile View: Vertical Timeline with Groups */}
      <div className="md:hidden space-y-8 pb-8 pl-4">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="relative border-l-2 border-dashed border-gray-300 pl-6 pb-2">
            {/* Group Header */}
            <div className={`absolute -left-[14px] -top-3 ${group.theme.bg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
              {group.theme.label}
            </div>

            <div className="mt-6 space-y-6">
              {group.items.map((item, i) => {
                const globalIndex = gIdx * GROUP_SIZE + i;
                const Icon = ICONS[globalIndex % ICONS.length];
                return (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[33px] top-1 w-6 h-6 rounded-full border-2 ${group.theme.border} bg-white z-10`} />

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full ${group.theme.light} flex items-center justify-center ${group.theme.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm">{item}</h3>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: PlanetSpark Snake Layout */}
      <div className="hidden md:block py-10">
        {rows.map((rowItems, rowIndex) => {
          const isEvenRow = rowIndex % 2 === 0; // L -> R
          const isLastRow = rowIndex === rows.length - 1;

          return (
            <div key={rowIndex} className="relative mb-24 last:mb-0">
              {/* 
                  Row Layout:
                  We use flexbox. 
                  If even row: justify-start (But actually space-between or grid looks better to maintain alignment).
                  PlanetSpark items are evenly spaced.
               */}
              <div
                className={cn(
                  "flex justify-between items-start px-10 relative z-10",
                  !isEvenRow ? "flex-row-reverse" : "flex-row"
                )}
              >
                {rowItems.map((node) => {
                  const isFirstNode = node.index === 0;

                  return (
                    <div key={node.index} className="relative flex flex-col items-center w-48 group">
                      {/* Group Header Pill - Show only on group start */}
                      {node.isGroupStart && (
                        <div className={cn(
                          "absolute -top-16 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition-transform hover:scale-105 cursor-default whitespace-nowrap z-20",
                          node.group.theme.bg
                        )}>
                          {node.group.theme.label}
                        </div>
                      )}

                      {/* Node Circle */}
                      <div className="relative">
                        {/* Pulse Animation for First Node */}
                        {isFirstNode && (
                          <div className={cn("absolute inset-0 rounded-full animate-ping opacity-20", node.group.theme.bg)} />
                        )}

                        <div className={cn(
                          "w-20 h-20 rounded-full bg-white border-4 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg cursor-pointer",
                          node.group.theme.border
                        )}>
                          <node.icon className={cn("w-8 h-8", node.group.theme.color)} strokeWidth={2.5} />

                          {/* Plus Button */}
                          <div className={cn(
                            "absolute -bottom-2 w-6 h-6 rounded-full text-white flex items-center justify-center border-2 border-white text-xs shadow-sm",
                            node.group.theme.bg
                          )}>
                            +
                          </div>
                        </div>
                      </div>

                      {/* Label */}
                      <div className="mt-4 text-center">
                        <h3 className="font-bold text-foreground text-sm md:text-base leading-tight px-2">
                          {node.item}
                        </h3>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Connector Lines (Dashed Path) */}
              {/* 1. Horizontal Path within the row */}
              <div className="absolute top-10 left-0 w-full h-0.5 -z-0 px-24">
                {/* 
                     We need a dashed line connecting center of first item to center of last item in this row.
                     Since items are flex-spaced, simple div might not match perfectly. 
                     SVG is best, but let's try a dashed border on a div positioned absolutely.
                  */}
                <div
                  className={cn(
                    "w-full h-full border-t-4 border-dotted",
                    // Color logic: Gradeint? Or just gray/primary. PlanetSpark uses the module color. 
                    // Since row can have multiple modules, multi-color line is hard. Let's use generic dashed line for connectors.
                    "border-gray-300"
                  )}
                />
              </div>

              {/* 2. Vertical U-Turn Connector to Next Row */}
              {!isLastRow && (
                <div
                  className={cn(
                    "absolute top-10 h-32 w-24 border-dotted border-gray-300 z-0",
                    // Thickness
                    "border-4",
                    // If Even Row (L->R) -> connects Right end down to Right end of next row.
                    // So U-Turn is on the RIGHT.
                    isEvenRow ? "right-10 rounded-r-[3rem] border-l-0" : "left-10 rounded-l-[3rem] border-r-0",
                    // Borders: Top, Side, Bottom?
                    // We need Top Border (connecting to row end), Side Border (down), Bottom Border (connecting to next row start).
                    // Actually, just Top and Side?
                    // No, the row below has its own horizontal line.
                    // So we need: Start at Row 1 End (top), Curve Down (side), End at Row 2 Start (bottom?? No).
                    // Let's look at PlanetSpark: It's a continuous line.
                    // Row 1 Line -----> |
                    //                   |
                    // Row 2 Line <----- |

                    // So this connector just needs: 
                    // 1. Height spanning the gap
                    // 2. Width to curve
                    // 3. Border Top (connect to row), Border Side (vertical), Border Bottom (connect to next row)?

                    // Let's try:
                    "border-t-4 border-b-4", // Top and Bottom connect to the horizontal lines
                    isEvenRow ? "border-r-4 rounded-r-[3rem] border-l-0" : "border-l-4 rounded-l-[3rem] border-r-0"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapView;
