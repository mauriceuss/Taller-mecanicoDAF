import { useState } from 'react';
import { getMechanics, addMechanic } from '../utils/storage';
import { processMultipleImages } from '../utils/imageHandler';
import PhotoUpload from './PhotoUpload';
import './TaskForm.css';

function TaskForm({ task, onSubmit, onCancel }) {
    // Convert old description format to tasks array if needed
    const initializeTasks = () => {
        if (task?.tasks && Array.isArray(task.tasks)) {
            return task.tasks;
        } else if (task?.description && typeof task.description === 'string') {
            // Convert old description to single task for backward compatibility
            return task.description.trim() ? [task.description] : [];
        }
        return [];
    };

    const [formData, setFormData] = useState({
        title: task?.title || '',
        tasks: initializeTasks(),
        mechanic: task?.mechanic || '',
        status: task?.status || 'pending',
        photos: task?.photos || [],
        vehicleInfo: task?.vehicleInfo || '',
        estimatedHours: task?.estimatedHours || '',
    });

    const [mechanics, setMechanics] = useState(getMechanics());
    const [showAddMechanic, setShowAddMechanic] = useState(false);
    const [newMechanic, setNewMechanic] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newTaskInput, setNewTaskInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddMechanic = () => {
        if (newMechanic.trim()) {
            if (addMechanic(newMechanic.trim())) {
                setMechanics(getMechanics());
                setFormData(prev => ({ ...prev, mechanic: newMechanic.trim() }));
                setNewMechanic('');
                setShowAddMechanic(false);
            } else {
                alert('Este mecánico ya existe');
            }
        }
    };

    const handlePhotosChange = (photos) => {
        setFormData(prev => ({ ...prev, photos }));
    };

    const handleAddTask = () => {
        if (newTaskInput.trim()) {
            setFormData(prev => ({
                ...prev,
                tasks: [...prev.tasks, newTaskInput.trim()]
            }));
            setNewTaskInput('');
        }
    };

    const handleRemoveTask = (index) => {
        setFormData(prev => ({
            ...prev,
            tasks: prev.tasks.filter((_, i) => i !== index)
        }));
    };

    const handleTaskKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Por favor ingresa un título para la tarea');
            return;
        }

        if (!formData.mechanic) {
            alert('Por favor selecciona un mecánico');
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(formData);
        } catch (error) {
            alert('Error al guardar la tarea: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="task-form-wrapper">
            <div className="task-form-header">
                <h2>{task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
                <p>Completa la información del trabajo a realizar</p>
            </div>

            <form onSubmit={handleSubmit} className="task-form">
                {/* Title */}
                <div className="input-group">
                    <label className="input-label">
                        Título de la Tarea <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Ej: Cambio de aceite y filtros"
                        required
                    />
                </div>

                {/* Task List */}
                <div className="input-group">
                    <label className="input-label">Tareas a Realizar</label>
                    <div className="task-list-manager">
                        <div className="task-input-group">
                            <input
                                type="text"
                                value={newTaskInput}
                                onChange={(e) => setNewTaskInput(e.target.value)}
                                onKeyPress={handleTaskKeyPress}
                                className="input-field"
                                placeholder="Escribe una tarea y presiona Enter o haz clic en Agregar..."
                            />
                            <button
                                type="button"
                                className="btn btn-success add-task-btn"
                                onClick={handleAddTask}
                                disabled={!newTaskInput.trim()}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Agregar
                            </button>
                        </div>

                        {formData.tasks.length > 0 ? (
                            <ol className="tasks-numbered-list">
                                {formData.tasks.map((taskItem, index) => (
                                    <li key={index} className="task-list-item">
                                        <span className="task-number">{index + 1}.</span>
                                        <span className="task-text">{taskItem}</span>
                                        <button
                                            type="button"
                                            className="remove-task-btn"
                                            onClick={() => handleRemoveTask(index)}
                                            title="Eliminar tarea"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <div className="empty-tasks-state">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                                    <path d="M24 16V32M16 24H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                                </svg>
                                <p>No hay tareas agregadas. Agrega tareas para describir el trabajo.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vehicle Info */}
                <div className="input-group">
                    <label className="input-label">Información del Vehículo</label>
                    <input
                        type="text"
                        name="vehicleInfo"
                        value={formData.vehicleInfo}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Ej: Toyota Corolla 2018 - ABC123"
                    />
                </div>

                {/* Mechanic Selection */}
                <div className="input-group">
                    <label className="input-label">
                        Mecánico Asignado <span className="required">*</span>
                    </label>

                    {!showAddMechanic ? (
                        <div className="mechanic-select-group">
                            <select
                                name="mechanic"
                                value={formData.mechanic}
                                onChange={handleChange}
                                className="select-field"
                                required
                            >
                                <option value="">Seleccionar mecánico...</option>
                                {mechanics.map(mech => (
                                    <option key={mech} value={mech}>{mech}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddMechanic(true)}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Nuevo
                            </button>
                        </div>
                    ) : (
                        <div className="add-mechanic-group">
                            <input
                                type="text"
                                value={newMechanic}
                                onChange={(e) => setNewMechanic(e.target.value)}
                                className="input-field"
                                placeholder="Nombre del nuevo mecánico"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMechanic())}
                            />
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleAddMechanic}
                            >
                                Agregar
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddMechanic(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                {/* Status and Hours Row */}
                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="select-field"
                        >
                            <option value="pending">Pendiente</option>
                            <option value="in-progress">En Progreso</option>
                            <option value="completed">Completado</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Horas Estimadas</label>
                        <input
                            type="number"
                            name="estimatedHours"
                            value={formData.estimatedHours}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="0"
                            min="0"
                            step="0.5"
                        />
                    </div>
                </div>

                {/* Photo Upload */}
                <div className="input-group">
                    <label className="input-label">Fotos del Trabajo</label>
                    <PhotoUpload
                        photos={formData.photos}
                        onChange={handlePhotosChange}
                    />
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : (task ? 'Actualizar Tarea' : 'Crear Tarea')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
