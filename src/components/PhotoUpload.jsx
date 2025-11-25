import { useState, useRef } from 'react';
import { compressImage, validateImage } from '../utils/imageHandler';
import './PhotoUpload.css';

function PhotoUpload({ photos = [], onChange }) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFiles = async (files) => {
        setUploading(true);
        const newPhotos = [...photos];

        try {
            for (const file of Array.from(files)) {
                const validation = validateImage(file);

                if (!validation.valid) {
                    alert(validation.error);
                    continue;
                }

                try {
                    const compressed = await compressImage(file);
                    newPhotos.push(compressed);
                } catch (error) {
                    console.error('Error compressing image:', error);
                    alert(`Error al procesar ${file.name}`);
                }
            }

            onChange(newPhotos);
        } finally {
            setUploading(false);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    const handleRemovePhoto = (index) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        onChange(newPhotos);
    };

    return (
        <div className="photo-upload">
            {/* Upload Area */}
            <div
                className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !uploading && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="upload-loading">
                        <div className="spinner"></div>
                        <p>Procesando imágenes...</p>
                    </div>
                ) : (
                    <>
                        <div className="upload-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                                <circle cx="18" cy="22" r="3" fill="currentColor" />
                                <path d="M8 34L16 26L22 32L32 22L40 30V38C40 39.1046 39.1046 40 38 40H10C8.89543 40 8 39.1046 8 38V34Z" fill="currentColor" opacity="0.3" />
                                <path d="M24 8V18M24 8L20 12M24 8L28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="upload-text">
                            <strong>Haz clic para subir</strong> o arrastra las fotos aquí
                        </p>
                        <p className="upload-hint">
                            JPG, PNG o WebP (máx. 10MB por foto)
                        </p>
                    </>
                )}
            </div>

            {/* Photos Preview */}
            {photos.length > 0 && (
                <div className="photos-preview">
                    <div className="photos-preview-header">
                        <span className="photos-count">
                            {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
                        </span>
                        {photos.length > 0 && (
                            <button
                                type="button"
                                className="btn-text-danger"
                                onClick={() => onChange([])}
                            >
                                Eliminar todas
                            </button>
                        )}
                    </div>

                    <div className="photos-preview-grid">
                        {photos.map((photo, index) => (
                            <div key={index} className="photo-preview-item">
                                <img src={photo} alt={`Preview ${index + 1}`} />
                                <button
                                    type="button"
                                    className="photo-remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemovePhoto(index);
                                    }}
                                    title="Eliminar foto"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M4 4L12 12M4 12L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <div className="photo-index">{index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhotoUpload;
