export default function StatCard({
    title,
    value,
}) {
    return (
        <div className="flex flex-col p-6 bg-[#f5f0eb] border border-[rgba(38,38,38,0.08)] rounded-2xl transition-all duration-300 hover:border-[#e4a4bd] hover:shadow-sm">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#e4a4bd] uppercase mb-3">
                {title}
            </span>
            <span className="text-3xl font-light italic tracking-tight text-[#262626]">
                {value}
            </span>
        </div>
    );
}