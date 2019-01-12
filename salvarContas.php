
<?php
session_start();
$id = $_SESSION["id"];
$desc = $_POST["descSaldo"];
$vl = $_POST["valorSaldo"];
$emp = $_POST["empSaldo"];
$venc = $_POST["data_vencSaldo"];
$tipoConta = $_POST["tipoSaldo"];
$dataEx = explode("-",$venc);
$mes = $dataEx[1];
$ano = $dataEx[0];
$sqlite = "sqlite:./data/ges.db";
$pdo = new PDO($sqlite);
var_dump($pdo);
$insert = "INSERT INTO contas (descricao, valor,tipo,data_venc,mes,ano,user) 
                VALUES (:desc, :vl, :tp,:venc, :mes, :ano, :id)";
$in = $pdo->prepare($insert);
$in->bindParam(":desc", $desc);
$in->bindParam(":vl", $vl);
$in->bindParam(":tp", $tipoConta);
$in->bindParam(":venc", $venc);
$in->bindParam(":mes", $mes);
$in->bindParam(":ano", $ano);			
$in->bindParam(":id", $id);	
if($in->execute()){
 echo true;
	return true;
}
else{
	echo false;
	return false;
}
$pdo = null;

?>