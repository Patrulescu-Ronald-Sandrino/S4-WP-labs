<?php

error_log("[log][session.php] started");
error_log("\$_POST = " . json_encode($_POST));
error_log("\$_REQUEST = " . json_encode($_REQUEST));
if ($_POST['action'] == 'start') {
    session_start();
    $_SESSION['username'] = $_POST['username'];
    error_log("[log][session.php] username: ${_POST['username']}");
    echo json_encode($_POST['username']);
}