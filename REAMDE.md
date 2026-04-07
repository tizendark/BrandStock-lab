# 📦 BrandStock MVP
> Aplicación web para gestión de inventario en comercios minoristas

## 👥 Equipo de Desarrollo
| Rol | Nombre | GitHub |
|-----|--------|--------|
| Project Manager | Christopher Palmera | `@usuario` |
| Backend Developer | Efrain | `@usuario` |
| Frontend Developer | Sandoval | `@usuario` |
| DB & Infra | Jeremy | `@usuario` |
| QA & Testing | Fermin | `@usuario` |

## 🚀 Descripción del Proyecto
BrandStock es una plataforma web-first diseñada para digitalizar y optimizar el control de inventario en pequeños y medianos comercios. Permite registrar productos, gestionar entradas/salidas, generar alertas de stock bajo y reportar movimientos en tiempo real. El MVP se enfocará en las funcionalidades core: catálogo, movimientos básicos y dashboard de stock.

## 🛠️ Stack Tecnológico
- **Frontend:** React.js + Vite
- **Backend:** Express.js (Node.js)
- **Base de Datos:** SQL Server
- **Cloud/Despliegue:** Microsoft Azure
- **Control de Versiones:** Git + GitHub
- **Entorno de Desarrollo:** Bolt.diy

## 📥 Instalación Rápida
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/brandstock-mvp.git
cd brandstock-mvp

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev


---

#### 🔍 PASO 4: Justificación de Tecnologías (Requerido por el PDF)
Agrega esta sección al `README.md` o en un archivo `docs/tech-justification.md`:

| Tecnología | Justificación para BrandStock |
|------------|-------------------------------|
| **React.js** | Permite construir una UI modular, reutilizable y de alto rendimiento para dashboards de inventario. Ideal para actualizaciones en tiempo real sin recargar la página. |
| **Express.js** | Framework ligero y flexible para crear APIs RESTful. Facilita la integración con SQL Server y la gestión de autenticación/autorización futura. |
| **SQL Server** | Motor relacional robusto, transaccional y con soporte nativo para procedimientos almacenados. Garantiza integridad en operaciones críticas de inventario. |
| **Azure** | Plataforma cloud empresarial con servicios integrados (App Service, SQL Database, Monitor). Facilita escalabilidad, backups automáticos y cumplimiento de seguridad. |
| **Git / GitHub** | Control de versiones distribuido esencial para trabajo colaborativo. GitHub centraliza el código, gestión de issues, CI/CD y revisión de código entre el equipo. |

---

#### 📥 PASO 5: Instalación de Software (Verificación)
Ejecuta estos comandos en tu terminal para validar el entorno:
```bash
git --version        # ≥ 2.30.0
node -v              # ≥ 18.x (LTS recomendado)
npm -v               # ≥ 9.x
code -v              # VS Code 

# Azure Data Studio: Verificar apertura desde menú o terminal