import { useState, useEffect } from 'react';
import { getMechanics, addMechanic, deleteMechanic } from '../utils/storage';
import './MechanicManager.css';

function MechanicManager({ onClose }) {
    const [mechanics, setMechanics] = useState([]);
    const [newMechanic, setNewMechanic] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        setMechanics(getMechanics());
    }, []);

    const handleAddMechanic = () => {
        if (newMechanic.trim()) {
            if (addMechanic(newMechanic.trim())) {
                setMechanics(getMechanics());
                setNewMechanic('');
                setIsAdding(false);
            } else {
                alert('Este mecánico ya existe en la lista');
            }
        }
    };

    const handleDeleteMechanic = (name) => {
        if (confirm(`¿Estás seguro de que quieres eliminar a "${name}"?\n\nNota: Las tareas existentes asignadas a este mecánico no se verán afectadas.`)) {
            if (deleteMechanic(name)) {
                setMechanics(getMechanics());
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddMechanic();
        }
    };

    return (
        <div className="mechanic-manager-overlay" onClick={onClose}>
            <div className="mechanic-manager" onClick={(e) => e.stopPropagation()}>
                <div className="mechanic-manager-header">
                    <div>
                        <h2>Gestionar Mecánicos</h2>
                        <p>Administra la lista de mecánicos disponibles</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="mechanic-manager-content">
                    {/* Add Mechanic Section */}
                    <div className="add-mechanic-section">
                        {!isAdding ? (
                            <button
                                className="btn btn-primary add-mechanic-btn"
                                onClick={() => setIsAdding(true)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Agregar Nuevo Mecánico
                            </button>
                        ) : (
                            <div className="add-mechanic-form">
                                <input
                                    type="text"
                                    value={newMechanic}
                                    onChange={(e) => setNewMechanic(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nombre del mecánico"
                                    className="mechanic-input"
                                    autoFocus
                                />
                                <button
                                    className="btn btn-success"
                                    onClick={handleAddMechanic}
                                >
                                    Agregar
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setNewMechanic('');
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mechanics List */}
                    <div className="mechanics-list">
                        <h3>Mecánicos Registrados ({mechanics.length})</h3>
                        {mechanics.length === 0 ? (
                            <div className="empty-mechanics">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                                    <path d="M30 20V40M20 30H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                                </svg>
                                <p>No hay mecánicos registrados</p>
                            </div>
                        ) : (
                            <div className="mechanics-grid">
                                {mechanics.map((mechanic) => (
                                    <div key={mechanic} className="mechanic-card">
                                        <div className="mechanic-info">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                                                <path d="M6 20C6 16.6863 8.68629 14 12 14C15.3137 14 18 16.6863 18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            <span className="mechanic-name">{mechanic}</span>
                                        </div>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteMechanic(mechanic)}
                                            title="Eliminar mecánico"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M4 5H14M7 8V12M11 8V12M5 5L6 15H12L13 5M8 5V3H10V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MechanicManager;
