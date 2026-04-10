# Wireframe: Dashboard Principal

**Figma Node ID:** 1-45  
**URL:** https://www.figma.com/design/hGS1DCTninRpUXhSCM5mh6/BrandStock---Wireframes?node-id=1-45&m=dev

---

## 📐 Estructura del Wireframe

```
[FRAME] Dashboard principal (ID: 1:45)
  [FRAME] Dashboard (ID: 1:46)
    [FRAME] Header (ID: 1:47)
      [FRAME] Container (ID: 1:48)
        [FRAME] Container (ID: 1:49) - Logo
          [FRAME] Icon (ID: 1:50) - BrandStock icon
            [VECTOR] Vector (ID: 1:51-1:54)
          [FRAME] Heading 1 (ID: 1:55)
            [TEXT] BrandStock (ID: 1:56) -> 'BrandStock'
        [FRAME] Container (ID: 1:57) - User menu
          [FRAME] Text (ID: 1:58)
            [TEXT] Juan Pérez (ID: 1:59) -> 'Juan Pérez'
          [FRAME] Button (ID: 1:60) - Logout
            [FRAME] Icon (ID: 1:61)
              [VECTOR] Vector (ID: 1:62-1:64)
            [TEXT] Cerrar sesión (ID: 1:65) -> 'Cerrar sesión'
    
    [FRAME] Main Content (ID: 1:66)
      [FRAME] Container (ID: 1:67) - Page header
        [FRAME] Heading 2 (ID: 1:68)
          [TEXT] Dashboard Principal (ID: 1:69) -> 'Dashboard Principal'
        [FRAME] Paragraph (ID: 1:70)
          [TEXT] Vista general del inventario (ID: 1:71) -> 'Vista general del inventario'
      
      [FRAME] Container (ID: 1:72) - KPI Cards
        [FRAME] Card (ID: 1:73) - Total Productos
          [FRAME] CardHeader (ID: 1:74)
            [FRAME] CardTitle (ID: 1:75)
              [TEXT] Total Productos Activos (ID: 1:76) -> 'Total Productos Activos'
            [FRAME] Icon (ID: 1:77) - Package icon
          [FRAME] CardContent (ID: 1:82)
            [FRAME] Dashboard (ID: 1:83)
              [TEXT] 10 (ID: 1:84) -> '10'
            [FRAME] Dashboard (ID: 1:85)
              [TEXT] En catálogo (ID: 1:86) -> 'En catálogo'
        
        [FRAME] Card (ID: 1:87) - Stock Bajo
          [FRAME] CardHeader (ID: 1:88)
            [FRAME] CardTitle (ID: 1:89)
              [TEXT] Stock Bajo (<10) (ID: 1:90) -> 'Stock Bajo (<10)'
            [FRAME] Icon (ID: 1:91) - Alert icon
          [FRAME] CardContent (ID: 1:96)
            [FRAME] Dashboard (ID: 1:97)
              [TEXT] 2 (ID: 1:98) -> '2'
            [FRAME] Dashboard (ID: 1:99)
              [TEXT] Requieren atención (ID: 1:100) -> 'Requieren atención'
        
        [FRAME] Card (ID: 1:101) - Movimientos Hoy
          [FRAME] CardHeader (ID: 1:102)
            [FRAME] CardTitle (ID: 1:103)
              [TEXT] Movimientos Hoy (ID: 1:104) -> 'Movimientos Hoy'
            [FRAME] Icon (ID: 1:105) - Activity icon
          [FRAME] CardContent (ID: 1:107)
            [FRAME] Dashboard (ID: 1:108)
              [TEXT] 5 (ID: 1:109) -> '5'
            [FRAME] Dashboard (ID: 1:110)
              [TEXT] Registrados hoy (ID: 1:111) -> 'Registrados hoy'
      
      [FRAME] Container (ID: 1:112) - Charts & Table
        [FRAME] Card (ID: 1:113) - Stock por Categoría
          [FRAME] CardHeader (ID: 1:114)
            [FRAME] CardTitle (ID: 1:115)
              [TEXT] Stock por Categoría (ID: 1:116) -> 'Stock por Categoría'
          [FRAME] CardContent (ID: 1:117)
            [FRAME] BarChart (ID: 1:118) - Chart visualization
              [FRAME] Surface (ID: 1:119)
                [GROUP] Grid lines and axes
                [GROUP] Category labels: Electrónica, Accesorios, Mobiliario, Iluminación, Papelería
                [GROUP] Bar data visualization
          [FRAME] Dashboard (ID: 1:187)
            [TEXT] → Visualización rápida de distribución de inventario (ID: 1:188)
        
        [FRAME] Card (ID: 1:189) - Últimos Movimientos
          [FRAME] CardHeader (ID: 1:190)
            [FRAME] CardTitle (ID: 1:191)
              [TEXT] Últimos 5 Movimientos (ID: 1:192) -> 'Últimos 5 Movimientos'
          [FRAME] CardContent (ID: 1:193)
            [FRAME] Dashboard (ID: 1:194) - Movement list
              [FRAME] Container (ID: 1:195) - Movement 1
                [FRAME] Icon (ID: 1:197) - Entry arrow
                [FRAME] Container (ID: 1:200)
                  [TEXT] Mouse Logitech M185 (ID: 1:202)
                  [TEXT] Compra · 20 unid. · 2026-04-08 09:15 (ID: 1:204)
              [FRAME] Container (ID: 1:205) - Movement 2
                [FRAME] Icon (ID: 1:207) - Exit arrow
                [FRAME] Container (ID: 1:210)
                  [TEXT] Silla Ergonómica Office Pro (ID: 1:212)
                  [TEXT] Venta · 3 unid. · 2026-04-08 10:30 (ID: 1:214)
              [FRAME] Container (ID: 1:215) - Movement 3
                [FRAME] Icon (ID: 1:217) - Entry arrow
                [FRAME] Container (ID: 1:220)
                  [TEXT] Cable HDMI 2m (ID: 1:222)
                  [TEXT] Compra · 50 unid. · 2026-04-08 11:45 (ID: 1:224)
              [FRAME] Container (ID: 1:225) - Movement 4
                [FRAME] Icon (ID: 1:227) - Exit arrow
                [FRAME] Container (ID: 1:230)
                  [TEXT] Resma Papel A4 500 hojas (ID: 1:232)
                  [TEXT] Venta · 15 unid. · 2026-04-08 14:20 (ID: 1:234)
              [FRAME] Container (ID: 1:235) - Movement 5
                [FRAME] Icon (ID: 1:237) - Exit arrow
                [FRAME] Container (ID: 1:240)
                  [TEXT] Laptop Dell Inspiron 15 (ID: 1:242)
                  [TEXT] Venta · 2 unid. · 2026-04-07 16:30 (ID: 1:244)
            [FRAME] Button (ID: 1:245) - Ver catálogo completo
              [TEXT] Ver catálogo completo (ID: 1:246)
      
      [FRAME] Container (ID: 1:247) - Responsive note
        [TEXT] → Responsive: En móvil, las 3 tarjetas de KPI se apilan verticalmente... (ID: 1:248)
    
    [FRAME] Button (ID: 1:249) - Floating Action Button
      [FRAME] Icon (ID: 1:250) - Plus icon
      [TEXT] Nuevo Movimiento (ID: 1:253) -> 'Nuevo Movimiento'
```

