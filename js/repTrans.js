	var data = new Date();
	var tabela = new View();
	tabela.model = function(){
		var conect = new Conectar();
		conect.defDados("mes="+tabela.mes+"&ano="+tabela.ano);
		conect.post("./sys/contasMes.php",function(){});
		return JSON.parse(conect.resposta);
	}
	
	tabela.gerarTabela = function(arr){
					var html = `
						<div id="contasReplicar" class="">
							<button id="replicar" class="bto primaria bto-pq">Replicar</button>
							<button id="transferir" class="bto primaria bto-pq">transferir</button>
							<table mes="${tabela.mes}" ano="${tabela.ano}" cellspacing='0' id="tabelaContaReplicar" class="flutuarEsq table-responsive">
								<tr><td colspan=2">Conta</td><td>Dia</td><td>Tipo</td></tr>
					`;
		if(arr == 0){
			html += `<tr><td colspan=5>Não há resultados a serem apresentados</td></tr>`;
		}
		else{
			arr.map((itm,indice)=>{
					itm.valor = parseFloat(itm.valor);
					if(itm.data_pgto == null){
						itm.data_pgto = "";
					}
					var classe ="imparFrio";
					if(indice%2 ==0){
						classe="parFrio";
					}		
					html += `
									<tr id_e="${itm.id}" class="${classe}"><td><input type="checkbox"/></td><td>${itm.descricao}</td><td>${itm.data_venc.split("-")[2]}</td><td>${itm.tipo[0]}</td></tr>
								`;
				});
				
						html += `
								</table>
								`;
		}
							
			return {html:html};
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
		tabela.ano = ano;
		var meses = getMeses();
		var b = "";
		meses.forEach((itm,i)=>{
			 b += "<li id_e='"+i+"'><input type='checkbox'/> "+itm+"</li>";
		});
		var retorno = tabela.gerarTabela(resposta.despesas);
		html = retorno.html;
		html += `
				<div id="selecionarMes" class="flutuarEsq">
					<ul>
						<li id="ano">
							Ano
							<select id="ano">
								<option value="2018">2018</option>
								<option value="2019">2019</option>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
							</select>
						</li>
						${b}
					</ul>
				</div>	
		`;
		return html;
	});
	tabela.setEvento("#replicar","click",function(){
		var lResult = tabela.pegarInfo();
		tabela.madarReq(lResult.ano,lResult.contas,lResult.mes,"transferir");
	});
	tabela.setEvento("#transferir","click",function(){

		
	});
	tabela.madarReq = function(ano,contas,mes,tipo){
		var conn = new Conectar();
		console.log("antes",contas,typeof contas);
		contas = JSON.stringify(contas);
		mes = JSON.stringify(mes);
		conn.defDados("ano="+ano+"&mes="+mes+"&contas="+contas+"&tipo="+tipo);
		conn.post("./sys/transferirReplicar.php",function(){
			console.log("depos","ano="+ano+"&mes="+mes+"&contas="+contas+"&tipo="+tipo);
			if(conn.resposta == "1"){
				alert("Operação realizada com sucesso");
			}
			else{
				alert("Erro ao realizar operação");
			}
		});
	}
	tabela.pegarInfo = function(){
		var Lcheckbox = tabela.$("#tabelaContaReplicar input[type=checkbox]");
		var LcheckboxMes = tabela.$("#selecionarMes input[type=checkbox]");
		var Lano = tabela.$("select#ano").value;
		var Lchecked = [];
		var LcheckedMes = [];
		Array.prototype.map.call(Lcheckbox,(itm)=>{
			if(itm.checked){
				Lchecked.push(itm.parentNode.parentNode.getAttribute("id_e"));
			}
		});
		Array.prototype.map.call(LcheckboxMes,(itm)=>{
			if(itm.checked){
				LcheckedMes.push(itm.parentNode.getAttribute("id_e"));
			}
		});
		return {mes:LcheckedMes,contas:Lchecked,ano:Lano}
	}
	tabela.defCss(function(){
		return `
			#contasReplicar button {
				width:30%;
			
			}
			#tabelaContaReplicar{
				font-family:calibri, arial,sans-serif;
				padding:0 10px 0 10px;
				width: 	62%;		
			}
			#tabelaContaReplicar tr td:hover{
				font-size:14px;
			}
			#tabelaContaReplicar tr td{
				cursor:pointer;
			}
			#tabelaContaReplicar tr{
				padding:1px;
				height:30px;		
			}
			#tabelaContaReplicar{
				border:1px solid black;		
			}
			#contaReplicar {
				width:100%;
			}
			#selecionarMes{
				margin-left:5px;
				text-align:center;
				border:1px solid black;	
				width:35%; 
			}
			#selecionarMes ul{
				margin:0 0 0 10%;
				width:80%; 
			}
			#selecionarMes ul li{
				padding:1px;
				margin:0 0 0 0;
				width:80%; 
			}
			#replicar{
				cursor:pointer;
			}
			#transferir{
				cursor:pointer;
			}
		`;
	});
