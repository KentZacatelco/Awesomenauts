game.minimap = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width:438,
                height:176,
                spritewidth:"438",
                spriteheight:"176",
                getShape: function(){
                    return (new me.Rect(0, 0, 438, 176)).toPolygon();
                }
        }]);
        //makes sure that the map isnt stuck to the background of the map.
        this.floating = true;
    
    }
});

