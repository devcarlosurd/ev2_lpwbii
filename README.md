# Sistema de Inventario de Equipamiento Tecnológico

**Evaluación N.º 2 — Lenguaje de Programación Web II**  
**Instituto Profesional Virginio Gómez — Sede Chillán**  
**Estudiante:** Carlos Urdaneta Araujo  
**Carrera:** Ingeniería de Ejecución en Informática / Técnico en Informática  
**Docente:** Profesor Guía LPWBII  
**Fecha de Entrega:** Octubre 2026  
**Repositorio GitHub:** [https://github.com/devcarlosurd/ev2_lpwbii](https://github.com/devcarlosurd/ev2_lpwbii)  

---

## 1. Descripción del Proyecto
El **Sistema de Inventario de Equipamiento Tecnológico** es una aplicación web full-stack desacoplada cliente-servidor desarrollada para centralizar el registro, consulta, actualización y control del equipamiento tecnológico de una institución (notebooks, estaciones de trabajo PC, monitores, proyectores y servidores).

El sistema permite:
- Registrar equipos con validación de datos tanto en frontend como en backend.
- Consultar el inventario completo y buscar/filtrar por nombre, código, tipo, ubicación o estado operativo.
- Ver el detalle exhaustivo de cada equipo.
- Modificar equipos existentes con persistencia en MySQL.
- Dar de baja o eliminar equipos mediante un modal de confirmación previa.
- Manejar de forma clara y visual los estados de carga y errores de conectividad HTTP.

---

## 2. Arquitectura de la Solución
La aplicación sigue estrictamente el flujo desacoplado cliente-servidor solicitado en la pauta:

```text
[ Usuario ]
     │
     ▼
[ Frontend Vue.js 3 + Vite ]
     │  (fetch() · Protocolo HTTP · JSON)
     ▼
[ Backend NestJS REST API ]
     ├── Controller (@Controller, @Get, @Post, @Patch, @Delete)
     ├── DTO & ValidationPipe (class-validator)
     ├── Service (@Injectable)
     └── TypeORM Repository (@Entity Equipo)
            │
            ▼
     [ Base de Datos MySQL: inventario_tecnologico ]
```

---

## 3. Tecnologías Utilizadas

### Backend
- **Node.js** (v24.x / compatible v18+)
- **NestJS** (Framework modular TypeScript)
- **TypeORM** (Object-Relational Mapping para MySQL)
- **MySQL2** (Driver de base de datos)
- **class-validator & class-transformer** (Validación estricta de DTOs en tiempo de ejecución)
- **@nestjs/config** (Gestión segura de variables de entorno)

### Frontend
- **Vue.js 3** (Composition API con sintaxis `<script setup>`)
- **Vite** (Herramienta de desarrollo y empaquetado de alta velocidad)
- **Tailwind CSS v4** (Diseño moderno, responsivo y accesible)
- **Fetch API nativo** (Comunicación asíncrona mediante HTTP y JSON)

### Base de Datos
- **MySQL Server 8+** (Motor relacional InnoDB con codificación `utf8mb4`)

---

## 4. Requisitos de Instalación
Asegúrese de contar con el siguiente software instalado en su entorno local:
- [Node.js](https://nodejs.org/) versión 18 o superior.
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) versión 8 o superior en ejecución (puerto estándar 3306).
- [Git](https://git-scm.com/) para clonar y gestionar el repositorio.

---

## 5. Configuración de la Base de Datos MySQL

1. Abra su gestor de MySQL preferido (MySQL Workbench, phpMyAdmin, DBeaver o consola MySQL).
2. Cree la base de datos ejecutando:
   ```sql
   CREATE DATABASE IF NOT EXISTS inventario_tecnologico;
   ```
3. Ejecute el script de datos iniciales ubicado en `database/seed.sql` para crear la tabla y poblar los 5 registros requeridos:
   ```bash
   # En Windows PowerShell o CMD:
   mysql -u root -p inventario_tecnologico < database/seed.sql
   ```

---

## 6. Variables de Entorno

Por motivos de seguridad y en cumplimiento de la pauta de evaluación, el archivo `.env` que contiene credenciales reales está excluido del repositorio en `.gitignore`. Se incluye la plantilla `backend/.env.example`:

### Archivo `backend/.env.example`:
```env
# Configuración del Servidor NestJS
PORT=3000

# Configuración de Base de Datos MySQL (Pauta IPVG)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=inventario_tecnologico
```

Para configurar su entorno:
1. Copie `backend/.env.example` a `backend/.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Ingrese su usuario y contraseña local de MySQL en `backend/.env`.

---

## 7. Pasos para Ejecutar el Proyecto

### 7.1. Ejecutar Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
*El servidor API REST iniciará en `http://localhost:3000` con CORS habilitado.*

### 7.2. Ejecutar Frontend (Vue.js 3)
En otra terminal:
```bash
cd frontend
npm install
npm run dev
```
*La interfaz web estará disponible en `http://localhost:5173`.*

---

## 8. Endpoints de la API REST

Todos los endpoints responden e interactúan en formato JSON bajo el prefijo `/equipos`:

| Método | Endpoint | Código HTTP | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/equipos` | `200 OK` | Retorna el listado completo de equipos ordenados cronológicamente. |
| **GET** | `/equipos/:id` | `200 OK` / `404 Not Found` | Retorna el detalle de un equipo según su ID primario. Si no existe, retorna 404. |
| **POST** | `/equipos` | `201 Created` / `400 Bad Request` | Registra un nuevo equipo validando obligatoriedad y reglas vía DTO. |
| **PATCH** | `/equipos/:id` | `200 OK` / `400 Bad Request` / `404 Not Found` | Actualiza parcialmente los campos del equipo indicado. |
| **DELETE** | `/equipos/:id` | `200 OK` / `404 Not Found` | Elimina permanentemente el equipo de la base de datos. |

---

## 9. Estructura del Proyecto

```text
ev2_lpwbii/
├── backend/                              # Backend en NestJS
│   ├── src/
│   │   ├── equipos/
│   │   │   ├── dto/
│   │   │   │   ├── create-equipo.dto.ts  # Validaciones con class-validator
│   │   │   │   └── update-equipo.dto.ts  # DTO parcial para modificaciones
│   │   │   ├── entities/
│   │   │   │   └── equipo.entity.ts      # Modelo de persistencia TypeORM
│   │   │   ├── equipos.controller.ts     # Manejador de rutas y verbos HTTP
│   │   │   ├── equipos.service.ts        # Lógica de negocio y repositorio
│   │   │   └── equipos.module.ts         # Módulo que encapsula el recurso
│   │   ├── app.module.ts                 # Módulo raíz (ConfigModule y TypeOrmModule)
│   │   └── main.ts                       # Punto de entrada (CORS y ValidationPipe)
│   ├── .env.example                      # Plantilla de variables de entorno
│   ├── package.json                      # Dependencias del backend
│   └── tsconfig.json                     # Configuración del compilador TypeScript
├── frontend/                             # Frontend en Vue.js 3
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.vue                # Encabezado institucional y estado
│   │   │   ├── ConfirmModal.vue          # Modal accesible de confirmación para eliminar
│   │   │   ├── EquipoDetailModal.vue     # Modal para consultar detalle del registro
│   │   │   └── EquipoFormModal.vue       # Formulario reactivo para crear y editar
│   │   ├── services/
│   │   │   └── api.js                    # Capa de consumo HTTP con fetch() nativo
│   │   ├── App.vue                       # Vista principal con listado, filtros y KPIs
│   │   ├── main.js                       # Montaje de la aplicación Vue
│   │   └── style.css                     # Estilos globales y Tailwind CSS
│   ├── package.json                      # Dependencias del frontend
│   └── vite.config.js                    # Configuración de compilación Vite
├── database/
│   └── seed.sql                          # Script de creación y carga de 5 registros
├── .gitignore                            # Exclusión estricta de .env y node_modules
└── README.md                             # Documentación técnica obligatoria
```

---

## 10. Declaración Obligatoria de Uso de Inteligencia Artificial

En cumplimiento con el punto 3 y 13 de las bases de la Evaluación N.º 2, se declara de manera explícita y transparente el uso de herramientas de Inteligencia Artificial:

- **Herramienta(s) utilizada(s):** Gemini 3.8 Flash (High) / Antigravity AI Coding Assistant.
- **Partes o tareas del proyecto en las que se utilizó:**
  1. Diseño y estructuración de la arquitectura de carpetas modular recomendada por NestJS.
  2. Implementación de los decoradores de `class-validator` en los DTOs para satisfacer con precisión las reglas de longitud mínima y valores enum exigidos por la pauta.
  3. Estructuración y diseño del frontend en Vue 3 con Tailwind CSS para asegurar estados de carga (spinners), errores amigables, modales accesibles y tarjetas estadísticas.
  4. Redacción técnica de la documentación y elaboración de la guía de estudio conceptual para la defensa oral.
- **Tipo de apoyo recibido:** Generación inicial de código base, explicación pedagógica de conceptos (Inyección de dependencias, ciclo de vida de peticiones HTTP, manejo de excepciones TypeORM y reactividad con Composition API) y depuración de opciones del compilador TypeScript.
- **Revisión y adaptación realizada por el estudiante:**
  - Configuración y validación manual de las credenciales locales de MySQL en `.env`.
  - Verificación manual del funcionamiento de cada endpoint con `Invoke-RestMethod` y `curl`.
  - Revisión exhaustiva y personalización de los mensajes de validación en español para el usuario.
  - Comprobación de que la base de datos conserve los registros persistidos tras reiniciar el servidor.
  - Estudio en profundidad del flujo completo de datos para garantizar la defensa autónoma durante la interrogación oral.

---

## 11. Descripción de las Pruebas Realizadas

1. **Persistencia y Conexión MySQL:**
   - Creación de base de datos `inventario_tecnologico`.
   - Ejecución del script `database/seed.sql` verificando la inserción de 5 equipos con diferentes tipos, estados y fechas válidas.
   - Reinicio del servidor backend corroborando que la información permanece intacta (persistencia real).

2. **Validación de Endpoints REST (Backend):**
   - **GET /equipos:** Comprobación de recepción del arreglo de objetos JSON con código HTTP 200.
   - **GET /equipos/:id:** Verificación de obtención del equipo solicitado y retorno de HTTP 404 (`NotFoundException`) ante un ID inexistente (ej. `/equipos/999`).
   - **POST /equipos con datos inválidos:** Envío de payload con campos faltantes o menores a 3 caracteres; el `ValidationPipe` rechazó la solicitud con HTTP 400 Bad Request y mensajes descriptivos.
   - **POST /equipos con datos válidos:** Creación exitosa retornando HTTP 201 Created y clave primaria autogenerada.
   - **PATCH /equipos/:id:** Modificación parcial de estado y observaciones, comprobando la actualización inmediata en MySQL.
   - **DELETE /equipos/:id:** Eliminación exitosa y posterior verificación de que el registro ya no existe (404 al intentar consultarlo nuevamente).

3. **Pruebas de Interfaz y Reactividad (Frontend):**
   - **Listado y Filtros:** Búsqueda en tiempo real por texto libre y filtrado combinado por categoría (Notebook, PC, Monitor) y estado (Disponible, En uso, Mantención, Baja).
   - **Formulario de Registro y Edición:** Apertura modal, validación visual de campos obligatorios y respuesta inmediata del estado tras el guardado.
   - **Eliminación Segura:** Despliegue de modal de confirmación antes de disparar la petición `DELETE` a la API.
   - **Manejo de Errores y Carga:** Simulación de caída del backend; la interfaz mostró el banner amigable de error y el botón "Reintentar conexión" sin colapsar la aplicación.
