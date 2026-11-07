import { useEffect } from 'react';
import Hero from '../components/Hero'
import About from '../components/About'
import Insights from '../components/Insights'
import PrestigiousClients from '../components/PrestigiousClients'
import Process from '../components/Process'
import Industries from '../components/Industries'
import CompetitiveEdge from '../components/CompetitiveEdge'
import WhyChooseUs from '../components/WhyChooseUs'
import MissionVision from '../components/MissionVision'
import Reviews from '../components/Reviews'

const Home = () => {
  useEffect(() => {
    document.title = "CEGS - Career Expert Global Solution | IT & HR Solutions";
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Insights />
      <PrestigiousClients />
      <Process />
      <Industries />
      <CompetitiveEdge />
      <MissionVision />
      <Reviews />
      <WhyChooseUs />
    </>
  );
};

export default Home;
