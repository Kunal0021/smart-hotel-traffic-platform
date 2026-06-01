import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function RevenueChart({
    data,
}) {
    return (
        <div className="bg-[#f5f0eb] border border-[rgba(38,38,38,0.08)] p-8 rounded-2xl mt-8">
            <h2 className="text-xs font-black tracking-[0.25em] text-[#262626] uppercase mb-6">
                Revenue Analytics
            </h2>

            <div className="w-full h-[300px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={data}>
                        <XAxis 
                            dataKey="month" 
                            stroke="#262626" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            dy={10}
                        />

                        <YAxis 
                            stroke="#262626" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            dx={-10}
                        />

                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#fdf8f3', 
                                border: '1px solid rgba(38, 38, 38, 0.08)',
                                borderRadius: '8px',
                                fontFamily: "'League Spartan', sans-serif",
                                fontSize: '12px'
                            }}
                            cursor={{ fill: 'rgba(38, 38, 38, 0.02)' }}
                        />

                        <Bar
                            dataKey="revenue"
                            fill="#e4a4bd"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}