import { useState } from "react"

const BRAND_COLORS = [
  { id: "blue", name: "Royal Blue", hex: "#3A5BFF", tint: "#DDE4FF" },
  { id: "sky", name: "Sky Blue", hex: "#38BDF8", tint: "#E0F2FE" },
  { id: "navy", name: "Dark Navy", hex: "#1C2536", tint: "#E2E8F0" },
  { id: "pink", name: "Pink", hex: "#E8368F", tint: "#FCE7F3" },
  { id: "green", name: "Emerald Green", hex: "#2EC4B6", tint: "#CCFBF1" },
  { id: "amber", name: "Amber Gold", hex: "#FFB703", tint: "#FEF3C7" },
]

export default function App() {
  const [activeWeight, setActiveWeight] = useState("Bold")
  const [activeColor, setActiveColor] = useState(BRAND_COLORS[0])
  const [sliderVal, setSliderVal] = useState(85)

  const getWeightClass = (w) => {
    switch (w) {
      case "Medium":
        return "font-medium"
      case "Semibold":
        return "font-semibold"
      case "Bold":
        return "font-bold"
      default:
        return "font-bold"
    }
  }

  return (
    <div className="min-h-screen bg-mesh text-[#1C2536] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-16 my-auto">
        {/* Header Title */}
        <div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#171E2E]">
            Manrope<span style={{ color: activeColor.hex }}>.</span>
          </h1>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Weights & Description */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            {/* Font Weight List */}
            <div className="sm:col-span-4 space-y-3 pt-1">
              {["Medium", "Semibold", "Bold"].map((w) => {
                const isActive = activeWeight === w
                return (
                  <button
                    key={w}
                    onClick={() => setActiveWeight(w)}
                    className={`block text-left text-base sm:text-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "font-bold text-[#171E2E] scale-105 origin-left"
                        : "font-medium text-[#838EA6] hover:text-[#4A5568]"
                    }`}
                  >
                    {w}
                  </button>
                )
              })}
            </div>

            {/* Description Text */}
            <div className="sm:col-span-8">
              <p
                className={`text-[#6B768E] text-base sm:text-lg leading-relaxed transition-all duration-300 ${getWeightClass(
                  activeWeight
                )}`}
              >
                Manrope features clean lines and balanced proportions, providing
                excellent readability while ensuring clear and legible
                communication.
              </p>
            </div>
          </div>

          {/* Right Column: Guidelines Specimen Visualizer */}
          <div className="lg:col-span-6 relative flex items-baseline justify-end gap-10 sm:gap-16 pt-8 pb-4">
            {/* Guideline Grid */}
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-300/80 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-300/80 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 border-b border-dashed border-slate-300/80 pointer-events-none" />

            {/* 12px Preview */}
            <div className="relative z-10 flex items-baseline gap-3">
              <span className={`text-4xl sm:text-5xl text-[#171E2E] ${getWeightClass(activeWeight)}`}>
                Aa
              </span>
              <span className="text-xs font-medium text-[#838EA6] font-mono tracking-wider">
                12 px
              </span>
            </div>

            {/* 28px Preview */}
            <div className="relative z-10 flex items-baseline gap-4">
              <span className={`text-7xl sm:text-8xl md:text-9xl text-[#171E2E] ${getWeightClass(activeWeight)} leading-none`}>
                Aa
              </span>
              <span className="text-xs font-medium text-[#838EA6] font-mono tracking-wider">
                28 px
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Floating White Card */}
        <div className="bg-white/90 backdrop-blur-2xl border border-white/90 rounded-[36px] p-6 sm:p-8 md:p-10 shadow-2xl shadow-slate-200/60 max-w-5xl mx-auto space-y-8">
          {/* Swatches Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <span className="text-lg font-bold text-[#171E2E] tracking-tight">
              Colors
            </span>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
              {BRAND_COLORS.map((color) => {
                const isSelected = activeColor.id === color.id
                return (
                  <button
                    key={color.id}
                    onClick={() => setActiveColor(color)}
                    className="relative flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer"
                    style={{ width: "42px", height: "42px" }}
                    title={color.name}
                  >
                    {/* Circle Swatch with Inline Background Color */}
                    <span
                      className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all"
                      style={{ backgroundColor: color.hex }}
                    >
                      {/* Inner White Dot for Selected Swatch */}
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Slider & Color Tint Dots Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
            {/* Gradient Slider */}
            <div className="sm:col-span-5 relative flex items-center">
              <div
                className="w-full h-8 rounded-full overflow-hidden relative flex items-center px-1 shadow-inner"
                style={{
                  background: "linear-gradient(to right, #cfd7e6, #1c2536)",
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full opacity-0 h-full cursor-pointer absolute inset-0 z-20"
                />
                <div
                  className="w-4 h-4 rounded-full bg-white shadow-md border border-slate-300 pointer-events-none z-10 transition-all"
                  style={{ left: `calc(${sliderVal}% - 8px)`, position: "absolute" }}
                />
              </div>
            </div>

            {/* Tint Circle Dots Row */}
            <div className="sm:col-span-7 flex items-center justify-between sm:justify-end gap-4 sm:gap-6 md:gap-8 pl-0 sm:pl-4">
              {BRAND_COLORS.map((c) => (
                <div
                  key={`tint-${c.id}`}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm"
                  style={{
                    backgroundColor: c.tint,
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: c.id === activeColor.id ? c.hex : "#ffffff",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
