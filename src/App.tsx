import { BrowserRouter, Routes, Route, Link } from "react-router";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Assessment from "./features/assessment/Assessment";
import Dashboard from "./features/dashboard/Dashboard";
import Profile from "./features/profile/Profile";
import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./components/NotFound";

function Home() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background relative py-12">
      <div className="text-center space-y-4 relative z-0 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Inner Potential Assessment</h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">Temukan kekuatan sejatimu dan arah pertumbuhanmu.</p>
        <div className="pt-4">
          <Link to="/assessment" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium shadow-sm hover:opacity-90 transition text-lg">
            Mulai Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProtectedProfile() {
  return (
    <>
      <SignedIn>
        <Profile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Assessment is outside MainLayout for immersive full-screen experience */}
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  );
}
