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
		@media screen and (min-width:641px){
			#filtro{
				height:40px;
				width:40%;
				
			}
			#filtro input{
				margin:5px;
				height:30px;
				width:100%;
				
			}
		}
		@media screen and (max-width:640px){
			#filtro{
				margin:5%;
				height:40px;
				width:90%;
				
			}
			#filtro input{
				margin:5px;
				height:30px;
				width:100%;
				
			}
		}
	`;
});


