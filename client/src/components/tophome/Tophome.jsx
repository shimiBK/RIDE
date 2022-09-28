import Navbar from '../navbar/Navbar';
import "./tophome.css";
import {Link} from 'react-scroll';




function Tophome({user}) {

  return (
    <>
      
    <div className="tophome">
      <Navbar user={user}/>
      <h1 className="topSentence">SHARE A RIDE,</h1>
      <h3 className="bottomSentence">MEET PEOPLE.</h3>
      <div className="btnsContainer">
      <Link to="shows" spy={true} smooth={true} offset={-25} duration={500}>
        <button className="eventsBtn">Events</button>
        </Link>
        <Link to="festivals" spy={true} smooth={true} offset={-5} duration={500}>
        <button className="festivalsBtn">Festivals</button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Tophome