# Wireframe: Catálogo de Productos

**Figma Node ID:** 1-255  
**URL:** https://www.figma.com/design/hGS1DCTninRpUXhSCM5mh6/BrandStock---Wireframes?node-id=1-255&m=dev

---

## 📐 Estructura del Wireframe

```
[FRAME] Catalogo de productos (ID: 1:255)
  [FRAME] ProductCatalog (ID: 1:256)
    [FRAME] Header (ID: 1:257)
      [FRAME] Container (ID: 1:258)
        [FRAME] Container (ID: 1:259) - Logo
          [FRAME] Icon (ID: 1:260) - BrandStock icon
          [FRAME] Heading 1 (ID: 1:265)
            [TEXT] BrandStock (ID: 1:266) -> 'BrandStock'
        [FRAME] Container (ID: 1:267) - User menu
          [FRAME] Text (ID: 1:268)
            [TEXT] Juan Pérez (ID: 1:269) -> 'Juan Pérez'
          [FRAME] Button (ID: 1:270) - Logout
            [TEXT] Cerrar sesión (ID: 1:275) -> 'Cerrar sesión'
    
    [FRAME] Main Content (ID: 1:276)
      [FRAME] Container (ID: 1:277) - Page header
        [FRAME] Container (ID: 1:278)
          [FRAME] Heading 2 (ID: 1:279)
            [TEXT] Catálogo de Productos (ID: 1:280) -> 'Catálogo de Productos'
          [FRAME] Paragraph (ID: 1:281)
            [TEXT] 10 productos encontrados (ID: 1:282) -> '10 productos encontrados'
        [FRAME] Button (ID: 1:283) - Nuevo Producto
          [TEXT] Nuevo Producto (ID: 1:287) -> 'Nuevo Producto'
      
      [FRAME] Container (ID: 1:288) - Filters
        [FRAME] Container (ID: 1:289)
          [FRAME] Container (ID: 1:290) - Search input
            [FRAME] Input (ID: 1:292)
              [TEXT] Buscar por código o nombre... (ID: 1:293)
            [FRAME] Icon (ID: 1:294) - Search icon
          [FRAME] Paragraph (ID: 1:297)
            [TEXT] → Autocompletado en tiempo real (ID: 1:298)
          
          [FRAME] Button (ID: 1:299) - Category filter
            [TEXT] Todas las categorías (ID: 1:300)
          
          [FRAME] Button (ID: 1:302) - Status filter
            [TEXT] Todos los estados (ID: 1:303)
      
      [FRAME] Container (ID: 1:304) - Table
        [FRAME] Table (ID: 1:305)
          [FRAME] TableHeader (ID: 1:306)
            [FRAME] TableRow (ID: 1:307)
              [FRAME] TableHead (ID: 1:308) - Código
                [TEXT] Código (ID: 1:309)
              [FRAME] TableHead (ID: 1:310) - Nombre
                [TEXT] Nombre (ID: 1:311)
              [FRAME] TableHead (ID: 1:312) - Categoría
                [TEXT] Categoría (ID: 1:313)
              [FRAME] TableHead (ID: 1:314) - Stock
                [TEXT] Stock (ID: 1:315)
              [FRAME] TableHead (ID: 1:316) - Unidad
                [TEXT] Unidad (ID: 1:317)
              [FRAME] TableHead (ID: 1:318) - Acciones
                [TEXT] Acciones (ID: 1:319)
          
          [FRAME] TableBody (ID: 1:325)
            [FRAME] TableRow (ID: 1:326) - Product 1
              [FRAME] TableCell (ID: 1:327) - P001
                [TEXT] P001 (ID: 1:328)
              [FRAME] TableCell (ID: 1:329) - Laptop Dell Inspiron 15
                [TEXT] Laptop Dell Inspiron 15 (ID: 1:330)
              [FRAME] TableCell (ID: 1:331) - Electrónica
                [FRAME] Badge (ID: 1:332)
                  [TEXT] Electrónica (ID: 1:333)
              [FRAME] TableCell (ID: 1:334) - 5
                [TEXT] 5 (ID: 1:335)
              [FRAME] TableCell (ID: 1:336) - Unidad
                [TEXT] Unidad (ID: 1:337)
              [FRAME] TableCell (ID: 1:338) - Actions
                [FRAME] Button (ID: 1:340) - Edit
                [FRAME] Button (ID: 1:344) - View/Delete
            
            [FRAME] TableRow (ID: 1:351) - Product 2
              [FRAME] TableCell (ID: 1:352) - P002
              [FRAME] TableCell (ID: 1:354) - Mouse Logitech M185
              [FRAME] TableCell (ID: 1:356) - Accesorios
              [FRAME] TableCell (ID: 1:359) - 45
              [FRAME] TableCell (ID: 1:361) - Unidad
              [FRAME] TableCell (ID: 1:363) - Actions
            
            [FRAME] TableRow (ID: 1:376) - Product 3
              [FRAME] TableCell (ID: 1:377) - P003
              [FRAME] TableCell (ID: 1:379) - Teclado Mecánico RGB
              [FRAME] TableCell (ID: 1:381) - Accesorios
              [FRAME] TableCell (ID: 1:384) - 8
              [FRAME] TableCell (ID: 1:386) - Unidad
              [FRAME] TableCell (ID: 1:388) - Actions
            
            [FRAME] TableRow (ID: 1:401) - Product 4
              [FRAME] TableCell (ID: 1:402) - P004
              [FRAME] TableCell (ID: 1:404) - Monitor Samsung 24"
              [FRAME] TableCell (ID: 1:406) - Electrónica
              [FRAME] TableCell (ID: 1:409) - 2
              [FRAME] TableCell (ID: 1:411) - Unidad
              [FRAME] TableCell (ID: 1:413) - Actions
            
            [FRAME] TableRow (ID: 1:426) - Product 5
              [FRAME] TableCell (ID: 1:427) - P005
              [FRAME] TableCell (ID: 1:429) - Silla Ergonómica Office Pro
              [FRAME] TableCell (ID: 1:431) - Mobiliario
              [FRAME] TableCell (ID: 1:434) - 12
              [FRAME] TableCell (ID: 1:436) - Unidad
              [FRAME] TableCell (ID: 1:438) - Actions
      
      [FRAME] Container (ID: 1:451) - Pagination
        [FRAME] Paragraph (ID: 1:452)
          [TEXT] Mostrando 1 - 5 de 10 (ID: 1:453)
        [FRAME] Container (ID: 1:454)
          [FRAME] Button (ID: 1:455) - Anterior
            [TEXT] Anterior (ID: 1:458)
          [FRAME] Container (ID: 1:459) - Page numbers
            [FRAME] Button (ID: 1:460) - Page 1
              [TEXT] 1 (ID: 1:461)
            [FRAME] Button (ID: 1:462) - Page 2
              [TEXT] 2 (ID: 1:463)
          [FRAME] Button (ID: 1:464) - Siguiente
            [TEXT] Siguiente (ID: 1:465)
      
      [FRAME] Container (ID: 1:468) - Note
        [TEXT] → Interacciones: Click en fila completa abre detalle del producto... (ID: 1:469)
```

