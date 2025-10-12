import { Fragment, type ReactNode } from "react";
import clsx from "clsx";
import { Link } from "react-router";

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
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
}

export const SidebarNav = ({ isOpen, brand, sections }: SidebarNavProps) => {
  const sidebarClass = clsx(
    "scrollbar-thin fixed left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-y-auto bg-surface/95 px-5 pb-10 pt-6 text-text shadow-card backdrop-blur-lg transition-transform duration-300",
    {
      "-translate-x-full": !isOpen,
      "translate-x-0": isOpen,
    },
    "md:w-64"
  );

  return (
    <Fragment>
      <aside className={sidebarClass}>
        <div className="mt-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-surface-muted/70 px-4 py-3">
          <img src={brand.logoSrc} alt={brand.label} className="h-10 w-10" />
          <span className="text-lg font-semibold text-accent">
            {brand.label}
          </span>
        </div>
        <nav className="mt-6 space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text/60">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-text/80 transition hover:bg-accent/90 hover:text-slate-900"
                    >
                      {item.icon ? (
                        <span className="text-lg text-accent group-hover:text-slate-900">
                          {item.icon}
                        </span>
                      ) : null}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </Fragment>
  );
};
