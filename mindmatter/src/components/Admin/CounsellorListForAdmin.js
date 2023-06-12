import { useEffect } from "react";
import { useState } from "react";

export default function CounsellorListForAdmin() {
  const [counsellors, setCounsellors] = useState([]);

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
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
