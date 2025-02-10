import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed"});
    }

    try {
        // ✅ Use req.body instead of req.formData()
        const {userName, userPassword, firstName, lastName, email, id} = req.body;

        // Validate required fields
        if (!userName || !userPassword || !email || !id) {
            return res.status(400).json({error: "Missing required fields"});
        }

        // Create user in the database
        const user = await prisma.users.create({
            data: {
                username: userName,
                password: userPassword,
                first_name: firstName,
                last_name: lastName,
                email: email,
                user_ID: id,
                created_date: new Date(),
                updated_date: null,
                is_active: false,
                last_active: new Date(),
                avatar: null,
            },
        });

        return res.status(201).json({message: "User created successfully", user});
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({error: "Failed to create user"});
    }
}
