import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MaintainBlog(){
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    const counsellor=JSON.parse(localStorage.getItem("loggedcounsellor"));
    
    fetch("http://localhost:8080/getallclosedcasesbycounsellor?counsellor_id="+counsellor.counsellor_id)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
        setBlogs(obj);
       
      })
      .catch((error) =>
        alert(" oops !! Server down Please come back after some time ")
      );
  }, []);

  const detailedcase=(e)=>{
    fetch("http://localhost:8080/getcasebyid?case_id="+e)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Server Error");
        }
      })
      .then((obj) => {
      
        localStorage.setItem("casedetails",JSON.stringify(obj));
        navigate("/Counsellor_home/giveblog");
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
            <th scope="col">case_id</th>
            <th scope="col">counsellor_fullname</th>
           
            <th scope="col">problem_handled</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
      <tbody>
          {blogs.map((sp) => {
            return (
              <tr>
                <td>{sp && sp.case_id}</td>
                <td>{ sp && sp.patient_id.fname}{ " "}{sp && sp.patient_id.lname}</td>
             
                <td>{sp && sp.problem}</td>
                <td>
                <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark"
                onClick={

                  () => {
                    detailedcase(sp.case_id);
                  }
                }
                
                >Maintain Blog</button>

                 
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );


}