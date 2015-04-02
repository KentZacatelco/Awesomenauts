<?php
// needs the config file to work
require_once(__DIR__ . "/../model/config.php");

//checks if the user is authenticated or allowed if you are to dumb to know what authenticated means.
function authenticateUser() {
    if(!isset($_SESSION["authenticated"])) {
        //tells user if is not authenticated
        return false;
    }else {
        if($_SESSION["authenticated"] != true) {
            //alsso checks if password is correct
            return false;
        }
        else {
            //logs in if both is correct.
            return true;
        }
    }
}
//makes you logged in.