<?php
$ano = $_POST["ano"];
$mes = $_POST["mes"];
$contas = $_POST["contas"];
$tipo = $_POST["tipo"];
$contas = json_decode($contas);
$mes = json_decode($mes);
$sqlite = "sqlite:../data/ges.db";
switch ($tipo)
{
case "replicar":
	$error = 0;
	$in_ = retornarIdConta($contas);
	foreach($mes as $m)
	{
		$pdo = new PDO($sqlite);
		$sql = "insert into contas(descricao,valor,tipo,mes,ano,status,user) select descricao,valor,tipo,(mes-mes+" . $m . "),(ano-ano+" . $ano . "),status,user from contas where id in" . $in_;
		$inserir = $pdo->prepare($sql);
		if (!$inserir->execute())
		{
			$error++;
		}
		$pdo = null;
	}
	if ($error <= 0)
	{
		echo "1";
		return true;
	}
	else
	{
		echo 0;
		return false;
	}
	break;
case "transferir":
	foreach($contas as $d)
	{
		$up = "update contas set ano = ?, mes = ? ,data_venc = ? where id = ?";
		$pdo = new PDO($sqlite);
		$data = getData($d->mes, $d->mes, "01");
		echo getData("01", $d->mes, $d->ano);
		$atualizar = $pdo->prepare($up);
		$error = 0;
		if (!$atualizar->execute([$d->ano, $d->mes, $data, $d->codigo]))
		{
			$error++;
		}
	}
	if ($error <= 0)
	{
		echo 1;
		return true;
	}
	else
	{
		echo 0;
		return false;
	}
	break;
}

function PegarDadosConta($id, $data_venc, $mes, $ano)
{
	$sqlite = "sqlite:../data/ges.db";
	$pdo = new PDO($sqlite);
	$get = "select descricao, valor,tipo,user from contas where id in";
	$gety = $pdo->prepare($get);
	$gety->execute([$id]);
	$data = $gety->fetch();
	$string = "'" . $data["descricao"] . "','" . $data["valor"] . "','" . $data["tipo"] . "','" . $data["user"] . "','" . $data_venc . "','" . $mes . "','" . $ano . "'";
	return $string;
}

function getData($dia, $mes, $ano)
{
	if ($mes < 10)
	{
		$m = "0" . $mes;
	}
	else
	{
		$m = $mes;
	}

	return $ano . "/" . $m . "/" . $dia;
}

function retornarIdConta($contas)
{
	$string = "(";
	$count = count($contas);
	for ($i = 0; $i < $count; $i++)
	{
		$string.= $contas[$i];
		if ($i < ($count - 1))
		{
			$string.= ",";
		}
	}

	$string.= ")";
	return $string;
}