	function getMeses(){
		return ["Janeiro","fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
	}
	function converterData(data){
		if(data){
		var array = data.split("-");
		return array[2]+"/"+array[1]+"/"+array[0];
		}else{
			return "";
		}
	}
	
function BrasilSistemaDecimal(valor){
	
	if(valor && typeof valor == "number"){
		return "R$ "+valor.toFixed(2).replace(".",",");
	}
	else {
		
		return valor;
	}
}

function $(string){

			var ele = document.querySelectorAll(string);
	
		if(ele.length > 1){
			return ele;
		}
		else if(ele.length == 1){
			return ele[0];
		}
		else{
			return false;
		}
}

function fazer(string){
	var elementos = $(string);
	return elementos;
}