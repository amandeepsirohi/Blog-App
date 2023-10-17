import {useState} from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from "../Editor";


export default function CreatePost() {
  const [title,
    setTitle] = useState('');
  const [summary,
    setSummary] = useState('');
  const [content,
    setContent] = useState('');
    const [files , setFiles] = useState('');
const [redirect , setRedirect] = useState(false);

  async function createNewPost(ev)
  {  const data = new FormData();
    data.set('title' , title);
    data.set('summary' , summary);
    data.set('content' , content);
    data.set('file' ,files[0]);
    ev.preventDefault();
   const response = await fetch("http://localhost:4000/post" ,{
        method:'POST'  ,
        body:data,
        credentials :'include',
    });
    if(response.ok)
    {
        setRedirect(true);
    }
  }

  if(redirect)
  {
    return <Navigate to ={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        style={{marginTop:"20px" , fontSize:"20px"}}
        type="text"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}/>
      <input
        style={{marginTop:"20px",marginLeft:"10px",fontSize:"20px"}}
        type="text"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}/>
      <input style={{display:"block", marginTop:"10px",marginBottom:"30px",fontSize:"15px"}} type="file"  onChange={ev=>setFiles(ev.target.files)} />
      <Editor  value={content} onChange={setContent}/>
      <button style={{
        marginTop: '20px',
        fontSize:"15px"
      }}>Create Post</button>
    </form>
  )
}