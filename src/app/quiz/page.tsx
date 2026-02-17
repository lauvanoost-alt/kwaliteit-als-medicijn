'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  Star,
  RefreshCw,
  Share2,
  ChevronRight,
  Lightbulb,
  Sparkles,
  Target,
  BarChart3,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question:
      'Hoeveel procent van de Nederlandse gemeenten overschrijdt jaarlijks het jeugdzorgbudget?',
    options: ['50%', '70%', '90%', '30%'],
    correctIndex: 2,
    explanation:
      '90% van de gemeenten overschrijdt jaarlijks het jeugdzorgbudget met gemiddeld 20%. Dit laat zien hoe structureel het financieringsprobleem is.',
  },
  {
    question:
      'Hoeveel zijn de totale kosten voor jeugdzorg landelijk gestegen tussen 2018-2024?',
    options: ['+50%', '+80%', '+132%', '+200%'],
    correctIndex: 2,
    explanation:
      'De kosten zijn meer dan verdubbeld (+132%), terwijl het aantal jeugdigen minder hard groeide. De kosten per jeugdige zijn dus fors gestegen.',
  },
  {
    question:
      'Wat zijn de kosten per 1.000 inwoners in de duurste gemeente in ZHZ (Alblasserdam) vergeleken met de goedkoopste (Hoeksche Waard)?',
    options: [
      '\u20AC455k vs \u20AC222k',
      '\u20AC350k vs \u20AC200k',
      '\u20AC500k vs \u20AC300k',
      '\u20AC400k vs \u20AC250k',
    ],
    correctIndex: 0,
    explanation:
      'Het verschil is meer dan factor 2! En ~22% van deze variatie hangt samen met lokale werkwijzen \u2013 niet met bevolkingskenmerken. Er is dus ruimte om te sturen.',
  },
  {
    question:
      'Hoeveel volumereductie behaalde het Bernhoven ziekenhuis met Kwaliteit als Medicijn?',
    options: ['3%', '7-13%', '20%', '1%'],
    correctIndex: 1,
    explanation:
      'Bernhoven en Rivas bereikten 7-13% volumereductie binnen 2 jaar. Dit bewijst dat het concept werkt in de curatieve zorg.',
  },
  {
    question:
      'Hoeveel procent van de jongeren ziet na overbruggingszorg (initiatief De Hoop) volledig af van SGGZ?',
    options: ['5%', '10%', '20%', '40%'],
    correctIndex: 2,
    explanation:
      '20% ziet volledig af van SGGZ en nog eens 40% verschuift naar lichtere BGGZ. Samen betekent dit dat 60% van de jongeren geen specialistische GGZ meer nodig heeft na het overbruggingstraject.',
  },
  {
    question:
      'Hoeveel jeugdhulpaanbieders had Veendam voordat ze reorganiseerden?',
    options: ['50', '100', '220', '30'],
    correctIndex: 2,
    explanation:
      'Veendam ging van 220 aanbieders terug naar 6, gebundeld in het Jeugdexpertise Punt (JEP). Het resultaat: wachtlijsten verdwenen volledig en kosten daalden met 13%.',
  },
  {
    question:
      'Hoeveel arbeidskrachten tekort verwacht de jeugdzorg in 2034?',
    options: ['1.000', '3.000', '5.500', '10.000'],
    correctIndex: 2,
    explanation:
      'Het tekort groeit van 1.000 in 2024 naar 5.500 in 2034. Dit maakt het nog urgenter om met minder personeel betere zorg te leveren \u2013 precies wat Kwaliteit als Medicijn beoogt.',
  },
  {
    question: 'Wat is de kerngedachte achter "Kwaliteit als Medicijn"?',
    options: [
      'Door kwaliteit te verhogen dalen volumes en kosten vanzelf',
      'Door kosten te verlagen stijgt de kwaliteit automatisch',
      'Door meer personeel in te zetten verbetert alles',
      'Door wachtlijsten weg te werken lost het probleem zich op',
    ],
    correctIndex: 0,
    explanation:
      'De kern van Kwaliteit als Medicijn is dat betere kwaliteit leidt tot minder onnodige behandelingen, kortere trajecten en passendere zorg. Het resultaat: lagere volumes en kosten \u2014 niet als doel op zich, maar als gevolg van betere zorg.',
  },
  {
    question: 'Wat bedoelen we met "normaliseren" binnen het Kwaliteit als Medicijn-gedachtegoed?',
    options: [
      'Jongeren leren dat hun problemen niet bestaan',
      'Erkennen dat niet elk probleem een diagnose of behandeling nodig heeft',
      'Alle jongeren dezelfde standaardbehandeling geven',
      'De wachtlijsten accepteren als normaal',
    ],
    correctIndex: 1,
    explanation:
      'Normaliseren betekent dat we erkennen dat veel klachten bij het opgroeien horen en niet altijd een GGZ-diagnose of behandeling vereisen. Door te de-medicaliseren en te vertrouwen op eigen kracht, het netwerk en laagdrempelige ondersteuning, voorkomen we onnodige instroom in de GGZ.',
  },
  {
    question: 'Waarom is de samenwerking tussen aanbieders, gemeenten en de inkoper (SoJ) zo cruciaal in het Kwaliteit als Medicijn-model?',
    options: [
      'Omdat de wet dat verplicht',
      'Omdat geen enkele partij alleen de transformatie kan realiseren \u2014 het vereist gelijktijdige actie op meerdere niveaus',
      'Omdat het budget anders niet wordt uitgegeven',
      'Omdat de inspectie erop controleert',
    ],
    correctIndex: 1,
    explanation:
      'De transformatie kan alleen slagen als alle partijen tegelijk bewegen: aanbieders innoveren in hun zorgaanbod, gemeenten faciliteren met beleid en verwijsafspraken, en de inkoper (SoJ) cre\u00ebert ruimte in contracten en bekostiging. Dit is het "vuist op vuist"-principe \u2014 elke actie versterkt de andere.',
  },
];

