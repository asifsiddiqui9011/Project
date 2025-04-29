import "./Review.css"
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import reviewimg from "../../Assests/profile1.jpg"

function Review (props) {
  const filledStars = parseInt(props.rating, 10);
  return (
    <div className="reviewbox">
      <div className="reviewuser">
        <img src={props.profileImage} alt="" id="reviewimg"/>
        <h3 id="nameofreviewer">{props.name}</h3>
      </div>
      <p>{props.review}Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem consequatur natus.</p>
      <p id="reviewstar">
        {Array.from({ length: 5 }, (_, i) =>
          i < filledStars ? <FaStar key={i} /> : <FaRegStar key={i} />
        )}
      </p>
    </div>
  )
}

export default Review
