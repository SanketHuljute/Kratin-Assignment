import { useEffect  } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CounsellorDetailedProfileForPatient.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function CounsellorDetailedProfileForPatient() {
  const [counsellor, setCounsellor] = useState(null);
  const [profiles, setProfile] = useState([]);
  const [timeslot, setAvailable] = useState(null);
  const [bookdate, setBookDate] = useState(null);
  const[feedback,setFeedBack]=useState([]);
  const[feedbackstatus,setFeedBackStatus] = useState(true);
  const today=new Date();
  const navigate = useNavigate();

  useEffect(() => {
    setCounsellor(JSON.parse(localStorage.getItem("counsellorprofile")));
    const coun = JSON.parse(localStorage.getItem("counsellorprofile"));
    // console.log(counsellor.counsellor_id);

    fetch(
      "http://localhost:8080/getCounsellorBlogDetails?counsellor_id=" +
        coun.counsellor_id
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        setProfile(obj);
        console.log(obj);
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  }, []);

  useEffect(() => {
    const coun = JSON.parse(localStorage.getItem("counsellorprofile"));
    fetch(
      "http://localhost:8080/getschedule?counsellor_id=" + coun.counsellor_id
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((abj) => {
        setAvailable(abj);
        console.log(abj);
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  }, []);

  useEffect(() => {
    const coun = JSON.parse(localStorage.getItem("counsellorprofile"));
    fetch(
      "http://localhost:8080/getallfeedbackbycounsellor?counsellor_id=" + coun.counsellor_id
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((abj) => {
        setFeedBack(abj);
        console.log(abj);
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    const counselloprofile = JSON.parse(
      localStorage.getItem("counsellorprofile")
    );
    const patientprofile = JSON.parse(localStorage.getItem("loggedpatient"));
    const datebooks = bookdate;
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        counsellor_id: counselloprofile.counsellor_id,
        patient_id: patientprofile.patient_id,
        problem: counselloprofile.specialization,
        datebook: datebooks,
      }),
    };
    fetch("http://localhost:8080/bookAppointment", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        alert("Book Successful");
        console.log(obj);
        navigate("/patient_home/myappointments");
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  };

  return (
    <div>
     
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                   
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <MDBTypography tag="h5">
                      {counsellor && counsellor.fname}
                      {counsellor && counsellor.lname}
                    </MDBTypography>
                    <MDBCardText>Counselling Psychologist</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {counsellor && counsellor.login_id.email_id}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            {counsellor && counsellor.contact}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Experience</MDBTypography>
                          <MDBCardText className="text-muted">
                            {counsellor && counsellor.experience} years
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Specialization</MDBTypography>
                          <MDBCardText className="text-muted">
                            {counsellor && counsellor.specialization}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      </div>
                      <div>
                        <ul>
                          {profiles.map((sp) => {
                            return (
                              <div>
                                <li>
                                  <h3>{sp.case_id.problem}</h3>
                                  <p>{sp.details}</p>
                                </li>
                              </div>
                            );
                          })}
                        </ul>
                        <div>
                          <h3 style={{color:"black"}}>Available Days{}</h3>
                          <ul>
                            <li
                              style={{
                                display:
                                  timeslot &&
                                  timeslot.monday.toString() === "true"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              Monday
                            </li>
                            <li
                              style={{
                                display:
                                  timeslot &&
                                  timeslot.tuesday.toString() === "true"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              Tuesday
                            </li>
                            <li
                              style={{
                                display:
                                  timeslot &&
                                  timeslot.wednesday.toString() === "true"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              wednesday
                            </li>
                            <li
                              style={{
                                display:
                                  timeslot &&
                                  timeslot.thursday.toString() === "true"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              Thursday
                            </li>
                            <li
                              style={{
                                display:
                                  timeslot &&
                                  timeslot.friday.toString() === "true"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              friday
                            </li>
                          </ul>
                        </div>
                   <div>
                   <button
                          type="button"
                          class="btn btn-outline-primary btn-rounded"
                          data-mdb-ripple-color="dark"
                          disabled={feedbackstatus?false:true}
                          onClick={(e) => {
                             setFeedBackStatus(false);
                          }}
                        >
                         view feedback
                        </button>
                   </div>
                  
                   <div style={{ display: feedbackstatus? "none" : "block" }}>
                   <ol>
                          {feedback.map((sp) => {
                            return (
                              <div>
                                <li>
                                  <h5><u>case problem:</u>{sp.case_id.problem}</h5>
                                  <p>patient name:Anonymous user comment={sp.comment}</p>
                                </li>
                              </div>
                            );
                          })}
                        </ol>

                   </div>


                    <br/>
                    <label><h6>select Booking Date</h6></label>
                        <input
                          type="date"
                          onChange={(e) => {
                            setBookDate(e.target.value);
                          }}
                        />
                        {/*        <input
                type="text"
                id="problem"
                name="problem"
                className="form-control mt-1"
                placeholder="Enter Your Problem"
               
                onChange={(e) => {
                  
                }}
              />*/}
                        {/* <button>Book now</button> */}
                        <div style={{ display: today<new Date(JSON.stringify(bookdate)) ? "none" : "block" }}>
                          <p style={{color:"red"}} >select the correct date</p>
                        </div>
                        <br />
                        <br />
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-rounded"
                          data-mdb-ripple-color="dark"
                          disabled={today<new Date(JSON.stringify(bookdate))?false:true}
                          onClick={(e) => {
                            sendData(e);
                          }}
                        >
                          Book Now
                        </button>

                        
                        <p>{JSON.stringify(bookdate)}</p>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
