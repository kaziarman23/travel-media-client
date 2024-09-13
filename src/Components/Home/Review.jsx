import { useEffect, useState } from "react";
import "./CssSections/Review.css";

const Review = () => {
  const [reviews, setRevirews] = useState([]);

  useEffect(() => {
    fetch("/Review.json")
      .then((res) => res.json())
      .then((data) => setRevirews(data))
      .catch((error) =>
        console.log("something went wrong in review section", error)
      );
  }, [setRevirews]);

  return (
    <div className="w-full h-auto overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-4/5 h-full mx-auto">
        <h1 className="text-white font-bold text-2xl text-center my-5">
          What Our Travelers Are Saying
        </h1>
        <p className="text-white">
          At Travel Media, our greatest reward is the satisfaction of our
          customers. We take pride in creating unforgettable travel experiences
          that leave a lasting impact. From breathtaking destinations to
          seamless service, our travelers have experienced it all and they’re
          sharing their stories with you! Don’t just take our word for it; see
          what others have to say about their journeys with us. Real adventures.
          Real memories. Real reviews.
        </p>
        <div className="w-[200px] h-[400px] my-10 flex justify-center items-center gap-5 mx-auto">
          {reviews.map((review) => (
            <div key={review.id}>
              {/* review cards */}
              <div className="ReviewCard">
                <div className="ReviewCard2">
                  {/* cards container */}
                  <p className="mx-5 mt-5 text-light-silver">
                    {review.message}
                  </p>
                  <div className="avatar p-5 flex justify-start items-center gap-2">
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
