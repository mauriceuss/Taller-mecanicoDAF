// Image handling utilities for compression and base64 conversion

/**
 * Compress and convert image to base64
 * @param {File} file - Image file
 * @param {number} maxWidth - Maximum width (default: 1200)
 * @param {number} maxHeight - Maximum height (default: 1200)
 * @param {number} quality - Compression quality 0-1 (default: 0.8)
 * @returns {Promise<string>} Base64 encoded image
 */
export const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64
                const base64 = canvas.toDataURL('image/jpeg', quality);
                resolve(base64);
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
export const validateImage = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!file) {
        return { valid: false, error: 'No se seleccionó ningún archivo' };
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Tipo de archivo no permitido. Use JPG, PNG o WebP' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'El archivo es demasiado grande. Máximo 10MB' };
    }

    return { valid: true };
};

/**
 * Process multiple images
 * @param {FileList} files - List of image files
 * @returns {Promise<Array<string>>} Array of base64 images
 */
export const processMultipleImages = async (files) => {
    const promises = Array.from(files).map(file => {
        const validation = validateImage(file);
        if (!validation.valid) {
            throw new Error(validation.error);
        }
        return compressImage(file);
    });

    return Promise.all(promises);
};

/**
 * Get image dimensions from base64
 * @param {string} base64 - Base64 encoded image
 * @returns {Promise<Object>} Image dimensions
 */
export const getImageDimensions = (base64) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = base64;
    });
};

/**
 * Create thumbnail from base64 image
 * @param {string} base64 - Base64 encoded image
 * @param {number} size - Thumbnail size (default: 150)
 * @returns {Promise<string>} Base64 thumbnail
 */
export const createThumbnail = (base64, size = 150) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext('2d');

            // Calculate crop dimensions for square thumbnail
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };

        img.onerror = reject;
        img.src = base64;
    });
};
