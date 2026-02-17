'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, HeartPulse, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';
import type { NavItem } from '@/config/site';

/* ------------------------------------------------------------------ */
/*  Dropdown component for grouped nav items                           */
/* ------------------------------------------------------------------ */

function NavDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: readonly { readonly label: string; readonly href: string; readonly description: string }[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isGroupActive = items.some((item) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href),
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isGroupActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-gray-600 hover:bg-surface-100 hover:text-foreground'
        }`}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-surface-200 bg-white py-2 shadow-lg">
          {items.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 transition-colors ${
                  active
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-surface-50'
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="mt-0.5 block text-xs text-gray-400">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile accordion for grouped nav items                             */
/* ------------------------------------------------------------------ */

function MobileNavGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: readonly { readonly label: string; readonly href: string; readonly description: string }[];
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-surface-100"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="ml-3 border-l-2 border-surface-200 pl-3 pb-1">
          {items.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`block rounded-md px-3 py-2 text-sm ${
                  active
                    ? 'font-medium text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Render a single nav item (link or group)                           */
/* ------------------------------------------------------------------ */

function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  if (item.type === 'group') {
    return <NavDropdown label={item.label} items={item.items} pathname={pathname} />;
  }

  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-primary-50 text-primary-700'
          : 'text-gray-600 hover:bg-surface-100 hover:text-foreground'
      }`}
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  if (item.type === 'group') {
    return (
      <MobileNavGroup
        label={item.label}
        items={item.items}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    );
  }

  const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
        active ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-surface-100'
      }`}
    >
      {item.label}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Header                                                        */
/* ------------------------------------------------------------------ */

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <HeartPulse className="h-7 w-7 text-primary-500" />
          <span className="text-lg font-bold text-primary-800">{siteConfig.naam}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {siteConfig.navItems.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item as NavItem}
              pathname={pathname}
            />
          ))}

          {/* CTA button */}
          <a
            href={siteConfig.navCta.href}
            className="ml-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            {siteConfig.navCta.label}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-gray-600 hover:bg-surface-100 lg:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-surface-200 bg-white px-4 py-3 lg:hidden max-h-[80vh] overflow-y-auto">
          {siteConfig.navItems.map((item) => (
            <MobileNavItem
              key={item.label}
              item={item as NavItem}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}

          {/* CTA */}
          <a
            href={siteConfig.navCta.href}
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-md bg-emerald-500 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            {siteConfig.navCta.label}
          </a>
        </nav>
      )}
    </header>
  );
}
