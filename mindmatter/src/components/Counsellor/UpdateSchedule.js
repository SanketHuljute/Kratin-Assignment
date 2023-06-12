import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UpdateSchedule() {
  const counsellordetail = JSON.parse(localStorage.getItem("loggedcounsellor"));
  const [schedule, setSchedule] = useState(null);
  const scheduleinfo=JSON.parse(localStorage.getItem("schedulecounsellor"));
  const navigate = useNavigate();
  const [id,setId]=useState(null);

 const[mon,setMonday]=useState();
 const[tue,setTuesday]=useState();
 const[wed,setWednesday]=useState();
 const[thu,setThursday]=useState();
 const[fri,setFriday]=useState();

 const sendData = () => {
   

    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({

        monday: mon,
        tuesday: tue,
        wednesday: wed,
        thursday: thu,
        friday: fri,
        cid:counsellordetail.counsellor_id,
        availid:id,
        
      }),
    };
    fetch("http://localhost:8080/updateSchedule", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        alert("Schedule updated successfully");
        navigate("/counsellor_home");
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  };
  useEffect(() => {
    fetch(
      "http://localhost:8080/getschedule?counsellor_id=" +
        counsellordetail.counsellor_id
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        setSchedule(obj);
        console.log(obj);
        console.log(counsellordetail.counsellor_id);
        localStorage.setItem("schedulecounsellor",JSON.stringify(obj));
        setMonday(obj.monday);
        setTuesday(obj.tuesday);
        setWednesday(obj.wednesday);
        setThursday(obj.thursday);
        setFriday(obj.friday);
        setId(obj.availability_id);
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  }, []);

  return (
    <div>
        <hr/>
        <h2>Maintain Schedule</h2>
        <hr/>
      <div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">schedule details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={mon}
                    onChange={() => {
                        var s=mon?false:true;
                        setMonday(s);
                      }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Monday
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={tue}
                    onChange={() => {
                        var s=tue?false:true;
                        setTuesday(s);
                      }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Tuesday
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={wed}
                    onChange={() => {
                        var s=wed?false:true;
                        setWednesday(s);
                      }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Wednesday
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={thu}
                    onChange={() => {
                        var s=thu?false:true;
                        setThursday(s);
                      }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Thursday
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={fri}
                    onChange={() => {
                        var s=fri?false:true;
                        setFriday(s);
                      }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Friday
                  </label>
                </div>
              </td>
            </tr>
            <tr>
                <td colSpan={2}><button
          type="button"
          class="btn btn-outline-primary btn-rounded"
          data-mdb-ripple-color="dark"
          onClick={() => {
           
               sendData();
           }}
        >
          Update Schedule
        </button></td>
            </tr>
          </tbody>
        </table>
        <p>{JSON.stringify(mon)}{JSON.stringify(tue)}{JSON.stringify(wed)}{JSON.stringify(thu)}{JSON.stringify(fri)}{JSON.stringify(id)}</p>
      </div>

     
    </div>
  );
}
