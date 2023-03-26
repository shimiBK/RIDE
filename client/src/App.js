import Home from "./pages/home/Home";
import Rides from "./pages/rides/Rides";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AddInfo from "./pages/addinfo/AddInfo";
import Profile from "./pages/profile/Profile";
import Myrides from "./pages/myrides/Myrides";
import axios from "axios";
import userContext from "./context/userContext";
import cityContext from "./context/cityContext";
import chatContext from "./context/chatContext";
import Chat from "./components/chat/Chat";
import { io } from "socket.io-client";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

function App() {
  const [user, setUser] = useState("");
  const [flag, setFlag] = useState(false);
  const [cities, setCities] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);
  const [chat, setChat] = useState(false);
  const [socket, setSocket] = useState(null);

  const chatCont = { currentChat, setCurrentChat };
  const userCont = { user, setUser };
  const cityCont = { cities, setCities };

  useEffect(() => {
    setSocket(io(SOCKET_URL));
  }, []);

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/cities`);
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCities();
  }, [user]);

  const flagStatus = (statusFromChild) => {
    setFlag(statusFromChild);
  };

  const chatStatus = (statusFromChild) => {
    setChat(statusFromChild);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/auth/login/success`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const resObject = response.data;
          setUser(resObject.user);
        } else {
          throw new Error("Authentication has failed!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user && user.loginFlag) setFlag(true);
  }, [user]);

  return (
    <chatContext.Provider value={chatCont}>
      <cityContext.Provider value={cityCont}>
        <userContext.Provider value={userCont}>
          <Router>
            <Switch>
              <Route exact path="/">
                {!flag ? (
                  <Home chatStatus={chatStatus} />
                ) : (
                  <AddInfo flagStatus={flagStatus} />
                )}
              </Route>
              <Route path="/rides">
                <Rides chatStatus={chatStatus} />
              </Route>
              <Route path="/addinfo">
                {!flag ? <Redirect to="/" /> : <AddInfo />}
              </Route>
              <Route path="/profile">{user ? <Profile /> : <Home />}</Route>
              <Route path="/myrides">{user ? <Myrides /> : <Home />}</Route>
            </Switch>
          </Router>
          {chat && (
            <Chat chatStatus={chatStatus} currentUser={user} socket={socket} />
          )}
        </userContext.Provider>
      </cityContext.Provider>
    </chatContext.Provider>
  );
}

export default App;
