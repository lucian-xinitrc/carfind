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
		const { selectedId, name, fuel, year, km, vin, p_owners, price} = await req.json();

		const encName = encrypt(name), encFuel = encrypt(fuel), encYear = encrypt(year), encKm = encrypt(km), encVin = encrypt(vin), encPo = encrypt(p_owners), encPrice = encrypt(price);

		const res = await pool.query(
    		"INSERT INTO public.car (name, fuel, year, km, vin, previous_owners, price, dealer_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    		[ 
    			encName,
    			encFuel,
    			encYear,
    			encKm,
    			encVin,
    			encPo,
    			encPrice,
    			selectedId
    		]
  		);
		
		return NextResponse.json({
      		message: "Correctly submitted!",
    	});
	} catch (err){
		console.error("API Error", err);
		return NextResponse.json({ status: 401 });
	}
}