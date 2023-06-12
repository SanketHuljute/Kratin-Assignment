import { Link, Routes, Route,Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import CounsellorList from "../Patient/CounsellorList";

export default function CounsellorHome() {

 

 const[counsellor,setCounsellor]=useState(null);

  useEffect(()=>{
    const login_id=  JSON.parse( localStorage.getItem("loggeduser")).login_id;
    fetch("http://localhost:8080/getCounsellor?login_id="+login_id)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Server Error");
      }
    })
    .then(obj=>{

      localStorage.setItem("loggedcounsellor", JSON.stringify(obj));
      setCounsellor(obj);
    })
    .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  },[])   


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="">
            Counsellor
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
                <Link to="counsellorappointments" class="nav-link active" aria-current="page">
                 Active Appointments
                </Link>
                {/* make component for appointments */}
              </li>
              <li class="nav-item">
                <Link to="historyappointment" class="nav-link">
                  History
                </Link>
                {/* make component for history */}
              </li>
              <li class="nav-item">
                <Link to="updateschedule" class="nav-link">
                  Update Schedule
                </Link>
                {/* make component for update */}
              </li>
              <li class="nav-item">
                { <Link to="maintainblog" class="nav-link">
                  Maintain Blog
                </Link> }
                {/* make component for update */}
              </li>
              <li class="nav-item">
                <Link to="/logout" class="nav-link">
                  LogOut
                </Link>
                {/* logout is same for all entities */}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dashboard">
        {/* <h1 className="dashboard">Counsellor Dashboard</h1> */}
        <h1 style={{color: "DodgerBlue"}}>Welcome {counsellor && counsellor.fname} {counsellor && counsellor.lname}</h1>
         
        <Outlet></Outlet>  
      </div>
      
    </div>
  );
}
