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
        <header>
        <Link to={"/"} href='' className='logo'>MyBlog</Link>
        <nav>
          {username && (
            <>
              <Link to={"/create"}>Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username &&(
            <>
            <Link to={"/login"} href='' className='logos'>Login</Link>
             <Link to={"/register"} href='' className='logos'>Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}