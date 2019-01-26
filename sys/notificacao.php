<?php
session_start();
date_default_timezone_set('America/Sao_Paulo');
$mes = date("M");
$ano = date("Y");

$sqlite = "sqlite:../data/ges.db";
$sql = "select c.descricao as descricao, c.data_venc as data_venc, c.valor as valor , t.descricao as tipo, s.descricao as status  
		from contas as c inner join tipo as t on (c.tipo = t.id)  inner join status s on (c.status = s.id) where c.user = ? and c.status = 0 and mes < ? and ano <  ?";
$pdo = new PDO($sqlite);
$pegar = $pdo->prepare($sql);
if($pegar->execute([$_SESSION["id"],$mes,$ano])){

	$i = 0;
	$dados = array();
	while($row = $pegar->fetch()){
		$dados[$i]["descricao"] = $row[0];
		$dados[$i]["data_venc"] = $row[1];
		$dados[$i]["valor"] = $row[2];
		$dados[$i]["tipo"] = $row[3];
		$dados[$i]["status"] = $row[4];
		$i++;
	}
	
	echo json_encode($dados);
		
}		
else {
	echo 0;
	return false;
}