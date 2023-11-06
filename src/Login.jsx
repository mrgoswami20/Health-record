import React, { Component } from "react";
import image from "./assets/hospital.jpg";
import { BrowserRouter, Route, Link } from "react-router-dom";

export class Login extends Component {
  render() {
    return (
      <div class="relative h-screen w-screen">
        <img
          src={image}
          alt="Background Image"
          class="absolute w-full h-full object-cover bg-repeat"
        />
        <div className="relative z-10 p-4">
          <div class="bg-opacity-80 backdrop-blur-sm bg-white shadow-md rounded-lg px-8 pt-6 pb-8 flex flex-col items-center m-6">
            <h1 class="text-3xl font-bold text-center mb-2">Welcome to</h1>
            <h1 class="text-3xl font-semibold text-center mb-2 text-[#CE3254]">
              Medisecure
            </h1>
            <h1 class="text-2xl font-semibold text-center mb-2 text-gray-600">
              To continue connect your wallet
            </h1>
            <button class="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/patient">Connect Wallet</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
