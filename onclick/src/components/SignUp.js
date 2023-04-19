import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const collectData = async () => {
        console.warn(email, password);
        let result = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result)
        {
            navigate('/login')
        }
    }
  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">Register</h1>
        <br/>
        <form onSubmit={collectData}>
          <input 
            className="login-input" 
            type='text'
            value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' />

          <input 
            className="login-input"
            type='password'
            value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' />
       
          <Link className="btn-sign-up" onClick={collectData}>
            Sign Up
          </Link>
          <br/>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label text-white" htmlFor="flexCheckDefault">
              Remember Me
            </label>
          </div>
          
        </form>
        <br/>
        <br/>
        <div className="login-form-other">
          <div className="login-signup-now">
          New to Netflix?' &nbsp;
            <Link className="register-link" to= '/login' >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
  )
}

export default SignUp