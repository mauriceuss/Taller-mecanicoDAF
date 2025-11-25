# 🔍 Guía de Prueba - Depuración de Persistencia

## Pasos para Probar

### 1. Inicia el Servidor
```bash
npm run dev
```

### 2. Abre la Consola del Navegador
- Presiona **F12**
- Ve a la pestaña **Console**

### 3. Observa los Logs al Cargar la Página

Deberías ver algo como esto:

```
🔵 [LOAD] useEffect ejecutándose...
🔵 [LOAD] isInitialMount.current: true
📋 Loaded 0 tasks from localStorage
🔵 [LOAD] Tareas cargadas: []
🔵 [LOAD] isInitialMount ahora es: false

🟡 [SAVE] useEffect ejecutándose...
🟡 [SAVE] isInitialMount.current: true
🟡 [SAVE] tasks actuales: []
🔴 [SAVE] Saltando guardado (primera carga)

🟡 [SAVE] useEffect ejecutándose...
🟡 [SAVE] isInitialMount.current: false
🟡 [SAVE] tasks actuales: []
🟢 [SAVE] Guardando tareas...
✅ Saved 0 tasks to localStorage
```

### 4. Agrega una Tarea

1. Haz clic en **"Nueva Tarea"**
2. Completa el formulario
3. Guarda

**Deberías ver en la consola:**
```
🟡 [SAVE] useEffect ejecutándose...
🟡 [SAVE] isInitialMount.current: false
🟡 [SAVE] tasks actuales: [{ id: "...", title: "...", ... }]
🟢 [SAVE] Guardando tareas...
✅ Saved 1 tasks to localStorage
```

### 5. Verifica localStorage Manualmente

En la consola, ejecuta:
```javascript
localStorage.getItem('mechanic_tasks')
```

**Deberías ver:** Un string JSON con tus tareas

### 6. Recarga la Página (F5)

**Deberías ver:**
```
🔵 [LOAD] useEffect ejecutándose...
🔵 [LOAD] isInitialMount.current: true
📋 Loaded 1 tasks from localStorage  ← ¡IMPORTANTE!
🔵 [LOAD] Tareas cargadas: [{ ... }]
🔵 [LOAD] isInitialMount ahora es: false
```

---

## 🚨 Qué Reportar

Por favor copia y pega aquí:

1. **Los logs completos de la consola** cuando:
   - Cargas la página por primera vez
   - Agregas una tarea
   - Recargas la página

2. **El resultado de ejecutar esto en la consola:**
   ```javascript
   localStorage.getItem('mechanic_tasks')
   ```

3. **¿Las tareas aparecen visualmente después de recargar?** Sí/No

---

## 🔧 Verificación Rápida de localStorage

Ejecuta esto en la consola:

```javascript
// Limpiar todo
localStorage.clear();

// Agregar datos de prueba
localStorage.setItem('mechanic_tasks', JSON.stringify([
  {
    id: "test1",
    title: "Tarea de Prueba",
    description: "Esta es una prueba",
    mechanic: "Juan Pérez",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]));

// Verificar que se guardó
console.log('Guardado:', localStorage.getItem('mechanic_tasks'));

// Recargar
location.reload();
```

**Después de recargar:** ¿Ves la "Tarea de Prueba"?
