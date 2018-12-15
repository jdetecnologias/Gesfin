function View() {
  this.template = null;
  this.seletorString = null;
  this.seletorPai = null;
  this.geradorView = null;
  this.html = null;
  this.fontes = [];
  this.eventos = [];
  this.me = null;
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

View.prototype.getFragment = function() {
  return document.createRange().createContextualFragment(this.html);
}

View.prototype.autoRenderize = function() {
  
 this.fontes.forEach(temp=>{
 temp.renderizar(this.seletorString,false);
   
 });
 
  
}
View.prototype.setSeletor = function(seletor) {
  this.seletorString = seletor;
  this.seletorPai = document.querySelector(this.seletorString);
 
  return this.seletorPai;

}

View.prototype.getSeletor = function(seletor) {
  return document.querySelector(seletor);
}

View.prototype.renderizar = function(seletor, tipo = null, view = null) {
  var sel;
 if(typeof seletor === 'string'){
    sel = this.setSeletor(seletor);
  }
 else{
    sel = this.seletorPai;
 }
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
 
  return this;
}

View.prototype.startEvent = function() {
    this.eventos.forEach(item=>{
      var elementoToEvent = this.seletorPai.querySelectorAll(item.el);
      Array.prototype.forEach.call(elementoToEvent,it=>{
          it.addEventListener(item.evento, function(e){ 
            item.func.call(this,e);
          });
      });
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
    this.startEvent();
  }
}

View.prototype.setEvento = function(element, evento, fn) { // adiciona evento mas não inicia
  if (typeof fn == "function") {    
    var objectEvent = {el:element,evento:evento,func:fn};
    this.eventos.push(objectEvent);
  }
}

View.prototype.atualizaTemplate = function(argumentos) {
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
    this.renderizar(this.seletorString,null,null);
    this.startEvent();
}

View.prototype.link = function(anterior){
 anterior.seletorPai.replaceChild(this.getFragment(),anterior.me);
}
View.prototype.cp = function(){
	return this.getFragment();
}

