import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import {UserContext} from '../UserContext';
import {Link} from "react-router-dom";

export default function PostPage() {
  const {id} = useParams();
  const [postInfo,
    setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then(response => {
      response
        .json()
        .then(postInfo => {
          setPostInfo(postInfo);
        });
    });
  }, []);
  if (!postInfo) 
    return '';
  return (
    <div className="post-page">
      <div style={{fontSize:"50px"}} className="edit_main edit-content">{postInfo.title}</div>
      <div className="edit-content">
        <time style={{fontSize:"22px" , fontWeight:"600"}} >{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
      </div>
      <div style={{fontSize:"18px" , fontWeight:"500"}} className="edit-content author">
        by {postInfo.author.username}  <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="icon_pen">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
        </svg>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div style={{fontSize:"22px" , fontWeight:"500"}} className="edit-content">
          <Link className="edit" to={`/edit/${postInfo._id}`}>Edit this post</Link>
        </div>
      )}
      <div className="image">
        <img style={{height:"500px"}} className="post_img" src={`http://localhost:4000/${postInfo.cover}`}/>
      </div>
      <div style={{fontSize:"20px" , fontWeight:"400"}}  dangerouslySetInnerHTML={{
        __html: postInfo.content
      }}/>
    </div>
  );
}