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
	abas.setEvento(".abaMes","click",function(){
		var indice = abas.seletorPai.querySelector(".activeAba").getAttribute("indice");
		abas.seletorPai.getElementsByClassName("activeAba")[0].classList.remove("activeAba");
		tabela.atualiza([parseInt(this.getAttribute("indice"))+1]);
	});
	abas.defCss(function(){
		return `
			@media screen and (max-width:640px){
				#abas{
					display:none;
				}
			}
			
		`;
	});
	