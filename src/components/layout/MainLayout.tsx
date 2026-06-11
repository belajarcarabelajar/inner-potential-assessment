import { Outlet, Link } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <header className="w-full p-4 md:p-6 flex items-center justify-between z-10 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <Link to="/" className="font-bold text-lg text-primary hover:opacity-80 transition">
          Inner Potential
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/assessment" className="text-sm font-medium hover:text-primary transition hidden sm:block">
            Assessment
          </Link>
          <SignedIn>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition hidden sm:block">
              Dashboard
            </Link>
            <Link to="/profile" className="text-sm font-medium hover:text-primary transition mr-2">
              Profil
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium hover:text-primary transition">Sign In</button>
            </SignInButton>
          </SignedOut>
        </nav>
      </header>
      <main className="flex-1 flex flex-col relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
