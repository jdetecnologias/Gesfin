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
					<tr class="cabecalho"><td>Crédito</td><td>Total</td><td>Pendente</td><td>Concluido</td></tr>
					<tr class="par"><td>Crédito</td><td>${credito}</td><td>${(credito-concluido).toFixed(2)}</td><td>${concluido}</td></tr>
					<tr><td>Débito</td><td>${debito}</td><td>${pendente}</td><td>${(debito-pendente).toFixed(2)}</td></tr>
					<tr class="par"><td>Balanço</td><td>${(credito-debito).toFixed(2)}</td><td></td><td></td></tr>
				</table>
			</div>

		`;
	});

	painelSaldo.defCss(function(){
		
		
		return `	#saldos {
					margin-left:10px;
					width:40%;
					border-radius:5px;
					border:0;
					font-family:calibri;
					font-size:14px;
					font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
					font-size:12px;
					}
					#saldos table{
					text-align:center;
					border-spacing:0;
					}
					#saldos table td {
					width:27%;
					margin:0;
					border:0;
					}`
				;
				
	});

	
	//925,31