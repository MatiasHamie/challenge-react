# Este proyecto fue creado con REACT - [Create React App] template Typescript

`https://github.com/facebook/create-react-app`

# Puntos completos de las consignas (4 de 5)

### 1) COMPLETO   Como admin quiero saber cuántas cajas de birras tengo que comprar par apoder aprovisionar la meetup
### 2) COMPLETO   Como admin y usuario quiero conocer la temperatura del día de la meetup para saber si va a hacer calor o no
### 3) INCOMPLETO Como usuario y como admin quiero poder recibir notificaciones para estar al tanto de las meetups
### 4) COMPLETO   Como usuario quiero hacer check-in en una meetup para poder avisar que estuve ahí

# Pasos para instalarlo

### 1 - Clonar el repositorio o bajar el zip

### 2 - Ejecutar npm i para instalar los modulos necesarios

# Instrucciones de Uso

### Paginas de autorizacion y registro:

# Pagina de Registro:

- Screenshots:

  - Web:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500373/Santander-Challenge-Birras/Register-Page_djgg2i.jpg`
  - Responsive:
    `https://res.cloudinary.com/tuteh/image/upload/v1619530253/Santander-Challenge-Birras/Register-Page-Responsive_zqvid1.jpg`

  - Nos registramos completando los datos que figuran en la misma.
  - Para facilitar las pruebas, agregué un dropmenu para elegir tipo de usuario.
  - Una vez válidos los campos, click en registrar, y automaticamente redirecciona al Home Page.

# Página de Login:

- Screenshots:

  - Web:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500309/Santander-Challenge-Birras/Login-Page_cmn4ac.jpg`
  - Responsive:
    `https://res.cloudinary.com/tuteh/image/upload/v1619530253/Santander-Challenge-Birras/Login-Page-Responsive_i2b7lv.jpg`

  - Eligir el idioma sobre el cual se desea trabajar clickeando en la banderita que corresponda
  - Nos logueamos llenando los campos con un usuario previamente creado.
  - Para facilitar las pruebas, agregue un boton que te llena los campos con un usuario Admin y otro usuario común
  - Click en Login para poder ingresar a la App.

# Proteccion de Rutas:

    - Hay guards para poder acceder al home page (Router publico) solamente cuando estemos logueados en la app.

# Pagina Inicio (Home)

- Screenshots:

  - Web:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500876/Santander-Challenge-Birras/Home-Page_t2jgma.jpg`
  - Responsive:
    `https://res.cloudinary.com/tuteh/image/upload/v1619529612/Santander-Challenge-Birras/Home-Page-Responsive_q39l2a.jpg`

  - Se podrá elegir clickeando en la imagen con la leyenda que le interese al usuario.
  - Las opciones son:
    - Crear una Meetup
    - Mostrar Lista de Meetups ya creadas (las q estoy participando, creadas por otros, creadas por mi (solo admin))

# Pagina Crear Meetup

- Screenshots:

  - Web:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500876/Santander-Challenge-Birras/Create-Meetup-Filled-Form-Without-Guest-List_b05dl9.jpg`

  - Web con lista de invitados (menu toggleable/ocultable):
    `https://res.cloudinary.com/tuteh/image/upload/v1619500876/Santander-Challenge-Birras/Create-Meetup-Filled-Form-With-Guest-List_ojpcyx.jpg`

  - Responsive:
    `https://res.cloudinary.com/tuteh/image/upload/v1619529612/Santander-Challenge-Birras/Create-Meetup-Filled-Form-With-Guest-List-Responsive-PT1_parppj.jpg`

  - Responsive con lista de invitados Parte 1 (menu toggleable/ocultable)
    `https://res.cloudinary.com/tuteh/image/upload/v1619529612/Santander-Challenge-Birras/Create-Meetup-Filled-Form-With-Guest-List-Responsive-PT1_parppj.jpg`

  - ### Solo se podra acceder al formulario si el usuario es del tipo admin
  - ### Completar Campos:

    ### Dia, horas y minutos

    - Fecha: Debe ser desde el día de hoy, al futuro con 5 días máximo de diferencia.
    - Horas: 2 números de 00 a 23
    - Minutos: 2 números de 00 a 59

    ### Direccion, altura y validar

    - Dirección Calle: Escribir el nombre de la calla
    - Direccion Altura: Escribir la altura del lugar
    - Validar dirección: Una vez completados los campos Calle y altura, de debe validar la dirección para que la API del gobierno nacional, traiga las localidades
      en donde hay una dirección con ese nombre, esto trae la información correcta de la ubicacion para poder obtener datos climáticos mas especificos.

    - Seleccionar del dropmenu la localidad correspondiente.

    ### Invitaciones

    - Invitar personas: Clickear en invitar personas, para poder desplegar una tabla donde figuran todos los usuarios registrados (menos vos), donde podrás elegir a quien
      invitar. Una vez completado, cerrar la misma.

    ### Birras y Clima:

    - Clickear en Calcular Birras y Clima, para obtener los datos correspondientes, se los podrá previsualizar en el footer del form.
    - Finalizar clickeando en Crear.

