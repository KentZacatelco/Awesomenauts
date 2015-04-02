<?php
    require_once(__DIR__ . "/../model/config.php");
    
    //makes sure that the username and password dont have any forign charaters
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
    
    //makes the max limit have 500 characters
    $salt = "$5$" . "rounds=500$" . uniqid(mt_rand(), true) . "$";
    
    $hashedPassword = crypt($password, $salt);
    
    $query = $_SESSION["connection"]->query("INSERT INTO users SET "
            . "email = '',"
            . "username = '$username',"
            . "password = '$hashedPassword',"
            . "salt = '$salt', "
            . "exp = 0, "
            . "exp1 = 0, "
            . "exp2 = 0, "
            . "exp3 = 0, "
            . "exp4 = 0");
    
    $_SESSION["name"] = $username;
    
    if($query) {
        echo "true";
    }else{
        //tells if there is any errors
        echo "<p>" . $_SESSION["connection"]->error . "</p>";
    }
    