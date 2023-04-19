import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const HomeBanner = () => {
    const [email,setEmail]=useState('');
   const navigate =useNavigate();
    const handleLogin= async ()=>{
        let result = await fetch('http://localhost:5000/getstart',{
            method:'post',
            body:JSON.stringify({email}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result =await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/dashboard")
        } else {
            alert("Please enter connect details")
        }
    }
  return(
    <div className="home-banner">
      <div className="our-story">
        <h1 className="our-story-card-title" data-uia="hero-title">Unlimited movies, TV shows and more.</h1>
        <h2 className="our-story-card-subtitle" data-uia="our-story-card-subtitle">Watch anywhere. Cancel anytime.</h2>
        <p className="email-form-title">Ready to watch? Enter your email to create or restart your membership.</p>
        <div className="input-group">
         <input className="input-box" type='text' 
            placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value={email} />
          {/* <button className="link-btn"  onClick={handleLogin}>Get Started</button> */}
          <button className='btn2' onClick={handleLogin}>
                        <span className="circle2">
                            <span ></span>
                        </span>
                        <span className="text2">GET STARTED<FaArrowRight className='arrroicon2' /></span>
                    </button>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"  alt=""></img>
    </div>
  )
}

export default HomeBanner;