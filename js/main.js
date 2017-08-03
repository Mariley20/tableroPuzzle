var btnAgregar = document.getElementById('dibujaTabla');
btnAgregar.onclick = function(){
	var numLados = parseFloat(document.getElementById('n_Lados').value);

	for(var i = 0; i < parseInt(numLados); i++){
		var tagTR = document.createElement("tr");
		for (var j = 0; j < parseInt(numLados); j++) {
			var tagTD = document.createElement("td");
			var textContent = document.createTextNode("reina")
			tagTD.appendChild(textContent);
			tagTR.appendChild(tagTD);
		}
	}
	document.getElementById('tablero').appendChild(tagTR);
	tablero1.innerHTML = crearTablero(numLados);
	
} 
function crearTablero(num){
	html = "<tr>";
	for(var i = 0; i < num; i++){
		for (var j = 0; j < num; j++){
			html += "<td>xx</td>";
		}
		html += "</tr><tr>";
	}
	return html;
}