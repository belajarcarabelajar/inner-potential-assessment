import { useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Halaman Tidak Ditemukan - Jatimetri";
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Button asChild>
        <Link to="/">Kembali ke Beranda</Link>
      </Button>
    </div>
  );
}
