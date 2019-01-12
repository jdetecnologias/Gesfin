var control = new View();
control.setTemplate(function(){
	return `
		<section id="controles" class="limparFloat">
			<i class="fas fa-exchange-alt"></i>
			<i class="fas fa-reply-all"></i>
			<i class="fas fa-reply"></i>
		</section>
	`;
	
});

control.defCss(function(){
	return `
		@media screen and (max-width:640px){
			width:100%;
			
			
		}
			
		@media screen and (max-width:640px){
			width:40%;
			
			
		}
			#controles{
				height:35px;
				line-height:35px;
			}
			#controles i{
			width:30px;
			cursor:pointer;
			}
		
		`;
});