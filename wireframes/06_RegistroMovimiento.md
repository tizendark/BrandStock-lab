# Wireframe: Registro de Movimiento

**Figma Node ID:** 2-89  
**URL:** https://www.figma.com/design/hGS1DCTninRpUXhSCM5mh6/BrandStock---Wireframes?node-id=2-89&m=dev

---

## 📐 Estructura del Wireframe

```
[FRAME] Registro de Movimiento (ID: 2:89)
  [FRAME] MovementRegistration (ID: 2:90)
    [FRAME] Header (ID: 2:91)
      [FRAME] Container (ID: 2:92)
        [FRAME] Container (ID: 2:93) - Logo
          [FRAME] Icon (ID: 2:94) - BrandStock icon
          [FRAME] Heading 1 (ID: 2:99)
            [TEXT] BrandStock (ID: 2:100) -> 'BrandStock'
        [FRAME] Container (ID: 2:101) - User menu
          [FRAME] Text (ID: 2:102)
            [TEXT] Juan Pérez (ID: 2:103) -> 'Juan Pérez'
          [FRAME] Button (ID: 2:104) - Logout
            [TEXT] Cerrar sesión (ID: 2:109) -> 'Cerrar sesión'
    
    [FRAME] Main Content (ID: 2:110)
      [FRAME] Container (ID: 2:111) - Page header
        [FRAME] Heading 2 (ID: 2:112)
          [TEXT] Registro de Movimiento (ID: 2:113) -> 'Registro de Movimiento'
        [FRAME] Paragraph (ID: 2:114)
          [TEXT] Entrada o salida de productos del inventario (ID: 2:115)
      
      [FRAME] Form (ID: 2:116)
        [FRAME] Container (ID: 2:117) - Form fields
          
          [FRAME] Container (ID: 2:118) - Tipo de movimiento
            [FRAME] Label (ID: 2:119)
              [TEXT] Tipo de movimiento * (ID: 2:120)
            [FRAME] Container (ID: 2:121) - Toggle/Switch
              [FRAME] Container (ID: 2:122) - Entrada option
                [FRAME] Radio Button (ID: 2:124)
                [FRAME] Label (ID: 2:125)
                  [FRAME] Icon (ID: 2:126) - Arrow down left
                  [FRAME] Text (ID: 2:129)
                    [TEXT] Entrada (ID: 2:130) -> 'Entrada'
              [FRAME] Container (ID: 2:131) - Salida option
                [FRAME] Radio Button (ID: 2:132)
                [FRAME] Icon (ID: 2:134) - Arrow up right
                [FRAME] Label (ID: 2:136)
                  [FRAME] Icon (ID: 2:137) - Arrow up right
                  [FRAME] Text (ID: 2:140)
                    [TEXT] Salida (ID: 2:141) -> 'Salida'
          
          [FRAME] Container (ID: 2:142) - Producto
            [FRAME] Label (ID: 2:143)
              [TEXT] Producto * (ID: 2:144)
            [FRAME] Container (ID: 2:145)
              [FRAME] Input (ID: 2:146)
                [TEXT] Buscar por código o nombre... (ID: 2:147)
              [FRAME] Icon (ID: 2:148) - Search icon
            [FRAME] Paragraph (ID: 2:151)
              [TEXT] → Autocompletado muestra código y stock en tiempo real (ID: 2:152)
          
          [FRAME] Container (ID: 2:153) - Cantidad
            [FRAME] Label (ID: 2:154)
              [TEXT] Cantidad * (ID: 2:155)
            [FRAME] Input (ID: 2:156)
              [TEXT] 0 (ID: 2:157) -> '0'
            [FRAME] Paragraph (ID: 2:158)
              [TEXT] → Validación en tiempo real para salidas (ID: 2:159)
          
          [FRAME] Container (ID: 2:160) - Motivo
            [FRAME] Label (ID: 2:161)
              [TEXT] Motivo * (ID: 2:162)
            [FRAME] Button (ID: 2:163) - Dropdown
              [TEXT] Seleccionar motivo... (ID: 2:165)
              [FRAME] Icon (ID: 2:166) - Chevron down
          
          [FRAME] Container (ID: 2:168) - Observaciones
            [FRAME] Label (ID: 2:169)
              [TEXT] Observaciones (opcional) (ID: 2:170)
            [FRAME] Textarea (ID: 2:171)
              [TEXT] Agregar notas adicionales... (ID: 2:172)
          
          [FRAME] Container (ID: 2:173) - Action buttons
            [FRAME] Button (ID: 2:174) - Cancelar
              [TEXT] Cancelar (ID: 2:175) -> 'Cancelar'
            [FRAME] Button (ID: 2:176) - Confirmar Movimiento
              [TEXT] Confirmar Movimiento (ID: 2:177) -> 'Confirmar Movimiento'
      
      [FRAME] Container (ID: 2:178) - Note
        [TEXT] → Flujo guiado: Validaciones en tiempo real previenen errores. Modal de confirmación antes de registrar. (ID: 2:179)
```

