'use server'
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { decryptacc, encryptacc } from '../crypto.js';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export async function POST(req) {
	try {
		const {username, password} = await req.json();

		if(username === "lucian1202" && password === "12021908") {
			console.log("Password correct!");
			const cookieStore = await cookies();

			cookieStore.set("token", "fordfusion2003vivi", {
			  	httpOnly: true,
			 	path: "/",
			  	maxAge: 60 * 60 * 24,
			  	secure: process.env.NODE_ENV === "production",
			});
			cookieStore.set("username", "Cusmir", {
			    httpOnly: true,
			    path: "/",
			    maxAge: 60 * 60 * 24,
			    secure: process.env.NODE_ENV === "production",
			  });
			cookieStore.set("email", "cusmirlucian@gmail.com", {
			    httpOnly: true,
			    path: "/",
			    maxAge: 60 * 60 * 24,
			    secure: process.env.NODE_ENV === "production",
			  });
		    return NextResponse.json({ succes: true }, {status: 200});
		} 

		return NextResponse.json({ error: "Invalid Creds"}, { status:401 });
	} catch (err) {
		console.error("API Error", err);
		return NextResponse.json({
			message: "API Error"
		})
	}
}