import "./home.css";
import Tophome from "../../components/tophome/Tophome";
import Shows from "../../components/shows/Shows";



export default function Home() {

  return (
    <>
    <div className="homeContainer">
    <Tophome/>
    <Shows/>
    </div>
    </>
  );
};
