// import "./error.css"



const Error = ({alert}) => {

  return (
    <div className="confirmAuth">
    <div className="authModal">
        <span className="authTitle">Please Login in order to add a ride</span>
        <div className="authBtns">
           <button className="approveBtn">OK</button> 
        </div>
        </div>
</div>
  )
}

export default Error