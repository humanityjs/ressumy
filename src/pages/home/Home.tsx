
import FAQ from './components/FAQ';
import Features from './components/Features';
import FinalCTA from './components/FinalCTA';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import Templates from './components/Templates';

function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <Hero />
      <Features />
      <Templates />
      <HowItWorks />
      <SocialProof />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

export default Home;
