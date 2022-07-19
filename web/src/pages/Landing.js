import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DeCertLogo,
  heroImg,
  midImg,
  whatareweImg,
  certImg,
  cer2Img,
  cert3Img,
  githubImg,
  linkdinImg,
  discordImg,
} from "./resources";

function Landing() {
  const navigate = useNavigate()

  const onSignIn = () =>{
    navigate('/signin')
  }
  

  const aboutRef = useRef(null);
  const scrollToElement = () => aboutRef.current.scrollIntoView();

  return (
    <div className="text-white">
      <nav className="relative w-full flex flex-wrap items-center justify-between  bg-[#626262] bg-opacity-60 backdrop-filter backdrop-blur-lg">
        <>
          <img
            className="h-[4rem] pl-12 float-left "
            src={DeCertLogo}
            alt="DeCert logo"
          />
          <div className="flex font-extralight justify-between space-x-10">
            <span onClick={navigate("/")} className="cursor-pointer">Home</span>
            <span onClick={scrollToElement} className="cursor-pointer">About</span>
            <a href="https://github.com/Hackspiration-Team/DeCert/blob/master/api/README.md" target="_blank" rel="noreferrer">
              <span className="cursor-pointer">Docs</span>
            </a>
            
          </div>
          <div className="float-right">
            <button onClick={onSignIn} className="py-2 px-10 shadow-lg inline-flex items-center flex-row m-7 rounded-[1.9rem] bg-gradient-to-br from-blue-800  to-fuchsia-700">
              <span>Sign in </span>
            </button>
          </div>
        </>
      </nav>

      <div className="flex justify-between">
        <img className="p-12 w-[55%]" alt="Hero" src={heroImg} />
        <div className="flex flex-col">
          <span className="text-[10vw] pt-[20vh] pr-[10vw] text-center">
            DeCert
          </span>
          <span className="text-[2vw] text-right pr-[10vw]">
            Decentralized certificate
          </span>
        </div>
      </div>

      <div className="py-52 px-32">
        <img
          className="w-[100%] flex justify-center"
          src={midImg}
          alt="Tech mix of DeCert"
        />
      </div>

      <div>
        <div>
          <span ref={aboutRef} className="text-[5vw] flex justify-center">What are we?</span>
        </div>

        <div className="flex justify-between items-center pl-16 pr-12 pt-20 pb-20">
          <div className=" w-[45vw] ">
            {" "}
            <span>
              {" "}
              {/**text-left */}
              We are a decentralized certification service for the Metaverse.
              All businesses now want to move their products to the Metaverse
              ecosystem over the blockchain, but face the lack of techninal
              know-how and also there is a thousand things to manage to do the
              complete integration.
              <br />
              We are providing a simple and fast API for Ed-Tech companies to
              provide certificates to there users in the metaverse. The
              certificates can minted over both the Ethereum and Polygon
              blockchain using the API without any knowledge or implementation
              of blockchain
            </span>
          </div>
          <img
            className=" float-left w-[40%]"
            src={whatareweImg}
            alt="What are we"
          />
        </div>
      </div>

      <div>
        <div>
          <span className="text-[5vw] pb-20 flex justify-center">Features</span>
        </div>
        <div className="flex justify-between space-x-10 px-14">
          <div className="w-1/2 pb-10 bg-white px-10 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <img
              className="flex justify-center px-24"
              src={certImg}
              alt="ownership"
            />
            <span className=" text-2xl py-4 flex justify-center">
              Certificate ownership in blockchain
            </span>
            <span>
              Get true ownership of your certificate over blockchain network and
              showcase your certificates in the metaverse. The certificates are
              a unique form of ERC-721 NFT, which is non-transferable. We do not
              store the certificates, it is decentralized over the Filecoin
              network.
            </span>
          </div>
          <div className="w-1/2 pb-10 bg-white px-10 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <img
              className="flex justify-center px-24"
              src={cer2Img}
              alt="certificate"
            />
            <span className="text-2xl py-4 flex justify-center">
              Never lose your certificate
            </span>
            <span>
              The certificates are stored in a peer-to-peer decentralized
              network Filecoin, so the certificates will be there with you in
              the metaverse till eternity. The ownership record of the
              certificates are stored over the Ethereum or Polygon blockchain in
              form of a immutable ledger
            </span>
          </div>
        </div>

        <div className="flex justify-center pt-20">
          <div className="w-1/2 pb-10 bg-white px-10 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <img
              className="flex justify-center px-24"
              src={cert3Img}
              alt="certificate"
            />
            <span className="text-2xl py-4 flex justify-center">
              Easy to use API
            </span>
            <span>
              Now you don’t need a team of blockchain developers to move your
              company into the metaverse, we are providing everything in form of
              API, just integrate the API with your product and voila you are
              part of the Metaverse now
            </span>
          </div>
        </div>
      </div>

      <div>
        <span className="text-[5vw] pt-20 pb-20 flex justify-center">
          FAQ's
        </span>
      </div>

      <div className="px-14 py-6">
        <span className="text-3xl">What is DeCert?</span>
        <div className="border-[1px] border-white border-solid"></div>
        <span className="pb-8">
          We are proving a simple fast API to ed-tech businesses to make their
          certificates into NFTs and send to the receiver. We are making the
          NFTs non-transferable so maintain the legitimacy of the certificates
        </span>
      </div>

      <div className=" px-14 py-6">
        <span className="text-3xl">Why should I use it?</span>
        <div className="border-[1px] border-white border-solid"></div>
        <span className="pb-8">
          For businesses there is no hasle of crypto wallet. Get legitimate
          ownership of your certificate over secure blockchain, certificates
          stay for life-time even if our server crashes
        </span>
      </div>

      <div className="px-14 py-6">
        <span className="text-3xl">Where are my Certificates stored?</span>
        <div className="border-[1px] border-white border-solid"></div>
        <span className="pb-8">
          The certificates are stored over a decentralized network - FileCoin.
          The ownership is maintained over etherium or polygon blockchain
        </span>
      </div>

      <div className="px-14 py-6">
        <span className="text-3xl">Can we transfer our Certificates?</span>
        <div className="border-[1px] border-white border-solid"></div>
        <span className="pb-8">
          No, you cannot transfer your certificates, though it follows ERC-721
          token standard
        </span>
      </div>
      <div className="py-6"></div>

      <nav className="relative py-10 w-full flex flex-wrap items-center justify-between  bg-[#626262] bg-opacity-60 backdrop-filter backdrop-blur-lg">
        <>
          <div className="flex pl-12 font-extralight justify-between space-x-10">
            <span className="cursor-pointer">
              Rights Reserved to DeCert © 2022
            </span>
          </div>
          <img
            className="h-[4rem] pl-12 float-left "
            src={DeCertLogo}
            alt="DeCert logo"
          />

          <div className="flex float-right pr-12 justify-between space-x-10">
            <img className="h-[3rem]" src={githubImg} alt="github"/>
            <img className="h-[3rem]" src={linkdinImg} alt="linkdIn"/>
            <img className="h-[3rem]" src={discordImg} alt="discord"/>
          </div>
        </>
      </nav>
    </div>
  );
}

export default Landing;
