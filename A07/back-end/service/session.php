<?php
header("Access-Control-Allow-Origin: ");
session_start();

error_log("\$_SERVER['REQUEST_METHOD']=" . json_encode($_SERVER['REQUEST_METHOD']));
error_log("\$_REQUEST=" . json_encode($_REQUEST));

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': {
        if (!isset($_POST['action'])) {
            break;
        }
        if ($_POST['action'] == 'login') {
            $_SESSION['username'] = $_POST['data'];
            error_log("${_POST['data']} logged in");
            echo json_encode((object)["result" => "${_POST['data']} logged in"]); // php create json object https://stackoverflow.com/a/39053149/17299754
        }
        else if ($_POST['action'] == 'logout') {
            if (isset($_SESSION['username'])) {
                $username = $_SESSION['username'];
                unset($_SESSION['username']);
                if (session_destroy()) {
                    error_log("logout status: logged out $username");
                    echo "logout status: logged out $username";
                }
                else {
                    error_log("logout status: logging out $username failed");
                    echo "logout status: logging out $username failed";
                }
            }
            else {
                error_log("logout status: username was NOT set");
                echo "logout status: username was NOT set";
            }
        }
    }
    case 'GET': {
        if (isset($_GET['action']) &&  $_GET['action'] == 'getUsername') {
            echo isset($_SESSION) && isset($_SESSION['username']) ? $_SESSION['username'] : "";
        }
    }
}