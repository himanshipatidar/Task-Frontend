import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import Newsletter from "../components/Newsletter";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Clients />
      <Newsletter />
    </>
  );
}
