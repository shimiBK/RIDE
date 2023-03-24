import Navbar from '../navbar/Navbar';
import "./tophome.css";
import {Link} from 'react-scroll';




function Tophome({chatStatus}) {



  return (
    <>
    <div className="tophome">
      <Navbar chatStatus = {chatStatus} />
      <div className="contentContainer">
        <div className="textContainer">
          <h1 className="topSentence">SHARE A RIDE,</h1>
          <h3 className="bottomSentence">MEET PEOPLE.</h3>
        </div>
        <div className="btnsContainer">
          <Link to="shows" spy={true} smooth={true} offset={-25} duration={500}>
          <button className="eventsBtn">Go To Events</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Tophome