export function SpectrumSlider({ label, quality }: { label: string; quality: string }) {
  const percent = quality === "High" ? 90 : quality === "Medium" ? 60 : 30;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="text-muted-foreground font-medium">{quality} Evidence</span>
      </div>
      <div className="h-4 w-full bg-secondary rounded-full overflow-hidden border border-border/50">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
