import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 4000;

// PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'task_manager',
    port: 5432,
});

// Test database connection
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Database time: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection failed');
    }
});

app.get('/', (req, res) => {
    res.send('Hello from Express with TypeScript!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
