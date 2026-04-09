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
| **Despliegue** | Azure App Service + Azure SQL |
| **Control de Versiones** | Git + GitHub |
| **Diseño** | Figma |
| **IDE** | Qoder (con MCP Server para Figma) |

---

## 🗄️ Modelo de Datos - SQL Server

### Tablas Principales

#### Categories
```sql
id INT IDENTITY PRIMARY KEY
name NVARCHAR(50) UNIQUE NOT NULL
created_at DATETIME2 DEFAULT GETDATE()
```

---

## 🔌 Configuración MCP

### Figma Desktop MCP Server
- **URL**: `http://127.0.0.1:3845/mcp`
- **Estado**: Activo y configurado
- **Archivo de configuración**: `.qoder/mcp.json`

---

## 📋 Módulos del Sistema

1. **Autenticación** - Login de usuarios corporativos
2. **Dashboard** - Panel principal con KPIs y métricas
3. **Catálogo de Productos** - Gestión de inventario
4. **Registro de Movimientos** - Entradas y salidas de stock
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

---

## Backend Implementation (Session 29)

### Architecture
The backend follows a 3-layer architecture pattern:
```
Routes → Controllers → Services → Models → Azure SQL
```

### Directory Structure
```
backend/
├── bin/www.ts                     # Server entry point (port 3080)
├── src/
│   ├── app.ts                     # Express config + CORS + middlewares
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
├── package.json
└── tsconfig.json
```

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/health | No | Server health check |
| POST | /api/auth/login | No | User login (returns JWT) |
| POST | /api/auth/register | No | User registration |
| GET | /api/products | JWT | List all products |
| GET | /api/products/:id | JWT | Get product by ID |
| POST | /api/products | JWT | Create product |
| PUT | /api/products/:id | JWT | Update product |
| DELETE | /api/products/:id | JWT | Delete product |
| GET | /api/movements | JWT | List all movements |
| GET | /api/movements/product/:productId | JWT | Movements by product |
| POST | /api/movements | JWT | Create movement (updates stock) |

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
| typescript | ^5.3.0 | TypeScript compiler |

### Environment Variables Required
```
PORT=3080
NODE_ENV=development
DB_USER=brandstock-admin
DB_PASSWORD=<your_password>
DB_DATABASE=brandstock-db
DB_SERVER=brandstock-server.database.windows.net
JWT_SECRET=<your_secret>
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
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
