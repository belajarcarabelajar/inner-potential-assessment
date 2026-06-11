import { Question } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  question: Question;
  currentAnswer?: string | number | boolean | string[];
  onAnswer: (value: string | number | boolean | string[]) => void;
  onNext?: () => void;
}

export function QuestionCard({ question, currentAnswer, onAnswer, onNext }: Props) {
  
  const handleRankingToggle = (val: string) => {
    let arr = (Array.isArray(currentAnswer) ? currentAnswer : []) as string[];
    if (arr.includes(val)) {
      onAnswer(arr.filter(item => item !== val));
    } else {
      if (arr.length < 3) {
        onAnswer([...arr, val]);
      }
    }
  };

  const renderInput = () => {
    switch (question.inputType) {
      case "text":
        return (
          <div className="flex flex-col gap-4">
            <Input 
              autoFocus
              placeholder="Ketik nama kamu di sini..." 
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => onAnswer(e.target.value)}
              className="h-14 text-lg"
            />
            {currentAnswer && <Button onClick={onNext} size="lg" className="mt-4">Lanjut</Button>}
          </div>
        );
        
      case "dropdown":
        // For stage selection, options depend on whether child/teen/adult options are provided
        const opts = question.options || question.childOptions || question.teenOptions || question.adultOptions || [];
        return (
          <div className="flex flex-col gap-3">
            {opts.map((opt, idx) => (
              <Button 
                key={idx} 
                variant={currentAnswer === opt ? "default" : "outline"}
                className="justify-start h-14 text-lg text-left hover:border-primary transition"
                onClick={() => { onAnswer(opt); setTimeout(() => onNext?.(), 150); }}
              >
                {opt}
              </Button>
            ))}
          </div>
        );

      case "transition":
        return (
          <div className="flex justify-center mt-8">
             <Button onClick={onNext} size="lg" className="w-full md:w-auto px-12 h-14 text-lg">Mengerti, Lanjut</Button>
          </div>
        );

      case "ranking":
        const currentArr = (Array.isArray(currentAnswer) ? currentAnswer : []) as string[];
        return (
          <div className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground font-medium">Pilih maksimal 3 opsi ({currentArr.length}/3 terpilih)</p>
            <div className="flex flex-wrap gap-3">
              {(question.options || []).map((opt, idx) => {
                const isSelected = currentArr.includes(opt);
                const disabled = !isSelected && currentArr.length >= 3;
                return (
                  <Button 
                    key={idx} 
                    variant={isSelected ? "default" : "outline"}
                    className="h-auto py-3 px-5 text-left whitespace-normal hover:border-primary transition rounded-full"
                    disabled={disabled}
                    onClick={() => handleRankingToggle(opt)}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
            {currentArr.length > 0 && (
              <Button onClick={onNext} size="lg" className="mt-4">Lanjut</Button>
            )}
          </div>
        );

      case "scale-1-5":
        const scaleLabels = ["Sangat tidak sesuai", "Kurang sesuai", "Netral / kadang-kadang", "Cukup sesuai", "Sangat sesuai"];
        return (
          <div className="flex flex-col gap-3">
            {scaleLabels.map((label, idx) => {
              const val = idx + 1;
              return (
                <Button 
                  key={val} 
                  variant={currentAnswer === val ? "default" : "outline"}
                  className="justify-start h-auto py-4 text-left whitespace-normal hover:border-primary transition"
                  onClick={() => { onAnswer(val); setTimeout(() => onNext?.(), 250); }}
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary font-bold">{val}</span>
                  {label}
                </Button>
              )
            })}
          </div>
        );

      case "yes-no":
        return (
          <div className="flex gap-4">
            <Button 
                variant={currentAnswer === "yes" ? "default" : "outline"}
                className="flex-1 h-20 text-xl hover:border-primary transition"
                onClick={() => { onAnswer("yes"); setTimeout(() => onNext?.(), 200); }}
              >
                Ya
            </Button>
            <Button 
                variant={currentAnswer === "no" ? "default" : "outline"}
                className="flex-1 h-20 text-xl hover:border-primary transition"
                onClick={() => { onAnswer("no"); setTimeout(() => onNext?.(), 200); }}
              >
                Tidak
            </Button>
          </div>
        );

      case "tap-card":
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(question.options || []).map((opt, idx) => (
              <Button 
                key={idx} 
                variant={currentAnswer === opt ? "default" : "outline"}
                className="h-auto min-h-[5rem] text-lg whitespace-normal p-4 flex items-center text-left hover:border-primary transition"
                onClick={() => { onAnswer(opt); setTimeout(() => onNext?.(), 200); }}
              >
                {opt}
              </Button>
            ))}
          </div>
        );
    }
  };

  const getPrompt = () => {
    if (question.prompt) return question.prompt;
    if (question.prompts) {
      // We will actually pass down the chosen stage in the future, 
      // but for now let's just pick adult by default if stage is not passed.
      // Wait, we need the stage from props or store! Let's handle it in Assessment.tsx
      return "";
    }
    return "";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-border/60">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary-soft text-primary rounded-full">
            {question.scope}
          </span>
        </div>
        {/* We expect Assessment.tsx to inject the correct prompt string into question.prompt before passing down */}
        <CardTitle className="text-2xl md:text-3xl leading-relaxed text-foreground">{question.prompt}</CardTitle>
        {question.helperText && (
          <CardDescription className="text-base mt-2">{question.helperText}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {renderInput()}
      </CardContent>
    </Card>
  );
}
