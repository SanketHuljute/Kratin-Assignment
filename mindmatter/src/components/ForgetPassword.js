import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function ForgetPassword(){

    const [allquestions, setAllQuestions] = useState([]);
   
    const[email_id,setEmailId] = useState(null);
    const[question_id,setQuestionId] = useState(null);
    const[answer,setAnswer] = useState(null);
    const[login,setLogin]=useState(null);
    const[status,setStatus] = useState(false);
    const[password,setPassword] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        fetch("http://localhost:8080/getquestions")
          .then((resp) => resp.json())
          .then((spr) => setAllQuestions(spr));
      }, []);

      const sendData = (e) => {
        e.preventDefault();
        const reqOptions = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({

            email_id: email_id,
            question_id: question_id,
            answer: answer,
          }),
        };
        fetch("http://localhost:8080/checkloginforpassword", reqOptions)
        .then((resp) => {
          if (resp.ok) {
            return resp.text();
          } else {
            throw new Error("Server Error");
          }
        })
        .then((text) => (text.length ? JSON.parse(text) : {}))
          .then((obj) => {
            if (Object.keys(obj).length === 0) {
            alert("you have entered wrong details")
            } 
            else{
              setLogin(obj);
              setStatus(true);
            }
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      };
      const sendPassword = (e) => {
        e.preventDefault();
        const reqOptions = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            login_id:login.login_id,
            password:password,
          }),
        };
        fetch("http://localhost:8080/updatepassword", reqOptions)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              throw new Error("Server Error");
            }
          })
          .then((obj) => {
           alert("passwordchanged succesfully")
           navigate("/login");
            
          })
          .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
      };

return(
    <div className="Auth-form-container">
    <form className="Auth-form">
    <div className="Auth-form-content">

                   
      <h3 className="Auth-form-title">Forget Password</h3>
     
<div style={{ display: status ? "none" : "block" }}>
        {/* Email id */}
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            id="email_id"
            name="email_id"
            className="form-control mt-1"
            placeholder="Enter email"
            value={email_id}
            onChange={(e) => {
             setEmailId(e.target.value);
            }}
          />
        </div>
        

      {/* <div className="form-group mt-3">
        <label>select gender</label>
        <input
          type="radio"
          id="address_line"
          name="address_line"
          className="form-check mt-1"
          value="male"
         
                      
        />
        
      </div> */}

      
      {/* security questions*/}
      <div className="form-group mt-3">
        <label>Select Security Question</label>
        <select
          id="question_id"
          name="question_id"
          className="form-select mt-1"
         
          onChange={(e) => {
            setQuestionId(e.target.value)
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
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
      </div>
      {/*demo */}
    {/* <div>
        <input type="checkbox" id="monday" name="monday" checked={info.checked}
        onChange={(e) => {
            dispatch({ type: "update", fld: "checked", val: info.checked?false:true });
          }}/>
      </div>
        */}

      {/* Register */}
      <div className="d-grid gap-2 mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
             sendData(e);
          }}
        >
          submit
        </button>

        
      </div>
      </div>
      <div style={{ display: status ? "block" : "none" }}>
        {/* Password */}
        <div className="form-group mt-3">
              <label>Enter new Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                 setPassword(e.target.value);
                }}
               
              />
            </div>
{/* change password */}
<div className="d-grid gap-2 mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
             sendPassword(e);
          }}
        >
          changePassword
        </button>
        </div>

      </div>

   
      <p>{/*msg*/}</p>
      <p>{JSON.stringify(allquestions)}</p>
      <p>{JSON.stringify(email_id)}</p>
      <p>{JSON.stringify(question_id)}</p>
      <p>{JSON.stringify(answer)}</p>
      </div>
  </form>
   
  
  
</div>



);


}