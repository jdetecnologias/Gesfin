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
	@media screen and (min-width:641px){
		main{
			width:50%;
			margin-left:25%;
			
		}
	}
	`;
});