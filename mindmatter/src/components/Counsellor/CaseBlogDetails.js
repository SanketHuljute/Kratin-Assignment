import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function CaseBlogDetails(){
    const [caseprofile, setCaseProfile] = useState(null);
    const[details,setDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCaseProfile(JSON.parse(localStorage.getItem("casedetails")));
      }, []);

      const sendData = (e) => {
        const caseindetail = JSON.parse(
          localStorage.getItem("casedetails")
        );
        
    
        const reqOptions = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            case_id: caseindetail.case_id,
            comment: details,
          }),
        };
        fetch("http://localhost:8080/giveblog", reqOptions)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Server Error");
            }
          })
          .then((obj) => {
            alert("details added Successfully ");
             navigate("/Counsellor_home");
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      };

      return (
        <div>
          <div class="modal-body text-center">
            <i class="far fa-file-alt fa-4x mb-3 animated rotateIn icon1"></i>
            <h3>Case Details</h3>
            <p>case Id:{caseprofile && caseprofile.case_id}</p>
            <p>case Problem:{caseprofile && caseprofile.problem}</p>
            <p>
              Patient Name:{caseprofile && caseprofile.patient_id.fname}{" "}
              {caseprofile && caseprofile.patient_id.lname}
            </p>
          </div>
          <div class="modal-body text-center">
            <i class="far fa-file-alt fa-4x mb-3 animated rotateIn icon1"></i>
            
            <hr />
          </div>
          <div class="text-center">
           
            <textarea
              type="textarea"
              placeholder="Your Message"
              rows="4"
              column="5"
              onChange={(e) => {
               
                setDetails(e.target.value);
              }}
            ></textarea>
            <br />
            <button
              type="button"
              class="btn btn-outline-primary btn-rounded"
              data-mdb-ripple-color="dark"
              onClick={() => {
    
                  sendData();
              
              }}
            >
             Maintain Details
            </button>
            <p>{JSON.stringify(details)}</p>
           
          </div>
        </div>
      );

}