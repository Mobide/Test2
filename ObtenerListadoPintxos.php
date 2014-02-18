<?php
$obj= array(array());

$obj[0]['id']= $_GET['valor1']; //string
$obj[0]['srcImagen'] = $_GET['valor2'];  // integer.
$obj[0]['title']= $_GET['valor3']; //array

$obj[1]['id']= $_GET['valor1']; //string
$obj[1]['srcImagen'] = $_GET['valor2'];  // integer.
$obj[1]['title']= $_GET['valor3']; //array

$obj[2]['id']= $_GET['valor1']; //string
$obj[2]['srcImagen'] = $_GET['valor2'];  // integer.
$obj[2]['title']= $_GET['valor3']; //array

echo json_encode($obj);
?>
