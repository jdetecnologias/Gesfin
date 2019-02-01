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
			<div id="saldos" class="limparFloat">
				<table>
					<tr class="cabecalho"><td>Crédito</td><td>Total</td><td>Pendente</td><td>Concluido</td></tr>
					<tr class="par"><td>Crédito</td><td>${BrasilSistemaDecimal(credito)}</td><td>${BrasilSistemaDecimal((credito-concluido))}</td><td>${BrasilSistemaDecimal(concluido)}</td></tr>
					<tr><td>Débito</td><td>${BrasilSistemaDecimal(debito)}</td><td>${BrasilSistemaDecimal(pendente)}</td><td>${BrasilSistemaDecimal((debito-pendente))}</td></tr>
					<tr class="par"><td>Balanço</td><td>${BrasilSistemaDecimal((credito-debito))}</td><td></td><td></td></tr>
				</table>
			</div>

		`;
	});

	painelSaldo.defCss(function(){
		
		
		return `	#saldos {
					margin:5px 0 0 5px;
					
					width:100%;
					border:0;					
					font-family: Calibri, sans-serif;
					}
					@media screen and (max-width:474px){
					#saldos table{
						padding-top:5px;
						margin-left:3%;
						margin-right:3%;
						width:94%;
						text-align:center;
						border-spacing:0;
						}
					}
					@media screen and (min-width:475px){
					#saldos table{
						padding-top:5px;
						margin-left:18px;
						margin-right:18px;
						width:436px;
						text-align:center;
						border-spacing:0;
						}
					}
					#saldos table td {
					margin:0;
					border:0;
					}`
				;
				
	});

	
	//925,31