<?php
require_once 'Sb/Dispatcher.php';
header('Content-type: text/json');
header('Content-type: application/json');
$data = file_get_contents("php://input");
$postData = json_decode($data);
echo json_encode($postData);
//echo json_encode($_POST);

//echo json_encode(Sb_Dispatcher::getInstance()->run());