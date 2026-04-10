# BrandStock MVP - Project Context

## 🎯 Información General

| Campo | Valor |
|-------|-------|
| **Nombre** | BrandStock MVP |
| **Tipo** | Aplicación web para gestión de inventario en comercios minoristas |
| **Duración** | 12 semanas |
| **Esfuerzo** | 480 horas |
| **Costo** | $17.850.000 COP |
| **Patrocinador** | Arturo Char |
| **Project Manager** | Christopher Palmera |

---

## 👥 Equipo de Desarrollo

| Rol | Responsable | Responsabilidad |
|-----|-------------|-----------------|
| Backend Developer | Efrain | API Express, integración SQL Server |
| Frontend Developer | Sandoval | Componentes React, UI/UX implementation |
| DB & Infra | Jeremy | Azure SQL Database, deployment, Azure App Service |
| QA & Testing | Fermin | Pruebas, validación de requerimientos |

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React.js 18 + TypeScript + Vite + Tailwind CSS |
| **Backend** | Express.js (Node.js 18+) - API REST |
| **Base de Datos** | SQL Server (Azure SQL Database) |
| **Despliegue** | Azure App Service (Node.js 22 LTS) + Azure SQL |
| **Control de Versiones** | Git + GitHub |
| **CI/CD** | GitHub Actions (Build & Deploy automation) |
| **Diseño** | Figma |
| **IDE** | Trae (con MCP Server para Figma) |

---

## 🗄️ Modelo de Datos - SQL Server

### Tablas Principales

#### Categories
```sql
id INT IDENTITY PRIMARY KEY
name NVARCHAR(50) UNIQUE NOT NULL
created_at DATETIME2 DEFAULT GETDATE()
```

#### Users
```sql
id INT IDENTITY PRIMARY KEY
name NVARCHAR(100) NOT NULL
email NVARCHAR(100) UNIQUE NOT NULL
password NVARCHAR(MAX) NOT NULL
role NVARCHAR(20) DEFAULT 'employee'
createdAt DATETIME2 DEFAULT GETDATE()
```

---

## 🚀 Despliegue y CI/CD (Reto #9)

### Configuración de Azure App Service
- **Runtime Stack**: Node.js 22 LTS (seleccionado por estabilidad y rendimiento).
- **Deployment Center**: Integrado con GitHub Actions.
- **Environment Variables (Azure App Settings)**:
  - `JWT_SECRET`: Clave fija para persistencia de sesiones.
  - `SERVE_FRONTEND`: `true` (para servir React desde Express).
  - `VITE_API_URL`: `/api/v1` (ruta relativa para producción).
  - `DB_*`: Credenciales de Azure SQL Database.

### Pipeline de GitHub Actions (`main_brandstock-app.yml`)
1. **Job: Build**
   - Instalación de dependencias en `backend/`.
   - Ejecución de `npm run build` (TypeScript compilation).
   - Ejecución de pruebas unitarias con **Jest** (`npm test`).
   - Compresión del artefacto (`release.zip`) incluyendo archivos compilados.
   - Carga del artefacto para el siguiente job.
2. **Job: Deploy**
   - Descarga del artefacto `node-app`.
   - Autenticación con Azure mediante Service Principal (Secrets).
   - Despliegue del archivo `.zip` en el App Service.

### Estrategia de Servido Estático
Para optimizar costos y complejidad, el backend de Express sirve el frontend de React:
- Middleware en `app.ts` detecta `SERVE_FRONTEND=true`.
- Sirve archivos de `frontend/dist`.
- Soporte para SPA (Single Page Application) redirigiendo rutas no-API al `index.html`.

---

## 🧪 Pruebas Unitarias (Backend)

### Framework: Jest + ts-jest
- **Ubicación**: `backend/__tests__/*.test.ts`
- **Configuración**: `jest.config.js` con soporte para TypeScript.
- **Cobertura inicial**:
  - Prueba de "Health Check" (`/api/v1/health`).
  - Prueba de integridad de la ruta base (`/`).
  - Sanity tests para lógica de negocio.
- **Supertest**: Utilizado para realizar peticiones HTTP simuladas a la aplicación Express sin levantar el servidor.

---

## 🔌 Configuración MCP

