import React from 'react';
import Addride from '../addride/Addride';
import Events from '../events/Events';
import "./bottomhome.css";

function Bottomhome() {
  return (
    <>
    <div className="bottomhome">
        <Events/>
        <Addride/>
        <h1 className="eventsTitle">WHERE ARE YOU HEADING?</h1>
    </div>
    </>
  );
};

export default Bottomhome