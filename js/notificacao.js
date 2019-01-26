var notify = new View();

var c = new Conectar();
c.post("./sys/notificacao.php",function(){
	
});
var arr = JSON.parse(c.resposta);
notify.setTemplate(function(qtd = false){
	return `<div id="notificacao">
	<i class="fas fa-exclamation-circle"></i>
				
			</div>`;
});