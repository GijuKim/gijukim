import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, ReferenceLine } from
'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const costData = [
{ label: 'Viable subscription price', value: 10, color: '#d1d5db' },
{ label: 'Actual API cost', value: 90, color: '#ef4444' }];


const contextData = [
{ chunks: 1, accuracy: 98 },
{ chunks: 2, accuracy: 82 },
{ chunks: 3, accuracy: 61 },
{ chunks: 4, accuracy: 43 },
{ chunks: 5, accuracy: 29 }];


function CostChart() {
  return (
    <div className="space-y-3">
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={costData} margin={{ top: 20, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              formatter={(v) => [`$${v}`, "monthly cost"]}
              contentStyle={{ borderRadius: '12px', border: '1px solid #fecaca', fontSize: '12px', background: '#fff5f5' }} />

            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {costData.map((entry, i) =>
              <Cell key={i} fill={entry.color} />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 text-center">Per user/monthly estimate</p>
    </div>);

}

function ContextChart() {
  return (
    <div className="space-y-3">
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={contextData} margin={{ top: 5, right: 8, left: -8, bottom: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="chunks" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} label={{ value: "API call count", position: 'insideBottom', offset: -2, fontSize: 10, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
            <Tooltip
              formatter={(v) => [`${v}%`, "Context retention rate"]}
              contentStyle={{ borderRadius: '12px', border: '1px solid #fecaca', fontSize: '12px', background: '#fff5f5' }} />

            <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="4 3" strokeWidth={1.2} label={{ value: "critical point", position: 'right', fontSize: 10, fill: '#ef4444' }} />
            <Line type="monotone" dataKey="accuracy" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 text-center mt-10">Context retained as a 16K-token lecture is split into more API calls</p>
    </div>);

}

const issues = [
{
  tag: 'Technology',
  title: 'Insufficient Context Window',
  points: [
  { label: 'Constraint', body: 'The strongest model available at the time, gpt-3.5-turbo-16k, could process only 16,000 tokens per request.' },
  { label: 'Problem', body: 'A one-hour lecture produced 30,000–40,000 tokens, so the full lecture could not be analyzed at once.' },
  { label: 'Result', body: 'The lecture had to be split across three or four API calls, which lost context and broke logical connections.' }]

},
{
  tag: 'Cost',
  title: 'Unsustainable Business Model',
  points: [
  { label: 'Input', body: '$3.00 / 1M tokens' },
  { label: 'Output', body: '$4.00 / 1M tokens' },
  { label: 'Monthly cost', body: 'Approximately $90 per user, or roughly KRW 120,000' },
  { label: 'Conclusion', body: 'A reasonable subscription price could not cover operating costs, making the model unsustainable.' }]

},
{
  tag: 'Market',
  title: 'A Major Platform Entered Without a Defensible Edge',
  points: [
  { label: 'Situation', body: 'Soon after MVP testing, Microsoft announced Copilot for Microsoft 365 with similar meeting and lecture summary features.' },
  { label: 'Impact', body: 'Large platforms had enormous user bases and much lower operating costs, making direct competition unrealistic.' },
  { label: 'Conclusion', body: 'Without a distinct competitive advantage, NotePal could not sustain an independent paid model.' }]

}];


export default function PostMortemSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-50/20 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto space-y-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4">

          <p className="text-xs font-semibold text-red-500 tracking-widest uppercase">Post-Mortem</p>
          <p className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-semibold leading-tight">Why the Project Failed

          </p>
          <p className="text-lg sm:text-xl text-gray-500 font-light max-w-2xl mx-auto">
            An honest assessment of the technical, economic, and market constraints.
          </p>
        </motion.div>

        {/* Issue Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-6">

          {issues.map((issue, i) =>
          <motion.div
            key={i}
            variants={itemVariants}
            className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-red-200 transition-colors">

              <div className="flex items-start gap-5">
                <span className="flex-shrink-0 mt-0.5 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-1.5 tracking-wide">
                  {issue.tag}
                </span>
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                  <div className="space-y-2">
                    {issue.points.map((p, j) =>
                  <div key={j} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 font-semibold text-gray-400 w-12 pt-0.5">{p.label}</span>
                        <p className="text-gray-600 leading-relaxed">{p.body}</p>
                      </div>
                  )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8">

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-red-200 transition-colors space-y-5">

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-900">Monthly cost per user</h3>
              <p className="text-sm text-gray-500">Actual API cost compared with a viable subscription price</p>
            </div>
            <CostChart />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-red-200 transition-colors space-y-5">

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-900">Context Retention by Number of Chunks</h3>
              <p className="text-sm text-gray-500">Degraded analysis quality due to token limitations</p>
            </div>
            <ContextChart />
          </motion.div>
        </motion.div>

        {/* Lesson */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden border border-gray-200"
        >
          <div className="bg-gray-900 px-6 py-3 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Lessons Learned</span>
          </div>
          <div className="bg-gray-50 px-8 py-6 space-y-4">
            {[
              { num: '01', text: 'An MVP that ignores technical limits and unit economics will struggle to scale.' },
              { num: '02', text: 'When major platforms can enter with similar features, a defensible core advantage must be established early.' },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4">
                <span className="flex-shrink-0 text-xs font-bold text-gray-300 mt-0.5 w-6">{item.num}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>



        {/* Next Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center pt-4"
        >
          <Link
            to={createPageUrl('ShowShort')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-blue-200 bg-white hover:border-blue-600 hover:bg-blue-600 transition-all duration-300"
          >
            <span className="text-sm font-medium text-blue-400 group-hover:text-white transition-colors">Next Project</span>
            <span className="text-sm font-semibold text-blue-600 group-hover:text-white transition-colors">ShoShort</span>
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

      </div>
    </section>);

}
