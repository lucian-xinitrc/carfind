'use server'
import { NextResponse } from 'next/server';
import { decrypt } from '../crypto.js';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export async function POST(req) {
	try {
		const {id} = await req.json();

		const result = await pool.query(
			"SELECT * FROM public.car WHERE dealer_id = $1",
			[
				id
			]
		);

		const decRows = result.rows.map(row => ({
			id: row.id,
			name: decrypt(row.name),
			fuel: decrypt(row.fuel),
			year: decrypt(row.year),
			km: decrypt(row.km),
			vin: decrypt(row.vin),
			powners: decrypt(row.previous_owners),
			price: decrypt(row.price)
		}));
		
		return NextResponse.json(decRows);
	} catch (err){
		console.error("API Error", err);
		return NextResponse.json({ status: 401 });
	}
}