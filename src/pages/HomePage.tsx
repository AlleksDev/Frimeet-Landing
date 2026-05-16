import MainLayout from '../layout/MainLayout.module'
import HeroSection from '../sections/HeroSection.module'
import AboutSection from '../sections/AboutSection.module'
import MissionSection from '../sections/MisionSection.module'
import VisionSection from '../sections/VisionSection.module'
import BusinessSection from '../sections/BusinessSection.module'
import Footer from '../sections/FooterSection.module'

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <VisionSection />
      <BusinessSection />
      <Footer />
    </MainLayout>
  )
}

export default HomePage
