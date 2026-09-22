import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useEffect } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

const sections = [
{
  num: '1',
  title: 'Problem Definition',
  content:
  <div className="space-y-6">
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">While I was a student at Cheongna Dalton School, communication was fragmented across several channels.

    </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
      { from: 'Teacher to teacher', to: 'KakaoTalk', icon: '💬', color: 'from-yellow-50 to-yellow-50/30 border-yellow-200' },
      { from: 'Teacher to student', to: 'Email', icon: '📧', color: 'from-blue-50 to-blue-50/30 border-blue-200' },
      { from: 'School to parents', to: 'Website + Kakao Channel', icon: '🏫', color: 'from-green-50 to-green-50/30 border-green-200' },
      { from: 'Sports', to: 'YouTube via Instagram', icon: '🏆', color: 'from-red-50 to-red-50/30 border-red-200' },
      { from: 'School lunch', to: 'Website', icon: '🍱', color: 'from-orange-50 to-orange-50/30 border-orange-200' },
      { from: 'Clubs', to: 'No official promotion or registration system', icon: '🚫', color: 'from-gray-50 to-gray-50/30 border-gray-200' }].
      map((item, i) =>
      <div key={i} className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r border ${item.color}`}>
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{item.from}</span>
                <span className="text-gray-300 flex-shrink-0">→</span>
                <span className="text-sm text-gray-600 truncate">{item.to}</span>
              </div>
            </div>
      )}
        </div>
        <div className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-gray-50 space-y-2">
          <p className="text-base font-medium text-gray-500">The information existed,</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">but there was no unified system to distribute or manage it.</p>
        </div>
      </div>

},
{
  num: '2',
  title: 'Initial Execution: Product Design and Development',
  content:
  <div className="space-y-8">
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          I planned and built the product myself while still in high school.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase">My Role</h4>
            <div className="space-y-2">
              {['Structured the problem and defined features', 'Designed and built the web and mobile apps', 'Designed role-based permissions', 'Implemented read tracking', 'Built live sports scoreboards', 'Built the notification system'].map((item, i) =>
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/60 border border-blue-100">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm text-gray-800">{item}</span>
                </div>
          )}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase">Core Features</h4>
            <div className="space-y-2">
              {['Targeted announcements with read receipts', 'Reminders for people who had not read a notice', 'Live sports operations', 'Club promotion and registration', 'Weekly newsletter', 'FunZone, a game-based engagement feature'].map((item, i) =>
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-purple-50/60 border border-purple-100">
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm text-gray-800">{item}</span>
                </div>
          )}
            </div>
          </div>
        </div>
      </div>

},
{
  num: '3',
  title: 'Launch Strategy: Building a Return Loop',
  content:
  <div className="space-y-8">
        <p className="text-lg sm:text-2xl text-gray-700 font-light leading-relaxed">
          Announcements and news alone were not enough.<br />
          <span className="font-semibold text-gray-900">Users needed a reason to open the app before it became a habit.</span>
        </p>
        <div className="p-6 rounded-2xl border-l-4 border-purple-500 bg-purple-50/40 space-y-2">
          <p className="text-sm font-bold text-purple-600 tracking-widest uppercase">Strategic Insight</p>
          <p className="text-gray-700 leading-relaxed">
            People check information only when they need it. Games can bring them back every day.<br />
            <span className="font-semibold text-gray-900">I designed FunZone, an in-school game competition, as the core return loop.</span>
          </p>
        </div>
        <div className="space-y-3">
          {[
      { label: 'Easy entry', desc: 'Built games such as Tetris directly into the app, with no separate download required' },
      { label: 'Competition', desc: 'Used live school leaderboards to give students a reason to check their rank every day' },
      { label: 'Habit formation', desc: 'Turned game-driven return visits into natural exposure to announcements and news' }].
      map((item, i) =>
      <div key={i} className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-purple-100 hover:shadow-sm transition-all">
              <div>
                <span className="inline-block text-sm font-bold text-purple-600 mb-1">{item.label}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
      )}
        </div>
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 text-center space-y-2">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">Launch Day</p>
          <p className="text-6xl sm:text-7xl font-bold text-purple-600">1,221</p>
          <p className="text-lg text-gray-700 font-medium">FunZone plays — <span className="font-semibold text-gray-900">and the number kept growing.</span></p>
        </div>
      </div>

},
{
  num: '4',
  title: 'Aligning Staff, Parents, and Decision Makers',
  content:
  <div className="space-y-8">
        <p className="text-lg sm:text-2xl text-gray-700 font-light leading-relaxed">
          The hardest part was not building the product.<br />
          <span className="font-semibold text-gray-900">It was getting the school organization to adopt it.</span>
        </p>
        <div className="space-y-3">
          {[
      { action: 'Persuaded', desc: 'Met repeatedly with the principal and administration, using data to make the case for adoption' },
      { action: 'Adapted', desc: 'Changed features when they conflicted with school policy, choosing what worked over protecting my original design' },
      { action: 'Redesigned', desc: 'Rebuilt the permission model for teachers, students, and parents around school requirements' },
      { action: 'Operationalized', desc: 'Built security protocols and emergency announcement workflows into the product' },
      { action: 'Aligned', desc: 'Reconciled conflicting stakeholder needs to create a system everyone could use' }].
      map((item, i) =>
      <div key={i} className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-sm transition-all">
              <div>
                <span className="inline-block text-sm font-bold text-blue-600 mb-1">{item.action}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
      )}
        </div>
        <div className="p-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50/40">
          <p className="text-gray-700 leading-relaxed">
            I did more than build a product.<br />
            <span className="font-semibold text-gray-900">I kept adapting it through discussion and real-world operational feedback.</span>
          </p>
        </div>
      </div>

},
{
  num: '5',
  title: 'Building the Organization: Creating an Operations Team',
  content:
  <div className="space-y-8">
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          After launch, I created and <span className="font-bold text-blue-600">led</span> a dedicated student team to keep the platform running.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase">Operating Model</h4>
            <div className="space-y-2">
              {['Designed a dedicated admin interface', 'Separated content management workflows', 'Standardized the announcement process', 'Defined clear team responsibilities'].map((item, i) =>
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <span className="text-sm text-gray-800">{item}</span>
                </div>
          )}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-500 tracking-widest uppercase">Team Leadership</h4>
            <div className="space-y-2">
              {['Recruited the student operations team', 'Ran regular operations meetings', 'Collected product improvement requests', 'Managed continuous updates'].map((item, i) =>
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-green-50/60 border border-green-100">
                  <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-800">{item}</span>
                </div>
          )}
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 rounded-2xl border border-gray-200 bg-gray-50 space-y-1">
          <p className="text-base font-medium text-gray-500">I did not stop at building the product.</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">I designed the organization that could sustain it.</p>
        </div>
      </div>

},
{
  num: '6',
  title: 'Expansion to International Schools',
  content:
  <div className="space-y-8">
        <p className="text-lg sm:text-2xl text-gray-700 font-light leading-relaxed">
          The platform later expanded to <span className="font-bold text-gray-900">five schools in four countries</span>,<br />
          where I worked with staff and parents at each school.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
      { img: '/assets/e92627af5_OPERATIONDALNET_LOGOS.png', name: 'Dalton Network', location: 'Incheon, South Korea' },
      { img: '/assets/f0c002492_OPERATIONDALNET_LOGOS.png', name: 'BCC Network', location: 'Seoul, South Korea' },
      { img: '/assets/bff0fe4b1_OPERATIONDALNET_LOGOS.png', name: 'ACWolves Network', location: 'New York, USA' },
      { img: '/assets/c3b0d9c45_OPERATIONDALNET_LOGOS.png', name: 'Kaizen Network', location: 'Lahore, Pakistan' },
      { img: '/assets/8aa8b13f5_OPERATIONDALNET_LOGOS.png', name: 'Oruba Network', location: 'Riyadh, Saudi Arabia' }].
      map((school, i) =>
      <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow">
              <img src={school.img} alt={school.name} className="w-full object-cover" />
            </div>
      )}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
      { num: '6,000+', label: 'Users reached' },
      { num: '4,920+', label: 'MAU' },
      { num: '4 countries', label: 'International expansion' }].
      map((stat, i) =>
      <div key={i} className="text-center p-3 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 space-y-1">
              <p className="text-lg sm:text-4xl font-bold text-blue-700">{stat.num}</p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
      )}
        </div>
      </div>

},
{
  num: '7',
  title: 'Product Skills Demonstrated by This Project',
  content:
  <div className="space-y-4">
        {[
    { title: 'End-to-End Ownership', desc: 'Led the full journey from planning → development → launch → operations → expansion' },
    { title: 'Stakeholder Management', desc: 'Aligned principals, teachers, students, parents, and staff at international schools' },
    { title: 'Organization Design', desc: 'Built the team and operating model after launch' },
    { title: 'Execution', desc: 'Built a platform serving more than 6,000 users while in high school' },
    { title: 'Systems Thinking', desc: 'Solved problems through operating systems, not isolated features' }].
    map((item, i) =>
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * i }}
      className="flex gap-5 p-5 rounded-xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm transition-all">

            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{i + 1}</div>
            <div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
    )}
      </div>

}];


export default function DaltonNetwork() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
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

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 pt-20 pb-10 relative overflow-hidden w-full max-w-full">
        <div className="absolute top-32 right-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none translate-x-1/2" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20 pointer-events-none -translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 mb-10">

            <img
              src="/assets/59649dc09_image.png"
              alt="Dalton Network"
              className="h-12 sm:h-16 md:h-20 object-contain" />
            <p className="text-sm text-gray-400 font-light tracking-widest">Project · 2020–2023 · Ages 16–19</p>

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">

            From planning to expansion,<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">I built it and ran it end to end.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-gray-500 font-light max-w-2xl mx-auto">

            Strategy → Development → Launch → Operations → Expansion
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-4 mt-12 w-full max-w-sm mx-auto">

            {[
            { num: '6,000+', label: 'Users' },
            { num: '4,920+', label: 'MAU' },
            { num: '4 countries', label: 'International reach' }].
            map((stat, i) =>
            <div key={i} className="text-center">
                <p className="text-xl sm:text-3xl font-bold text-gray-900 break-words">{stat.num}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-40 space-y-20 sm:space-y-32">
        {sections.map((section, index) =>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8">

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {section.num}
              </div>
              <h2 className="text-xl sm:text-3xl font-semibold text-gray-900">{section.title}</h2>
            </div>
            <div className="pl-0 sm:pl-11 md:pl-14 min-w-0">
              {section.content}
            </div>
            {index < sections.length - 1 &&
          <div className="pl-11 sm:pl-14 pt-8">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>
          }
          </motion.div>
        )}

        {/* Exit Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 pt-12">
          <div className="pl-11 sm:pl-14 pt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">EXIT</h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg sm:text-2xl text-gray-700 font-light leading-relaxed">
              I learned a lot from developing, launching, and managing the entire service.
            </p>
            <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              <p>I initially started this project to strengthen my college application. At the time, I only knew how to code. Building a real service forced me to learn far more, and the work was much harder than I expected.

              </p>
              <p>
                But while creating the Dalton Network, I realized what I really enjoyed doing.
              </p>
              <p>
                Seeing people use the app after launch gave me an energy I had never felt before.
              </p>
              <p>
                From that moment on, I wanted to create something bigger that could impact the world.
              </p>
              <p>
                When ChatGPT launched, that inspiration led me to start my next project.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                to={createPageUrl('NotePal')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-orange-200 bg-white hover:border-orange-600 hover:bg-orange-600 transition-all duration-300">
                <span className="text-sm font-medium text-orange-400 group-hover:text-white transition-colors">Next Project</span>
                <span className="text-sm font-semibold text-orange-600 group-hover:text-white transition-colors">NotePal</span>
                <ArrowRight className="w-4 h-4 text-orange-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>);

}
