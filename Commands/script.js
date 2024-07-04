PokemonFactory.generateWildPokemon = function(route, region, subRegion) {
    if (!MapHelper.validRoute(route, region)) {
        return new BattlePokemon('MissingNo.', 0, PokemonType.None, PokemonType.None, 0, 0, 0, 0, new Amount(0, GameConstants.Currency.money), false, 0, GameConstants.BattlePokemonGender.NoGender, GameConstants.ShadowStatus.None, EncounterType.route);
    }
    let name;
    const roaming = PokemonFactory.roamingEncounter(route, region, subRegion);
    if (roaming) {
        name = "Pikachu";
    } else {
        name = "Pikachu";
    }
    const basePokemon = PokemonHelper.getPokemonByName(name);
    const id = basePokemon.id;

    // Set health to 100,000
    const maxHealth = 100000;

    const catchRate = this.catchRateHelper(basePokemon.catchRate);
    const exp = basePokemon.exp;
    const level = this.routeLevel(route, region);
    const heldItem = this.generateHeldItem(basePokemon.heldItem, GameConstants.ROUTE_HELD_ITEM_MODIFIER);
    const money = this.routeMoney(route, region);
    const shiny = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
    const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
    const encounterType = roaming ? EncounterType.roamer : EncounterType.route;
    
    const customSpriteUrl = "https://cdn.discordapp.com/attachments/1258237203922817047/1258237248294617138/New_Project_2.png?ex=66875040&is=6685fec0&hm=0938b54c62dd719459b65623fe630abd025f822214248392c75eeb1d6fc0ead8&";

    if (shiny) {
        Notifier.notify({
            message: `✨ You encountered a shiny ${PokemonHelper.displayName(name)()}! ✨`,
            pokemonImage: PokemonHelper.getImage(id, shiny, basePokemon.gender),
            type: NotificationConstants.NotificationOption.warning,
            sound: NotificationConstants.NotificationSound.General.shiny_long,
            setting: NotificationConstants.NotificationSetting.General.encountered_shiny,
        });
    }
    if (roaming) {
        Notifier.notify({
            message: `You encountered a roaming ${name}!`,
            pokemonImage: PokemonHelper.getImage(id, shiny, basePokemon.gender),
            type: NotificationConstants.NotificationOption.warning,
            sound: NotificationConstants.NotificationSound.General.roaming,
            setting: NotificationConstants.NotificationSetting.General.encountered_roaming,
        });
        App.game.logbook.newLog(LogBookTypes.ROAMER, (shiny
            ? App.game.party.alreadyCaughtPokemon(id, true)
                ? createLogContent.roamerShinyDupe
                : createLogContent.roamerShiny
            : createLogContent.roamer)({
            location: Routes.getRoute(player.region, player.route).routeName,
            pokemon: name,
        }));
    }
    const ep = GameConstants.BASE_EP_YIELD * (roaming ? GameConstants.ROAMER_EP_MODIFIER : 1);

    const battlePokemon = new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, new Amount(money, GameConstants.Currency.money), shiny, 1, gender, GameConstants.ShadowStatus.None, encounterType, heldItem, ep);

    // Change the sprite image and size
    setTimeout(() => {
        const imageElement = document.evaluate("/html/body/div[12]/div[2]/div[2]/div[2]/div/div[1]/div/div[1]/div[1]/knockout/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (imageElement) {
            imageElement.src = customSpriteUrl;
            imageElement.width /= 2;
            imageElement.height /= 2;
        }
    }, 0);

    return battlePokemon;
}
App.game.pokeballs.calculateCatchTime = function () {
    return 0
}
App.game.pokeballs.getCatchBonus = function () {
    return - 1000
}
// Function to change the background image of the battle-view
function changeBattleViewBackground(newImageUrl) {
    // Select the battle-view element
    const battleViewElement = document.querySelector('.battle-view');

    // Check if the element exists
    if (battleViewElement) {
        // Change the background-image property
        battleViewElement.style.backgroundImage = `url(${newImageUrl})`;
    }
}

// Call the function with the new image URL
changeBattleViewBackground('https://cdn.discordapp.com/attachments/1258237203922817047/1258245749049921567/bg_1.png?ex=6687582b&is=668606ab&hm=41d5700a88712e70c5eeba6fdd6a48a997fcf9482dfeb4a26fe173e705baa360&');
App.game.party.caughtPokemon =[];
for (let index = 0; index < App.game.party.caughtPokemon.length; index++) {
    App.game.party.removePokemonByName(App.game.party.caughtPokemon[index].name)
}App.game.party.update(0)
App.game.party.gainPokemonByName("Typhlosion")
App.game.party.update(0)

// Change the sprite image and size

setTimeout(() => {
    const imageElement = document.evaluate("/html/body/div[12]/div[2]/div[1]/div/div[2]/div[3]/div[2]/div/div[1]/table/tbody/tr/td[1]/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (imageElement) {
        imageElement.src = "https://cdn.discordapp.com/attachments/1258237203922817047/1258237248512458895/New_Project_1.png?ex=66875040&is=6685fec0&hm=dc8c6a444db9b8ee770de09fba75fb0755fa15871bf21897d1a7508cd91f0303&";
        imageElement.width /= 2.9;
        imageElement.height /= 4.5;
    }
}, 1000);   
Battle.defeatPokemon()
setTimeout(() => {
    Battle.defeatPokemon()

}, 1000);


setTimeout(() => {
 
// Select the element using XPath
const element = document.evaluate("/html/body/div[12]/div[2]/div[2]/div[2]/div/div[1]/div/h2[1]/knockout/knockout[1]/knockout[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// Check if the element exists
if (element) {
    // Change the text content of the element
    element.textContent = "Freakachu";
} else {
    console.error("Element not found or XPath expression is incorrect.");
}
}, 1500);