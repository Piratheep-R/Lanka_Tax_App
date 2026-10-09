import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLkr(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(Math.round(value * 10 ** fractionDigits) / 10 ** fractionDigits);
}

export function formatCompactLkr(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const millions = value / 1_000_000;
    return `Rs. ${millions.toLocaleString("en-LK", { maximumFractionDigits: millions >= 10 ? 0 : 1 })}M`;
  }
  if (abs >= 1_000) {
    return `Rs. ${(value / 1_000).toLocaleString("en-LK", { maximumFractionDigits: 0 })}k`;
  }
  return formatLkr(value);
}

export function formatPercent(value: number, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}
