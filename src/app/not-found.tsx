import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#041611] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Glowing 404 */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[160px] font-black font-display leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#DFC993] via-[#34D399] to-[#10B981]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-[#DFC993]/20 rounded-full blur-[60px]" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Yeh raasta toot gaya!
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Aap jis page pe gaye woh exist nahi karta ya hata diya gaya hai.
            Chalo, ghar chalte hain!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#DFC993] via-[#34D399] to-[#10B981] text-[#041611] font-black text-sm uppercase tracking-wider shadow-lg shadow-[#DFC993]/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
          >
            Wapas Ghar Jao
          </Link>
          <a
            href="tel:8087747774"
            className="px-8 py-3.5 rounded-2xl glass-panel border border-[#DFC993]/25 text-[#F7EBD2] font-bold text-sm uppercase tracking-wider hover:border-[#DFC993]/50 hover:text-white transition-all duration-300"
          >
            Call Support
          </a>
        </div>

        <p className="text-[11px] text-[#DFC993]/60">
          ChaloJi Support: +91 80877 47774
        </p>
      </div>
    </div>
  );
}
