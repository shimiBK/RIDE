import Home from "./pages/home/Home"
import Rides from "./pages/rides/Rides"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useEffect, useState } from "react";
import AddInfo from "./pages/addinfo/AddInfo"
import Profile from "./pages/profile/Profile";
import Myrides from "./pages/myrides/Myrides";
import axios from "axios";
import userContext from "./context/userContext";
import cityContext from"./context/cityContext";
import chatContext from "./context/chatContext";
import Message from "./components/message/Message";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function App() {

  const [user,setUser] = useState("");
  const [flag,setFlag] = useState(false);
  const [cities,setCities] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);


  const chatCont = {currentChat,setCurrentChat};
  const userCont = {user,setUser};
  const cityCont = {cities,setCities};



  useEffect(()=>{

    const getMessages = async () => {

      try {
        const res = await axios.get(`${SERVER_URL}/api/messages/${currentChat?._id}`)
        setMessages(res.data);
      } catch (error) {
        console.log(error);
        
      }
    }

    getMessages();

  },[currentChat])



  useEffect(() =>{
    const getCities = async () => {
        
        try{
            const res = await axios.get(`${SERVER_URL}/api/cities`);
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
    const getUser = () => {

      fetch(`${SERVER_URL}/auth/login/success`, {
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
    <chatContext.Provider value = {chatCont}>
    <cityContext.Provider value={cityCont}>
    <userContext.Provider value={userCont}>
    <Router>
      <Switch>
        <Route exact path="/">
         {!flag ? <Home /> : <AddInfo flagStatus={flagStatus} />}
        </Route>
        <Route path="/rides" >
          <Rides/>
        </Route>
        <Route path="/addinfo">
          {!flag ? <Redirect to="/"/> : <AddInfo/>}
        </Route>
        <Route path="/profile">
          {user ? <Profile /> : <Home />}
        </Route>
        <Route path="/myrides">
          {user ? <Myrides /> : <Home />}
        </Route>
      </Switch>
    </Router>
    <div className="chatContainer">
          <div className="chat">
                {messages.map((m) => (
                    <div>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
          </div>
        </div>
    </userContext.Provider>
    </cityContext.Provider>
    </chatContext.Provider>
  )
}

export default App