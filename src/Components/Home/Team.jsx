import { useState } from "react";
import "./CssSections/Team.css";
import axios from "axios";

const Team = () => {
  const [team, setTeam] = useState([]);

  axios
    .get("https://travel-media-server.vercel.app/team")
    .then((res) => {
      if (res.data) {
        setTeam(res.data);
      }
    })
    .catch((error) => console.log(error));

  return (
    <div className="w-full h-full my-10 bg-BlackBg overflow-hidden xl:h-screen">
      <div className="w-4/5 h-full mx-auto">
        <h1 className="font-bold text-base text-silver text-left my-5 sm:text-base md:text-center md:text-xl lg:text-2xl">
          Meet the Dream Team Behind Your Perfect Getaway
        </h1>
        <p className="text-light-silver text-sm sm:text-base">
          At Travel Media, we believe that every journey begins with a passion
          for exploration and a team of dedicated professionals who make your
          travel dreams a reality. Our team is a diverse group of seasoned
          travel experts, passionate adventurers, and meticulous planners, all
          united by a single mission to craft unforgettable experiences tailored
          just for you. With years of industry experience, a deep love for
          discovering new destinations, and a commitment to top-notch service,
          we ensure every trip is filled with seamless journeys and lifelong
          memories. Meet the people who turn your wanderlust into reality!
        </p>
        <div className="my-10 flex justify-center iteams-center gap-10 flex-col md:flex-row md:gap-5">
          {team.map((member) => (
            <div key={member.id}>
              <div className="Teamcard mx-auto">
                <br />
                <img src={member.img} alt={member.title} />
                <div className="Teamcontent">
                  <p className="Teamtitle">
                    {member.name}
                    <br />
                    <span>{member.post}</span>
                    <br />
                    <span>{member.mail}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
