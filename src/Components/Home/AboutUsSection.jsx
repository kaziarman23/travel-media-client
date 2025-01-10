import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import AboutOne from "../../assets/HomePageImages/AboutOne.jpg";
import AboutTwo from "../../assets/HomePageImages/AboutTwo.jpg";
import AboutThree from "../../assets/HomePageImages/AboutThree.jpg";
import AboutFour from "../../assets/HomePageImages/AboutFour.jpg";
import AboutFive from "../../assets/HomePageImages/AboutFive.jpg";
import AboutSix from "../../assets/HomePageImages/AboutSix.jpg";
import { Link } from "react-router-dom";
import UseLearnMoreBtn from "../CustomHooks/UseLearnMoreBtn";

const AboutUs = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false, delay: 3000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const imgArray = [
    { id: 1, img: AboutOne },
    { id: 2, img: AboutTwo },
    { id: 3, img: AboutThree },
    { id: 4, img: AboutFour },
    { id: 5, img: AboutFive },
    { id: 6, img: AboutSix },
  ];

  return (
    <div className="w-4/5 h-full mx-auto bg-BlackBg  xl:h-screen">
      <div className="w-full h-full flex items-center justify-center gap-16 flex-col">
        <h1 className="text-2xl text-center font-bold text-white">About us</h1>
        <div className="flex justify-center items-center gap-5 flex-col lg:flex-row">
          <div className="w-full mx-5 lg:w-1/2">
            {/* carousel div */}
            <div className="embla w-full h-full">
              <div className="embla__viewport w-full rounded-xl" ref={emblaRef}>
                <div className="embla__container w-full h-full">
                  {imgArray.map((img) => (
                    <div key={img.id} className="embla__slide">
                      <img
                        src={img.img}
                        alt="carousel images"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-full text-[#9ea4b2] mt-5 flex justify-evenly items-center">
                <button
                  className="embla__prev hover:text-white"
                  onClick={scrollPrev}
                >
                  Prev
                </button>
                <button
                  className="embla__next hover:text-white"
                  onClick={scrollNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="w-full mx-10 text-left flex flex-col justify-center items-start gap-5 text-[#9ea4b2] lg:w-1/2">
            <h1 className="text-base font-bold text-[#9ca3b0] md:text-lg xl:text-2xl">
              Travel Media: Your Gateway to Adventure
            </h1>
            <p>
              At Travel Media, we are passionate explorers, storytellers, and
              digital creators, dedicated to inspiring your next adventure. Our
              platform was founded with one simple goal in mind: to help
              travelers discover the beauty of the world, one destination at a
              time. Whether you&#39;re looking for off-the-beaten-path journeys
              or well-loved landmarks, our mission is to provide insightful and
              engaging content that caters to all types of travelers.
            </p>
            <Link to="/aboutus">
              <UseLearnMoreBtn>More Details</UseLearnMoreBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
