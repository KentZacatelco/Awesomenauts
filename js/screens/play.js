game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                //shows what stage is gonna be loaded
                me.levelDirector.loadLevel("level01");
                //resets the player's location
                this.resetPlayer(10, 0);
                //takes out info from gameTimerManager
                var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
                me.game.world.addChild(gameTimerManager, 0);
                //grabs information from heroDeathManager
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
                me.game.world.addChild(heroDeathManager, 0);
                //gets info from experienceManager
                var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
                me.game.world.addChild(experienceManager, 0);
                //gets info from spendGold
                var spendGold = me.pool.pull("SpendGold", 0, 0, {});
                me.game.world.addChild(spendGold, 0);
                //loads the minimap
                game.data.minimap = me.pool.pull("minimap", 10, 10, {});
                me.game.world.addChild(game.data.minimap, 31);
                //loads the MiniPlayer
                game.data.MiniPlayerLocation = me.pool.pull("MiniPlayerLocation", 10, 10, {});
                me.game.world.addChild(game.data.MiniPlayerLocation, 32);
                
                game.gameover = false;
                
                //sets the keys to set an output wheen the key is pressed
                me.input.bindKey(me.input.KEY.B, "buy");
                me.input.bindKey(me.input.KEY.Q, "skill1");
                me.input.bindKey(me.input.KEY.W, "skill2");
                me.input.bindKey(me.input.KEY.E, "skill3");
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.UP, "jump");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
                
//                me.audio.playTrack("gamebackground");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function(x, y){
            game.data.player3 = me.pool.pull("player3", 0, 420, {});
            me.game.world.addChild(game.data.player3, 5);
            //loads the Player Locator
            game.data.MiniPlayerLocation = me.pool.pull("MiniPlayerLocation", 10, 10, {});
            me.game.world.addChild(game.data.MiniPlayerLocation, 32);
        }
        
});