const verdicts = [
  {
    min: 0,
    max: 3,
    title: 'Beginner',
    description: 'Je hebt nog veel te ontdekken over de jeugdzorg!',
    icon: Lightbulb,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    min: 4,
    max: 6,
    title: 'Op weg',
    description: 'Je kent de basis, maar er valt nog veel te leren.',
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    min: 7,
    max: 8,
    title: 'Expert in wording',
    description: 'Indrukwekkend! Je kent de materie goed.',
    icon: Star,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
  },
  {
    min: 9,
    max: 10,
    title: 'Kwaliteitsmeester',
    description: 'Je bent klaar om de transformatie te leiden!',
    icon: Trophy,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
  },
];

/* ------------------------------------------------------------------ */
/*  Confetti particle component                                        */
/* ------------------------------------------------------------------ */

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
}

function ConfettiCanvas({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = [
      '#dd4b6f',
      '#c92d55',
      '#ea7491',
      '#f3a4b6',
      '#fbbf24',
      '#34d399',
      '#60a5fa',
      '#a78bfa',
    ];
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 3,
        y: 2 + Math.random() * 4,
      },
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 2500);
    return () => clearTimeout(timer);
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${Math.random() * 0.3}s`,
            animationDuration: `${1.5 + Math.random() * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Quiz Component                                                */
/* ------------------------------------------------------------------ */

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [scoreAnimation, setScoreAnimation] = useState(false);
  const [shuffleSeed] = useState(() => Math.random());

  // Shuffle questions on mount (stable across re-renders via seed)
  const shuffledQuestions = useMemo(() => shuffleArray(questions), [shuffleSeed]);

  const question = shuffledQuestions[currentQ];
  const progress = ((currentQ + (showExplanation ? 1 : 0)) / shuffledQuestions.length) * 100;

  const handleAnswer = useCallback(
    (index: number) => {
      if (showExplanation) return;

      setSelectedAnswer(index);
      setShowExplanation(true);

      const isCorrect = index === question.correctIndex;
      setAnsweredCorrectly(isCorrect);

      if (isCorrect) {
        setScore((s) => s + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    },
    [showExplanation, question.correctIndex],
  );

  const nextQuestion = useCallback(() => {
    if (currentQ < shuffledQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setAnsweredCorrectly(null);
    } else {
      setFinished(true);
      setScoreAnimation(true);
    }
  }, [currentQ, shuffledQuestions.length]);

  const restart = useCallback(() => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
    setAnsweredCorrectly(null);
    setScoreAnimation(false);
  }, []);

  const shareScore = useCallback(async () => {
    const text = `Ik scoorde ${score}/${shuffledQuestions.length} op de Kwaliteit als Medicijn quiz! Hoe goed ken jij de jeugdzorg cijfers? Doe de quiz!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Quiz: Kwaliteit als Medicijn', text });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert('Score gekopieerd naar je klembord!');
    }
  }, [score]);

  const verdict = verdicts.find((v) => score >= v.min && score <= v.max)!;

  const optionLabels = ['A', 'B', 'C', 'D'];

  /* ---------------------------------------------------------------- */
  /*  Render: Results screen                                           */
  /* ---------------------------------------------------------------- */
  if (finished) {
    const VerdictIcon = verdict.icon;
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <section className="min-h-[80vh] bg-gradient-to-b from-primary-50 via-white to-surface-100">
        <ConfettiCanvas active={scoreAnimation} />

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <Trophy className="h-10 w-10 text-primary-700" />
            </div>
            <h1 className="text-3xl font-bold text-primary-900 sm:text-4xl">
              Quiz voltooid!
            </h1>
          </div>

          {/* Score card */}
          <div
            className={`relative mb-8 overflow-hidden rounded-2xl border-2 ${verdict.border} ${verdict.bg} p-8 text-center shadow-lg transition-all duration-700 ${
              scoreAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <Sparkles className="absolute right-4 top-4 h-6 w-6 text-primary-300 opacity-50" />
            <Sparkles className="absolute bottom-4 left-4 h-5 w-5 text-primary-300 opacity-40" />

            <div className="mb-2 flex items-center justify-center gap-2">
              <VerdictIcon className={`h-8 w-8 ${verdict.color}`} />
              <span className={`text-xl font-bold ${verdict.color}`}>{verdict.title}</span>
            </div>
            <p className="mb-6 text-gray-600">{verdict.description}</p>

            {/* Animated score ring */}
            <div className="relative mx-auto mb-4 h-36 w-36">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/60"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="text-primary-600 transition-all duration-1000 ease-out"
                  strokeDasharray={`${percentage * 3.267} 326.7`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-primary-800">
                  {score}/{shuffledQuestions.length}
                </span>
                <span className="text-sm text-gray-500">correct</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mb-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={shareScore}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary-200 bg-white px-6 py-3.5 font-semibold text-primary-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:shadow-md"
            >
              <Share2 className="h-5 w-5" />
              Deel je score
            </button>
            <button
              onClick={restart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-primary-800 hover:shadow-md"
            >
              <RefreshCw className="h-5 w-5" />
              Opnieuw spelen
            </button>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-primary-900">
              <Sparkles className="h-5 w-5 text-primary-500" />
              Wil je meer weten?
            </h2>
            <p className="mb-5 text-gray-600">
              Bekijk het dashboard of sluit je aan bij de community.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white transition-all hover:bg-primary-800"
              >
                <BarChart3 className="h-5 w-5" />
                Bekijk het dashboard
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/community"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary-200 bg-white px-5 py-3 font-semibold text-primary-700 transition-all hover:bg-primary-50"
              >
                Sluit je aan
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render: Question screen                                          */
  /* ---------------------------------------------------------------- */
  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-primary-50 via-white to-surface-100">
      <ConfettiCanvas active={showConfetti} />

      {/* CSS for animations */}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti-fall 2s ease-in forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(221,75,111,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(221,75,111,0); }
        }
        .animate-pulse-border {
          animation: pulse-border 1s ease-in-out;
        }
        @keyframes score-pop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-score-pop {
          animation: score-pop 0.4s ease-out;
        }
      `}</style>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
            <Brain className="h-4 w-4" />
            Quiz: Kwaliteit als Medicijn
          </div>
          <h1 className="text-2xl font-bold text-primary-900 sm:text-3xl">
            Hoe goed ken jij de jeugdzorg cijfers?
          </h1>
          <p className="mt-1 text-gray-500">
            Test je kennis met {shuffledQuestions.length} vragen over de jeugdzorg in Zuid-Holland Zuid
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
          <span>
            Vraag {currentQ + 1} van {shuffledQuestions.length}
          </span>
          <span className={`flex items-center gap-1 ${answeredCorrectly === true ? 'animate-score-pop' : ''}`}>
            <Star className="h-4 w-4 text-primary-500" />
            {score} punt{score !== 1 ? 'en' : ''}
          </span>
        </div>
        <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-surface-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div
          className={`mb-6 rounded-2xl border border-surface-200 bg-white p-6 shadow-lg sm:p-8 ${
            shake ? 'animate-shake' : ''
          }`}
        >
          <h2 className="mb-6 text-lg font-bold leading-relaxed text-gray-900 sm:text-xl">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correctIndex;
              const revealed = showExplanation;

              let buttonClasses =
                'w-full flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left font-medium transition-all duration-200';

              if (!revealed) {
                buttonClasses +=
                  ' border-surface-200 bg-white hover:border-primary-300 hover:bg-primary-50 hover:shadow-md cursor-pointer active:scale-[0.98]';
              } else if (isCorrect) {
                buttonClasses +=
                  ' border-green-400 bg-green-50 text-green-800 animate-pulse-border';
              } else if (isSelected && !isCorrect) {
                buttonClasses += ' border-red-300 bg-red-50 text-red-700';
              } else {
                buttonClasses += ' border-surface-200 bg-surface-50 text-gray-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={revealed}
                  className={buttonClasses}
                >
                  {/* Label badge */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                      revealed && isCorrect
                        ? 'bg-green-200 text-green-800'
                        : revealed && isSelected && !isCorrect
                          ? 'bg-red-200 text-red-700'
                          : revealed
                            ? 'bg-surface-200 text-gray-400'
                            : 'bg-primary-100 text-primary-700'
                    }`}
                  >
                    {optionLabels[idx]}
                  </span>

                  <span className="flex-1">{option}</span>

                  {/* Feedback icon */}
                  {revealed && isCorrect && (
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-green-500" />
                  )}
                  {revealed && isSelected && !isCorrect && (
                    <XCircle className="h-6 w-6 shrink-0 text-red-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation panel */}
        {showExplanation && (
          <div className="animate-fade-in-up mb-6">
            <div
              className={`rounded-2xl border p-5 ${
                answeredCorrectly
                  ? 'border-green-200 bg-green-50'
                  : 'border-amber-200 bg-amber-50'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb
                  className={`h-5 w-5 ${
                    answeredCorrectly ? 'text-green-600' : 'text-amber-600'
                  }`}
                />
                <span
                  className={`font-bold ${
                    answeredCorrectly ? 'text-green-800' : 'text-amber-800'
                  }`}
                >
                  {answeredCorrectly ? 'Goed zo!' : 'Niet helemaal...'}
                </span>
              </div>
              <p
                className={`leading-relaxed ${
                  answeredCorrectly ? 'text-green-700' : 'text-amber-700'
                }`}
              >
                {question.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <div className="animate-fade-in-up flex justify-end">
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 rounded-xl bg-primary-700 px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-primary-800 hover:shadow-lg active:scale-[0.97]"
            >
              {currentQ < shuffledQuestions.length - 1 ? (
                <>
                  Volgende vraag
                  <ArrowRight className="h-5 w-5" />
                </>
              ) : (
                <>
                  Bekijk resultaat
                  <Trophy className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
