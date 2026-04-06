import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  Clock3,
  Landmark,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 22 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' },
  }),
};

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'use-cases', label: 'Use Cases' },
];

const features = [
  {
    title: 'Face Recognition Attendance',
    text: 'Mark attendance in seconds using live camera streams and AI face matching.',
    icon: ScanFace,
  },
  {
    title: 'Real-Time Monitoring',
    text: 'Supervisors can view active sessions, late arrivals, and exceptions instantly.',
    icon: Camera,
  },
  {
    title: 'Secure Data Controls',
    text: 'Role-based access, audit logs, and encrypted records built for institutions.',
    icon: ShieldCheck,
  },
];

const steps = [
  {
    title: 'Create your campus workspace',
    text: 'Add departments, classes, and attendance policies from one dashboard.',
  },
  {
    title: 'Register faces and start sessions',
    text: 'Capture profiles once and begin smart attendance from any connected device.',
  },
  {
    title: 'Review analytics and performance',
    text: 'Track trends, export reports, and improve punctuality with actionable insights.',
  },
];

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#EEF3F4] text-[#0D2237]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-[#5BB9C5]/20 blur-3xl" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-[#D7E7EA] blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-[#d6e0e3] bg-[#eef3f4]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="logo.png" alt="AttendAI Logo" className="h-14 w-14 scale-[1.2] object-contain sm:h-16 sm:w-16" />
            <span className="text-3xl font-extrabold tracking-tight text-[#0B2A3F]">AttendAI</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-[#16384c] transition hover:text-[#2B9FB1]"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login">
              <Button variant="outline" className="rounded-full border-[#9ab7be] bg-transparent px-5">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full bg-[#2B9FB1] px-5 text-white hover:bg-[#23899B]">Get Started</Button>
            </Link>
          </div>

          <button
            className="rounded-lg border border-[#9ab7be] bg-white p-2 md:hidden"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label="Open navigation"
          >
            <svg className="h-6 w-6 text-[#16384c]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {mobileNavOpen && (
          <div className="border-t border-[#d6e0e3] bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-lg px-3 py-2 text-left text-[#16384c] transition hover:bg-[#e8f1f3]"
                >
                  {item.label}
                </button>
              ))}
              <Link to="/login" className="rounded-lg px-3 py-2 text-[#16384c] transition hover:bg-[#e8f1f3]" onClick={() => setMobileNavOpen(false)}>
                Log in
              </Link>
              <Link to="/signup" onClick={() => setMobileNavOpen(false)}>
                <Button className="w-full rounded-full bg-[#2B9FB1] text-white hover:bg-[#23899B]">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-16">
          <motion.div initial="hidden" animate="show" variants={sectionReveal}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b7ccd1] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1f6572]">
              <Sparkles className="h-4 w-4" />
              AI-powered Attendance Platform
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-[#0D2237] sm:text-5xl lg:text-6xl">
              Accurate attendance
              <br />
              without manual work.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#395567] sm:text-lg">
              AttendAI helps schools and organizations automate attendance with face recognition, live tracking, and reliable analytics.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup">
                <Button className="group w-full rounded-full bg-[#2B9FB1] px-8 py-6 text-base font-semibold text-white hover:bg-[#23899B] sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <button
                className="w-full rounded-full border border-[#9ab7be] bg-white px-8 py-3 text-sm font-semibold text-[#16384c] transition hover:bg-[#e8f1f3] sm:w-auto"
                onClick={() => scrollTo('workflow')}
              >
                See How It Works
              </button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-[#355464]">
              <span>Kings College</span>
              <span>Al Noor Academy</span>
              <span>CityTech Institute</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -right-4 -top-4 h-28 w-28 rounded-3xl bg-[#cce1e6]/80" />
            <motion.div
              className="relative rounded-3xl border border-[#d6e0e3] bg-white p-5 shadow-xl sm:p-7"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#e4ecef] pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#5d7f8b]">Live Session</p>
                  <p className="mt-1 text-lg font-bold text-[#0D2237]">Morning Attendance</p>
                </div>
                <span className="rounded-full bg-[#DDF4E9] px-3 py-1 text-xs font-semibold text-[#13633A]">Active</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#F3F8F9] p-4">
                  <p className="text-xs text-[#5b7784]">Students Present</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#0D2237]">1,248</p>
                </div>
                <div className="rounded-2xl bg-[#F3F8F9] p-4">
                  <p className="text-xs text-[#5b7784]">Late Entries</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#0D2237]">46</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-[#0B2E45] p-4 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Face Match Accuracy</p>
                  <p className="text-sm font-bold">99.2%</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/20">
                  <motion.div
                    className="h-2 rounded-full bg-[#5BC2D0]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '99%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="features"
          className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <div className="rounded-[28px] border border-[#d9e3e6] bg-white p-6 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.25fr_2fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2A98A9]">Future-ready Operations</p>
                <h2 className="mt-2 text-3xl font-extrabold text-[#0D2237] sm:text-4xl">Attendance infrastructure that scales with your institution.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    custom={index}
                    variants={cardReveal}
                    className="rounded-2xl bg-[#F4F8F9] p-5"
                  >
                    <feature.icon className="h-8 w-8 text-[#2B9FB1]" />
                    <h3 className="mt-4 text-lg font-bold text-[#0D2237]">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#496373]">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              className="rounded-3xl border border-[#d9e3e6] bg-[#F4F8F9] p-8"
            >
              <p className="text-5xl font-extrabold text-[#2A98A9]">3k+</p>
              <p className="mt-4 text-lg font-semibold text-[#0D2237]">Daily attendance events processed</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              className="rounded-3xl border border-[#d9e3e6] bg-white p-8"
            >
              <p className="text-2xl font-bold text-[#0D2237]">Instant withdrawal of manual tasks</p>
              <p className="mt-3 text-sm text-[#496373]">Admins stop chasing sheets and can focus on operations and student outcomes.</p>
              <div className="mt-6 flex items-center gap-3 text-[#2A98A9]">
                <CheckCircle2 className="h-6 w-6" />
                <Clock3 className="h-6 w-6" />
                <Landmark className="h-6 w-6" />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              className="rounded-3xl border border-[#d9e3e6] bg-white p-6"
            >
              <p className="text-sm font-semibold text-[#5d7f8b]">Summary</p>
              <p className="mt-1 text-2xl font-extrabold text-[#0D2237]">98.7% monthly punctuality</p>
              <div className="mt-6 h-40 rounded-2xl bg-[#f2f8fa] p-4">
                <div className="flex h-full items-end gap-2">
                  {[28, 42, 48, 57, 70, 78].map((value, index) => (
                    <motion.div
                      key={value}
                      className="w-full rounded-t-md bg-[#5BC2D0]"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.55 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section
          id="workflow"
          className="bg-[#073852] py-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6ABFCC]">Step by Step</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl">Run your complete attendance cycle in three simple moves.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  custom={index}
                  variants={cardReveal}
                  className="rounded-2xl border border-[#2a5368] bg-[#0E4562] p-6 text-white"
                >
                  <p className="text-4xl font-bold text-[#8ECFDB]">{index + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#D2E6ED]">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionReveal}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2A98A9]">Our Impact</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0D2237] sm:text-4xl">Helping institutions improve discipline and outcomes.</h2>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-5xl font-extrabold text-[#0D2237]">24%</p>
                <p className="mt-2 text-sm font-semibold text-[#4b6675]">Lower absenteeism trend</p>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-[#0D2237]">180K</p>
                <p className="mt-2 text-sm font-semibold text-[#4b6675]">Records processed monthly</p>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-[#0D2237]">10+</p>
                <p className="mt-2 text-sm font-semibold text-[#4b6675]">Campuses onboarded</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="use-cases" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              className="rounded-3xl border border-[#d9e3e6] bg-[#F4F8F9] p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#5d7f8b]">School Campuses</p>
              <p className="mt-4 text-3xl font-bold text-[#0D2237]">Daily Class Attendance</p>
              <p className="mt-4 text-sm leading-relaxed text-[#4b6675]">
                Automate roll calls for every class, detect absentees in real-time, and alert class coordinators instantly.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              className="rounded-3xl border border-[#2B9FB1] bg-[linear-gradient(140deg,#2f8ca0,#37a7ba)] p-8 text-white"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#d9f5f8]">Universities</p>
              <p className="mt-4 text-3xl font-bold">Lecture Hall Monitoring</p>
              <p className="mt-4 text-sm leading-relaxed text-[#ddf5f8]">
                Manage thousands of student records across departments with centralized attendance dashboards.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionReveal}
              className="rounded-3xl border border-[#d9e3e6] bg-[#F4F8F9] p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#5d7f8b]">Training Centers</p>
              <p className="mt-4 text-3xl font-bold text-[#0D2237]">Batch and Shift Tracking</p>
              <p className="mt-4 text-sm leading-relaxed text-[#4b6675]">
                Track morning and evening batches, improve punctuality, and export clean compliance-ready reports.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={sectionReveal}
            className="rounded-3xl bg-[#083C58] px-6 py-10 sm:px-10"
          >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7FD2DE]">Try It Now</p>
                <h3 className="mt-2 max-w-2xl text-3xl font-bold text-white">Ready to level up your attendance process?</h3>
                <p className="mt-2 max-w-xl text-sm text-[#cde5eb]">Deploy AttendAI and move from manual roll-calls to secure, intelligent attendance workflows.</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link to="/signup">
                  <Button className="w-full rounded-full bg-[#38AFC1] px-6 text-white hover:bg-[#2d99aa] sm:w-auto">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full rounded-full border-[#6daab6] bg-transparent px-6 text-[#d7edf2] hover:bg-[#0c4d6d] hover:text-white sm:w-auto">
                    Go to Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#d6e0e3] bg-[#E6EDF0] py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="logo.png" alt="AttendAI Logo" className="h-14 w-14 scale-[1.3] object-contain sm:h-16 sm:w-16" />
              <span className="text-xl font-extrabold text-[#0B2A3F]">AttendAI</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-[#4c6673]">AI attendance software designed for reliable tracking, fraud prevention, and real operational visibility.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div>
              <p className="font-bold text-[#0D2237]">Solutions</p>
              <p className="mt-2 text-[#4c6673]">Schools</p>
              <p className="mt-1 text-[#4c6673]">Universities</p>
              <p className="mt-1 text-[#4c6673]">Organizations</p>
            </div>
            <div>
              <p className="font-bold text-[#0D2237]">Company</p>
              <p className="mt-2 text-[#4c6673]">About</p>
              <p className="mt-1 text-[#4c6673]">Careers</p>
              <p className="mt-1 text-[#4c6673]">Contact</p>
            </div>
            <div>
              <p className="font-bold text-[#0D2237]">Platform</p>
              <p className="mt-2 text-[#4c6673]">Reports</p>
              <p className="mt-1 text-[#4c6673]">Integrations</p>
              <p className="mt-1 text-[#4c6673]">Security</p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 w-full max-w-7xl border-t border-[#d1dde1] px-4 pt-6 text-center text-xs text-[#607987] sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AttendAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
