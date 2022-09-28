import Home from "./pages/home/Home"
import Rides from "./pages/rides/Rides"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Partners from "./pages/partners/Partners";
import { useEffect, useState } from "react";



function App() {

  const [user,setUser] = useState(null);



  useEffect(() => {
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

  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/rides" >
          <Rides user={user}/>
        </Route>
        <Route path="/partners">
          <Partners user={user}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App