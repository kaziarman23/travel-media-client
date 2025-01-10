import { useEffect, useState } from "react";
import "./CssSections/Review.css";

const Review = () => {
  const [reviews, setRevirews] = useState([]);

  useEffect(() => {
    fetch("https://travel-media-server.vercel.app/review")
      .then((res) => res.json())
      .then((data) => setRevirews(data))
      .catch((error) =>
        console.log("something went wrong in review section", error)
      );
  }, [setRevirews]);

  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] xl:h-screen">
      <div className="w-4/5 h-full mx-auto mb-5">
        <h1 className="text-white font-bold text-base text-left my-5 sm:text-xl md:text-2xl md:text-center lg:text-2xl">
          What Our Travelers Are Saying
        </h1>
        <p className="text-white text-sm lg:text-xl">
          At Travel Media, our greatest reward is the satisfaction of our
          customers. We take pride in creating unforgettable travel experiences
          that leave a lasting impact. From breathtaking destinations to
          seamless service, our travelers have experienced it all and they’re
          sharing their stories with you! Don’t just take our word for it; see
          what others have to say about their journeys with us. Real adventures.
          Real memories. Real reviews.
        </p>
        <div className=" my-10 flex justify-center items-center gap-5 mx-auto flex-col lg:flex-row">
          {reviews.map((review) => (
            <div key={review.id}>
              {/* review cards */}
              <div className="ReviewCard w-full text-sm lg:w-[300px] lg:h-[290px] lg:text-xl lg:relative">
                <div className="ReviewCard2 w-full text-sm lg:w-[300px] lg:text-xl lg:h-[290px] lg:relative">
                  {/* cards container */}
                  <p className="mx-5 mt-5 text-light-silver text-lg">
                    {review.message}
                  </p>
                  <div className="avatar p-5 flex justify-start items-center gap-2 lg:absolute lg:bottom-0 lg:left-0">
                    <div className="w-10 rounded-full">
                      <img src={review.img} alt={review.name} />
                    </div>
                    <p className="text-white">{review.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
