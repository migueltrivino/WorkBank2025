# 💼 Work Bank

Plataforma web desarrollada para conectar trabajadores independientes con clientes que requieren servicios específicos.  
Permite la **gestión de usuarios, servicios y ofertas laborales**, con un **panel administrativo**, estadísticas, filtros de búsqueda y un diseño moderno enfocado en la usabilidad (UX/UI).

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** React.js + Vite  
- **Backend:** Node.js + Express  
- **Base de Datos:** MySQL  
- **ORM / Conexión:** Sequelize / MySQL2  
- **Estilos:** CSS modular, paleta corporativa azul  
- **Control de versiones:** Git & GitHub  

---

## 🧩 Estructura del Proyecto

```
Work-Bank/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Configuración de base de datos y entorno
│   │   ├── controllers/   # Lógica de negocio (CRUDs, validaciones)
│   │   ├── models/        # Modelos Sequelize
│   │   ├── routes/        # Endpoints API REST
│   │   └── server.js      # Servidor principal Express
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizables React
│   │   ├── pages/         # Páginas principales (Home, Admin, Login, etc.)
│   │   ├── context/       # Contextos globales (auth, UI)
│   │   ├── services/      # Peticiones a la API (axios)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tuusuario/work-bank.git
cd work-bank
```

---

### 2️⃣ Configurar el **Backend**

```bash
cd backend
npm install
```

Crea un archivo **.env** en la carpeta `backend/` con tus variables de entorno:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=workbank_db
JWT_SECRET=workbank_secret
```

Inicializa la base de datos (puedes hacerlo manualmente desde MySQL Workbench o con Sequelize Sync):

```bash
npm run dev
```

---

### 3️⃣ Configurar el **Frontend**

```bash
cd ../frontend
npm install
npm run dev
```

La aplicación se ejecutará en:

📍 **Frontend:** [http://localhost:5173](http://localhost:5173)  
📍 **Backend:** [http://localhost:5000](http://localhost:5000)

---

## 🔐 Roles del Sistema

- **Administrador:** Gestiona usuarios, servicios y ofertas laborales.
- **Usuario trabajador:** Publica y edita sus servicios u ofertas disponibles.
- **Usuario cliente:** Busca y contacta trabajadores según filtros (ubicación, categoría, precio, etc.).

---

## 🧠 Funcionalidades Principales

### 👥 Módulo de Usuarios
- Registro, inicio de sesión y actualización de perfil.  
- Roles diferenciados (Admin, Cliente, Trabajador).  
- Activación / desactivación de usuarios.  

### 💼 Módulo de Ofertas Laborales
- CRUD completo (crear, leer, actualizar, eliminar).  
- Filtros por categoría, ubicación, precio, tipo de servicio.  
- Sistema de búsqueda inteligente y paginación.

### 🧰 Panel Administrativo
- Listado de usuarios y servicios con **acciones rápidas** (editar, eliminar, desactivar).  
- **Modales interactivos** y notificaciones **toast** para retroalimentación visual.  
- Estadísticas dinámicas (número de usuarios activos, servicios, categorías, etc.).  

### 📊 Estadísticas
- Visualización de métricas mediante gráficos (Recharts).  
- Datos agrupados por categoría, rol y estado de actividad.

### 🎨 Diseño y UX/UI
- Paleta cromática basada en tonos azules:  
  - Azul oscuro `#0A2F5C`  
  - Azul medio `#236AB9`  
  - Azul claro `#A7C5EB`  
  - Blanco `#FFFFFF`  
  - Negro `#000000`
- Fuentes utilizadas: **Roboto** y **Poppins**  
- Interfaz modular y responsiva, con tarjetas limpias y bordes redondeados.

---

## 📂 Base de Datos MySQL

Tablas principales:
- `usuarios` → Roles, estado, información personal  
- `servicios` → Catálogo de servicios ofrecidos  
- `categorias` → Clasificación general  
- `ofertas_laborales` → Publicaciones creadas por trabajadores  
- `estadisticas` → Datos agregados para panel de administración  

Relaciones:
- Un usuario puede tener varios servicios.  
- Una categoría puede contener múltiples ofertas.  
- El administrador puede gestionar todos los registros.

---

## 🧑‍💻 Ejecución Rápida (modo desarrollo)

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

Abre ambos servidores y accede al proyecto desde tu navegador.

---

## 🛠️ Scripts útiles

**Backend**
```bash
npm run dev      # Inicia el servidor con nodemon
npm start        # Inicia el servidor en producción
npm run syncdb   # (opcional) Sincroniza las tablas con Sequelize
```

**Frontend**
```bash
npm run dev      # Ejecuta la app React
npm run build    # Compila para producción
npm run preview  # Previsualiza la build
```

---

## 🧾 Créditos

Proyecto desarrollado por **[Tu Nombre / Equipo de desarrollo]**  
En el marco del programa de formación **Análisis y Desarrollo de Software (SENA)**  
Docente guía: **Carolina Forero**

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**, lo que permite su uso y modificación con fines académicos o de desarrollo libre.
