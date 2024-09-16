import PopularSpot from "./PopularSpot";
import AboutUsSection from "./AboutUsSection";
import Hero from "./Hero";
import Team from "./Team";
import Review from "./Review";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutUsSection />
      <PopularSpot />
      <Team />
      <Review />
    </div>
  );
};

export default Home;
