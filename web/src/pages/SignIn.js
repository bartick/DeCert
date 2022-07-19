import React, { useState } from "react";
import "./resources/firebaseConfig";
import { useMoralis } from "react-moralis";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { loginMetamaskImg, loginGoogleImg } from "./resources";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const { authenticate, user } = useMoralis();
  const [signUp, setSignUp] = useState(false);
  const [businessName, setBusinessName] = useState("");

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  auth.languageCode = "en";

  const onSignInWithGoogleClick = () => {
    async function handelLogin(email) {
      await axios
        .post(
          `${process.env.REACT_APP_api_link}/login`,
          {
            email: email,
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
            setSignUp(true);
          } else {
            navigate("/business", {
              state: res.data,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    async function login() {
      await new Promise((resolve, _reject) => {
        auth.onAuthStateChanged((usr) => {
          if (usr) {
            handelLogin(usr.email);
            resolve("logged in");
          } else {
            resolve("Not Logged in");
          }
        });
      }).then(async (res) => {
        if (res === "Not Logged in") {
          const result = await signInWithPopup(auth, provider);
          const usr = result.user;
          handelLogin(usr.email);
        }
      })
    }
    login();
  };

  const onSignInWithMetaMaskClick = () => {
    async function login() {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function () {
          navigate("/user");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (user === null) {
      login();
    } else {
      navigate("/user");
    }
  };

  const onSignUpGoogle = async () => {
    const body = {}
    await new Promise((resolve, _reject) => {
      auth.onAuthStateChanged((usr) => {
        body["email"] = usr.email;
        body["companyName"] = businessName;
        body["name"] = usr.displayName;
        resolve();
      });
    });
    await axios
        .post(
          `${process.env.REACT_APP_api_link}/signup`,
          body,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_api_key}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
            navigate("/business", {
              state: res.data,
          })
        .catch(err => {
          console.log(err);
        });
        });
  }

  function fixSignUp() {
    return (
      <div className=" text-white p-20 flex justify-center absolute w-[100%] h-[100%] bg-grayrgba">
        <div className=" w-1/2 h-[50vh] bg-slate-900 shadow-2xl p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg">
          <h1 className="text-center text-6xl pb-7">Business Name</h1>
          <input
            type="text"
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-white
        bg-[#1E293B] bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:white focus:bg-[#1E293B] focus:border-blue-600 focus:outline-none
      "
            placeholder="Business name"
            onChange={(e) => {
              setBusinessName(e.target.value)
            }}
          />
          <button className="py-2 px-2 items-center flex-row m-7 rounded-[1.9rem] w-[7rem] bg-gradient-to-br from-blue-800  to-fuchsia-700" onClick={onSignUpGoogle}>
            <span >Submit</span>
          </button>
        </div>
      </div>
    );
  }

  // main return
  return (
    <div className="flex justify-center text-center">
      <div className="container flex text-white justify-around min-h-screen pt-[3rem] pb-[3rem]">
        <div className="pt-[10rem]">
          <h1 className="text-4xl">Are you a Business?</h1>
          <div className="pt-[2.5rem] px-[1.5rem]">
            <button
              className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] w-[15rem] bg-gradient-to-br from-blue-800  to-fuchsia-700"
              onClick={onSignInWithGoogleClick}
            >
              <img
                className="fill-current w-[2rem] mr-2"
                src={loginGoogleImg}
                alt="Google Login"
              />
              <span>Login With Google </span>
            </button>
          </div>
        </div>
        <div className="border-[1px] border-white border-solid"></div>

        <div className="pt-[10rem]">
          <h1 className="text-4xl">Are You a Student?</h1>
          <div className="pt-[2.5rem] px-[1.5rem]">
            <button
              className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] w-[15rem] bg-gradient-to-br from-blue-800  to-fuchsia-700"
              onClick={onSignInWithMetaMaskClick}
            >
              <img
                className="fill-current w-[2rem] mr-2"
                src={loginMetamaskImg}
                alt="Metamask login"
              />
              <span>Login With Metamask</span>
            </button>
          </div>
        </div>
      </div>
      {signUp && fixSignUp()}
    </div>
  );
}

export default SignIn;
