// import React, { useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Admindistrict from './Components/Admindistrict';
import Admintaluk from './Components/Admintaluk';
import Admingp from './Components/Admingp';
import Adminvillage from './Components/Adminvillage';
import GrampanchayatDash from './Components/GrampanchayatDash';
import Gpanganwadi from './Components/Gpanganwadi';
import Gpanganstaff from './Components/Gpanganstaff';
import Gpanganwallet from './Components/Gpanganwallet';
import Staffdashboard from './Components/Staffdashboard';
import Staffchildren from './Components/Staffchildren';
import Caretakerdashboard from './Components/Caretakerdashboard';
import Staffwallet from './Components/Staffwallet';
import Caretakerwomen from './Components/Caretakerwomen';
import CaretakerproNutrition from './Components/CaretakerproNutrition';
import Caretakerbaby from './Components/Caretakerbaby.js';
import Caretakerbabyvaccine from './Components/Caretakerbabyvaccine.js';
import Womendashboard from './Components/Womendashboard.js';
import Womennutrition from './Components/Womennutrition.js';
import Womenbabyvaccine from './Components/Womenbabyvaccine.js';
import Womenpostfeedback from './Components/Womenpostfeedback.js';
import Womencomplaint from './Components/Womencomplaint.js';
import Viewfeedback from './Components/Viewfeedback.js';
import Viewcomplaint from './Components/Viewcomplaint.js';
import TransactionDetails from './Components/TransactionDetails.js';
import Nutritiondetails from './Components/Nutritiondetails.js';
import Vaccinedetails from './Components/Vaccinedetails.js';
import Forgotpassword from './Components/Forgotpassword.js';
import Newpassword from './Components/Newpassword.js';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="admin" element={<Admin/>} >
          <Route path="admindistrict" element={<Admindistrict/>} />
          <Route path="admintaluk" element={<Admintaluk/>} />
          <Route path="admingp" element={<Admingp/>} />
          <Route path="adminvillage" element={<Adminvillage/>} />
        </Route>
        <Route path='gpdashboard' element={<GrampanchayatDash/>} >
          <Route path="gpnganwadi" element={<Gpanganwadi/>} />
          <Route path="gpstaff" element={<Gpanganstaff/>} />
          <Route path="gpanganwallet" element={<Gpanganwallet/>} />
          <Route path="transactiondetails" element={<TransactionDetails/>} />
          <Route path="nutritiondetails" element={<Nutritiondetails/>} />
          <Route path="vaccinedetails" element={<Vaccinedetails/>} />
          <Route path="viewfeedback" element={<Viewfeedback/>} />
          <Route path="viewcomplaint" element={<Viewcomplaint/>} />
        </Route>
        <Route path="staffdashboard" element={<Staffdashboard/>}>
          <Route path="staffchild" element={<Staffchildren/>} />
          <Route path="staffwallet" element={<Staffwallet/>} />
        </Route>
        <Route path="caretakerdashboard" element={<Caretakerdashboard/>}>
          <Route path="caretakerwomen" element={<Caretakerwomen/>} />
          <Route path="provideNutrition" element={<CaretakerproNutrition/>} />
          <Route path="caretakerbaby" element={<Caretakerbaby/>} />
          <Route path="caretakerbabyvaccine" element={<Caretakerbabyvaccine/>} />
        </Route>
        <Route path="womendashboard" element={<Womendashboard/>}>
          <Route path='womennutrition' element={<Womennutrition/>} />
          <Route path='womenbabyvaccine' element={<Womenbabyvaccine/>} />
          <Route path="womenpostfeedback" element={<Womenpostfeedback/>} /> 
          <Route path='womencomplaint' element={<Womencomplaint/>} />
        </Route>
        <Route path="forgot" element={<Forgotpassword/>} />
        <Route path="newpassword" element={<Newpassword/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
