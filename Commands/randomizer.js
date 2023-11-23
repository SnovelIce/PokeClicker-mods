function NewgenerateNewEnemy() {
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateWildPokemon(player.route(), player.region, player.subregionObject()));
        const enemyPokemon = this.enemyPokemon();


        enemyPokemon.id = Math.floor(Math.random() * (900 - 1) + 1);

        enemyPokemon.level = Math.floor(Math.random() * (100 - 1) + 1);

        enemyPokemon.name = pokemonList.find(item => item.id === enemyPokemon.id).name


        PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
        // Shiny
        if (enemyPokemon.shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                ? createLogContent.encounterShinyDupe({
                    location: Routes.getRoute(player.region, player.route()).routeName,
                    pokemon: enemyPokemon.name,
                })
                : createLogContent.encounterShiny({
                    location: Routes.getRoute(player.region, player.route()).routeName,
                    pokemon: enemyPokemon.name,
                }));
        }
        else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id) && enemyPokemon.health()) {
            App.game.logbook.newLog(LogBookTypes.NEW, createLogContent.encounterWild({
                location: Routes.getRoute(player.region, player.route()).routeName,
                pokemon: enemyPokemon.name,
            }));
        }
    }
    

Battle.generateNewEnemy = NewgenerateNewEnemy;




