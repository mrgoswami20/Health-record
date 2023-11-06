import Login from "./Login";
import PatientData from "./PatientData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <PatientData/>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
