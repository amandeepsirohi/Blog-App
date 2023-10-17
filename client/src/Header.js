import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header()
{   const {setUserInfo , userInfo} = useContext(UserContext);
    useEffect(() => {
      fetch("http://localhost:4000/profile" ,{
        credentials:'include',
      }).then(response=>{
        response.json().then(userInfo=>{
            setUserInfo(userInfo);
        })
      })
    } , []);

    function logout()
    {
      fetch('http://localhost:4000/logout' ,{
        credentials : 'include',
        method : 'POST',
      });
      setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <div className="main_h">
          <header>
        <Link style={{fontSize:"25px" , fontWeight:"600"}} to={"/"} href='' className='main_logo'><h3>MyBlog</h3><svg style={{marginTop:"6px"}} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 64 64">
<path d="M 18.998047 15 A 17.002 17.002 0 0 0 18.998047 49.003906 A 17.002 17.002 0 0 0 18.998047 15 z M 45.498047 16 A 8.502 16.002 0 0 0 45.498047 48.003906 A 8.502 16.002 0 0 0 45.498047 16 z M 58.5 17 A 3.5 15.002 0 1 0 58.5 47.003906 A 3.5 15.002 0 1 0 58.5 17 z"></path>
</svg></Link>
        
        <nav >
          {username && (
            <>
              <Link style={{fontSize:"22px" , fontWeight:"500"}} to={"/create"} className='logos'>Create new post</Link>
              <a style={{fontSize:"22px" , fontWeight:"500"}} onClick={logout} className='logos'>Logout</a>
              
            </>
          )}
          {!username &&(
            <>
            <Link style={{fontSize:"22px" , fontWeight:"500"}} to={"/login"} href='' className='logos'>Login</Link>
             <Link style={{fontSize:"22px" , fontWeight:"500"}} to={"/register"} href='' className='logos'>Register</Link>
            </>
          )}
        </nav>
      </header>
        </div>
    );
}