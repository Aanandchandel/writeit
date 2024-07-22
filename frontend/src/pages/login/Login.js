import "./Login.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
const Login=()=>{

    const [Showpassword,setShowpassword]=useState("password")
    return <div className="Login" >



<div className="formbox" >
    <div className="formheading">
        <img src="https://emilus.themenate.net/img/logo.png" alt="icon"/>
        <p>don't have an account yet? <span><Link>Sign Up</Link></span></p>
    </div>

<form className="loginform">
    {/* <div>
        <div>
        <img src="" alt="err"  />
        <span>Error(auth/internal-error).</span>
        </div>
    </div> */}

    <p><label for="email"  >Email</label></p>
    <p><input name="email" id="email" type="email" defaultValue='user1@themenate.net'  /></p>
    <p><label for="password" >Password</label></p>
    <p><input name="password"  id="password" type={Showpassword} defaultValue='user1@themenate.net'  /><span onClick={()=>{
        if(Showpassword==="text"){
            setShowpassword("password")
        }else{
            setShowpassword("text")
        }
    }} >togle</span></p>
    <button className="sign-btn">Sign In</button>
    <span>or connect with </span>
    <div className="login-btn">
        <button> <img src="" alt="svg"/>Google</button>
        <button> Facebook</button>
    </div>
</form>

</div>
    </div>
}
export default Login;