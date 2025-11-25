# 🚀 Guía de Instalación Rápida

## Paso 1: Instalar Node.js

Si aún no tienes Node.js instalado:

1. Ve a https://nodejs.org/
2. Descarga la versión **LTS (recomendada)**
3. Ejecuta el instalador
4. Sigue las instrucciones (acepta las opciones por defecto)
5. Reinicia tu computadora después de la instalación

## Paso 2: Verificar la Instalación

Abre PowerShell o CMD y ejecuta:

```bash
node --version
npm --version
```

Deberías ver los números de versión. Si ves algún error, reinicia tu computadora.

## Paso 3: Instalar Dependencias del Proyecto

1. Abre PowerShell o CMD
2. Navega a la carpeta del proyecto:
   ```bash
   cd "d:\Aplicacion de movil, escritorio trabajos talleres\mechanic-tracker"
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

   Esto puede tomar unos minutos la primera vez.

## Paso 4: Iniciar la Aplicación

### Opción A: En el Navegador (Recomendado para empezar)

```bash
npm run dev
```

Luego abre tu navegador en: http://localhost:5173

### Opción B: Como Aplicación de Escritorio

**Terminal 1** (deja esta corriendo):
```bash
npm run dev
```

**Terminal 2** (en otra ventana):
```bash
npm run electron
```

## 🎉 ¡Listo!

La aplicación debería estar funcionando. Puedes:

- ✅ Crear tareas
- ✅ Asignar mecánicos
- ✅ Subir fotos
- ✅ Filtrar y buscar
- ✅ Exportar/importar datos

## ⚠️ Solución de Problemas

### Error: "npm no se reconoce"
- Node.js no está instalado o no está en el PATH
- Solución: Reinstala Node.js y reinicia tu computadora

### Error al instalar dependencias
- Solución: Elimina la carpeta `node_modules` y ejecuta `npm install` de nuevo

### El puerto 5173 está en uso
- Solución: Cierra otras aplicaciones que puedan estar usando ese puerto o cambia el puerto en `vite.config.js`

## 📱 Usar en Móvil

1. Asegúrate de que tu móvil y computadora estén en la misma red WiFi
2. Inicia la aplicación con `npm run dev`
3. Busca la dirección que aparece en la terminal (ejemplo: `http://192.168.1.100:5173`)
4. Abre esa dirección en el navegador de tu móvil
5. Agrega la aplicación a tu pantalla de inicio para usarla como app

---

**¿Necesitas ayuda?** Revisa el archivo README.md para más detalles.
