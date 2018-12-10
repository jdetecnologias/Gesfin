<?php
$id = $_POST['id'];

$sqlite = "sqlite:../data/ges.db";
$pdo = new PDO($sqlite);
$delete = $pdo->prepare("delete from contas where id= ?");
$result = $delete->execute([$id]);
if($result){
	echo 1;
}
else{
	echo 0;
}
?>