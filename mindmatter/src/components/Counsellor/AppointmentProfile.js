import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentProfile() {
  const [Appointment, setAppointments] = useState(null);
  const [Remark, setRemark] = useState(null);
  const [option, setOption] = useState(null);
  const [nextappointment, setNextAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAppointments(JSON.parse(localStorage.getItem("appointmentprofile")));
  }, []);

  const closeCase=(e)=>{

    const appointmentprofile = JSON.parse(
      localStorage.getItem("appointmentprofile")
    );
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        case_id: appointmentprofile.case_id.case_id,
        
      }),
    };
    fetch("http://localhost:8080/closecase", reqOptions)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Server Error");
      }
    })
    .then((obj) => {
      if (obj===true){
      alert("case closed Successfully");
       navigate("/Counsellor_home/counsellorappointments");
      }
    })
    .catch((error) =>
      alert(" oops !! Server down Please come back after some time ")
    );
  };

  const send = (e) => {
     e.preventDefault();
    const appointmentprofile = JSON.parse(
      localStorage.getItem("appointmentprofile")
    );
    const nextdate=nextappointment;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        case_id: appointmentprofile.case_id.case_id,
        bookdate: nextdate,
      }),
    };
    fetch("http://localhost:8080/bookNextAppointment", reqOptions)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Server Error");
      }
    })
    .then((obj) => {
      alert("Booked Next Appointment Successfully");
      navigate("/Counsellor_home/counsellorappointments")
      // navigate("/login");
    })
    .catch((error) =>
      alert(" oops !! Server down Please come back after some time ")
    );


  };
  const sendData = (e) => {
    const appointmentprofile = JSON.parse(
      localStorage.getItem("appointmentprofile")
    );
    const remarks = Remark;

    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        appointment_id: appointmentprofile.appointment_id,
        remark: remarks,
      }),
    };
    fetch("http://localhost:8080/makeRemark", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        alert("Remark added Successfully Now Enter next appointment");
        // navigate("/login");
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  };

  return (
    <div>
      <h1>Appointment Profile</h1>
      <p>Case Id:{Appointment && Appointment.case_id.case_id}</p>
      <p>
        Patient FullName:{Appointment && Appointment.case_id.patient_id.fname}
      </p>
      <div>
        <label>Enter the Remark</label>
        <br></br>
        <textarea
          rows="4"
          cols="50"
          name="comment"
          form="usrform"
          align="center"
          onChange={(e) => {
            setRemark(e.target.value);
          }}
        >
          Enter remark here...
        </textarea>
        
        <br></br>
        <button
          type="button"
          class="btn btn-outline-primary btn-rounded"
          data-mdb-ripple-color="dark"
          onClick={() => {
            sendData();
          }}
        >
          Submit Remark
        </button>
        <br />
        

        <div>
          <h4>Select below option</h4>
          <br />
          <input
            type="radio"
            name="option"
            value="nextappointment"
            onClick={() => {
              setOption("nextappointment");

            }}
          />
          Next Appointment
          <input
            type="radio"
            name="option"
            value="closecase"
            onClick={() => {

                setOption("closecase");
            }}
          />
          Close Case
        </div>
        
        <div style={{ display: option=="nextappointment" ? "block" : "none" }}>
        <label>Enter the Next Appointment Date</label>
        <br />
        <input type="date" color="blue" 
        onChange={(e)=>{ setNextAppointment(e.target.value)}}/>
        <br></br>
        
        <button
          type="button"
          class="btn btn-outline-primary btn-rounded"
          data-mdb-ripple-color="dark"
        
          onClick={(e)=>{

            send(e);
          }}
        >
          proceed
        </button>
        </div>
        <div style={{ display: option=="closecase" ? "block" : "none" }}>
        <button
          type="button"
          class="btn btn-outline-primary btn-rounded"
          data-mdb-ripple-color="dark"
          onClick={() => {
            closeCase ();
 
           }}
        >
          Close Case
        </button>
        </div>
        <br />
      </div>
      <p>{JSON.stringify(nextappointment)}</p>
    </div>
  );
}
