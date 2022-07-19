import React from "react";
import { useNavigate } from "react-router-dom";
import { lostWayBoyImg } from "./resources";

function NotFound() {
  const navigate = useNavigate();
  const handleNavHomepage = () => {
    navigate("/");
  };

  return (
    // flex flex-column min-h-screen justify-center items-center
    <div className="flex text-white flex-col justify-center items-center pt-[5rem] pb-[3rem]">
      <img className="w-[25%]" src={lostWayBoyImg} alt="Page not found" />
      <div className="">Oh boy, looks like you got lost.</div>
      <div className="">let me help you navigate back to the home page</div>
      <button onClick={handleNavHomepage} className="m-7 rounded-[1.9rem] w-[8rem] h-[3rem] bg-gradient-to-br from-blue-800  to-fuchsia-700">
        Homepage
      </button>
    </div>
  );
}

export default NotFound;
