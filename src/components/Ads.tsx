'use client'

export default function Ads({ position }: { position: 'bottom' | 'footer' }) {
  // Placeholder for Google AdSense integration.
  // In a real scenario, this would load the <ins className="adsbygoogle" /> script.
  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center min-h-[100px] z-20 relative backdrop-blur-sm">
      <p className="text-white/30 text-sm tracking-widest uppercase">Advertisement ({position})</p>
    </div>
  )
}
