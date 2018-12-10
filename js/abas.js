		var abas = new View();
	abas.setTemplate(function(){
		var meses = getMeses();
		var html = `<div id="abas" class="limparFloat">`;
					
		meses.map((item,key)=>{
			html += `<a href='#'><div indice=${key} class="abaMes">${item}</div></a>\n`;
		});
		html += `</div>`;
		return html;
	});
	abas.renderizar("main").adicionarEvento(".abaMes","click",function(){
		var indice = abas.seletorPai.querySelector(".activeAba").getAttribute("indice");
		abas.seletorPai.getElementsByClassName("activeAba")[0].classList.remove("activeAba");
		tabela.atualiza([parseInt(this.getAttribute("indice"))+1]);
	});