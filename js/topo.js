	var topo = new View();
	topo.setTemplate(function(){
		return `
			<header class="limparFloat">
				<span class="hamb flutuarEsq fas fa-bars center"></span>
				<div id="logo" class="flutuarEsq center">GFO</div>
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
		header{
			color:white;
			line-height:50px;
			height:50px;
			background-color:red;
		}
		header span {
			padding:15px;
			font-size:18px;
			color:white;
			
		}
		header #logo {
			width:50%;
		}
	`;
});

