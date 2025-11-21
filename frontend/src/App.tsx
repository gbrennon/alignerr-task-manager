import React from 'react';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Task Manager</h1>
            </header>
            <main className="app-main">
                <section className="task-input-section">
                    <input type="text" placeholder="Add new task" className="task-input" />
                    <button className="add-task-button">Add Task</button>
                </section>
                <section className="task-list-section">
                    <ul className="task-list">
                        {/* Tasks will be mapped here */}
                    </ul>
                </section>
            </main>
            <footer className="app-footer">
                <p>© 2025 Task Manager</p>
            </footer>
        </div>
    );
};

export default App;
