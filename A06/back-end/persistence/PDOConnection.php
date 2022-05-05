<?php

namespace persistence;
use PDO;
use PDOException;

include "../tools/general.php";

class PDOConnection
{
    private ?PDO $connection;

    public function __construct($database, $host, $user, $password)
    {
        try {
            // https://www.javatpoint.com/php-pdo
            $this->connection = new PDO("mysql:host=$host;dbname=$database", $user, $password);
            error_log("[log][PDOConnection.php] Connected to the database");
        } catch (PDOException $exception) {
            die("[log][PDOConnection.php] Connection failed: " . $exception->getMessage() . "<br>");
        }
    }

    public function __destruct()
    {
        $this->connection = null;
        error_log("[log][PDOConnection.php] Connection destroyed");
    }

    public function getConnection(): ?PDO
    {
        return $this->connection;
    }

    static public function create(string $database, string $host = "localhost", string $user = "root", string $password = ""): PDOConnection
    {
        return new PDOConnection($database, $host, $user, $password);
    }
}