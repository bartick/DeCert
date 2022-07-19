import React, { useState, useEffect } from "react";
import { userDefaultImg } from "./resources";
import { exitImg, copyImg, dashboardBG } from "./resources";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function Business() {
  const navigate = useNavigate();
  const [mintedCertificates, setMintedCertificates] = useState([]);
  const { state } = useLocation();
  const [user, setUser] = useState(state);
  const [copyToClipBoard, setCopyToClipBoard] = useState("Copy API key");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if(state===null) {
      findUser();
    } else {
      setUser(state);
      setApiKey(state._id);
    }
    async function fixLoginData(email){
      await axios.post(`${process.env.REACT_APP_api_link}/login`, {
        "email": email
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_api_key}`,
          "Access-Control-Allow-Origin": "*"
      }}).then(res => {
        if(res.data===null) {
          navigate('/signin');
        } else {
          setUser(res.data);
          setApiKey(res.data._id);
        }
      });
    }
    async function findUser() {
      const auth = getAuth();
      auth.languageCode = "en";
      await new Promise(() => {
        auth.onAuthStateChanged(async (usr) => {
          if (user) {
            await fixLoginData(usr.email);
            return;
          } else {
            navigate("/signin");
          }
        });
      });
    }
    async function handelUser() {
      await axios
        .post(
          `${process.env.REACT_APP_api_link}/minted`,
          {
            email: user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_api_key}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          if (res.data === null) {
            console.log("User not found");
          } else {
            setMintedCertificates(res.data.mintedCertificates);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    handelUser();
  }, [state, navigate, user]);


  async function handelLogout(){
    const auth = getAuth();
    auth.languageCode = "en";
    await auth.signOut();
    navigate("/signin");
  };

  async function onCopyAPIKey1Click(){
    navigator.clipboard.writeText(apiKey);
    setCopyToClipBoard("Copied!");
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCopyToClipBoard("Copy API key");
  }

  function showData() {
    return (
      <>
        {mintedCertificates.map((items, i) => (
            <div className="flex justify-between" key={i}>
              <div className="flex justify-start  py-3 w-[20%]">
                {items.name}
              </div>
              <div className="py-3">
                {items.email}
              </div>
              <div className="py-3">
                {items.address}
              </div>
              
              <div className="py-3">
                {items.date}
              </div>
            </div>
        ))}
      </>
    );
  }

  return (
    <div className="text-white pt-[3rem] pl-[1rem] pr-[1rem]">
      <div className="flex justify-between space-x-10">
        <div className="felx flex-row justify-center float-left ">
          <img
            className="h-[3rem] pl-5"
            src={userDefaultImg}
            alt="user profile"
          />
          <button className="py-2 px-4 inline-flex items-center flex-row pt-4" onClick={handelLogout}>
            <img
              className="fill-current w-[1rem] mr-2"
              src={exitImg}
              alt="exit icon"
            />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex flex-row items-center">
          <div className="text-3xl flex flex-col">
            <span>Welcome </span>
            <span>{user.companyName}</span>
          </div>
          <img
            className="h-[15rem] pl-5"
            src={dashboardBG}
            alt="business img"
          />
        </div>

        <div className="float-right">
          <button className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] bg-gradient-to-br from-blue-800  to-fuchsia-700" onClick={onCopyAPIKey1Click}>
            <img className="fill-current w-[1rem] mr-2" src={copyImg} alt="Copy API Key" />
            <span>{copyToClipBoard}</span>
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between space-x-10 px-16 pt-16 pb-2 text-xl">
          <span>Name</span>
          <span>Email</span>
          <span>Address</span>
          <span>Date</span>
        </div>
        <div className="border-[1px] border-white border-solid"></div>

        <div className="scroll-smooth hover:scroll-auto px-16 pt-16 pb-2">
          {showData()}
        </div>
        
      </div>
    </div>
  );
}

export default Business;
