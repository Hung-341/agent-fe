import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="px-4 py-3 border-b border-border bg-background/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">
          Câu hỏi {currentStep} / {totalSteps}
        </span>
        <span className="text-xs font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          data-testid="progress-bar-fill"
        />
      </div>
    </div>
  );
}
