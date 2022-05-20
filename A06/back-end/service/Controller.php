<?php
session_start();

use domain\LogLevel;

include "../persistence/LogReportsDB.php";
include_once "../tools/general.php";

class Controller
{
    private readonly LogReportsDB $logReportsDB;

    public function __construct()
    {
        $this->logReportsDB = new LogReportsDB(false);
    }


    public function service(): string {
        error_log("[log][Controller.service()] start");
        error_log("[log][Controller.service()] called with \$_GET[action]=$_GET[action]");
        if (isset($_GET['action']) && !empty($_GET['action'])) {
            switch ($_GET['action']) {
                case 'getLogLevels' : {
//                    return $this->{$_GET['action']}();
//                    return "{$this->getLogLevels()}";
//                    error_log("json_encode(\$this->getLogLevels())=".json_encode($this->getLogLevels()));
                    return json_encode($this->getLogLevels());
                }
                case 'add': {
                    error_log("[Controller.service()] case 'add'");
                    error_log("json_encode(\$this->getLogLevels())=".json_encode($this->getLogLevels()));
                    error_log("json_encode(\$_GET[username])=".$_GET['username']);
                    $result = $this->add($_GET['username'], $_GET['level'], $_GET['message']);
                    error_log('json_encode($this->add($_GET[username], $_GET[level], $_GET[message]))=' . json_encode($result));
                    return json_encode($result);
                }
                case 'remove': {
                    $this->logReportsDB->removeLogReport($_GET['id']);
                }
                case 'getAll': {
                    return $this->logReportsDB->getLogReports();
                }
                default: {
                    $result = "[Controller.service()] NOT HANDLED value for \$_GET[action]=$_GET[action]";
                    error_log($result);
                    return json_encode($result);
                }
            }
        }
        // php user array subscript in string interpolation https://stackoverflow.com/questions/11821672/string-interpolation-with-an-array
        $result = "[Controller.service()] \$_GET[action]=$_GET[action] is not set or is empty";
        error_log($result);
        error_log("[log][Controller.service()] end");
        return $result;
    }

    private function getLogLevels(): array
    {
        return array_column(LogLevel::cases(), 'value');
    }

    public function add(string $username, string $level, string $message): string
    {
        $result = $this->logReportsDB->addLogReport(LogLevel::from($level), $username, $message);
        return "Add " . ($result ? "succeeded" : "failed") . "!";
    }
}

error_log('');
error_log('');
error_log('');
$controller = new Controller();
echo $controller->service();