### Figma Desktop MCP Server
- **URL**: `http://127.0.0.1:3845/mcp`
- **Estado**: Activo y configurado
- **Archivo de configuración**: `.qoder/mcp.json`

---

## 📋 Módulos del Sistema

1. **Autenticación** - Login de usuarios corporativos (JWT con clave fija)
2. **Dashboard** - Panel principal con KPIs y métricas (React components)
3. **Catálogo de Productos** - Gestión de inventario (CRUD dinámico)
4. **Registro de Movimientos** - Entradas y salidas de stock (Validación en tiempo real)
5. **Detalle de Producto** - Información completa e historial

---

## 🎨 Wireframes en Figma

### Vistas Principales

#### 1️⃣ LOGIN / AUTENTICACIÓN
**Elementos:**
- Logo BrandStock
- Campos: Email corporativo, Contraseña
- Botón: "Ingresar"
- Enlace: "¿Olvidaste tu contraseña?"
- Nota: Sin registro público (usuarios creados por Admin)

#### 2️⃣ DASHBOARD PRINCIPAL
**Elementos:**
- Header con nombre de usuario + logout
- KPIs: Total productos, Stock bajo (<10), Movimientos hoy
- Gráfico: Distribución por categorías
- Tabla: Últimos 5 movimientos
- Botón flotante: "+ Nuevo movimiento"

#### 3️⃣ CATÁLOGO DE PRODUCTOS
**Elementos:**
- Barra de búsqueda con autocompletado
- Filtros: Categoría, Estado
- Tabla: Código | Nombre | Categoría | Stock | Unidad | Acciones
- Paginación
- Botón: "+ Nuevo producto"

#### 4️⃣ REGISTRO DE MOVIMIENTO
**Elementos:**
- Selector: Entrada/Salida (toggle)
- Búsqueda de producto con stock actual
- Campo cantidad (validación en tiempo real)
- Motivo (dropdown): Compra, Venta, Merma, Ajuste, Devolución
- Observaciones (textarea)
- Botones: Cancelar | Confirmar (con modal de confirmación)

#### 5️⃣ DETALLE DE PRODUCTO
**Elementos:**
- Información completa del producto
- Historial de movimientos (timeline)
- Acciones: Editar | Deshabilitar
- Botón: Volver al catálogo

---

## 📝 Notas de Implementación

- Sin registro público de usuarios (solo creación por Admin)
- Validación de stock en tiempo real para movimientos
- Alertas para stock bajo (< 10 unidades)
- Historial completo de movimientos por producto
- Soporte para Node.js 22 LTS en producción

---

## Backend Implementation (Session 29 - Reto #9)

### Architecture
The backend follows a 3-layer architecture pattern:
```
Routes → Controllers → Services → Models → Azure SQL
```

### Directory Structure
```
backend/
├── __tests__/                     # Jest test files
├── bin/www.ts                     # Server entry point (port 3080)
├── src/
│   ├── app.ts                     # Express config + CORS + Static Serving
│   ├── config/database.ts         # Azure SQL connection pool (mssql)
│   ├── controllers/
│   │   ├── auth.controller.ts     # Login/Register handlers
│   │   ├── products.controller.ts # Product CRUD handlers
│   │   └── movements.controller.ts# Movement handlers
│   ├── middleware/
│   │   ├── auth.ts                # JWT Bearer token validation
│   │   ├── validation.ts          # Joi schema validation
│   │   └── errorHandler.ts        # Global error handler
│   ├── models/
│   │   ├── auth.model.ts          # User queries (parameterized SQL)
│   │   ├── products.model.ts      # Product CRUD queries
│   │   └── movements.model.ts     # Movement queries
│   ├── routes/
│   │   ├── auth.routes.ts         # POST /login, /register
│   │   ├── products.routes.ts     # GET/POST/PUT/DELETE (protected)
│   │   └── movements.routes.ts    # GET/POST (protected)
│   ├── services/
│   │   ├── auth.service.ts        # Auth logic (bcrypt + JWT)
│   │   ├── products.service.ts    # Product business logic
│   │   └── movements.service.ts   # Movement logic + stock validation
│   └── utils/
│       ├── logger.ts              # Morgan + custom logger
│       └── validators.ts          # Joi validation schemas
├── .env.example                   # Environment variable template
├── .gitignore
├── jest.config.js                 # Jest configuration
├── package.json                   # Updated with engines (Node 22)
└── tsconfig.json
```

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/v1/health | No | Server health check (Tested) |
| POST | /api/v1/auth/login | No | User login (returns JWT) |
| POST | /api/v1/auth/register | No | User registration |
| GET | /api/v1/products | No | List all products (Public) |
| GET | /api/v1/products/:id | No | Get product by ID (Public) |
| POST | /api/v1/products | JWT | Create product |
| PUT | /api/v1/products/:id | JWT | Update product |
| DELETE | /api/v1/products/:id | JWT | Delete product |
| GET | /api/v1/movements | JWT | List all movements |
| GET | /api/v1/movements/recent | JWT | Get 5 recent movements |
| POST | /api/v1/movements | JWT | Create movement (updates stock) |
| GET | /api/v1/dashboard/stats | JWT | Get dashboard KPIs |

