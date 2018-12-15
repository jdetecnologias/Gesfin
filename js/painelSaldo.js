		var painelSaldo  = new View();
	painelSaldo.setTemplate(function(credito = null,debito= null,concluido = null,pendente= null){
	var x = 0;
	while(arguments[x]){
			if(arguments[x] == null){
				arguments[x] = 0;
			}
		x++;
	}
		return `
			<div id="saldos" class="flutuarEsq">
				<table>
					<tr class="cabecalho"><td>Saldo</td><td>Total</td><td>Pendente</td><td>Concluido</td></tr>
					<tr class="par"><td>Crédito</td><td>${BrasilSistemaDecimal(credito)}</td><td>${BrasilSistemaDecimal(credito-concluido)}</td><td>${BrasilSistemaDecimal(concluido)}</td></tr>
					<tr ><td>Débito</td><td>${BrasilSistemaDecimal(debito)}</td><td>${BrasilSistemaDecimal(pendente)}</td><td>${BrasilSistemaDecimal(debito-pendente)}</td></tr>
					<tr class="par"><td>Balanço</td><td>${BrasilSistemaDecimal(credito-debito)}</td><td></td><td></td></tr>
				</table>
			</div>

		`;
	});
	painelSaldo.renderizar("main");
	
	//925,31