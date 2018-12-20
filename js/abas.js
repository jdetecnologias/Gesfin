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
	