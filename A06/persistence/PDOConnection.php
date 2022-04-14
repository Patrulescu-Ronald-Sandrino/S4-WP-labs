<?php

include "../tools/general.php";

class PDOConnection {
    private ?PDO $connection;

    public function __construct($database, $host, $user, $password)
    {
        try {
            // https://www.javatpoint.com/php-pdo
            $this->connection = new PDO("mysql:host=$host;dbname=$database", $user, $password);
            console_log("[log] Connected to the database");
        }
        catch (PDOException $exception) {
            die("[log] Connection failed: " . $exception->getMessage() . "<br>");
        }
    }

    public function __destruct() {
        $this->connection = null;
        console_log("[log] Connection destroyed");
    }

    public function getConnection(): ?PDO
    {
        return $this->connection;
    }

    static public function create(string $database, string $host = "localhost", string  $user = "root", string $password = ""): PDOConnection
    {
        return new PDOConnection($database, $host, $user, $password);
    }
}