import * as React from "react";
import { Link } from "react-router-dom";
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
}

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ isOpen, brand, sections, className }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 transform border-r transition-transform duration-300 md:w-72",
          "bg-sidebar border-sidebar-border",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
            <img
              src={brand.logoSrc}
              alt={brand.label}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-semibold text-sidebar-foreground">
              {brand.label}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2",
                        )}
                      >
                        {item.icon && (
                          <span className="flex h-5 w-5 items-center justify-center">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
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
