import AboutOne from "../../assets/HomePageImages/AboutOne.jpg";
import AboutTwo from "../../assets/HomePageImages/AboutTwo.jpg";
import AboutThree from "../../assets/HomePageImages/AboutThree.jpg";
import AboutFour from "../../assets/HomePageImages/AboutFour.jpg";
import AboutFive from "../../assets/HomePageImages/AboutFive.jpg";
import AboutSix from "../../assets/HomePageImages/AboutSix.jpg";
import UseBackBtn from "../CustomHooks/UseBackBtn";

const AboutUs = () => {
  return (
    <div className="w-full h-auto flex justify-center items-center bg-BlackBg">
      <div className="w-4/5 h-full mx-auto">
        <h1 className="text-xl font-bold text-left my-10 text-silver sm:text-center sm:text-2xl lg:text-4xl lg:text-center">
          What We Do ?
        </h1>
        <p className="text-light-silver text-sm sm:text-xl">
          Travel Media provides services to help individuals and groups plan and
          arrange travel experiences. Our main role is to simplify the travel
          planning process and offer expertise on destinations, transportation,
          accommodations, and activities. Here are the key services typically we
          provide:
        </p>
        <div className="wrapper my-10 gap-20 flex flex-col justify-center items-center">
          {/* First Row */}
          <div className="row-Wrapper flex justify-center items-center flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img
                src={AboutOne}
                alt="about us pic one"
                className="w-full h-full object-cover mx-auto rounded-xl lg:w-1/2"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-silver text-xl text-left font-bold my-3 lg:text-center">
                Travel Planning and Booking
              </h1>
              <div className="flex gap-3 flex-col justify-start items-start">
                <p>
                  <span className="font-bold">Flight Tickets:</span> Booking
                  flights for domestic and international travel.
                </p>
                <p>
                  <span className="font-bold">Accommodation:</span> Arranging
                  hotel, resort, or other lodging options based on client
                  preferences.
                </p>
                <p>
                  <span className="font-bold">Transportation:</span>{" "}
                  Coordinating ground transportation. (car rentals, transfers,
                  etc.)
                </p>
                <p>
                  <span className="font-bold">Vacation Packages:</span>
                  Offering pre-arranged packages that include flights,
                  accommodations, meals, and activities.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="row-Wrapper flex justify-between items-center flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h1 className="text-silver text-xl text-left font-bold my-3 lg:text-center">
                Travel Advice and Expertise
              </h1>
              <div className="flex gap-3 flex-col justify-start items-start">
                <p>
                  <span className="font-bold">Destination Guidance:</span>
                  Providing information about various destinations, including
                  climate, culture, attractions, and travel tips.
                </p>
                <p>
                  <span className="font-bold">
                    Visa and Passport Assistance:
                  </span>
                  Advising clients on necessary documentation for international
                  travel.
                </p>
                <p>
                  <span className="font-bold">Travel Insurance:</span>
                  Offering and arranging travel insurance to cover trip
                  cancellations, medical emergencies, and other unforeseen
                  events.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src={AboutTwo}
                alt="about us pic two"
                // className="w-1/2 h-full object-cover mx-auto rounded-xl"
                className="w-full h-full object-cover mx-auto rounded-xl lg:w-1/2"
              />
            </div>
          </div>

          {/* 3ed Row */}
          <div className="row-Wrapper flex justify-between items-center flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img
                src={AboutThree}
                alt="about us pic three"
                className="w-full h-full object-cover mx-auto rounded-xl lg:w-1/2"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-silver text-xl text-left font-bold my-3 lg:text-center">
                Custom Itineraries
              </h1>
              <div className="flex gap-3 flex-col justify-start items-start">
                <p>
                  <span className="font-bold">Preplans:</span> We can design
                  tailor-made travel plans, ensuring that a trip matches the
                  traveler preferences, budget, and interests.
                </p>
              </div>
            </div>
          </div>

          {/* 4th Row */}
          <div className="row-Wrapper flex justify-between items-center flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h1 className="text-silver text-xl text-left font-bold my-3 lg:text-center">
                Specialized Travel Services
              </h1>
              <div className="flex gap-3 flex-col justify-start items-start">
                <p>
                  <span className="font-bold">Corporate Travel:</span>
                  Managing business travel arrangements, such as conferences or
                  meetings.
                </p>
                <p>
                  <span className="font-bold">Group Travel:</span>
                  Organizing trips for large groups.(school tours, family
                  reunions, etc.)
                </p>
                <p>
                  <span className="font-bold">
                    Luxury and Adventure Travel:
                  </span>
                  Planning high-end or adventure-focused trips.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src={AboutFour}
                alt="about us pic four"
                className="w-full h-full object-cover mx-auto rounded-xl lg:w-1/2"
              />
            </div>
          </div>

          {/* 5th Row */}
          <div className="row-Wrapper flex justify-between items-center flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <img
                src={AboutFive}
                alt="about us pic five"
                className="w-full h-full object-cover mx-auto rounded-xl lg:w-1/2"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-silver text-xl text-left font-bold my-3 lg:text-center">
                Crisis Management
              </h1>
              <div className="flex gap-3 flex-col justify-start items-start">
                <p>
                  <span className="font-bold">Support during emergencies:</span>{" "}
                  Offering assistance in case of travel disruptions. (flight
                  cancellations, delays, or other issues)
                </p>
                <p>
                  <span className="font-bold">24/7 Support:</span> Providing
                  support and troubleshooting during the travel experience.
                </p>
              </div>
            </div>
          </div>

          {/* 6th Row */}
          <div className="row-Wrapper flex justify-between items-center flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h1 className="text-silver text-xl text-left font-bold my-3 lg:text-center">
                Discounts and Deals
              </h1>
              <div className="flex gap-3 flex-col justify-start items-start">
                <p>
                  <span className="font-bold">Best Deals:</span>
                  We often have access to exclusive deals and discounts that
                  might not be available directly to travelers. We can negotiate
                  behalf on you for better rates for hotels, tours, or flights.
                </p>
                <p>
                  <span className="font-bold">Group Travel:</span>
                  Overall, we act as a one-stop-shop for travel planning,
                  offering convenience, time savings, and expert guidance to
                  travelers.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src={AboutSix}
                alt="about us pic six"
                className="w-full h-full object-cover mx-auto rounded-xl lg:w-1/2"
              />
            </div>
          </div>
        </div>
        <UseBackBtn>Go Back</UseBackBtn>
      </div>
    </div>
  );
};

export default AboutUs;
