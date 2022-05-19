<?php
//$SESSION_SAVE_PATH = "/e/tmp/lampp/temp";
//if (session_save_path() != $SESSION_SAVE_PATH) {
//    session_save_path("0;0777;" . $SESSION_SAVE_PATH); // https://stackoverflow.com/questions/6821532/php-warning-permission-denied-13-on-session-start
//}
//session_start();

// TODO maybe test if session is set/started

error_log("[log][session.php] " . "\$_REQUEST = " . json_encode($_REQUEST));

switch ($_REQUEST['action']) {
    case 'start': {

        $_SESSION['username'] = $_REQUEST['username'];
        echo json_encode($_SESSION['username']);//    return json_encode($_SESSION['username']);
//    header("Location: ../../front-end/ui/main.html");

//    return json_encode($_SESSION['username']);
    }
    case 'getUsername': {
        error_log("[log][session.php][getUsername] username: " . json_encode($_SESSION['username']));
        echo json_encode($_SESSION['username']);
    }
    case 'logout': {
        error_log("[log][session.php][logout] for username ${_SESSION['username']}");
        unset($_SESSION['username']);
        session_destroy() ? error_log("[log][session.php][logout] logout success") : error_log("[session.php][logout] logout failure");
    }
    default: {
        error_log("[log][session.php] got unhandled session action case");
    }
}