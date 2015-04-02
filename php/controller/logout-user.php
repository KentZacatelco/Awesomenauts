<?php
    //needs to verify the the login is correct and needs the config file to connect it to the project.
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    
    //checks if user is registered
    if(!authenticateUser()) {
        header("location: " . $path . "index.php");
        die();
    }
    //makes sure you properly log out
    
    unset($_SESSION["authenticated"]);
    
    session_destroy();
    header("location: " . $path . "/controller/logout-verify.php");