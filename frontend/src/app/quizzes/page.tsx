"use client";

import { useState, useEffect, useCallback } from "react";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { cn } from "@/utils/cn";

const DEMO_QUIZZES = [
  {
    id: "1", title: "JavaScript Closures Quiz", category: "JavaScript",
    questions: [
      { id: "q1", question: "What is a closure in JavaScript?",
        options: ["A function with access to outer scope", "A sealed object", "An async function", "A prototype method"],
        correct: 0, explanation: "A closure is a function that retains access to its outer scope even after the outer function returns." },
      { id: "q2", question: "What does `typeof null` return?",
        options: ["null", "undefined", "object", "boolean"],
        correct: 2, explanation: "`typeof null` returns 'object' — this is a known JavaScript quirk." },
      { id: "q3", question: "Which method creates a new array by applying a function to each element?",
        options: ["filter()", "map()", "reduce()", "forEach()"],
        correct: 1, explanation: "`Array.prototype.map()` creates a new array with the results of calling a function on every element." },
      { id: "q4", question: "What is the output of: `console.log(0 == '0')`?",
        options: ["true", "false", "undefined", "TypeError"],
        correct: 0, explanation: "Loose equality (==) performs type coercion. `0 == '0'` is true because '0' is coerced to number 0." },
    ],
    duration: 10, difficulty: "medium",
  },
  {
    id: "2", title: "ReactJS Hooks MCQ",  category: "ReactJS",
    questions: [
      { id: "q1", question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useRef", "useMemo"],
        correct: 1, explanation: "useEffect is used to perform side effects like API calls, subscriptions, and DOM mutations." },
      { id: "q2", question: "What does the second argument of useEffect control?",
        options: ["State updates", "Dependency array", "Props", "Context"],
        correct: 1, explanation: "The dependency array controls when the effect re-runs — empty array means run once, omitted means run every render." },
      { id: "q3", question: "Which hook should you use to store a mutable value that doesn't trigger re-render?",
        options: ["useState", "useCallback", "useRef", "useMemo"],
        correct: 2, explanation: "useRef stores mutable values that persist between renders without causing re-renders." },
    ],
    duration: 8, difficulty: "easy",
  },
  {
    id: "3", title: "Python DSA Quiz",    category: "DSA",
    questions: [
      { id: "q1", question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correct: 2, explanation: "Binary search eliminates half the search space at each step, giving O(log n) time complexity." },
      { id: "q2", question: "Which data structure uses LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Heap", "Graph"],
        correct: 1, explanation: "Stack uses LIFO — the last element pushed is the first to be popped." },
      { id: "q3", question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correct: 2, explanation: "Quick Sort's worst case is O(n²) when pivot selection is poor, but average case is O(n log n)." },
    ],
    duration: 8, difficulty: "hard",
  },
];

type Answers = Record<string, number>;

