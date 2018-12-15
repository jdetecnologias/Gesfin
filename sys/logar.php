<?php

if(!isset($_POST['email']) || empty($_POST['email']) || !isset($_POST['senha']) || empty($_POST['senha'])){
	echo "Favor preencher os dados necessários";
}
else{
	$email = $_POST['email'];
	$senha = md5($_POST['senha']);
	
	$sqlite = "sqlite:../data/ges.db";
	$pdo = new PDO($sqlite);
	$sql = "select id, count(*) as qtd from users where email = ? and senha = ?";
	$log = $pdo->prepare($sql);
	$log->execute([$email,$senha]);
	$qtd = $log->fetch();
	
	if($qtd["qtd"] > 0){
		$hash = md5(time().$email.$senha);
		$insertHash = $pdo->prepare("update users set hash = ? where id = ?");
		$insertHash->execute([$hash,$qtd["id"]]);
		session_start();
		$_SESSION['hash'] = $hash;
		header("location: ../inicio.php");
	}
	else{
		echo 0;
	}
	
}
?>