import "./ride.css"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Ride = ({ride}) => {
  return (
    <div className="rideItem" >
        <div className="infoContainer">
            <div className="infoItem">
                <img src={ride.userImg ? ride.userImg : "/assests/blank-profile.png"} alt="" className="profileImg" />
            </div>
            <div className="infoItem">
                <span className="userInfo">{ride.firstName + " " +  ride.lastName}</span>
            </div>
            <div className="infoItem">
                <span className="fixedText">From →</span>
                <span className="userInfo">{ride.city}</span>
            </div>
            <div className="infoItem">
                <span className="fixedText">Time →</span>
                <span className="userInfo">{ride.time}</span>
            </div>
            <span className="genderIcon">
                {ride.userGender === "Male" && <MaleIcon/>}
                {ride.userGender === "Female" && <FemaleIcon style={{color:'#f15bb5'}}/> }
            </span>
        <button className="facebookBtn" onClick={() => {window.open(ride.facebook , "_blank")}}>FACEBOOK PROFILE</button>
        </div>
</div>)
}

export default Ride