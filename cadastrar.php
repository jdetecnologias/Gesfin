<?php
/*if(empty($_POST["nome"]) || !isset($_POST["nome"])){
	echo "Favor preencher o nome";
}
else if(empty($_POST["senha"]) || !isset($_POST["senha"])){
	echo "Favor preencher o senha";
}
else if(empty($_POST["email"]) || !isset($_POST["email"])){
	echo "Favor preencher o e-mail";
}
else{*/
	$nome =  "Julio";
	$senha = md5(5);
	$email =  "jk";
	echo $nome.$senha.$email;
	$sqlite = "sqlite:./data/ges.db";
	$pdo = new PDO($sqlite);
	$sql = "INSERT INTO users (nome,email,senha) VALUES (:nome,:email,:senha)";
	$gravar = $pdo->prepare($sql);
	$gravar->bindParam(":nome",$nome);
	$gravar->bindParam(":email",$email);
	$gravar->bindParam(":senha",$senha);
	var_dump($gravar->execute());
	if($gravar->execute()){
		echo 1;
	}
	else{
		echo 0;
	}
/*}*/