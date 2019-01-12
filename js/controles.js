var control = new View();

control.tela(function(){
	return `<section id="controles" class="limparFloat">
				<select>
					<option>Janeiro</option>
				</select>
				<select>
					<option>2019</option>
				</select>
			</section>`;
});
control.setTemplate(function(id = 0){
	return `
		<section id="controles" class="limparFloat">
			<ul>
				<li>Código Conta ${id}</li>
				<li>Transferir conta</li>
				<li id="replicarContas">replicar conta <select><option>vfg</option></select> </li>
				<li id="excluirConta" codigo="${id}">Excluir contas</li>
			</ul>
		</section>
	`;
	
});

control.setEvento("#replicarContas","click",function(){
	control.telas.go(control);
/*	var selected = main.$(".selected");
	var arr = [];
	var cd;
	if(selected){
		for(var i = 0; i<selected.length;i++){
				cd = selected[i].getAttribute("id");
				arr.push({codigo:cd});
		}
	}
	console.log(arr);*/
	
});
control.setEvento("#excluirConta","click",function(){
		var resp = confirm("Deseja realmente excluir registro?");
		if(resp){
			var id = this.getAttribute("codigo");
			var conec = new Conectar();
			conec.defDados("id="+id);
			
		conec.post("./sys/deletarLinha.php",function(){
			
		});
		
		var  resposta = conec.resposta;
		if(resposta == 1){
			alert("Registro deletado com sucesso");
		}
		else{
			
		}
			control.me.style.display = "none";
			tabela.atualiza([tabela.mes]);

		}
	
});
control.defCss(function(){
	return `
		@media screen and (max-width:640px){
			section#controles{
			
				width:80%;
			}
			
		}
			
		@media screen and (min-width:641px){
			section#controles{
			
				width:20%;
			}
			
		}
			#controles{
				background-color:rgba(255,255,255,1);
				position:absolute;
				top:50%;
				left:50%;
				margin-top:-35px;
				
				line-height:35px;
			}
			#controles i{
			width:30px;
			cursor:pointer;
			}
		
		`;
});