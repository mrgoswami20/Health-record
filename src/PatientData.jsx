import React, { useState } from "react";
import image from "./assets/hospital.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "./Spinner";

const API_URL = 'https://clean-shrug-fox.cyclic.app//api/v1/pdata';

const PatientData = () => {
  const [owner, setOwner] = useState(null);
  const [userData, setUserData] = useState("");
  const [patientData, setPatientData] = useState("");
  const [isOwner, setIsOwner] = useState(true);
  const [walletAddress, setWalletAddress] = useState('');
  const [getWalletAddress, setGetWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function insertDataHandler(){
    if(walletAddress === ''){
        toast.warn("No wallet address found");
        return;
    }

    if(patientData === ''){
        toast.warn("Please enter patient data");
        return;
    }
    setIsLoading(true);

    try{

        const res = await axios.post(API_URL, {
            patientData:patientData,
            walletAddress:walletAddress
        })
        console.log("res: ", res);
        if(res.status === 200){
            toast.success("Data inserted successfully");
            setPatientData("");
            setWalletAddress("");
        }else{
            toast.error("Unable to insert data");   
        }
    }catch(err){
        console.log("Unable to post data");
        toast.error("Unable to insert data");
    }
    setIsLoading(false);
  }

  async function getDataHandler(){
    if(getWalletAddress === ''){
        toast.warn("Please enter wallet address");
        return;
    }
    setIsLoading(true);
    try{
        const res = await axios.get(API_URL, {
            params:{
                walletAddress: getWalletAddress
            }
        })

        if(res.status === 200){
            setUserData(res.data.data[0].patientData);
        }else{
            toast.error("No data found!");
        }
    }catch(err){
        console.log("Error while getting patient data");
        toast.error("Errow while getting patient data");
    }
    setIsLoading(false);
  }

  return (
    <div class="relative h-screen w-screen">
        {
            isLoading && <Spinner/>
        }
      <img
        src={image}
        alt="Background Image"
        class="absolute w-full h-full object-cover bg-repeat"
      />
      <div className="relative z-10 p-4">
        <div class="bg-opacity-80 backdrop-blur-sm bg-white shadow-md rounded-lg px-8 pt-6 pb-8 flex flex-col m-6">
          <h1 class="text-3xl font-bold text-center mb-2">Patient Data</h1>
          <p class="text-md text-gray-500 font-semibold">
            Your Wallet Address: {owner}
          </p>
          {isOwner && <p class="text-sm text-green-500">You are the owner.</p>}
          <div class="mt-4">
            <h2 class="text-2xl font-bold mb-4">Insert Data (Owner Only)</h2>
            <div className="flex items-center mb-4">
              <h2 class="text-md text-gray-500 font-bold mb-4 mr-4">
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
              <h2 class="text-md text-gray-500 font-bold mb-4 mr-4">
                Patient Data:{" "}
              </h2>
              <textarea
                class="w-full bg-gray-300 text-black border border-gray-200 rounded py-3 px-4 mb-3 ml-16"
                type="text"
                value={patientData}
                onChange={(e) => setPatientData(e.target.value)}
              />
            </div>
            {isOwner && (
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={insertDataHandler}
              >
                Insert Data
              </button>
            )}
          </div>
          <div class="mt-4">
            <h2 class="text-2xl font-bold mb-4">Retrieve Your Data</h2>
            <div className="flex items-center mb-4">
              <h2 class="text-md text-gray-500 font-bold mb-4 mr-4">
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
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Data
            </button>
            <p class="text-md text-gray-500 mt-3">Patient Data: {userData}</p>
            {
                userData === '' && 
                (<p className="text-lg font-semibold text-red-600">
                    No data found
                </p>)
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientData;
