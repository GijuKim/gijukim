import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const projects = [
  {
    title: 'Dalton Network',
    year: '2020',
    description:
      'Redesigned school communication and built the team to run it. More than 6,000 users across four countries.',
    tags: ['Platform', 'Stakeholder Mgmt', 'Org Design'],
    image: '/assets/59649dc09_image.png',
    link: 'DaltonNetwork',
    imageBg: true,
  },
  {
    title: 'NotePal',
    year: '2023',
    description:
      'Turns recorded lectures into structured notes, an AI tutor, and personalized quizzes.',
    tags: ['AI', 'EdTech', 'Product Design'],
    image: '/assets/d70d37aff_logo_with_words.png',
    link: 'NotePal',
    imageBg: true,
  },
  {
    title: 'ShoShort',
    year: '2025',
    description:
      'An algorithm designed to solve the “so much to watch, nothing to choose” problem in streaming.',
    tags: ['Product Design', 'Algorithm', 'UX'],
    image: '/assets/8bb6bbb48_2.JPG',
    link: 'ShowShort',
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs sm:text-sm font-medium text-blue-500 tracking-wider uppercase">
            Projects
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight px-4">
            Featured Projects
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const ProjectWrapper = project.link ? Link : 'div';
            const wrapperProps = project.link ? { to: createPageUrl(project.link) } : {};
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                className="group"
              >
                <ProjectWrapper {...wrapperProps} className={project.link ? 'block' : ''}>
                  <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-slate-100 overflow-hidden hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-500 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-48 group-hover:scale-105 transition-transform duration-700 ${project.imageBg ? `object-contain px-6 ${project.title === 'ShoShort' ? 'py-20' : 'py-10'}` : 'object-cover'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-5 sm:p-6">
                   <div className="flex items-center justify-between mb-2">
                     <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                       {project.title}
                     </h3>
                     <span className="text-xs font-medium text-slate-400">{project.year}</span>
                   </div>
                   <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                     {project.description}
                   </p>
                </div>
              </div>
            </ProjectWrapper>
          </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
