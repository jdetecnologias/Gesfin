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
					<tr><td>Crédito</td><td>Total</td><td>Pendente</td><td>Concluido</td></tr>
					<tr><td>Crédito</td><td>${credito}</td><td>${(credito-concluido).toFixed(2)}</td><td>${concluido}</td></tr>
					<tr><td>Débito</td><td>${debito}</td><td>${pendente}</td><td>${(debito-pendente).toFixed(2)}</td></tr>
					<tr><td>Balanço</td><td>${(credito-debito).toFixed(2)}</td><td></td><td></td></tr>
				</table>
			</div>

		`;
	});
	
	painelSaldo.defCss(function(){
		return `
			#saldos table tr {
				height:40px;
			}
		`;
	});
	
	//925,31