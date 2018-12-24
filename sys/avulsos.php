
<?php

$desc = $_POST["desc"];
$vl = $_POST["valor"];
$venc = $_POST["dt_compra"];
$tipoConta = 1;
$dataEx = explode("-",$venc);
$mes = $dataEx[1];
$ano = $dataEx[0];
$sqlite = "sqlite:../data/ges.db";
$pdo = new PDO($sqlite);
$insert = "INSERT INTO contas (descricao, valor,tipo,data_venc,data_pgto,mes,ano,status) 
                VALUES (:desc, :vl, :tp,:venc,:venc, :mes, :ano, 1)";
$in = $pdo->prepare($insert);
$in->bindParam(":desc", $desc);
$in->bindParam(":vl", $vl);
$in->bindParam(":tp", $tipoConta);
$in->bindParam(":venc", $venc);
$in->bindParam(":mes", $mes);
$in->bindParam(":ano", $ano);			
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