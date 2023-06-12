import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function CounsellorRegister() {
  const init = {
    fname: "",
    mname: "",
    lname: "",
    email_id: "",
    password: "",
    contact: "",
    city: 0,
    area: 0,
    address_line: "",
    gender: "",
    specialization: "",
    experience: 0,
    question_id: "",
    answer: "",
   
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.fld]: action.val };

      case "reset":
        return init;
    
    }
  };

  const [info, dispatch] = useReducer(reducer, init);

  const [allcities, setAllCities] = useState([]);
  const [allareas, setAllAreas] = useState([]);
  const [allquestions, setAllQuestions] = useState([]);
  const[emailidstatus,setEmailIdStatus] = useState(true);
  const[passwordstatus,setPasswordStatus] = useState(true);
  const[contactstatus,setContactStatus] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/getAllCities")
      .then((resp) => resp.json())
      .then((sps) => setAllCities(sps));
    fetch("http://localhost:8080/getquestions")
      .then((resp) => resp.json())
      .then((spr) => setAllQuestions(spr));
  }, []);
  
  

  const sendCity = (e) => {
    fetch("http://localhost:8080/getAllAreasById?cityid=" + e.target.value)
      .then((resp) => resp.json())
      .then((ar) => setAllAreas(ar));
  };

  const validationEmail=(value)=>{

     const exp1=/^\w{6,}\@\w{4,}\.\w{2,}$/

     if(!exp1.test(value))
     {
      setEmailIdStatus(false);
     }
     else
     {
      setEmailIdStatus(true);
     }

    

  }

  const validationPassword=(value)=>{

    const exp2=/(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%&*])[A-Za-z0-9~!@#\s$%&*]{5,}/

    if(!exp2.test(value))
    {
      setPasswordStatus(false);
    }
    else{
      setPasswordStatus(true);
    }


  }

  const validationContact=(value)=>{

    const  exp3=/^[0-9]{10}$/

    if(!exp3.test(value))
    {
      setContactStatus(false);
    }
    else{
      setContactStatus(true);
    }



  }

  const sendData = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    };
    fetch("http://localhost:8080/regCounsellor", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        alert("Registration Successful");
        navigate("/login");
        
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  };
  return (
    
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
   <br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                       <br /><br /><br /><br /><br /><br />
                       <br /><br /><br /><br /><br /><br />
                       
          <h3 className="Auth-form-title">Counsellor Registration</h3>
          {/* First name */}
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="form-control mt-1"
              placeholder="Enter First Name"
              value={info.fname}
              onChange={(e) => {
                dispatch({ type: "update", fld: "fname", val: e.target.value });
              }}
            />
          </div>
          {/* Middle Name */}
          <div className="form-group mt-3">
            <label>Middle Name</label>
            <input
              type="text"
              id="mname"
              name="mname"
              className="form-control mt-1"
              placeholder="Enter Middle Name"
              value={info.mname}
              onChange={(e) => {
                dispatch({ type: "update", fld: "mname", val: e.target.value });
              }}
            />
          </div>
          {/* Last name */}
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              className="form-control mt-1"
              placeholder="Enter last Name"
              value={info.lname}
              onChange={(e) => {
                dispatch({ type: "update", fld: "lname", val: e.target.value });
              }}
            />
          </div>

            {/* Email id */}
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                id="email_id"
                name="email_id"
                className="form-control mt-1"
                placeholder="Enter email"
                value={info.email_id}
                onChange={(e) => {
                  dispatch({
                    type: "update",
                    fld: "email_id",
                    val: e.target.value,
                  });
                  validationEmail(e.target.value);
                }}
              /></div>
            {/*validation for emailid */}
            <div className="form-group mt-3"style={{ display: emailidstatus ? "none" : "block" }} >
              <p style={{color:"red"}}>Invalid emaiid</p>
            </div>
            

           


            {/* Password */}
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={info.password}
                onChange={(e) => {
                  dispatch({
                    type: "update",
                    fld: "password",
                    val: e.target.value,
                  });
                  validationPassword(e.target.value);
                }}
               
              />
            </div>

             {/*validation for password */}
             <div className="form-group mt-3"style={{ display: passwordstatus ? "none" : "block" }} >
              <p style={{color:"red"}}>Invalid password</p>
            </div>
           
         
          {/* Contact */}
          <div className="form-group mt-3">
            <label>Contact Number</label>
            <input
              type="number"
              id="contact"
              name="contact"
              className="form-control mt-1"
              placeholder="Enter contact"
              value={info.contact}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  fld: "contact",
                  val: e.target.value,
                });
                validationContact(e.target.value);
              }}
            />
          </div>

           {/*validation for emailid */}
           <div className="form-group mt-3"style={{ display: contactstatus ? "none" : "block" }} >
              <p style={{color:"red"}}>contact number should of 10 digit only</p>
            </div>


          {/*City */}
          <div className="form-group mt-3">
            <label>Select City</label>
            <select
              id="city"
              name="city"
              className="form-select mt-1"
              onChange={(e) => {
                dispatch({ type: "update", fld: "city", val: e.target.value });
                sendCity(e);
              }}
            >
              {allcities.map((sp) => {
                return <option value={sp.city_id}>{sp.city_name}</option>;
              })}
            </select>
          </div>

          {/* Area */}
          <div className="form-group mt-3">
            <label>Select Area</label>
            <select
              id="area"
              name="area"
              className="form-select mt-1"
              onChange={(e) => {
                dispatch({ type: "update", fld: "area", val: e.target.value });
              }}
            >
              {allareas.map((sp) => {
                return <option value={sp.area_id}>{sp.area_name}</option>;
              })}
            </select>
          </div>

          {/* Address line */}
          <div className="form-group mt-3">
            <label>Address Line</label>
            <input
              type="text"
              id="address_line"
              name="address_line"
              className="form-control mt-1"
              placeholder="Enter Address"
              value={info.address_line}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  fld: "address_line",
                  val: e.target.value,
                });
              }}
            />
          </div>

          {/* Gender */}
          <div className="form-group mt-3">Select Gender</div>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="male"
              name="gender"
              value="male"
              onClick={(e) => {
                dispatch({
                  type: "update",
                  fld: "gender",
                  val: e.target.value,
                });
              }}
            />
            Male
            <label class="form-check-label" for="radio1"></label>
          </div>
          <div class="form-check">
            <input
              type="radio"
              class="form-check-input"
              id="female"
              name="gender"
              value="female"
              onClick={(e) => {
                dispatch({
                  type: "update",
                  fld: "gender",
                  val: e.target.value,
                });
              }}
            />
            Female
            <label class="form-check-label" for="radio2"></label>
          </div>

         

          {/* specialization */}
          <div className="form-group mt-3">
            <label>Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="form-control mt-1"
              placeholder="Enter specialization"
              value={info.specialization}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  fld: "specialization",
                  val: e.target.value,
                });
              }}
            />
          </div>

          {/* Experience */}
          <div className="form-group mt-3">
            <label>Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              className="form-control mt-1"
              placeholder="Enter Middle Name"
              value={info.experience}
              onChange={(e) => {
                dispatch({
                  type: "update",
                  fld: "experience",
                  val: e.target.value,
                });
              }}
            />
          </div>

          {/* security questions*/}
          <div className="form-group mt-3">
            <label>Select Security Question</label>
            <select
              id="question_id"
              name="question_id"
              className="form-select mt-1"
              onChange={(e) => {
                dispatch({
                  type: "update",
                  fld: "question_id",
                  val: e.target.value,
                });
              }}
            >
              {allquestions.map((sp) => {
                return (
                  <option value={sp.question_id}>{sp.question_name}</option>
                );
              })}
            </select>
          </div>
          {/* Answer*/}
          <div className="form-group mt-3">
            <label>Answer</label>
            <input
              type="text"
              id="answer"
              name="answer"
              className="form-control mt-1"
              placeholder="Enter your answer"
              value={info.answer}
              onChange={(e) => {
                dispatch({ type: "update", fld: "answer", val: e.target.value });
              }}
            />
          </div>
          {/*demo */}
       
          {/* Register */}
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled ={ emailidstatus && passwordstatus && contactstatus ?false:true }
              onClick={(e) => {
                sendData(e);
              }}
            >
              Register
            </button>

            {/* Clear */}
            <button
              type="reset"
              className="btn btn-primary"
              onClick={() => {
                dispatch({ type: "reset" });
              }}
            >
              Clear
            </button>
          </div>

         
          <p>{JSON.stringify(info)}</p>
          <p>{JSON.stringify(allquestions)}</p>
          <p>{JSON.stringify(allcities)}</p>
          <p>{/*msg*/}</p>
          </div>
      </form>
       
     
      
    </div>

  );
}
