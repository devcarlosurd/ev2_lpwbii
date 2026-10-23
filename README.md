# Sistema de Inventario de Equipamiento Tecnológico

**Evaluación N.º 2 — Lenguaje de Programación Web II**  
**Instituto Profesional Virginio Gómez — Sede Chillán**  
**Estudiante:** Carlos Urdaneta Araujo  

---

## 📌 Descripción del Proyecto
Aplicación web cliente-servidor para la administración y control centralizado del inventario de equipamiento tecnológico de una institución. Permite registrar, consultar, editar y dar de baja equipos tecnológicos con validaciones tanto en cliente como en servidor.

---

## 🏗️ Arquitectura del Sistema
El sistema sigue una arquitectura desacoplada cliente-servidor:
- **Frontend:** Vue.js 3 (Single Page Application con Vite).
- **Backend:** API REST construida con NestJS y TypeScript.
- **Base de Datos:** MySQL gestionada mediante el ORM TypeORM.
- **Comunicación:** Protocolo HTTP transportando datos en formato JSON.

---

## 🚀 Estructura del Repositorio
```text
ev2_lpwbii/
├── backend/          # API REST desarrollada en NestJS
│   ├── src/          # Controladores, Servicios, Módulos, DTOs y Entidades
│   ├── .env.example  # Plantilla de variables de entorno (sin credenciales)
│   └── package.json
├── frontend/         # Interfaz de usuario desarrollada en Vue.js 3 (Vite)
│   ├── src/          # Componentes reactivos, vistas y servicios de API
│   └── package.json
├── .gitignore        # Archivos y carpetas omitidos (node_modules, .env, etc.)
└── README.md         # Documentación oficial del proyecto
```
