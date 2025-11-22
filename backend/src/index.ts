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

// Task API routes
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error('Failed to fetch tasks:', err);
        res.status(500).send('Server error');
    }
});

app.post('/tasks', express.json(), async (req, res) => {
    const { title } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
            [title, false]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Failed to create task:', err);
        res.status(500).send('Server error');
    }
});

app.put('/tasks/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
            [completed, id]
        );
        if (result.rows.length === 0) {
            res.status(404).send('Task not found');
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error('Failed to update task:', err);
        res.status(500).send('Server error');
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error('Failed to delete task:', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
