import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CounsellorList() {
  const [counsellors, setCounsellors] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/allapprovedcounsellor")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        setCounsellors(obj);
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  }, []);

  const detailedprofile=(e)=>{
    fetch("http://localhost:8080/getcounsellorbyid?counsellor_id="+e)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
      
        localStorage.setItem("counsellorprofile",JSON.stringify(obj));
        navigate("/patient_home/counsellorprofile");
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
            <th scope="col" >First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Specialization</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {counsellors.map((sp) => {
            return (
              <tr>
                <td>{sp.fname}</td>
                <td>{sp.lname}</td>
                <td>{sp.specialization}</td>
                <td>
                <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark"
                onClick={

                  () => {
                   detailedprofile(sp.counsellor_id);
                  }
                }
                
                >Show Profile</button>

                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
