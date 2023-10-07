import {useContext, useState} from 'react';
import {Navigate} from "react-router-dom";
import { UserContext } from '../UserContext';

export default function LoginPage() {
  const [username,
    setUsername] = useState('');
  const [password,
    setPassword] = useState('');

  const [redirect , setRedirect] = useState(false);

  const {setUserInfo} = useContext(UserContext);
  
  async function login(ev)
  {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login' , {
      method:"POST",
      body:JSON.stringify({username , password}),
      headers :{'Content-Type' :'application/json'},
      credentials:'include',
    });
    if(response.ok)
    { 
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    }
    else{
      alert("Wrong Credentials");
    }
  } 

  if(redirect)
  {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="headingLR">
        <div>Login</div>
      </div>
      <div className="Log">
        <div className="login">
          <img className='log_img'
            src="https://images.unsplash.com/flagged/photo-1576697362153-ac5f08c9b140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"/>
        </div>
        <div>
          <form className="login loggs" onSubmit={login}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}/>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}