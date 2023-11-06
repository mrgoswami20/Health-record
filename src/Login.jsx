// import React, { useState,Component } from "react";
// import image from "./assets/hospital.jpg";
// import { BrowserRouter, Route, Link } from "react-router-dom";

// export class Login extends Component {
//   render() {
//     const [account, setAccount] = useState(undefined);
//     const [ethWallet, setEthWallet] = useState(undefined);

//     const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  //local addre.
//     const atmABI = atm_abi.abi;

//     const getATMContract = () => {
//       const provider = new ethers.providers.Web3Provider(ethWallet);
//       const signer = provider.getSigner();
//       const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
  
//       setATM(atmContract);
//     }

//     const connectAccount = async() => {
//       if (!ethWallet) {
//         alert('MetaMask wallet is required to connect');
//         return;
//       }
    
//       const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
//       handleAccount(accounts);
      
//       // once wallet is set we can get a reference to our deployed contract
//       getATMContract();
//     };

//     const getWallet = async() => {
//       if (window.ethereum) {
//         setEthWallet(window.ethereum);
//         window.ethereum.on("accountsChanged", (accounts) => {
//           handleAccount(accounts);
//         });
//       }
  
//       if (ethWallet) {
//         const accounts = await ethWallet.request({method: "eth_accounts"});
//         handleAccount(accounts);
//       }
//     }

//     return (
//       <div class="relative h-screen w-screen">
//         <img
//           src={image}
//           alt="Background Image"
//           class="absolute w-full h-full object-cover bg-repeat"
//         />
//         <div className="relative z-10 p-4">
//           <div class="bg-opacity-80 backdrop-blur-sm bg-white shadow-md rounded-lg px-8 pt-6 pb-8 flex flex-col items-center m-6">
//             <h1 class="text-3xl font-bold text-center mb-2">Welcome to</h1>
//             <h1 class="text-3xl font-semibold text-center mb-2 text-[#CE3254]">
//               Medisecure
//             </h1>
//             <h1 class="text-2xl font-semibold text-center mb-2 text-gray-600">
//               To continue connect your wallet
//             </h1>
//             <button class="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={connectAccount}>
//               <Link to="/patient">Connect Wallet</Link>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;
