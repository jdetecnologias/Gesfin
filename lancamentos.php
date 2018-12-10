<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html dir="ltr" lang="pt-BR">
<head><meta http-equiv="Content-type" content="text/html; charset=ISO-8859-1" />

<title>GesFin</title>
</head>
<style>
	.abaMes{
		float:left;
		width:80px;
		height:30px;
		line-height:30px;
		text-align:center;
		font-family:arial;
		font-size:10px;
		margin:1px 0 0 1px;
		border-radius:5px 5px 0 0;
		background-color:rgb(255,235,205);
	}
	.limparFloat{
		clear:both;
	}
	#conta td{
		border:1px solid black;
	}
</style>
<div id="container">
	<header>Gesfin</header>
	<main>
		<h1>Lançamento de despesas</h1>
		<div id="form">
			<form name="lancamentos" method="post" action="salvarContas.php">
			<fieldset>
					<label>Tipo</label>
					<select name="tipoSaldo">
						<option value="1">Debito</option>
						<option value="2">Credito</option>
					</select>
				</fieldset>
				<fieldset>
					<label>Descrição: </label>
					<input type="text" name="descSaldo"/>
				</fieldset>
							<fieldset>
					<label>Valor: </label>
					<input type="text" name="valorSaldo"/>
				</fieldset>
							<fieldset>
					<label>Empresa: </label>
					<input type="text" name="empSaldo"/>
				</fieldset>
							<fieldset>
					<label>Data de vencimento: </label>
					<input type="date" name="data_vencSaldo"/>
				</fieldset>
				<button type="submit">Salvar</button>
				<button type="reset">Limpar</button>
			</form>
		</div>
	</main>
	<footer></footer>
</div>
</head>
<body>

</body>
</html>
