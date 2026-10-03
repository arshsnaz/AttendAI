import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  Clock3,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Users,
  Check,
  Zap,
  Lock,
  Activity,
  Layers,
  Smartphone,
  Award,
  HelpCircle,
  Calculator,
  Building2,
  GraduationCap,
  Briefcase,
  FileCheck,
  ChevronDown,
  Play,
  Server,
  UserCheck,
  Flame,
  Radio,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AttendAiLogo } from '@/components/AttendAiLogo';

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' },
  }),
};

const navItems = [
  { id: 'features', label: 'Features' },
  { id: 'interactive-demo', label: 'Live HUD Demo' },
  { id: 'workflow', label: 'How It Works' },
  { id: 'use-cases', label: 'Solutions' },
  { id: 'calculator', label: 'ROI Calculator' },
  { id: 'faq', label: 'FAQ' },
];

const mockDetections = [
  {
    name: 'Sarah Jenkins',
    id: 'STU-2026-089',
    dept: 'Computer Science',
    time: '09:02:14 AM',
    confidence: '99.8%',
    status: 'Present',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Marcus Vance',
    id: 'STU-2026-114',
    dept: 'Artificial Intelligence',
    time: '09:02:28 AM',
    confidence: '99.4%',
    status: 'Present',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Priya Sharma',
    id: 'STU-2026-042',
    dept: 'Data Engineering',
    time: '09:03:01 AM',
    confidence: '99.9%',
    status: 'Present',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Liam Zhang',
    id: 'STU-2026-155',
    dept: 'Software Systems',
    time: '09:03:19 AM',
    confidence: '98.9%',
    status: 'Present',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
];

const bentoFeatures = [
  {
    title: '5-Angle Biometric Registration',
    desc: 'Captures front, profile, tilt, and natural expression anchors to eliminate false rejections under any classroom lighting.',
    icon: ScanFace,
    tag: 'Neural Enrollment',
    bg: 'from-white to-[#F0F7F9]',
    badge: '3D Mesh',
  },
  {
    title: 'Anti-Spoofing & Liveness Guard',
    desc: 'Next-gen depth perception detects printed photos, phone replay screens, and 3D mask fraud with 99.9% precision.',
    icon: ShieldCheck,
    tag: 'Security & Integrity',
    bg: 'from-white to-[#F0F7F9]',
    badge: 'Zero Spoofs',
  },
  {
    title: 'Instant 0.4s Verification HUD',
    desc: 'High-throughput parallel inference processes entire lecture halls in seconds using standard webcams or mobile phones.',
    icon: Zap,
    tag: 'Sub-second AI',
    bg: 'from-white to-[#F0F7F9]',
    badge: '40ms Latency',
  },
  {
    title: 'Autonomous Roster & Cloud Sync',
    desc: 'Synchronizes live roll-calls to Supabase Cloud, Spring Boot APIs, and local offline caches with zero latency.',
    icon: Server,
    tag: 'Cloud & Offline',
    bg: 'from-white to-[#F0F7F9]',
    badge: 'Hybrid Sync',
  },
  {
    title: 'Official Compliance & Audit Sheets',
    desc: 'One-click automated exports for NAAC, ISO, ABET accreditation, and institutional board audits in CSV and PDF.',
    icon: FileCheck,
    tag: 'Accreditation Ready',
    bg: 'from-white to-[#F0F7F9]',
    badge: '1-Click Export',
  },
  {
    title: 'Role-Based Campus Workspaces',
    desc: 'Dedicated portals for System Administrators, Department Faculty, and Auditors with granular privacy permissions.',
    icon: Users,
    tag: 'Multi-Tenant',
    bg: 'from-white to-[#F0F7F9]',
    badge: 'RBAC Security',
  },
];

const steps = [
  {
    number: '01',
    title: 'Setup Campus Workspace',
    desc: 'Create classes, assign faculty, configure attendance time windows, and define department policies in minutes.',
    icon: Building2,
  },
  {
    number: '02',
    title: '5-Angle Biometric Studio',
    desc: 'Students complete a rapid 10-second multi-angle scan once. Embeddings are cryptographically hashed and secured.',
    icon: Camera,
  },
  {
    number: '03',
    title: 'Autonomous Live Attendance',
    desc: 'Open the camera in any lecture hall or room. AttendAi recognizes students in real time and compiles certified records.',
    icon: UserCheck,
  },
];

const solutions = [
  {
    title: 'Universities & Colleges',
    category: 'Higher Education',
    icon: GraduationCap,
    desc: 'Centralize attendance for 10,000+ students across multiple faculties, lab sessions, and auditoriums with zero proxy roll-calls.',
    points: ['Mass lecture hall scanning', 'Semester compliance analytics', 'Faculty automated time logs'],
  },
  {
    title: 'K-12 School Campuses',
    category: 'Schools & Academies',
    icon: Building2,
    desc: 'Automate morning roll-calls, detect absentees before first period, and ensure student safety without disrupting class flow.',
    points: ['Instant absentee alerts', 'Classroom tablet kiosk mode', 'Parent notification sync'],
  },
  {
    title: 'Corporate Training & Labs',
    category: 'Enterprises & Training',
    icon: Briefcase,
    desc: 'Track employee shift attendance, certified continuing education credits, and compliance seminars with audited biometric proof.',
    points: ['Shift & batch time stamping', 'Payroll export integration', 'Fraud-proof audit trails'],
  },
];

const faqs = [
  {
    q: 'Do we need specialized biometric hardware or 3D cameras?',
    a: 'No! AttendAi is built to run on standard everyday webcams, classroom laptops, iPads, tablets, or smartphone cameras. Our neural engine processes high-fidelity facial vector geometry directly in the browser and cloud.',
  },
  {
    q: 'How does AttendAi prevent students from showing photos or phone screens?',
    a: 'AttendAi incorporates multi-frame anti-spoofing and micro-motion liveness verification algorithms that distinguish real human facial depth and skin reflectance from 2D photos, video playback, and printouts.',
  },
  {
    q: 'Is student biometric data secure and GDPR compliant?',
    a: 'Absolutely. Raw face photos are converted into 512-dimensional mathematical feature vectors (embeddings) and encrypted using AES-256. Raw biometrics are never shared or sold, ensuring 100% compliance with student privacy regulations.',
  },
  {
    q: 'Can we connect AttendAi to our existing database or Supabase instance?',
    a: 'Yes! AttendAi features out-of-the-box Supabase integration, Spring Boot backend REST endpoints, and instant CSV/JSON data ingestion and export for any student management system (SMS/SIS).',
  },
];

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDetectionIndex, setActiveDetectionIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI Calculator State
  const [studentCount, setStudentCount] = useState(600);
  const [classesPerDay, setClassesPerDay] = useState(5);

  // Calculated ROI values
  const minutesSavedPerDay = Math.round((studentCount / 30) * classesPerDay * 7); // ~7 mins saved per class of 30
  const hoursSavedPerMonth = Math.round((minutesSavedPerDay * 22) / 60);
  const proxyFraudReduction = '99.8%';
  const estimatedCostSaving = Math.round(hoursSavedPerMonth * 28); // $28/hr faculty time

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const currentDetection = mockDetections[activeDetectionIndex];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#EEF3F4] text-[#0D2237] selection:bg-[#2B9FB1]/20 selection:text-[#0B2E45]">
      {/* Dynamic Background Glowing Mesh */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#5BB9C5]/15 blur-[120px]" />
        <div className="absolute right-0 top-32 h-[600px] w-[600px] rounded-full bg-[#0B2E45]/10 blur-[150px]" />
        <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-[#2B9FB1]/10 blur-[140px]" />
      </div>

      {/* Top Banner Ribbon */}
      <div className="relative z-50 bg-gradient-to-r from-[#0B2E45] via-[#103E5C] to-[#2B9FB1] px-4 py-2 text-center text-xs font-semibold text-white shadow-inner">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-cyan-200">
            <Sparkles className="h-3 w-3" /> New
          </span>
          <span className="hidden sm:inline">AttendAi 2.0 Released:</span>
          <span>Multi-angle 3D Biometrics with Instant Cloud Sync is live!</span>
          <Link to="/signup" className="ml-2 inline-flex items-center underline hover:text-cyan-200">
            Try Free <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#d2e1e5]/80 bg-[#eef3f4]/90 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#0B2E45] via-[#103D5B] to-[#2B9FB1] p-[1.5px] shadow-md transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white p-1.5">
                <AttendAiLogo className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-gradient-to-r from-[#0B2E45] via-[#104868] to-[#2B9FB1] bg-clip-text font-display text-2xl font-black tracking-tight text-transparent">
                AttendAi
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-[#2B9FB1]/20 bg-[#2B9FB1]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#1b7f90]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2B9FB1]"></span>
                Ai
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-1 rounded-full border border-[#d2e1e5] bg-white/70 px-4 py-1.5 shadow-xs backdrop-blur-md md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="rounded-full px-3.5 py-1.5 text-xs font-bold text-[#234557] transition-all hover:bg-[#2B9FB1]/10 hover:text-[#2B9FB1]"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login">
              <Button
                variant="ghost"
                className="rounded-full text-xs font-bold text-[#1a3f52] hover:bg-white hover:text-[#0B2E45]"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="group rounded-full bg-gradient-to-r from-[#2B9FB1] to-[#1E7D8C] px-5 text-xs font-bold text-white shadow-md shadow-[#2B9FB1]/20 transition-all hover:shadow-lg hover:shadow-[#2B9FB1]/30">
                Launch Workspace
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-xl border border-[#9ab7be] bg-white p-2 text-[#16384c] md:hidden"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="border-t border-[#d6e0e3] bg-white/95 px-4 py-4 shadow-xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-[#16384c] transition hover:bg-[#e8f1f3]"
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full rounded-xl text-xs font-bold">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="w-full rounded-xl bg-[#2B9FB1] text-xs font-bold text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content */}
            <motion.div
              className="lg:col-span-6 xl:col-span-6"
              initial="hidden"
              animate="show"
              variants={sectionReveal}
            >
              {/* Pill Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2B9FB1]/30 bg-white/90 px-3.5 py-1.5 text-xs font-extrabold text-[#1a7786] shadow-xs backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B9FB1] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B9FB1]"></span>
                </span>
                <span className="uppercase tracking-wider">Next-Gen Facial Biometrics</span>
                <span className="rounded-full bg-[#2B9FB1]/15 px-2 py-0.2 text-[10px] text-[#1b7f90]">v2.0</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl font-black leading-[1.12] tracking-tight text-[#0B2E45] sm:text-5xl lg:text-[3.5rem]">
                Autonomous Face Attendance.{' '}
                <span className="bg-gradient-to-r from-[#2B9FB1] via-[#1E7D8C] to-[#0B2E45] bg-clip-text text-transparent">
                  Zero Proxy. Instant Cloud Sync.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-[#406173] sm:text-lg">
                Transform attendance workflows with <strong className="text-[#0B2E45] font-semibold">0.4-second neural recognition</strong>. Eliminate paper registers, stop proxy buddy-punching, and export certified institutional audit sheets with one click.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="group h-13 w-full rounded-2xl bg-gradient-to-r from-[#2B9FB1] via-[#1F8E9F] to-[#125A6C] px-8 text-base font-bold text-white shadow-xl shadow-[#2B9FB1]/25 transition-all hover:scale-[1.02] hover:shadow-[#2B9FB1]/40 sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <button
                  onClick={() => scrollTo('interactive-demo')}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-[#c1d8df] bg-white/80 px-6 text-sm font-bold text-[#143B4F] shadow-sm backdrop-blur-md transition-all hover:border-[#2B9FB1] hover:bg-white hover:text-[#2B9FB1] sm:w-auto"
                >
                  <Play className="h-4 w-4 fill-current text-[#2B9FB1]" />
                  Live HUD Demo
                </button>
              </div>

              {/* Trust Features Checklist */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#d2e1e5]/60 text-xs font-semibold text-[#32566b]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2B9FB1] flex-shrink-0" />
                  <span>Works on any webcam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2B9FB1] flex-shrink-0" />
                  <span>99.8% Liveness Accuracy</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-4 w-4 text-[#2B9FB1] flex-shrink-0" />
                  <span>Supabase & REST APIs</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Interactive Biometric HUD */}
            <motion.div
              className="lg:col-span-6 xl:col-span-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="relative rounded-3xl border border-[#c5dce2] bg-gradient-to-b from-white via-white/95 to-[#f0f8fa] p-4 sm:p-6 shadow-2xl shadow-[#0B2E45]/10 backdrop-blur-xl">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between border-b border-[#e2edf0] pb-3.5 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-[#0B2E45] flex items-center justify-center text-cyan-300">
                      <ScanFace className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0B2E45] uppercase tracking-wider">
                        Live Attendance Feed
                      </h4>
                      <p className="text-[11px] text-[#52778a] font-medium">Room A-204 • CS-402 Lecture</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      AI Scanner Active
                    </span>
                  </div>
                </div>

                {/* Simulated Camera Viewfinder with Biometric Overlays */}
                <div className="relative overflow-hidden rounded-2xl bg-[#072438] aspect-[16/10] flex items-center justify-center p-4 border border-[#16425e]">
                  {/* Subtle Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'radial-gradient(#2B9FB1 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Dynamic Corner Target Brackets */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-sm" />

                  {/* Horizontal Scan Ray Animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#38BDF8]"
                    animate={{ top: ['15%', '85%', '15%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Target Person Focus Card */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                      {/* Avatar Image with Active Biometric Mesh Ring */}
                      <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-2 border-cyan-400 p-1 shadow-[0_0_25px_rgba(43,159,177,0.5)]">
                        <img
                          src={currentDetection.avatar}
                          alt={currentDetection.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>

                      {/* Biometric Match Verified Badge */}
                      <div className="absolute -bottom-2 -right-1 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-lg border border-white">
                        <Check className="h-3 w-3 stroke-[3]" />
                        <span>{currentDetection.confidence}</span>
                      </div>
                    </div>

                    {/* Detected Student Floating HUD Card */}
                    <div className="mt-3 rounded-xl bg-[#092B42]/90 border border-cyan-500/40 px-4 py-2 text-center backdrop-blur-md">
                      <p className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                        {currentDetection.name}
                        <span className="text-[10px] font-mono text-cyan-300 font-normal">({currentDetection.id})</span>
                      </p>
                      <p className="text-[11px] text-cyan-200/80 font-medium">
                        {currentDetection.dept} • <span className="text-emerald-400 font-bold">Logged at {currentDetection.time}</span>
                      </p>
                    </div>
                  </div>

                  {/* Telemetry HUD badges */}
                  <div className="absolute top-3 left-4 text-[10px] font-mono text-cyan-300/80">
                    LATENCY: 38ms | FPS: 60
                  </div>
                  <div className="absolute top-3 right-4 text-[10px] font-mono text-emerald-400">
                    LIVENESS: PASS (3D)
                  </div>
                </div>

                {/* Bottom Recent Recognized Ticker (Interactive Selectors) */}
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-[#4e7183] uppercase tracking-wider mb-2">
                    Live Stream Verification Queue (Click to inspect):
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {mockDetections.map((det, idx) => (
                      <button
                        key={det.id}
                        onClick={() => setActiveDetectionIndex(idx)}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                          activeDetectionIndex === idx
                            ? 'bg-[#2B9FB1]/15 border-[#2B9FB1] shadow-xs'
                            : 'bg-white/80 border-[#d2e1e5] hover:bg-[#f2f8fa]'
                        }`}
                      >
                        <img src={det.avatar} alt={det.name} className="h-7 w-7 rounded-full object-cover flex-shrink-0" />
                        <div className="min-w-0 hidden sm:block">
                          <p className="text-[11px] font-bold text-[#0B2E45] truncate leading-tight">{det.name.split(' ')[0]}</p>
                          <p className="text-[9.5px] text-emerald-600 font-bold">{det.confidence}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SOCIAL PROOF & STATS BANNER ================= */}
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#cbe0e6] bg-white/95 p-6 sm:p-8 shadow-sm backdrop-blur-md">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#e2edf0]">
              <div className="pt-4 sm:pt-0">
                <p className="font-display text-3xl sm:text-4xl font-black text-[#0B2E45]">99.8%</p>
                <p className="text-xs font-bold text-[#2B9FB1] uppercase tracking-wider mt-1">Facial Match Precision</p>
                <p className="text-[11px] text-[#557688] mt-0.5">3D facial landmark mesh</p>
              </div>
              <div className="pt-4 sm:pt-0 sm:pl-6">
                <p className="font-display text-3xl sm:text-4xl font-black text-[#0B2E45]">&lt; 0.4s</p>
                <p className="text-xs font-bold text-[#2B9FB1] uppercase tracking-wider mt-1">Verification Latency</p>
                <p className="text-[11px] text-[#557688] mt-0.5">Instant parallel inference</p>
              </div>
              <div className="pt-4 sm:pt-0 sm:pl-6">
                <p className="font-display text-3xl sm:text-4xl font-black text-[#0B2E45]">180K+</p>
                <p className="text-xs font-bold text-[#2B9FB1] uppercase tracking-wider mt-1">Sessions Logged Monthly</p>
                <p className="text-[11px] text-[#557688] mt-0.5">Across institutions & campuses</p>
              </div>
              <div className="pt-4 sm:pt-0 sm:pl-6">
                <p className="font-display text-3xl sm:text-4xl font-black text-[#0B2E45]">0%</p>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-1">Buddy Punching / Proxy</p>
                <p className="text-[11px] text-[#557688] mt-0.5">Liveness anti-spoof protection</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENTO GRID CORE CAPABILITIES ================= */}
        <section id="features" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B9FB1]/10 text-[#1a7786] text-xs font-bold mb-3 border border-[#2B9FB1]/20">
              <Layers className="w-3.5 h-3.5" /> Architectural Superpowers
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0B2E45] tracking-tight">
              Engineered for Enterprise Campus Scale
            </h2>
            <p className="text-sm sm:text-base text-[#46697d] mt-3">
              Everything required to deploy automated, fraud-proof, multi-tenant facial attendance without hardware headaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, idx) => (
              <motion.div
                key={feat.title}
                custom={idx}
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group rounded-3xl border border-[#d2e1e5] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#2B9FB1]/60 hover:shadow-xl hover:shadow-[#2B9FB1]/10 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0B2E45] to-[#2B9FB1] p-[1.5px] shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-[#2B9FB1]">
                      <feat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {feat.badge}
                  </span>
                </div>

                <p className="text-xs font-bold text-[#2B9FB1] uppercase tracking-wider mb-1">{feat.tag}</p>
                <h3 className="font-display text-xl font-bold text-[#0B2E45] leading-snug">{feat.title}</h3>
                <p className="text-sm text-[#4c6e80] mt-2.5 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STEP BY STEP WORKFLOW ================= */}
        <section id="workflow" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d2e1e5] bg-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="max-w-2xl mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B9FB1]/10 text-[#1a7786] text-xs font-bold mb-3 border border-[#2B9FB1]/20">
                <Activity className="w-3.5 h-3.5" /> 3-Minute Rapid Deployment
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#0B2E45]">
                How AttendAi Works in 3 Simple Steps
              </h2>
              <p className="text-[#4c6e80] text-sm sm:text-base mt-2">
                Get your department or entire institution operational with zero IT friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-[#dce8ec] bg-[#F4F8FA] p-6 hover:border-[#2B9FB1]/50 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0B2E45] to-[#2B9FB1] flex items-center justify-center text-white font-bold shadow-sm">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-3xl font-black text-[#2B9FB1]/40">{step.number}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0B2E45]">{step.title}</h3>
                  <p className="text-sm text-[#4c6e80] mt-2 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= USE CASES / SOLUTIONS ================= */}
        <section id="use-cases" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B9FB1]/10 text-[#1a7786] text-xs font-bold mb-3 border border-[#2B9FB1]/20">
              <Award className="w-3.5 h-3.5" /> Tailored Solutions
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0B2E45] tracking-tight">
              Designed for Every Educational Environment
            </h2>
            <p className="text-sm sm:text-base text-[#46697d] mt-3">
              From compact high school classrooms to mega-scale universities with tens of thousands of students.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <div
                key={sol.title}
                className="rounded-3xl border border-[#d2e1e5] bg-white p-7 shadow-sm transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-50 text-[#197584] border border-cyan-200">
                      {sol.category}
                    </span>
                    <sol.icon className="h-6 w-6 text-[#2B9FB1]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0B2E45]">{sol.title}</h3>
                  <p className="text-sm text-[#4c6e80] mt-3 leading-relaxed">{sol.desc}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                  {sol.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs font-semibold text-[#32566b]">
                      <CheckCircle2 className="h-4 w-4 text-[#2B9FB1] flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE ROI CALCULATOR ================= */}
        <section id="calculator" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d2e1e5] bg-gradient-to-br from-white via-white to-[#F0F7F9] p-8 sm:p-12 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B9FB1]/10 text-[#1a7786] text-xs font-bold mb-2 border border-[#2B9FB1]/20">
                    <Calculator className="w-3.5 h-3.5" /> Interactive ROI Estimator
                  </span>
                  <h2 className="font-display text-3xl font-black text-[#0B2E45] tracking-tight">
                    Calculate Faculty Time & Resource Savings
                  </h2>
                  <p className="text-sm text-[#46697d] mt-2">
                    See how much time manual roll-calls and proxy tracking currently cost your institution.
                  </p>
                </div>

                {/* Slider 1: Students */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#0B2E45]">
                    <span>Total Students Enrolled</span>
                    <span className="text-[#2B9FB1] text-sm">{studentCount} Students</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    className="w-full accent-[#2B9FB1] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>100</span>
                    <span>2,500</span>
                    <span>5,000+</span>
                  </div>
                </div>

                {/* Slider 2: Classes */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#0B2E45]">
                    <span>Average Daily Lectures / Classes</span>
                    <span className="text-[#2B9FB1] text-sm">{classesPerDay} Lectures</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={classesPerDay}
                    onChange={(e) => setClassesPerDay(Number(e.target.value))}
                    className="w-full accent-[#2B9FB1] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>1 class</span>
                    <span>8 classes</span>
                    <span>15 classes</span>
                  </div>
                </div>
              </div>

              {/* Result KPI Card */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-[#0B2E45] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#1a4b6b]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Estimated Monthly Impact</p>
                    <span className="text-xs font-mono bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded">
                      Live Simulation
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl bg-white/10 p-4 border border-white/10">
                      <p className="text-xs text-cyan-200/80">Faculty Hours Saved</p>
                      <p className="text-3xl sm:text-4xl font-black text-white mt-1">~{hoursSavedPerMonth}h</p>
                      <p className="text-[10px] text-cyan-300 mt-1">per month / campus</p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4 border border-white/10">
                      <p className="text-xs text-cyan-200/80">Proxy Fraud Cut</p>
                      <p className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">99.8%</p>
                      <p className="text-[10px] text-emerald-300 mt-1">Eliminated completely</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-[#2B9FB1] to-[#1E7D8C] p-4 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/90">Estimated Productivity Value</p>
                      <p className="text-2xl font-extrabold text-white">${estimatedCostSaving.toLocaleString()} / mo</p>
                    </div>
                    <Link to="/signup">
                      <Button className="rounded-xl bg-white text-[#0B2E45] hover:bg-slate-100 text-xs font-bold shadow-md">
                        Claim Savings
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ACCORDION ================= */}
        <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B9FB1]/10 text-[#1a7786] text-xs font-bold mb-2 border border-[#2B9FB1]/20">
              <HelpCircle className="w-3.5 h-3.5" /> Answers & Technical Clarifications
            </div>
            <h2 className="font-display text-3xl font-black text-[#0B2E45] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#d2e1e5] bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-[#0B2E45] hover:text-[#2B9FB1] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#2B9FB1] transition-transform duration-200 flex-shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-[#4c6e80] leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* ================= HIGH IMPACT CALL TO ACTION ================= */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#0B2E45] via-[#0D3852] to-[#134D6B] border border-[#1b4b68] p-8 sm:p-14 text-white shadow-xl relative overflow-hidden text-center sm:text-left">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/15 text-cyan-300 text-xs font-bold mb-3 border border-cyan-400/30">
                  <Flame className="w-3.5 h-3.5" /> Instant Onboarding
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
                  Ready to automate your institution's attendance?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-cyan-100/80 leading-relaxed max-w-xl">
                  Join forward-thinking universities and schools saving hundreds of administrative hours each semester. Setup takes less than 3 minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-shrink-0">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="h-13 w-full rounded-2xl bg-[#2B9FB1] px-8 text-sm font-bold text-white shadow-lg hover:bg-[#23899B] transition-all hover:scale-105 sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-13 w-full rounded-2xl border-white/25 bg-white/10 text-white hover:bg-white/20 text-sm font-bold sm:w-auto"
                  >
                    Faculty Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#d2e1e5] bg-[#E5ECEE] py-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0B2E45] to-[#2B9FB1] p-[1px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full rounded-[9px] bg-white flex items-center justify-center p-1">
                  <AttendAiLogo className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="font-display text-xl font-extrabold text-[#0B2E45]">AttendAi</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[#4c6673] leading-relaxed">
              Enterprise AI facial attendance and identity verification platform. Built with sub-second computer vision, anti-spoofing liveness guards, and seamless institutional compliance sync.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational • Supabase Live
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs sm:text-sm">
            <div>
              <p className="font-bold text-[#0D2237] uppercase tracking-wider text-xs">Product</p>
              <div className="mt-3 space-y-2 text-[#4c6673]">
                <p className="hover:text-[#2B9FB1] cursor-pointer" onClick={() => scrollTo('features')}>Neural Biometrics</p>
                <p className="hover:text-[#2B9FB1] cursor-pointer" onClick={() => scrollTo('interactive-demo')}>Live HUD</p>
                <p className="hover:text-[#2B9FB1] cursor-pointer" onClick={() => scrollTo('calculator')}>ROI Calculator</p>
                <Link to="/face-registration" className="hover:text-[#2B9FB1] block">5-Angle Studio</Link>
              </div>
            </div>
            <div>
              <p className="font-bold text-[#0D2237] uppercase tracking-wider text-xs">Solutions</p>
              <div className="mt-3 space-y-2 text-[#4c6673]">
                <p className="hover:text-[#2B9FB1] cursor-pointer" onClick={() => scrollTo('use-cases')}>Universities</p>
                <p className="hover:text-[#2B9FB1] cursor-pointer" onClick={() => scrollTo('use-cases')}>K-12 Campuses</p>
                <p className="hover:text-[#2B9FB1] cursor-pointer" onClick={() => scrollTo('use-cases')}>Corporate Training</p>
                <Link to="/reports" className="hover:text-[#2B9FB1] block">Audit Reports</Link>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-bold text-[#0D2237] uppercase tracking-wider text-xs">Security</p>
              <div className="mt-3 space-y-2 text-[#4c6673]">
                <p className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#2B9FB1]" /> AES-256 Encrypted</p>
                <p className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#2B9FB1]" /> Anti-Spoof Liveness</p>
                <p className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#2B9FB1]" /> GDPR & FERPA Ready</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl border-t border-[#d1dde1] px-4 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#607987] gap-3 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} AttendAi Platform. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
