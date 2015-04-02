<?php
    //needs the database to run
    require_once(__DIR__ . "/database.php");
    //starts a session
    session_start();
    session_regenerate_id(true);
    //is connected to the php file
    $path = "/KentZAwesomenauts/php/";
    
    $host = "localhost";
    $username = "root";
    $password = "root";
    $database = "awesomenauts_db";
    
    if(!isset($_SESSION["connection"])) {
        //connects the new database to the host, username, password, and the previous database info
        $connection = new Database($host, $username,$password, $database);
        $_SESSION["connection"] = $connection;
    }
    
    