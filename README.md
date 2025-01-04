04/01/2025 - Tarde - Trabajando la documentación...

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
- Cazar pokemons: Una vez registrado, el usuario podrá cazar pokemons, guardarlos en su pokedex. También podrá liberarlos. Todo el proceso actualizará los estados correspondientes de cantidad de pokemons del usuario, cantidad de pokeballs que tiene...
- Cumplit logros: La dinámica del juego es que, al cumplir logros, se le dan pokeballs al usuario, lo que le permite seguir jugando.

## 📂 Componentes, páginas y contextos:

### index.js

Aquí es donde he colocado los "contextos" que envuelven toda la aplicaicón y que explicaré a continuación.

### PokeContext.js

Este contexto contiene todo lo relacionado con mostrar:
    - Obtener el listado de tipos de pokemon
    - Obtener los pokemons de un tipo
    - Obtener los 151 pokemons
    - Obtener el main pokemon (pokemon principal-seleccionado del que podremos obtener información detallada)
    - Buscar un pokemon por nombre
    - Comprobar si el usuario (si está logeado) tiene el main pokemon.

### AuthContext.js

### App.js

Es el componente principal que incluye el Header, Footer y las rutas necesarias. También incluye la animación que aparece al pasarte el juego (cazar los 151 pokemons), que ocupará toda la pantalla.

