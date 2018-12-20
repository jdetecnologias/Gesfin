
window.onload = function(){
container.renderizar("body");
topo.renderizar("#container");
main.renderizar("#container");
abas.renderizar("main").adicionarEvento(".abaMes","click",function(){
		var indice = abas.seletorPai.querySelector(".activeAba").getAttribute("indice");
		abas.seletorPai.getElementsByClassName("activeAba")[0].classList.remove("activeAba");
		tabela.atualiza([parseInt(this.getAttribute("indice"))+1]);
	});
menuTipoExtrato.renderizar("main").adicionarEvento("button","click",function(){
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
menuPrincipal.renderizar("main");
painelSaldo.renderizar("main");
	tabela.renderizar("main").adicionarEvento("td input","change",function(){
		var Con = new Conectar();
				$coluna = this.parentNode.getAttribute("coluna");
				$item = this.value;
				$id = this.parentNode.parentNode.getAttribute("id");
				Con.defDados("coluna="+$coluna+"&item="+$item+"&id="+$id);
			Con.post("./sys/SalvarItem.php",function(){
			});
					tabela.atualiza([tabela.mes]);
		
	});

		botaoAddConta.renderizar("main").adicionarEvento("#addConta","click",function(){
		formCad.renderizar("body");
		formCad.startEvent();
	});
}