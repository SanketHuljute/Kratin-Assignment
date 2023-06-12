import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GiveFeedback() {
  const [caseprofile, setCaseProfile] = useState(null);
  const[feedback,setFeedback] = useState(null);
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
        comment: feedback,
      }),
    };
    fetch("http://localhost:8080/giveFeedback", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        alert("comment added Successfully ");
         navigate("/patient_home");
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
          Counsellor Name:{caseprofile && caseprofile.counsellor_id.fname}{" "}
          {caseprofile && caseprofile.counsellor_id.lname}
        </p>
      </div>
      <div class="modal-body text-center">
        <i class="far fa-file-alt fa-4x mb-3 animated rotateIn icon1"></i>
        <h3>Your opinion matters</h3>
        <h5>
          Help us improve our services? <strong>Give us your feedback.</strong>
        </h5>
        <hr />
      </div>
      <div class="text-center">
        <h4>What could we improve?</h4>
        <textarea
          type="textarea"
          placeholder="Your Message"
          rows="4"
          column="5"
          onChange={(e) => {
            setFeedback(e.target.value);
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
          Give Feedback
        </button>
        <p>{JSON.stringify(feedback)}</p>
      </div>
    </div>
  );
}
