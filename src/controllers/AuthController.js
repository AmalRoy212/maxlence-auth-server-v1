import AuthService from '../services/AuthService.js';
import { generateToken } from '../utils/jwt.js';

export default class AuthController {
    static async register(req, res) {
        try {
            const { email, password, first_name, last_name } = req.body;
            const name = `${first_name} ${last_name}`.trim();
            const user = await AuthService.register({ email, password, name });
            res.status(201).json({ message: 'Registered', user });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.login({ email, password });
            const token = generateToken(user);
            res.json({ token, user });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }

    static async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            const result = await AuthService.requestPasswordReset(email);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token, oldPassword, newPassword } = req.body;
            const result = await AuthService.resetPassword({ token, oldPassword, newPassword });
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
