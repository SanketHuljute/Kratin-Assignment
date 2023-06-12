import { useEffect } from 'react';
import { useState } from 'react';

export default function PatientListForAdmin(){

    const[patient,setPatient] = useState([]);

    useEffect(()=>{

        fetch("http://localhost:8080/getallpatient")
            .then((resp) => {
              if (resp.ok) {
                return resp.json();
              } else {
                throw new Error("Server Error");
              }
            })
            .then(obj=>{
    
                setPatient(obj);
            })
            .catch((error) =>
            alert(" oops !! Server down Please come back after some time ")
          );
    },[])

    return(
        <div>
        <table class="table table-hover" >
        <thead>
            <tr>
       
       <th scope="col">FirstName</th>
        <th scope="col">LastName</th>
        <th scope="col">phonenumber</th>
        <th scope="col">city</th>
             </tr>
        </thead>
         <tbody>

         {patient.map((sp) => {
             return <tr><td>{sp.fname}</td><td>{sp.lname}</td><td>{sp.contact}</td><td>{sp.area_id.city_id.city_name}</td></tr>;
           })}
         </tbody>
        </table>
     
        </div>


 );
    

}