import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import BestSellers from "@/components/BestSellers";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Expertise from "@/components/Expertise";
import Showcase from "@/components/Showcase";
import PeopleSection from "@/components/PeopleSection";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Categories />
        <ProductGrid />
        <BestSellers />
        <Benefits />
        <About />
        <WhyChooseUs />
        <Expertise />
        <Showcase />
        <PeopleSection />
        <Testimonials />
        <Certifications />
        <FAQSection />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
