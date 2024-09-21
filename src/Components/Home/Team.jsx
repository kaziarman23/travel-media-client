import { useEffect, useState } from "react";
import "./CssSections/Team.css";
const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/Team.json")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((error) => console.log("error in the team section", error));
  }, [team]);

  return (
    <div className="w-full h-auto my-10 bg-BlackBg overflow-hidden">
      <div className="w-4/5 h-full mx-auto">
        <h1 className="font-bold text-2xl text-silver text-center my-5">
          Meet the Dream Team Behind Your Perfect Getaway
        </h1>
        <p className="text-light-silver">
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
        <div className="my-10 flex justify-center iteams-center gap-10">
          {team.map((team) => (
            <div key={team.id}>
              <div className="Teamcard">
                <br />
                <img src={team.img} alt={team.title} />
                <div className="Teamcontent">
                  <p className="Teamtitle">
                    {team.name}
                    <br />
                    <span>{team.post}</span>
                    <br />
                    <span>{team.mail}</span>
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
