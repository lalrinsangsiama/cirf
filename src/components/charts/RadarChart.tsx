'use client'

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface RadarChartProps {
  data: { dimension: string; value: number }[]
  color?: string
}

export function RadarChart({ data, color = '#d4af37' }: RadarChartProps) {
  const formattedData = data.map((item) => ({
    subject: item.dimension,
    value: item.value,
    fullMark: 5,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
        <PolarGrid stroke="#e5e5e5" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#7c7c7c', fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 5]}
          tick={{ fill: '#7c7c7c', fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.5}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fdfdfb',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
          }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
