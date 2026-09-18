import { pool } from "../../config/db";
import type { CreatedUser } from "../../types/user";


    export const existsByEmail = async(email: string): Promise<boolean> => {
        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        return (result.rowCount ?? 0) > 0;
    }

    export const createUser = async(email: string, passwordHash: string): Promise<CreatedUser> =>{
        const result = await pool.query<CreatedUser>(
            `
            INSERT INTO users (email, password_hash)
            VALUES ($1, $2)
            RETURNING id, email, created_at
            `,
            [email, passwordHash]
        );

        const user = result.rows[0];
        if (!user) {
            throw new Error("user creation failed");
        }

        return user;
    }

