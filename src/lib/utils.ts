import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const phoneFormats = {
  "63": {
    format: (digits: string) => {
      const network = digits.slice(2, 5);
      const part1 = digits.slice(5, 8);
      const part2 = digits.slice(8);
      return `+63 (${network}) ${part1} ${part2}`;
    },
    length: 12
  },
  "1": {
    format: (digits: string) => {
      const area = digits.slice(1, 4);
      const prefix = digits.slice(4, 7);
      const line = digits.slice(7);
      return `+1 (${area}) ${prefix}-${line}`;
    },
    length: 11
  }
} as const;

export function formatMobileNumber(mobileNumer: string): string {
  const digits = mobileNumer.replace(/\D/g, "");

  for (const code of Object.keys(phoneFormats) as Array<keyof typeof phoneFormats>) {
    if (digits.startsWith(code)) {
      const { format, length } = phoneFormats[code];
      if (digits.length === length) {
        return format(digits);
      }
    }
  }

  return "Unsupported or invalid number";
}



