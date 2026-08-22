'use server'
import { NextResponse } from 'next/server';
import { decrypt } from '../crypto.js';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export async function GET(req) {
	try {
		const result = await pool.query(
		  "SELECT total FROM public.budget WHERE id = 1"
		);

		const total = result.rows[0]?.total;
				
		return NextResponse.json({ total });
	} catch (err){
		console.error("API Error", err);
		return NextResponse.json({ status: 401 });
	}
}