game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing){
        this._super(me.Entity, 'init', [x, y, {
                image: "spear",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function(){
                    return (new me.Rect(0, 0, 48, 48)).toPolygon();
                }
        }]);
        this.alwaysUpdate = true;
        this.body.setVelocity(8, 0);
        this.attack = game.data.ability3*3;
        this.type = "spear";
        this.facing = facing;
    },
    update: function(delta){
        //changes the spear's direction on where you throw it
        if(this.facing === "left"){
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(true);
        }else{
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(false);
        }
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response){
        //checks if it collides with either the Enemy base or Enemy Creep.
        if(response.b.type==='EnemyCreep'){
            response.b.loseHealth(this.attack);
            me.game.world.removeChild(this);
        }
        if(response.b.type==='EnemyBaseEntity'){
            response.b.loseHealth(this.attack);
            me.game.world.removeChild(this);
        }
    }
});