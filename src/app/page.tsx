import { HeroSection } from '@/components/home/HeroSection';
import { RecentPilots } from '@/components/home/RecentPilots';
import { ThemeNavigation } from '@/components/home/ThemeNavigation';
import { RegionalStats } from '@/components/home/RegionalStats';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecentPilots />
      <ThemeNavigation />
      <RegionalStats />
    </>
  );
}
