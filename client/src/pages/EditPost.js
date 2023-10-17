import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,
    setTitle] = useState('');
  const [summary,
    setSummary] = useState('');
  const [content,
    setContent] = useState('');
  const [files,
    setFiles] = useState('');
  const [redirect,
    setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/' + id).then(response => {
      response
        .json()
        .then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files
      ?.[0]) {
      data.set('file', files
        ?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include'
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id}/>
  }

  return (
    <form onSubmit={updatePost}>
      <input
        style={{marginTop:"20px" , fontSize:"20px"}}
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}/>
      <input
      style={{marginTop:"20px",marginLeft:"10px",fontSize:"20px"}}
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}/>
      <input style={{display:"block", marginTop:"10px",marginBottom:"30px",fontSize:"15px"}} type="file" onChange={ev => setFiles(ev.target.files)}/>
      <Editor onChange={setContent} value={content}/>
      <button style={{
        marginTop: '20px',
        fontSize:"15px"
      }}>Update post</button>
    </form>
  );
}