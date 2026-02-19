import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import ProjectsSection from './components/ProjectsSection';
import ClientsSection from './components/ClientsSection';
import WhyChooseSection from './components/WhyChooseSection';
// import BlogSection from './components/BlogSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="w-full mx-auto overflow-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <ProjectsSection />
      <ClientsSection />
      <WhyChooseSection />
      {/* <BlogSection /> */}
      <CTASection />
      <Footer />
    </main>
  );
}
