import React, { useEffect, useState } from "react";
import {
  exitImg,
  nothingImg,
  ethLogoBlack,
  polygonImgWhite,
} from "./resources";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function User() {

  const { user, logout } = useMoralis();
  const navigate = useNavigate();
  const [btnState, setBtnState] = useState(true);

  const [ethCert, setEthCert] = useState([]);
  const [polyCert, setPolyCert] = useState([]);

  useEffect(() => {
    async function getTotalCert(results) {
      const dataToGet = [];
      const totalData = [];
      results.forEach((result) => {
        result.metadata==null ? dataToGet.push(result.token_uri) : totalData.push(JSON.parse(result.metadata))
      });
      const foundData = await Promise.all(dataToGet.map(element => axios.get(element).then(data => data.data)));
      totalData.push(...foundData);
      return totalData;
    }

    async function getCertificates(userAddress) {
      const [eth, poli] = await Promise.all([
        axios.get(`https://deep-index.moralis.io/api/v2/${userAddress}/nft/${process.env.REACT_APP_rinkeby}?chain=rinkeby&format=decimal`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_moralis_key,
            "Access-Control-Allow-Origin": "*",
          }
        }),
        axios.get(`https://deep-index.moralis.io/api/v2/${userAddress}/nft/${process.env.REACT_APP_mumbai}?chain=mumbai&format=decimal`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_moralis_key,
            "Access-Control-Allow-Origin": "*",
          }
        })
      ]);
      const certData = await Promise.all([
        getTotalCert(eth.data.result),
        getTotalCert(poli.data.result)
      ]);
      setEthCert(certData[0]);
      setPolyCert(certData[1]);
    };
    if(user) {
      getCertificates(user.get('ethAddress'));
    } else {
      navigate('/signin');
    }
  },[navigate, user]);

  const onLogoutClick = async () => {
    await logout();
    navigate("/signin");
  };


  function notPresent() {
    return (
      <div className="flex pt-[5rem] flex-col justify-center items-center text-center">
        <div className="">
          <img className="h-[20rem]" alt="nothing" src={nothingImg} />
          <div className="text-2xl p-3 inline-block text-[#AAA6A6]">
            Nothing Present
          </div>
        </div>
      </div>
    );
  }

  function present(cert) {
    if(cert.length === 0) {
      return notPresent();
    }
    return (
      <div className="grid grid-cols-4 grid-flow-row gap-1">
        {cert.map((item, i) => (
          <div className="pt-[5rem]" key={i}>
            <div className="pb-5 text-center m-5 flex justify-center flex-col">
              <img
                className="h-[12rem]"
                src={"https://gateway.moralisipfs.com/ipfs/" + item.image.substring(7)} 
                alt={item.name}
              />
              <span className="pt-3">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ethDefaultBtn() {
    return (
      <button
        className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] w-[8rem] h-[3rem] bg-gradient-to-br from-blue-800  to-fuchsia-700"
      >
        <img
          className="fill-current w-[1rem] mr-2"
          src={ethLogoBlack}
          alt="Ethereum logo"
        />
        Ethereum
      </button>
    );
  }

  function ethClickedBtn() {
    return (
      <button onClick={() => setBtnState(true)} className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] w-[8rem] h-[3rem] bg-black">
        <img
          className="fill-current w-[1rem] mr-2"
          src={ethLogoBlack}
          alt="Ethereum logo"
        />
        Ethereum
      </button>
    );
  }

  function polyDefaultBtn() {
    return (
      <button className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] w-[8rem] h-[3rem] bg-gradient-to-br from-blue-800  to-fuchsia-700">
        <img
          className="fill-current w-[1rem] mr-2"
          src={polygonImgWhite}
          alt="Polygon logo"
        />
        polygon
      </button>
    );
  }

  function polyClickedBtn(){
    return(
      <button onClick={() => setBtnState(false)} className="py-2 px-4 inline-flex items-center flex-row m-7 rounded-[1.9rem] w-[8rem] h-[3rem] bg-black">
          <img
            className="fill-current w-[1rem] mr-2"
            src={polygonImgWhite}
            alt="Polygon logo"
          />
          polygon
        </button>
    )
  }

  return (
    <div className="text-white pt-[3rem] pl-[3rem]">
      <div className="items-center">
        <h1 className="text-4xl inline tems-start font-bold ">Certificates</h1>

        <div className="container inline">
          <button className="float-right py-2 px-4 inline-flex items-center flex-row m-7" onClick={onLogoutClick}>
            <img
              className="fill-current w-[1.5rem] mr-2"
              src={exitImg}
              alt="exit icon"
            />
            <span>Logout</span>
          </button>
        </div>

        {!btnState ? ethClickedBtn() : ethDefaultBtn()}
        {btnState ? polyClickedBtn() : polyDefaultBtn()}
      </div>

      <div className="container">
        {present(btnState ? ethCert: polyCert)}</div>
    </div>
  );
}

export default User;
