
import "./addinfo.css"
import {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Loading from "../../components/loading/Loading";
import Searchbar from "../../components/searchbar/Searchbar";
import Navbar from "../../components/navbar/Navbar";


const AddInfo = ({user,flagStatus,cities}) => {



  const [city,setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const gender = useRef();


    const getCity = (cityFromChild)=>{

      setCity(cityFromChild);
    }

    

      const handleSubmit = async (e) => {
        e.preventDefault();
          const addInfo = {
            city: city,
            gender: gender.current.value,
            loginFlag:(city && gender ? false : true)
          };
          try {
            await axios.put(`/user/${user._id}`, addInfo);
            flagStatus(false);

          } catch (err) {
            console.log(err);
          }
          finally{
            window.location.reload();
          }
        
      };

  return (
    <>
    <div className="addInfo">
      <div className="infoModal">
          <h1 className="addInfoTitle">One more thing...</h1>
          <div className="addInfoContainer">
          <form onSubmit={handleSubmit}>
           <div className="addInfoInputsContainer">
            <Searchbar placeholder="Search city" data={cities} getCity={getCity}/>
            <select className="infoLoginInput" type="text" ref={gender} placeholder="Gender" required="true">
            <option value="" disabled selected>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Refuse">Id Rather not say</option>
            </select>
            </div> 
                <button className="infoLoginSubmit">Submit</button>
         </form>
          </div>
        </div>
    </div>
  </>
  );
};

export default AddInfo;