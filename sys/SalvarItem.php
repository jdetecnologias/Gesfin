<?php 
	$coluna = $_POST['coluna'];
	$item = $_POST['item'];
	$id = $_POST['id'];
	$sqlite = "sqlite:../data/ges.db";
	$pdo = new PDO($sqlite);
	switch($coluna){
		case "descricao":
			$update = "update contas set descricao = :value where id = :id";
		break;
		case "valor":
			$update = "update contas set valor = :value where id = :id";
		break;
		case "data_venc":
			$dataEx = explode("-",$item);
			$dia = $dataEx[2];
			$mes = $dataEx[1];
			$ano = $dataEx[0];
			$update = "update contas set data_venc = :value,dia = ".$dia.", mes = ".$mes.", ano = ".$ano." where id = :id";
		break;
		case "data_pgto":
			if($item == ""){
				$update = "update contas set data_pgto = :value,status = 0 where id = :id";
			}
			else{
				$update = "update contas set data_pgto = :value, status = 1 where id = :id";
			}
		break;
	}
	$ex = $pdo->prepare($update);
	$ex->bindParam(":value",$item);
	$ex->bindParam(":id",$id);
	if($ex->execute()){
		echo 1;
	}
	else{
		echo 0;
	}
	?>