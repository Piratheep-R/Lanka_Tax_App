import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bookmark,
  CalendarDays,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  MessageSquareText,
  Scale,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Logo, Mark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/documents", label: "Documents", icon: Bookmark },
  { to: "/dashboard/calculator", label: "Calculator", icon: Scale },
  { to: "/dashboard/advisor", label: "Advisor", icon: MessageSquareText },
  { to: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/dashboard/profile", label: "Profile", icon: UserRound },
] as const;

export function DashboardShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background md:flex">
      <aside className="hidden w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="px-4 py-5">
          <Logo inverted />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              {...item}
              active={
                item.to === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.to)
              }
            />
          ))}
        </nav>
        <Link
          to="/help"
          className="mx-3 mb-2 flex h-11 items-center gap-3 rounded-md px-3 text-sm text-sidebar-muted hover:bg-primary-foreground/10 hover:text-sidebar-foreground"
        >
          <LifeBuoy className="size-4" />
          Help
        </Link>
        <p className="px-5 py-4 text-xs text-sidebar-muted">
          YA 2026/27 · rates from IRD 2025/26 chart
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 md:h-16 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="size-11"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </Button>
            <Mark />
            <span className="font-display text-lg tracking-tight">LankaTax</span>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            Sri Lankan tax workspace
          </p>
          {isPending ? (
            <Skeleton className="h-8 w-32 rounded-full" />
          ) : (
            <UserButton />
          )}
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-card md:hidden">
        {NAV.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px]",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <div className="px-4 py-5">
            <Logo inverted />
          </div>
          <nav className="flex flex-col gap-1 px-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                {...item}
                active={
                  item.to === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.to)
                }
                onClick={() => setOpen(false)}
              />
            ))}
            <Link
              to="/help"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center gap-3 rounded-md px-3 text-sm text-sidebar-muted hover:bg-primary-foreground/10 hover:text-sidebar-foreground"
            >
              <LifeBuoy className="size-4" />
              Help
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  to: (typeof NAV)[number]["to"];
  label: string;
  icon: (typeof NAV)[number]["icon"];
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
        active
          ? "bg-primary-foreground/10 text-sidebar-foreground"
          : "text-sidebar-muted hover:bg-primary-foreground/10 hover:text-sidebar-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}
