import { Link, Routes, Route,Outlet} from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import CounsellorList from './CounsellorList';

export default function PatientHome()

{

    const[patient,setPatient]=useState();

    useEffect(()=>{
        const login_id=  JSON.parse( localStorage.getItem("loggeduser")).login_id;
        fetch("http://localhost:8080/getPatient?login_id="+login_id)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("Server Error");
          }
        })
        .then(obj=>{
    
          localStorage.setItem("loggedpatient", JSON.stringify(obj));
          setPatient(obj);
        })
        .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      },[])   
    
    

    return(
      
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            
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
                <Link to="counsellorlist" class="nav-link active" aria-current="page">
                  View Counsellors
                </Link>
                {/* make component for appointments */}
              </li>
              
              <li class="nav-item">
                <Link to="myappointments" class="nav-link">
                  My Appointments
                </Link>
                {/* make component for update */}
              </li>
              <li class="nav-item">
                <Link to="history" class="nav-link">
                  Closed Cases
                </Link>
                {/* make component for My Appointments */}
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
           {/* <h1 text-align="center">Patient Dashboard</h1>  */}
            <h1 style={{color: "DodgerBlue"}}>welcome {patient && patient.fname} {patient && patient.lname}</h1>
        </div>
       
        <Outlet></Outlet>
        
        </div>
    )
}