<?php 
session_start();
$_SESSION["titulo"] = "Gesfin";

if(isset($_SESSION["hash"])){
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html dir="ltr" lang="pt-BR">
<head><meta http-equiv="Content-type" content="text/html; charset=ISO-8859-1" />
<meta name="viewport" content="width=device-width">
<link rel="stylesheet" type="text/css" href="./css/style.css"/>
<link href="./fa/css/all.css" rel="stylesheet">
<title><?php echo $_SESSION["titulo"];?></title>
</head>
<body>
</body>
</html>
<script src="./js/funcoes.js" type="text/javascript"></script>
<script src="./js/view.js" type="text/javascript"></script>
<script src="./js/conectar.js" type="text/javascript"></script>
<script src="./js/container.js" type="text/javascript"></script>
<script src="./js/topo.js" type="text/javascript"></script>
<script src="./js/avulsos.js" type="text/javascript"></script>
<script src="./js/main.js" type="text/javascript"></script>
<script src="./js/abas.js" type="text/javascript" ></script>
<script src="./js/extrato.js" type="text/javascript"></script>
<script src="./js/menus.js" type="text/javascript"></script>
<script src="./js/painelSaldo.js" type="text/javascript"></script>
<script src="./js/seletorMes.js" type="text/javascript"></script>
<script src="./js/grid.js" type="text/javascript"></script>
<script src="./js/controles.js" type="text/javascript"></script>
<script src="./js/notificacao.js" type="text/javascript"></script>
<script src="./js/inicio.js" type="text/javascript"></script>
<?php 
	echo $_SESSION['id'];
}
else{
	header("location:./index.php");
}
?>



