<?php

class Database {
    //stores
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        $this->connection = new mysqli($host, $username, $password);

        if ($this->connection->connect_error) {
            //tells when an error occurs
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }

        $exists = $this->connection->select_db($database);

        if (!$exists) {
            //tells when database is created
            $query = $this->connection->query("CREATE DATABASE $database");
        }
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        //open connection collects the hst, username, password, and database
        if ($this->connection->connect_error) {
            //tells when a connection error occured
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }

    public function closeConnection() {
        if (isset($this->connecion)) {
            $this->connection->close();
        }
    }

    public function query($string) {
        $this->openConnection();
        //connects qquery to string
        $query = $this->connection->query($string);
        
        if(!$query) {
            //tells when a connection error occurs
            $this->error = $this->connection->error;
        }
        //closes the connection
        $this->closeConnection();

        return $query;
    }

}