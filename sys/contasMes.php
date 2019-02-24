<?php 
session_start();
$mes = $_POST['mes'];
$ano = $_POST['ano'];
$sqlite = "sqlite:../data/ges.db";
$pdo = new PDO($sqlite);
$execucao = $pdo->prepare("select s.descricao as stat,t.descricao as tipo,c.id,c.descricao,c.valor,c.dia,c.mes,c.ano,c.data_pgto from contas as c inner join tipo as t on (c.tipo = t.id) inner join status as s on( s.id = c.status) where mes = :mes and user = :usuario and ano = :ano order by c.dia");
$execucao->bindParam(":mes",$mes);
$execucao->bindParam(":ano",$ano);
$execucao->bindParam(":usuario",$_SESSION["id"]);
$execucao->execute();
$pdo = null;
$pdo = new PDO($sqlite);
$saldo = $pdo->prepare("select sum(valor) as debito from contas where tipo = 1 and mes= ? and user = ? and ano = ?");
$saldo->execute([$mes,$_SESSION["id"], $ano]);
$debito = $saldo->fetch()[0];
$pdo = new PDO($sqlite);
$saldo = $pdo->prepare("select sum(valor) as credito from contas where tipo = 2 and mes = ? and user = ? and ano = ?");
$contas = $saldo->execute([$mes,$_SESSION["id"],$ano]);
$credito = $saldo->fetch()[0];
$pdo = null;
$pdo = new PDO($sqlite);
$saldo = $pdo->prepare("select sum(valor) as credito from contas where tipo = 2 and mes = ? and user = ? and status = 1 and ano = ?");
$contas = $saldo->execute([$mes,$_SESSION["id"],$ano]);
$concluido = $saldo->fetch()[0];
$pdo = null;
$pdo = new PDO($sqlite);
$saldo = $pdo->prepare("select sum(valor) as credito from contas where tipo = 1 and mes = ? and  user = ? and status = 0 and ano = ? ");
$contas = $saldo->execute([$mes,$_SESSION["id"],$ano]);
$pendente = $saldo->fetch()[0];
$pdo = null;
$i = 0;

	while($row = $execucao->fetch()){
		$ano = $row["ano"];
		$dia = retornarAlgarismo($row["dia"]);
		$mes = retornarAlgarismo($row["mes"]);
		$result[$i] = ["id"=>$row["id"],"descricao"=>$row["descricao"],
		"valor"=>$row["valor"],
		"data_venc"=>$row["ano"]."-".$mes."-".$dia,
		"data_pgto"=>$row["data_pgto"],
		"tipo"=>$row["tipo"],
		"status"=>$row["stat"]];
		$i++;
	}
	if($i == 0){
		$result = 0;
	}
	$obj = ["pendente"=>round($pendente,2),"concluido"=>round($concluido,2),"credito"=>round($credito,2),"debito"=>round($debito,2),"despesas"=>$result];

	echo json_encode($obj);
	
function retornarAlgarismo($numero){
	if($numero < 10){
		return "0".$numero;
	}
	else{
		return $numero;
	}

	}
?>	

