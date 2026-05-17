"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/Modal";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { CATEGORIES } from "@/types/content";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";

const questionSchema = z.object({
  question:      z.string().min(5, "Enter a question"),
  type:          z.enum(["mcq", "output", "theory", "dsa"]),
  options:       z.array(z.string().min(1)).length(4).optional(),
  correctAnswer: z.string().min(0),
  explanation:   z.string().min(5, "Add an explanation"),
  difficulty:    z.enum(["easy", "medium", "hard"]),
  marks:         z.number().min(1),
});

const quizSchema = z.object({
  title:        z.string().min(3),
  description:  z.string().min(10),
  category:     z.string().min(1),
  duration:     z.number().min(5),
  passingMarks: z.number().min(1),
  status:       z.enum(["draft", "published"]),
  questions:    z.array(questionSchema).min(1, "Add at least one question"),
});

type QuizFormData = z.infer<typeof quizSchema>;

const DEMO_QUIZZES = [
  { id: "1", title: "JavaScript Closures Quiz",     category: "JavaScript", questions: 10, duration: 15, attempts: 1240, status: "published" },
  { id: "2", title: "ReactJS Hooks MCQ Test",       category: "ReactJS",    questions: 15, duration: 20, attempts: 876,  status: "published" },
  { id: "3", title: "Python DSA — Arrays Output",   category: "DSA",        questions: 8,  duration: 12, attempts: 2341, status: "published" },
  { id: "4", title: "Node.js Interview Rapid Fire", category: "Node.js",    questions: 20, duration: 25, attempts: 456,  status: "draft"     },
  { id: "5", title: "TypeScript Types Quiz",        category: "TypeScript", questions: 12, duration: 18, attempts: 0,    status: "draft"     },
];

function QuizCreatorForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      status: "draft", duration: 15, passingMarks: 40,
      questions: [{ type: "mcq", difficulty: "medium", marks: 2, options: ["", "", "", ""], explanation: "", correctAnswer: "0" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  const onSubmit = async (data: QuizFormData) => {
    console.log("Quiz data:", data);
    toast.success("Quiz created successfully!");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Basic Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Quiz Title *</label>
        <input {...register("title")} className="input-base" placeholder="e.g. JavaScript Closures Quiz" />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description *</label>
        <textarea {...register("description")} rows={2} className="input-base resize-none" placeholder="What topics does this quiz cover?" />
        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Category *</label>
          <select {...register("category")} className="input-base text-xs">
            <option value="">Select...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Duration (min)</label>
          <input {...register("duration", { valueAsNumber: true })} type="number" className="input-base text-xs" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Pass Marks (%)</label>
          <input {...register("passingMarks", { valueAsNumber: true })} type="number" className="input-base text-xs" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
          <select {...register("status")} className="input-base text-xs">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Questions */}
      <div className="border border-gray-200 dark:border-[#33334b] rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-200">
            Questions ({fields.length})
          </h3>
          <button
            type="button"
            onClick={() => append({ type: "mcq", difficulty: "medium", marks: 2, options: ["", "", "", ""], explanation: "", correctAnswer: "0", question: "" })}
            className="btn-secondary text-xs py-1 px-3"
          >
            + Add Question
          </button>
        </div>

        {fields.map((field, idx) => (
          <div key={field.id} className="bg-gray-50 dark:bg-white/3 rounded-xl p-4 space-y-3 border border-gray-100 dark:border-[#33334b]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">Q{idx + 1}</span>
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(idx)}
                  className="text-xs text-red-500 hover:text-red-700">Remove</button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input {...register(`questions.${idx}.question`)} className="input-base text-xs"
                  placeholder="Enter question text..." />
              </div>
              <select {...register(`questions.${idx}.type`)} className="input-base text-xs">
                <option value="mcq">MCQ</option>
                <option value="output">Output</option>
                <option value="theory">Theory</option>
                <option value="dsa">DSA</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((optIdx) => (
                <input
                  key={optIdx}
                  {...register(`questions.${idx}.options.${optIdx}`)}
                  className="input-base text-xs"
                  placeholder={`Option ${optIdx + 1}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Correct Ans (0-3)</label>
                <input {...register(`questions.${idx}.correctAnswer`)} className="input-base text-xs" placeholder="0" />
              </div>
              <select {...register(`questions.${idx}.difficulty`)} className="input-base text-xs">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <input {...register(`questions.${idx}.marks`, { valueAsNumber: true })}
                type="number" className="input-base text-xs" placeholder="Marks" />
            </div>

            <input {...register(`questions.${idx}.explanation`)} className="input-base text-xs"
              placeholder="Explanation for the correct answer..." />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
          {isSubmitting ? "Saving..." : "Save Quiz"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  );
}

export default function AdminQuizzesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch]       = useState("");

  const filtered = DEMO_QUIZZES.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Management</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Create MCQ & coding quizzes</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">+ Create Quiz</button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Quizzes", value: "34",  icon: "✏️" },
          { label: "Published",     value: "26",  icon: "✅" },
          { label: "Attempts",      value: "4.9K",icon: "🎯" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      <input type="text" placeholder="Search quizzes..." value={search}
        onChange={(e) => setSearch(e.target.value)} className="input-base max-w-sm" />

      <div className="space-y-3">
        {filtered.map((q) => (
          <div key={q.id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:shadow-sm transition">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center text-xl shrink-0">✏️</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{q.title}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <CategoryBadge category={q.category} />
                <span className="text-xs text-gray-400">❓ {q.questions} Qs</span>
                <span className="text-xs text-gray-400">⏱ {q.duration}m</span>
                <span className="text-xs text-gray-400">🎯 {q.attempts.toLocaleString()} attempts</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={cn("badge text-xs",
                q.status === "published"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
              )}>
                {q.status}
              </span>
              <button className="btn-secondary text-xs py-1 px-3">Edit</button>
              <button className="text-xs px-2 py-1 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-300">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create New Quiz" size="xl">
        <QuizCreatorForm onSuccess={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
