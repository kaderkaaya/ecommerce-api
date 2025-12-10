import bcrypt from 'bcrypt';
const saltRounds = 10;

export default function hashPassword({ password }) {
    return bcrypt.hash(password, saltRounds);
}