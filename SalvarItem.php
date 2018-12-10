<?php 
	/*$coluna = $_POST['coluna'];
	$item = $_POST['item'];
	$id = $_POST['id'];*/
	$sqlite = "sqlite:./data/ges.db";
    $pdo = new PDO($sqlite);
	
	$ex = $pdo->prepare("update contas set :col = :value where id = :id");
	$ex->bindParam(":col",$coluna);
	$ex->bindParam(":value",$item);
	$ex->bindParam(":id",$id);
	if($ex->execute()){
		echo 1;
	}
	else{
		echo 0;
	}*/
	?>