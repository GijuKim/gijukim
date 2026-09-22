import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: "Product & Strategy",
    skills: ['Product Strategy', 'PRD Writing', 'Roadmap Planning', 'User Research', 'A/B Testing', 'Prioritization', 'Go-to-Market', 'Competitive Analysis'],
  },
  {
    title: "Design & Marketing",
    skills: ['Figma', 'UI/UX Design', 'Prototyping', 'Brand Identity', 'Content Strategy', 'Growth Hacking', 'SEO / ASO', 'Social Media'],
  },
  {
    title: "Development & Data",
    skills: ['React', 'Python', 'SQL', 'REST API', 'AI / LLM', 'Data Analysis', 'No-code Tools'],
  },
  {
    title: "Business & Operations",
    skills: ['Business Modeling', 'Fundraising Basics', 'Financial Planning', 'Agile / Scrum', 'Stakeholder Management', 'Hiring & Team Building'],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs sm:text-sm font-medium text-blue-500 tracking-wider uppercase">
            Skills
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight px-4">
            Skills
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + catIdx * 0.15 }}
            >
              <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-slate-100 p-8 h-full">
                <h3 className="text-base font-semibold text-slate-800 mb-6">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.4 + catIdx * 0.15 + skillIdx * 0.05,
                      }}
                      className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50/80 rounded-xl border border-slate-100 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
