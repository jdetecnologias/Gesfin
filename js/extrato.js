var extrato = new View();
extrato.setTemplate(function(despesas = null){
	html = `hfhfh`;
	if(despesas !=null){
	html = `<div id="extrato">`;
	despesas.map((despesa,indice)=>{
		html += `
				<div class="itemTabela">
					<div class="limparFloat">
						<div class="dataVenc flutuarEsq colunaTabela">
							Dt. venc. :${converterData(despesa.data_venc)}
						</div>
						<div class="dataPagto flutuarEsq colunaTabela">
							Dt. pgt. :${converterData(despesa.data_pgto)}
						</div>
						<div class="dataPagto flutuarEsq colunaTabela">
							${despesa.tipo}
						</div>
					</div>
					<div class="limparFloat">
						<div class="descricao flutuarEsq">
							${despesa.descricao}
						</div>
						<div class="valor flutuarEsq">
							${BrasilSistemaDecimal(parseFloat(despesa.valor))}
						</div>
					</div>
				</div>
		`;
	});
	html += `</div>`;
	}
	return html;
});
extrato.defCss(function(){
	
	return `
			#extrato{
				margin-top:50px;
				width:40%;
				font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
				font-fami ly: 'Trebuchet MS',Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;
				font-size:12px;
			}
	`;
});