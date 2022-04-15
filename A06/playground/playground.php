<?php


//phpinfo();



/// https://codegrepr.com/question/how-do-i-immediately-execute-an-anonymous-function-in-php/
//(function(int $values) {
//    echo "$values.<br>";
//})(10);



//    class A {
//      public function __destruct() // must be public
//      {
//          // TODO: Implement __destruct() method.
//          echo "Called A.__destruct<br>";
//      }
//    }
//    $a = new A();
//    die("abc"); // destructor is called after printing "abc"



//    console_log("this is a log test");


echo (new DateTime())->format("Y-m-d H:i:s"); // https://www.w3docs.com/snippets/php/how-to-get-the-current-date-and-time-in-php.html