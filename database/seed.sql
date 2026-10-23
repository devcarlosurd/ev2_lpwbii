-- Base de datos: inventario_tecnologico
-- Script de carga inicial de datos de prueba (mínimo 5 equipos requeridos por pauta IPVG)

USE `inventario_tecnologico`;

-- Creación de la tabla si no existe (TypeORM también la genera)
CREATE TABLE IF NOT EXISTS `equipos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `codigoInventario` VARCHAR(50) NOT NULL,
  `nombre` VARCHAR(150) NOT NULL,
  `tipo` VARCHAR(50) NOT NULL,
  `marca` VARCHAR(50) NOT NULL,
  `modelo` VARCHAR(50) NOT NULL,
  `ubicacion` VARCHAR(100) NOT NULL,
  `estado` VARCHAR(30) NOT NULL,
  `fechaAdquisicion` DATE NOT NULL,
  `observaciones` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Limpieza preventiva
TRUNCATE TABLE `equipos`;

-- Inserción de 5 registros coherentes con la institución tecnológica
INSERT INTO `equipos` (`codigoInventario`, `nombre`, `tipo`, `marca`, `modelo`, `ubicacion`, `estado`, `fechaAdquisicion`, `observaciones`) VALUES
('EQ-NOT-001', 'Notebook Docente Dell Latitude', 'Notebook', 'Dell', 'Latitude 5420', 'Laboratorio 1 - Sede Chillán', 'Disponible', '2024-03-15', 'Equipo asignado para docencia en informática'),
('EQ-PC-002', 'PC Escritorio HP EliteDesk', 'PC', 'HP', 'EliteDesk 800 G6', 'Oficina de Coordinación Académica', 'En uso', '2023-08-20', 'Incluye monitor dual y periféricos inalámbricos'),
('EQ-MON-003', 'Monitor Samsung 27 Pulgadas', 'Monitor', 'Samsung', 'F27T350FHL', 'Laboratorio 2 - Redes', 'Disponible', '2024-01-10', 'Conectividad HDMI y VGA funcionando'),
('EQ-PRO-004', 'Proyector Epson PowerLite', 'Proyector', 'Epson', 'PowerLite E20', 'Auditorio Principal', 'Mantención', '2022-11-05', 'En revisión periódica por cambio de lámpara'),
('EQ-NOT-005', 'Notebook Lenovo ThinkPad', 'Notebook', 'Lenovo', 'ThinkPad L14 Gen 3', 'Taller de Soporte Técnico', 'Baja', '2021-05-18', 'Placa madre con falla irreversible, dado de baja para repuestos');
