var notify = new View();

var c = new Conectar();
c.get("http://18.217.144.66/gesfinRest/notificacao",function(){
	console.log(c.responta);
});
var arr = JSON.parse(c.resposta);
notify.setTemplate(function(qtd = false){
	var li = "";
	arr.forEach(itm=>{
		var d = itm.data_venc.split("-");
		if(itm.descricao.length > 10){
			var descricao = itm.descricao.slice(0,10);
		}
		else{
			var descricao = itm.descricao;
		}
		var data_ven = d[2]+"/"+d[1]+"/"+d[0];
		var valor = BrasilSistemaDecimal(itm.valor); 
		li += `<li>${descricao} ${valor} ${data_ven}</li>`;
	});
	return `<div id="notificacao">
				<ul>
					<li>Notificações</li>
					${li}
				</ul>
			</div>`;
});

notify.defCss(function(){
	return `
		#notificacao{
			box-shadow: 1px 1px 1px black;
			display:none;
			font-size:10px;
			position:absolute;
			top:50px;
			right:50px;
			border:1px solid black;
			border-top:0;!important
			heigth:200px;
			background-color:white;
		}
		#notificacao ul li{
			width:100%;
			padding:5px;
			heigth:20px;!important
		}
	`;
});