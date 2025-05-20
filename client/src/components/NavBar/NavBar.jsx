import "./NavBar.css";
import Cktmbtn from '../buttons/cktmbtn.jsx';
import SearchBar from './searchbar.jsx'; 
import { Link } from "react-router-dom";
import background from "../Assests/profile.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shopContext.jsx";
import logo from "../Assests/new-logo.png";
 
function NavBar() {
    const { getTotalCartItems, userData } = useContext(ShopContext);
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);



    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
        <nav className={`navigationBar ${scrolled ? "scrolled" : ""}`}>
            <div>
                <img className='logo' src={logo} alt="" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <div className='homebtns'>
                <Cktmbtn title={<Link to="/home" style={{textDecoration:"none"}}>Home</Link>} />
                <Cktmbtn title={<Link to="home/house/living" style={{textDecoration:"none"}}>House</Link>} />
                <Cktmbtn title={<Link to={'home/office/conference'} style={{textDecoration:"none"}}>Office</Link>} />
                <Cktmbtn title={<Link to={'/community'} style={{textDecoration:"none"}}>Community</Link>} style={{width:"80px"}} />
            </div>
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>X</button>
                    <Link to="/home">Home</Link>
                    <Link to="/home/house/living">House</Link>
                    <Link to="/home/office/conference">Office</Link>
                    <Link to="/community">Community</Link>
                </div>

            <div className='iconsdiv'>
                <div className='logindiv'>
                    <SearchBar placeholder="Type here to search?"/>
                    <Link to="home/wishlist">
                        <button className="cart-btn"><i className="pi pi-heart" id='icons' ></i></button>
                    </Link>
                    <div className="cart-counter-div">
                        <Link to={'home/cart'}>
                            <button  className="cart-btn" ><FaShoppingCart className="carticon"/></button>
                        </Link>
                        <div className="cart-counter">{getTotalCartItems()}</div>
                    </div>
                    {localStorage.getItem('auth-token')?
                        <Link to={'home/UserProfile'}>
                             <div className="DP" >
                                <img src={userData.profileImage ? userData.profileImage : background} alt="" />
                            </div>
                        </Link>
                    :
                        <button className="login-btn" ><Link to="/login" style={{textDecoration:"none"}}>Login</Link></button>
                    }
                </div>
            </div>
       </nav>
       </>
    );
} 

export default NavBar;