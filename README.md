# 🖥️ CDP Challenge - Web Automation

Este proyecto es una suite de automatización de pruebas para el sitio web de **Central de Pasajes**, desarrollada como parte de un desafío técnico.

## 🚀 Tecnologías Utilizadas

- **🎭 Playwright**: Framework de automatización moderno y rápido.
- **🟦 TypeScript**: Lenguaje que añade tipado estático, mejorando el mantenimiento y legibilidad.
- **🟢 Node.js**: Entorno de ejecución para JavaScript.

## 🛠️ Instalación y Configuración

Siga estos pasos para configurar el entorno localmente:

1. **Clonar el repositorio** (si aplica).
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Instalar los navegadores de Playwright**:
   ```bash
   npx playwright install
   ```

## 📋 Ejecución de Pruebas

Se han configurado scripts personalizados en el `package.json` para facilitar la ejecución:

- **Ejecutar todas las pruebas**:
  ```bash
  npm test
  ```
- **Ejecutar pruebas de búsqueda solamente**:
  ```bash
  npm run test:search
  ```
- **Ejecutar pruebas de error y fallas**:
  ```bash
  npm run test:error
  ```

Para ver el reporte HTML después de la ejecución:
```bash
npx playwright show-report
```

## 🏗️ Arquitectura: Patrón Page Object Model (POM)

El proyecto utiliza el patrón **Page Object Model**, el cual es una de las mejores prácticas en automatización. Esta arquitectura permite separar la lógica de las pruebas de la lógica de interacción con la página.

### Estructura de Carpetas:

- **`src/locators/`**: Contiene únicamente los selectores de los elementos. Esto facilita el mantenimiento si el diseño web cambia.
- **`src/pages/`**: Contiene los métodos de interacción. Cada página (Home, Tickets) tiene su propia clase que extiende de `BasePage`.
- **`src/specs/`**: Contiene los archivos de prueba (.spec.ts) donde se definen los escenarios y aserciones.
- **`src/helpers/`**: Funciones de utilidad (ej. manejo de fechas).
- **`src/schema/`**: Definición de interfaces para asegurar que los datos de prueba sean consistentes.

### Ventajas del POM en este Proyecto:
- **Reutilización**: Los métodos creados en las "Pages" pueden ser usados en múltiples pruebas.
- **Mantenibilidad**: Si un botón cambia su ID, solo se actualiza en un lugar (Locators).
- **Legibilidad**: Los archivos de prueba (`specs`) son fáciles de leer ya que usan nombres de métodos descriptivos como `searchOneWayTickets`.

## ⚙️ CI/CD y Automatización

El proyecto cuenta con un flujo de trabajo en **GitHub Actions** para asegurar la calidad continua:

- **Ejecución Programada**: Las pruebas se ejecutan automáticamente todos los **lunes a las 15:00 ART** (18:00 UTC).
- **Ejecución por Eventos**: Se dispara automáticamente en cada `push` o `pull_request` a las ramas principales.
- **Reportes**: Los resultados y reportes HTML se guardan como artefactos en cada ejecución de GitHub Actions.

---
*Desarrollado para el desafío técnico de CDP.*
