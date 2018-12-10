		var painelSaldo  = new View();
	painelSaldo.setTemplate(function(credito = null,debito= null){
		if(credito == null){
			credito = 0;
		}
		if(debito == null){
			debito = 0;
		}
		return `
			<div id="saldos" class="flutuarEsq">
				<table>
					<tr><td>Crédito</td><td>${credito}</td></tr>
					<tr><td>Débito</td><td>${debito}</td></tr>
					<tr><td>Balanço</td><td>${credito-debito}</td></tr>
				</table>
			</div>

		`;
	});
	painelSaldo.renderizar("main");