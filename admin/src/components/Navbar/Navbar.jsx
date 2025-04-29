// import "./Navbar.css";
import navlogo from "../../assets/adminlogo.png"
// import profile from "../../assets/profile.jpg"
// import { Link } from "react-router-dom"
// function Navbar() {
//   return (
//     <div className="navbar">
//       <img src={navlogo} alt="" className="nav-logo" />
//         <Link to='/login'><button >Login</button></Link>
//         <Link to='/register'><button >Register</button></Link>
//         <img src={profile} alt="nav profile" className="navprofile"/>
//     </div>
//   )
// }

// export default Navbar


// import "./Navbar.css";
// import navlogo from "../../assets/adminlogo.png"
// import profile from "../../assets/profile.jpg"
// import { Link } from "react-router-dom"
// function Navbar() {

//   const navLinks = [
//     { to: '/food', label: 'Food', roles: ['manager'] },
//     { to: '/patient', label: 'Patient', roles: ['manager'] },
//     { to: '/foodtopatient', label: 'Assign Food To Patient', roles: ['manager'] },
//     { to: '/hospital-manager-dashboard', label: 'Add Meal Task', roles: ['manager'] },
//     { to: '/delivery-dashboard', label: 'Delivery Dashboard', roles: ['Delivery'] },
//     { to: '/meal/preparationstaff', label: 'Update Meal Preparation Status', roles: ['Food_Preparation','manager'] },
//     { to: '/delivery/statustrack', label: 'Mark Food Out For Devilery', roles: ['Delivery','manager'] },
//     { to: '/hospital/delivery/statustrack', label: 'Track Delivery Status', roles: ['manager'] },
//   ];  


//   return (
//     <div className="navbar">
//       <img src={navlogo} alt="" className="nav-logo" />
//         <Link to='/login'><button >Login</button></Link>
//         <Link to='/register'><button >Register</button></Link>
//         <img src={profile} alt="nav profile" className="navprofile"/>
//     </div>
//   )
// }

// export default Navbar




import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import custom CSS
import { AdminContext } from '../../Context/AdminContext';
import Sidebar from '../Sidebar/Sidebar';
import { GiHamburgerMenu } from "react-icons/gi";

export default function ButtonAppBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { user, logout,token } = useContext(AdminContext); // Access user data from context
  console.log(user,"user")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Links configuration based on roles
  const navLinks = [
    { to: '/login', label: 'Login', roles: ['admin','clerk','delivery boy', 'manager',] },
    { to: '/addproduct', label: 'Add Product', roles: ['manager',"admin"] },
    { to: '/listproduct', label: 'Product List', roles: ['manager','admin'] },
    { to: '/orderlist', label: 'Order List', roles: ['manager','admin','clerk'] },
    { to: '/register', label: 'Register', roles: ['manager',"admin"] },
    { to: '/delivery-dashboard', label: 'Delivery Dashboard', roles: ['manager','delivery boy','admin']},
    {to :'/assigndelivery', label: 'Assign Delivery', roles: ['manager','clerk','admin']},
    {to: '/userManagement', label: 'User Management', roles: ['manager','admin']},
  ];

  return (
    <div className="navbar">
      <ul>
        <li>
          <button onClick={toggleMenu} style={{width:"50px",height:"40px",fontSize:"20px"}}><GiHamburgerMenu /></button>
          
        </li>
        <li>
        <img src={navlogo} alt="" className="nav-logo" />
        </li>
        <li>
          {localStorage.getItem('auth-token') ? (
            <button color="inherit" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button color="inherit">Login</button>
            </Link>
          )}
        </li>
      </ul>
      {/* Sliding menu */}
      <div className={`sliding-menu ${menuOpen ? 'open' : ''}`}>
        <div className="cross-button">
           <button  onClick={toggleMenu}>X</button>
        </div>
        <ul className="nav-links">
          {user ? (
            navLinks
              .filter((link) => link.roles.includes(user.role))
              .map((link) => (
                <>
                 <li key={link.to} className="nav-item">
                  <Link to={link.to}>{link.label}</Link>
                </li>
                <hr />
                </>
               
              ))
          ) : (
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          )}
          {!token && (
          <li >
            <Link to="/login"> Login</Link>
          </li>
        )}
        </ul>
        
        {/* <Sidebar/> */}
      </div>
    </div>
  );
}
