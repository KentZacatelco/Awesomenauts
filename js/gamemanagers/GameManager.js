game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            //sets the state to gameover and makes you win
            this.gameOver(true);
        } else if (game.data.win === false && !this.gameover) {
            //sets the state to gameover and makes you lose
            this.gameOver(false);
        }

        return true;
    },
    gameOver: function(win) {
        if(win){
            game.data.exp += 10;
        }else{
            game.data.exp = +1;
        }
        //gives 10 exp if you win but 1 if you lose
        this.gameover = true;
        me.save.exp = game.data.exp;


        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        //sets state to MENU
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    //tells you lose
                    alert("Fail");
                });
    }
});