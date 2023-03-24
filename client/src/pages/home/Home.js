import "./home.css";
import Tophome from "../../components/tophome/Tophome";
import Shows from "../../components/shows/Shows";


// import { format } from "timeago.js";

export default function Home({chatStatus}) {


  return (
    <>
      <div className="homeContainer">
        <Tophome chatStatus={chatStatus} />
        <Shows />
      </div>
    </>
  );
}
