#  Git Workflow - Proyecto [WorkBank.W]

Este documento define las reglas que debe seguir el equipo para trabajar de manera ordenada con Git y GitHub.

---

## a.  Convención de Commits

Los mensajes de commit deben ser **claros, breves y en infinitivo** (lo que se hizo). Se recomienda el formato:


### Tipos de commit:
| Tipo     | Significado                          | Ejemplo                             |
|----------|--------------------------------------|-------------------------------------|
| feat     | Se agregó una nueva funcionalidad    | feat: agregar formulario de login   |
| fix      | Se corrigió un error                 | fix: corregir validación del correo |
| style    | Cambios de estilo (CSS, formato)     | style: mejorar diseño de botones    |
| docs     | Solo documentación                   | docs: actualizar README             |
| refactor | Cambio interno sin modificar lógica  | refactor: simplificar función total |
| test     | Agregar/modificar pruebas            | test: agregar test para login       |

> Ejemplo correcto:  
> `feat: crear componente de tarjeta de producto`  
> Ejemplo incorrecto:  
> `cosas nuevas` o `update`

---

## b. Frecuencia de push/pull

### Pull (traer cambios):
- Antes de empezar a trabajar cada día.
- Antes de hacer un push (para evitar conflictos).
```bash
git pull origin main


git add .
git commit -m "feat: crear lógica de registro"
git push origin nombre-de-la-rama
```


## C.Política de Pull Requests (PR)

Cada nueva funcionalidad o corrección debe ir en una rama.

Usar pull requests para fusionar a la rama main.

Otro miembro del equipo debe revisar (peer review).

El título del PR debe describir qué se hizo:
feat: implementar módulo de autenticación

Reglas:
Crear rama con nombre claro: feat/login, fix/navbar, etc.

Hacer push de la rama.

Crear PR desde esa rama hacia main.

Solicitar revisión a otro integrante.

Solo se aprueba si:

El código funciona.

Sigue las convenciones.

No rompe nada.