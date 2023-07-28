"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { NextResponse } from "next/server"
import axios from "axios"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
   const [ data, setData ] = useState('');
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout succesful")
      router.push("/login")
      
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
      return NextResponse.json({message: error.message},
        {status: 500})
    }
  }
  const getUserDetails =async () => {
    const res = await axios.get("/api/users/me")    
    console.log(res.data);
    setData(res.data.data._id)
    
  }

  return (
    <div className="flex flex-col items-center
    justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">{data === "" ?null:<Link 
      href={`/profile/${data}`}> {data}</Link>}</h2>
      <hr />
      <button onClick={logout}
      className="bg-blue-500 mt-4 hover:bg-blue-700
      text-white font-bold py-2 px-4 rounded"
      >Logout</button>
       <button onClick={getUserDetails}
      className="bg-green-800 mt-4 hover:bg-blue-700
      text-white font-bold py-2 px-4 rounded"
      >GetUser Details</button>
    </div>
  )
}