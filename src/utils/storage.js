// LocalStorage wrapper for persistent data storage

const STORAGE_KEYS = {
    TASKS: 'mechanic_tasks',
    MECHANICS: 'mechanic_list',
    SETTINGS: 'app_settings',
};

// Tasks Management
export const getTasks = () => {
    try {
        const rawData = localStorage.getItem(STORAGE_KEYS.TASKS);
        console.log('📋 [getTasks] Raw localStorage data:', rawData);
        const tasks = rawData ? JSON.parse(rawData) : [];
        console.log(`📋 Loaded ${tasks.length} tasks from localStorage`, tasks);
        return tasks;
    } catch (error) {
        console.error('❌ Error loading tasks:', error);
        return [];
    }
};

export const saveTasks = (tasks) => {
    try {
        const tasksToSave = Array.isArray(tasks) ? tasks : [];
        const jsonString = JSON.stringify(tasksToSave);
        localStorage.setItem(STORAGE_KEYS.TASKS, jsonString);
        console.log(`✅ Saved ${tasksToSave.length} tasks to localStorage`);
        return true;
    } catch (error) {
        console.error('❌ Error saving tasks:', error);
        // Check if quota exceeded
        if (error.name === 'QuotaExceededError') {
            alert('Espacio de almacenamiento lleno. Por favor, exporta y elimina algunos trabajos antiguos.');
        }
        return false;
    }
};

export const addTask = (task) => {
    const tasks = getTasks();
    const newTask = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    saveTasks(tasks);
    return newTask;
};

export const updateTask = (taskId, updates) => {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
        tasks[index] = {
            ...tasks[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        saveTasks(tasks);
        return tasks[index];
    }
    return null;
};

export const deleteTask = (taskId) => {
    const tasks = getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    saveTasks(filtered);
    return true;
};

// Mechanics Management
export const getMechanics = () => {
    try {
        const mechanics = localStorage.getItem(STORAGE_KEYS.MECHANICS);
        return mechanics ? JSON.parse(mechanics) : ['Juan Pérez', 'Carlos Gómez', 'María López'];
    } catch (error) {
        console.error('Error loading mechanics:', error);
        return ['Juan Pérez', 'Carlos Gómez', 'María López'];
    }
};

export const saveMechanics = (mechanics) => {
    try {
        localStorage.setItem(STORAGE_KEYS.MECHANICS, JSON.stringify(mechanics));
        return true;
    } catch (error) {
        console.error('Error saving mechanics:', error);
        return false;
    }
};

export const addMechanic = (name) => {
    const mechanics = getMechanics();
    if (!mechanics.includes(name)) {
        mechanics.push(name);
        saveMechanics(mechanics);
        return true;
    }
    return false;
};

export const deleteMechanic = (name) => {
    const mechanics = getMechanics();
    const filtered = mechanics.filter(m => m !== name);
    if (filtered.length < mechanics.length) {
        saveMechanics(filtered);
        return true;
    }
    return false;
};

// Export/Import Data
export const exportData = () => {
    const data = {
        tasks: getTasks(),
        mechanics: getMechanics(),
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mechanic-tracker-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

export const importData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.tasks) saveTasks(data.tasks);
                if (data.mechanics) saveMechanics(data.mechanics);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

// Clear all data
export const clearAllData = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(STORAGE_KEYS.TASKS);
        localStorage.removeItem(STORAGE_KEYS.MECHANICS);
        return true;
    }
    return false;
};
