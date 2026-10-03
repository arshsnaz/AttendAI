import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AttendAiLogo } from "@/components/AttendAiLogo";
import {
  FileText,
  ArrowLeft,
  Scale,
  ShieldAlert,
  Server,
  Users,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertTriangle
} from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#EEF3F4] text-[#0D2237] selection:bg-[#2B9FB1]/20">
      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#d2e1e5] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-xl border border-[#d2e1e5] bg-white px-3 py-1.5 text-xs font-semibold text-[#325264] shadow-xs hover:border-[#2B9FB1] hover:text-[#0B2E45] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0B2E45] to-[#2B9FB1] p-[1px] shadow-xs">
                <div className="h-full w-full rounded-[7px] bg-white flex items-center justify-center p-1">
                  <AttendAiLogo className="h-full w-full object-contain" />
                </div>
              </div>
              <span className="font-display font-extrabold text-lg text-[#0B2E45]">AttendAi</span>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/login">
              <Button variant="outline" className="rounded-xl border-[#d2e1e5] text-xs h-9 px-3.5 font-medium hover:bg-slate-50">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-xl bg-[#2B9FB1] hover:bg-[#23899B] text-white text-xs h-9 px-3.5 font-semibold shadow-xs">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header Hero Card */}
        <div className="rounded-3xl border border-[#cbe0e6] bg-white/95 p-6 sm:p-10 shadow-sm backdrop-blur-md mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-[#2B9FB1] border border-cyan-200 mb-3">
            <Scale className="w-3.5 h-3.5" /> Master Subscription & Service Agreement
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B2E45] tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-[#4b6d80] max-w-2xl">
            These terms govern institutional subscription access, administrative responsibilities, biometric scanner usage policies, and service level agreements for the AttendAi platform.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2B9FB1]" /> Effective Date: October 2026</span>
            <span>•</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Enterprise SLA Edition</span>
          </div>
        </div>

        {/* Terms Body */}
        <div className="space-y-6 text-[#1c3746] text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#2B9FB1]" /> 1. Acceptance and Authorized Institutional Use
            </h2>
            <p>
              By accessing or creating an institutional account on AttendAi, your university, school district, or organization agrees to be bound by these Terms of Service. Authorized access is granted solely to designated administrators, educators, and verified institutional personnel.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2B9FB1]" /> 2. Administrative Credentials & RBAC Governance
            </h2>
            <p>
              Institutions are responsible for maintaining the confidentiality of administrative API credentials and role-based permissions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>System Administrator:</strong> Holds supervisory privileges including dataset vector management, student directory modifications, and compliance exports.</li>
              <li><strong>Faculty Member:</strong> Holds session-level permissions to launch live biometric scanners, record manual overrides, and review classroom rosters.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#2B9FB1]" /> 3. Acceptable Use & Anti-Spoofing Guidelines
            </h2>
            <p>
              The AttendAi platform must not be subjected to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Reverse engineering or extraction of the underlying 128-dimensional biometric embedding models.</li>
              <li>Attempting to bypass 3D liveness detection checks with synthetic deepfakes, printed photographs, or masked injections.</li>
              <li>Using biometric feeds for unauthorized surveillance beyond designated attendance and identity verification contexts.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Server className="w-5 h-5 text-[#2B9FB1]" /> 4. Service Availability & Performance SLAs
            </h2>
            <p>
              AttendAi guarantees <strong>99.9% uptime</strong> for live biometric API endpoints, Realtime WebSocket verification streams, and audit reporting services under enterprise subscription agreements.
            </p>
          </div>

          {/* Section 5 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#2B9FB1]" /> 5. Termination & Data Portability
            </h2>
            <p>
              Institutions may terminate subscriptions at any time. Upon termination, administrators have 30 days to export all official compliance attendance records via CSV or PDF before complete cryptographic purging.
            </p>
          </div>
        </div>

        {/* Bottom Navigation Row */}
        <div className="mt-10 pt-6 border-t border-[#d2e1e5] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <Link to="/" className="text-[#2B9FB1] font-bold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/privacy" className="hover:text-[#0B2E45] hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/security" className="hover:text-[#0B2E45] hover:underline">Security Whitepaper</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
