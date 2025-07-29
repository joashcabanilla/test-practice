"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MultiSelectFilterProps {
  label: string;
  list: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function FilterSelect({ label, list, selectedValues, onChange }: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredList = list.filter((item) =>
    item?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-fit cursor-pointer justify-between !bg-[#020618] text-muted-foreground")}
        >
          {label}
          <ChevronDown className="ml-2 size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] !bg-[#020618] p-0">
        <div className="p-2">
          <div className="relative">
            <Input
              placeholder={`Search ${label}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border-gray-300 !bg-[#020618] text-gray-300 placeholder:text-gray-500"
            />
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          </div>
        </div>
        <div className="custom-scrollbar max-h-60 overflow-auto">
          {filteredList.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={cn(
                "flex cursor-pointer items-center space-x-3 px-3 py-2 hover:bg-gray-800"
              )}
              onClick={() => toggleValue(item)}
            >
              <Checkbox
                checked={selectedValues.includes(item)}
                onCheckedChange={() => toggleValue(item)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
              />
              <span className="text-sm text-[#FBBD2C]">{item}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
