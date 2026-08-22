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
		const { budget, total } = await req.json();

		const insertPrice = budget - total;
		const res = await pool.query(
			  "UPDATE budget SET total = $1 WHERE id = 1",
			  [total]
			);
		
		return NextResponse.json({
      		message: "Correctly submitted!",
    	});
	} catch (err){
		console.error("API Error", err);
		return NextResponse.json({ status: 401 });
	}
}