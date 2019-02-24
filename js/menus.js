var menuTipoExtrato = new View();
menuTipoExtrato.setTemplate(function(){
	return `
		<section id="tipoExtrato" class="flutuarEsq">
			<button id="planilha" class="flutuarEsq">
				Planilha
			</button>
			<button id="Textrato" class="flutuarEsq">
				Extrato
			</button>
		</section>
	`;
});

menuTipoExtrato.setEvento("button","click",function(){
	var tipo = this.getAttribute("id");
	switch(tipo){
		case "planilha":
			tabela.mudarConteudo(extrato);
		break;
		case "Textrato":
			extrato.mudarConteudo(tabela);
		break;
	}
});
menuTipoExtrato.defCss(function(){
	return `
			#tipoExtrato{
				color:grey;
				margin-top:50px;
				height:40px;
				
			}
			#tipoExtrato button {
				box-shadow:0px 0px 0px 0 rgba(0,0,0,0.4);
				text-align:center;
				line-height:40px;
				background-color:rgba(173,216,230,0.9);
				padding:0;
				height:40px;
				width:95px;
				margin-left:1px;
			}
	`;
	
});

var menuPrincipal = new View();
menuPrincipal.setTemplate(function(){
	return `
		<section id="menuPrincipal" class="limparFloat">
			
			<div class="Pmenu">
				<ul>
					<li class="center">Menu</li>
					<li><a href="inicio.php">Painel de contas</a></li>
					<li><a href="reply.php">Copiar/Recortar Contas</a></li>
					<li id="avulsos"><a href="avulsos.php">Lançar avulsos</a></li>
					<li>Bancos</li>
					
				</ul>
			</div>
		</section>
	`;
});
menuPrincipal.defCss(function(){
	return `
	@media screen and (min-width:641px){

			.hamb{
				display:block;
				height:30px;
				width:30px;

			}
		#menuPrincipal{
			display:none;
			z-index:99;
			overflow:hidden;
			background-color:rgba(255,165,0,1);
			top:50px;
			width:30%;
			height:100%;
			position:absolute;

		}

		ul li {
			cursor:pointer;
			font-family:sans-serif;
			font-weight:500;
			padding-left:20px;
			line-height:35px;
			width:94%;
			border:1px solid white;
			list-style-type:none;
			min-height:35px;
			}
		.Pmenu{
			
			height:100%;
			width:100%;
			position:absolute;
			font-size:20px;
			border-right:2px solid lightblue;
		}
	}
	@media screen and (max-width:640px){
			body,container{
				width:100%;
			}
			.hamb{
				display:block;
				height:30px;
				width:30px;

			}
		#menuPrincipal{
			display:none;
			background-color:rgba(255,165,0,0.8);
			top:50px;
			width:90%;
			height:100%;
			position:absolute;

		}
		main{
			width:100%;
		}
		ul li {
			cursor:pointer;
			font-family:sans-serif;
			font-weight:500;
			padding-left:20px;
			line-height:35px;
			width:94%;
			border:1px solid white;
			list-style-type:none;
			min-height:35px;
			}
		.Pmenu{
			height:100%;
			width:100%;
			position:absolute;
			font-size:20px;
			border-right:2px solid lightblue;
		}
	}
	`;	
});


