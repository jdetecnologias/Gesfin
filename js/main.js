var main = new View();
main.setTemplate(function(){
	return `
		<main>
		
		</main>
	`;
});

main.defCss(function(){
	return `
	@media screen and (min-width:475px){
		main{
		position:absolute;
		margin-left:50%;
		
		width:460px;
		transform:translateX(-50%);
		//margin-left:25%;
		} 
	}
		@media screen and (max-width:474px){
		main{
	
		width:100%;
		}
	}
	`;
});
