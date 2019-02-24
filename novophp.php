<?php 
$name = './data/arquivo.txt';
$text = 'Olá. Eu sou Goku';
$file = fopen($name, 'a');
fwrite($file, $text);

 ?>
 