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
					<tr class="cabecalho"><td>Cr�dito</td><td>Total</td><td>Pendente</td><td>Concluido</td></tr>
					<tr class="par"><td>Cr�dito</td><td>${credito}</td><td>${(credito-concluido).toFixed(2)}</td><td>${concluido}</td></tr>
					<tr><td>D�bito</td><td>${debito}</td><td>${pendente}</td><td>${(debito-pendente).toFixed(2)}</td></tr>
					<tr class="par"><td>Balan�o</td><td>${(credito-debito).toFixed(2)}</td><td></td><td></td></tr>
				</table>
			</div>

		`;
	});
	

	
	//925,31