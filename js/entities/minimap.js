game.minimap = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width:890,
                height:125,
                spritewidth:"890",
                spriteheight:"125",
                getShape: function(){
                    return (new me.Rect(0, 0, 890, 125)).toPolygon();
                }
        }]);
        //makes sure that the map isnt stuck to the background of the map.
        this.floating = true;
    
    }
});

