// import './QuesryCard.css'

// const QueryCard = () => {
//   return (
  
//              <div className="question-card">
//                 <div className="questioner-info">
//                     <img src="" alt=""  className="questioner-img"/>
//                     <p>Username</p>
//                 </div>
//                 <hr />
//                   <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni minima accusamus distinctio nulla. Libero commodi consequatur molestiae sit</p>
//                   <button>reply</button>
//                   <button>Replies</button>
//                   <button>like</button>
//                   <button>save</button>
//              </div>
      
//   )
// }

// export default QueryCard



import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import './QuesryCard.css';

const QueryCard = ({ postId, postContent, username }) => {

  postId = postId || 'dummy-post-id';
  postContent = postContent || 'This is a dummy post content for display.';
  username = username || 'DummyUser';

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([
    'This is a dummy reply.',
    'Another dummy reply for testing.',
    'Yet another dummy reply.'
  ]);
  const [showReplies, setShowReplies] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm((prev) => !prev);
  };

  const handlePostReply = () => {
    // Sample API call for posting a reply
    fetch(`/api/posts/${postId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: replyText }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming API returns the posted reply under data.reply
        setReplies([...replies, data.reply]);
        setReplyText('');
        setShowReplyForm(false);
      })
      .catch((error) => console.error('Error posting reply:', error));
  };

  const handleRepliesClick = () => {
    if (!showReplies && replies.length === 0) {
      // Sample API call to load replies for the post
      fetch(`/api/posts/${postId}/replies`)
        .then((res) => res.json())
        .then((data) => {
          // Assuming API returns an array of replies
          setReplies(data.replies);
          setShowReplies(true);
        })
        .catch((error) => console.error('Error fetching replies:', error));
    } else {
      setShowReplies((prev) => !prev);
    }
  };

  const handleLikeClick = () => {
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setLiked(!liked);
    // Sample API call to update like count
    fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ like: newLikeCount }),
    })
      .then((res) => res.json())
      .then(() => console.log('Like updated'))
      .catch((error) => console.error('Error updating like:', error));
  };

  const handleSaveClick = () => {
    // Sample API call to save the post to user details
    fetch(`/api/posts/${postId}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ save: true }),
    })
      .then((res) => res.json())
      .then(() => {
        setSaved(true);
        console.log('Post saved');
      })
      .catch((error) => console.error('Error saving post:', error));
  };

  return (
    <div className="query-card--container">
      <div className="questioner-info--container">
        <img src="" alt="User" className="questioner-img--custom" />
        <p className="username-text">{username || 'Username'}</p>
      </div>
      <hr className="separator-line" />
      <p className="post-content">
        {postContent ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni minima accusamus distinctio nulla. Libero commodi consequatur molestiae sit.'}
      </p>
      <div className="actions-buttons">
        <button onClick={handleReplyClick} className="btn-reply">
          Reply
        </button>
        <button onClick={handleRepliesClick} className="btn-replies">
          Replies
        </button>
        <button onClick={handleLikeClick} className="btn-like">
          <FaHeart color={liked ? 'red' : 'grey'} /> Like {likeCount}
        </button>
        <button onClick={handleSaveClick} className="btn-save">
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
      {showReplyForm && (
        <div className="reply-dropdown">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Enter your reply"
            className="reply-input"
          ></textarea>
          <button onClick={handlePostReply} className="btn-post-reply">
            Post Reply
          </button>
        </div>
      )}
      {showReplies && replies.length > 0 && (
        <div className="replies-list">
          {replies.map((rep, index) => (
            <div key={index} className="single-reply">
              <p>{rep}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryCard;
