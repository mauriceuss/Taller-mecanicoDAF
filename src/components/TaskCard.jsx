import { useState } from 'react';
import './TaskCard.css';

function TaskCard({ task, onEdit, onDelete, style }) {
    const [showPhotos, setShowPhotos] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const getStatusBadge = (status) => {
        const badges = {
            'pending': { label: 'Pendiente', class: 'badge-pending' },
            'in-progress': { label: 'En Progreso', class: 'badge-in-progress' },
            'completed': { label: 'Completado', class: 'badge-completed' },
        };
        return badges[status] || badges.pending;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statusBadge = getStatusBadge(task.status);

    return (
        <>
            <div className="task-card fade-in" style={style}>
                {/* Card Header */}
                <div className="task-card-header">
                    <div className="task-title-section">
                        <h3 className="task-title">{task.title}</h3>
                        <span className={`badge ${statusBadge.class}`}>
                            {statusBadge.label}
                        </span>
                    </div>

                    <div className="task-actions">
                        <button
                            className="btn-icon btn-secondary"
                            onClick={() => onEdit(task)}
                            title="Editar"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M13.5 2.5L15.5 4.5L13.5 2.5ZM14.5 5.5L6 14H4V12L12.5 3.5L14.5 5.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="btn-icon btn-danger"
                            onClick={() => onDelete(task.id)}
                            title="Eliminar"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M4 5H14M6 5V3H12V5M7 8V12M11 8V12M5 5L6 15H12L13 5H5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Card Body */}
                <div className="task-card-body">
                    {/* Mechanic Info */}
                    <div className="task-info-row">
                        <div className="info-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                <path d="M5 15C5 12.5 7 11 10 11C13 11 15 12.5 15 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="info-content">
                            <div className="info-label">Mecánico</div>
                            <div className="info-value">{task.mechanic}</div>
                        </div>
                    </div>

                    {/* Vehicle Info */}
                    {task.vehicleInfo && (
                        <div className="task-info-row">
                            <div className="info-icon">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 10L5 6H15L17 10M3 10V15H4M3 10H17M17 10V15H16M4 15C4 15.5523 4.44772 16 5 16C5.55228 16 6 15.5523 6 15M4 15C4 14.4477 4.44772 14 5 14C5.55228 14 6 14.4477 6 15M16 15C16 15.5523 15.5523 16 15 16C14.4477 16 14 15.5523 14 15M16 15C16 14.4477 15.5523 14 15 14C14.4477 14 14 14.4477 14 15M6 15H14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <div className="info-label">Vehículo</div>
                                <div className="info-value">{task.vehicleInfo}</div>
                            </div>
                        </div>
                    )}

                    {/* Tasks List */}
                    {task.tasks && task.tasks.length > 0 && (
                        <div className="task-description">
                            <div className="task-description-header">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3 3H13M3 8H13M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <circle cx="3" cy="3" r="1" fill="currentColor" />
                                    <circle cx="3" cy="8" r="1" fill="currentColor" />
                                    <circle cx="3" cy="13" r="1" fill="currentColor" />
                                </svg>
                                Tareas a Realizar
                            </div>
                            <ol className="task-items-list">
                                {task.tasks.map((taskItem, index) => (
                                    <li key={index} className="task-item">
                                        {taskItem}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* Backward compatibility: Display old description format */}
                    {task.description && typeof task.description === 'string' && !task.tasks && (
                        <div className="task-description">
                            <p>{task.description}</p>
                        </div>
                    )}

                    {/* Hours */}
                    {task.estimatedHours && (
                        <div className="task-info-row">
                            <div className="info-icon">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <div className="info-label">Horas Estimadas</div>
                                <div className="info-value">{task.estimatedHours}h</div>
                            </div>
                        </div>
                    )}

                    {/* Photos */}
                    {task.photos && task.photos.length > 0 && (
                        <div className="task-photos-section">
                            <div className="photos-header">
                                <span className="photos-count">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                        <circle cx="6" cy="7" r="1.5" fill="currentColor" />
                                        <path d="M2 11L5 8L7 10L11 6L14 9V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V11Z" fill="currentColor" opacity="0.5" />
                                    </svg>
                                    {task.photos.length} {task.photos.length === 1 ? 'foto' : 'fotos'}
                                </span>
                                <button
                                    className="btn-text"
                                    onClick={() => setShowPhotos(!showPhotos)}
                                >
                                    {showPhotos ? 'Ocultar' : 'Ver fotos'}
                                </button>
                            </div>

                            {showPhotos && (
                                <div className="photos-grid">
                                    {task.photos.map((photo, index) => (
                                        <div
                                            key={index}
                                            className="photo-thumbnail"
                                            onClick={() => setSelectedPhoto(photo)}
                                        >
                                            <img src={photo} alt={`Foto ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Card Footer */}
                <div className="task-card-footer">
                    <div className="task-date">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <rect x="2" y="3" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
                            <path d="M2 6H12" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M5 2V4M9 2V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        {formatDate(task.createdAt)}
                    </div>
                    {task.updatedAt !== task.createdAt && (
                        <div className="task-updated">
                            Actualizado: {formatDate(task.updatedAt)}
                        </div>
                    )}
                </div>
            </div>

            {/* Photo Modal */}
            {selectedPhoto && (
                <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
                    <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="photo-modal-close"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <img src={selectedPhoto} alt="Foto ampliada" />
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskCard;
