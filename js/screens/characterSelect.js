game.CharacterSelect = me.ScreenObject.extend({
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('char_select')), -1);

        me.input.bindKey(me.input.KEY.ONE, "1");
        me.input.bindKey(me.input.KEY.TWO, "2");
        me.input.bindKey(me.input.KEY.THREE, "3");
        me.input.bindKey(me.input.KEY.FOUR, "4");
        me.input.bindKey(me.input.KEY.FIVE, "5");
        
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //sets the size, font, color and place of the text
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
            },
            draw: function(renderer) {
                //sets the texts
                this.font.draw(renderer.getContext(), "CHOOSE YOUR CHARACTER", this.pos.x, this.pos.y);
            }
        })));

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