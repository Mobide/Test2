<?php
require_once("db.php");

$conn = db_connect ();
$id=$_GET['id'];
$lang=$_GET['lang'];
$item_row=db_get_item_row($conn,$id);
echo json_encode(array("id"=>$item_row["id"],"srcimg"=>$item_row["srcimg"],"alias"=>$item_row["alias_" . $lang],"ingredientes"=>$item_row["ingredientes_" . $lang] ));
?>