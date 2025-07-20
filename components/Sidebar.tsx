"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarLinks = [
  {
    href: "/admin",
    label: "CREATE ARTICLE",
    iconClass: "bxs bx-plus-square",
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    href: "/admin/my_articles",
    label: "MY ARTICLES",
    iconClass: "bxs bx-article",
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    href: "/admin/users",
    label: "USERS",
    iconClass: "bxs bx-user-id-card",
    roles: ["SUPER_ADMIN"],
  },
  {
    href: "/admin/categories",
    label: "CATEGORIES",
    iconClass: "bx bx-folder",
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
  {
    href: "/admin/profile",
    label: "PROFILE",
    iconClass: "bx bx-user",
    roles: ["USER", "ADMIN", "SUPER_ADMIN"],
  },
];

export default function Sidebar({ role }: { role: "USER" | "ADMIN" | "SUPER_ADMIN" }) {
  const location = usePathname();

  const visibleLinks = sidebarLinks.filter((link) => link.roles.includes(role));

  return (
    <aside className="bg-app-background-color md:border-r border-gray-200 hidden md:flex flex-col justify-between">
      <nav className="py-12 px-6 flex flex-row md:flex-col justify-between md:justify-normal md:gap-8">
        <div className="hidden md:flex flex-col gap-8">
          {visibleLinks.map(({ href, label, iconClass }) => {
            const isActive = location === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-4 text-sm ${isActive ? "text-app-primary-color" : "text-app-text-color"} hover:text-app-primary-color`}
              >
                <i className={`${iconClass} text-lg`}></i>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
