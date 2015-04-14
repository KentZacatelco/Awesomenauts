game.CharacterSelect = me.ScreenObject.extend({
    onResetEvent: function() {
        var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
        me.game.world.addChild(gameTimerManager, 0);
        var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
        me.game.world.addChild(heroDeathManager, 0);
        var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
        me.game.world.addChild(experienceManager, 0);
        var spendGold = me.pool.pull("SpendGold", 0, 0, {});
        me.game.world.addChild(spendGold, 0);
        game.data.minimap = me.pool.pull("minimap", 10, 10, {});
        me.game.world.addChild(game.data.minimap, 30);

        me.input.bindKey(me.input.KEY.ONE, "1");
        me.input.bindKey(me.input.KEY.TWO, "2");
        me.input.bindKey(me.input.KEY.THREE, "3");
        me.input.bindKey(me.input.KEY.FOUR, "4");
        me.input.bindKey(me.input.KEY.FIVE, "5");

        if (me.input.keys("1")) {
            game.data.player = me.pool.pull("player", 0, 420, {});
            me.game.world.addChild(game.data.player, 5);
            me.state.change(me.state.PLAY);
        } else if (me.input.keys("2")) {
            game.data.player2 = me.pool.pull("player2", 0, 420, {});
            me.game.world.addChild(game.data.player2, 5);
            me.state.change(me.state.PLAY);
        } else if (me.input.keys("3")) {
            game.data.player3 = me.pool.pull("player3", 0, 420, {});
            me.game.world.addChild(game.data.player3, 5);
            me.state.change(me.state.PLAY);
        } else if (me.input.keys("4")) {
            game.data.player4 = me.pool.pull("player4", 0, 420, {});
            me.game.world.addChild(game.data.player4, 5);
            me.state.change(me.state.PLAY);
        } else if (me.input.keys("5")) {
            game.data.player5 = me.pool.pull("player5", 0, 420, {});
            me.game.world.addChild(game.data.player5, 5);
            me.state.change(me.state.PLAY);
        }
    },
    onDestroyEvent: function() {
        me.game.world.removeChild(this.HUD);
    }
});