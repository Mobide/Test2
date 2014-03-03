<?php
// Archivo pag1.php
session_start();
$id = $_GET['id'];
$_SESSION[‘id’] = $id;
echo $id;
?>