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
                <img className='logo' src={logo} alt="" />
            </div>
            <div className='homebtns'>
                <Cktmbtn title={<Link to="/home" style={{textDecoration:"none"}}>Home</Link>} />
                <Cktmbtn title={<Link to="home/house/living" style={{textDecoration:"none"}}>House</Link>} />
                <Cktmbtn title={<Link to={'home/office/conference'} style={{textDecoration:"none"}}>Office</Link>} />
                <Cktmbtn title={<Link to={'/community'} style={{textDecoration:"none"}}>Community</Link>} />
            </div>
            <div className='iconsdiv'>
                <div className='logindiv'>
                    <SearchBar placeholder="Type here to search?"/>
                    <Link to="home/wishlist">
                        <Cktmbtn title={<i className="pi pi-heart" id='icons' style={{ fontSize: '2rem' }}></i>} style={{width:"45px", height:"40px"}} />
                    </Link>
                    <div className="cart-counter-div">
                        <Link to={'home/cart'}>
                            <Cktmbtn title={<FaShoppingCart className="carticon"/>} style={{width:"45px", height:"40px"}}/>
                        </Link>
                        <div className="cart-counter">{getTotalCartItems()}</div>
                    </div>
                    {localStorage.getItem('auth-token')?
                        <Link to={'home/UserProfile'}>
                            <Cktmbtn 
                              style={{
                                borderRadius:"50%",
                                height:"50px",
                                width:"50px",
                                backgroundImage:`url(${userData.profileImage ? userData.profileImage : background})`,
                                backgroundSize:"cover",
                                backgroundRepeat: "no-repeat"
                              }} 
                              className="DP" 
                            />
                        </Link>
                    :
                        <Cktmbtn title={<Link to="/login" style={{textDecoration:"none"}}>Login</Link>} />
                    }
                </div>
            </div>
       </nav>
       </>
    );
} 

export default NavBar;