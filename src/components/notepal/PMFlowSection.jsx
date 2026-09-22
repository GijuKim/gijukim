import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const marketData = [
{ year: '2024', value: 5.47 },
{ year: '2025', value: 7.73 },
{ year: '2026', value: 10.93 },
{ year: '2027', value: 15.46 },
{ year: '2028', value: 21.86 },
{ year: '2029', value: 30.89 }];


function MarketChart() {
  return (
    <div className="space-y-3">
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketData} margin={{ top: 20, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}B`} />
            <Tooltip
              formatter={(v) => [`$${v}B`, 'Market size']}
              contentStyle={{ borderRadius: '12px', border: '1px solid #fed7aa', fontSize: '12px', background: '#fff7ed' }} />

            <ReferenceLine x="2026" stroke="#f97316" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: 'NOW', position: 'top', fontSize: 10, fill: '#f97316' }} />
            <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2.5} fill="url(#marketGradient)" dot={{ fill: '#f97316', r: 3 }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 text-center">Source: MarketsandMarkets, AI in Education Market Global Forecast to 2029</p>
    </div>);

}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>);

}

export default function PMFlowSection() {
  return (
    <div>
      {/* Problem & Research */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-4">

            <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase">Problem & Research</p>
            <p className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-semibold leading-tight">
              Why do we record lectures<br />but rarely review them?
            </p>
            <p className="text-lg sm:text-xl text-gray-500 font-light max-w-2xl mx-auto">
              Many students record lectures, yet very few turn those recordings into meaningful review.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8">

            {[
            {
              label: 'Difficult to navigate',
              stat: '72%',
              statNote: "Rewatch abandonment rate",
              body: 'Finding information in audio takes more than four times longer than searching text. Seventy-two percent of users give up because they cannot find the section they need.',
              source: 'https://www.nature.com/articles/s41598-020-74857-3',
              sourceLabel: "Nature, 2020 — The impact of visual summarization on learning efficiency"
            },
            {
              label: 'The speed of forgetting',
              stat: '15% → 70%',
              statNote: 'Recall with active quizzes',
              body: "When simply listening, the retention rate after one week is only 15%, but when combined with active quizzes, it rises to 70%.",
              source: 'https://www.psychologicalscience.org/publications/journals/pspi/taking-stock-of-the-testing-effect.html',
              sourceLabel: "Psychological Science — The correlation between the retrieval effect and long-term memory"
            }].
            map((item, i) =>
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-orange-200 transition-colors flex flex-col gap-5">

                <div className="bg-orange-50 rounded-xl px-5 py-4">
                  <p className="text-orange-500 font-bold text-3xl leading-none">{item.stat}</p>
                  <p className="text-orange-700 text-xs mt-1.5">{item.statNote}</p>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{item.body}</p>
                </div>
                <a href={item.source} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-orange-500 underline underline-offset-2 transition-colors block pt-2 border-t border-gray-100">
                  Source: {item.sourceLabel}
                </a>
              </motion.div>
            )}

            {/* Insight */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 flex items-start gap-4 px-6 py-5 rounded-2xl bg-orange-50 border border-orange-100">

              <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-sm text-orange-800 leading-relaxed">
                <span className="font-semibold">Insight: </span>
                Existing apps focus on capturing and organizing information, while few help students retain it.
              </p>
            </motion.div>

            {/* Market Chart Card */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-3 p-8 rounded-2xl border border-gray-200 bg-white hover:border-orange-200 transition-colors space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">The rise of intelligent learning assistants</h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                    The global AI education market is moving beyond simple archives toward intelligent assistants that support how learners understand and remember. NotePal was designed to help students learn more efficiently in this growing market.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-orange-50 rounded-xl px-5 py-3 text-center">
                  <p className="text-orange-500 font-bold text-3xl">41.4%</p>
                  <p className="text-orange-700 text-xs mt-0.5">CAGR 2024–2029</p>
                </div>
              </div>
              <MarketChart />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Service Design */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4">

            <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase">Service Design</p>
            <p className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-semibold leading-tight">
              Designing a Complete Learning Loop
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-center">

            <div className="inline-block bg-gray-50 rounded-2xl px-10 py-5 font-mono text-lg text-gray-500 tracking-wide">
              Record → Transcribe → Organize → Ask → Quiz
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8">

            {[
            {
              title: 'Structured Notes',
              body: 'Organizes lectures into a clear hierarchy instead of producing a raw transcript, reducing cognitive load.'
            },
            {
              title: "Intelligent Q&A",
              body: 'Ask an AI tutor for help whenever a concept is unclear.'
            },
            {
              title: 'Auto-generated Quizzes',
              body: 'Creates multiple-choice and short-answer questions from key concepts to encourage active recall.'
            },
            {
              title: 'Cost Optimization',
              body: 'Uses current AI models to keep processing costs below KRW 100 per hour of lecture.'
            }].
            map((item, i) =>
            <motion.div key={i} variants={itemVariants} className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-orange-200 transition-colors space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Test & Results */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4">

            <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase">Test & Results</p>
            <p className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-semibold">Results Backed by Data</p>
            <p className="text-gray-500 font-light text-lg">Results from a two-week test with 100 students using real lectures.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
            { value: '64%', label: 'Quiz completion rate', note: '12× the previous review rate', bg: 'bg-orange-50 border-orange-100', color: 'text-orange-500' },
            { value: '57%', label: 'Less time spent reviewing', note: '42 minutes → 18 minutes', bg: 'bg-amber-50 border-amber-100', color: 'text-amber-500' },
            { value: '78%', label: 'Return rate during exams', note: 'Demonstrated practical value', bg: 'bg-red-50 border-red-100', color: 'text-red-500' },
            { value: '48%', label: 'Week-one retention', note: 'Strong product engagement', bg: 'bg-orange-50 border-orange-200', color: 'text-orange-600' }].
            map((k, i) =>
            <motion.div key={i} variants={itemVariants} className={`text-center p-8 rounded-2xl border ${k.bg} space-y-3`}>
                <p className={`text-5xl sm:text-6xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-base font-semibold text-gray-900">{k.label}</p>
                <p className="text-sm text-gray-500">{k.note}</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 max-w-2xl mx-auto">

            <p className="text-center text-sm font-semibold text-gray-500 tracking-widest uppercase">Summary of Key Achievements</p>
            {[
            { title: 'Removing friction', body: 'Reducing review time from 42 to 18 minutes dramatically increased completion.' },
            { title: 'The value of questions', body: 'Users asked 13.4 questions on average, turning passive review into active learning.' },
            { title: 'The main driver', body: 'Auto-generated quizzes created more motivation and a stronger sense of progress than summaries alone.' }].
            map((item, i) =>
            <div key={i} className="flex gap-4 items-start p-5 rounded-xl hover:bg-orange-50/40 transition-colors">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-400 mt-2.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Next Step & Conclusion */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40">
        <div className="max-w-4xl mx-auto space-y-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12">

            <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase">Next Step</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8 text-left">

              {[
              { title: 'Visual Integration', body: 'Pair a photo of the board with the audio recorded at that exact moment.' },
              { title: 'Personalized Review Cycles', body: 'Send quiz reminders at the optimal time based on each learner’s forgetting curve.' },
              { title: 'Education Partnerships', body: 'Expand into a learning management system through integrations with academies and online course platforms.' }].
              map((item, i) =>
              <motion.div key={i} variants={itemVariants} className="p-8 rounded-2xl border border-orange-100 bg-orange-50/30 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          













        </div>
      </section>
    </div>);

}
