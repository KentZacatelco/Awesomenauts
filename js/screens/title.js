game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
                
                game.data.option1 = new (me.Renderable.extend({
                    init: function(){
                        //sets the font, size and color of the text.
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                        this.font = new me.Font("Arial", 46, "white");
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(renderer){
                        //tells the players a message
                        this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    
                    newGame: function(){
                        //release an event
                        me.input.releasePointerEvent('pointerdown', game.data.option2);
                        me.input.releasePointerEvent('pointerdown', this);
                        me.state.change(me.state.NEW);
                    }
                }));
                
                me.game.world.addChild(game.data.option1);
                
                game.data.option2 = new (me.Renderable.extend({
                    init: function(){
                        //sets the text for the viewers to see.
                        this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                        this.font = new me.Font("Arial", 46, "white");
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(renderer){
                        //sets the position of the  text and shows the text.
                        this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    
                    newGame: function(){
                        //releases the input for the pointer
                        me.input.releasePointerEvent('pointerdown', game.data.option1);
                        me.input.releasePointerEvent('pointerdown', this);
                        me.state.change(me.state.LOAD);
                    }
                }));
                
                me.game.world.addChild(game.data.option2);
        
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
        }
});
