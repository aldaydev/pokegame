06/01/2025 - Tarde - Trabajando la documentación...

# Pokemon Game (por Rafa Alday)

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

### ShowPokemon

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
    1. Al cargarse un mainPokemon, 




