	var boxLogin = new View();
	boxLogin.setTemplate(function(){
		return `
			<div id="box-login">
			<form name="login" method="post" action="http://18.217.144.66/gesfinRest/sys/logar.php">
		<fieldset>
			<label>E-mail</label>
			<input type="hidden" name="hash" id="hash"/>
			<input type="text" name="email" id="email"/>
		</fieldset>
		<fieldset>
			<label>Senha</label>
			<input type="password" name="senha" id="senha"/>
		</fieldset>
		<fieldset class="centralizar">
			<button id="logar" class="bto bto-pq primaria">Entrar</button>
			<button class="bto bto-pq primaria">Limpar</button>
		</fieldset>
		<fieldset>
		Esqueci a senha | <a href="./cadastro.php">Cadastrar</a>
		</fieldset>
	</div>
	</form>
		`;
	});
	boxLogin.defCss(function(){
	return `	
	
@media screen and (min-width:641px){
	#box-login  fieldset{
		margin-left:15%;
		width:70%;
		border:0 ;
		margin-top:15px;
		
	}

	#box-login  input{
		background-color:#fff;
		font-size:18px;
		padding:0;
		width:100%;
		height:30px;
		border-bottom:1px solid black;
		border-left:1px solid black;
		border-top:0;
		border-right:1px solid black;
	}

	#box-login{
		position:absolute;
		left:50%;
		top:50%;
		bord er:1px solid blue;
		width:50%;
		
		transform: translate(-50%,-50%);
	}
}
@media screen and (max-width:640px){
	#box-login  fieldset{
		
		width:80%;
		margin-left:10%;
		border:0 ;
		margin-top:15px;
		
	}

	#box-login  input{
		background-color:#fff;
		font-size:15px;
		padding:0;
		width:100%;
		height:30px;
		border:0;
		border-bottom:1px solid black;
		border-left:1px solid black;
		border-top:0;
		border-right:1px solid black;
	}

	#box-login{
		position:absolute;
		left:50%;
		top:50%;
		bord er:1px solid blue;
		width:100%;
		height:50%;
		transform: translate(-50%,-50%);
	}
}
`;

	});
	
	boxLogin.adicionarEvento("#logar","click",function(e){
		e.preventDefault();
		var conn = new Conectar();
		conn.PegarDadosFormulario(boxLogin.me);
		conn.post("http://18.217.144.66/gesfinRest/login",function(){
			conn.resposta = JSON.parse(conn.resposta);
		
		});
		if(conn.resposta.status == "404"){
			alert("Usuário não existe ou dados de login incorretos");
		}
		else{
			window.location.href = "./setInfo.php?id="+conn.resposta.id+"&hash="+conn.resposta.hash;
		}
	});