import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link href={tool.href} data-testid={`card-tool-${tool.id}`}>
      <div className="group h-full bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex gap-2">
            {tool.isNew && (
              <Badge className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                New
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {tool.category}
            </Badge>
          </div>
        </div>

        <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors mb-2">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
          {tool.description}
        </p>

        <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4">
          Open Tool
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