---

## 🔒 Implementación de Autenticación (JWT)

### Backend
- **Middleware (`auth.ts`)**: Valida el token JWT en el header `Authorization: Bearer <token>`. Adjunta `req.user` al objeto de solicitud.
- **Controller (`auth.controller.ts`)**: Maneja el flujo de Login y Registro.
- **Service (`auth.service.ts`)**: Lógica de negocio para autenticación. Usa `bcrypt` para el hash de contraseñas y `jsonwebtoken` para generar tokens (payload: `{id, email, role}`).
- **Model (`auth.model.ts`)**: Consultas parametrizadas a la tabla `Users` en Azure SQL.
- **Seguridad**:
  - Contraseñas hasheadas con `bcrypt`.
  - Rutas sensibles protegidas por el middleware de autenticación.
  - Variables de entorno (`JWT_SECRET`) fijas en Azure App Settings.

### Frontend
- **AuthContext (`AuthContext.tsx`)**: Gestiona el estado global del usuario y el token. Proporciona métodos `login`, `logout` y `register`.
- **Persistencia**: El token y los datos del usuario se almacenan en `localStorage`.
- **ProtectedRoute (`ProtectedRoute.tsx`)**: Componente de orden superior que redirige a `/login` si el usuario no está autenticado.
- **Intercepción de API**: `apiFetch` incluye automáticamente el header `Authorization` si el token existe en `localStorage`.
- **Página de Login**: Formulario con manejo de estados de carga, errores (limpieza automática tras 3 segundos) y redirección automática tras éxito.

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.2 | Web framework |
| mssql | ^11.0.1 | Azure SQL Database driver |
| cors | ^2.8.5 | Cross-origin resource sharing |
| dotenv | ^16.3.1 | Environment variables |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| bcrypt | ^5.1.1 | Password hashing |
| joi | ^17.11.0 | Request validation |
| morgan | ^1.10.0 | HTTP request logging |
| jest | ^29.7.0 | Testing framework |
| supertest | ^7.0.0 | API testing tool |
| typescript | ^5.3.0 | TypeScript compiler |

### Environment Variables Required
```
PORT=3080
NODE_ENV=production
DB_USER=brandstock-admin
DB_PASSWORD=<your_password>
DB_DATABASE=brandstock-db
DB_SERVER=brandstock-server.database.windows.net
JWT_SECRET=<your_fixed_secret>
JWT_EXPIRES_IN=24h
FRONTEND_URL=https://brandstock-app.azurewebsites.net
SERVE_FRONTEND=true
```

### How to Run
```bash
cd backend
npm install
npm run dev    # Development with nodemon + ts-node
npm run build  # Compile TypeScript to dist/
npm start      # Run compiled JS from dist/
```

---

## Frontend Implementation (Session 31 - Reto #6)

### Architecture
The frontend is built with React 18 and follows a component-based architecture with global state management:
```
Main → AppProvider (Context) → Router → Layouts → Pages → Components
```

