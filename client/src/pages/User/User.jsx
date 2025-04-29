
import UserProfile from '../../components/profile/UserProfile'
import "./User.css"
import Order from '../../components/orders/Order'
import EditProfile from '../../components/profile/EditProfile'
import ReviewDropdown from '../../components/ReviewDropdown/ReviewDropdown'

const User = () => {
  return (
    <div className='user-details'>
      <UserProfile/>
      <ReviewDropdown/>
      <Order/>
    </div>
  )
}

export default User;
