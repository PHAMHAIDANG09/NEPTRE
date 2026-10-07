import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import GiftBox from './components/GiftBox';
import ProductSection from './components/ProductSection';
import Sustainability from './components/Sustainability';
import Team from './components/Team';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-ivory-50 text-brand-900 font-body selection:bg-brand-200 selection:text-brand-900 relative">
        <Navbar />
        <main>
          <Hero />
          <BrandStory />
          <GiftBox />
          <ProductSection />
          <Sustainability />
          <Team />
          <ContactCTA />
        </main>
        <Footer />
        <AudioPlayer />
      </div>
    </LanguageProvider>
  );
}
