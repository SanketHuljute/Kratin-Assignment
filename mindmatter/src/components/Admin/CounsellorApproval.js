import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CounsellorApproval() {
  const [counsellors, setCounsellors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/getcounsellorapprovalchecklist")
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

  const approval = (e) => {
    fetch("http://localhost:8080/approve?counsellor_id=" + e)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        if (obj == true) {
          alert("Counsellor Approved Successfully");
          navigate("/admin_home/counsellorapproval");
       
        } else {
          alert("Counsellor Not Approved");
        }
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  };

  return (
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Specialization</th>
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
                  <button
                    onClick={() => {
                      approval(sp.counsellor_id);
                    }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
