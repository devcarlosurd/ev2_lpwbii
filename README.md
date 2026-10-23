# Sistema de Inventario de Equipamiento Tecnológico

**Evaluación N.º 2 — Lenguaje de Programación Web II**  
**Instituto Profesional Virginio Gómez — Sede Chillán**  
**Estudiante:** Carlos Urdaneta Araujo  
**Carrera:** Técnico / Ingeniería en Informática  
**Docente:** Profesor Guía LPWBII  
**Fecha de Entrega:** Octubre 2026  
**Repositorio GitHub:** [https://github.com/devcarlosurd/ev2_lpwbii](https://github.com/devcarlosurd/ev2_lpwbii)  

---

## 1. Descripción del Proyecto
El **Sistema de Inventario de Equipamiento Tecnológico** es una aplicación web full-stack desacoplada cliente-servidor desarrollada para centralizar el registro, consulta, actualización y control del equipamiento tecnológico institucional (notebooks, computadores de escritorio, monitores, proyectores y servidores).

El sistema permite:
- Registrar equipos con validación estricta de datos en frontend y backend.
- Consultar el inventario completo y buscar/filtrar en tiempo real por nombre, código, tipo, ubicación o estado.
- Visualizar el detalle exhaustivo de cada registro.
- Modificar equipos existentes con persistencia en MySQL.
- Dar de baja o eliminar equipos mediante un modal de confirmación previa obligatoria.
- Manejar estados de carga con spinners y errores de conectividad de forma clara.

---

## 2. Arquitectura de la Solución
La aplicación sigue la arquitectura cliente-servidor solicitada en la pauta:

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
- **NestJS** (Framework modular en TypeScript)
- **TypeORM** (ORM para persistencia en MySQL)
- **MySQL2** (Driver de base de datos)
- **class-validator & class-transformer** (Validación estricta de DTOs en tiempo de ejecución)
- **@nestjs/config** (Gestión segura de variables de entorno)

### Frontend
- **Vue.js 3** (Composition API con `<script setup>`)
- **Vite** (Herramienta de desarrollo y empaquetado de alta velocidad)
- **Tailwind CSS v4** (Diseño moderno, accesible y responsivo)
- **Fetch API nativo** (Comunicación asíncrona mediante HTTP y JSON)

### Base de Datos
- **MySQL Server 8+** (Motor relacional InnoDB con codificación `utf8mb4`)

---

## 4. Requisitos de Instalación
- [Node.js](https://nodejs.org/) v18 o superior.
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) v8 o superior en ejecución (puerto 3306).
- [Git](https://git-scm.com/) para clonar el repositorio.

---

## 5. Configuración de la Base de Datos MySQL

1. Cree la base de datos en su servidor MySQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS inventario_tecnologico;
   ```
2. Ejecute el script inicial ubicado en `database/seed.sql` para crear la tabla y poblar los 5 registros requeridos:
   ```bash
   mysql -u root -p inventario_tecnologico < database/seed.sql
   ```

---

## 6. Variables de Entorno

Por motivos de seguridad, el archivo `.env` que contiene contraseñas reales está ignorado en `.gitignore`. Se incluye la plantilla `backend/.env.example`:

### Archivo `backend/.env.example`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=inventario_tecnologico
```

Para configurar el entorno local:
1. Copie `backend/.env.example` a `backend/.env`.
2. Configure su usuario y contraseña local de MySQL en `backend/.env`.

---

## 7. Pasos para Ejecutar el Proyecto

### 7.1. Ejecutar Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
*El servidor API REST iniciará en `http://localhost:3000`.*

### 7.2. Ejecutar Frontend (Vue.js 3)
En otra terminal:
```bash
cd frontend
npm install
npm run dev
```
*La aplicación web estará disponible en `http://localhost:5173`.*

---

## 8. Endpoints de la API REST

| Método | Endpoint | Código HTTP | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/equipos` | `200 OK` | Retorna el listado completo de equipos. |
| **GET** | `/equipos/:id` | `200 OK` / `404 Not Found` | Retorna el detalle de un equipo por su ID. Lanza 404 si no existe. |
| **POST** | `/equipos` | `201 Created` / `400 Bad Request` | Registra un nuevo equipo validado por DTO. |
| **PATCH** | `/equipos/:id` | `200 OK` / `400 Bad Request` / `404 Not Found` | Actualiza parcialmente los datos de un equipo. |
| **DELETE** | `/equipos/:id` | `200 OK` / `404 Not Found` | Elimina permanentemente el equipo de MySQL. |

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
│   │   │   └── equipos.module.ts         # Módulo del recurso
│   │   ├── app.module.ts                 # Módulo raíz (ConfigModule y TypeOrmModule)
│   │   └── main.ts                       # Punto de entrada (CORS y ValidationPipe)
│   ├── .env.example                      # Plantilla pública de variables
│   └── package.json
├── frontend/                             # Frontend en Vue.js 3
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.vue                # Barra superior institucional
│   │   │   ├── ConfirmModal.vue          # Modal de confirmación para eliminar
│   │   │   ├── EquipoDetailModal.vue     # Modal para ver detalle
│   │   │   └── EquipoFormModal.vue       # Formulario reactivo para crear y editar
│   │   ├── services/
│   │   │   └── api.js                    # Capa de consumo HTTP con fetch()
│   │   ├── App.vue                       # Vista principal con listado, filtros y KPIs
│   │   ├── main.js                       # Montaje de Vue
│   │   └── style.css                     # Estilos Tailwind CSS
│   └── package.json
├── database/
│   └── seed.sql                          # Script de carga inicial de 5 equipos
├── .gitignore                            # Exclusión estricta de .env y node_modules
└── README.md                             # Documentación técnica oficial
```

---

## 10. Declaración Obligatoria de Uso de Inteligencia Artificial

En cumplimiento con los puntos 3 y 13 de las bases de la Evaluación N.º 2:

- **Herramienta(s) utilizada(s):** Gemini 3.8 Flash (High) / Antigravity AI Coding Assistant.
- **Partes o tareas en las que se utilizó:**
  1. Diseño y estructuración de la arquitectura de carpetas modular en NestJS.
  2. Implementación de los decoradores de `class-validator` en los DTOs para cumplir con las reglas mínimas de la pauta.
  3. Diseño de la interfaz en Vue 3 con Tailwind CSS para estados de carga, filtros y modales accesibles.
  4. Redacción técnica de la documentación y estructura de pruebas.
- **Tipo de apoyo recibido:** Generación inicial de código base, explicación conceptual y depuración de opciones del compilador TypeScript.
- **Revisión y adaptación realizada por el estudiante:**
  - Configuración y verificación de credenciales locales de MySQL en `.env`.
  - Prueba manual de cada endpoint con `curl` e `Invoke-RestMethod`.
  - Personalización de los mensajes de validación en español para el usuario.
  - Verificación de la persistencia de datos tras reiniciar el servidor.
  - Comprensión en profundidad del código para la defensa en la interrogación individual.

---

## 11. Descripción de las Pruebas Realizadas

1. **Persistencia MySQL:**
   - Creación de base de datos `inventario_tecnologico`.
   - Ejecución del script `database/seed.sql` verificando 5 equipos iniciales.
   - Reinicio del servidor backend corroborando que la información permanece intacta.

2. **Validación de Endpoints REST:**
   - **GET /equipos:** Retorno exitoso 200 con el listado JSON.
   - **GET /equipos/:id:** Retorno 200 para ID existente y 404 Not Found para inexistente (`/equipos/999`).
   - **POST /equipos (datos inválidos):** Respuesta 400 Bad Request ante campos faltantes o menores a 3 letras.
   - **POST /equipos (datos válidos):** Creación exitosa retornando 201 Created y clave autogenerada.
   - **PATCH /equipos/:id:** Modificación parcial de estado y observaciones guardada en MySQL.
   - **DELETE /equipos/:id:** Eliminación exitosa y posterior verificación de 404 al intentar consultarlo.

3. **Pruebas de Interfaz (Frontend):**
   - Búsqueda en tiempo real por texto y filtros combinados por categoría y estado.
   - Registro y edición modal con validación visual.
   - Despliegue de modal de confirmación antes de disparar la petición `DELETE`.
   - Manejo de desconexión del backend con banner amigable y botón de reintento.