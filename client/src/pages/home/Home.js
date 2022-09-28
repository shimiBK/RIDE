import "./home.css";
import Tophome from "../../components/tophome/Tophome";
import Shows from "../../components/shows/Shows";
import Festivals from "../../components/festivals/Festivals.jsx";


export default function Home({user}) {

  return (
    <>
    <div className="homeContainer">
    <Tophome user={user}/>
    <Shows user={user}/>
    <Festivals user={user}/>
    </div>
    </>
  );
};
