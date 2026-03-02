import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  isActive,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-start p-6 rounded-2xl border transition-all duration-300 text-left w-full",
        isActive
          ? "bg-zinc-900 border-zinc-800 text-white shadow-xl scale-[1.02]"
          : "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50"
      )}
    >
      <div className={cn(
        "p-3 rounded-xl mb-4",
        isActive ? "bg-zinc-800" : "bg-zinc-100"
      )}>
        <Icon size={24} className={isActive ? "text-white" : "text-zinc-600"} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={cn(
        "text-sm leading-relaxed",
        isActive ? "text-zinc-400" : "text-zinc-500"
      )}>
        {description}
      </p>
    </button>
  );
};
