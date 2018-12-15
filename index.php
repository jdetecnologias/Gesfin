

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
	var boxLogin = new View();
	boxLogin.setTemplate(function(){
		return `
			<div id="box-login">
			<form name="login" method="post" action="./sys/logar.php">
		<fieldset>
			<label>E-mail</label>
			<input type="hidden" name="hash" id="hash"/>
			<input type="text" name="email" id="email"/>
		</fieldset>
		<fieldset>
			<label>Senha</label>
			<input type="password" name="senha" id="senha"/>
		</fieldset>
		<fieldset>
			<button id="logar">Entrar</button>
			<button>Limpar</button>
		</fieldset>
		<fieldset>
		Esqueci a senha | <a href="./cadastro.php">Cadastrar</a>
		</fieldset>
	</div>
	</form>
		`;
	});
	boxLogin.renderizar("#container");
	/*.adicionarEvento("#logar","click",function(e){
		e.preventDefault();
		var conn = new Conectar();
		conn.PegarDadosFormulario(boxLogin.me);
		conn.post("./sys/logar.php",function(){
			
		});
		if(conn.resposta == 0){
			alert("Usuário não existe ou dados de login incorretos");
		}
		else{
			boxLogin.me.querySelector("#hash").value = conn.resposta;
			var form = boxLogin.me.querySelector("form");
			form.addEventListener("submit",function(){
				
			});
		}
	});*/
</script>
</html>
