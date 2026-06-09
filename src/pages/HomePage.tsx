import MainLayout from '../layout/MainLayout.module'
import HeroSection from '../sections/HeroSection.module'
import ProblemSection from '../sections/ProblemSection.module'
import TargetUserSection from '../sections/TargetUserSection.module'
import MissionSection from '../sections/MisionSection.module'
import VisionSection from '../sections/VisionSection.module'
import AboutSection from '../sections/about/AboutSection'
import PricingSection from '../sections/PricingSection.module'
import ScopeSection from '../sections/ScopeSection.module'
import Footer from '../sections/FooterSection.module'

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ProblemSection />
      <TargetUserSection />
      <MissionSection />
      <VisionSection />
      <AboutSection />
      <ScopeSection />
      <PricingSection />
      <Footer />
    </MainLayout>
  )
}

export default HomePage
