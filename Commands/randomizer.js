PokemonFactory.generateWildPokemon = function(route, region, subRegion) {
    if (!MapHelper.validRoute(route, region)) {
        return new BattlePokemon('MissingNo.', 0, PokemonType.None, PokemonType.None, 0, 0, 0, 0, new Amount(0, GameConstants.Currency.money), false, 0, GameConstants.BattlePokemonGender.NoGender, GameConstants.ShadowStatus.None, EncounterType.route);
    }
    let name;
    const roaming = PokemonFactory.roamingEncounter(route, region, subRegion);
    if (roaming) {
        name = pokemonList[Math.floor(Math.random()*pokemonList.length+1)].name
    }
    else {
        name = pokemonList[Math.floor(Math.random()*pokemonList.length+1)].name
    }
    const basePokemon = PokemonHelper.getPokemonByName(name);
    const id = basePokemon.id;
    const routeAvgHp = (region, route) => {
        const poke = [...new Set(Object.values(Routes.getRoute(region, route).pokemon).flat().map(p => { var _a; return (_a = p.pokemon) !== null && _a !== void 0 ? _a : p; }).flat())];
        const total = poke.map(p => pokemonMap[p].base.hitpoints).reduce((s, a) => s + a, 0);
        return total / poke.length;
    };
    // TODO this monster formula needs to be improved. Preferably with graphs :D
    // Health has a +/- 10% variable based on base health stat compared to the average of the route
    const maxHealth = Math.round(PokemonFactory.routeHealth(route, region) * (0.9 + (basePokemon.hitpoints / routeAvgHp(region, route)) / 10));
    const catchRate = this.catchRateHelper(basePokemon.catchRate);
    const exp = basePokemon.exp;
    const level = this.routeLevel(route, region);
    const heldItem = this.generateHeldItem(basePokemon.heldItem, GameConstants.ROUTE_HELD_ITEM_MODIFIER);
    const money = this.routeMoney(route, region);
    const shiny = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
    const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
    const encounterType = roaming ? EncounterType.roamer : EncounterType.route;
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
    return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, new Amount(money, GameConstants.Currency.money), shiny, 1, gender, GameConstants.ShadowStatus.None, encounterType, heldItem, ep);
}
