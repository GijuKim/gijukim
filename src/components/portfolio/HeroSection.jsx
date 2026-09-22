import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight leading-tight px-4 mb-6 whitespace-nowrap"
        >
          Giju Kim’s Portfolio<span className="text-blue-500">.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Developer and designer.{' '}
          <span className="bg-gradient-to-r from-blue-500 via-blue-400 via-slate-400 to-slate-600 bg-clip-text text-transparent font-semibold">
            I analyze trends, validate ideas with data, and turn them into products.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-2 mt-8 px-4"
        >
          {['Product', 'Engineering', 'Design', 'Analytics', 'Business', 'Marketing'].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            View Projects
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-slate-300" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
