game.SpendGold = Object.extend({
    init: function(x, y, settings){
        //sets last buy too now
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        //checks if state is paused
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    
    update: function(){
        this.now = new Date().getTime();
        
        //checks if the buy key is pressed and was not pressed in the last second
        if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
            //sets thee state to buy
            this.lastBuy = this.now;
            //checks if it is already buying or not
            if(!this.buying){
                this.startBuying();
            }else{
                this.stopBuying();
            }
        }
        this.checkBuyKeys();
        return true;
    },
    
    startBuying: function(){
        this.buying = true;
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        //sets the buy screen
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(1.0);
        me.game.world.addChild(game.data.buyscreen, 34);
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
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        this.setBuyText();
    },
    
    setBuyText: function(){
        game.data.buytext = new (me.Renderable.extend({
            init: function(){
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                ///updates things when paused
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            
            draw: function(renderer){
                //shows the texts and place of the texts with these lines of code.
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Skill 1: Increasing Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
                this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
                this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
                if(game.data.player){
                    this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
                    this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
                    this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear" + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
                }
                if(game.data.player3){
                    this.font.draw(renderer.getContext(), "E Ability: Shoot Fireball" + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
                    this.font.draw(renderer.getContext(), "W Ability: Use Magic" + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
                }
                if(game.data.player5){
                    this.font.draw(renderer.getContext(), "W Ability: Use Magic" + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
                }
            }
        }));
        me.game.world.addChild(game.data.buytext, 35);
    },
    
    stopBuying: function(){
        this.buying = false;
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
        me.game.world.removeChild(game.data.buyscreen);
        //it unbinds the keys to prevent people buying outside of the shop
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.buytext);
    },
    
    checkBuyKeys: function(){
        //it check for the input of the keys
        if(me.input.isKeyPressed("F1")){
            if(this.checkCost(1)){
                this.makePurchase(1);
            }
        }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(2)){
                this.makePurchase(2);
            }
        }else if(me.input.isKeyPressed("F3")){
            if(this.checkCost(3)){
                this.makePurchase(3);
            }
        }else if(game.data.player){
            if(me.input.isKeyPressed("F6")){
                if(this.checkCost(6)){
                    this.makePurchase(6);
                }
            }
        }else if(game.data.player3){
            if(me.input.isKeyPressed("F6")){
                if(this.checkCost(6)){
                    this.makePurchase(6);
                }
            }else if(me.input.isKeyPressed("F5")){
                if(this.checkCost(5)){
                    this.makePurchase(5);
                }
            }
        }else if(game.data.player5){
            if(me.input.isKeyPressed("F5")){
                if(this.checkCost(5)){
                    this.makePurchase(5);
                }
            }
        }
    },
    
    checkCost: function(skill){
        //checks if you have enough gold to buy stuff
        if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
            return true;
        }else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
            return true;
        }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
            return true;
        }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
            return true;
        }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
            return true;
        }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
            return true;
        }else{
            return false;
        }
    },
    
    makePurchase: function(skill){
        //upgrades the skill if you could afford it
        if(skill===1){
            game.data.gold -= ((game.data.skill1 + 1)*10);
            game.data.skill1 += 1;
            game.data.playerAttack += 1;
        }else if(skill ===2){
            game.data.gold -= ((game.data.skill2 + 1)*10);
            game.data.skill2 += 1;
            game.data.playerMoveSpeed += 1;
        }else if(skill ===3){
            game.data.gold -= ((game.data.skill3 + 1)*10);
            game.data.skill3 += 1;
            game.data.playerHealth += 1;
        }else if(skill ===4){
            game.data.gold -= ((game.data.ability1 + 1)*10);
            game.data.ability1 += 1;
        }else if(skill ===5){
            game.data.gold -= ((game.data.ability2 + 1)*10);
            game.data.ability2 += 1;
        }else if(skill ===6){
            game.data.gold -= ((game.data.ability3 + 1)*10);
            game.data.ability3 += 1;
        }
    }
});