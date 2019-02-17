
	var data = new Date();
	var tabela = new View();
	tabela.model = function(){
		var conect = new Conectar();
		conect.defDados("mes="+tabela.mes+"&ano="+tabela.ano);
		conect.post("./sys/contasMes.php",function(){
			
		});
		return JSON.parse(conect.resposta);
	}
	
	tabela.gerarTabela = function(arr){
					var html = `
						<div id="contas" class="limparFloat">
							<table mes="${tabela.mes}" ano="${tabela.ano}" cellspacing='0' id="tabelaConta" class="table-responsive">
								`;
					var debito = 0;
					var credito = 0 ;
					var pendenteDebito = 0;
					var pendenteCredito = 0;
					var concluidoDebito = 0;
					var concluidoCredito = 0;
		if(arr == 0){
			html += `<tr><td colspan=5>Não há resultados a serem apresentados</td></tr>`;
		}
		else{
			arr.map((itm,indice)=>{
					itm.valor = parseFloat(itm.valor);
					if(itm.data_pgto == null){
						itm.data_pgto = "";
					}
					var classe ="impar";
					if(indice%2 ==0){
						classe="par";
					}
					if(itm.tipo.toLowerCase() == "debito"){
						debito += itm.valor;
					}
					if(itm.tipo.toLowerCase() == "credito"){
						credito += itm.valor;
						if(itm.status.toLowerCase() == "concluido"){
							concluidoCredito += itm.valor;
						}
						else if(itm.status.toLowerCase() == "pendente"){
							pendenteCredito += itm.valor;
						}
					}
					html += `
									<table class="${classe} table-i linha" id='${itm.id}'>
										<tr>
											<td class="data_vencSaldo">dt. venc</td>\n
											<td class="">dt. pagto</td>
											<td coluna='tipo' class="tipo">${NullToString(itm.tipo)}</td>
										</tr>
										<tr>
											<td coluna='data_venc'>	<input type='date'  value='${itm.data_venc}' />	</td>\n
											<td coluna='data_pgto'><input type='date'  value='${itm.data_pgto}' />	</td>
											<td coluna='status'>${itm.status}</td>
										</tr>
										<tr>
											
											<td coluna='descricao' class="desc" colspan=2><input type='text'  value='${NullToString(itm.descricao)}' />	</td>\n
											<td coluna='valor' class="vl"><input type='text'  value='${itm.valor}' />		</td>\n
											
										</tr>
									</table>
								`;
				});
				
						html += `
								</table>
								</div>
								`;
		}
					console.log(arr);
					arr.credito = credito;
					arr.debito = debito;
					arr.concluido = concluidoCredito;
					arr.pendente = pendenteCredito;
					
			return {credito:credito,debito:debito,concluido:concluidoCredito,pendente:pendenteCredito,html:html};
	}
	tabela.setTemplate(function(mes,ano,dados){
		if(!mes){
			if(!tabela.mes){
				mes = (data.getMonth()+1);
				tabela.mes = mes;
			}
			else{
				mes = tabela.mes;
			}
		}
		else{
			tabela.mes = mes;
		}
		if(!ano){
			if(!tabela.ano){
				ano = (data.getFullYear());
				tabela.ano = ano;
			}
			else{
				ano = tabela.ano;
			}
		}
		else{
			tabela.ano = ano;
		}
		var resposta = tabela.model();
		tabela.dados = resposta.despesas;
		if(dados){
			resposta.despesas = dados;
		}
		abas.defTrigger(function(){
			abas.me.children[mes-1].children[0].classList.add("activeAba");
		});
		tabela.ano = ano;
		var meses = getMeses();
		var retorno = tabela.gerarTabela(resposta.despesas);
		html = retorno.html;
		painelSaldo.atualiza([retorno.credito,retorno.debito, retorno.concluido,retorno.pendente]);
		return html;
	});
	tabela.setEvento(".linha","dblclick",function(e){
		console.log(e);
		if(e.target.nodeName != "INPUT"){
			var id = this.getAttribute("id");
			control.atualizaTemplate([id]);
			control.renderizar("main");
		}
	}); 
		tabela.setEvento(".linha","click",function(e){
		if(e.target.nodeName != "INPUT"){
			if(this.classList.contains("selected")){
				this.classList.remove("selected");
			}
			else{
				this.classList.add("selected");
			}
		}
	});

