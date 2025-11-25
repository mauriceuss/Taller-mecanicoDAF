# 🔧 Registro de Trabajos - Mecánicos

Aplicación multiplataforma para registrar y gestionar trabajos de mecánicos con soporte para fotos y seguimiento de tareas.

## ✨ Características

- ✅ **Gestión de Tareas**: Crear, editar y eliminar tareas de trabajo
- 👨‍🔧 **Gestión de Mecánicos**: Asignar trabajos a diferentes mecánicos
- 📸 **Soporte de Fotos**: Subir múltiples fotos por tarea con compresión automática
- 📊 **Estadísticas**: Vista rápida del estado de las tareas
- 🔍 **Búsqueda y Filtros**: Buscar y filtrar tareas por mecánico, estado o texto
- 💾 **Almacenamiento Local**: Datos guardados localmente en el dispositivo
- 📤 **Exportar/Importar**: Respaldo de datos en formato JSON
- 📱 **Responsive**: Funciona en móvil, tablet y escritorio
- 🎨 **Diseño Premium**: Interfaz moderna con tema oscuro y animaciones suaves

## 🚀 Instalación

### Requisitos Previos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)

Si no tienes Node.js instalado, descárgalo desde: https://nodejs.org/

### Pasos de Instalación

1. **Instalar dependencias**:
   ```bash
   cd mechanic-tracker
   npm install
   ```

2. **Iniciar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`

3. **Para usar como aplicación de escritorio** (Electron):
   ```bash
   # En una terminal, inicia el servidor de desarrollo
   npm run dev
   
   # En otra terminal, inicia Electron
   npm run electron
   ```

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

## 📱 Uso en Móvil (PWA)

1. Abre la aplicación en tu navegador móvil
2. En Chrome/Edge: Toca el menú (⋮) → "Agregar a pantalla de inicio"
3. En Safari (iOS): Toca el botón compartir → "Agregar a pantalla de inicio"

## 🎯 Cómo Usar

### Crear una Tarea

1. Haz clic en **"Nueva Tarea"**
2. Completa la información:
   - Título de la tarea (requerido)
   - Descripción del trabajo
   - Información del vehículo
   - Mecánico asignado (requerido)
   - Estado (Pendiente, En Progreso, Completado)
   - Horas estimadas
3. Sube fotos arrastrándolas o haciendo clic en el área de carga
4. Haz clic en **"Crear Tarea"**

### Editar una Tarea

1. Haz clic en el icono de editar (✏️) en la tarjeta de la tarea
2. Modifica los campos necesarios
3. Haz clic en **"Actualizar Tarea"**

### Eliminar una Tarea

1. Haz clic en el icono de eliminar (🗑️) en la tarjeta de la tarea
2. Confirma la eliminación

### Agregar un Nuevo Mecánico

1. Al crear/editar una tarea, haz clic en **"Nuevo"** junto al selector de mecánico
2. Ingresa el nombre del mecánico
3. Haz clic en **"Agregar"**

### Buscar y Filtrar

- Usa la barra de búsqueda para buscar por título, descripción o mecánico
- Filtra por estado: Todos, Pendiente, En Progreso, Completado
- Filtra por mecánico específico

### Exportar/Importar Datos

**Exportar**:
1. Haz clic en **"Exportar"**
2. Se descargará un archivo JSON con todos tus datos

**Importar**:
1. Haz clic en **"Importar"**
2. Selecciona un archivo JSON previamente exportado
3. Tus datos se restaurarán

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Electron** - Para aplicación de escritorio
- **LocalStorage** - Almacenamiento de datos
- **Vanilla CSS** - Estilos personalizados
- **Canvas API** - Compresión de imágenes

## 📂 Estructura del Proyecto

```
mechanic-tracker/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/
│   │   ├── TaskCard.jsx       # Tarjeta de tarea
│   │   ├── TaskCard.css
│   │   ├── TaskForm.jsx       # Formulario de tarea
│   │   ├── TaskForm.css
│   │   ├── TaskList.jsx       # Lista de tareas
│   │   ├── TaskList.css
│   │   ├── PhotoUpload.jsx    # Componente de carga de fotos
│   │   └── PhotoUpload.css
│   ├── utils/
│   │   ├── storage.js         # Funciones de almacenamiento
│   │   └── imageHandler.js    # Procesamiento de imágenes
│   ├── styles/
│   │   └── index.css          # Estilos globales
│   ├── App.jsx                # Componente principal
│   ├── App.css
│   └── main.jsx               # Punto de entrada
├── electron.js                # Proceso principal de Electron
├── vite.config.js             # Configuración de Vite
├── package.json
└── README.md
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `src/styles/index.css`:

```css
:root {
  --color-accent-primary: #3b82f6;  /* Color principal */
  --color-accent-secondary: #8b5cf6; /* Color secundario */
  /* ... más colores */
}
```

### Agregar Nuevos Campos

1. Actualiza el estado en `TaskForm.jsx`
2. Agrega el campo en el formulario
3. Muestra el campo en `TaskCard.jsx`

## 🐛 Solución de Problemas

### Las fotos no se cargan
- Verifica que el formato sea JPG, PNG o WebP
- Asegúrate de que el tamaño sea menor a 10MB

### Los datos se perdieron
- Los datos se guardan en LocalStorage del navegador
- No borres los datos del navegador
- Usa la función de exportar regularmente para hacer respaldos

### La aplicación no se ve bien
- Asegúrate de usar un navegador moderno (Chrome, Edge, Firefox, Safari)
- Limpia la caché del navegador

## 📄 Licencia

MIT License - Libre para uso personal y comercial

## 🤝 Soporte

Si encuentras algún problema o tienes sugerencias, por favor crea un issue en el repositorio.

---

**Desarrollado con ❤️ para mecánicos profesionales**
