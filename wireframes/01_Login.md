# Wireframe: Login

**Figma Node ID:** 1-2  
**URL:** https://www.figma.com/design/hGS1DCTninRpUXhSCM5mh6/BrandStock---Wireframes?node-id=1-2&m=dev

---

## 📐 Estructura del Wireframe

```
[FRAME] Login (ID: 1:2)
  [FRAME] Login (ID: 1:3)
    [FRAME] Container (ID: 1:4)
      [FRAME] Container (ID: 1:5)
        [FRAME] Container (ID: 1:6)
          [FRAME] Container (ID: 1:7)
            [FRAME] Icon (ID: 1:8) - Logo BrandStock
              [VECTOR] Vector (ID: 1:9)
              [VECTOR] Vector (ID: 1:10)
              [VECTOR] Vector (ID: 1:11)
              [VECTOR] Vector (ID: 1:12)
        [FRAME] Heading 1 (ID: 1:13)
          [TEXT] BrandStock (ID: 1:14)
        [FRAME] Paragraph (ID: 1:15)
          [TEXT] Sistema de Gestión de Inventario (ID: 1:16)
      [FRAME] Container (ID: 1:17)
        [FRAME] Form (ID: 1:18)
          [FRAME] Container (ID: 1:19)
            [FRAME] Label (ID: 1:20)
              [TEXT] Email corporativo (ID: 1:21)
            [FRAME] Input (ID: 1:22)
              [TEXT] usuario@empresa.com (ID: 1:23) - Placeholder
          [FRAME] Container (ID: 1:24)
            [FRAME] Label (ID: 1:25)
              [TEXT] Contraseña (ID: 1:26)
            [FRAME] Container (ID: 1:27)
              [FRAME] Input (ID: 1:28)
                [TEXT] •••••••• (ID: 1:29) - Placeholder
              [FRAME] Button (ID: 1:30) - Toggle visibility
                [FRAME] Icon (ID: 1:31)
                  [VECTOR] Vector (ID: 1:32)
                  [VECTOR] Vector (ID: 1:33)
          [FRAME] Button (ID: 1:34) - Primary
            [TEXT] Ingresar (ID: 1:35)
          [FRAME] Button (ID: 1:36) - Link
            [TEXT] ¿Olvidaste tu contraseña? (ID: 1:37)
      [FRAME] Container (ID: 1:38)
        [FRAME] Paragraph (ID: 1:39)
          [TEXT] Usuarios creados por el administrador del sistema. (ID: 1:40)
          [TEXT] Si no tienes acceso, contacta al área de IT. (ID: 1:41)
      [FRAME] Container (ID: 1:42)
        [TEXT] → Nota de wireframe: Validación de credenciales conecta con backend (Express.js + SQL Server). En este wireframe, cualquier email/contraseña redirige al dashboard. (ID: 1:43)
```

---

## 📝 Contenido de Textos

| Elemento | Texto | Tipo |
|----------|-------|------|
| Título Principal | **BrandStock** | Heading 1 |
| Subtítulo | Sistema de Gestión de Inventario | Paragraph |
| Label Email | Email corporativo | Label |
| Placeholder Email | usuario@empresa.com | Input placeholder |
| Label Password | Contraseña | Label |
| Placeholder Password | •••••••• | Input placeholder |
| Botón Principal | **Ingresar** | Button |
| Link Secundario | ¿Olvidaste tu contraseña? | Link Button |
| Nota Informativa | Usuarios creados por el administrador del sistema. | Info |
| Nota Informativa 2 | Si no tienes acceso, contacta al área de IT. | Info |
| Nota Técnica | → Nota de wireframe: Validación de credenciales conecta con backend (Express.js + SQL Server). En este wireframe, cualquier email/contraseña redirige al dashboard. | Annotation |

---

## 🎨 Componentes Identificados

### 1. Logo/Icono (ID: 1:8)
- Vector compuesto por 4 vectores
- Representa el logo de BrandStock

### 2. Formulario de Login
- **Campo Email:**
  - Label: "Email corporativo"
  - Placeholder: "usuario@empresa.com"
  - Tipo: email
  
- **Campo Contraseña:**
  - Label: "Contraseña"
  - Placeholder: "••••••••"
  - Tipo: password
  - Toggle para mostrar/ocultar contraseña (icono de ojo)

### 3. Botones
- **Botón Primario:** "Ingresar"
  - Acción: Submit del formulario
  - Conecta con backend Express.js + SQL Server
  
- **Botón Link:** "¿Olvidaste tu contraseña?"
  - Acción: Navegar a pantalla de recuperación

### 4. Área de Información
- Mensaje sobre creación de usuarios por admin
- Contacto al área de IT

---

## ⚙️ Especificaciones Técnicas

### Validación
- Validación de credenciales contra backend
- Cualquier email/contraseña redirige al dashboard (para wireframe)

### Backend Connection
- **API:** Express.js
- **Database:** SQL Server
- **Endpoint:** Auth/Login

### Flujo de Navegación
1. Usuario ingresa email y contraseña
2. Clic en "Ingresar"
3. Validación de credenciales
4. Redirección al Dashboard principal

### Acceso Alternativo
- Link "¿Olvidaste tu contraseña?" → Pantalla de recuperación

---

## 🔒 Notas de Seguridad

- Sin registro público (usuarios creados solo por administrador)
- Contraseña enmascarada por defecto
- Toggle para mostrar/ocultar contraseña
- Mensaje de contacto a IT para solicitar acceso