tabela.setEvento("td input","change",function(){
		var Con = new Conectar();
				$coluna = this.parentNode.getAttribute("coluna");
				$item = this.value;
				$id = this.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
				Con.defDados("coluna="+$coluna+"&item="+$item+"&id="+$id);
			Con.post("./sys/SalvarItem.php",function(){
			});
			console.log(Con.resposta);
					tabela.atualiza([tabela.mes]);
		
	});
		
	

	//4108637461794408 843
	var formCad = new View();
	formCad.setTemplate(function(){
		return `
		
			<section id="form">
			<div id="ControleFormSaldo"><i class="fas fa-window-close fecharJan"></i></div>
				<fieldset>
					<input type="text" name="desc" id="descSaldo" placeholder="Descrição"/>
				</fieldset>
				<fieldset>
					<input type="text" name="desc" id="valorSaldo" placeholder="Valor"/>
				</fieldset>
				<fieldset>
					<input type="text" name="emp" id="empSaldo" placeholder="Empresa"/>
				</fieldset>
				<fieldset id="duplicar">
					<div class="flutuarEsq" id="_data">
						<label>Vencimento</label>
						<input type="date" name="data_venc" id="data_vencSaldo"/>
					</div>
					<div class="flutuarEsq" id="_tipo">
						<label class="limparFloat">Tipo</label>
						<div>
							<input type="radio" class="limparFloat" name="tipoSaldo" value="1"> Débito
							<input type="radio" class="limparFloat" name="tipoSaldo" value="2"> Crédito
						</div>
					</div>
				</fieldset>
				<fieldset id="botoes">
					<button id="salvarSaldo">Gravar</button>
					<button class="fecharJan">Cancelar</button>
				</fieldset>
			<section>
		`;
	});
	formCad.setEvento(".fecharJan","click",function(){
		formCad.me.style.display = "none";
	});
	formCad.setEvento("#salvarSaldo","click",function(){
		
		var desc = formCad.me.querySelector("#descSaldo").value;
		var valor = formCad.me.querySelector("#valorSaldo").value;
		var data_venc = formCad.me.querySelector("#data_vencSaldo").value;
		var tipo = formCad.me.querySelector("#tipoSaldo").value;
		var emp = formCad.me.querySelector("#empSaldo").value;
		var erro = [];
		var a = 0;
		if(desc == "" && valor == "" && emp == ""){
			alert("Favor preencher todos os dados");
		}
		else
		{
		var cone = new Conectar();
		cone.PegarDadosFormulario(formCad.me);
		cone.post("./salvarContas.php",function(){
			
		});
		
		tabela.atualiza([tabela.mes]);
		formCad.me.style.display = "none";
		}
	});
	formCad.defCss(function(){
		return ` 
				@media screen and (min-width:961px){
					
					section#form{
						border-radius:10px 10px 0 0;
						color:white;
						position:fixed;
						font-family:sans-serif;
						position:absolute;
						left:40%;
						bottom:0;
						width:40%;
						background-color:red;
					}
				}
					@media screen and (max-width:960px){
					section#form{
						border-radius:5px 0;
						color:white;
						position:fixed;
						font-family:tresans-serif;
						position:absolute;
						left:5%;
						bottom:0;
						width:90%;
						background-color:red;
					}
				}
					fieldset#botoes{
						width:40%;
						margin-left:30%;
					}
					#ControleFormSaldo{
						width:100%;
						height:25px;
						line-height:25px;
					}	
					#ControleFormSaldo i{
						margin-right:10px;
						line-height:25px;
					}	
					#form fieldset{
						margin-top:5px;
						border:0;
						
					}
					#form fieldset input[type=text]{
						width:90%;
						height:30px;
						margin-left:5%;
					}
					#form fieldset#duplicar{
						width:95%;
						margin-left:2.5%;
					}
					#form fieldset#duplicar div#_data{
						width:40%;

					}
					#form fieldset#duplicar div#_tipo{
						margin-left:10%;
						width:50%;

					}
					#form fieldset#duplicar div label{
						width:100%;
					}
					#form fieldset input[type="radio"]{
						font-size:12px; !important
						width:50%;
					}
		`;
	});
	tabela.defCss(function(){
		return `
				#contas  {
					height:500px;
				    overflow-y:auto;
					font-family:calibri,sans-serif;
					overflow-x:auto;
					margin-left:10px;
				}
				.vl input{
					width:70px;
				}
				
				#contas table tr td input{
					cursor:text;
					border:0;
				}
			@media screen and (max-width:474px){
				.table-i{
					width:98%;
				}	
			}
			@media screen and (min-width:641px){
				.table -i{
					width:80%;
				}	
			}
			@media screen and (min-width:475px){
				.table-i{
					width:450px;
				}	
			}
			.table-i{
				cursor:pointer;
				}
				`;
		
	});
	var botaoAddConta = new View();
	botaoAddConta.setTemplate(function(){
		return `
			<button id="addConta">Adicionar</button>
		`;
	});
	botaoAddConta.defCss(function(){
		return `
				#addConta{
					position:fixed;
					bottom:0;
					left:0;
				}
		`;
	});
botaoAddConta.setEvento("#addConta","click",function(){
		formCad.renderizar("body");
		formCad.startEvent();
});

