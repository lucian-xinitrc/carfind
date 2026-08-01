'use server'
import { NextResponse } from 'next/server';
import { encrypt, decrypt } from '../crypto.js';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export async function POST(req) {
	try {
		const {fullname, phone, details, location} = await req.json();

		const encUser = encrypt(fullname), encPhone = encrypt(phone), encDetails = encrypt(details), encLocation = encrypt(location);

		const res = await pool.query(
    		"INSERT INTO public.dealer (username, phone, details, location) VALUES ($1, $2, $3, $4)",
    		[ 
    			encUser,
    			encPhone,
    			encDetails,
    			encLocation
    		]
  		);
		
		return NextResponse.json({
      		message: "Correctly submitted!",
    	});
		return NextResponse.json(decRows);
	} catch (err){
		console.error("API Error", err);
		return NextResponse.json({ status: 401 });
	}
}