# 🔷 Challenge Técnico para QA Automation

## Objetivo

Evaluar la capacidad del candidato para desarrollar pruebas automatizadas utilizando Playwright, aplicando buenas prácticas de automatización para Web y APIs, y asegurando una arquitectura de pruebas eficiente y documentada.

Se espera que el candidato demuestre habilidades avanzadas en automatización de pruebas, conocimiento en validación de APIs y UI, y una comprensión básica de CI/CD.

## ✅ Descripción del Challenge

El candidato deberá implementar una solución de pruebas automatizadas utilizando Playwright (JavaScript o TypeScript) para:

### 1. Pruebas de UI

Automatizar la validación de la funcionalidad de búsqueda en el sitio `centraldepasajes.com.ar`, asegurando que:

- ✔ Se puedan realizar búsquedas correctamente.
- ✔ Los resultados de búsqueda sean visibles y correctos.
- ✔ Se validan distintos escenarios (búsqueda válida, sin resultados, error en la búsqueda, etc.).

### 2. Pruebas de Mobile Automation

- El candidato deberá crear en el mismo repositorio (o en una carpeta dedicada) una suite de automatización mobile usando:
  - Appium + JavaScript
  - BrowserStack App Automate
  - BrowserStack Sample App (la app sample disponible en tu cuenta de BrowserStack).
- Implementar al menos 2 Happy Paths (end-to-end o flujos completos) sobre la BrowserStack Sample App.
- Cada flujo debe validar un resultado final observable (por ejemplo: navegación exitosa a una pantalla, carga de un contenido, confirmación visible, etc.).
- Los flows específicos quedan a criterio del candidato.
- Los tests deben correr en al menos 1 dispositivo real (Android o iOS) en BrowserStack.
- BrowserStack credentials deben manejarse con variables de entorno:
  - **BROWSERSTACK_USERNAME**
  - **BROWSERSTACK_ACCESS_KEY**

#### 🔹📌 Importante:

Las pruebas de ambos stacks, tanto de Mobile como de la Web deben implementarse siguiendo como norte:

- ➡ Escalabilidad.
- ➡ Organización.
- ➡ Legibilidad.
- ➡ Código Limpio.

### 3. Configuración de CI/CD (GitHub Actions)

El candidato deberá:

- ✔ En uno de los dos repositorios, configurar un GitHub Action que ejecute las pruebas automáticamente todos los lunes a las 15:00 (GMT-3, Argentina).

## 🎯 Requisitos Técnicos

### 📌 1. Implementación Técnica

- **Pruebas de UI:** Automatización con Playwright sobre centraldepasajes.com.ar, cubriendo diferentes escenarios. (Ver punto 1: Pruebas de UI)
- **Pruebas de Mobile Automation:** Implementación de tests con Appium usando Javascript + BrowserStack.
- **Estructura del código:** Arquitectura modular y escalable.
- **Estructura del Proyecto:** Organizar el proyecto de manera escalable, con separación clara entre tests, helpers y config.

### 📌 2. Buenas Prácticas y Documentación

- Código limpio, reutilizable y estructurado.
- README con:
  - Pasos detallados para ejecutar las pruebas.
  - Explicación de la arquitectura del proyecto.
  - Justificación de las decisiones técnicas.
- Comentarios y logs claros en el código para facilitar la lectura y depuración.

### 📌 3. Configuración de CI/CD

- Implementar un GitHub Action que ejecute los tests automáticamente todos los lunes a las 15:00 (hora Argentina).
- El workflow debe instalar las dependencias necesarias y ejecutar las pruebas correctamente.

## 📌 Entregas

- **Formato:** Subir el código a dos repositorios públicos en GitHub:
  - Un Repositorio Público con el proyecto de Playwright para UI.
  - Un Repositorio Público con el proyecto de Appium.
- **Tiempo estimado:** 3 días.
- **Documentación requerida:**
  - README con instrucciones claras sobre cómo ejecutar las pruebas y detalles de la implementación.
  - **Pregunta extra en el README:**
    - Imagina que ya estamos trabajando juntos y que la suite de pruebas creciera a 500 tests, ¿qué cambios harías o sugerirías en la estructura?
    - Si hay flakiness en un test, ¿cómo lo manejarías?
  - Explicación de decisiones técnicas (por qué se eligieron ciertos enfoques). Puede ser un .md en la raíz del proyecto o en el mismo README, lo importante es contar con tu opinión sobre estos temas. Comentar de manera simple lo que consideres importante o lo que quieras destacar de tu trabajo.

## 🔹Criterios de evaluación

- Correctitud y funcionalidad de las pruebas.
- Calidad del código y arquitectura.
- Aplicación de buenas prácticas de automatización.
- Implementación del GitHub Action correctamente.
- Claridad y detalle en la documentación.
- Proactividad y criterio propio.

## 🚀 Tecnologías Requeridas

- ✅ Playwright (JavaScript)
- ✅ Appium (JavaScript)
- ✅ GitHub Actions para la ejecución automática de los tests

## 🔥 Notas Finales

- Este challenge representa un escenario real de trabajo, evaluando habilidades clave en automatización de UI y Aplicaciones Móviles.
- No buscamos una solución perfecta, sino una implementación que demuestre conocimiento y experiencia en Playwright y Appium así como en automatización en general.
- Se valorará especialmente la organización, la claridad del código y la escalabilidad de la solución.

¡Éxitos con el challenge!