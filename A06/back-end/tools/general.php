<?php

// https://www.atatus.com/blog/how-to-log-to-console-in-php-and-why-should-you-do-it/
// works only if called in a html file
function console_log($output, bool $with_script_tags = true): void
{
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
//    $content = json_encode($output, JSON_HEX_TAG);
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
//        $content = '<script> console.log(' . $js_code . ');</script>';
    }
    echo $js_code;
//    echo $content;
}