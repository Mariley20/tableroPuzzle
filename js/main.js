var btnAgregar = document.getElementById('dibujaTabla');
btnAgregar.onclick = function(){
	var numLados = parseFloat(document.getElementById('n_Lados').value);
	//var table = document.createElement('table')

	for(var i = 0; i < parseInt(numLados); i++){
		var tagTR = document.createElement("tr");
		for (var j = 0; j < parseInt(numLados); j++) {
			var tagTD = document.createElement("td");
			//tagTD.border = "1";
			var textContent = document.createTextNode(j) //
			tagTD.appendChild(textContent);
			tagTR.appendChild(tagTD);
		}
		//table.appendChild(tagTR);
		tablero.appendChild(tagTR);
	}
	
	tablero1.innerHTML = crearTablero(numLados);

} 


function crearTablero(num){
	html = "<tr>";
	for(var i = 0; i < num; i++){
		for (var j = 0; j < num; j++){
			html += "<td>"+i+"</td>";
		}
		html += "</tr><tr>";
	}
	return html;
}