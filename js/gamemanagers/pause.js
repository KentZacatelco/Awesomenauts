game.Pause = Object.extend({
    init: function(x, y, settings){
        //sets last buy too now
        this.now = new Date().getTime();
        this.lastPause = new Date().getTime();
        //checks if state is paused
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.pause = false;
    },
    
    update: function(){
        this.now = new Date().getTime();
        
        //checks if the buy key is pressed and was not pressed in the last second
        if(me.input.isKeyPressed("pause") && this.now-this.lastPause >=1000){
            //sets thee state to buy
            this.lastPause = this.now;
            //checks if it is already buying or not
            if(!this.pause){
                this.startPausing();
            }else{
                this.stopPausing();
            }
        }
        return true;
    },
    
    startPausing: function(){
        this.pausing = true;
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        //sets the buy screen
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('pause'));
        game.data.pausescreen.updateWhenPaused = true;
        game.data.pausescreen.setOpacity(0.8);
        me.game.world.addChild(game.data.pausescreen, 34);
        if(game.data.player){
            game.data.player.body.setVelocity(0,0);
        }else if(game.data.player2){
            game.data.player2.body.setVelocity(0,0);
        }else if(game.data.player3){
            game.data.player3.body.setVelocity(0,0);
        }else if(game.data.player4){
            game.data.player4.body.setVelocity(0,0);
        }else if(game.data.player5){
            game.data.player5.body.setVelocity(0,0);
        }
        //pauses the PLAY state
        me.state.pause(me.state.PLAY);
        this.setPauseText();
    },
    
    setPauseText: function(){
        game.data.pausetext = new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "black");
                ///updates things when paused
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            
            draw: function(renderer){
                //shows the texts and place of the texts with these lines of code.
                this.font.draw(renderer.getContext(), "PRESS P TO CONTINUE PLAYING", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "PRESS TO EXIT GAME", this.pos.x, this.pos.y + 20);
            }
        }));
        me.game.world.addChild(game.data.pausetext, 35);
    },
    
    stopPausing: function(){
        this.pausing = false;
        //resumes the state to PLAY
        me.state.resume(me.state.PLAY);
        if(game.data.player){
            game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        } else if(game.data.player2){
            game.data.player2.body.setVelocity(game.data.playerMoveSpeed, 20);
        }else if(game.data.player3){
            game.data.player3.body.setVelocity(game.data.playerMoveSpeed, 20);
        }else if(game.data.player4){
            game.data.player4.body.setVelocity(game.data.playerMoveSpeed, 20);
        }else if(game.data.player5){
            game.data.player5.body.setVelocity(game.data.playerMoveSpeed, 20);
        }
        me.game.world.removeChild(game.data.pausescreen);
        me.game.world.removeChild(game.data.pausetext);
    }
});