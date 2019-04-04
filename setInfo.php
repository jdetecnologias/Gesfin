<?php
session_start();
$_SESSION["hash"] = $_GET["hash"];
$_SESSION["id"] = $_GET["id"];

header("location: inicio.php");
?>