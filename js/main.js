var main = new View();
main.setTemplate(function(){
	return `
		<main>
		
		</main>
	`;
});

main.tela(avulsos);
main.defCss(function(){
	return `
	@media screen and (min-width:475px){
		main{
		position:absolute;
		top:50px;
		left:-50%;
		margin-left:100%;
		}
	}
		@media screen and (max-width:474px){
		main{
	
		width:100%;
		}
	}
	`;
});