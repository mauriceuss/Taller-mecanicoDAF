import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import MechanicManager from './components/MechanicManager';
import { getTasks, saveTasks, exportData, importData } from './utils/storage';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showMechanicManager, setShowMechanicManager] = useState(false);
    const [filterMechanic, setFilterMechanic] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Load tasks on mount
    useEffect(() => {
        const loadedTasks = getTasks();
        setTasks(loadedTasks);
    }, []);

    // Save tasks whenever they change
    useEffect(() => {
        if (tasks.length > 0 || getTasks().length > 0) {
            saveTasks(tasks);
        }
    }, [tasks]);

    const handleAddTask = (taskData) => {
        const newTask = {
            ...taskData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTasks([newTask, ...tasks]);
        setShowForm(false);
    };

    const handleUpdateTask = (taskData) => {
        setTasks(tasks.map(task =>
            task.id === editingTask.id
                ? { ...taskData, id: task.id, createdAt: task.createdAt, updatedAt: new Date().toISOString() }
                : task
        ));
        setEditingTask(null);
        setShowForm(false);
    };

    const handleDeleteTask = (taskId) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const data = await importData(file);
                setTasks(data.tasks || []);
                alert('Datos importados correctamente');
            } catch (error) {
                alert('Error al importar datos: ' + error.message);
            }
        }
    };

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        const matchesMechanic = filterMechanic === 'all' || task.mechanic === filterMechanic;
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.mechanic?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesMechanic && matchesStatus && matchesSearch;
    });

    return (
        <div className="app">
            {/* Header */}
            <header className="app-header">
                <div className="header-content">
                    <div className="header-title">
                        <div className="logo-icon">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect width="40" height="40" rx="10" fill="url(#gradient)" />
                                <path d="M20 10L25 15H22V25H18V15H15L20 10Z" fill="white" opacity="0.9" />
                                <path d="M12 28H28V30H12V28Z" fill="white" opacity="0.9" />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                                        <stop offset="0%" stopColor="#667eea" />
                                        <stop offset="100%" stopColor="#764ba2" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <h1>Registro de Trabajos</h1>
                            <p className="subtitle">Sistema de gestión para mecánicos</p>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowForm(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Nueva Tarea
                        </button>

                        <div className="header-menu">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowMechanicManager(true)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M5 16C5 13.2386 7.23858 11 10 11C12.7614 11 15 13.2386 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Mecánicos
                            </button>

                            <button className="btn btn-secondary" onClick={exportData}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12L6 8H8V4H12V8H14L10 12Z" />
                                    <path d="M4 14H16V16H4V14Z" />
                                </svg>
                                Exportar
                            </button>

                            <label className="btn btn-secondary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 8L14 12H12V16H8V12H6L10 8Z" />
                                    <path d="M4 6H16V4H4V6Z" />
                                </svg>
                                Importar
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-bar">
                    <div className="search-box">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M12 12L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar tareas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <select
                        className="filter-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pending">Pendiente</option>
                        <option value="in-progress">En Progreso</option>
                        <option value="completed">Completado</option>
                    </select>

                    <select
                        className="filter-select"
                        value={filterMechanic}
                        onChange={(e) => setFilterMechanic(e.target.value)}
                    >
                        <option value="all">Todos los mecánicos</option>
                        {[...new Set(tasks.map(t => t.mechanic))].map(mechanic => (
                            <option key={mechanic} value={mechanic}>{mechanic}</option>
                        ))}
                    </select>
                </div>
            </header>

            {/* Main Content */}
            <main className="app-main">
                {showForm ? (
                    <div className="form-container fade-in">
                        <TaskForm
                            task={editingTask}
                            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                            onCancel={handleCancelForm}
                        />
                    </div>
                ) : (
                    <div className="tasks-container">
                        {filteredTasks.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <circle cx="40" cy="40" r="35" stroke="url(#emptyGradient)" strokeWidth="2" strokeDasharray="4 4" />
                                        <path d="M40 25V55M25 40H55" stroke="url(#emptyGradient)" strokeWidth="2" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="emptyGradient" x1="0" y1="0" x2="80" y2="80">
                                                <stop offset="0%" stopColor="#667eea" />
                                                <stop offset="100%" stopColor="#764ba2" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <h3>No hay tareas registradas</h3>
                                <p>Comienza agregando una nueva tarea para registrar el trabajo de los mecánicos</p>
                                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                                    Crear Primera Tarea
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="tasks-stats">
                                    <div className="stat-card">
                                        <div className="stat-value">{filteredTasks.length}</div>
                                        <div className="stat-label">Total</div>
                                    </div>
                                    <div className="stat-card stat-pending">
                                        <div className="stat-value">{filteredTasks.filter(t => t.status === 'pending').length}</div>
                                        <div className="stat-label">Pendientes</div>
                                    </div>
                                    <div className="stat-card stat-progress">
                                        <div className="stat-value">{filteredTasks.filter(t => t.status === 'in-progress').length}</div>
                                        <div className="stat-label">En Progreso</div>
                                    </div>
                                    <div className="stat-card stat-completed">
                                        <div className="stat-value">{filteredTasks.filter(t => t.status === 'completed').length}</div>
                                        <div className="stat-label">Completados</div>
                                    </div>
                                </div>

                                <TaskList
                                    tasks={filteredTasks}
                                    onEdit={handleEditTask}
                                    onDelete={handleDeleteTask}
                                />
                            </>
                        )}
                    </div>
                )}
            </main>

            {/* Mechanic Manager Modal */}
            {showMechanicManager && (
                <MechanicManager onClose={() => setShowMechanicManager(false)} />
            )}
        </div>
    );
}

export default App;
