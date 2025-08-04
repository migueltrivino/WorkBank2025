# Guia Estandares del codigo

# HTML

### Guía de Estándares de Código - HTML

Este documento establece las convenciones para mantener un código HTML limpio, legible y mantenible.

---

## a. Reglas de nombres

- **Clases CSS**:
  - Usar nombres descriptivos en minúsculas y separados por guiones (`kebab-case`).
  - Evitar abreviaciones ambiguas.
  - Ejemplo: `boton-enviar`, `tarjeta-producto`, `menu-principal`

- **ID**:
  - Usar solo si es estrictamente necesario.
  - Seguir el mismo estilo de `kebab-case`.

- **Archivos HTML**:
  - Nombres en minúsculas y separados por guiones.
  - Ejemplo: `index.html`, `registro-usuario.html`

---

## b. Comentarios y documentación interna

- Utilizar comentarios `<!-- comentario -->` solo cuando sea necesario explicar secciones no obvias del HTML.
- Comentar el cierre de estructuras largas o anidadas.

```html
<!-- Inicio del formulario de registro -->
<form>
  ...
</form> 
<!-- Fin del formulario de registro -->
No comentar código obvio o trivial. 
```

## c. Identación y estilo de código
Usar 2 espacios por nivel de indentación (no tabs).

Etiquetas deben estar correctamente anidadas.

Cerrar siempre las etiquetas, incluso si son opcionales (ej. </li>, </p>).

Mantener atributos ordenados y en líneas separadas si hay muchos.

Usar comillas dobles para los atributos (" ").

html ```

<!-- Correcto -->
<input type="text" name="usuario" id="usuario" placeholder="Ingresa tu usuario" />

<!-- Incorrecto -->
<input type=text name=usuario placeholder=Ingresa tu usuario>
```


### d. Ejemplos aceptados y no aceptados
Ejemplo Aceptado:

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulario de Registro</title>
  </head>
  <body>
    <!-- Contenedor principal -->
    <section class="formulario-registro">
      <h1>Registro de Usuario</h1>
      <form action="/registro" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
        
        <button type="submit" class="boton-enviar">Enviar</button>
      </form>
    </section>
  </body>
</html>
Ejemplo No Aceptado:
<html>
<head><title>Registro</title></head>
<body>
<form>
<input type=text name=nombre>
<button>Enviar</button>
</form>
</body>
</html>

--- 
# CSS

### Guía de Estándares de Código - CSS

Esta guía define las reglas para escribir código CSS limpio, consistente y mantenible en el proyecto.

---

## a. Reglas de nombres

- **Clases**:
  - Usar `kebab-case` (minúsculas y con guiones).
  - Los nombres deben ser descriptivos.
  - Ejemplos válidos: `boton-primario`, `menu-navegacion`, `tarjeta-producto`

- **IDs**:
  - Solo usarlos si es absolutamente necesario.
  - Seguir el mismo estilo de `kebab-case`.

- **Convención BEM (opcional pero recomendada)**:
  - `bloque__elemento--modificador`
  - Ejemplo: `boton__icono--grande`

---

## b. Comentarios y documentación interna


- Usar comentarios para explicar bloques de estilos complejos o específicos.
- Usar el formato `/* comentario */`

```css
/* Estilos para el botón principal */
.boton-primario {
  background-color: #007bff;
  color: white;
}
No comentar propiedades triviales o evidentes.
```

## c. Identación y estilo de código
Usar 2 espacios por nivel de indentación.

Siempre incluir una línea en blanco entre bloques de reglas.

Incluir siempre punto y coma (;) al final de cada propiedad.

