import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-32 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs sm:text-sm font-medium text-blue-500 tracking-wider uppercase">
            Contact
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight px-4">
            Get in Touch
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-slate-100 p-6 sm:p-8 md:p-12">
            <p className="text-center text-slate-500 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 px-2">
              Have a question or want to work together? Feel free to reach out.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Mail size={18} className="text-blue-500" />
                </div>
                <span className="text-sm">gijukim5@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Phone size={18} className="text-blue-500" />
                </div>
                <span className="text-sm">010-5573-9769</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
