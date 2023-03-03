import "./home.css";
import Tophome from "../../components/tophome/Tophome";
import Shows from "../../components/shows/Shows";


// import { format } from "timeago.js";

export default function Home({ message, own }) {

  return (
    <>
      <div className="homeContainer">
        <Tophome />
        <Shows />
      </div>
    </>
  );
}
