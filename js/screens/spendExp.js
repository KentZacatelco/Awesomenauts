game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                //inputs the keys  
                me.input.bindKey(me.input.KEY.F1, "F1");
                me.input.bindKey(me.input.KEY.F2, "F2");
                me.input.bindKey(me.input.KEY.F3, "F3");
                me.input.bindKey(me.input.KEY.F4, "F4");
                me.input.bindKey(me.input.KEY.F5, "F5");
                var exp1cost = ((Number(game.data.exp1) + 1) * 10);
                var exp2cost = ((Number(game.data.exp2) + 1) * 10);
                var exp3cost = ((Number(game.data.exp3) + 1) * 10);
                var exp4cost = ((Number(game.data.exp4) + 1) * 10);
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        this.font = new me.Font("Arial", 26, "white");
                    },
                    
                    draw: function(renderer){
                        //tells the player what theey could do.
                        this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO PLAY", this.pos.x, this.pos.y);
                        this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                        this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PREDUCTION. CURRENT LEVEL: " + game.data.exp1.toString() + " COST:" + exp1cost, this.pos.x, this.pos.y + 100);
                        this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD. CURRENT LEVEL" + game.data.exp2.toString() + " COST:" + exp2cost, this.pos.x, this.pos.y + 150);
                        this.font.draw(renderer.getContext(), "F3: INCREEASE ATTACK DAMAGE. CURRENT LEVEL: " + game.data.exp3.toString() + " COST:" + exp3cost, this.pos.x, this.pos.y + 200);
                        this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH. CURRENT LEVEL: " + game.data.exp4.toString() + " COST:" + exp4cost, this.pos.x, this.pos.y + 250);
                    }
                })));
                
                this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                    //the if else if statement checks to see if the keys are pressed
                    if(action === "F1"){
                        if(game.data.exp >= exp1cost){
                            game.data.exp1 += 1;
                            game.data.exp -= exp1cost;
                        }
                    }else if(action === "F2"){
                        if(game.data.exp >= exp2cost){
                            game.data.exp2 += 1;
                            game.data.exp -= exp2cost;
                        }
                    }else if(action === "F3"){
                        if(game.data.exp >= exp3cost){
                            game.data.exp3 += 1;
                            game.data.exp -= exp3cost;
                        }
                    }else if(action === "F4"){
                        if(game.data.exp >= exp4cost){
                            game.data.exp4 += 1;
                            game.data.exp -= exp4cost;
                        }
                    }else if(action === "F5"){
                        //sets state to play
                        me.state.change(me.state.PLAY);
                    }
                });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            me.input.unbindKey(me.input.KEY.F1, "F1");
            me.input.unbindKey(me.input.KEY.F2, "F2");
            me.input.unbindKey(me.input.KEY.F3, "F3");
            me.input.unbindKey(me.input.KEY.F4, "F4");
            me.input.unbindKey(me.input.KEY.F5, "F5");
            me.event.unsubscribe(this.handler);
        }
});