---

## 🎨 Elementos Visuales

### Header
- **Logo:** BrandStock icon + text
- **User Info:** "Juan Pérez"
- **Logout Button:** With logout icon

### Page Header
- **Title:** "Dashboard Principal"
- **Subtitle:** "Vista general del inventario"

### KPI Cards (3 cards in a row)
1. **Total Productos Activos**
   - Value: 10
   - Subtext: "En catálogo"
   - Icon: Package

2. **Stock Bajo (<10)**
   - Value: 2
   - Subtext: "Requieren atención"
   - Icon: Alert triangle
   - Highlighted as warning

3. **Movimientos Hoy**
   - Value: 5
   - Subtext: "Registrados hoy"
   - Icon: Activity/Arrows

### Charts Section
- **Stock por Categoría:** Bar chart showing:
  - Electrónica
  - Accesorios
  - Mobiliario
  - Iluminación
  - Papelería

### Recent Movements Table
- **Title:** "Últimos 5 Movimientos"
- **Columns:** Icon (entry/exit), Product name, Details (type · quantity · date)
- **Sample Data:**
  - Mouse Logitech M185 - Compra · 20 unid. · 2026-04-08 09:15
  - Silla Ergonómica Office Pro - Venta · 3 unid. · 2026-04-08 10:30
  - Cable HDMI 2m - Compra · 50 unid. · 2026-04-08 11:45
  - Resma Papel A4 500 hojas - Venta · 15 unid. · 2026-04-08 14:20
  - Laptop Dell Inspiron 15 - Venta · 2 unid. · 2026-04-07 16:30
- **Action Button:** "Ver catálogo completo"

### Floating Action Button (FAB)
- **Position:** Bottom right
- **Icon:** Plus
- **Text:** "Nuevo Movimiento"

---

## 🔧 Especificaciones Técnicas

### Responsive Behavior
- **Desktop:** 3 KPI cards in a row, chart and movements side by side
- **Mobile:** KPI cards stack vertically, chart above movements table

### Data Requirements
- **KPIs:**
  - Total active products count
  - Low stock items count (< 10 units)
  - Today's movements count
  
- **Chart Data:**
  - Stock quantity grouped by category
  
- **Recent Movements:**
  - Last 5 inventory movements
  - Type (Compra/Venta/Ajuste/Merma/Devolución)
  - Product name
  - Quantity
  - Timestamp

### API Endpoints Needed
- GET `/api/dashboard/stats` - KPI data
- GET `/api/dashboard/categories` - Chart data
- GET `/api/movements/recent?limit=5` - Recent movements

### Navigation Links
- "Ver catálogo completo" → `/products`
- "Nuevo Movimiento" → `/movements/new`
- "Cerrar sesión" → Logout action
