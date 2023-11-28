import React, { useState, useEffect } from "react";
import image from "./assets/hospital.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "./Spinner";
// import {ethers} from "ethers";

const API_URL = "https://clean-shrug-fox.cyclic.app//api/v1/pdata";

const PatientData = () => {
  // const [account, setAccount] = useState("");
  // const [ethWallet, setEthWallet] = useState(undefined);
  const [userData, setUserData] = useState(null);
  const [patientData, setPatientData] = useState("");
  const [isOwner, setIsOwner] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [getWalletAddress, setGetWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  //local addre.

  const [data, setdata] = useState({
    address: "",
  });

  const btnhandler = async () => {
    // Asking if metamask is already present or not
    try {
      if (window.ethereum) {
        // res[0] for fetching a first wallet
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]))
          .catch((e) => {
            console.log("error while fetching data ", e);
          });
      } else {
        toast.warn("install Metamask");
      }
    } catch (err) {
      console.log("Error while requesting account ".err);
    }
  };

  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
    console.log(account);
  };

  // const getATMContract = () => {
  //   const provider = new ethers.providers.Web3Provider(ethWallet);
  //   const signer = provider.getSigner();
  //   const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
  // }

  async function insertDataHandler() {
    if (walletAddress === "") {
      toast.warn("No wallet address found");
      return;
    }

    if (patientData === "") {
      toast.warn("Please enter patient data");
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post(API_URL, {
        patientData: patientData,
        walletAddress: walletAddress,
      });
      console.log("res: ", res);
      if (res.status === 200) {
        toast.success("Data inserted successfully");
        setPatientData("");
        setWalletAddress("");
      } else {
        toast.error("Unable to insert data");
      }
    } catch (err) {
      console.log("Unable to post data");
      toast.error("Unable to insert data");
    }
    setIsLoading(false);
  }

  async function getDataHandler() {
    if (getWalletAddress === "") {
      toast.warn("Please enter wallet address");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL, {
        params: {
          walletAddress: getWalletAddress,
        },
      });

      if (res.status === 200) {
        if (res.data && res.data.data && res.data.data.length) {
          setUserData(res.data.data[0]);
        } else {
          toast.warn("No data found!");
          setUserData(null);
        }
      } else {
        toast.warn("No data found!");
        setUserData(null);
      }
    } catch (err) {
      setUserData(null);
      console.log("Error while getting patient data");
      toast.error("Errow while getting patient data");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    btnhandler();
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {isLoading && <Spinner />}
      <img
        src={image}
        alt="Background Image"
        className="absolute w-full h-full object-cover bg-repeat"
      />
      <div className="relative z-10 p-4">
        <div className="bg-opacity-80 backdrop-blur-sm bg-white shadow-md rounded-lg px-8 pt-6 pb-8 flex flex-col m-6">
          <h1 className="text-3xl font-bold text-center mb-2">Patient Data</h1>
          <p className="text-md text-gray-500 font-semibold">
            Your Wallet Address: {data.address}
          </p>
          {isOwner && (
            <p className="text-sm text-green-500">You are the owner.</p>
          )}
          <button
            className={`w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
            ${data.address != "" ? "disabled:opacity-70" : ""}
          `}
            disabled={true}
            onClick={btnhandler}
          >
            {data.address === "" ? "Connect Wallet" : "Connected"}
          </button>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">
              Insert Data (Owner Only)
            </h2>
            <div className="flex items-center mb-4">
              <h2 className="text-md text-gray-500 font-bold mb-4 mr-4">
                Patient Wallet Address:{" "}
              </h2>
              <input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                type="text"
                className="w-full bg-gray-300 text-black border border-gray-200 rounded py-3 px-4 "
              />
            </div>
            <div className="flex items-center">
              <h2 className="text-md text-gray-500 font-bold mb-4 mr-4">
                Patient Data:{" "}
              </h2>
              <textarea
                className="w-full bg-gray-300 text-black border border-gray-200 rounded py-3 px-4 mb-3 ml-16"
                type="text"
                value={patientData}
                onChange={(e) => setPatientData(e.target.value)}
              />
            </div>
            {isOwner && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={insertDataHandler}
              >
                Insert Data
              </button>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Retrieve Your Data</h2>
            <div className="flex items-center mb-4">
              <h2 className="text-md text-gray-500 font-bold mb-4 mr-4">
                Patient Wallet Address:{" "}
              </h2>
              <input
                value={getWalletAddress}
                onChange={(e) => setGetWalletAddress(e.target.value)}
                type="text"
                className="w-full bg-gray-300 text-black border border-gray-200 rounded py-3 px-4 "
              />
            </div>
            <button
              onClick={getDataHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Data
            </button>
            {userData && (
              <p className="text-md text-gray-500 mt-3">
                <p>
                  Patient Data: {userData?.patientData && userData.patientData}
                </p>
                <p>
                  Created at:{" "}
                  {userData?.createdAt &&
                    new Date(userData.createdAt).toString().slice(4)}
                </p>
              </p>
            )}
            {/* {!userData && (
              <p className="text-lg font-semibold text-red-600">
                No data found
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientData;
