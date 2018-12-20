var menuTipoExtrato = new View();
menuTipoExtrato.setTemplate(function(){
	return `
		<section id="tipoExtrato" class="flutuarEsq">
			<button id="planilha" class="flutuarEsq">
				Planilha
			</button>
			<button id="Textrato" class="flutuarEsq">
				Extrato
			</button>
		</section>
	`;
});

menuTipoExtrato.setEvento("button","click",function(){
	var tipo = this.getAttribute("id");
	switch(tipo){
		case "planilha":
			tabela.mudarConteudo(extrato);
		break;
		case "Textrato":
			extrato.mudarConteudo(tabela);
		break;
	}
});
menuTipoExtrato.defCss(function(){
	return `
			#tipoExtrato{
				color:grey;
				margin-top:50px;
				height:40px;
				
			}
			#tipoExtrato button {
				box-shadow:0px 0px 0px 0 rgba(0,0,0,0.4);
				text-align:center;
				line-height:40px;
				background-color:rgba(173,216,230,0.9);
				padding:0;
				height:40px;
				width:95px;
				margin-left:1px;
			}
	`;
	
});

var menuPrincipal = new View();
menuPrincipal.setTemplate(function(){
	return `
		<section id="menuPrincipal" class="limparFloat">
			<div class="Pmenu">
				<ul>
					<li>Painel de contas</li>
					<li>Extrato</li>
					<li>Lançamento de despesas e proventos</li>
					<li>Bancos</li>
					
				</ul>
			</div>
		</section>
	`;
});

menuPrincipal.defCss(function(){
	return `
		#menuPrincipal{
			height:200px;
			width:100%;
		}
		ul li {
			min-height:15px;
			border-bottom:1px dotted black;
			list-style-type:none;
			}
		.Pmenu{
			height:${75}px;
			width:150px;
			font-size:12px;
			border-right:2px solid lightblue;
		}
	`;
	
});



