"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaBars, FaHandHoldingHeart, FaRightFromBracket } from "react-icons/fa6";
import UserAvatar from "@/components/common/UserAvatar";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

const profileLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const user = session?.user;

 
  const closeMenu = () => document.activeElement?.blur();

  const handleLogout = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  const linkClass = (href) =>
    `font-medium ${pathname === href ? "bg-primary/10 text-primary" : ""}`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu">
              <FaBars className="text-lg" />
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeMenu} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 px-2 text-2xl font-extrabold section-heading">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content">
              <FaHandHoldingHeart className="text-lg" />
            </span>
          HelpHive
          </Link>
        </div>

     
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        <div className="navbar-end gap-1 sm:gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="skeleton h-10 w-10 rounded-full"></div>
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
              
                <div tabIndex={0} role="button" className="tooltip tooltip-bottom btn btn-ghost btn-circle" data-tip={user.name}>
                  <UserAvatar user={user} className="h-10 w-10" />
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                  <li className="menu-title truncate">{user.name}</li>
                  {profileLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={closeMenu} className={linkClass(link.href)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="sm:hidden">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
              <button onClick={handleLogout} className="btn btn-primary hidden sm:inline-flex">
                <FaRightFromBracket /> Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
          <div>

            
          </div>
      </div>
    </header>
  );
}
