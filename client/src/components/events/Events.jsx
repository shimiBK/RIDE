// import React, { useState , useRef } from 'react';
// import { Link } from "react-router-dom";
// import "./events.css";


// const Events = () =>{
//   const [slideNumber, setSlideNumber] = useState(0);
//   const eventsRef = useRef();
  

//   const handleClick = (direction) =>{
//     let distance = eventsRef.current.getBoundingClientRect().x - 25;
//     if(direction === "left" && slideNumber > 0){

//       setSlideNumber(slideNumber-1);
//       eventsRef.current.style.transform  = `translateX(${520 + distance}px)`;

//     }
//     if(direction === "right" && slideNumber < 2){
//       setSlideNumber(slideNumber +1);
//       eventsRef.current.style.transform  = `translateX(${-520 + distance}px)`;
//     }

//   }
//   return (
// <>
// <div className="events">
//     <div className="eventsWrapper">
//       {/* <img src="assests/chevron_left.png" alt="" className="arrowIcons left" onClick={()=> handleClick("left")}/> */}
//         <div className="eventsContainer" ref={eventsRef}>
//           <div className="eventItem">
//               <Link to="/rides/armin-van-buuren">
//               <img src="assests/armin-van-buuren.png" alt="" className="showImg"/>
//               </Link>
//                 <h1 className="eventName">Armin Van Buuren</h1>
//                 <h3 className="eventLocation">סלינה | אילת</h3>
//                 <h3 className="eventDate">16.03.22</h3>
//           </div>
//           <div className="eventItem">
//               <Link to="rides/martin-garrix">
//               <img src="assests/martin-garrix.jpg" alt="" className="showImg"/>
//               </Link>
//               <h1 className="eventName">Martin Garrix</h1>
//               <h3 className="eventLocation">לייב פארק | ראשון לציון</h3>
//               <h3 className="eventDate">24.05.22</h3>
//           </div>
//           <div className="eventItem">
//               <Link to="/rides/david-guetta">
//               <img src="assests/david-guetta.jpg" alt="" className="showImg"/>
//               </Link>
//               <h1 className="eventName">David Guetta</h1>
//               <h3 className="eventLocation">לייב פארק | ראשון לציון</h3>
//               <h3 className="eventDate">30.07.22</h3>
//           </div>
//           {/* <div className="eventItem">
//               <Link to="rides/hardwell">
//               <img src="assests/hardwell.jpg" alt="" className="showImg"/>
//               </Link>
//               <h1 className="eventName">Hardwell</h1>
//               <h3 className="eventLocation">גני התערוכה | תל אביב</h3>
//               <h3 className="eventDate">26.05.22</h3>
//           </div>
//           <div className="eventItem">
//               <Link to="rides/tiesto">
//               <img src="assests/tiesto.jpg" alt="" className="showImg"/>
//               </Link>
//               <h1 className="eventName">Tiesto</h1>
//               <h3 className="eventLocation">גני התערוכה | תל אביב</h3>
//               <h3 className="eventDate">11.04.22</h3>
//           </div>
//           <div className="eventItem">
//               <Link to="rides/illenium">
//               <img src="assests/illenium.jpg" alt="" className="showImg"/>
//               </Link>
//               <h1 className="eventName">ILLENIUM</h1>
//               <h3 className="eventLocation">האנגר 11 | תל אביב</h3>
//               <h3 className="eventDate">30.06.22</h3>
//           </div> */}
//           </div>
//           {/* <img src="assests/chevron_right.png" alt="" className="arrowIcons right" onClick={()=> handleClick("right")}/> */}
//       </div>
// </div>
// </>
//   )
// }

// export default Events