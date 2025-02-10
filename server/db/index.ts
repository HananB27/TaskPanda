import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from './schema';
import {randomUUID} from "node:crypto";

const db = drizzle(process.env.DATABASE_URL!);
async function main() {
    const user: typeof users.$inferInsert = {
        username:"TEST ALLAHA MI",
        firstName:"User",
        lastName:"User",
        email:"user@user.com",
        password:"password@user.com",
        userId: randomUUID(),
        createdDate: new Date().toISOString(), // Convert to string
        updatedDate: new Date().toISOString(),
        lastActive: new Date().toISOString(), // Ensure it's a string
        avatar: "nestobezze"
    };
    await db.insert(users).values(user);
    console.log('New user created!')
    const usersResult = await db.select().from(users);
    console.log('Getting all users from the database: ', usersResult)
}

main()