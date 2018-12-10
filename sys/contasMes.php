<?php 
$mes = $_POST['mes'];
$sqlite = "sqlite:../data/ges.db";
$pdo = new PDO($sqlite);
$execucao = $pdo->prepare("select s.descricao as stat,t.descricao as tipo,c.id,c.descricao,c.valor,c.data_venc,c.data_pgto from contas as c inner join tipo as t on (c.tipo = t.id) inner join status as s on( s.id = c.status) where mes = :mes order by c.data_venc");
$execucao->bindParam(":mes",$mes);
$execucao->execute();
$pdo = null;
$pdo = new PDO($sqlite);
$saldo = $pdo->prepare("select sum(valor) as debito from contas where tipo = 1 and mes= ?");
$saldo->execute([$mes]);
$debito = $saldo->fetch()[0];
$pdo = new PDO($sqlite);
$saldo = $pdo->prepare("select sum(valor) as credito from contas where tipo = 2 and mes = ?");
$contas = $saldo->execute([$mes]);
$credito = $saldo->fetch()[0];
$pdo = null;
$i = 0;

	while($row = $execucao->fetch()){
		$result[$i] = ["id"=>$row["id"],"descricao"=>$row["descricao"],
		"valor"=>$row["valor"],
		"data_venc"=>$row["data_venc"],
		"data_pgto"=>$row["data_pgto"],
		"tipo"=>$row["tipo"],
	"status"=>$row["stat"]];
		$i++;
	}
	if($i == 0){
		$result = 0;
	}
	$obj = ["credito"=>$credito,"debito"=>$debito,"despesas"=>$result];

	echo json_encode($obj);
?>	

