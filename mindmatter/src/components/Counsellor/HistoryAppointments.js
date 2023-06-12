import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryAppointments(){
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const today=new Date();
    useEffect(() => {
        const counsellor = JSON.parse(localStorage.getItem("loggedcounsellor"));
        fetch(
          "http://localhost:8080/getcompletedappointment?counsellor_id=" +
            counsellor.counsellor_id
        )
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Server Error");
            }
          })
          .then((obj) => {
            setAppointments(obj);
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      }, []);
      return (
        <div>
       
          <div>
            <table class="table table-hover">
              <thead>
                <tr>
                    <th scope="col">case id</th>
                  <th scope="col">counsellor fullname</th>
              
    
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Problem</th>
                 
                </tr>
              </thead>
              <tbody>
                {appointments.map((sp) => {
                  return (
                    <tr>
                        <td>
                            {sp && sp.case_id.case_id}
                        </td>
                      <td>
                        {sp && sp.case_id.patient_id.fname}{" "}
                        {sp && sp.case_id.patient_id.mname}{" "}
                        {sp && sp.case_id.patient_id.lname}
                      </td>
                      <td>{sp && sp.appointment_date}</td>
                      <td>{sp && sp.case_id.problem}</td>
                     
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
}