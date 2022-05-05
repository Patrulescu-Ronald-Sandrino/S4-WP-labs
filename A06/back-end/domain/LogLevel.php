<?php

// https://www.sumologic.com/glossary/log-levels/
// https://www.php.net/manual/en/language.enumerations.php
namespace domain;
enum LogLevel: string
{
    case Emergency = "Emergency";
    case Alert = "Alert";
    case Critical = "Critical";
    case Error = "Error";
    case Warning = "Warning";
    case Notice = "Notice";
    case Informational = "Informational";
    case Debug = "Debug";
}