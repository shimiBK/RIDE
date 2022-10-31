import "./searchbar.css"
import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import cityContext from "../../context/cityContext";


const Searchbar = ({placeholder,getCity,required}) => {

    const [openData , setOpenData] = useState(true);
    const [query,setQuery] = useState("");
    const { cities } = useContext(cityContext);



    const filteredItems = useMemo(() => {
      return cities.filter(city => {
        return city.english_name.toLowerCase().includes(query.toLowerCase())
      })
    }, [query,cities])

    
    useEffect(()=>{

      getCity(query);

    },[query])


  
    const clearInput = () => {
      // setFilteredData([]);
      setQuery("");
      setOpenData(true);
    };
  return (
    <div className="search">
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="searchInput"
          required={required}
        />
                   {query.length === 0 ? (
            <SearchIcon className="searchIcon" />
          ) : (
            <CloseIcon className="searchIcon" id="clearBtn" onClick={clearInput} />
          )}
      {(query.length !== 0 && openData) &&  (
        <div className="dataResult">
          {filteredItems.slice(0, 15).map((value, key) => {
            return (
              <div className="dataItem" onClick={()=>{setQuery(`${value.english_name}`);setOpenData(false)}}>
                <p >{value.english_name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Searchbar