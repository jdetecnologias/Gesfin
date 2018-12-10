
	var data = new Date();

	var tabela = new View();
	
	tabela.setTemplate(function(mes = (data.getMonth()+1)){
		abas.me.children[mes-1].children[0].classList.add("activeAba");
		tabela.mes = mes;
		var meses = getMeses();
		var html = `
					<div id="contas" class="limparFloat">
						<h3 class="">${meses[mes-1]}</h3>
						<table mes="${mes}" ano="" cellspacing='0' id="tabelaConta">
							<tr><th>Descriçao</th><th>Valor</th><th>Data Vencimento</th><th>Data Pagamento</th><th>Tipo</th><th>Status</th></tr>`;
		var conect = new Conectar();
		conect.defDados("mes="+mes);
		conect.post("./sys/contasMes.php",function(){
		});
		var resposta = JSON.parse(conect.resposta);
		if(resposta.despesas == 0){
			html += `<tr><td colspan=5>Não há resultados a serem apresentados</td></tr>`;
		}
		else{
			resposta.despesas.map(itm=>{
				if(itm.data_pgto == null){
					itm.data_pgto = "";
				}
				html += ` <tr id='${itm.id}'>\n
				<td coluna='descricao'>	<input type='text'  value='${itm.descricao}' />	</td>\n
				<td coluna='valor'>			<input type='text'  value='${itm.valor}' />		</td>\n
				<td coluna='data_venc'>	<input type='date'  value='${itm.data_venc}' />	</td>\n
				<td coluna='data_pgto'><input type='date'  value='${itm.data_pgto}' />	</td>
				<td coluna='tipo'>${itm.tipo}</td>
				<td coluna='tipo'>${itm.status}</td>
				</tr>`;
			});
		}
		html += `</table>
		</div>
		`;
		painelSaldo.atualiza([resposta.credito,resposta.debito]);
		return html;
	});
	tabela.setEvento("#tabelaConta tr","dblclick",function(){
		var resp = confirm("Deseja realmente excluir registro?");
		if(resp){
			var id = this.getAttribute("id");
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
		
		tabela.atualiza([tabela.mes]);
		}
	});
	tabela.renderizar("main").adicionarEvento("td input","change",function(){
		var Con = new Conectar();
				$coluna = this.parentNode.getAttribute("coluna");
				$item = this.value;
				$id = this.parentNode.parentNode.getAttribute("id");
				Con.defDados("coluna="+$coluna+"&item="+$item+"&id="+$id);
			Con.post("./sys/SalvarItem.php",function(){
			});
					tabela.atualiza([tabela.mes]);
		
	});
	
		
	

	//4108637461794408 843
	var formCad = new View();
	formCad.setTemplate(function(){
		return `
		
			<section id="form">
			<div id="ControleFormSaldo"><button class="fecharJan">Fechar</button></div>
				<fieldset>
					<label>DescriÃ§Ã£o</label>
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
	var botaoAddConta = new View();
	botaoAddConta.setTemplate(function(){
		return `
			<button id="addConta">Adicionar</button>
		`;
	});
	botaoAddConta.renderizar("#contas").adicionarEvento("#addConta","click",function(){
		formCad.renderizar("body");
		formCad.startEvent();
	});
