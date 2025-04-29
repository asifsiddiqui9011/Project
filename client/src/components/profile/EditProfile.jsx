import './EditProfile.css'
import { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/shopContext'
import Cktmbtn from '../buttons/cktmbtn'

const EditProfile = () => {


    const {url,userData} = useContext(ShopContext)
	const [updatedData,setupdatedData] = useState(userData)


	const updateProfile = async () =>{
		console.log("profile update Function Executed",updatedData)
		let responseData;
		await fetch(`${url}/profileUpdate`,{
			method:'PUT',
			headers:{
				Accept:'application/form-data',
				'auth-token':`${localStorage.getItem('auth-token')}`,
				'Content-Type':'application/json',
				
			},
			body:JSON.stringify(updatedData),
		}).then((response)=>response.json()).then((data)=>responseData=data)

		if(responseData.success){
			localStorage.setItem('auth-token',responseData.token);
			window.location.replace("/UserProfile");
		}else{
			alert(responseData.errors );
		}
	}
	
	const changeHandler = (e) =>{
		setupdatedData({...updatedData,[e.target.name]:e.target.value})
	}

	return (
		<div className='Edit-P-Container'>
            <form onSubmit={updateProfile} className='edit-p-form' >
			<h1>Edit Profile</h1>
             <span>
                <p>Name:</p>
                <input type="text" placeholder='Enter Name' value={updatedData.name}/>
             </span>
             <span>
                <p>Email:</p>
                <input type="text" placeholder='Enter Name' value={updatedData.email}/>
             </span>
             <span>
               <p>PhoneNo:</p>
                <input type="text" placeholder='Enter Name' value={updatedData.mobile}/>
            </span>
			<Cktmbtn title="Update" />
            </form>
		</div>
	);
}


export default EditProfile
