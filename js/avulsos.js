var avulsos = new View();
avulsos.setTemplate(function(){
	return `
		<div id="lancarAvulsos" class="limparFloat">
			<form name="avulso" method="post" action="./sys/avulsos.php">
				<fieldset>
					<label for="desc">Descrição</label>
					<textarea name="desc" id="desc"></textarea>
				</fieldset>
				<fieldset>
					<label for="valor">Valor</label>
					<input type="text" name="valor" id="valor"/>
				</fieldset>
				<fieldset>
					<label for="dt_compra">Data Compra</label>
					<input type="date" name="dt_compra" id="dt_compra"/>
				</fieldset>
					<fieldset>
					<button type="submit">Salvar</button>
					<button type="reset">Limpar</button>
				</fieldset>
			</form>
		</div>
	`;
});
avulsos.defCss(function(){
	return `
		#lancarAvulsos input,textarea{
			width:100%;
		}
		#lancarAvulsos fieldset{
			border:0;
		}
		form label{
			height:40px;
		}
		@media screen and (max-width: 640px){
			#lancarAvulsos{
				display:block;
				margin-left:10%;
				width:80%;
				height:50%;
			}
		}
		@media screen and (min-width: 641px){
		#lancarAvulsos{
			margin-left:25%;
			width:50%;
			height:50%;
		
		}
		}
	`;
});
avulsos.setEvento("button[type=submit]","click",function(e){
	e.preventDefault();
	var con = new Conectar();
	con.PegarDadosFormulario(avulsos.me);
	con.post("./sys/avulsos.php",function(){
		if(con.resposta == 1){
			alert("Dados Salvo com sucesso!");
			avulsos.atualiza();
		}
		else{
			alert("Dados não foram salvos!")
		}
	});
});
/*container.renderizar("body");
topo.renderizar("#container");
menuPrincipal.renderizar("#container");
main.renderizar("#container");
avulsos.renderizar("main");*/