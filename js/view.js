function View() {
  this.nome = null;
  this.alterna = false;
  this.houveReplace = false;
  this.indice = null;
  this.template = null;
  this.seletorString = null;
  this.seletorPai = null;
  this.geradorView = null;
  this.html = null;
  this.fontes = [];
  this.eventos = [];
  this.me = null;
  this.css = {codigo:null,cssNode:null}
  this.trigger = null;
  this.render = false;
  this.telas  = {
					atual:0,
					telas:[],
					go: 		function(view){
					view.telas.atual += 1;
					view.me.replaceChild(this.telas[(view.telas.atual-1)].template,view.me.children[0]);
					view.telas.telas[(view.telas.atual-1)].startEvent();
					view.houveReplace = true;
					}
				};
}

View.prototype.setTemplate = function(fn,argumentos = null) {
    if(typeof fn === 'function'){
      this.geradorView = fn;
      this.html = this.geradorView.apply(this.geradorView,argumentos);
      this.fontes[0] = this;
      this.template = this.getFragment();
    }
}

View.prototype.atualizarEventos = function() {
 this.fontes.forEach(item=>{
    if(view.eventos.length> 0){
   item.startEvent();
    }
 });   
}

View.prototype.getFragment = function(codigo = false) {
	if(codigo){
		return document.createRange().createContextualFragment(codigo);
	}
	else{
		return document.createRange().createContextualFragment(this.html);
	}
}

View.prototype.autoRenderize = function() {
  
 this.fontes.forEach(temp=>{
 temp.renderizar(this.seletorString,false);
   
 });
 
  
}
View.prototype.setSeletor = function(seletor) {
	if(typeof seletor == "string"){
		this.seletorString = seletor;
		this.seletorPai = document.querySelector(this.seletorString);
	}
	else if(typeof seletor == "object"){
		this.seletorString = seletor.nodeName.toLowerCase()+"#"+seletor.getAttribute("id");
		this.seletorPai = seletor;
	}
	return this.seletorPai;
}

View.prototype.getSeletor = function(seletor) {
  return document.querySelector(seletor);
}

View.prototype.renderizar = function(seletor, tipo = null, view = null) {
	
  var sel;
 sel = this.setSeletor(seletor);
  var append;
  if(view != null){
    this.fontes.push(view);
    view.renderizar(this.seletorString,false);
  }
  else{
  if(this.indice == null){
    this.appendConteudo();
  }
  else{
    this.atualizarConteudo();
  }
  }
  this.me = this.seletorPai.children[this.indice];
	if(this.trigger != null){
		this.trigger();
	}
	this.render = true;
	this.startEvent();
  
  if(this.telas.telas.length > 0){
	  console.log(this.me.firstChild);
	  this.telas.telas.forEach(itm=>{
		 itm.renderizar("#"+this.me.getAttribute("id"));
		 itm.me.classList.add("naoAtivo");
	  });
  }
  return this;
}

View.prototype.startEvent = function() {
    this.eventos.forEach(item=>{
		if(typeof item.el == "object"){
			item.el.addEventListener(item.evento, function(e){ 
					item.func.call(this,e);
				});
		}
		else if(typeof item.el == "string"){
			var elementoToEvent = this.seletorPai.querySelectorAll(item.el);
			Array.prototype.forEach.call(elementoToEvent,it=>{
				it.addEventListener(item.evento, function(e){ 
					item.func.call(this,e);
				});
			});
		}


		
    });
}

View.prototype.appendConteudo = function() {
  this.indice =  this.seletorPai.children.length;
  this.seletorPai.appendChild(this.getFragment());
}
View.prototype.atualizarConteudo = function() {
     this.seletorPai.replaceChild(this.getFragment(),this.seletorPai.children[this.indice]);
}
View.prototype.adicionarEvento = function(element, evento, fn) { // adiciona evento na momento do uso da função
  if (typeof fn == "function") {    
    var objectEvent = {el:element,evento:evento,func:fn};
    this.eventos.push(objectEvent);
	if(this.render){
		this.startEvent();
	}
  }
}

View.prototype.setEvento = function(element, evento, fn) { // adiciona evento mas não inicia
  if (typeof fn == "function") {    
    var objectEvent = {el:element,evento:evento,func:fn};
    this.eventos.push(objectEvent);
  }
}

View.prototype.atualizaTemplate = function(argumentos) {
	this.telas.atual = 0;
    this.setTemplate(this.geradorView,argumentos);
}
View.prototype.removerFilhosdoPai = function(){
	var x = 0;
	while(this.seletorPai.children[x]){
		this.seletorPai.children[x].remove();
		x++;
	}
}
View.prototype.atualiza = function(argumentos) {
    this.atualizaTemplate(argumentos);
	if(this.render){
		this.renderizar(this.seletorString,null,null);
	}
}

View.prototype.mudarConteudo = function(anterior){
		this.indice = anterior.indice;
		this.seletorPai = anterior.seletorPai;
		anterior.seletorPai.replaceChild(this.getFragment(),anterior.seletorPai.children[anterior.indice]);
		this.startEvent();
}
View.prototype.cp = function(){
	return this.html();
}

View.prototype.defCss = function(fn = false){
	if(typeof fn == 'function'){
		if(this.css.codigo == null){
			this.css.codigo = fn();
		}
			var styles = `<style></style>`;
		if(document.querySelector("style")){
			document.querySelector("style").appendChild(this.getFragment(this.css.codigo));
		}
		else{
			document.querySelector("head").appendChild(this.getFragment(styles));
			this.defCss(fn);
		}
	}
}
View.prototype.defTrigger = function(fn){
	this.trigger = fn;
	if(this.render){
		this.trigger();
	}

}

View.prototype.$ = function(string){

		if(this.me){
			
			var ele = this.me.querySelectorAll(string);
		}
		else{
		
			var ele = document.querySelectorAll(string);
		}
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

View.prototype.remover = function(){
	if(this.me){
		this.me.remove();	
		this.indice = null;
	}
}

View.prototype.tela = function(fn,nome) {
	var name;
	var formarTela = function(fn){
		
		var html = `<div id="tela">
						<div>
							<i class="fas fa-arrow-alt-circle-left"></i>
						</div>
						<div>
							${fn}
						</div>
					</div>
		`;
		return html;
		
	}
	if(nome == null){
		name = (this.telas.telas.length+1);
	}
	else{
		name = nome;
	}
	
	
	if(typeof fn == "function"){	
		var tela = new View(); 
		tela.setTemplate(formarTela(fn));
		tela.nome = name;
		this.telas.telas.push(tela);
	}
	else if(typeof fn == "object"){
		fn.nome = name;
		
		fn.geradorView = formarTela;
		
		fn.atualizaTemplate([fn.html]);
		this.telas.telas.push(fn);	
	}

	
}

View.prototype.FecharComponente = function(){
	var _that = this;
	var clicado = false;

	document.addEventListener("click",function(e){
		if(_that.render){
				if(!_that.me.contains(e.target) && !_that.houveReplace){
					_that.me.style.display = "none";
				}
		}
	});
	_that.houveReplace = false;
}

View.prototype.AlternarDisplay = function(view){
	if(view){
	view.alterna = true;
   var disp= getComputedStyle(view.me).display;
   if(disp == "block"){
        view.esconder();
	}
   else if(disp == "none"){
		view.mostrar();
	}
}
}

View.prototype.esconder = function(){
	if(this.render){
		this.me.style.display = "none";
	}
}
View.prototype.mostrar = function(){
	if(this.render){
		this.me.style.display = "block";
	}
}

