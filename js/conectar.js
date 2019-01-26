function Conectar(){
	this.ajax = new XMLHttpRequest();
	this.dados = "";
	this.resposta = null;
	this.reqDone = false;
}
Conectar.prototype.defDados = function(dados){ // dados em objeto
	this.dados = dados;
}	
Conectar.prototype.post = function(url,functionCallback){ // dados em objeto
	var xhr = this.ajax;
	conection = this;
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
       if(xhr.status == 200 || xhr.status == 304){
		   conection.resposta = xhr.responseText;
		   conection.reqDone = true;
		   functionCallback();
       }
      }
     }
 	  	xhr.open("post",url,false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(this.dados); 
}

Conectar.prototype.get = function(url,functionCallback){ // dados em objeto
	var xhr = this.ajax;
	conection = this;
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
       if(xhr.status == 200 || xhr.status == 304){
		   conection.resposta = xhr.responseText;
		   conection.reqDone = true;
		   functionCallback();
       }
      }
     }
 	  	xhr.open("get",url,false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(this.dados); 
}
Conectar.prototype.abrirCon = function(url,functionCallback){
	var xhr = this.ajax;
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
       if(xhr.status == 200 || xhr.status == 304){
		   functionCallback();
       }
      }
     }
  xhr.open(verbo,url,false);
  xhr.send();
}

Conectar.prototype.PegarDadosFormulario = function(elemento){
	var elForm = ["input","select","textarea"];
	var qtdFilhos = elemento.children.length;
	for(var i = 0; i<qtdFilhos; i++){
		
		for(var z=0;z<elForm.length;z++){
		
			if(elemento.children[i].localName == elForm[z]){
				this.dados += elemento.children[i].getAttribute("id")+"="+elemento.children[i].value+"&";
				console.log(this.dados);
			}
			
		}
		qtdFilhosDoFilho = elemento.children[i].children.length;
		if( qtdFilhosDoFilho == 0){
			
		}
		else{
			for(var a = 0;a<qtdFilhosDoFilho;a++){
				this.PegarDadosFormulario( elemento.children[i]);
			}
		}
	}
	return this.dados;
}




