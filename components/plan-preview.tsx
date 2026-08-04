"use client";

import { useState } from "react";

type Task = {
  id: string;
  title: string;
  /** Why this task, for this student, at this school. The whole pitch is that
   *  the reason is specific — so every row has to carry one. */
  reason: string;
  due: string;
};

const TASKS: readonly Task[] = [
  {
    id: "courses",
    title: "Log your Grade 11 courses and semester 1 grades",
    reason: "Sets the baseline everything else is planned against.",
    due: "Done Jan 12",
  },
  {
    id: "targets",
    title: "Pick target schools and an intended major",
    reason: "Carnegie Mellon, Georgia Tech, Michigan · Computer Science",
    due: "Done Jan 12",
  },
  {
    id: "spec",
    title: "Write a 2-page spec for the robotics team's scouting app",
    reason: "One project you can talk about in depth beats five you can't.",
    due: "This week",
  },
  {
    id: "rec",
    title: "Ask Mr. Ferrer for your first recommendation",
    reason: "Junior-year STEM teachers book up by April. Ask before they do.",
    due: "Before spring break",
  },
  {
    id: "sat",
    title: "Register for the June 7 SAT",
    reason: "Leaves an August retake in reserve without touching senior fall.",
    due: "By May 8",
  },
  {
    id: "summer",
    title: "Apply to Georgia Tech's summer computing program",
    reason: "Applications close before most juniors start looking.",
    due: "Feb 28",
  },
];

const INITIALLY_DONE = ["courses", "targets"];

export function PlanPreview() {
  const [doneIds, setDoneIds] = useState<readonly string[]>(INITIALLY_DONE);

  const toggle = (id: string) =>
    setDoneIds((current) =>
      current.includes(id) ? current.filter((done) => done !== id) : [...current, id],
    );

  // The plan always points at exactly one thing. That is the product, so the
  // marker has to move as rows are ticked rather than sit on a fixed row.
  const nextId = TASKS.find((task) => !doneIds.includes(task.id))?.id;
  const completed = doneIds.length;
  const percent = Math.round((completed / TASKS.length) * 100);

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E6E2DA] bg-white shadow-[0_1px_2px_rgba(17,23,43,0.04),0_24px_60px_-24px_rgba(17,23,43,0.18)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-[#E6E2DA] px-6 py-5 sm:px-8 sm:py-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#4f5666] uppercase">
            Example plan
          </p>
          <p className="font-display mt-1.5 text-[19px] font-bold tracking-[-0.02em] text-[#11172b] sm:text-[21px]">
            Grade 11 · Computer Science
          </p>
        </div>

        <div className="min-w-[136px] flex-1 sm:max-w-[200px] sm:flex-none">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[13px] text-[#4f5666]">This month</span>
            <span className="text-[13px] font-semibold tabular-nums text-[#11172b]">
              {completed}/{TASKS.length}
            </span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDEAE3]"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Plan progress"
          >
            <div
              className="h-full rounded-full bg-[#4A6B57] transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <ul>
        {TASKS.map((task) => {
          const isDone = doneIds.includes(task.id);
          const isNext = task.id === nextId;

          return (
            <li
              key={task.id}
              className={`border-b border-[#EFECE6] last:border-b-0 transition-colors ${
                isNext ? "bg-[#FBFAF7]" : ""
              }`}
            >
              <label
                className={`flex cursor-pointer items-start gap-4 px-6 py-4 sm:px-8 sm:py-[18px] ${
                  isNext ? "border-l-2 border-l-[#4A6B57] pl-[22px] sm:pl-[30px]" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(task.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#11172b] ${
                    isDone
                      ? "border-[#4A6B57] bg-[#4A6B57] text-white"
                      : "border-[#CFCABF] bg-white"
                  }`}
                >
                  {isDone && (
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.2 4.8 8.5 9.5 3.8"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span
                      className={`text-[15px] leading-snug font-medium transition-colors sm:text-[16px] ${
                        isDone ? "text-[#9a9689]" : "text-[#11172b]"
                      }`}
                    >
                      {task.title}
                    </span>
                    {isNext && (
                      <span className="rounded-full bg-[#4A6B57] px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-white uppercase">
                        Next
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 block text-[13.5px] leading-relaxed transition-colors ${
                      isDone ? "text-[#b5b1a6]" : "text-[#4f5666]"
                    }`}
                  >
                    {task.reason}
                  </span>
                </span>

                <span
                  className={`mt-0.5 hidden shrink-0 text-[12.5px] whitespace-nowrap tabular-nums sm:block ${
                    isDone ? "text-[#b5b1a6]" : "text-[#4f5666]"
                  }`}
                >
                  {task.due}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
