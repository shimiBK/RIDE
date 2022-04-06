import "./home.css";
import Tophome from "../../components/tophome/Tophome";
import Bottomhome from "../../components/bottomhome/Bottomhome";



export default function Home() {
  return (
    <>
    {/* <Navbar/> */}
    <div className="homeContainer">
    <Tophome/>
    <Bottomhome/>
    </div>
    </>
  );
};
