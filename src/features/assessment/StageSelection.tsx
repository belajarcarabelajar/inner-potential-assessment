import { useAssessmentStore } from "@/store/useAssessmentStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StageSelection() {
  const setStage = useAssessmentStore((state) => state.setStage);

  const handleSelect = (stage: "child" | "teenager" | "adult") => {
    setStage(stage);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">Pilih Kategori</CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            Untuk menyesuaikan pertanyaan, silakan pilih kategori yang paling sesuai.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full h-16 text-lg justify-start px-6 hover:border-primary hover:text-primary transition"
            onClick={() => handleSelect("child")}
          >
            👧👦 Anak-anak
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-16 text-lg justify-start px-6 hover:border-primary hover:text-primary transition"
            onClick={() => handleSelect("teenager")}
          >
            🧑👩 Remaja
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-16 text-lg justify-start px-6 hover:border-primary hover:text-primary transition"
            onClick={() => handleSelect("adult")}
          >
            👨👩 Dewasa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
