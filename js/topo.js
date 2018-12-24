	var topo = new View();
	topo.setTemplate(function(){
		return `
			<header class="limparFloat">
				<button class="hamb flutuarEsq">Menu</button>
				<div id="logo" class="flutuarEsq center">GFO - Gerenciador Financeiro Online</div>
			</header>
		`;
	});
	
topo.setEvento("button","click",function(){
	var MenuPrincipal = document.querySelector("#menuPrincipal");
	var p = getComputedStyle(MenuPrincipal).display
	if(p == "none"){
		MenuPrincipal.style.display = "block";
	}
	else if(p == "block"){
		MenuPrincipal.style.display = "none";
	}
});

