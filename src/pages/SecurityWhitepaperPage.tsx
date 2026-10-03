import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AttendAiLogo } from "@/components/AttendAiLogo";
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  Cpu,
  Server,
  Layers,
  CheckCircle2,
  Clock,
  Scan,
  Zap,
  Key
} from "lucide-react";

export default function SecurityWhitepaperPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" /> Technical Architecture & Cryptographic Overview
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B2E45] tracking-tight">
            Security & Biometrics Whitepaper
          </h1>
          <p className="mt-2 text-sm text-[#4b6d80] max-w-2xl">
            A comprehensive technical breakdown of AttendAi's 128-dimensional facial vector architecture, 3D anti-spoofing liveness mechanisms, and institutional data encryption infrastructure.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2B9FB1]" /> Edition: v2.4 (October 2026)</span>
            <span>•</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> AES-256 / SHA-512 Standard</span>
          </div>
        </div>

        {/* Whitepaper Body */}
        <div className="space-y-6 text-[#1c3746] text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#2B9FB1]" /> 1. 128-D Euclidean Vector Embedding Architecture
            </h2>
            <p>
              AttendAi uses state-of-the-art deep convolutional neural networks (CNNs) trained on triplet-loss embeddings to map human faces into a normalized 128-dimensional Euclidean space.
            </p>
            <div className="p-4 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto">
              <code>
                {`// Biometric Distance Metric
d(v_sample, v_enrolled) = || v_sample - v_enrolled ||_2
Confidence = max(0, 1.0 - (d / threshold)) * 100%
Threshold: 0.58 (Equal Error Rate < 0.001%)`}
              </code>
            </div>
            <p className="text-slate-700 text-xs">
              Because faces are represented purely as numerical coordinates in hyperspace, original biometric photographs cannot be derived or reconstructed from stored vector embeddings.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Scan className="w-5 h-5 text-[#2B9FB1]" /> 2. 3D Anti-Spoofing & Liveness Detection
            </h2>
            <p>
              To combat proxy attendance, photographic spoofing, and synthetic deepfakes, AttendAi integrates multi-layer liveness verification:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-[#0B2E45]">Texture Fourier Analysis</p>
                <p className="text-xs text-slate-600 mt-1">Detects high-frequency moiré patterns common in digital screens and paper printouts.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-[#0B2E45]">Volumetric Micro-Mesh</p>
                <p className="text-xs text-slate-600 mt-1">Estimates 3D depth and facial surface curvature across 468 landmark points.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-xs text-[#0B2E45]">Temporal Consistency</p>
                <p className="text-xs text-slate-600 mt-1">Tracks natural micro-movements and eye blink dynamics across sequential frames.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Key className="w-5 h-5 text-[#2B9FB1]" /> 3. Cryptographic Key Hierarchy & Zero-Trust RBAC
            </h2>
            <p>
              Access to institutional datasets is governed through a Zero-Trust cryptographic model:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>HMAC-SHA512 Signed JWTs:</strong> Session tokens include cryptographically signed claims with short expirations and automatic rolling refresh.</li>
              <li><strong>BCrypt Password Hashing:</strong> Passwords hashed with salt factor 10 to resist rainbow table and brute-force attacks.</li>
              <li><strong>Row-Level Security (RLS):</strong> Campus data is isolated per institutional domain, preventing cross-tenant data leakage.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="rounded-2xl border border-[#d2e1e5] bg-white p-6 sm:p-8 shadow-xs space-y-3">
            <h2 className="text-xl font-bold font-display text-[#0B2E45] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#2B9FB1]" /> 4. Edge Inference & Sub-400ms Verification Latency
            </h2>
            <p>
              AttendAi features hybrid edge/cloud parallel processing:
            </p>
            <p className="text-slate-700">
              Client-side WebAssembly models perform real-time face alignment, bounding-box tracking, and liveness scoring locally in the browser, transmitting only anonymized vector coordinates for sub-400ms backend database matching.
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
            <Link to="/terms" className="hover:text-[#0B2E45] hover:underline">Terms of Service</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
