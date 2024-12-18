"use server";

import { neon } from "@neondatabase/serverless";


export async function getData() {
	const sql = neon(process.env.DATABASE_URL!);
	// Note: I added a non-null assertion (!) since DATABASE_URL is required
	
	// Replace the ... with your actual SQL query
	const data = await sql`SELECT * FROM your_table`; // Modify this query as needed
	
	return data;
} 