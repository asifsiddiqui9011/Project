// import "./Community.css"
// import Catbtn from "../../components/buttons/catbtn"
// import { IoHome } from "react-icons/io5";
// import { ImOffice } from "react-icons/im";
// import { Link } from 'react-router-dom';
// import { MdGroups } from "react-icons/md";
// import { FaHandHoldingMedical } from "react-icons/fa";
// import { FaLightbulb } from "react-icons/fa";
// import QueryCard from "../../components/CommunityComponents/QueryCard/QueryCard";



// const Community = () => {
//   return (
//     <div>
//        <div className="community-sidebar" style={{padding:"120px"}}>
//             <Link to="/community/house" style={{textDecoration:"none"}}>
//                <Catbtn iconn={<IoHome style={{fontSize:"60px", color:"#F7418F"}}/>} btnt={'House'}/>
//             </Link>
//             <Link to="/community/office" style={{textDecoration:"none"}}>
//                <Catbtn iconn={<ImOffice style={{fontSize:"60px", color:"#F7418F"}}/>} btnt={'Office'}/>
//              </Link>
//              <Link to="/community/medical" style={{textDecoration:"none"}}>
//                <Catbtn iconn={<FaHandHoldingMedical style={{fontSize:"60px", color:"#F7418F"}}/>} btnt={'Medical'}/>
//              </Link>1
//              <Link to="/community/others" style={{textDecoration:"none"}}>
//                <Catbtn iconn={<FaLightbulb  style={{fontSize:"60px", color:"#F7418F"}}/>} btnt={'Others'}/>
//              </Link>
//         </div>
//         <div className="questions-container">
//             <QueryCard/>
//             <QueryCard/>
//             <QueryCard/>
//          </div>
        
//     </div>
//   )
// }

// export default Community





import "./Community.css"
import Catbtn from "../../components/buttons/catbtn"
import { IoHome } from "react-icons/io5";
import { ImOffice } from "react-icons/im";
import { Link } from 'react-router-dom';
import { MdGroups } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import QueryCard from "../../components/CommunityComponents/QueryCard/QueryCard";
import CBanner from "../../components/CommunityComponents/CBanner/CBanner";
import CProductInfo from "../../components/CommunityComponents/CProductInfo/CProductInfo";



const Community = () => {
  
  

  return (
    <div>
      <CBanner/> 
      <CProductInfo/>
    <h1>Trending Discussions</h1>  
    <QueryCard/>
    <QueryCard/>
    <QueryCard/>  
    <h1>Recent Discssion</h1>
    <QueryCard/>
    <QueryCard/>  
    </div>
  )
}

export default Community
