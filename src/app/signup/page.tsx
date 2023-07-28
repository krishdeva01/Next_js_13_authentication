"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from 'axios';
import { toast } from "react-hot-toast";


export default function SignupPage() {
  const Router = useRouter()
  const [user, Setuser] = useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled,SetButtonDisabled] = useState(false);
  const [loading , SetLoading] = useState(false)
  useEffect(() => {
    if(user.email.length > 0 && 
      user.password.length > 0 &&
       user.username.length >0){
        SetButtonDisabled(false)
    }
    else {
      SetButtonDisabled(true)
    }
  },[user])

  const onSignup = async () => {
    try {
      SetLoading(true);
      const response = await axios.post('api/users/signup',
      user);
      // console.log("Signup success", response.data);
      Router.push("/login")
      
    } catch (error:any) {
      toast.error(error.message)
    }finally{
      SetLoading(false)
    }

  }
  return (
    <div className="flex flex-col items-center
    justify-center min-h-screen py-2">
      <h1>{ loading? "Processing...":"Signup" }</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id='username'
        placeholder="username"
        value={user.username}
        onChange={e => Setuser(
          { ...user, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id='email'
        placeholder="email"
        value={user.email}
        onChange={e => Setuser(
          { ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg
      mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id='password'
        placeholder="password"
        value={user.password}
        onChange={e => Setuser(
          { ...user, password: e.target.value })}
      />
      <button
      onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600">
      {buttonDisabled ? "no signup": "Signup"}
      </button>
      <Link href="/login">Visit login Page</Link>
      
    </div>
  )
}

