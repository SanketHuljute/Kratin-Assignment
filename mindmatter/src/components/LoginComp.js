import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginCompCSS.css";
import { login } from "./slice";

export default function LoginComp() {
  const init = {
    email_id: "",
    password: "",
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
  const [msg, setMsg] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const reduxAction = useDispatch();

  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    };
    fetch("http://localhost:8080/checklogin", reqOptions)
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
          setMsg("wrong email_id/password");
        } else {
          reduxAction(login());
          localStorage.setItem("loggeduser",JSON.stringify(obj));
          if (obj.status === false) {
            alert("Request has not been approved");
            navigate("/login");
          } else {
            if (obj.role_id.role_id === 1) {
              navigate("/admin_home");
            } else if (obj.role_id.role_id === 2) {
              navigate("/counsellor_home");
            } else if (obj.role_id.role_id === 3) {
              navigate("/patient_home");
            }
          }
        }
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
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
              }}
            />
          </div>
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
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                sendData(e);
              }}
            >
              Submit
            </button>
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
          {/* <div className="d-grid gap-2 mt-3">
          </div> */}
          <p className="forgot-password text-right mt-2">
            Forgot <a href="/forgotpassword">password?</a>
          </p>
          {/* <p>{JSON.stringify(info)}</p> */}
          {/* <p>{msg}</p> */}
        </div>
      </form>
      <div></div>
      <outlet/>
    </div>
    
  );
}
