import React, { useState } from 'react'
import assets from "../assets/assets";
const LoginPage = () => {
	const [currState, SetCurrState] = useState('Sign Up');
	const [fullname, SetFullName] = useState("");
	const [email, SetEmail] = useState("");
	const [password, SetPassword] = useState("");
	const [bio, SetBio] = useState("");
	const [bIsDataSubmitted, SetIsDataSubmitted] = useState(false);

	const onSubmitHandle = (event)=>
	{
		event.preventDefault();
		if(currState === "Sign Up" && !bIsDataSubmitted)
		{
			SetIsDataSubmitted(true);
			return;
		}
	}
	
  	return (
    	<div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl '>
      	<img  src={assets.logo_big} alt="" className='w-[min(25%,40vw,250px)] '/>

      	<form onSubmit={onSubmitHandle} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        	<h2 className='font-medium text-2xl  flex justify-between items-center  '>
          		{currState}
				{bIsDataSubmitted && <img onClick={()=>{SetIsDataSubmitted(false);}} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer '/>}
        	</h2>
			{currState === "Sign Up" && !bIsDataSubmitted && (
				<input onChange={(e)=> SetFullName(e.target.value)} value={fullname}
				 type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none'  placeholder='Full Name' required/>)}

			{!bIsDataSubmitted && (
				<>
					<input onChange={(e)=> SetEmail(e.target.value)} value={email} type='email' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 '  placeholder='Email Address' required/>
					<input onChange={(e)=> SetPassword(e.target.value)} value={password} type='password' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 '  placeholder='Password' required/>
				</> 	
			)}

			{currState === "Sign Up" && bIsDataSubmitted && (
				<textarea onChange={(e)=>SetBio(e.target.value)} value={bio} rows={4} className='p2 border border-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 ' placeholder='Provide a Short Bio ' required></textarea>
			)}

			<button type="submit" className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer ' >
				{currState === "Sign Up" ? "Create Account" : "Login"}
			</button>

			<div className='flex gap-2 '>
				<input type='checkbox' />
				<p>Agree to the terms and policies</p>
			</div>

			<div className='flex flex-col gap-2'>
				{currState === "Sign Up" ? 
				(
					<p className='text-sm text-gray-600'>Already have an Account ? <span onClick={()=>{SetCurrState("Login"); SetIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer '>Login Here</span></p>
				) 
				: 
				(
					<p className='text-sm text-gray-600'>Create a Account <span onClick={()=>{SetCurrState("Sign Up")}} className='font-medium text-violet-500 cursor-pointer '>Click Here </span></p>
				)}
			</div>

      	</form> 
    </div>
  )
}

export default LoginPage
