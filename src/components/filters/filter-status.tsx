"use client";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type item = {
  __typename: string;
  name: string;
};
interface FilterStatusProps {
  label: string;
  items: item[];
  value: string;
  onChange: (selected: string) => void;
  className?: string;
}

export function FilterStatus({ label, items, value, onChange, className }: FilterStatusProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={cn(
          "h-40 w-fit cursor-pointer !bg-[#020618] text-sm text-muted-foreground !outline-none",
          className
        )}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: item, index: number) => (
          <SelectItem key={index} value={item.name} className="cursor-pointer text-sm font-light">
            {item.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
