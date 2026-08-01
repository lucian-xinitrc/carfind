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
			"SELECT * FROM public.dealer"
		);

		const decRows = result.rows.map(row => ({
			id: row.id,
			fullname: decrypt(row.username),
			phone: decrypt(row.phone),
			datetime: row.datetime,
			status: row.status,
			location: decrypt(row.location),
			details: decrypt(row.details),
		}));
		
		return NextResponse.json(decRows);
	} catch (err){
		console.error("API Error", err);
		return NextResponse.json({ status: 401 });
	}
}