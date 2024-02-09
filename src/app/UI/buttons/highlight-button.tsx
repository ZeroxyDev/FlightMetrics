export default function HighlightButton({handleFunction, text, loading}: ButtonProps) {
    return (
        <button onClick={handleFunction} className="relative hover:scale-105 transition-all duration-[.8s] group mt-6 overflow-hidden px-6 h-12 rounded-full flex space-x-2 animate-gradient bg-[length:200%_auto]  items-center bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))]" style={{ filter: 'drop-shadow(0 0px 40px rgba(255, 255, 255, 0.3))' }}>
        <span className="relative text-sm text-black font-bold">{text}</span>
        <div className="flex items-center -space-x-3 translate-x-3">
            <div className="w-2.5 h-[1.6px] rounded bg-black origin-left scale-x-0 transition duration-[.8s] group-hover:scale-x-100"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-black -translate-x-2 transition duration-[.8s] group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </button>
    );
}