---

## 🎨 Elementos Visuales

### Header
- **Logo:** BrandStock icon + text
- **User Info:** "Juan Pérez"
- **Logout Button:** "Cerrar sesión"

### Page Header
- **Title:** "Registro de Movimiento"
- **Subtitle:** "Entrada o salida de productos del inventario"

### Form Fields

1. **Tipo de movimiento*** (Toggle/Switch)
   - **Entrada:** Radio button with arrow down-left icon
   - **Salida:** Radio button with arrow up-right icon

2. **Producto***
   - Search input: "Buscar por código o nombre..."
   - Search icon
   - Helper: "→ Autocompletado muestra código y stock en tiempo real"

3. **Cantidad***
   - Number input with placeholder "0"
   - Helper: "→ Validación en tiempo real para salidas"

4. **Motivo***
   - Dropdown: "Seleccionar motivo..."
   - Options: Compra, Venta, Merma, Ajuste, Devolución

5. **Observaciones** (Optional)
   - Textarea: "Agregar notas adicionales..."

### Action Buttons
- **Cancelar:** Secondary button
- **Confirmar Movimiento:** Primary button

### Note
- **Text:** "→ Flujo guiado: Validaciones en tiempo real previenen errores. Modal de confirmación antes de registrar."

---

## 🔧 Especificaciones Técnicas

### Form Validation
- **Required fields:** Tipo de movimiento, Producto, Cantidad, Motivo
- **Cantidad validation:**
  - Must be positive number
  - For "Salida": cannot exceed current stock (real-time validation)
- **Producto:** Must select from existing products

### Movement Types
- **Entrada:** Increases inventory (Compra, Devolución, Ajuste positivo)
- **Salida:** Decreases inventory (Venta, Merma, Ajuste negativo)

### Motivos
- Compra
- Venta
- Merma
- Ajuste
- Devolución

### API Endpoints Needed
- POST `/api/movements` - Create new movement
- GET `/api/products/search?q={query}` - Search products with autocomplete
- GET `/api/products/:id/stock` - Get current stock for validation

### Form Data Structure
```json
{
  "type": "entrada|salida",
  "product_id": 1,
  "quantity": 10,
  "reason": "Compra|Venta|Merma|Ajuste|Devolución",
  "notes": "Optional notes"
}
```

### Navigation
- **Cancelar:** Returns to Dashboard
- **Confirmar Movimiento:** Shows confirmation modal, then on success returns to Dashboard

### Real-time Features
- Product autocomplete with stock info
- Stock validation for outgoing movements
- Quantity validation (prevent negative stock)

### Confirmation Modal
Before submitting, show modal with:
- Movement summary
- Product name and current/new stock
- Confirm/Cancel buttons
