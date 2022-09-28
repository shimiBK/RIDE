import "./partners.css"
import axios from "axios";
import {useState , useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";


export default function Partners({user}) {
    const location = useLocation();
    const fname = location.pathname.split("/")[2];

    const title = fname ? getTitle(fname) : "ALL POSTS";

    function getTitle(fname) {
        return fname.replaceAll("-"," ").toUpperCase();   
    }

    const [partners,setPartners] = useState([{}])
    const [isLoading,setIsLoading] = useState(false);
    const [confirmDel,setConfirmDel] = useState(false);
    const [partnerID,setPartnerID] = useState("");

    const userId = user ? user._id : "";


    const deletePartner = async (partnerID) => {

        try {
            window.location.reload();
            
        } catch (error) {
            console.log(error)
        }

        try { 
            await axios.delete(`/partners/${partnerID}`);

            
        }catch (error) {
            console.log(error)
            
        }
    }
    useEffect(() =>{
        const getPartners = async () => {
            try{
                setIsLoading(true);
                const res = await axios.get(
                    fname 
                    ? `http://localhost:8800/api/partners?festName=${fname}`
                    : `http://localhost:8800/api/partners`
                );
                setPartners(res.data);
                setIsLoading(false);
            }
            catch(error){
                console.log(error);
                setIsLoading(false);
            }
        };
        getPartners();
     
    },[fname]);

    const renderPartner = (
        <div className="partnersWrapper">
        {partners.length > 0 ?
         (partners.map(partner =>
        <div className="parntersItem" key={partner._id}>
            <div className="partnerInfoContainer">
                <div className="festInfoItem">
                    <img src={partner.userImg ? partner.userImg : "/assests/blank-profile.png"} alt="" className="partnerProfileImg" />
                </div>
                <div className="festInfoItem">
                <span className="partnerUserInfo">{partner.firstName + " " +  partner.lastName}</span>
                </div>
                <div className="festInfoItem">
                    <span className="partnerFixedText">From</span>
                </div>
                <div className="festInfoItem">
                    <span className="partnerUserInfo">{partner.city}</span>
                </div>
                <div className="festInfoItem">
                    <span className="partnerFixedText">About You</span>
                </div>
                <div className="festInfoItem">
                    <div className="partnerDesc">{partner.desc}</div>
                </div>
                {partner.userID === userId && <span className="deletePartner" onClick={() => {setConfirmDel(true);setPartnerID(partner._id);}}>X</span>}                
            </div>
            <button className="sendMessage" onClick={() => {window.location.assign(partner.facebook)}}>FACEBOOK PROFILE</button>
        </div>)) : <h3 className="emptyPartners">CURRENTLY THERE ARE NO PARTNERS AVAILABLE FOR {title}</h3>}  
     </div>





    );
    


  return (
    <>
    <div className="partnersContainer">
        <h1 className="partnersTitle">PARTNERS FOR {title}</h1>
        <Link to="/">
              <img src="/assests/chevron_left.png" alt="" className="previousPage"/>
        </Link>
        {isLoading ? <Loading/> : renderPartner}
        {confirmDel &&
         <div className="partnerConfirmDel">
            <div className="partnerDelModal">
                <h2 className="partnerConfirmTitle">ARE YOU SURE YOU WANT TO DELETE THIS POST?</h2>
                <div className="partnerDeleteBts">
                    <button className="partnerDeleteBtn" onClick={ () => {deletePartner(partnerID);}}>DELETE</button>
                    <button className="partnerCancelBtn" onClick= {() => setConfirmDel(false)}>CANCEL</button>
                </div>
            </div>
        </div>}

    </div>
    </>

  );
};
