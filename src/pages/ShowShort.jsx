import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

function SceneSelectionFlow() {
  const [currentStage, setCurrentStage] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.2) setCurrentStage(0);
      else if (latest < 0.6) setCurrentStage(1);
      else setCurrentStage(2);
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.8 }}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center space-y-4 mb-32">
      </motion.div>

      <div className="relative h-screen" />

      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto px-6 sm:px-8 pointer-events-auto h-screen flex flex-col items-center justify-center">

          <div className="text-center space-y-8 mb-16">
            <motion.h3
              key={`title-${currentStage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-semibold text-gray-900">
              {currentStage === 0 && "Long form is one long story"}
              {currentStage === 1 && 'Break the story into individual scenes'}
              {currentStage === 2 && 'Use the most engaging scenes to capture attention'}
            </motion.h3>

            <motion.p
              key={`body-${currentStage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-gray-700 leading-relaxed">
              {currentStage === 0 && 'But every long story contains many distinct scenes.'}
              {currentStage === 1 && 'Turn each movie or series into a sequence of short, scene-based clips.'}
              {currentStage === 2 && 'The algorithm uses engagement data to surface the scenes most likely to hold attention.'}
            </motion.p>
          </div>

          <motion.div
            className="w-full max-w-2xl"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}>
            
            {currentStage === 0 &&
            <div className="w-full h-24 bg-gray-200 rounded-2xl" />
            }

            {currentStage === 1 &&
            <div className="w-full flex gap-1">
                {Array.from({ length: 30 }).map((_, i) =>
              <motion.div
                key={i}
                animate={{ opacity: 1, backgroundColor: "rgb(229, 231, 235)" }}
                transition={{ duration: 0.3 }}
                className="flex-1 h-24 bg-gray-200 rounded-sm" />
              )}
              </div>
            }

            {currentStage === 2 &&
            <div className="w-full flex gap-1">
                {Array.from({ length: 30 }).map((_, i) => {
                const isHighlighted = [5, 8, 12, 16, 22, 25, 28].includes(i);
                return (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: 1,
                      backgroundColor: isHighlighted ?
                      i === 8 ? "rgb(37, 99, 235)" : [5, 12].includes(i) ? "rgb(59, 130, 246)" : [16, 25].includes(i) ? "rgb(96, 165, 250)" : "rgb(147, 197, 253)" :
                      "rgb(229, 231, 235)"
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex-1 h-24 rounded-sm`} />
                );
              })}
              </div>
            }
          </motion.div>
        </motion.div>
      </div>

      <div className="relative h-[200vh]" />
    </motion.div>
  );
}

export default function ShowShort() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full max-w-[100vw]">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} strokeWidth={2} />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 pt-20 relative overflow-hidden">
        <div className="absolute top-32 -right-40 w-96 h-96 bg-red-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 sm:gap-5 mb-6 sm:mb-8">
            <img src="/assets/d18f3fd86_image.png" alt="Netflix" className="h-8 sm:h-10 md:h-12 opacity-50 rounded-lg" />
            <img src="/assets/b0e38c1e4_image.png" alt="Disney Plus" className="h-8 sm:h-10 md:h-12 opacity-50 rounded-lg" />
            <img src="/assets/5a8185621_image.png" alt="TVING" className="h-8 sm:h-10 md:h-12 opacity-50 rounded-lg" />
            <img src="/assets/14b7c617e_image.png" alt="Coupang Play" className="h-8 sm:h-10 md:h-12 opacity-50 rounded-lg" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 tracking-tight leading-[1.1] mb-10 sm:mb-12">
            “So much to watch, yet nothing to choose.”
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light">
            The Structural Problem with Streaming
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-purple-50/20 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-48 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-8">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-700 leading-tight px-2">
              <span className="font-bold text-gray-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">49%</span> of users<br />
              leave before they start watching.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-8">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light">The content is not the problem.</p>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 font-medium">People leave because they cannot decide what to watch.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center pt-16">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-semibold">Why does this happen?</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 max-w-4xl mx-auto w-full">
            <div className="-mx-6 sm:mx-0">
              <div className="overflow-x-auto border-y sm:rounded-2xl sm:border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <caption className="px-6 pt-5 pb-3 text-left text-xs font-semibold text-gray-500 tracking-widest uppercase">Table 2. Test of Discriminant Validity</caption>
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap"></th>
                      {['Content overload', 'Social capital', 'Affective ambivalence', 'Choice deferral', 'OTT stress', 'AVE', 'Construct reliability'].map((h) =>
                      <th key={h} className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                    { label: 'Content overload', vals: ['1', '', '', '', '', '0.532', '0.771'] },
                    { label: 'Social capital', vals: ['0.003', '1', '', '', '', '0.493', '0.733'] },
                    { label: 'Affective ambivalence', vals: ['0.396***', '0.004', '1', '', '', '0.652', '0.848'] },
                    { label: 'Choice deferral', vals: ['0.376***', '0.013*', '0.522***', '1', '', '0.665', '0.888'] },
                    { label: 'OTT stress', vals: ['0.191***', '0.013*', '0.295***', '0.234***', '1', '0.653', '0.848'] }].
                    map((row, i) =>
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{row.label}</td>
                        {row.vals.map((v, j) =>
                      <td key={j} className={`px-4 py-3 text-center text-xs text-gray-600 ${v.includes('***') ? 'font-semibold text-blue-600' : v.includes('*') ? 'font-medium text-blue-500' : ''}`}>{v}</td>
                      )}
                      </tr>
                    )}
                  </tbody>
                </table>
                <p className="px-6 py-3 text-xs text-gray-400 border-t border-gray-100">Note. * p &lt; .05, ** p &lt; .01, *** p &lt; 0.001.</p>
              </div>
            </div>

            <div className="-mx-6 sm:mx-0">
              <div className="border-y sm:rounded-2xl sm:border border-gray-200 bg-white p-4 sm:p-6 flex flex-col items-center gap-4">
                <img
                  src="/assets/92719e5ec_image.png"
                  alt="Path model"
                  className="w-full max-w-lg" />
                <p className="text-xs text-gray-400 text-center">Source: Asian Journal for Public Opinion Research (AJPOR)</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-16 md:gap-10 pt-12">
            <motion.div variants={itemVariants} className="group text-center space-y-4 p-6 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-transparent">
              <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">1</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">Choice Overload</p>
              <p className="text-lg text-gray-600">There is so much to see.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="group text-center space-y-4 p-6 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-transparent">
              <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">2</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">Internal Conflict</p>
              <p className="text-lg text-gray-600">Should I watch this, or that?</p>
            </motion.div>
            <motion.div variants={itemVariants} className="group text-center space-y-4 p-6 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-amber-50 hover:to-transparent">
              <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">3</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">Decision Delay</p>
              <p className="text-lg text-gray-600">The decision gets postponed.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-8 pt-12">
            <ArrowDown className="w-12 h-12 mx-auto text-gray-400" strokeWidth={1.5} />
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-medium">Eventually, the app gets closed.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-8 pt-16">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 font-semibold">49% is not a coincidence.</p>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-light">It is a result of the platform structure.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 pt-16">
            <a href="https://medium.com/@bapat.avanti/ux-case-study-improving-users-experience-with-ott-platforms-fc8c735188f9" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline">Source: Medium-UX Case Study (OTT Platforms)</a>
            <a href="https://www.ajpor.org/article/129993-why-does-netflix-syndrome-occur-a-study-on-the-effect-of-content-choice-deferral-on-stress" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline">Source: Asian Journal for Public Opinion Research (AJPOR)</a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-blue-50/20 pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-48 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-light">But something interesting happens.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-8">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 font-semibold leading-tight px-2 break-words">Once people start watching,<br />they do not want to stop.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">1</div>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">An unfinished series gives users a reason to <span className="font-semibold text-gray-900">return</span></p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">2</div>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">The next episode continues with <span className="font-semibold text-gray-900">no new decision</span></p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">3</div>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">Fewer decisions lead to <span className="font-semibold text-gray-900">longer viewing sessions</span></p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="text-center py-12">
            <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 italic">Starting is the key.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/20 via-transparent to-indigo-50/20 pointer-events-none" />
        <div className="absolute top-40 -left-48 w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-48 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-6">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-light leading-relaxed">What if people could discover<br />content they might love<br /><span className="font-semibold text-gray-900">without choosing first?</span></p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-8">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-light">We are already</p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-semibold">familiar with that experience.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-transparent to-pink-50/30 pointer-events-none" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-40 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 font-semibold leading-tight px-2 break-words">Short-form feeds<br />removed the choice.</p>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="flex justify-center">
              <img src="/assets/cc6a73efb_image.png" alt="Short-form SNS on mobile" className="w-full max-w-sm rounded-3xl" />
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="flex flex-col items-center space-y-8">
            <motion.div variants={itemVariants} className="p-4"><p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">The user <span className="font-semibold text-gray-900">does not choose.</span></p></motion.div>
            <motion.div variants={itemVariants} className="p-4"><p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center"><span className="font-semibold text-gray-900">The algorithm chooses for you.</span></p></motion.div>
            <motion.div variants={itemVariants} className="p-4"><p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">As the feed keeps moving,<br /><span className="font-semibold text-gray-900">something appealing appears.</span></p></motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-40">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-light">As a result,</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-700 font-light leading-tight px-2 break-words">More people now discover movies and series<br />through <span className="font-semibold text-gray-900">short highlight clips.</span></p>
          </motion.div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-light">But</p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/20 via-transparent to-orange-50/20 pointer-events-none" />
        <div className="absolute top-20 -right-48 w-96 h-96 bg-red-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-40 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-6 px-2">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 font-semibold leading-tight break-words">Short-form solved the starting problem,<br />but lost the story.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="max-w-2xl mx-auto space-y-6">
            <motion.div variants={itemVariants} className="flex gap-6 items-center p-4 rounded-xl transition-all duration-300 hover:bg-red-50/50">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-red-300 to-red-400 flex items-center justify-center text-xs font-semibold text-white">1</div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900">Viewers lack the full context of the story</span></p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 items-center p-4 rounded-xl transition-all duration-300 hover:bg-orange-50/50">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-xs font-semibold text-white">2</div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900">They never become fans of its world</span></p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 items-center p-4 rounded-xl transition-all duration-300 hover:bg-yellow-50/50">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-xs font-semibold text-white">3</div>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900">It cannot become a story that stays with them</span></p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-40 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-10 rounded-2xl bg-white border-l-4 border-red-500 shadow-sm space-y-6">
              <div className="text-4xl md:text-5xl font-bold text-gray-900">Short-form</div>
              <div className="space-y-3">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900">Easy</span> to start</p>
                <p className="text-lg md:text-xl text-red-600 font-semibold leading-relaxed">but lacks narrative depth.</p>
              </div>
            </div>
            <div className="p-10 rounded-2xl bg-white border-l-4 border-blue-600 shadow-sm space-y-6">
              <div className="text-4xl md:text-5xl font-bold text-gray-900">OTT</div>
              <div className="space-y-3">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900">Deep</span> narrative</p>
                <p className="text-lg md:text-xl text-blue-600 font-semibold leading-relaxed">but hard to start.</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-8 pt-12">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 font-semibold leading-tight px-2 break-words">What if one experience could connect<br />short-form discovery with long-form storytelling?</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex gap-6 items-start p-6 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">✓</div>
              <p className="text-lg sm:text-xl text-gray-900 font-medium leading-relaxed">Low barrier to entry</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 items-start p-6 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">✓</div>
              <p className="text-lg sm:text-xl text-gray-900 font-medium leading-relaxed">OTT-like immersion</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-6 items-start p-6 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">✓</div>
              <p className="text-lg sm:text-xl text-gray-900 font-medium leading-relaxed">Start relevant long-form content naturally, without another decision</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/20 via-transparent to-blue-50/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-24 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-4">
            <p className="text-xs font-semibold text-violet-500 tracking-widest uppercase">Market Timing</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">Why is this needed now?</h2>
            <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">The younger generation's media consumption has already shifted to short-form.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="p-7 rounded-2xl border border-gray-200 bg-white space-y-3">
              <a href="https://www2.deloitte.com/us/en/insights/industry/technology/digital-media-trends-consumption-habits-survey.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-violet-500 tracking-widest uppercase hover:underline">DELOITTE, 2024</a>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">50%<span className="text-2xl text-gray-400 font-normal">+</span></p>
              <p className="text-sm text-gray-600 leading-relaxed">Gen Z says “social video is more fun than OTT”</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-7 rounded-2xl border border-gray-200 bg-white space-y-3">
              <a href="https://datareportal.com/reports/digital-2024-global-overview-report" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-violet-500 tracking-widest uppercase hover:underline">DATAREPORTAL, 2024</a>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">95<span className="text-2xl text-gray-400 font-normal"> min</span></p>
              <p className="text-sm text-gray-600 leading-relaxed">Average daily usage time on TikTok for ages 18–24 — longer than Netflix (60 minutes)</p>
            </motion.div>
            <motion.div variants={itemVariants} className="p-7 rounded-2xl border border-gray-200 bg-white space-y-3">
              <a href="https://www.hubspot.com/state-of-consumer-trends" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-violet-500 tracking-widest uppercase hover:underline">HubSpot, 2024 ↗</a>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">70%<span className="text-2xl text-gray-400 font-normal">+</span></p>
              <p className="text-sm text-gray-600 leading-relaxed">More than 70% of Gen Z discover new content through short video</p>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-4 sm:p-8 rounded-2xl border border-gray-200 bg-white space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-900">Average daily time spent on short-form vs. OTT by age group</h3>
              <p className="text-sm text-gray-500">People aged 18–24 spend far more time with short-form video than streaming</p>
            </div>
            {(() => {
              const data = [{ age: '18–24', shortform: 95, ott: 60 }, { age: '25–34', shortform: 75, ott: 65 }, { age: '35–49', shortform: 45, ott: 72 }, { age: '50+', shortform: 20, ott: 80 }];
              return (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis dataKey="age" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} min`} />
                      <Tooltip formatter={(v, n) => [`${v} min`, n === 'shortform' ? 'Short-form (TikTok)' : 'Streaming (Netflix)']} contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
                      <Legend formatter={(v) => v === 'shortform' ? "Short Form (TikTok)" : 'OTT (Netflix)'} wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="shortform" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="ott" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}
            <a href="https://datareportal.com/reports/digital-2024-global-overview-report" target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-400 text-center hover:text-violet-500 transition-colors underline underline-offset-2">Source: DataReportal Digital 2024 / Average estimates by age group</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-4 sm:p-8 rounded-2xl border border-gray-200 bg-white space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-gray-900">“I discover new content on social” response rate</h3>
              <p className="text-sm text-gray-500">For Gen Z, social feeds are the starting point for content discovery.</p>
            </div>
            {(() => {
              const data = [{ gen: 'Gen Z', pct: 72 }, { gen: 'Millennial', pct: 54 }, { gen: 'Gen X', pct: 31 }];
              const colors = ['#7c3aed', '#a78bfa', '#ddd6fe'];
              return (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis dataKey="gen" tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                      <Tooltip formatter={(v) => [`${v}%`, "response rate"]} contentStyle={{ borderRadius: '10px', fontSize: '12px' }} />
                      <Bar dataKey="pct" radius={[6, 6, 0, 0]}>{data.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}
            <a href="https://www.hubspot.com/state-of-consumer-trends" target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-400 text-center hover:text-violet-500 transition-colors underline underline-offset-2">Source: HubSpot Consumer Trends Report 2024</a>
          </motion.div>

          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col gap-3 p-7 rounded-2xl border border-violet-100 bg-violet-50/60">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-violet-400 tracking-widest">01</span>
                <span className="text-xs font-bold text-violet-600 tracking-wide uppercase">Changing Habits</span>
              </div>
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">Younger audiences already understand <span className="text-violet-700 font-semibold">feeds that remove the need to choose.</span><br className="hidden sm:block" /> Streaming needs a similar entry point.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="rounded-2xl overflow-hidden border border-violet-100 bg-white">
              <div className="px-7 pt-6 pb-2 flex items-center gap-3">
                <span className="text-xs font-bold text-violet-400 tracking-widest">02</span>
                <span className="text-xs font-bold text-violet-600 tracking-wide uppercase">Market Shift</span>
              </div>
              <div className="px-7 pb-8 space-y-4">
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">Long-form streaming content<br />is increasingly discovered through <span className="text-violet-600">short clips.</span></p>
                <div className="h-px bg-gray-100" />
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">The market now needs <span className="text-gray-900 font-semibold">a bridge from those clips into long-form viewing.</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-8 max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">Solution</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-gray-900 leading-[1.2]">The Sequential Shorts Algorithm</h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light">Start as easily as short-form. Become immersed as deeply as streaming.</p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="relative py-40 px-6 sm:px-8 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SceneSelectionFlow />
        </div>
      </section>

      <section className="min-h-[40vh] flex items-center justify-center px-6 sm:px-8 py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center max-w-3xl mx-auto">
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 leading-relaxed">Selected scenes are assembled<br />and presented as <span className="font-semibold text-gray-900">short highlight clips.</span></p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-cyan-50/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto w-full relative z-10 space-y-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid md:grid-cols-3 gap-8 py-20">
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:border-blue-200 transition-colors">
              <div className="space-y-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">1</div>
                <h3 className="text-2xl font-semibold text-gray-900">Discover a Short Clip</h3>
                <p className="text-gray-700 leading-relaxed">Movies and series are segmented into scenes<br />and surfaced in a personalized feed</p>
                <p className="text-lg font-medium text-gray-900">Enter as casually as any short-form feed</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:border-purple-200 transition-colors">
              <div className="space-y-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">2</div>
                <h3 className="text-2xl font-semibold text-gray-900">Continue While Interest Holds</h3>
                <p className="text-gray-700 leading-relaxed">When engagement stays high, <span className="font-bold text-purple-600">show the next scene</span> and deepen immersion.</p>
                <p className="text-lg font-medium text-gray-900">Scene → Next scene → Long-form viewing</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:border-amber-200 transition-colors">
              <div className="space-y-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">3</div>
                <h3 className="text-2xl font-semibold text-gray-900">Return When Interest Drops</h3>
                <p className="text-gray-700 leading-relaxed">Return to lightweight discovery<br />in the recommendation feed.</p>
                <p className="text-lg font-medium text-gray-900">Keep exploring until something connects</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-40">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 font-light">Validating the Algorithm</p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 via-transparent to-blue-50/20 pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-48 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-8">
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">Hypothesis</p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 font-semibold leading-tight px-2 break-words">A short highlight clip can lead someone into long-form viewing without a deliberate choice.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="space-y-12">
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase text-center">Test Design</p>
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed text-center">I tested a working prototype with <span className="font-semibold text-gray-900">38 participants</span><br />using real Korean drama titles.</p>
            <div className="space-y-6 max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">I selected five series and broke one or two episodes from each<br />into short, scene-based clips:</p>
              <div className="space-y-3 pl-6">
                {['Reborn Rich', 'Discovery of Love', 'Lovestruck in the City', 'Connection', 'Dear Hyeri'].map((title, i) =>
                  <motion.p key={title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }} className="text-lg text-gray-600">• {title}</motion.p>
                )}
              </div>
            </div>
            <div className="space-y-6 max-w-3xl mx-auto pt-8">
              <p className="text-lg text-gray-700 leading-relaxed">The following structure was applied to each series:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {['Split episodes into scene-based clips', 'Surface clips in a randomized feed', 'Automatically continue to the next scene when engagement is high', 'Return to recommendations when interest drops'].map((text, i) =>
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }} className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                    <p className="text-gray-900 font-medium">{text}</p>
                  </motion.div>
                )}
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center pt-8">Behavioral changes were measured based on actual session data.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="space-y-12">
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase text-center">Metrics</p>
            <div className="grid md:grid-cols-3 gap-8">
              {['Binge-mode conversion rate', 'Average clips before the first binge', 'Maximum consecutive clips in one session'].map((metric, i) =>
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }} className="text-center p-6 rounded-xl bg-white border border-gray-200">
                  <p className="text-lg text-gray-900 font-medium leading-relaxed">{metric}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} className="space-y-16">
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase text-center">Results</p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 space-y-4">
                <p className="text-6xl sm:text-7xl font-bold text-blue-600">68%</p>
                <p className="text-lg text-gray-900 font-semibold">Binge-mode conversion</p>
                <p className="text-sm text-gray-600 leading-relaxed">Users who entered continuous viewing during a session</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 space-y-4">
                <p className="text-6xl sm:text-7xl font-bold text-purple-600">3.2</p>
                <p className="text-lg text-gray-900 font-semibold">Clips on average</p>
                <p className="text-sm text-gray-600 leading-relaxed">before the first binge<br />→ Rapid entry into immersion</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 space-y-4">
                <p className="text-6xl sm:text-7xl font-bold text-amber-600">27</p>
                <p className="text-lg text-gray-900 font-semibold">Maximum consecutive clips</p>
                <p className="text-sm text-gray-600 leading-relaxed">Approximately 31 minutes and 30 seconds<br />(Based on average video length of 70 seconds)</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-12 pt-16">
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">Insight</p>
            <div className="space-y-12 max-w-3xl mx-auto">
              <div className="space-y-4">
                <p className="text-2xl sm:text-3xl text-gray-700 font-light leading-relaxed">The experience began with a lightweight clip,</p>
                <p className="text-2xl sm:text-3xl text-gray-900 font-semibold leading-relaxed">then sustained immersion for more than 31 minutes.</p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <p className="text-2xl sm:text-3xl text-gray-700 font-light leading-relaxed">Once users become deeply immersed,<br />they have a reason to return and continue the story.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="w-full min-h-screen flex items-center justify-center py-60 px-6 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-blue-50/20 pointer-events-none" />
        <div className="w-full max-w-5xl mx-auto space-y-48 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center space-y-6">
            <p className="text-sm font-semibold text-blue-500 tracking-widest uppercase">Application</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">Redesigning the Streaming Churn Loop</h2>
            <div className="max-w-3xl mx-auto space-y-4 pt-4">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">Streaming churn is not simply a content problem.<br /><span className="font-semibold text-gray-900">It happens when users are forced to make another decision.</span></p>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">The algorithm targets the two moments where that decision creates friction.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="space-y-12">
            <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">Two Moments When Churn Occurs on OTT</h3>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">1</div>
                    <h4 className="text-xl font-semibold text-gray-900">Before you start watching</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">Choice overload causes users to leave</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">2</div>
                    <h4 className="text-xl font-semibold text-gray-900">Immediately after the content ends</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">The moment to choose again</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-sm font-semibold text-blue-500 tracking-widest uppercase">Applied System</p>
              <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900">The algorithm connects the two moments.</h3>
            </div>

            <div className="md:hidden max-w-sm mx-auto space-y-3">
              {[
                { num: 1, title: 'Entry', desc: 'Selected scene clips create immediate immersion' },
                { num: 2, title: 'Immersion', desc: 'The viewing flow continues automatically' },
                { num: 3, title: 'End', desc: 'A finished story creates a new decision point' },
                { num: 4, title: 'Autostart', desc: 'ShoShort begins the next story without another choice' },
              ].map((node, i) => (
                <motion.div key={node.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow">{node.num}</div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3">
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{node.title}</h4>
                    <p className="text-xs text-gray-600">{node.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div className="text-center pt-2"><p className="text-xs text-blue-500 font-medium">↑ Repeating loop structure</p></div>
            </div>

            <div className="hidden md:flex items-center justify-center w-full min-h-screen px-2 overflow-hidden">
              <svg viewBox="-100 0 1800 1200" className="w-full max-w-full h-auto" preserveAspectRatio="xMidYMid meet">
                <circle cx="800" cy="600" r="320" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                <circle cx="800" cy="600" r="130" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                <text x="800" y="593" textAnchor="middle" fontSize="32" fontWeight="600" fill="#111827">A system that removes</text>
                <text x="800" y="627" textAnchor="middle" fontSize="32" fontWeight="600" fill="#111827">the stopping point</text>
                <circle cx="800" cy="280" r="50" fill="#2563EB" />
                <text x="800" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="36" fontWeight="bold" fill="white">1</text>
                <text x="800" y="100" textAnchor="middle" fontSize="30" fontWeight="700" fill="#111827">Entry</text>
                <text x="800" y="135" textAnchor="middle" fontSize="24" fill="#6b7280">You enter the story immediately without making any choices.</text>
                <text x="800" y="163" textAnchor="middle" fontSize="24" fill="#6b7280">Immersion creates a natural path into the full story.</text>
                <circle cx="1120" cy="600" r="50" fill="#2563EB" />
                <text x="1120" y="600" textAnchor="middle" dominantBaseline="middle" fontSize="36" fontWeight="bold" fill="white">2</text>
                <text x="1250" y="570" textAnchor="start" fontSize="30" fontWeight="700" fill="#111827">Immersion</text>
                <text x="1250" y="605" textAnchor="start" fontSize="24" fill="#6b7280">An active story creates a reason</text>
                <text x="1250" y="635" textAnchor="start" fontSize="24" fill="#6b7280">to return and keep watching</text>
                <circle cx="800" cy="920" r="50" fill="#2563EB" />
                <text x="800" y="920" textAnchor="middle" dominantBaseline="middle" fontSize="36" fontWeight="bold" fill="white">3</text>
                <text x="800" y="1020" textAnchor="middle" fontSize="30" fontWeight="700" fill="#111827">End</text>
                <text x="800" y="1053" textAnchor="middle" fontSize="24" fill="#6b7280">No next story means another decision is required</text>
                <text x="800" y="1083" textAnchor="middle" fontSize="24" fill="#6b7280">(a potential churn point)</text>
                <circle cx="480" cy="600" r="50" fill="#2563EB" />
                <text x="480" y="600" textAnchor="middle" dominantBaseline="middle" fontSize="36" fontWeight="bold" fill="white">4</text>
                <text x="350" y="570" textAnchor="end" fontSize="30" fontWeight="700" fill="#111827">Autostart</text>
                <text x="350" y="605" textAnchor="end" fontSize="24" fill="#6b7280">ShoShort connects the next story without a new decision</text>
                <text x="350" y="635" textAnchor="end" fontSize="24" fill="#6b7280">(remove the stopping point → preserve the loop)</text>
              </svg>
            </div>

            <div className="text-center pt-4">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">Remove the stopping point,<br /><span className="font-semibold text-gray-900">and there are fewer opportunities to leave.</span></p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }} className="space-y-12">
            <div className="text-center space-y-6">
              <p className="text-sm font-semibold text-blue-500 tracking-widest uppercase">Structural Effects</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-blue-600">↓</div>
                <h4 className="text-2xl font-semibold text-gray-900">Lower Churn</h4>
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-green-600">↑</div>
                <h4 className="text-2xl font-semibold text-gray-900">Longer Sessions</h4>
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-purple-600">↑</div>
                <h4 className="text-2xl font-semibold text-gray-900">More Return Visits</h4>
              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center pt-8">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">Streaming already encourages return visits when a story is in progress.<br /><span className="font-semibold text-gray-900">Removing unnecessary stopping points keeps that viewing flow intact.</span></p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 sm:px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      <section className="min-h-[60vh] flex items-center justify-center px-6 sm:px-8 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-transparent to-pink-50/10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto w-full"
        >
          <div className="rounded-3xl border border-gray-200 bg-white p-10 sm:p-14 flex flex-col items-center gap-8 text-center shadow-sm">
            <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">Currently in progress</p>
            <div className="flex items-center gap-4">
              <img
                src="/assets/53024cfba_bootsplash_logo.png"
                alt="Soonshot"
                className="w-16 h-16 rounded-2xl"
              />
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">Soonshot</span>
            </div>
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-light">
              I am now testing this algorithm<br />
              in a live service with <span className="font-semibold text-gray-900">Soonshot.</span>
            </p>
            <div className="h-px w-16 bg-gray-200" />
            <p className="text-lg sm:text-xl text-gray-500 font-light">More results coming soon.</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