Abrir llaves { en la misma línea de la regla.

```css
/* Correcto */
.tarjeta-producto {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}

/* Incorrecto */
.tarjeta-producto
{
border:1px solid #ccc
padding:16px
border-radius:8px
}
```

## d. Ejemplos aceptados y no aceptados
### Ejemplo Aceptado:

```css

/* Estilo para el encabezado */
.header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.menu-navegacion a {
  color: #333;
  text-decoration: none;
  margin-right: 15px;
}

.menu-navegacion a:hover {
  color: #007bff;
}  ```


### Ejemplo No Aceptado:

css```
.header{
background:#f8f9fa;padding:20px;border-bottom:1px solid #ddd}

.menu-navegacion a {color:#333;text-decoration:none;margin-right:15px}

.menu-navegacion a:hover {color:#007bff}
```
# JavaScript

Esta guía define las buenas prácticas para escribir código limpio, legible y consistente en este proyecto usando JavaScript.

---

## 1. Reglas de nombres

### a. Variables
- Usar `camelCase`
- Usar nombres descriptivos y claros
- No usar abreviaciones innecesarias ni símbolos especiales

```js
let nombreUsuario;   // Correcto
let edadTotal;       // Correcto
let x;               // Poco claro
let Nombre_Usuario;  // Formato incorrecto
```

### b. Clases
- Usar `PascalCase`
- Deben representar entidades u objetos

```js
class ProductoDigital {}  // Correcto
class usuario {}          // Formato incorrecto
```

### c. Funciones y métodos
- Usar `camelCase`
- Deben iniciar con un verbo y expresar una acción

```js
function obtenerDatos() {}    // Correcto
function calcularPrecio() {}  // Correcto
function Producto() {}        // Incorrecto (Parece una clase
```

---

## 2. Comentarios y documentación interna

- Usar `//` para comentarios breves
- Usar `/** ... */` para documentación de funciones
- Comentar el "por qué", no lo obvio

```js
// Correcto: Explica por qué
// Verificamos si el usuario tiene sesión activa
if (isAuthenticated) { ... }

// Incorrecto: Comentario obvio
// Suma a y b
function sumar(a, b) {
  return a + b;
}

/**
 * Calcula el total con impuestos incluidos
 * @param {number} precioBase
 * @returns {number}
 */
function calcularTotal(precioBase) {
  return precioBase * 1.19;
}
```

---

## 3. Identación y estilo de código

- Usar **2 espacios** para identar
- Llaves `{}` en la **misma línea**
- Separar bloques de código con líneas en blanco si son lógicos
- Máximo **80-100 caracteres por línea**

```js
// Correcto
function saludar(nombre) {
  if (nombre) {
    console.log(`Hola, ${nombre}`);
  }
}

// Incorrecto
function saludar(nombre){
if(nombre){
console.log("Hola " + nombre);}}
```

---

## 4. Ejemplos aceptados y no aceptados

| Correcto | Incorrecto |
|------------|---------------|
| `let totalPrecio = 0;` | `let TotalPrecio = 0;` |
| `class UsuarioActivo {}` | `class usuario_activo {}` |
| `function iniciarSesion() {}` | `function Iniciar_Sesion() {}` |
| `// Mostrar mensaje si está vacío` | `// mensaje` |

---

## 5. Herramientas de estilo de código

Usaremos linters y formateadores automáticos para mantener este estilo.

### ▶ ESLint

1. Instalar ESLint:

```bash
npm install eslint --save-dev
```

2. Inicializar configuración interactiva:

```bash
npx eslint --init
```

3. Agregar script en `package.json`:

```json
"scripts": {
  "lint": "eslint ."
}
```

4. Crear archivo `.eslintrc.json` con reglas recomendadas:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

---

## Aplicación en el código actual

1. Ejecuta el linter con:

```bash
npm run lint
```

2. Corrige los errores mostrados o usa:

```bash
npx eslint . --fix
```

Esto aplicará automáticamente las reglas de formato.

---

# Node.JS

# Guía de Estándares de Código - Node.js

Esta guía define las convenciones para escribir código limpio, legible y mantenible en entornos Node.js.

---

## a. Reglas de nombres

- **Variables y funciones**:
  - Usar `camelCase`.
  - Los nombres deben ser descriptivos.
  - Ej: `userService`, `getUserById()`
  - Ej: `get_user_by_id`, `a1`

- **Clases**:
  - Usar `PascalCase`.
  - Ej: `UserController`, `DatabaseConnection`

- **Constantes**:
  - En mayúsculas con guiones bajos.
  - Ej: `MAX_CONNECTIONS`, `PORT`

---

## b. Comentarios y documentación interna

- Usar comentarios `//` para una línea y `/** */` para bloques o documentación JSDoc.
- Documentar funciones, parámetros y retornos cuando sea necesario.

```js
/**
 * Obtiene un usuario por ID.
 * @param {number} id - ID del usuario.
 * @returns {Object|null}
 */
function getUserById(id) {
  // Buscar en la base de datos
  return db.find(user => user.id === id);
}
```
## c. Identación y estilo de código
Usar 2 espacios para identar.

Usar punto y coma (;) siempre.

Usar const y let, evitar var.

Agrupar requerimientos arriba.

Siempre usar comillas simples ' (salvo en JSON).

``` js
// Correcto
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Hola Mundo');
});
js
Copiar
Editar
// Incorrecto
var express=require("express")
const app=express()
app.get("/api",function(req,res){res.send("Hola Mundo")})
```
## d. Ejemplos aceptados y no aceptados

Ejemplo Aceptado:
```js

const express = require('express');
const router = express.Router();

/**
 * Controlador para obtener usuarios.
 */
router.get('/users', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

module.exports = router;
```
Ejemplo No Aceptado:
```js

var express = require("express")
var router = express.Router()
router.get("/users",function(req,res){res.json(getAllUsers())})
module.exports=router
```
