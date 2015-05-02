game.GameTimerManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        //sets if it is paused
        this.paused = false;
    
        this.alwaysUpdate = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        //checks the timer
        return true;
    },
    
    goldTimerCheck: function(){
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
            //adds gold
            game.data.gold += (game.data.exp1 + 1);
        }
    },
    
    creepTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 500)){
            //sets the info for the Creep
            this.lastCreep = this.now;
            var creep = me.pool.pull("EnemyCreep", 27500, 0, {});
            var creepe = me.pool.pull("PlayerCreep", 100, 0, {});
            me.game.world.addChild(creepe, 5);
            me.game.world.addChild(creep, 5);
        }
    }
});