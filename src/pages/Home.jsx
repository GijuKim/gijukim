import ThreeBackground from '../components/portfolio/ThreeBackground';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import JourneySection from '../components/portfolio/JourneySection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      <ThreeBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <JourneySection />
      <ContactSection />
      <Footer />
    </div>
  );
}