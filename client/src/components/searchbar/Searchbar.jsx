import "./searchbar.css"
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import cityContext from "../../context/cityContext";


const Searchbar = ({placeholder,getCity,required}) => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [openData , setOpenData] = useState(true);

    const { cities } = useContext(cityContext);



    useEffect(()=>{

      getCity(wordEntered);

    },[wordEntered])


  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = cities.filter((value) => {
        return value.english_name.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
      setOpenData(true);
    };
  return (
    <div className="search">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          className="searchInput"
          required={required}
        />
                   {filteredData.length === 0 ? (
            <SearchIcon className="searchIcon" />
          ) : (
            <CloseIcon className="searchIcon" id="clearBtn" onClick={clearInput} />
          )}
      {(filteredData.length != 0 && openData) &&  (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div className="dataItem" onClick={()=>{setWordEntered(`${value.english_name}`);setOpenData(false)}}>
                <p>{value.english_name} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Searchbar