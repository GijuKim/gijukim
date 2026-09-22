import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';

// Lines to stream one at a time, left to right
const LINES = [
  { type: 'header', num: '1', text: 'Designing systems, not just features' },
  { type: 'text', text: 'Most people add features. You redesign the underlying flow of user behavior.', cls: 'text-slate-600 text-sm sm:text-base leading-relaxed ml-11' },
  { type: 'bullet', text: 'ShoShort → Choice overload → Hook → Autoplay → Binge loop' },
  { type: 'bullet', text: 'Dalton Network → Fragmented communication → Unified ecosystem' },
  { type: 'bullet', text: 'NotePal → Recording-first learning → Structured review system' },
  { type: 'text', text: 'That reflects a product mindset focused on the root structure of a problem, not just implementation.', cls: 'text-slate-600 text-sm sm:text-base leading-relaxed ml-11 mb-6' },
  { type: 'header', num: '2', text: 'Turning vision into execution' },
  { type: 'text', text: 'You moved beyond ideas and delivered.', cls: 'text-slate-600 text-sm sm:text-base leading-relaxed ml-11' },
  { type: 'bullet', text: 'Launched a service across five schools for roughly 6,000 users' },
  { type: 'bullet', text: 'Refined requirements through repeated meetings with school leaders and staff' },
  { type: 'bullet', text: 'Built a team and designed the operating model' },
  { type: 'bullet', text: 'Designed KPI-driven experiments' },
  { type: 'text', text: 'You have worked across strategy → development → stakeholder alignment → expansion. That is unusual breadth for an early-career PM.', cls: 'text-slate-600 text-sm sm:text-base leading-relaxed ml-11 mb-6' },
  { type: 'header', num: '3', text: 'Combining data with narrative' },
  { type: 'text', text: "A strong PM does both.", cls: 'text-slate-600 text-sm sm:text-base leading-relaxed ml-11' },
  { type: 'bullet', text: 'Define problems through data and research' },
  { type: 'bullet', text: 'Build hypotheses from behavioral psychology' },
  { type: 'bullet', text: 'Shape a persuasive story' },
  { type: 'text', text: 'You think in numbers and persuade through stories.', cls: 'text-slate-600 text-sm sm:text-base leading-relaxed ml-11' },
  { type: 'text', text: 'That combination is especially valuable in new ventures and platform strategy roles.', cls: 'text-slate-500 text-xs sm:text-sm ml-11 italic mb-6' },
  { type: 'divider' },
  { type: 'text', text: "To summarize,", cls: 'text-slate-900 font-semibold text-sm sm:text-base' },
  { type: 'text', text: 'Your strength is the ability to design behavior systems, validate them through experiments, and carry them through execution.', cls: 'text-slate-600 text-sm sm:text-base leading-relaxed' },
];

const CHAR_SPEED = 8; // ms per character

function TypewriterLine({ text, onDone }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    const chars = [...text];
    let i = 0;
    const id = setInterval(() => {
      if (i < chars.length) {
        setDisplayed(prev => prev + chars[i]);
        i++;
      } else {
        clearInterval(id);
        onDone();
      }
    }, CHAR_SPEED);
    return () => clearInterval(id);
  }, [text]);

  return <>{displayed}</>;
}

function StreamingAnswer() {
  const [currentLine, setCurrentLine] = useState(-1);
  const [completedLines, setCompletedLines] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentLine(0), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLineDone = (idx) => {
    setCompletedLines(prev => [...prev, idx]);
    setCurrentLine(idx + 1);
  };

  const renderLine = (line, idx, isTyping) => {
    const isCompleted = completedLines.includes(idx);
    const content = isTyping
      ? <TypewriterLine text={line.text || ''} onDone={() => handleLineDone(idx)} />
      : (line.text || '');

    if (line.type === 'divider') {
      if (isTyping) { setTimeout(() => handleLineDone(idx), 10); }
      return <div key={idx} className="border-t border-slate-200 my-6" />;
    }

    if (line.type === 'header') {
      return (
        <div key={idx} className="flex items-center gap-3 mb-2 mt-6 first:mt-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm">
            {line.num}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">
            {content}
            {isTyping && <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-700 ml-1 animate-pulse align-middle" />}
          </p>
        </div>
      );
    }

    if (line.type === 'bullet') {
      return (
        <div key={idx} className="flex items-start gap-2 ml-16 mb-1">
          <span className="text-slate-400 mt-1 text-xs flex-shrink-0">•</span>
          <span className="text-slate-700 text-sm sm:text-base">
            {content}
            {isTyping && <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-600 ml-1 animate-pulse align-middle" />}
          </span>
        </div>
      );
    }

    return (
      <p key={idx} className={`block mb-1 ${line.cls || ''}`}>
        {content}
        {isTyping && <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-600 ml-1 animate-pulse align-middle" />}
      </p>
    );
  };

  if (currentLine === -1) {
    return (
      <div className="max-w-3xl mx-auto pt-2 flex items-center">
        <motion.span
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block w-2.5 h-2.5 rounded-full bg-slate-700"
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-2">
      {LINES.map((line, idx) => {
        if (idx > currentLine) return null;
        const isTyping = idx === currentLine;
        return renderLine(line, idx, isTyping);
      })}
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [open, setOpen] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const handleAsk = () => {
    setOpen(true);
    setPlayKey(k => k + 1);
  };

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20">
          <span className="text-xs sm:text-sm font-medium text-blue-500 tracking-wider uppercase">About</span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight px-4">About Me</h2>
          <div className="mt-4 w-12 h-0.5 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16">

          {/* Question box */}
          <div className="w-full text-left bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <img src="/assets/3398c4d44_image.png" alt="ChatGPT" className="w-5 h-5" />
              <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">ChatGPT</span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1">
                <p className="text-slate-700 text-sm sm:text-base md:text-lg font-semibold">
                  Looking at all the content on this site, what are my strengths from a PM perspective?
                </p>
                <AnimatePresence>
                  {!open && (
                    <motion.p
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 text-xs sm:text-sm mt-2">Click the button to see the answer →
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {!open && (
                  <motion.button
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleAsk}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    animate={{ y: [0, -4, 0] }}
                    whileExit={{ opacity: 0, scale: 0 }}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 active:bg-slate-900 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <SendHorizontal size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Answer */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-slate-100 p-6 sm:p-8 md:p-12 mt-3">
                  <StreamingAnswer key={playKey} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
