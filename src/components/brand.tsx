import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 place-items-center rounded-md bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none">
        <path
          d="M7 5.5h6.2c2.6 0 4.3 1.5 4.3 3.7 0 1.7-1 2.9-2.6 3.4L18.6 18h-2.6l-3.3-4.8H9.2V18H7V5.5Zm2.2 5.5h3.7c1.3 0 2.1-.7 2.1-1.8s-.8-1.8-2.1-1.8H9.2V11Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  to = "/",
  inverted = false,
}: {
  className?: string;
  to?: "/";
  inverted?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn("flex items-center gap-2.5 no-underline", className)}
    >
      <Mark className={inverted ? "bg-primary-foreground/12 text-primary-foreground" : undefined} />
      <span
        className={cn(
          "font-display text-xl leading-none tracking-tight",
          inverted ? "text-sidebar-foreground" : "text-foreground",
        )}
      >
        LankaTax
      </span>
    </Link>
  );
}
