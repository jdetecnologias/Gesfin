<?php
	
	session_destroy();
	unset($_SESSION['hash']);
	header("location:../index.php");
	
?>