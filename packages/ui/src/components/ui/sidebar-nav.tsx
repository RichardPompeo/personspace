import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  to: string;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export interface SidebarNavProps {
  isOpen: boolean;
  brand: {
    logoSrc: string;
    label: string;
  };
  sections: NavSection[];
  className?: string;
  onClose?: () => void;
}

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ isOpen, brand, sections, className, onClose }, ref) => {
    const location = useLocation();

    const isActiveLink = (to: string) => {
      // Exact match for home
      if (to === "/" && location.pathname === "/") {
        return true;
      }
      // For other routes, check if pathname starts with the route
      if (to !== "/" && location.pathname.startsWith(to)) {
        return true;
      }
      return false;
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 transform border-r transition-transform duration-300 md:w-72",
          "bg-sidebar border-sidebar-border shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
        style={{ backgroundColor: "hsl(var(--sidebar))" }}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <div className="flex items-center gap-3">
              <img
                src={brand.logoSrc}
                alt={brand.label}
                className="h-8 w-8 object-contain flex-shrink-0"
              />
              <span className="text-lg font-semibold text-sidebar-foreground">
                {brand.label}
              </span>
            </div>
            {/* Close button for mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-black/40 text-sidebar-foreground hover:bg-black/60 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-sidebar-ring z-50 backdrop-blur-sm"
                aria-label="Fechar menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = isActiveLink(item.to);
                    return (
                      <li key={item.id}>
                        <Link
                          to={item.to}
                          onClick={() => {
                            // Fecha a sidebar no mobile ao clicar em um link
                            if (
                              onClose &&
                              window.matchMedia("(max-width: 767px)").matches
                            ) {
                              onClose();
                            }
                          }}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2",
                          )}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
                          )}
                          {item.icon && (
                            <span className="flex h-5 w-5 items-center justify-center">
                              {item.icon}
                            </span>
                          )}
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    );
  },
);

SidebarNav.displayName = "SidebarNav";

export { SidebarNav };