### Directory Structure
```
frontend/
├── src/
│   ├── components/                # Reusable UI components (Tailwind-first)
│   │   ├── ActionButton.tsx       # Standard buttons (primary, secondary, danger)
│   │   ├── PageTitle.tsx          # Standard page headers
│   │   └── Header.tsx             # Application top bar
│   ├── context/
│   │   └── AppContext.tsx         # Global state (Auth, User, Loading)
│   ├── layouts/
│   │   └── MainLayout.tsx         # Sidebar + Header wrapper
│   ├── pages/
│   │   ├── App/
│   │   │   └── App.tsx            # Main router and auth protection
│   │   ├── Dashboard.tsx          # Main metrics view
│   │   ├── Products.tsx           # Inventory catalog
│   │   ├── NewProduct.tsx         # Product creation form
│   │   ├── NewMovement.tsx        # Stock movement form
│   │   └── Login.tsx              # Authentication page
│   ├── main.tsx                   # Entry point with AppProvider
│   └── index.css                  # Tailwind CSS v4 configuration & theme
```

### Core Features (Reto #6)

| Feature | Description |
|---------|-------------|
| **Global State** | `AppContext` manages user session, auth status, and global loading states. |
| **Tailwind v4** | Theme extension using `@theme` in CSS for brand colors and fonts. |
| **Reusable UI** | `ActionButton` and `PageTitle` ensure UI consistency across all modules. |
| **Auth Guard** | Protected routes in `App.tsx` using global authentication state. |

### Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI Library |
| react-router-dom | ^7.14.0 | Navigation & Routing |
| lucide-react | ^1.7.0 | Icon set |
| tailwindcss | ^4.2.2 | Utility-first CSS framework |
| typescript | ~6.0.2 | Static typing |
| vite | ^8.0.4 | Build tool |

---

## Frontend Implementation (Session 32 - Reto #7)

### New Components
The following dynamic components were added to the `src/components/` directory:

| Path | Component | Description |
|------|-----------|-------------|
| `src/components/ui/InventoryContainer.tsx` | `InventoryContainer` | Reusable section wrapper with `default`, `alert`, and `info` variants. |
| `src/components/products/ProductCard.tsx` | `ProductCard` | Displays product details (code, name, stock, min_stock) with stock status badges. |
| `src/components/ui/ActionModal.tsx` | `ActionModal` | Reusable modal with dynamic actions, backdrop blur, and scroll lock. |
| `src/components/movements/MovementForm.tsx` | `MovementForm` | Form with local state to handle stock movements (entrada, salida, merma). |

### Core Features (Reto #7)

| Feature | Description |
|---------|-------------|
| **Dynamic Mapping** | `Dashboard.tsx` now maps `mockProducts` to `ProductCard` components dynamically. |
| **State Management** | Local states for form handling (`useState`) and modal visibility control. |
| **Validation** | Form-level validation for required fields before submission (logged to console). |
| **Icon Integration** | Switched to `react-icons/fi` for a consistent, professional look. |

### Technical Improvements & Bug Fixes
- **Dependencies**: Fixed missing `react`, `react-dom`, and `@types` in `package.json`.
- **TypeScript**: Resolved `verbatimModuleSyntax` errors by using `type` imports and fixed `any` types in handlers.
- **Port Management**: Resolved `EADDRINUSE` conflict for port 3080 by identifying and killing orphaned backend processes.
- **Build Quality**: Achieved 100% success rate in `npm run build` with zero TypeScript errors or warnings.

---

## Frontend Implementation (Session 33 - Reto #8)

### API Integration
Implemented a robust communication layer between Frontend and Backend:

| Component | Description |
|-----------|-------------|
| `src/lib/api.ts` | Centralized `apiFetch` client with environment variable support and generic response typing. |
| `src/services/` | Modular services for `Dashboard`, `Products`, and `Movements` using the `apiFetch` client. |
| `src/vite-env.d.ts` | Added TypeScript definitions for `import.meta.env.VITE_API_URL`. |

### Core Features (Reto #8)

| Feature | Description |
|---------|-------------|
| **Real Data Sync** | Replaced all mocks in `Dashboard` and `Products` with real data from Azure SQL API. |
| **UX/UI States** | Implemented `isLoading` spinners and error handling with "Retry" functionality in main views. |
| **Real Movements** | `MovementForm` now performs `POST` requests, updating the stock in real-time. |
| **Pagination** | `Products` page now supports server-side pagination (10 items per page). |

### Environment Configuration
Created `.env` file for the frontend to manage the API base URL:
```env
VITE_API_URL=http://localhost:3080/api/v1
```
