var extrato = new View();
extrato.setTemplate(function(despesas = null){
	html = `hfhfh`;
	if(despesas !=null){
	html = `<div id="extrato">`;
	despesas.map((despesa,indice)=>{
		html += `
				<div class="itemTabela">
					<div class="limparFloat">
						<div class="dataVenc flutuarEsq">${despesa.data_venc}</div>
						<div class="descricao flutuarEsq">${despesa.descricao}</div>
						<div class="valor flutuarEsq">${despesa.valor}</div>
					</div>
					<div class="limparFloat">
						<div class="dataPagto flutuarEsq">
							${despesa.data_pgto}
						</div>
						<div class="empresa flutuarEsq">
							${despesa.empresa}
						</div>
					</div>
				</div>
		`;
	});
	html += `</div>`;
	}
	return html;
});