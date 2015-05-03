game.PlayerCreep = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                //sets image as creep
                image: "creep2",
                width: 100,
                height: 85,
                spritewidth: "100",
                spriteheight: "85",
                getShape: function(){
                    return (new me.Rect(0, 0, 100, 85)).toPolygon();
                }
        }]);
        this.health = game.data.PlayerCreepHealth;
        this.alwaysUpdate = true;
        //update the attack timer
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        this.type = "PlayerCreep";
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    
    loseHealth: function(damage){
        //sets when the lose health they take damage equal to the attacker's attack
        this.health =this.health - damage;
    },
    
    update: function(delta){
        if(this.health <= 0){
            //removes the entity if health is below 0
            me.game.world.removeChild(this);
        }
        this.now = new Date().getTime();
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
        this.checkforjump();
    },
    
    checkforjump: function(){
        if(this.body.accel.x = 0 && !this.attacking){
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
    },
    
    collideHandler: function(response){
        //checks if it collides with any Entity
        if(response.b.type==='EnemyBaseEntity'){
            this.attacking=true;
            this.lastAttacking=this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x +1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.PlayerCreepAttack);
            }
        }else if(response.b.type==='EnemyCreep'){
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking=true;
            this.lastAttacking=this.now;
            if(xdif>0){
                this.pos.x = this.pos.x +1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= 1000) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.PlayerCreepAttack);
            }
        }else if(response.b.type==='EnemyCreepEntity'){
            var xdif = this.pos.x + response.b.pos.x;
            this.attacking=true;
            this.lastAttacking=this.now;
            if(xdif<0){
                this.pos.x = this.pos.x - 1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= 1000) && xdif<0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    }
});

