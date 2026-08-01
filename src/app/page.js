'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password
      }),
    });

    if(res.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid Login");
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/signup/",{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        username,
        firstname,
        surname,
        email,
        password
      }),
    });

    const data = res.json();
    if(res.ok) {
      alert(data.message);
      setLogin(true);
    } else {
      alert("Invalid Login");
    }
    
  };

  return (
    <section className="w-full flex justify-center h-screen content-center px-2 sm:mx-0 bg-gray-950">
      <div className="w-2xl px-10 sm:px-30 h-auto bg-gray-950 shadow-xl/10 rounded-lg content-center">
        <h1 className="font-bold text-center text-5xl p-3 mt-20 pb-10 text-white">{login ? ("Login") : ("Register")}</h1>
          <form onSubmit={handleLogin}>
          <p className="pt-5 pl-5 font-bold text-1xl">Username</p>
            <input 
              placeholder=""
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-4 rounded-full focus:outline-none"/>
            <p className="pt-5 pl-5 font-bold text-1xl">Password</p>
            <input
              type="password" 
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-2 rounded-full focus:outline-none"/>
            <div className="w-full flex justify-center">
              <button type="submit" className="shadow-lg/30 shadow-[#22467d] w-auto mt-10 border border-solid border-white/[.245] px-10 py-3 mt-5 rounded-full focus:outline-none transition duration-700 ease-in-out hover:bg-white hover:text-black ">Login</button>
            </div>
          </form>
      </div>
    </section>
  );
}
