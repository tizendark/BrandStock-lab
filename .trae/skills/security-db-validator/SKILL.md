---
name: "security-db-validator"
description: "Valida JWTs, integridad de tablas SQL y gestiona usuarios corporativos mediante Thunder Client/API. Invocar cuando se requiera verificar la seguridad del backend o crear accesos manuales."
---

# Security & DB Validator

Esta skill está diseñada para asegurar la integridad de la autenticación y la base de datos en BrandStock MVP.

## Capacidades Principales

### 1. Validación de Esquema SQL
- **Verificación de Tablas**: Comprueba la existencia de tablas críticas como `Users`.
- **Integridad de Datos**: Asegura que las queries SQL utilicen parámetros para prevenir inyecciones.
- **Auditoría de Roles**: Verifica que los usuarios tengan roles válidos (`admin`, `employee`).

### 2. Gestión de Usuarios (Backend-First)
Como BrandStock no permite el registro público, esta skill guía el proceso de creación de cuentas mediante herramientas como Thunder Client.

#### Registro vía Thunder Client:
- **URL**: `{{VITE_API_URL}}/auth/register`
- **Método**: `POST`
- **Body (JSON)**:
  ```json
  {
    "name": "Nombre Usuario",
    "email": "usuario@empresa.com",
    "password": "contraseña_segura",
    "role": "admin"
  }
  ```

### 3. Validación de JWT
- Asegura que el `JWT_SECRET` esté configurado en el `.env`.
- Verifica que el middleware de autenticación esté aplicado en rutas sensibles como `POST /products`.
- Comprueba que el token contenga el payload correcto: `{ id, email, role }`.

## Cuándo Invocar
- Al detectar errores de conexión con la base de datos.
- Cuando un usuario no puede iniciar sesión en el Frontend.
- Antes de proteger nuevas rutas en el Backend.
- Cuando se necesite crear una cuenta de administrador inicial.
