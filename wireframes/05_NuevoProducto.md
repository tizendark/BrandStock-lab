# Wireframe: Nuevo Producto

**Figma Node ID:** 2-2  
**URL:** https://www.figma.com/design/hGS1DCTninRpUXhSCM5mh6/BrandStock---Wireframes?node-id=2-2&m=dev

---

## 📐 Estructura del Wireframe

```
[FRAME] Nuevo producto (ID: 2:2)
  [FRAME] NewProduct (ID: 2:3)
    [FRAME] Header (ID: 2:4)
      [FRAME] Container (ID: 2:5)
        [FRAME] Container (ID: 2:6) - Logo
          [FRAME] Icon (ID: 2:7) - BrandStock icon
          [FRAME] Heading 1 (ID: 2:12)
            [TEXT] BrandStock (ID: 2:13) -> 'BrandStock'
        [FRAME] Container (ID: 2:14) - User menu
          [FRAME] Text (ID: 2:15)
            [TEXT] Juan Pérez (ID: 2:16) -> 'Juan Pérez'
          [FRAME] Button (ID: 2:17) - Logout
            [TEXT] Cerrar sesión (ID: 2:22) -> 'Cerrar sesión'
    
    [FRAME] Main Content (ID: 2:23)
      [FRAME] Button (ID: 2:24) - Back button
        [FRAME] Icon (ID: 2:25) - Arrow left
        [TEXT] Volver al catálogo (ID: 2:28) -> 'Volver al catálogo'
      
      [FRAME] Container (ID: 2:29) - Page header
        [FRAME] Heading 2 (ID: 2:30)
          [TEXT] Nuevo Producto (ID: 2:31) -> 'Nuevo Producto'
        [FRAME] Paragraph (ID: 2:32)
          [TEXT] Registrar producto en el catálogo de inventario (ID: 2:33)
      
      [FRAME] Form (ID: 2:34)
        [FRAME] Container (ID: 2:35) - Form fields
          
          [FRAME] Container (ID: 2:36) - Código del producto
            [FRAME] Label (ID: 2:37)
              [TEXT] Código del producto * (ID: 2:38)
            [FRAME] Input (ID: 2:39)
              [TEXT] Ej: P011 (ID: 2:40) -> 'Ej: P011'
            [FRAME] Paragraph (ID: 2:41)
              [TEXT] → Código único identificador (Ej: P001, ELEC-001) (ID: 2:42)
          
          [FRAME] Container (ID: 2:43) - Nombre del producto
            [FRAME] Label (ID: 2:44)
              [TEXT] Nombre del producto * (ID: 2:45)
            [FRAME] Input (ID: 2:46)
              [TEXT] Ej: Laptop Dell Inspiron 15 (ID: 2:47)
            [FRAME] Paragraph (ID: 2:48)
              [TEXT] → Nombre descriptivo y completo del producto (ID: 2:49)
          
          [FRAME] Container (ID: 2:50) - Categoría
            [FRAME] Label (ID: 2:51)
              [TEXT] Categoría * (ID: 2:52)
            [FRAME] Button (ID: 2:53) - Dropdown
              [TEXT] Seleccionar categoría... (ID: 2:55)
              [FRAME] Icon (ID: 2:56) - Chevron down
            [FRAME] Paragraph (ID: 2:58)
              [TEXT] → Clasificación para organización y reportes (ID: 2:59)
          
          [FRAME] Container (ID: 2:60) - Stock y Unidad (2 columns)
            [FRAME] Container (ID: 2:61) - Stock inicial
              [FRAME] Label (ID: 2:62)
                [TEXT] Stock inicial * (ID: 2:63)
              [FRAME] Input (ID: 2:64)
                [TEXT] 0 (ID: 2:65) -> '0'
              [FRAME] Paragraph (ID: 2:66)
                [TEXT] → Cantidad actual en inventario (ID: 2:67)
            
            [FRAME] Container (ID: 2:68) - Unidad de medida
              [FRAME] Label (ID: 2:69)
                [TEXT] Unidad de medida * (ID: 2:70)
              [FRAME] Button (ID: 2:71) - Dropdown
                [TEXT] Seleccionar unidad... (ID: 2:73)
                [FRAME] Icon (ID: 2:74) - Chevron down
              [FRAME] Paragraph (ID: 2:76)
                [TEXT] → Cómo se mide el producto (ID: 2:77)
          
          [FRAME] Container (ID: 2:78) - Note
            [FRAME] Paragraph (ID: 2:79)
              [TEXT] Nota: El producto será creado con estado "Activo". Podrás editarlo o deshabilitarlo posteriormente. (ID: 2:80)
          
          [FRAME] Container (ID: 2:81) - Action buttons
            [FRAME] Button (ID: 2:82) - Cancelar
              [TEXT] Cancelar (ID: 2:83) -> 'Cancelar'
            [FRAME] Button (ID: 2:84) - Crear Producto
              [TEXT] Crear Producto (ID: 2:85) -> 'Crear Producto'
      
      [FRAME] Container (ID: 2:86) - Validation note
        [TEXT] → Validaciones: Campos obligatorios (*) se validan al enviar. Código debe ser único en el sistema. (ID: 2:87)
```

---

## 🎨 Elementos Visuales

### Header
- **Logo:** BrandStock icon + text
- **User Info:** "Juan Pérez"
- **Logout Button:** "Cerrar sesión"

### Navigation
- **Back Button:** "Volver al catálogo" with left arrow

### Page Header
- **Title:** "Nuevo Producto"
- **Subtitle:** "Registrar producto en el catálogo de inventario"

### Form Fields

1. **Código del producto***
   - Placeholder: "Ej: P011"
   - Helper: "→ Código único identificador (Ej: P001, ELEC-001)"

2. **Nombre del producto***
   - Placeholder: "Ej: Laptop Dell Inspiron 15"
   - Helper: "→ Nombre descriptivo y completo del producto"

3. **Categoría***
   - Dropdown: "Seleccionar categoría..."
   - Helper: "→ Clasificación para organización y reportes"

4. **Stock inicial*** (left column)
   - Placeholder: "0"
   - Helper: "→ Cantidad actual en inventario"

5. **Unidad de medida*** (right column)
   - Dropdown: "Seleccionar unidad..."
   - Helper: "→ Cómo se mide el producto"

### Information Note
- **Text:** "Nota: El producto será creado con estado "Activo". Podrás editarlo o deshabilitarlo posteriormente."

### Action Buttons
- **Cancelar:** Secondary button (goes back to catalog)
- **Crear Producto:** Primary button (submits form)

### Validation Note
- **Text:** "→ Validaciones: Campos obligatorios (*) se validan al enviar. Código debe ser único en el sistema."

---

## 🔧 Especificaciones Técnicas

### Form Validation
- **Required fields:** Código, Nombre, Categoría, Stock inicial, Unidad de medida
- **Código único:** Must not exist in database
- **Stock inicial:** Must be a non-negative number

### API Endpoints Needed
- POST `/api/products` - Create new product
- GET `/api/categories` - Get categories for dropdown
- GET `/api/products/check-code/:code` - Check if code is unique

### Form Data Structure
```json
{
  "code": "P011",
  "name": "Laptop Dell Inspiron 15",
  "category_id": 1,
  "initial_stock": 0,
  "unit": "Unidad",
  "status": "active"
}
```

### Navigation
- **Cancelar:** Returns to `/products`
- **Crear Producto:** On success, redirects to `/products` or `/products/:id`
- **Volver al catálogo:** Returns to `/products`

### Responsive Behavior
- **Desktop:** 2-column layout for Stock and Unidad
- **Mobile:** Single column, stacked fields
