import Home from "./pages/home/Home"
import Rides from "./pages/rides/Rides"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Partners from "./pages/partners/Partners";
import { useEffect, useState } from "react";
import AddInfo from "./pages/addinfo/AddInfo"
import Profile from "./pages/profile/Profile";
import Myrides from "./pages/myrides/Myrides";
import axios from "axios";



function App() {

  const [user,setUser] = useState(null);
  const [flag,setFlag] = useState(false);
  const [cities,setCities] = useState([]);


  useEffect(() =>{
    const getCities = async () => {
        
        try{
            const res = await axios.get('http://localhost:8800/api/cities');
            setCities(res.data);                
        }catch(error){
            console.log(error);
        }
    };
    getCities();
    
  },[user]);



  
  const flagStatus = (statusFromChild) =>{
    setFlag(statusFromChild);
  }


  useEffect(() => {

    //to do this fetch with axios - watch https://www.youtube.com/watch?v=NZKUirTtxcg
    const getUser = () => {
      fetch("http://localhost:8800/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
        
    };
    getUser();
  }, []);

  useEffect(() =>{

    if(user && user.loginFlag)
    setFlag(true);

  },[user])

  return(
    <Router>
      <Switch>
        <Route exact path="/">
         {!flag ? <Home user={user} cities={cities} /> : <AddInfo user={user} flagStatus={flagStatus} cities={cities} />}
        </Route>
        <Route path="/rides" >
          <Rides user={user} cities={cities}/>
        </Route>
        <Route path="/partners">
          <Partners user={user}/>
        </Route>
        <Route path="/addinfo">
          {!flag ? <Redirect to="/"/> : <AddInfo user={user}  />}
        </Route>
        <Route path="/profile">
          {user ? <Profile user={user} cities={cities}/> : <Home user={user}/>}
        </Route>
        <Route path="/myrides">
          {user ? <Myrides user={user} cities={cities} /> : <Home user={user}/>}
        </Route>
      </Switch>
    </Router>
  )
}

export default App