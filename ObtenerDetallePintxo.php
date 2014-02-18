<?php
$obj= array();

$obj['id']= $_GET['valor1']; //string
$obj['srcImagen'] = $_GET['valor2'];  // integer.
$obj['title']= $_GET['valor3']; //array
$obj['descripcion']= $_GET['valor4']; //array


echo json_encode($obj);
?>