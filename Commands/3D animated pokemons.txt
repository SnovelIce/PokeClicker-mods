// Find the existing script element
var existingScript = document.evaluate(
    '/html/body/script[9]',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
).singleNodeValue;

// Create a new script element with the desired content
var newScript = document.createElement('script');
newScript.type = 'text/html';
newScript.id = 'pokemonSpriteTemplate';
newScript.innerHTML = `
    <img class="enemy"
        data-bind="attr:{ src: 'http://www.pkparaiso.com/imagenes/xy/sprites/animados/' + Battle.enemyPokemon().name.toLowerCase() + '.gif' }"
        src=""/>
`;

// Replace the existing script with the new script
existingScript.parentNode.replaceChild(newScript, existingScript);
