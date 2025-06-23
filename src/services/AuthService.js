import bcrypt from 'bcrypt';
import db from '../config/db_config.js';
// import redis from '../config/redis.js';

const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || 'yourResetSecret';
const RESET_TOKEN_EXPIRES_IN = '15m';

export default class AuthService {
    static async register({ email, password, name }) {
        const hash = await bcrypt.hash(password, 10);

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Checking for existing user:', rows);

        if (rows.length === 0) {
            const [result] = await db.execute(
                'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                [email, hash, name]
            );
            return { id: result.insertId, email, name };
        } else {
            throw new Error('User already exists');
        }

    }

    static async login({ email, password }) {
        // const cachedUser = await redis.get(`user:${email}`);
        // if (cachedUser) return JSON.parse(cachedUser);

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) throw new Error('User not found');

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Wrong password');

        // await redis.set(`user:${email}`, JSON.stringify(user), { EX: 300 });
        return user;
    }

    static async requestPasswordReset(email) {

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) throw new Error('User not found');
        
        const resetToken = jwt.sign({ id: user._id }, RESET_TOKEN_SECRET, { expiresIn: RESET_TOKEN_EXPIRES_IN });

        const resetLink = `http://localhost:5173//reset-password?token=${resetToken}`;
        // send reset link implementation here, e.g., via email

        return { message: 'Password reset link sent' };
    }

    static async resetPassword({ token, oldPassword, newPassword }) {
        let payload;
        try {
            payload = jwt.verify(token, RESET_TOKEN_SECRET);
        } catch (err) {
            throw new Error('Invalid or expired reset token');
        }

        const user = await User.findById(payload.id);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new Error('Old password is incorrect');

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return { message: 'Password reset successful' };
    }
}


