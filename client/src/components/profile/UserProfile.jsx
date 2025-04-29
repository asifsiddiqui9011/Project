// import "./UserProfile.css";
// import Cktmbtn from "../buttons/cktmbtn.jsx";
// import { ShopContext } from "../../context/shopContext.jsx";
// import { useContext, useEffect, useState } from "react";
// import profile from "../Assests/profile1.jpg"
// import EditProfile from "./EditProfile.jsx";


// function UserProfile(){
    

    
    
//     const {userData,componentHandler} = useContext(ShopContext)
//     const [address,setAddress] = useState([])

//     useEffect(()=>{
//         if(userData.address){
//             setAddress(userData.address[0])
//         }
//     },[userData])

//     useEffect(()=>{
//         componentHandler("profile");
//       },[])
    
//     return (
//         <div className="Userdiv">
//             <div className="profileimg">
//                 <img src={userData.profileImage} alt="" />
//                 <h2>{userData.name}</h2>
//                 {console.log(userData,"userprofiledata")}
//             </div>
//             <div className="userdetails">
//                 <div className="align-details">
//                 <h2>Email:</h2>
//                <p>{userData.email}</p> 
//                 </div>
//                 <div className="align-details">
//                    <h2>mobile no:</h2>
//                    {address &&(
//                      <p>+91{address.mobile}</p>
//                    )}
                  
//                 </div>
//                 <div className="align-details">
//                 <h2><b>Address:</b></h2>
//                 { address &&(
//                     <p>{address.houseNo}{address.locality}  {address.city}   {address.state} - {address.zipCode}</p>
//                 )}
//                 </div>
                
//             </div>
//             <div className="profilebtns">
//                <Cktmbtn title="Edit"/>
//                <Cktmbtn title="Sing Out"/>
//             </div>

//             <EditProfile/>

//         </div>
//     )
// } 

// export default UserProfile;


import "./UserProfile.css";
import Cktmbtn from "../buttons/cktmbtn.jsx";
import { ShopContext } from "../../context/shopContext.jsx";
import { useContext, useEffect, useState } from "react";
import EditProfile from "./EditProfile.jsx";
import { RiFontSize } from "react-icons/ri";

function UserProfile() {
  const { userData, componentHandler } = useContext(ShopContext);
  const [address, setAddress] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (userData.address) {
      setAddress(userData.address[0]);
    }
  }, [userData]);

  useEffect(() => {
    componentHandler("profile");
  }, []);

  return (
    <div className="Userdiv">
      <div className="profileimg">
        <img src={userData.profileImage} alt="" />
        <h2>{userData.name}</h2>
      </div>
      <div className="userdetails">
        <div className="align-details">
          <h2>Email:</h2>
          <p>{userData.email}</p>
        </div>
        <div className="align-details">
          <h2>Mobile No:</h2>
          {address && <p>+91{address.mobile}</p>}
        </div>
        <div className="align-details">
          <h2>
            <b>Address:</b>
          </h2>
          {address && (
            <p>
              {address.houseNo} {address.locality} {address.city} {address.state} - {address.zipCode}
            </p>
          )}
        </div>
      </div>
      <div className="profilebtns">
        <Cktmbtn title="Edit" onClick={() => setShowEditProfile(true)} style={{width:'120px',fontSize:'1rem'}} />
        <Cktmbtn title="Sign Out" onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/home')}} style={{width:'120px',fontSize:'1rem'}}/>
      </div>

      {showEditProfile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cancel-btn" onClick={() => setShowEditProfile(false)}>
              &times;
            </button>
            <EditProfile onClose={() => setShowEditProfile(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
