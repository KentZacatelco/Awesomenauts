game.EnemySkeleton = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "enemyhero",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
        this.health = game.data.heroHealth;
        this.alwaysUpdate = true;
        //update the attack timer
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        
        this.type = "enemyhero";
        
        this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151], 80);
        this.renderable.addAnimation("attack", [195, 196, 197, 198, 199, 200], 80);
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
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        //checks if it collides with any Entity
        if(response.b.type==='PlayerBase'){
            this.attacking=true;
            this.lastAttacking=this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x +1;
            if((this.now-this.lastHit >= game.data.heroAttackTimer)){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.heroAttack);
            }
        }else if(response.b.type==='PlayerEntity'){
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking=true;
            this.lastAttacking=this.now;
            if(xdif>0){
                this.pos.x = this.pos.x +1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= game.data.heroAttackTimer) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.heroAttack);
            }
        }else if(response.b.type==='Player2Entity'){
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking=true;
            this.lastAttacking=this.now;
            if(xdif>0){
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= game.data.heroAttackTimer) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.heroAttack);
            }
        }else if(response.b.type==='Player3Entity'){
            var xdif = this.pos.x - response.b.pos.x;
            this.attacking=true;
            this.lastAttacking=this.now;
            
            if(xdif>0){
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= game.data.heroAttackTimer) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.heroAttack);
            }
        }else if(response.b.type==='Player4Entity'){
            var xdif = this.pos.x - response.b.pos.x;
            
            this.attacking=true;
            this.lastAttacking=this.now;
            if(xdif>0){
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= game.data.heroAttackTimer) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.heroAttack);
            }
        }else if(response.b.type==='Player5Entity'){
            var xdif = this.pos.x - response.b.pos.x;
            this.attacking=true;
            this.lastAttacking=this.now;
            if(xdif>0){
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if((this.now-this.lastHit >= game.data.heroAttackTimer) && xdif>0){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.heroAttack);
            }
        }
    }
});

