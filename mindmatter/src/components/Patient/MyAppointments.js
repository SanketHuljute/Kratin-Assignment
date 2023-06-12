import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyAppointments(){

    const[appointment,setAppointment] = useState([]);
    useEffect(() => {
      const patient = JSON.parse(localStorage.getItem("loggedpatient"));
        fetch("http://localhost:8080/getrunningappointmentbypatient?patient_id="+patient.patient_id)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Server Error");
            }
          })
          .then((obj) => {
            setAppointment(obj);
            console.log(obj);
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      }, []);

      

    return (
        <div>
          <table class="table table-hover">
            <thead >
              <tr>
                
                <th scope="col">counsellor_fullname</th>
                <th scope="col">counsellor_specialization</th>
                <th scope="col">counsellor_experience</th>
                <th scope="col">Appointment_date</th>
                <th scope="col">problem</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
          <tbody>
              {appointment.map((sp) => {
                return (
                  <tr>
                    <td>{sp && sp.case_id.counsellor_id.fname}{" "}{sp && sp.case_id.counsellor_id.lname}</td>
                    <td>{ sp && sp.case_id.counsellor_id.specialization}</td>
                    
                    <td>{sp && sp.case_id.counsellor_id.experience}</td>
                    <td>{sp && sp.appointment_date}</td>
                    <td>{sp && sp.case_id.problem}</td>
                    <td>
                    <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark"
                    onClick={
    
                      () => {
                       
                      }
                    }
                    
                    >view detailed</button>
    
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      );


}