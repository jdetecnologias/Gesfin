var seletor = new View();
seletor.setTemplate(function(mes = 0,ano = 2019){
	var meses = getMeses();
	return `
		<div id="seletorMes" class="limparFloat center" mes="${mes}" ano="${ano}">
			<button class="primaria bto dec flutuarEsq">
				<i class="fas fa-arrow-alt-circle-left"></i>
			</button>
			<div class="month flutuarEsq center">
				${meses[mes]} - ${ano}
			</div>
			<button class="bto primaria inc flutuarEsq center">
				<i class="fas fa-arrow-alt-circle-right"></i>
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
	tabela.atualiza([atual+1,ano]);
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
	tabela.atualiza([atual+1,ano]);
	seletor.atualiza([atual,ano]);
});
seletor.defCss(function(){
	
	return `
	@media screen and (max-width:474px){
			#seletorMes{
				width:100%;
				height:50px;
			} 
	}
	@media screen and (min-width:475px){
			#seletorMes{
				width:473px;	
			}			
	}
			#seletorMes{
				margin:5px 0 5px 0;
				height:51px;
			}	
			
			#seletorMes i{
				font-size:26px;
				line-height:40px;
			}
			.month{
				background-color:rgba(255,165,0,1);
				font-family:calibri, sans-serif, arial;		
				font-weight:800;
				font-size:22px;
				line-height:50px;
				width:80%;
				height:50px;
			}
			.dec {
				cursor:pointer;
				width:10%;
				height:50px;
			}
			.inc{
				cursor:pointer;
				width:10%;
				height:50px;
			}

	`;

});