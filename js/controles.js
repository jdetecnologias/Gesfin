var control = new View();
var mesAno = new View();
mesAno.setTemplate(function(){
				var meses = getMeses();
				
				var option = "<option>Mês</option>";
				meses.map((itm,indice)=>{
						option += `<option value="${indice+1}">${itm}</option>`;	
				});
	
	return `<section id="controles" class="limparFloat">
				<fieldset>
				<select id="mesRep" name="mes">
					
					${option}
					
					
				</select>
				<select id="anoRep" name="ano">
					<option value=2019>2019</option>
				</select>
				</fieldset>
				<fieldset>
				<button id="confirmar">Confirmar</button>
				</fieldset>
				
				
			</section>`;
});
control.tela(mesAno);
control.setTemplate(function(id = 0){
	return `
		<section id="controles" class="limparFloat">
			<ul>
				<li>Código Conta ${id}</li>
				<li id="transferirConta">Transferir conta</li>
				<li id="replicarContas">replicar conta</li>
				<li id="excluirConta" codigo="${id}">Excluir contas</li>
			</ul>
		</section>
	`;
	
});

control.setEvento("#replicarContas","click",function(){
	control.tipo = "replicar";
	control.telas.go(control);	
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
	#controles fieldset{
		border:0;
	}
		@media screen and (max-width:960px){
			section#controles{
			
				width:80%;
			}
			
		}
			
		@media screen and (min-width:961px){
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

control.setEvento("#confirmar","click",function(){
	var selected = main.$(".selected");
	var mes = mesAno.$("#mesRep").value;
	var ano = mesAno.$("#anoRep").value;
	var arr = [];
	var cd;
	if(selected){
		if(selected.length == undefined){
			cd = selected.getAttribute("id");
			arr.push({codigo:cd,mes:mes,ano:ano});
		}
		else{
				
			for(var i = 0; i<selected.length;i++){
				cd = selected[i].getAttribute("id");
				arr.push({codigo:cd,mes:mes,ano:ano});
			}
		}
		var conn = new Conectar();
		arr = JSON.stringify(arr);
		conn.defDados("data="+arr+"&tipo="+control.tipo);
		conn.post("./sys/transferirReplicar.php",function(){
			if(conn.resposta == "1"){
				alert("Contas transferidas com sucesso");
			}
			else{
				alert("Erro ao replicar contas");
			}
		});
		control.me.style.display = "none";
	}
});

control.setEvento("#transferirConta","click",function(){
	control.tipo = "transferir";
	control.telas.go(control);
});

control.FecharComponente();