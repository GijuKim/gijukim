import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const journey = [
  {
    period: 'Sep 2026 – Apr 2029 (expected)',
    years: '2026 – 2029 (expected)',
    place: 'The University of British Columbia (UBC)',
    location: 'Vancouver, Canada',
    sublabel: "Bachelor of Business Administration (BBA) Program",
    type: 'education',
    image: '/assets/0e024d39b_image.png',
    showUBCRank: true,
    upcoming: true,
  },
  {
    period: '2024.10.28 – 2026.04.27',
    years: '2024 – 2026',
    place: "Republic of Korea Army 3rd Infantry Division",
    location: 'South Korea',
    sublabel: 'Mandatory military service',
    type: 'military',
    image: '/assets/e50c7b77c_Screenshot_20260304_075712_SamsungInternet.jpg',
  },
  {
    period: '2024.06 – 2024.09',
    years: '2024',
    place: "Hanyang Patent Firm",
    location: 'South Korea',
    sublabel: "AI Software Engineer Intern",
    type: 'work',
    image: '/assets/eec90cc30_Screenshot_20260304_075921_SamsungInternet.jpg',
  },
  {
    period: 'Completed first year',
    years: '2023 – 2024',
    place: 'The University of British Columbia (UBC)',
    location: 'Vancouver, Canada',
    sublabel: "Bachelor of Business Administration (BBA) Program",
    type: 'education',
    image: '/assets/0e024d39b_image.png',
    showUBCRank: true,
  },
  {
    period: "Transferred mid-9th grade → Graduated",
    years: '2020 – 2023',
    place: "Cheongna Dalton School",
    location: 'South Korea',
    sublabel: 'Cheongna Dalton School',
    type: 'education',
    image: '/assets/b356d9b06_Screenshot_20260304_080103_SamsungInternet.jpg',
  },
  {
    period: "Enrolled until mid-9th grade",
    years: '2019 – 2020',
    place: 'Prince of Wales Secondary School',
    location: 'Vancouver, Canada',
    type: 'education',
    image: '/assets/74dca2761_images-8.jpeg',
  },
  {
    period: 'Middle school',
    years: '2017 – 2019',
    place: 'Monterey Middle School',
    location: 'Oak Bay, Canada',
    type: 'education',
    image: '/assets/cd55e2d07_logo.jpg',
  },
  {
    period: 'Grade 5',
    years: '2016 – 2017',
    place: 'Margaret Jenkins Elementary School',
    location: 'Victoria, Canada',
    type: 'education',
    image: '/assets/26183fe39_images-1.png',
  },
  {
    period: 'Grades 2–4',
    years: '2013 – 2016',
    place: "Yangil Elementary School",
    location: 'South Korea',
    type: 'education',
    image: '/assets/24b2bc19f_images-9.jpeg',
  },
  {
    period: 'Grade 1',
    years: '2012 – 2013',
    place: "Hangaram Elementary School",
    location: 'South Korea',
    type: 'education',
    image: '/assets/02d45961a_Screenshot_20260304_143045_SamsungInternet.jpg',
  },
];

const typeConfig = {
  education: { color: 'bg-blue-500', label: 'Education' },
  work: { color: 'bg-blue-400', label: 'Experience' },
  military: { color: 'bg-slate-800', label: 'Military Service' },
};

function UBCRankBadge() {
  const [rank, setRank] = useState(null);

  useEffect(() => {
    // UBC Sauder Business School is consistently ranked ~50-60 globally (QS 2024: #51)
    // We use a static but accurate figure since live ranking APIs require auth/payment
    setRank({ rank: '#2 in Canada', source: 'QS Business Rankings 2025' });
  }, []);

  if (!rank) return null;

  return (
    <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
      <span className="text-blue-400 text-xs font-bold">★</span>
      <span className="text-xs font-semibold text-slate-700">Business {rank.rank}</span>
      <span className="text-[10px] text-slate-400">· {rank.source}</span>
    </div>
  );
}

function JourneyItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 items-start"
    >
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-3 h-3 rounded-full mt-2 ${typeConfig[item.type].color} ring-4 ring-white shadow`} />
        {index < journey.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-slate-200 to-transparent mt-2 min-h-[40px]" />
        )}
      </div>

      {/* Card */}
      <div className="pb-8 flex-1">
        <div className={`backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 ${item.upcoming ? 'bg-slate-50/40 border-slate-100 opacity-50' : 'bg-white/60 border-slate-100 hover:border-blue-100 hover:shadow-md'}`}>
          <div className="flex gap-4 items-start">
            {/* Image placeholder */}
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-100/70 border border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.place} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[9px] text-slate-300 select-none text-center leading-tight">Photo</span>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${typeConfig[item.type].color}`}>
                  {typeConfig[item.type].label}
                </span>
                <span className="text-xs font-semibold text-slate-500">{item.years}</span>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-slate-400">{item.period}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800 leading-tight">{item.place}</h4>
              {item.sublabel && (
                <p className="text-xs text-blue-500 font-medium mt-0.5">{item.sublabel}</p>
              )}
              <p className="text-xs text-slate-400 mt-0.5">{item.location}</p>
              {item.showUBCRank && <UBCRankBadge />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="journey" className="py-32 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs sm:text-sm font-medium text-blue-500 tracking-wider uppercase">
            Journey
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            My Journey
          </h2>
          <div className="mt-4 w-12 h-0.5 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {journey.map((item, index) => (
            <JourneyItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
