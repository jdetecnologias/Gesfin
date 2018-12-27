	var topo = new View();
	topo.setTemplate(function(){
		return `
			<header class="limparFloat">
				<span id="hambMenu" class="hamb flutuarEsq fas fa-bars center"></span>
				<div id="logo" class="flutuarEsq center">GFO</div>
				<a href="./sys/logout.php"><i id="sair" class="flutuarEsq fas fa-sign-out-alt"></i></a>
			</header>
		`;
	});
	//op
topo.setEvento("span.hamb","click",function(){
	var MenuPrincipal = document.querySelector("#menuPrincipal");
	var p = getComputedStyle(MenuPrincipal).display
	if(p == "none"){
		MenuPrincipal.style.display = "block";
	}
	else if(p == "block"){
		MenuPrincipal.style.display = "none";
	}
});
topo.defCss(function(){
	return `
	
		i#sair{
			position:absolute;
			right:5px;
			line-height:50px;
			font-size:30px;
		}
		header a{
			color:white;

		}
		header{
			color:white;
			line-height:50px;
			height:50px;
			background-color:red;
			font-family:calibri,sans-serif;
			font-weight:800;
			font-size:30px;
		}
		header span#hambMenu {
			position:absolute;
			left:5px;
			line-height:50px;
			font-size:30px;
			color:white;
			
		}
		header #logo {
			width:100%;
		
		}
	`;
});

