var filtro = new View();
filtro.setTemplate(function(){
	return `
			<div id="filtro">
				<input type="text" id="textoFiltro" placeholder="Filtrar Contas"/>
			</div>
	`;
});

filtro.setEvento("#textoFiltro","keyup",function(){
		var txt = this.value;

		var ret = [];
		tabela.dados.map(itm=>{
			console.log(itm.descricao);
			
			if( itm.status.toLowerCase().match(txt.toLowerCase()) != null || NullToString(itm.descricao).toLowerCase().match(txt.toLowerCase()) != null || itm.tipo.toLowerCase().match(txt.toLowerCase()) != null){
				
				ret.push(itm);
			}
		});
		tabela.atualiza([false,false,ret]);
		
});

filtro.defCss(function(){
	return `
			@media screen and (min-width:475px){
				#filtro input{
				margin:0 0 0 50px;	
				width:360px;
			}
			}
		@media screen and (max-width:474px){
				#filtro input{
				margin:0 0 0 10%;
				width:80%;
				}
			}
		
			#filtro{
				margin:5px 5px 0 0;
				height:40px;
				width:100%;
				
			}
			#filtro input{
				
				height:30px;
				
			}
	
	`;
});


