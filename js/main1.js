function crearTablero(){

var tag_table = document.createElement('table');
  tag_table.border = "1";
  var num_lados = document.getElementById('lados').value;
  for(var i = 0; i < num_lados; i++){
    var tag_tr = document.createElement('tr');
    for (var j = 0; j < num_lados; j++) {
      var tag_td = document.createElement('td');
      if(i%2 == 0 && j%2 != 0 || i%2 != 0 && j%2 == 0){
        tag_td.setAttribute('class','negro');
      }
      tag_tr.appendChild(tag_td);
    }
    tag_table.appendChild(tag_tr);
  }
  tablero.appendChild(tag_table);
}