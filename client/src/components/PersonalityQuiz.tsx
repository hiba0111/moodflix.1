import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface QuizAnswers {
  mood: string;
  company: string;
  ageGroup: string;
  preference: string;
}

interface PersonalityQuizProps {
  onComplete: (answers: QuizAnswers) => void;
  onClose: () => void;
}

export default function PersonalityQuiz({ onComplete, onClose }: PersonalityQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    mood: "",
    company: "",
    ageGroup: "",
    preference: "",
  });

  const questions = [
    {
      title: "What's your mood today?",
      key: "mood",
      options: ["Happy", "Sad", "Adventurous", "Contemplative", "Energetic", "Relaxed"],
    },
    {
      title: "Who are you watching with?",
      key: "company",
      options: ["Alone", "With Friends", "With Family", "With Partner", "With Kids"],
    },
    {
      title: "What age group are you with?",
      key: "ageGroup",
      options: ["Solo/Adults Only", "Kids (5-12)", "Teens (13-17)", "All Ages", "Seniors"],
    },
    {
      title: "Do you prefer...?",
      key: "preference",
      options: ["Something New & Trendy", "Timeless Classics", "Hidden Gems", "Award Winners"],
    },
  ];

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [questions[step].key]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const currentQuestion = questions[step];
  const isAnswered = answers[currentQuestion.key as keyof QuizAnswers];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-2">
            Question {step + 1} of {questions.length}
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">{currentQuestion.title}</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleSelect(option)}
              variant={answers[currentQuestion.key as keyof QuizAnswers] === option ? "default" : "outline"}
              className={
                answers[currentQuestion.key as keyof QuizAnswers] === option
                  ? "bg-primary border-primary"
                  : "border-border"
              }
            >
              {option}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {step === questions.length - 1 ? "Get Recommendations" : "Next"}
        </Button>
      </Card>
    </div>
  );
}
