import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { journal } from './journal_service.mjs';
import cors from 'cors';

const app = express();

const port = 5000;
app.use('/public', express.static('public'));

app.use(bodyParser.json());

// Configure session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
  }));


app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Received registration request for username:', username);
        // check if the username already exists
        const existingUser = await journal.getUserByUsername(username);
        if (existingUser) {
            console.log('Username already exists:', username);

            // if so return error
            return res.status(400).json({ message: 'Username already exists' });
        }

        console.log('Attempting to register user:', username);
        await journal.registerUser(username, password);
        console.log('User registered successfully:', username);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/auth/registered-users', async (req, res) => {
    try {
        const users = await journal.getRegisteredUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/auth/user/:id', async (req, res) => {
    //const userId = req.params.id;
    const userId = req.session.user.userId; 

    try {
        const user = await journal.getUserByID(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await journal.loginUser(username, password);
        if (user) {
            req.session.user = { userId: user.id, username };
            console.log("req session.user=", req.session.user);
            //req.session.user = { username }; // Store user information in session
            res.json({ message: 'User logged in successfully' });
        } else {
            res.status(401).json({ error: 'User not found: Please register before logging in' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'User logged out successfully' });
        }
    });
});

app.put('/auth/update-password', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        // Check if the user exists and the old password is correct
        const user = await journal.loginUser(username, oldPassword);
        if (!user) {
            return res.status(401).json({ error: 'Incorrect username or password' });
        }

        // Update the password
        await journal.updatePassword(username, newPassword);
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a journal entry
app.post('/api/journal-entries', async (req, res) => {
    const { title, content } = req.body; 

    try {
        const userId = req.session.user.userId; 
        await journal.createJournalEntry(userId, title, content);
        res.status(201).json({ message: 'Journal entry created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/journal-entries', async (req, res) => {
    //const userId = req.params.id;
    const userId = req.session.user.userId;
    console.log("get user id=", userId);
    try {

        const entries = await journal.getEntries(userId);
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Edit a journal entry
app.put('/api/journal-entries/:id', async (req, res) => {
    const entryId = req.params.id;
    const { title, content } = req.body;

    try {
        const userId = req.session.user.userId;
        await journal.editJournalEntry(userId, entryId, title, content);
        res.json({ message: 'Journal entry updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a journal entry
app.delete('/api/journal-entries/:id', async (req, res) => {
    const entryId = req.params.id;

    try {
        const userId = req.session.user.userId;
        await journal.deleteJournalEntry(userId, entryId);
        res.json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});