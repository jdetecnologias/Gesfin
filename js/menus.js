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
		ul li {
		
			border-bottom:1px dotted black;
			list-style-type:none;
			}
		.Pmenu{
			height:${4*15}px;
			width:150px;
			font-size:12px;
			border-right:2px solid lightblue;
		}
	`;
});



