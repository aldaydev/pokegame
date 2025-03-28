const { Builder, By, until } = require("selenium-webdriver");
const assert = require('assert');

(async function searchPokemonTest(){

    //1. Crear nueva instancia de chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        //2. Navegar a la web
        await driver.get('http://localhost:3000');

        //3. Esperar hasta que el título de la página esté disponible
        await driver.wait(until.titleIs('Poke Game - Alday Dev'), 5000);

        //4. Localizar el input de búsqueda
        let searchInput = await driver.findElement(By.css('.nav-form-input'));
        console.log('Input de búsqueda encontrado');

        //5. Escribir en el input de búsqueda
        await searchInput.sendKeys('Charmander');
        console.log('Texto introducido');

        //6. Localizar y pulsar el botón de búsqueda
        let searchButton = await driver.findElement(By.css('.nav-form-submit'));
        await searchButton.click();

        //7. Localizar y esperar al elemento del resultdo
        let resultElement = await driver.wait(
            until.elementLocated(By.css('.mainPoke-title')), 
            5000 // Tiempo máximo de espera en milisegundos
        );

        //8. Obtener texto del elemento del resultadp
        let result = await resultElement.getText();
        console.log(`El pokemon buscado es ${result}`);

        //9. Comprobar el resultado
        assert.strictEqual(result, 'CHARMANDER', 'El resultado de la búsqueda no es el esperado');

    }catch(error){
        console.log('Error at testing search Pokemon functionality', error);

    }finally{
        await driver.quit();
    }

})();