"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import HamburgerMenu from "./HamburgerMenu";

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

export default function Navbar({
  role,
  categories,
  children,
}: {
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  categories: {
    id: string;
    name: string;
  }[];
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();

  const visibleLinks = sidebarLinks.filter((link) => link.roles.includes(role));

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="border-b border-gray-200">
      <nav className="py-4 px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="logo" className="size-6" />

          <p className="mt-0.5 text-base font-black">UNDER SOCPOL</p>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {categories.length > 0 &&
            categories.map(({ id, name }) => {
              const isActive = location === `/articles/category/${name}`;

              return (
                <Link
                  key={id}
                  href={`/articles/category/${name}`}
                  className={`text-sm ${isActive ? "text-app-primary-color" : ""} hover:text-app-primary-color`}
                >
                  {name.toUpperCase()}
                </Link>
              );
            })}

          {children}
        </div>

        <div className="md:hidden">
          <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {isOpen && (
          <>
            <div className="fixed top-[4.5rem] inset-0 bg-app-background-color/75" onClick={() => setIsOpen(false)} />

            <div className="fixed top-[4.5rem] left-0 bg-app-background-color py-4 px-6 border-b border-gray-200 w-full flex flex-col gap-8 z-50">
              {categories.length > 0 &&
                categories.map(({ id, name }) => {
                  const isActive = location === `/articles/category/${name}`;

                  return (
                    <Link
                      key={id}
                      href={`/articles/category/${name}`}
                      onClick={() => setIsOpen(!isOpen)}
                      className={`text-sm ${isActive ? "text-app-primary-color" : ""} hover:text-app-primary-color`}
                    >
                      {name.toUpperCase()}
                    </Link>
                  );
                })}

              {location.startsWith("/admin") &&
                visibleLinks.map(({ href, label }) => {
                  const isActive = location === href;

                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(!isOpen)}
                      className={`text-sm ${isActive ? "text-app-primary-color" : ""} hover:text-app-primary-color`}
                    >
                      {label.toUpperCase()}
                    </Link>
                  );
                })}

              {!location.startsWith("/admin") && children}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
