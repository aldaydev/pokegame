# Pokemon Game (por Rafael Alday | Alday Dev)

## ⭐ Tecnologías utilizadas:

<div style="display: flex; flex-wrap: wrap; justify-content: center">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white&color=black" alt="React Badge">
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white&color=white" alt="React Router Badge">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white&color=black" alt="Node.js Badge">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white&color=black" alt="Firebase Badge">
    <img src="https://img.shields.io/badge/Firestore-FFA000?style=for-the-badge&logo=firebase&logoColor=white&color=black" alt="Firestore Badge">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&color=black" alt="JavaScript Badge">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&color=black" alt="HTML5 Badge">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white&color=black" alt="CSS3 Badge">
</div>




## 🗒️ Descripción general:
- Esta aplicación es un juego de pokemon en el que puedes cazarlos, guardarlos en tu pokedex, liberarlos y recibir pokeballs al cumplir logros.
- La app ha sido diseñada con React JS.
- Tanto el listado de tipos, como el listado completo, así como la información de cada pokemon ha sido extraida de la API pokeApi.
- El sistema de registro ha sido creado con FireBase Auth. En el proceso además se crea un documento por usuario en una colección en FireStore, donde se almacenan datos como la cantidad de pokemons cazados, la cantidad de pokeballs del usuario o los logros cumplidos. Además, dichos datos también se almacenan en LocalStorage para mantener la sesión al volver a entrar en la página.
- Uso FireStore para almacenar todos los logros que se pueden cumplir.    

## 🛠️ Funcionalidades:

- Buscar pokemons: Por tipo, por listado completo o por nombre utilizando el input de búsqueda.
- Registro y almacenamiento de los datos del juego del usuario.
- Cazar pokemons: Una vez registrado, el usuario podrá cazar pokemons y guardarlos en su pokedex. También podrá liberarlos. Todo el proceso actualizará los estados correspondientes de cantidad de pokemons del usuario, cantidad de pokeballs y logros conseguidos.
- Cumplir logros: La dinámica del juego es que, al cumplir logros, se le dan pokeballs al usuario, lo que le permite seguir jugando.
- Si el usuario se queda sin pokeballs (y no cumple un logro en esa tirada, deberá esperar 10 segundos para recibir 3 pokeballs)

## 📂 Componentes, páginas y contextos:

## 1 - index.js

Aquí es donde he colocado los "contextos" que envuelven toda la aplicaicón y que explicaré a continuación.

## 2 - Contextos: 

### PokeContext.js

Este contexto contiene todo lo relacionado con:
    - Obtener el listado de tipos de pokemon
    - Obtener los pokemons de un tipo
    - Obtener los 151 pokemons
    - Obtener el main pokemon (pokemon principal-seleccionado del que podremos obtener información detallada)
    - Buscar un pokemon por nombre
    - Comprobar si el usuario (si está logeado) tiene el main pokemon.

### AuthContext.js

Este contexto contiene todo lo relacionado con:

    - SignIn (Iniciar sesión)
    - SignUp (Crear cuenta)
    - Eliminar cuenta
    - Recuperar datos del usuario de LocalStorage
    - Obtener el listado de logros general
    - Actualizar pokeballs, pokemons cazados y logros del usuario
    - Gestionar cuando un usuario se queda sin pokeballs (timeOut, mensaje con cuenta atrás y entregar 3 pokeballs)
    - Gestionar logros del usuario al conseguirlos (mensajes y actualización de datos)

## 3 - App.js

Es el componente principal que incluye el Header, Footer y las rutas necesarias. También incluye la animación que aparece al pasarte el juego (cazar los 151 pokemons), que ocupará toda la pantalla.

## 4 - Pages

### ShowPokemon.js

ShowPokemon es la página que aparecerá al buscar pokemons por tipo o en el listado general. Se compone de dos componentes:

### PokeList.js

