import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AttendAiLogo } from "@/components/AttendAiLogo";
import {
  Shield,
  ArrowLeft,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Link to="/login">
              <Button className="rounded-xl bg-[#2B9FB1] hover:bg-[#23899B] text-white text-xs h-9 px-3.5 font-semibold shadow-xs">
                Launch Workspace
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
            <Shield className="w-3.5 h-3.5" /> Institutional Data Governance
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B2E45] tracking-tight">
            Privacy Policy & Biometric Data Charter
          </h1>
          <p className="mt-2 text-sm text-[#4b6d80] max-w-2xl">
            This policy outlines how AttendAi processes, secures, and protects student and faculty biometric data in strict compliance with FERPA, GDPR, and international student privacy standards.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2B9FB1]" /> Last Updated: October 2026</span>
            <span>•</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Version 2.4 Verified</span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-6 text-[#1c3746] text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#2B9FB1]" /> 1. Biometric Data Collection & Vectorization
            </h2>
            <p>
              AttendAi is designed with a <strong>privacy-by-design</strong> architecture. When an educational institution enrolls students into the AttendAi system:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Zero Raw Image Storage:</strong> High-resolution facial photographs are analyzed locally in memory to extract mathematical 128-dimensional facial embedding vectors. Raw photos are not retained in public directories.</li>
              <li><strong>Irreversible Mathematical Hashes:</strong> Vector embeddings are one-way numerical representations that cannot be reverse-engineered to reconstruct a person's original photographic face.</li>
              <li><strong>Explicit Academic Scope:</strong> Facial data is exclusively captured and referenced for course attendance verification and authenticated institutional registry.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#2B9FB1]" /> 2. Data Encryption & Storage Standards
            </h2>
            <p>
              All institutional attendance records, student enrollment identities, and vector templates are safeguarded using enterprise-grade cryptographic standards:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-[#0B2E45] uppercase tracking-wider">Encryption at Rest</p>
                <p className="text-xs text-slate-600 mt-1">AES-256 GCM encryption on all database records, cached vectors, and biometric lookup tables.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-[#0B2E45] uppercase tracking-wider">Encryption in Transit</p>
                <p className="text-xs text-slate-600 mt-1">TLS 1.3 enforced across all API endpoints, WebSocket streams, and live camera feed handshakes.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#2B9FB1]" /> 3. Institutional Rights & Student Privacy Compliance
            </h2>
            <p>
              AttendAi operates strictly as a <strong>Data Processor</strong> under institutional direction. We comply with key global regulatory frameworks:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>FERPA Compliance (USA):</strong> Educational records and student attendance logs are maintained strictly for school officials with legitimate educational interests.</li>
              <li><strong>GDPR Article 9 (EU/UK):</strong> Explicit consent mechanisms, right to access, right to rectification, and right to complete data erasure.</li>
              <li><strong>COPPA & Student Privacy Pledge:</strong> We do not market to students, build commercial consumer profiles, or sell any educational telemetry.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#2B9FB1]" /> 4. Data Retention and Right to Deletion
            </h2>
            <p>
              Educational institutions retain full sovereignty over their academic data:
            </p>
            <p className="text-slate-700">
              Upon student graduation, deregistration, or institutional contract completion, administrators can trigger automated cryptographic wiping of biometric vectors and historical attendance logs via the institutional dashboard.
            </p>
          </div>

          {/* Section 5 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0D2237] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2B9FB1]" /> 5. Inquiries & Institutional Privacy Requests
            </h2>
            <p>
              For privacy audits, verification requests, or questions regarding institutional data governance:
            </p>
            <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200/80 text-xs space-y-2.5 text-slate-700">
              <p className="font-bold text-[#0D2237]">AttendAi Project & Institutional Governance</p>
              <p>
                Inquiries, compliance questions, and technical feedback can be submitted directly through the official project repository or via your institutional administrator portal.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <a
                  href="https://github.com/arshsnaz/AttendAI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B2E45] text-white hover:bg-[#104868] transition-colors font-medium text-xs shadow-xs"
                >
                  GitHub Project Repository
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0B2E45] border border-[#d2e1e5] hover:bg-slate-50 transition-colors font-medium text-xs shadow-xs"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Row */}
        <div className="mt-10 pt-6 border-t border-[#d2e1e5] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <Link to="/" className="text-[#2B9FB1] font-bold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/terms" className="hover:text-[#0B2E45] hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/security" className="hover:text-[#0B2E45] hover:underline">Security Whitepaper</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
