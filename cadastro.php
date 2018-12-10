

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html dir="ltr" lang="pt-BR">
<head><meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="./css/style.css"/>
<title>GesFin</title>
</head>
<body>

</body>
<script src="./js/funcoes.js" type="text/javascript"></script>
<script src="./js/view.js" type="text/javascript"></script>
<script src="./js/conectar.js" type="text/javascript"></script>
<script src="./js/container.js" type="text/javascript"></script>
<script>
	var boxCadastro = new View();
	boxCadastro.setTemplate(function(){
		return `
				<div id="box-login">
		<fieldset>
			<label>Nome* </label>
			<input type="text" name="nome" id="nome"/>
		</fieldset>
		<fieldset>
			<label>E-mail* </label>
			<input type="text" name="user" id="email"/>
		</fieldset>
		<fieldset>
			<label>Senha* </label>
			<input type="password" name="senha" id="senha"/>
		</fieldset>
		<fieldset>
			<button id="gravarCadastro">Gravar</button>
			<button>Limpar</button>
		</fieldset>
	</div>
		`;
	});
	boxCadastro.renderizar("#container").adicionarEvento("#gravarCadastro","click",function(){
		var conn = new Conectar();
		conn.PegarDadosFormulario(boxCadastro.me);
		conn.post("./sys/cadastrar.php",function(){
		
		});
		if(conn.resposta == 1){
			alert("Cadastrado com sucesso");
			boxCadastro.atualiza();
		}
	});
	

	
</script>
</html>
