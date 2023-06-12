import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History(){
    const[feedback,setFeedback]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
     const patient= JSON.parse( localStorage.getItem("loggedpatient"));
        fetch("http://localhost:8080/getallclosedcasesbypatient?patient_id="+patient.patient_id)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Server Error");
            }
          })
          .then((obj) => {
            setFeedback(obj);
            console.log(obj);
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      }, []);

      const detailedcase=(e)=>{
        fetch("http://localhost:8080/getcasebyid?case_id="+e)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Server Error");
            }
          })
          .then((obj) => {
          
            localStorage.setItem("casedetails",JSON.stringify(obj));
            navigate("/patient_home/givefeedback");
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
    
    
    
      };

    return (
        <div>
          <table class="table table-hover">
            <thead >
              <tr>
                <th scope="col">case_id</th>
                <th scope="col">counsellor_fullname</th>
                <th scope="col">counsellor_specialization</th>
                <th scope="col">counsellor_experience</th>
                <th scope="col">problem_handled</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
          <tbody>
              {feedback.map((sp) => {
                return (
                  <tr>
                    <td>{sp && sp.case_id}</td>
                    <td>{ sp && sp.counsellor_id.fname}{ " "}{sp && sp.counsellor_id.lname}</td>
                    <td>{sp && sp.counsellor_id.specialization}</td>
                    <td>{sp && sp.counsellor_id.experience}</td>
                    <td>{sp && sp.problem}</td>
                    <td>
                    <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark"
                    onClick={
    
                      () => {
                        detailedcase(sp.case_id);
                      }
                    }
                    
                    >give feedback</button>
    
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      );

}