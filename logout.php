<?php
	session_start();
	session_destroy();
	unset($_SESSION['hash']);
	header("location:./index.php");
	
?>