- Este componente mostrará el listado de pokemons de un tipo concreto o el listado completo, dependiendo de los valores que se le entreguen como prop al componente. 
- Al pulsar en uno de los pokemons del listado, este se marcará como mainPoke (pokemon principal).
- Si el usuario tiene un pokemon en la pokedex, éste se marcará en el listado de PokeList con un fondo verde claro.

### MainPoke.js

- Este componente contiene el Pokemon principal y es donde podremos inciar el proceso de cazado.
- Al buscar un pokemon por tipo o listado general, el pokemon principal será por defecto el primero de la lista.
- El pokemon principal contiene más información sobre el pokemon, como estadísticas, su tipo o habilidades entre otras.

- El botón del componente mainPoke será fundamental en la app. Tiene varios estados (cada uno con una imagen y estilos diferentes):
    1. Si no estamos logeados, nos invitará a hacerlo
    2. Si estamos logeados y NO tenemos el pokemon, podremos "lanzar una pokeball", iniciando el proceso de caza.
    3. Si estamos logeados y SI tenemos el pokemon, el botón nos llevará a nuestra zona de usuario donde está la pokedex y podremos verlo.

- Proceso de caza:
    1. Al cargarse un mainPokemon, se calcula si será cazado o no.
    Esto se hace a través del parámetro "exp (experience)" que se recoge de la API.
    Se genera un nº aleatorio con el que, si es menor o igual, el pokemon será cazado y, si es mayor, no será cazado.
    2. Aparece la animación de la pokeball.
    3. Aparece una alerta verde si el pokemon es cazado y roja si no.
    4. Si el pokemon es cazado, el botón del componente MainPoke.js cambiará e indicará que lo tenemos en nuestra pokedex. Además, en el listado de PokeList.js, se marcará en verde dicho pokemon.
    5. He trabajado los eventos "DROP", por lo que también puedes cazar los pokemons arrastrando la pokeball sobre el main pokemon.

## User.js

En esta página es donde aparecerá lo relacionado con la cuenta del usuario. Si no está logeado, nos llevará a la página de registro. Si está logeado, nos llevará a la página del usuario.

Todas las operaciones referentes a firebase Auth y fireStore las tenemos el el archivo "utils/firebase.js".

Toda la información de juego del usuario se almacena, tanto en direStore como en LocalStorage para conservar los datos si se cierra el navegador.

### login.js

Aquí podremos, bien crear una cuenta con correo y contraseña, bien hacer signIn su ya la hemos creado.

Los campos email y contraseña tiene un una validación que proviene del archivo "utils/validations.js".

    - El email debe tener un formato correcto xxx@xxx.xx
    - La contraseña debe contener al menos una letra, un nº, un caracter especial y 6 dígitos.

### Account.js

Este será el área de usuario. Aquí podremos encontrar:

    1. Opciones para cerrar sesión y borrar la cuenta. En el caso de borrar la cuenta nos aparecerá una alerta para que confirmemos, indicándonos que perderemos todo nuestro progreso en el juego.

    2. Cantidad de pokeballs del usuario.

    3. La pokedex: 
     - Si no hay pokemons aparecerá un mensaje diciendo "Aquí aparecerán tus pokemons cuando los cazes". Si hemos cazado alguno, nos aparecerá.
     - Podemos LIBERAR POKEMONS. Para ello arrastramos la imagen del pokemon y automáticamente nos aparecerá el icono de un candado cerrado arriba a la derecha. Al poner la imagen sobre el candado se volverá verde y, si soltamos el pokemon encima, se recargará la página y se actualizarán los datos, tanto en firebase como en localStorage, eliminando dicho pokemon.

    4. Listado de logros:
     - Podemos ver un listado de los logros que podemos conseguir y las recompensas que obtendremos.
     - Se marcarán en verde los logros cumplidos y en rojo los que no.

## 📄 Estilos:

He tratado de darle un estilo coherente a la app, utilizando variables en css para los corolores y también para el box shadow de ciertos elementos.

He creado diferentes animaciones, tanto al mostrar elementos como alertas.

Toda la app es responsive y se ve correctamente en todos los dispositivos.





