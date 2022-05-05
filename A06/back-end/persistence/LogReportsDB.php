<?php // TODO: remove later <!DOCTYPE html>

use domain\LogLevel;
use persistence\PDOConnection;

include "PDOConnection.php";
include "../domain/LogLevel.php";

class LogReportsDB
{
    const NUMBER_OF_GENERATED_ENTRIES = 10; // https://stackoverflow.com/questions/3389380/can-you-use-static-constants-inside-classes-in-php
    private string $database = "LogReportsDB";
    private const INSERT_STATEMENT = 'INSERT INTO LogReports (level, date, username, message) VALUES (?, ?, ?, ?)';

    public function __construct(bool $create = false)
    {
        if ($create) {
            $this->create(LogReportsDB::NUMBER_OF_GENERATED_ENTRIES);
        }
    }

    private function create(int $numberOfEntries)
    {
        $connection = PDOConnection::create("test", "localhost", "root", "")->getConnection();

        /*
SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA S
WHERE S.SCHEMA_NAME = "test"
 */
        /*    // https://stackoverflow.com/questions/5766218/how-can-i-get-a-list-of-mysql-databases-in-php-using-pdo
        $result = $connection->query("SHOW DATABASES");
        while (($dbname = $result->fetchColumn(0)) !== false) {
            echo $dbname . '<br>';
        }*/


        $connection->exec("DROP DATABASE IF EXISTS $this->database");
//    echo "Drop db: " . $connection->exec("DROP DATABASE IF EXISTS $this->database") . '<br>';
        $connection->exec("CREATE DATABASE $this->database");
//    echo "Create db: " . $connection->exec("CREATE DATABASE $this->database") . '<br>';
        // https://stackoverflow.com/questions/8705195/how-do-i-select-a-mysql-database-to-use-with-pdo-in-php
        // https://stackoverflow.com/questions/9588775/switch-between-multiple-database-in-pdo
        $connection->exec("USE $this->database");
//    echo "Use: " . $connection->exec("USE $this->database") . '<br>';

        $connection->exec(
//    echo "Create table: " . $connection->exec(
            "CREATE TABLE LogReports (
    id int auto_increment primary key,
    level VARCHAR(13),
    date DATETIME,
    username VARCHAR(30),
    message TEXT(30)
)") . '<br>';

        self::insertGeneratedValuesIntoLogReports($connection, $numberOfEntries);

        // print the inserted values
//        $result = $connection->query('SELECT * FROM LogReports');
//        while ($row = $result->fetch()) {
//
////            echo $row['level'], " ", $row['date'], " ", $row['username'], " ", $row['message'] . "<br>";
////            printf("%'_-15s%'_-25s%'_-15s%s<br>", $row['level'], $row['date'], $row['username'], $row['message']); //
//            printf("<pre>%' -15s%' -25s%' -15s%s</pre>", $row['level'], $row['date'], $row['username'], $row['message']); // https://stackoverflow.com/questions/5515632/php-insert-multiple-spaces
//        }
    }

    static private function insertGeneratedValuesIntoLogReports(PDO $connection, int $last, int $first = 1)
    {
        $logLevels = array_column(LogLevel::cases(), 'value'); // https://stackoverflow.com/questions/71235907/getting-values-for-an-enum
        $logLevelsCount = count($logLevels);

        for ($i = min($first, $last); $i <= max($first, $last); $i += ($last - $first) / abs($last - $first)) {
            $level = $logLevels[rand(0, $logLevelsCount - 1)];
            $date = sprintf('2022-%02d-%02d %02d:%02d:%02d', rand(1, 12), rand(1, 28), rand(0, 23), rand(0, 59), rand(0, 59)); // https://www.geeksforgeeks.org/format-a-number-with-leading-zeros-in-php/, https://www.w3schools.com/PHP/func_math_rand.asp
            $username = "username " . $i;
            $message = "a very informative message " . $i;
            $query = 'INSERT INTO LogReports (level, date, username, message) VALUES (?, ?, ?, ?)';
            // echo "INSERT INTO LogReports VALUES($level, '$date', '$username', '$message')" . '<br>';
            // https://stackoverflow.com/questions/7537377/how-to-include-a-php-variable-inside-a-mysql-statement

//        echo "pre execute<br>";
            // https://www.php.net/manual/en/pdostatement.execute.php
            $connection->prepare(LogReportsDB::INSERT_STATEMENT)->execute([$level, $date, $username, $message]);
//        echo "post execute<br>";
        }
    }

    public function addLogReport(LogLevel $logLevel, string $username, string $message): bool
    {
        $connection = PDOConnection::create($this->database)->getConnection();
//        $operation = 'INSERT INTO LogReports VALUES (?,  CURRENT_TIMESTAMP, ?, ?)'; // https://learnsql.com/cookbook/how-to-get-the-current-date-and-time-in-mysql/
//        $connection->prepare($operation)->execute([$logLevel->value, $username, $message]);
        return $connection->prepare(LogReportsDB::INSERT_STATEMENT)->execute([$logLevel->value, (new DateTime())->format("Y-m-d H:i:s"), $username, $message]);
    }

    public function removeLogReport(int $id)
    {
        $connection = PDOConnection::create($this->database)->getConnection();
        $operation = 'DELETE FROM LogReports WHERE id = ?';
        $connection->prepare($operation)->execute([$id]);
    }

    public function getLogReports()
    {
        // TODO
        // TODO: MAYBE create a LogReport class inside ? domain
    }
}


//$logReportsDB = new LogReportsDB(true);
//$logReportsDB->addLogReport(LogLevel::Debug, "cde", "fgh");
//$logReportsDB->removeLogReport(3);