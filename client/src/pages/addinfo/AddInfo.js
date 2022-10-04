
import "./addinfo.css"
import {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Loading from "../../components/loading/Loading";


const AddInfo = ({user,flagStatus}) => {


  const [cities , setCities] = useState([]);

    const city = useRef();
    const gender = useRef();
    const [isLoading, setIsLoading] = useState(false);

    

      const handleClick = async (e) => {
        e.preventDefault();
          const addInfo = {
            city: city.current.value,
            gender: gender.current.value,
            loginFlag:false
          };
          try {
            await axios.put(`/user/${user._id}`, addInfo);
            flagStatus(false);

          } catch (err) {
            console.log(err);
          }
        
      };

      useEffect(() =>{
        setIsLoading(true);
        const getCities = async () => {
            try{
                const res = await axios.get('http://localhost:8800/api/cities');
                setCities(res.data);            
            }catch(error){
                console.log(error);
               
            }finally{
              setIsLoading(false); 
            }
        };

        getCities();
        
    },[]);



  return (
    <>
  <form onSubmit={handleClick}>
    <div className="addInfo">
      <div className="infoModal">
          <h1 className="addInfoTitle">One more thing...</h1>
          <div className="addInfoContainer">
            <select className="infoLoginInput" ref={city}>
            <option value="" disabled selected>Choose City</option>
              {isLoading ? <Loading/> : 
               cities.map((city) =>
                <option key={city._id} style={{direction:"ltr"}} value={city.english_name}>{city.english_name}</option>
              )};
            </select>
            <select className="infoLoginInput" type="text" ref={gender} placeholder="Gender">
            <option value="" disabled selected>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Refuse">Id Rather not say</option>
            </select>
                <button className="infoLoginSubmit">Submit</button>
          </div>
        </div>
    </div>
  </form>
  </>
  );
};

export default AddInfo;