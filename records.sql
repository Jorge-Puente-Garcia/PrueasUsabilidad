CREATE TABLE registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    nivel DECIMAL(10,2) NOT NULL,
    tiempo DECIMAL(10,2) NOT NULL
);