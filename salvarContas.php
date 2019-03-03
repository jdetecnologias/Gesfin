<?php
session_start();
$id = $_SESSION["id"];
$desc = $_POST["descSaldo"];
$vl = $_POST["valorSaldo"];
$emp = $_POST["empSaldo"];
$venc = $_POST["data_vencSaldo"];
$tipoConta = $_POST["tipoSaldo"];
$dataEx = explode("-",$venc);
$dia = $dataEx[2];
$mes = $dataEx[1];
$ano = $dataEx[0];
$sqlite = "sqlite:./data/ges.db";
$pdo = new PDO($sqlite);

$insert = "INSERT INTO contas (descricao, valor,tipo,data_venc,mes,ano,user,dia) 
                VALUES (:desc, :vl, :tp,:venc, :mes, :ano, :id, :dia)";
$in = $pdo->prepare($insert);
$in->bindParam(":desc", $desc);
$in->bindParam(":vl", $vl);
$in->bindParam(":tp", $tipoConta);
$in->bindParam(":venc", $venc);
$in->bindParam(":mes", $mes);
$in->bindParam(":ano", $ano);			
$in->bindParam(":id", $id);	
$in->bindParam(":dia", $dia);	
if($in->execute()){
	echo 1;
	return true;
}
else{
	echo 0;
	return false;
}
$pdo = null;

?>