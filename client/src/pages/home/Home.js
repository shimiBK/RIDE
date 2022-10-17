import "./home.css";
import Tophome from "../../components/tophome/Tophome";
import Shows from "../../components/shows/Shows";
import Festivals from "../../components/festivals/Festivals.jsx";


export default function Home({user,cities}) {

  return (
    <>
    <div className="homeContainer">
    <Tophome user={user}/>
    <Shows user={user} cities={cities}/>
    <Festivals user={user}/>
    </div>
    </>
  );
};
