game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        //loads screen
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";

        //prevents you use the keys for an input
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.A);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //show the text in a certain font, color, and place
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
            },
            draw: function(renderer) {
                //shows what the message says
                this.font.draw(renderer.getContext(), "CREATE A USERNAME AND PASSWORD", this.pos.x, this.pos.y);
            }
        })));
   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        //sets the input and register setting invisible
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";
    }
});
