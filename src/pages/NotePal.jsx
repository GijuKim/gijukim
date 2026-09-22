import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useEffect, useState } from 'react';
import PMFlowSection from '../components/notepal/PMFlowSection';
import PostMortemSection from '../components/notepal/PostMortemSection';

function Divider() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}

function CollapsibleOrigin() {
  const [open, setOpen] = useState(false);

  const story = [
    "I took an AP Physics class in high school.",
    'I recorded every lecture.',
    'I always told myself,',
    '“I can listen to it again later.”',
    "But I rarely actually listened to the recording again.",
    'Replaying an hour-long lecture felt overwhelming,',
    'and it was hard to find the important parts.',
    'The recordings piled up, but I never reviewed them.',
    '',
    'One afternoon, I learned that I had an exam the next day.',
    "Only then did I try to listen to the recording again, but I was already running out of time.",
    'I ended up asking a classmate for help.',
    '',
    'He shared his notes,',
    'organized the key concepts,',
    'answered my questions until I understood,',
    'and worked through practice problems with me.',
    '',
    "I took the test the next day.",
    "Only two people received perfect scores.",
    'My classmate and me.',
    '',
    "At that moment, I realized.",
    "I was always recording,",
    'What I really needed was not another “file,”',
    'but something that could organize, explain, and check my understanding.',
    '',
    'That insight became NotePal.',
  ];

  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between group text-left"
        >
          <div>
            <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-1">Origin Story</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Why I Built It</h2>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-orange-500" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-3 border-l-2 border-orange-100 pl-6">
                {story.map((line, i) =>
                  line === '' ? (
                    <div key={i} className="h-2" />
                  ) : (
                    <p
                      key={i}
                      className={`text-gray-700 leading-relaxed ${
                        line.startsWith('"') ? 'text-orange-600 font-medium italic' : ''
                      } ${
                        ["Why do we write things down and not review them?", "Why does learning stop at storage?"].includes(line)
                          ? 'font-semibold text-gray-900 text-lg'
                          : 'text-sm sm:text-base'
                      }`}
                    >
                      {line}
                    </p>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function NotePal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <Link
            to={createPageUrl('Home')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2} />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 pt-20 relative overflow-hidden">
        <div className="absolute top-32 -right-40 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 mb-10"
          >
            <img
              src="/assets/d70d37aff_logo_with_words.png"
              alt="NotePal"
              className="h-12 sm:h-16 md:h-20 object-contain"
            />
            <p className="text-sm text-gray-400 font-light tracking-widest">Project · 2022–2023</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-[1.15] mb-6"
          >
            Turn every lecture into<br />
            <span className="text-orange-500">notes you can learn from.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-gray-500 font-light"
          >
            Record → Transcribe → Organize → Ask → Quiz
          </motion.p>
        </div>
      </section>

      <Divider />
      <CollapsibleOrigin />
      <Divider />
      <PMFlowSection />
      <Divider />
      <PostMortemSection />
    </div>
  );
}