function QuizAttempt({ quiz, onBack }: { quiz: typeof DEMO_QUIZZES[0]; onBack: () => void }) {
  const [answers, setAnswers]   = useState<Answers>({});
  const [submitted, setSubmit]  = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
  const [current, setCurrent]   = useState(0);

  const handleSubmit = useCallback(() => { setSubmit(true); }, []);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) { clearInterval(t); handleSubmit(); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [submitted, handleSubmit]);

  const score = quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
  const pct   = Math.round((score / quiz.questions.length) * 100);
  const mm    = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss    = String(timeLeft % 60).padStart(2, "0");

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
        <div className={cn(
          "rounded-2xl p-8 text-center text-white",
          pct >= 60 ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-red-500 to-rose-600"
        )}>
          <div className="text-5xl mb-3">{pct >= 60 ? "🎉" : "😔"}</div>
          <h2 className="text-2xl font-bold mb-1">{pct >= 60 ? "Excellent!" : "Keep Practicing!"}</h2>
          <p className="text-white/80 text-sm mb-4">{quiz.title}</p>
          <div className="text-5xl font-black">{pct}%</div>
          <p className="text-white/80 text-sm mt-2">{score} / {quiz.questions.length} correct</p>
        </div>

        <div className="space-y-4">
          {quiz.questions.map((q, i) => {
            const userAns  = answers[q.id] ?? -1;
            const isRight  = userAns === q.correct;
            return (
              <div key={q.id} className={cn("card p-5 border-l-4", isRight ? "border-green-500" : "border-red-500")}>
                <div className="flex items-start gap-2 mb-3">
                  <span className={cn("text-lg shrink-0", isRight ? "text-green-500" : "text-red-500")}>
                    {isRight ? "✅" : "❌"}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">Q{i+1}. {q.question}</p>
                </div>
                <div className="space-y-1.5 ml-7">
                  {q.options.map((opt, idx) => (
                    <div key={idx} className={cn(
                      "text-xs px-3 py-2 rounded-lg",
                      idx === q.correct ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 font-medium" :
                      idx === userAns && !isRight ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300" :
                      "text-gray-500 dark:text-slate-400"
                    )}>
                      {idx === q.correct ? "✓ " : idx === userAns && !isRight ? "✗ " : "  "}{opt}
                    </div>
                  ))}
                </div>
                <div className="mt-3 ml-7 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                  <p className="text-xs text-blue-700 dark:text-blue-300">💡 {q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={() => { setAnswers({}); setSubmit(false); setTimeLeft(quiz.duration * 60); setCurrent(0); }}
            className="btn-primary flex-1">
            🔄 Retry Quiz
          </button>
          <button onClick={onBack} className="btn-secondary flex-1">← Back to Quizzes</button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];
  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">{quiz.title}</h2>
          <p className="text-xs text-gray-400">{current + 1} / {quiz.questions.length} questions</p>
        </div>
        <div className={cn(
          "px-4 py-2 rounded-xl font-mono text-sm font-bold",
          timeLeft < 60 ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300" :
          "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300"
        )}>
          ⏱ {mm}:{ss}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className="bg-blue-600 h-1.5 rounded-full transition-all"
          style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="card p-6">
        <p className="text-base font-semibold text-gray-900 dark:text-white mb-5">
          Q{current + 1}. {q.question}
        </p>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl text-sm transition-all border-2",
                answers[q.id] === idx
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium"
                  : "border-gray-200 dark:border-[#33334b] text-gray-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-gray-50 dark:hover:bg-white/3"
              )}
            >
              <span className="font-mono text-xs mr-2 text-gray-400">{["A", "B", "C", "D"][idx]}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {current > 0 && (
          <button onClick={() => setCurrent((p) => p - 1)} className="btn-secondary flex-1">← Previous</button>
        )}
        {current < quiz.questions.length - 1 ? (
          <button onClick={() => setCurrent((p) => p + 1)} className="btn-primary flex-1">Next →</button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary flex-1 bg-green-600 hover:bg-green-700">
            Submit Quiz ✓
          </button>
        )}
      </div>
    </div>
  );
}

export default function PublicQuizzesPage() {
  const [selected, setSelected] = useState<typeof DEMO_QUIZZES[0] | null>(null);
  const [search, setSearch]     = useState("");

  const filtered = DEMO_QUIZZES.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.category.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] py-8 px-4">
      <QuizAttempt quiz={selected} onBack={() => setSelected(null)} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-black mb-3">Test Your Knowledge</h1>
          <p className="text-purple-200 text-sm sm:text-base mb-6">
            Free coding quizzes — no login required. Practice anytime!
          </p>
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-2xl text-gray-900 text-sm focus:outline-none shadow-lg"
          />
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">{filtered.length} quizzes available</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((q) => (
            <div key={q.id} className="card hover:shadow-md transition-all overflow-hidden group">
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 dark:from-purple-500/10 dark:to-indigo-500/10 p-5">
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{q.title}</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <CategoryBadge category={q.category} />
                  <span className={cn("badge text-xs",
                    q.difficulty === "easy"   ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300" :
                    q.difficulty === "medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300" :
                    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                  )}>
                    {q.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-slate-500 mb-4">
                  <span>❓ {q.questions.length} questions</span>
                  <span>⏱ {q.duration} min</span>
                </div>
                <button
                  onClick={() => setSelected(q)}
                  className="w-full btn-primary text-sm justify-center"
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
