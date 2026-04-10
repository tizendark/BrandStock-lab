# Wireframe: Recuperar Contraseña

**Figma Node ID:** 2-181  
**URL:** https://www.figma.com/design/hGS1DCTninRpUXhSCM5mh6/BrandStock---Wireframes?node-id=2-181&m=dev

---

## 📐 Estructura del Wireframe

```
[FRAME] Recuperar contraseña (ID: 2:181)
  [FRAME] ForgotPassword (ID: 2:182)
    [FRAME] Container (ID: 2:183)
      [FRAME] Container (ID: 2:184) - Header con logo
        [FRAME] Container (ID: 2:185)
          [FRAME] Container (ID: 2:186)
            [FRAME] Icon (ID: 2:187) - Logo BrandStock
              [VECTOR] Vector (ID: 2:188)
              [VECTOR] Vector (ID: 2:189)
              [VECTOR] Vector (ID: 2:190)
              [VECTOR] Vector (ID: 2:191)
        [FRAME] Heading 1 (ID: 2:192)
          [TEXT] BrandStock (ID: 2:193) -> 'BrandStock'
      [FRAME] Container (ID: 2:194) - Formulario
        [FRAME] Button (ID: 2:195) - Volver al login
          [FRAME] Icon (ID: 2:196) - Flecha izquierda
            [VECTOR] Vector (ID: 2:197)
            [VECTOR] Vector (ID: 2:198)
          [TEXT] Volver al login (ID: 2:199) -> 'Volver al login'
        [FRAME] Container (ID: 2:200) - Título y descripción
          [FRAME] Heading 2 (ID: 2:201)
            [TEXT] ¿Olvidaste tu contraseña? (ID: 2:202) -> '¿Olvidaste tu contraseña?'
          [FRAME] Paragraph (ID: 2:203)
            [TEXT] Ingresa tu email corporativo y te enviaremos un en... (ID: 2:204) -> 'Ingresa tu email corporativo y te enviaremos un enlace para restablecer tu contraseña.'
        [FRAME] Form (ID: 2:205)
          [FRAME] Container (ID: 2:206) - Campo email
            [FRAME] Label (ID: 2:207)
              [TEXT] Email corporativo (ID: 2:208) -> 'Email corporativo'
            [FRAME] Container (ID: 2:209)
              [FRAME] Input (ID: 2:210)
                [TEXT] usuario@empresa.com (ID: 2:211) -> 'usuario@empresa.com'
              [FRAME] Icon (ID: 2:212) - Icono email
                [VECTOR] Vector (ID: 2:213)
                [VECTOR] Vector (ID: 2:214)
          [FRAME] Button (ID: 2:215) - Botón enviar
            [TEXT] Enviar enlace de recuperación (ID: 2:216) -> 'Enviar enlace de recuperación'
        [FRAME] Container (ID: 2:217) - Nota de ayuda
          [FRAME] Paragraph (ID: 2:218)
            [TEXT] ¿No tienes acceso? Contacta al área de IT para obt... (ID: 2:219) -> '¿No tienes acceso? Contacta al área de IT para obtener tus credenciales.'
      [FRAME] Container (ID: 2:220) - Nota técnica
        [TEXT] → Flujo de seguridad: Sistema valida email en back... (ID: 2:221) -> '→ Flujo de seguridad: Sistema valida email en backend y envía token temporal vía SMTP. No se revela si el email existe para prevenir enumeración de usuarios.'
```

---

## 🎨 Elementos Visuales

### Header
- **Logo:** Icono vector compuesto (BrandStock)
- **Título:** "BrandStock"

### Navegación
- **Botón "Volver al login":** Con icono de flecha izquierda

### Formulario Principal
- **Título:** "¿Olvidaste tu contraseña?"
- **Descripción:** "Ingresa tu email corporativo y te enviaremos un enlace para restablecer tu contraseña."
- **Campo Email:**
  - Label: "Email corporativo"
  - Placeholder: "usuario@empresa.com"
  - Icono de email a la izquierda
- **Botón:** "Enviar enlace de recuperación" (primario)

### Notas
- **Nota de ayuda:** "¿No tienes acceso? Contacta al área de IT para obtener tus credenciales."
- **Nota técnica:** Explica el flujo de seguridad (validación en backend, token temporal vía SMTP, prevención de enumeración)

---

## 🔧 Especificaciones Técnicas

### Flujo de Seguridad
1. Usuario ingresa email corporativo
2. Sistema valida email en backend
3. Si existe, envía token temporal vía SMTP
4. **Importante:** No revelar si el email existe (prevenir enumeración de usuarios)
5. Mostrar mensaje genérico: "Si el email existe, recibirás un enlace"

### Integración Backend
- **Endpoint:** POST /api/auth/forgot-password
- **Request:** { email: string }
- **Response:** { message: string } (siempre exitoso para prevenir enumeración)

### Notas de Implementación
- Validar formato de email antes de enviar
- Deshabilitar botón mientras se procesa
- Mostrar estado de carga (spinner)
- Redirigir a login después de envío exitoso
