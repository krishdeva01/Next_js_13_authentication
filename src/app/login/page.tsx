"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from 'axios';
import { toast } from "react-hot-toast";


export default function LoginPage() {
  const Router = useRouter()
  const [user, Setuser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled,SetButtonDisabled] = useState(false);
  const [loading , SetLoading] = useState(false)

  useEffect(() => {
    if(user.email.length > 0 && 
      user.password.length > 0){
        SetButtonDisabled(false)
    }
    else {
      SetButtonDisabled(true)
    }
  },[user])

  const onLogin = async () => {
    try {
      SetLoading(true)
      const response = await axios.post("api/users/login",user)
      console.log("Login Successful", response.data);
      toast.success("Login Success")
      Router.push("/profile")
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message)
    }
    finally{
      SetLoading(false);
    }

  }
  return (
    <div className="flex flex-col items-center
    justify-center min-h-screen py-2">
      <h1>{loading? "Logging in":"Login"}</h1>
      <hr />
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
      onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600">
      Login here
      </button>
      <Link href="/signup">Visit Signup Page</Link>
      
    </div>
  )
}

