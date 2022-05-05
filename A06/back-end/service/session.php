<?php

error_log("[log][session.php] started");
if ($_POST['action'] == 'start') {
    session_start();
    $_SESSION['username'] = $_POST['username'];
    error_log("[log][session.php] username: ${_POST['username']}");
    echo $_POST['username'];
}