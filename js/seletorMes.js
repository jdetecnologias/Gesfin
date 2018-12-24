var seletor = new View();
seletor.setTemplate(function(mes = 0,ano = 2019){
	var meses = getMeses();
	return `
		<div id="seletorMes" class="limparFloat center" mes="${mes}" ano="${ano}">
			<button class="dec flutuarEsq">
				<
			</button>
			<div class="month flutuarEsq center">
				${meses[mes]}, ${ano}
			</div>
			<button class="inc flutuarEsq center">
				>
			</button>
		
		</div>
	`;
});
seletor.setEvento(".inc","click",function(){
	var mes = parseInt(this.parentNode.getAttribute("mes"));
	var ano = parseInt(this.parentNode.getAttribute("ano"));
	var atual = mes+1;
	if(atual>11){
		atual = 0;
		ano++;
	}
	tabela.atualiza([atual+1]);
	seletor.atualiza([atual,ano]);
});
seletor.setEvento(".dec","click",function(){
	var mes = parseInt(this.parentNode.getAttribute("mes"));
	var ano = parseInt(this.parentNode.getAttribute("ano"));
	var atual = mes-1;
	if(atual<0){
		atual = 11;
		ano--;
	}
	tabela.atualiza([atual+1]);
	seletor.atualiza([atual,ano]);
});
seletor.defCss(function(){
	
	return `
	@media screen and (max-width:640px){
			#seletorMes{
				width:100%;
				height:50px;
			}
			
			.month{
				line-height:50px;
				width:80%;
				height:50px;
			}
			.dec {
				line-height:50px;
				width:10%;
				height:50px;
			}
			.inc{
				line-height:50px;
				width:10%;
				height:50px;
			}
	}
		@media screen and (min-width:641px){
			#seletorMes{
				display:none;
			}
			
	}
	`;

});