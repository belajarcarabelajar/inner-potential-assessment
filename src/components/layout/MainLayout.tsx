import { useState } from "react";
import { Outlet, Link } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

export function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <header className="w-full p-4 md:p-6 flex items-center justify-between z-20 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <Link to="/" className="font-bold text-lg text-primary hover:opacity-80 transition py-2">
          Inner Potential
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link to="/assessment" className="px-3 py-2 text-sm font-medium hover:text-primary transition">
            Assessment
          </Link>
          <SignedIn>
            <Link to="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-primary transition">
              Dashboard
            </Link>
            <Link to="/profile" className="px-3 py-2 text-sm font-medium hover:text-primary transition mr-2">
              Profil
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium hover:text-primary transition">Sign In</button>
            </SignInButton>
          </SignedOut>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="sm:hidden flex items-center gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button 
            className="p-2 -mr-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-[73px] left-0 right-0 bg-background border-b border-border shadow-lg z-10 flex flex-col px-4 py-2 gap-2 animate-in slide-in-from-top-2">
          <Link to="/assessment" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition">
            Assessment
          </Link>
          <SignedIn>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition">
              Dashboard
            </Link>
            <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition">
              Profil
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      )}

      <main className="flex-1 flex flex-col relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
