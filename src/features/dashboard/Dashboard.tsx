import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { evaluateAnswers } from "@/data/scoring/scoring-matrix";
import { RadarChartPlot } from "./components/RadarChartPlot";
import { SpectrumSlider } from "./components/SpectrumSlider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Save, ArrowLeft } from "lucide-react";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { ReportPDF } from "../pdf/ReportPDF";
import { generatePDF } from "../pdf/generatePDF";

type HistoricalReport = {
  dominancePattern: string;
  radarData: any[];
  tendencies: any[];
  stage: string;
  createdAt?: string;
};

export default function Dashboard() {
  const { answers, stage, userName } = useAssessmentStore();
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const { isSignedIn, getToken } = useAuth();
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if we're viewing a historical report from profile page
  const [historicalReport, setHistoricalReport] = useState<HistoricalReport | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('view-historical-report');
    if (stored) {
      sessionStorage.removeItem('view-historical-report');
      setHistoricalReport(JSON.parse(stored));
    }
    const timer = setTimeout(() => setLoading(false), historicalReport ? 0 : 2000);
    return () => clearTimeout(timer);
  }, []);

  const liveResult = evaluateAnswers(answers, stage);
  const result = historicalReport ? {
    dominancePattern: historicalReport.dominancePattern,
    radarData: historicalReport.radarData,
    tendencies: historicalReport.tendencies,
  } : liveResult;

  // Derive stage from Q-ID-02 answer if store's stage is null (legacy sessions)
  const stageFromAnswer = (() => {
    const raw = answers["Q-ID-02"] as string;
    if (raw === "Dewasa") return "adult";
    if (raw === "Remaja") return "teenager";
    if (raw === "Anak") return "child";
    return null;
  })();
  const effectiveStage = historicalReport ? historicalReport.stage : (stage || stageFromAnswer || "adult");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

  const handleSave = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/save-attempt`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify({
            stage: effectiveStage,
            answers,
            dominancePattern: result.dominancePattern,
            radarData: result.radarData,
            tendencies: result.tendencies
         })
      });
      if (res.ok) {
         navigate('/profile');
      } else {
         const errData = await res.text();
         alert(`Gagal menyimpan laporan. Server Error: ${res.status} - ${errData}`);
      }
    } catch (e: any) {
      console.error(e);
      alert(`Terjadi kesalahan jaringan: ${e.message}`);
    }
  };

  const handleDownloadPDF = async () => {
    setGeneratingPdf(true);
    try {
      const safeUserName = userName || "Pengguna";
      const pdfBlob = await generatePDF("pdf-container", `Inner_Potential_Assessment_${safeUserName}_${new Date().toISOString().split('T')[0]}.pdf`);
      
      if (isSignedIn && pdfBlob) {
        const token = await getToken();
        // 1. Save Result first to get assessmentId
        const resSave = await fetch(`${API_URL}/api/save-attempt`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
           body: JSON.stringify({
              stage: effectiveStage,
              answers,
              dominancePattern: result.dominancePattern,
              radarData: result.radarData,
              tendencies: result.tendencies
           })
        });

        if (resSave.ok) {
           const { assessmentId } = await resSave.json();
           
           // 2. Upload PDF to R2
           const formData = new FormData();
           formData.append("file", pdfBlob, "report.pdf");
           formData.append("assessmentId", assessmentId);

           await fetch(`${API_URL}/api/upload-pdf`, {
             method: "POST",
             headers: {
               "Authorization": `Bearer ${token}`
             },
             body: formData
           });
        }
      }
    } catch (e) {
      console.error(e);
      alert("Gagal membuat PDF.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
        <h2 className="text-2xl font-bold text-foreground">Menganalisis Pola dan Potensi...</h2>
        <p className="text-muted-foreground mt-2 text-lg">Mengevaluasi bukti lintas-scope</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background p-6 rounded-2xl shadow-sm border border-border">
          <div>
            <h1 className="text-3xl font-bold text-primary">Laporan Inner Potential</h1>
            <p className="text-muted-foreground mt-1 capitalize">
              {historicalReport
                ? `Kategori: ${historicalReport.stage}${historicalReport.createdAt ? ` · ${new Date(Number(historicalReport.createdAt) * 1000).toLocaleDateString('id-ID')}` : ''}`
                : `Disiapkan untuk: ${userName || 'Pengguna'}`
              }
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             {!historicalReport && (
               isSignedIn ? (
                 <Button variant="outline" className="flex-1 md:flex-none" onClick={handleSave}>
                   <Save className="w-4 h-4 mr-2" /> Simpan Laporan
                 </Button>
               ) : (
                 <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                   <Button variant="outline" className="flex-1 md:flex-none text-primary border-primary hover:bg-primary-soft">
                     <Save className="w-4 h-4 mr-2" /> Login & Simpan
                   </Button>
                 </SignInButton>
               )
             )}
             <Button className="flex-1 md:flex-none" onClick={handleDownloadPDF} disabled={generatingPdf}>
               {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />} 
               Unduh PDF
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 shadow-md border-border/60 flex flex-col justify-center">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-muted-foreground uppercase tracking-wider">Indikasi Dominan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-5xl mb-6">🌟</div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{result.dominancePattern}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Pola ini tampaknya mendominasi kecenderungan energi dan pengambilan keputusan Anda berdasarkan bukti gabungan.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-md border-border/60">
            <CardHeader>
              <CardTitle>Peta Distribusi Potensi</CardTitle>
              <CardDescription>Visualisasi kecenderungan Anda di berbagai pendekatan.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChartPlot data={result.radarData} />
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-md border-border/60">
          <CardHeader>
            <CardTitle>Indikasi Potensi Utama (Tendencies)</CardTitle>
            <CardDescription>Pola kekuatan yang terdeteksi dengan frekuensi paling konsisten.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.tendencies.map(t => (
              <div key={t.id} className="grid md:grid-cols-2 gap-6 items-center bg-surface p-6 rounded-xl border border-border/50">
                <div>
                   <h4 className="font-bold text-xl text-primary mb-2">{t.label}</h4>
                   <p className="text-muted-foreground text-sm leading-relaxed">{t.description}</p>
                </div>
                <div className="w-full">
                   <SpectrumSlider label="Kekuatan Bukti (Evidence)" quality={t.quality} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-md border-border/60 bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">⚠ Disclaimer Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-700 leading-relaxed">
              Hasil ini adalah alat refleksi awal, bukan diagnosis psikologis, penilaian baku, atau 
              vonis mutlak mengenai kepribadian Anda. Laporan ini mengukur kecenderungan berdasarkan respons 
              yang diberikan dan dirancang sebagai titik tolak untuk mengeksplorasi potensi Anda lebih lanjut.
            </p>
          </CardContent>
        </Card>

      </div>
      <ReportPDF ref={pdfContainerRef} result={result} userName={userName || "Pengguna"} />
    </div>
  );
}
