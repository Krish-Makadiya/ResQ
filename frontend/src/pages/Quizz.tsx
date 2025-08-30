import { useEffect, useMemo, useState } from 'react';
import SmoothSlider from '@/components/SmoothSlider';
import { apiGet, apiPost } from '@/lib/api';

type WeeklyQuiz = {
  id: string;
  title: string;
  description?: string;
  questions: { id: string; text: string; type: 'scale'; minValue: number; maxValue: number }[];
};

export default function Quizz() {
  const [quiz, setQuiz] = useState<WeeklyQuiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiGet<WeeklyQuiz>('/quiz/weekly/current')
      .then((q) => {
        setQuiz(q);
        const init: Record<string, number> = {};
        (q.questions || []).forEach((qq) => (init[qq.id] = Math.floor((qq.maxValue ?? 3) / 2)));
        setAnswers(init);
      })
      .catch(() => setError('Failed to load weekly quiz.'));
  }, []);

  const maxScore = useMemo(() => {
    if (!quiz) return 0;
    return (quiz.questions || []).reduce((acc, q) => acc + (q.maxValue ?? 3), 0);
  }, [quiz]);

  const sum = useMemo(() => {
    return Object.values(answers).reduce((a, b) => a + b, 0);
  }, [answers]);

  const submit = async () => {
    if (!quiz) return;
    setSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer })),
      };
      const r = await apiPost<{ id: string; score: number }>('/quiz/weekly/respond', payload);
      setResult(r.score);
    } catch (e) {
      setError('Failed to submit quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!quiz) return <div>Loading weekly quiz…</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 md:px-8 space-y-8">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-3xl font-bold mb-1 text-primary drop-shadow">{quiz.title}</h2>
        {quiz.description && <p className="text-neutral-600 dark:text-neutral-400 text-lg">{quiz.description}</p>}
      </div>

      {(quiz.questions || []).map((q) => (
        <div key={q.id} className="rounded-xl bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 p-6 mb-4 flex flex-col gap-2">
          <div className="font-semibold mb-2 text-lg text-neutral-800 dark:text-neutral-200">{q.text}</div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500">{q.minValue ?? 0}</span>
            <SmoothSlider
              min={q.minValue ?? 0}
              max={q.maxValue ?? 3}
              step={1}
              value={answers[q.id] ?? 0}
              onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
            />
            <span className="text-xs text-neutral-500">{q.maxValue ?? 3}</span>
            <span className="ml-2 text-base font-medium text-primary">{answers[q.id] ?? 0}</span>
          </div>
        </div>
      ))} 

      <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
        <button
          className="rounded-lg bg-primary hover:bg-primary/90 transition text-white px-6 py-3 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
          onClick={submit}
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
        <div className="text-base opacity-80 bg-neutral-100 dark:bg-neutral-700 px-4 py-2 rounded shadow-inner">
          Current total: <span className="font-bold">{sum}</span> / {maxScore}
        </div>
        {result !== null && (
          <div className="text-base font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 px-4 py-2 rounded shadow">
            Submitted score: {result}%
          </div>
        )}
      </div>
      <div className="text-xs text-neutral-500 mt-3">Weekly: one submission per week recommended. Impacts weekly wellness score.</div>
    </div>
  );
}


