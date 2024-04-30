import { db } from './db.mjs';
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';

export class journal{

    static async getUserByUsername(username) {
        try {
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user by username');
        }
    }

    static async getUserByID(userId) {
        try {
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user by username');
        }
    }
    
    static async registerUser(username, password) {
        try {
            //hash password
            console.log('Hashing password for user:', username);
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password for user:', username);
            const result = await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
            console.log('result =', result);
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Username already exists');
        }
    }

    static async getRegisteredUsers(){
        try{
            const users = await db.all('SELECT * FROM users');
            console.log('users=', users)
            return users;
        }catch(error){
            console.error(error);
            throw new Error('Error fetching registered users');

        }
    }

    static async loginUser(username, password) {
        try {
            const user = await this.getUserByUsername(username)    
            if (!user) {
                //throw new Error('User not found: Please register before logging in');
                return null;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
    
            // const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
            // console.log("token=", token)
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async updatePassword(username, newPassword) {
        try {
            //hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const result = await db.run('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username]);
            console.log('result =', result);
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Error updating password');
        }
    }
    
    static async createJournalEntry(userId, title, content) {
        try {
            const result = await db.run('INSERT INTO journal_entries (user_id, title, content) VALUES (?, ?, ?)', [userId, title, content]);
            console.log('result =', result);
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Error creating journal entry');
        }
    }

    static async editJournalEntry(entryId, title, content) {
        try {
            const result = await db.run('UPDATE journal_entries SET title = ?, content = ? WHERE id = ?', [title, content, entryId]);
            console.log('result =', result);
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Error editing journal entry');
        }
    }

    static async deleteJournalEntry(entryId) {
        try {
            const result = await db.run('DELETE FROM journal_entries WHERE id = ?', [entryId]);
            console.log('result =', result);
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting journal entry');
        }
    }
}