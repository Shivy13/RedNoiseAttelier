"use client"
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

type Stat = { label: string; value: number; prefix?: string; suffix?: string }

const stats: Stat[] = [
  {label: 'High-value projects delivered', value: 95, suffix: '%'},
  {label: 'Premium projects on time', value: 423000, prefix: '$'},
  {label: 'Top-tier deliverables', value: 15000000}
]

export default function Metrics(){
  return (
    <section className="py-12 bg-gray-50">
      <div className="container flex flex-col md:flex-row gap-8">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="flex-1 text-center">
            <div className="text-4xl font-bold">
              <CountUp end={s.value} duration={2} prefix={s.prefix||''} suffix={s.suffix||''} separator="," />
            </div>
            <p className="mt-2 text-gray-600">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
