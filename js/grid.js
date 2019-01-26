
	var data = new Date();

	var tabela = new View();
	
	tabela.setTemplate(function(mes,ano){
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
		console.log(ano);
		abas.defTrigger(function(){
			abas.me.children[mes-1].children[0].classList.add("activeAba");
		});
		tabela.ano = ano;
		var meses = getMeses();
		var html = `
					<div id="contas" class="limparFloat">
						<table mes="${mes}" ano="${ano}" cellspacing='0' id="tabelaConta" class="table-responsive">
							`;
		var conect = new Conectar();
		conect.defDados("mes="+mes+"&ano="+ano);
		conect.post("./sys/contasMes.php",function(){
		});
		var resposta = JSON.parse(conect.resposta);
		if(resposta.despesas == 0){
			html += `<tr><td colspan=5>Não há resultados a serem apresentados</td></tr>`;
		}
		else{
			extrato.atualizaTemplate([resposta.despesas]);
			resposta.despesas.map((itm,indice)=>{
				if(itm.data_pgto == null){
					itm.data_pgto = "";
				}
				var classe ="impar";
				if(indice%2 ==0){
					classe="par";
				}
				html += `
								<table class="${classe} linha" id='${itm.id}'>
									<tr>
										<td class="data_vencSaldo">dt. venc</td>\n
										<td class="">dt. pagto</td>
										<td coluna='tipo' class="tipo">${itm.tipo}</td>
									</tr>
									<tr>
										<td coluna='data_venc'>	<input type='date'  value='${itm.data_venc}' />	</td>\n
										<td coluna='data_pgto'><input type='date'  value='${itm.data_pgto}' />	</td>
										<td coluna='status'>${itm.status}</td>
									</tr>
									<tr>
										
										<td coluna='descricao' class="desc" colspan=2><input type='text'  value='${itm.descricao}' />	</td>\n
										<td coluna='valor' class="vl"><input type='text'  value='${itm.valor}' />		</td>\n
										
									</tr>
								</table>
							`;
			});
		}
		html += `
	
		</table>
		</div>
		`;
		painelSaldo.atualiza([resposta.credito,resposta.debito, resposta.concluido,resposta.pendente]);
		return html;
	});
	tabela.setEvento(".linha","dblclick",function(){
		var id = this.getAttribute("id");
		control.atualizaTemplate([id]);
		control.renderizar("main");
	}); 
		tabela.setEvento(".linha","click",function(){
		if(this.classList.contains("selected")){
			this.classList.remove("selected");
		}
		else{
			this.classList.add("selected");
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
			<div id="ControleFormSaldo"><button class="fecharJan">Fechar</button></div>
				<fieldset>
					<label>Descrição</label>
					<input type="text" name="desc" id="descSaldo"/>
				</fieldset>
				<fieldset>
					<label>valor</label>
					<input type="text" name="desc" id="valorSaldo"/>
				</fieldset>
				<fieldset>
					<label>Empresa</label>
					<input type="text" name="emp" id="empSaldo"/>
				</fieldset>
				<fieldset>
					<label>Data de vencimento</label>
					<input type="date" name="data_venc" id="data_vencSaldo"/>
				</fieldset>
				<fieldset>
					<label>Tipo</label>
					<select id="tipoSaldo" name="tipo">
						<option value=1>Debito</option>
						<option value=2>Credito</option>
					</select>
				</fieldset>
				<fieldset>
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
					
					border:0;
				}
			
				.table-responsive{
			;
				}	
		`;
		
	});
	var botaoAddConta = new View();
	botaoAddConta.setTemplate(function(){
		return `
			<button id="addConta">Adicionar</button>
		`;
	});
botaoAddConta.setEvento("#addConta","click",function(){
		formCad.renderizar("body");
		formCad.startEvent();
});