---

## 🎨 Elementos Visuales

### Header
- **Logo:** BrandStock icon + text
- **User Info:** "Juan Pérez"
- **Logout Button:** "Cerrar sesión"

### Page Header
- **Title:** "Catálogo de Productos"
- **Subtitle:** "10 productos encontrados"
- **Action Button:** "Nuevo Producto" (primary)

### Filters Section
- **Search Input:** "Buscar por código o nombre..."
  - Search icon
  - Autocomplete note: "→ Autocompletado en tiempo real"
- **Category Dropdown:** "Todas las categorías"
- **Status Dropdown:** "Todos los estados"

### Products Table
**Columns:**
1. **Código** - Product code (P001, P002, etc.)
2. **Nombre** - Product name
3. **Categoría** - Category badge (Electrónica, Accesorios, Mobiliario)
4. **Stock** - Current stock quantity
5. **Unidad** - Unit of measurement
6. **Acciones** - Edit and View/Delete buttons

**Sample Data:**
| Código | Nombre | Categoría | Stock | Unidad |
|--------|--------|-----------|-------|--------|
| P001 | Laptop Dell Inspiron 15 | Electrónica | 5 | Unidad |
| P002 | Mouse Logitech M185 | Accesorios | 45 | Unidad |
| P003 | Teclado Mecánico RGB | Accesorios | 8 | Unidad |
| P004 | Monitor Samsung 24" | Electrónica | 2 | Unidad |
| P005 | Silla Ergonómica Office Pro | Mobiliario | 12 | Unidad |

### Pagination
- **Info:** "Mostrando 1 - 5 de 10"
- **Navigation:** Anterior, Page 1, Page 2, Siguiente

---

## 🔧 Especificaciones Técnicas

### Interactions
- **Row Click:** Opens product detail page
- **Edit Button:** Opens product edit modal/page
- **View/Delete Button:** View details or delete confirmation
- **Search:** Real-time autocomplete
- **Filters:** Dropdown selects for category and status

### API Endpoints Needed
- GET `/api/products` - List products (with pagination, search, filters)
- GET `/api/products/:id` - Get product details
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product
- GET `/api/categories` - Get categories for filter dropdown

### Pagination
- Default: 5 items per page
- Show page numbers
- Previous/Next navigation

### Responsive Behavior
- **Desktop:** Full table with all columns
- **Tablet:** Hide less important columns
- **Mobile:** Card-based layout instead of table
