<?php

$dados = $_POST["data"];
$tipo = $_POST["tipo"];

$dados = json_decode($dados);

$sqlite = "sqlite:../data/ges.db";
switch($tipo){
	case "replicar":
		$error = 0;
		foreach($dados as $d){
			$pdo = new PDO($sqlite);
			$data = getData($d->mes,$d->mes,"01");
			$string = PegarDadosConta($d->codigo,$data,$d->mes,$d->ano);
			$insert = "INSERT INTO contas (descricao, valor,tipo,user,data_venc,mes,ano) 
               values(".$string.")";
			$inserir = $pdo->prepare($insert);	
		
			$pdo = null;
			if(!$inserir->execute()){
				$error++;
			}
		}
		if($error <= 0){
				echo "1";
				return true;
			}
			else{
				echo 0;
				return false;
			}
	break;
	case "transferir":
		foreach($dados as $d){
		$up = "update contas set ano = ?, mes = ? ,data_venc = ? where id = ?";
		$pdo = new PDO($sqlite);
		$data = getData($d->mes,$d->mes,"01");
		echo getData("01",$d->mes,$d->ano);
		$atualizar = $pdo->prepare($up);
		$error = 0;
		if(!$atualizar->execute([$d->ano,$d->mes,$data,$d->codigo])){
			$error++;
		}
		
		}
		if($error <= 0){
			echo 1;
			return true;
		}
		else{
			echo 0;
			return false;
		}
	break;
	
}

function PegarDadosConta($id,$data_venc,$mes,$ano){
	$sqlite = "sqlite:../data/ges.db";
	$pdo = new PDO($sqlite);
	$get = "select descricao, valor,tipo,user from contas where id = ?";
	$gety = $pdo->prepare($get);
	$gety->execute([$id]);
	$data = $gety->fetch();
	$string = "'".$data["descricao"]."','".$data["valor"]."','".$data["tipo"]."','".$data["user"]."','".$data_venc."','".$mes."','".$ano."'";
	return $string;
	}
function getData($dia,$mes,$ano){
	if($mes < 10){
		$m = "0".$mes;
	}
	else{
		$m = $mes;
	}
	return $ano."/".$m."/".$dia;
}