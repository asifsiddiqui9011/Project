import { createContext, useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {



  const url = 'http://localhost:8080/api';
  const [allorders,setAllOrders] = useState([]);
  const [user, setUser] = useState(null);
   const [allUsers, setAllUsers] = useState([]);
  const [allproducts,setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchInfo =()=>{
    fetch('http://localhost:8080/api/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)})
  }

  // Fetch users from the API
  const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/admin/getuser`);
        setAllUsers(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

   const fetchOrder =()=>{
      fetch('http://localhost:8080/api/allorders')
      .then((res)=>res.json())
      .then((data)=>{setAllOrders(data)})
  
    }
  
    useEffect(()=>{
      fetchOrder();
      fetchAllUsers();
    },[])
  

  useEffect(()=>{
    fetchInfo();
  },[])

  const token = localStorage.getItem('auth-token');
  useEffect(() => {
    

    if (!token){
      navigate('/login'); // Redirect to login if no token is found
      return;
    }
    if (token && user === null) {
      try {
        const decoded = jwtDecode(token); // Use the function as needed
        console.log(decoded,"decoded")
        setUser({ role: decoded.role,id:decoded.id,city:decoded.city, token });
        if (decoded.role === 'manager') {
          navigate('/');
        } else if (decoded.role === 'admin') {
          navigate('/');
        } else if (decoded.role === 'delivery boy') {
          navigate('/delivery-dashboard');
        }else if (decoded.role === 'clerk') {
          navigate('/assigndelivery');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login'); // Fallback to login if token decoding fails
      }
    }
  }, [navigate, user]); 


  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-token');
    navigate('/login'); // Redirect to login after logout
  };


  const remove_product = async (id)=>{
    await fetch('http://localhost:8080/api/removeproduct',{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        'content-type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    fetchInfo();
  }
 

   const contextValue = { fetchOrder,token,url,user,allproducts,remove_product,user, logout,allorders,fetchAllUsers,allUsers,setUser}
    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;