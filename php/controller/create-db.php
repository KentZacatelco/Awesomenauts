<?php
    //needs the config file to run
    require_once(__DIR__ . "/../model/config.php");
    
    $query = $_SESSION["connection"]->query("CREATE TABLE users ("
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            //makes sure that the username, email, or password is not empty
            . "username varchar(30) NOT NULL,"
            . "email varchar(50) NOT NULL,"
            . "password char(128) NOT NULL, "
            . "salt char(128) NOT NULL,"
            . "exp int(4),"
            . "exp1 int1(4),"
            . "exp2 int2(4),"
            . "exp3 int3(4),"
            . "exp4 int4(4),"
            . "PRIMARY KEY (id))");
    
    if($query) {
    }
    else {
        //tells if there is a connection error
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }