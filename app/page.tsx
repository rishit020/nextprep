import { HeroMedia } from "@/components/hero-media";
import { PlanPreview } from "@/components/plan-preview";
import { SiteNav } from "@/components/site-nav";
import { WaitlistInline } from "@/components/waitlist-inline";
import { WaitlistProvider } from "@/components/waitlist";

/**
 * Three things the product does beyond the plan. Shown as the actual output
 * rather than an icon and an adjective — the specificity IS the pitch.
 */
const CAPABILITIES = [
  {
    label: "Activity list",
    body: "Rewrites your 150-character activity descriptions so they lead with what you actually did.",
    artifact: {
      before: "Member of robotics club. Helped build the robot for competition.",
      after:
        "Led the 6-person drivetrain subteam; redesigned the gearbox and cut our cycle time by a fifth.",
    },
  },
  {
    label: "Essays",
    body: "Reads your draft against the specific school you're sending it to, not colleges in general.",
    note: "Your \"why us\" could be about any large engineering school. Name the program, the sequence, the lab.",
  },
  {
    label: "Ask someone who got in",
    body: "Put a question to a chatbot grounded in how students who got in actually described their path.",
    chat: {
      question: "Is it worth switching out of AP Bio for a second CS class?",
      answer:
        "Depends what your file is arguing. If CS is the story, the second class is the more consistent signal. Not if it costs you a teacher who'd write a strong letter, though.",
    },
  },
] as const;

export default function Home() {
  return (
    <WaitlistProvider>
      <div className="bg-[#FBFAF7]">
        {/* ---------------------------------------------------------------- */}
        {/* Hero */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative min-h-svh overflow-hidden bg-[#11172b]">
          <SiteNav />
          <HeroMedia />

          <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pt-16 pb-12 text-center lg:pt-0 lg:pb-28">
            <h1 className="font-display max-w-[820px] text-balance text-[42px] leading-[1.02] font-bold tracking-[-0.03em] text-[#11172b] sm:text-[58px] lg:text-[78px] lg:leading-[0.98] lg:tracking-[-0.042em]">
              Your college plan, one step at a time.
            </h1>

            {/* whitespace-nowrap from sm up: the line is the product promise and
                reads best unbroken. Below sm it is allowed to wrap. */}
            <p className="mt-5 max-w-[760px] text-[17px] leading-[1.4] text-[#4f5666] sm:mt-6 sm:whitespace-nowrap sm:text-[19px] lg:mt-7 lg:text-[24px] lg:leading-[1.35]">
              Customized for your intended major and target schools.
            </p>

            <div className="mt-8 flex w-full flex-col items-center lg:mt-11">
              <WaitlistInline />
              <p className="mt-3.5 text-[13px] text-[#4f5666]">
                Free while we build. One email when it opens.
              </p>
            </div>
          </main>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* The plan — the signature moment. Everything else supports it. */}
        {/* ---------------------------------------------------------------- */}
        <section
          aria-labelledby="plan-heading"
          className="mx-auto max-w-[1080px] px-6 py-20 sm:py-28 lg:py-32"
        >
          <div className="max-w-[640px]">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#4f5666] uppercase">
              The plan
            </p>
            <h2
              id="plan-heading"
              className="font-display mt-4 text-[32px] leading-[1.08] font-bold tracking-[-0.03em] text-[#11172b] sm:text-[42px] lg:text-[50px]"
            >
              Everyone gets a different list.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#4f5666] sm:text-[19px]">
              Your grade, your grades, your activities, and where you&rsquo;re aiming decide
              what&rsquo;s on yours. You get the next thing to do, one at a time, with the reason
              attached. Tick it off and the plan moves.
            </p>
          </div>

          <div className="mt-10 sm:mt-12">
            <PlanPreview />
          </div>

          <p className="mt-4 text-[13px] text-[#8b8779]">
            A sample plan, not a real student&rsquo;s. Try ticking one.
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Capabilities, shown as output */}
        {/* ---------------------------------------------------------------- */}
        <section
          aria-labelledby="more-heading"
          className="border-t border-[#E6E2DA] bg-white/60 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1080px] px-6">
            <h2
              id="more-heading"
              className="font-display max-w-[560px] text-[32px] leading-[1.08] font-bold tracking-[-0.03em] text-[#11172b] sm:text-[42px]"
            >
              Then it helps you write it down.
            </h2>

            <ul className="mt-12 grid gap-x-10 gap-y-12 sm:mt-14 md:grid-cols-3">
              {CAPABILITIES.map((item) => (
                <li key={item.label} className="flex flex-col">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-[#4f5666] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-3 text-[16px] leading-[1.5] text-[#11172b]">{item.body}</p>

                  <div className="mt-5 flex-1 rounded-2xl border border-[#E6E2DA] bg-[#FBFAF7] p-4">
                    {"artifact" in item && (
                      <>
                        <p className="text-[13.5px] leading-relaxed text-[#a3a094] line-through decoration-[#cfcabf]">
                          {item.artifact.before}
                        </p>
                        <p className="mt-3 border-l-2 border-[#4A6B57] pl-3 text-[13.5px] leading-relaxed text-[#11172b]">
                          {item.artifact.after}
                        </p>
                      </>
                    )}

                    {"note" in item && (
                      <p className="text-[13.5px] leading-relaxed text-[#11172b]">{item.note}</p>
                    )}

                    {"chat" in item && (
                      <>
                        <p className="ml-6 rounded-2xl rounded-br-sm bg-[#11172b] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white">
                          {item.chat.question}
                        </p>
                        <p className="mt-2 mr-6 rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#11172b] ring-1 ring-[#E6E2DA]">
                          {item.chat.answer}
                        </p>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Closing capture + footer */}
        {/* ---------------------------------------------------------------- */}
        <footer className="bg-[#11172b] px-6 py-20 text-center sm:py-24">
          <h2 className="font-display mx-auto max-w-[620px] text-[30px] leading-[1.1] font-bold tracking-[-0.03em] text-white text-balance sm:text-[40px]">
            Unistep opens to a first group of students soon.
          </h2>
          <p className="mx-auto mt-5 max-w-[460px] text-[16px] leading-[1.5] text-white/60">
            Leave your email and we&rsquo;ll tell you when it&rsquo;s your turn.
          </p>

          <div className="mt-9 flex flex-col items-center">
            <WaitlistInline tone="dark" />
          </div>

          <p className="mt-16 text-[13px] text-white/35">
            © {new Date().getFullYear()} Unistep
          </p>
        </footer>
      </div>
    </WaitlistProvider>
  );
}
