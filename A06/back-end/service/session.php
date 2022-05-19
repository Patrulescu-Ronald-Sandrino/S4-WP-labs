<?php
session_start();

error_log("\$_SERVER['REQUEST_METHOD']=" . json_encode($_SERVER['REQUEST_METHOD']));
error_log("\$_REQUEST=" . json_encode($_REQUEST));

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': {
        if ($_POST['action'] == 'login') {
            $_SESSION['username'] = $_POST['data'];
            error_log("${_POST['data']} logged in");
            echo "${_POST['data']} logged in";
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
        else if ($_POST['action'] == 'test') {
            echo 'test OK';
        }
    }
    case 'GET': {

    }
}