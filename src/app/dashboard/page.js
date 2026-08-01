'use server'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Pool } from "pg";
import { redirect, RedirectType } from "next/navigation";
import { Dash } from './client.js';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export default async function Dashboard() {
	const cookieStore = await cookies();
	
	const usernameCookie = cookieStore.get("username")?.value;
	const emailCookie = cookieStore.get("email")?.value;
	const tokenCookie = cookieStore.get("token")?.value;

	if(tokenCookie === "fordfusion2003vivi") {
			return <Dash username={usernameCookie} email={emailCookie}/>;
		
	} else {
		redirect('/', RedirectType.push);
	}
	
}