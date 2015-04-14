game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        //updates it
        this.alwaysUpdate = true;
    }, 
    
    update: function(){
        //checks if player/players is dead
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player2.dead){
            me.game.world.removeChild(game.data.player2);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player3.dead){
            me.game.world.removeChild(game.data.player3);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player4.dead){
            me.game.world.removeChild(game.data.player4);
            me.state.current().resetPlayer(10, 0);
        }else if(game.data.player5.dead){
            me.game.world.removeChild(game.data.player5);
            me.state.current().resetPlayer(10, 0);
        }
        
        return true;
    }
});