# Pagina Listado de Meetups

- Screenshots:

  - Web:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500876/Santander-Challenge-Birras/List-Of-Meetups_va6onp.jpg`

  - Responsive PT1:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500876/Santander-Challenge-Birras/List-Of-Meetups-Responsive-PT1_e5oauc.jpg`

  - Responsive PT2:
    `https://res.cloudinary.com/tuteh/image/upload/v1619500876/Santander-Challenge-Birras/List-Of-Meetups-Responsive-PT1_e5oauc.jpg`

  ### Listado:

  - Se podran observar 3 tipos de aplicaciones:
    - Creadas por Mi (solo admin): Este es el unico caso donde se puede eliminar una aplicación clickeando en el icono Trash / Basura
    - Creadas por otro: Tendremos la opcion de participar o cancelar la participación de la misma recalculando las birras necesarias

# Stack utilizado

# APIs utilizadas:

### Para las localidades:

### API del Servicio de Normalización de datos Geográficos

    - Documentación:
        - `https://datosgobar.github.io/georef-ar-api/quick-start/`
        - `https://medium.com/datos-argentina/c%C3%B3mo-se-usa-y-hacia-d%C3%B3nde-va-la-api-georef-b8c27943f47b`

    - Al colocar la dirección del lugar de la meetup, obtengo los barrios con esta api, para poder obtener coordenadas (lat, lon)
    mas exactas y lograr un pronóstico mas acertado.

### API del clima

    - Documentacion:
        - `https://rapidapi.com/community/api/open-weather-map`
    - Use el endpoint que trae pronóstico de 5 días y cada dia trae datos de lapsos de 3 horas.

### Estilos:

    - Sass: `npm install node-sass --save`
    - Bootstrap (CDN: Css y JS bundle)
    - Fontawesome (CDN)
    - Google Fonts (CDN)
    - Animate.css `npm install animate.css --save`

### React Router

    - React Router Dom: `npm install react-router-dom`

### Manejo de estado

    - Redux: Con el hice el CRUD de las meetups.
    - React-Redux
    - Redux-Thunk (para tareas async)

### Autorizacion de usuarios

    - Firebase `npm install firebase`

### Base de datos

    - Firestore (incluido en firebase)

### Manejo de errores

    - SweetAlert2: Modal customizable para mostrar el error
        - `npm install --save sweetalert2 sweetalert2-react-content`
        - Documentacion: `https://github.com/sweetalert2/sweetalert2-react-content`

    - Validator: Facilita expresiones condicionales como "validator.isEmail(emailAComprobar)"
        - `npm install validator`
        - Documentacion: `github.com/validatorjs/validator.js`

    - Moment JS:

### Traducciones entre español e ingles

    - i18next: `npm install i18next react-i18next`
    Documentacion: `https://react.i18next.com/legacy-v9/step-by-step-guide`

### Custom Hooks:

    - useForm (Resumen):
        - Recibe un form y devuelve los key-value pair del mismo.
        - Resetea al valor inicial deseado (opcional) o a un form vacio
        - Permite modificar valores con el onChange del form desde el Componente sin entrar al hook
