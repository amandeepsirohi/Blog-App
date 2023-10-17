import {useState} from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  
  return (
    <div>
      <div className="headingLR">
        <div>Register</div>
      </div>
      <div className="Log">
        <div className="login">
          <img className='log_img'
            src="https://images.unsplash.com/flagged/photo-1576697362153-ac5f08c9b140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"/>
        </div>
        <div>
          <form className="login loggs" onSubmit={register}>
            <input
              style={{fontSize:"20px"}}
              type="text"
              placeholder="username"
              value={username}
              onChange={ev => setUsername(ev.target.value)}/>
            <input
              style={{fontSize:"20px"}}
              type="password"
              placeholder="password"
              value={password} onChange={ev=>setPassword(ev.target.value)}/>
            <button style={{fontSize:"20px"}}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}