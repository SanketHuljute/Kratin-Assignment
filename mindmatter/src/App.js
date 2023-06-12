 import logo from "./logo.svg";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import LoginComp from "./components/LoginComp";
import AdminHome from "./components/Admin/AdminHome";
import CounsellorHome from "./components/Counsellor/CounsellorHome";
import PatientHome from "./components/Patient/PatientHome";
import ab from "./bg.jpg";


import { useSelector } from "react-redux";
import LogOutComp from "./components/LogOutComp";
import CounsellorRegister from "./components/Register/CounsellorRegister";
import CounsellorList from "./components/Patient/CounsellorList";
import CounsellorApproval from "./components/Admin/CounsellorApproval";
import CounsellorListForAdmin from "./components/Admin/CounsellorListForAdmin";
import CounsellorDetailedProfileForPatient from "./components/Patient/CounsellorDetailedProfileForPatient";
import AboutUs from "./components/AboutUs";
import WebsiteHome from "./components/WebsiteHome/WebsiteHome";
import PatientRegister from "./components/Register/PatientRegister";
// import PatientRegister from './components/register/PatientRegister';
// import PatientRegister from './components/Register/PatientRegister';
import CounsellorAppointments from './components/Counsellor/CounsellorAppointments';
import AppointmentProfile from "./components/Counsellor/AppointmentProfile";
import History from "./components/Patient/History";
import MyAppointments from "./components/Patient/MyAppointments";
import GiveFeedback from "./components/Patient/GiveFeedback";
import { UpdateSchedule } from "./components/Counsellor/UpdateSchedule";
import HistoryAppointments from "./components/Counsellor/HistoryAppointments";
import ForgetPassword from "./components/ForgetPassword";
import MaintainBlog from "./components/Counsellor/MaintainBlog";
import CaseBlogDetails from "./components/Counsellor/CaseBlogDetails";
import PatientListForAdmin from './components/Admin/PatientListForAdmin';

function App() {
  const mystate = useSelector((state) => state.logged);

  return (
    <div className="App">
      <div style={{ display: mystate.loggedIn ? "none" : "block" }}>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="home">
              MindMatter
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link to="home" class="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="login" class="nav-link">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="counsellorregister" class="nav-link">
                    Counsellor Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="patientregister" class="nav-link">
                    Patient Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="aboutus" class="nav-link">
                    AboutUs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <h1 className='heading'>Welcome to MindMatter</h1> */}
      </div>
      {/* <img className='image' src={ab}></img> */}

      <Routes>
        <Route path="/login" element={<LoginComp />} />
        <Route path="/admin_home" element={<AdminHome />}>
          <Route path="counsellorapproval" element={<CounsellorApproval />} />
          <Route
            path="counsellorlistforadmin"
            element={<CounsellorListForAdmin />}
          />
          <Route path="patientlist" element={<PatientListForAdmin/>}/>
        </Route>

        <Route path="/patient_home" element={<PatientHome />}>
          <Route path="counsellorlist" element={<CounsellorList />} />
          <Route path="history" element={<History/>} />
          <Route path="myappointments" element={<MyAppointments/>}/>
          <Route path="givefeedback" element={<GiveFeedback/>}/>
          <Route
          path="counsellorprofile"
          element={<CounsellorDetailedProfileForPatient />}
        />
        </Route>
        <Route path="/Counsellor_home" element={<CounsellorHome />} >
        <Route path="counsellorappointments" element={<CounsellorAppointments />} />
        <Route path="appointmentprofile" element={<AppointmentProfile />} />    
        <Route path="updateschedule" element={<UpdateSchedule/>}  />
        <Route path="historyappointment" element={<HistoryAppointments/>}  />
        <Route path="maintainblog" element={<MaintainBlog/>}/>
        <Route path="giveblog" element={<CaseBlogDetails/>}/>
        </Route>
        <Route path="counsellorlist" element={<CounsellorList />} />
        <Route path="/counsellorregister" element={<CounsellorRegister />} />
        <Route path="/logout" element={<LogOutComp />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="/forgotpassword" element={<ForgetPassword/>}/>
       {/* <Route
          path="counsellorprofile"
          element={<CounsellorDetailedProfileForPatient />}
  />*/}
        
        <Route path="home" element={<WebsiteHome />} />
        <Route path="patientregister" element={<PatientRegister />} />
      </Routes>
    </div>
  );
}

export default App;
