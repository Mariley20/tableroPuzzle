var generar = document.getElementById('ejecutar');
var tablero = document.getElementById('tablero');
var matrizEureka;
var num;

function printMatrix(M) {
    console.log("___________________");
    for (var i = 0; i < M.length; i++)
        console.log(M[i]);
    console.log("___________________");
}

function check(i, j, n) {
    if (i >= 0 && j >= 0 && i < n && j < n)
        return true;
    return false;
}

function randInt(n) {
    return Math.floor(Math.random() * n);
}

function gen_heuristic(n) {
    var M = initMatrix(n);
    var p = 1;
    while (p <= n / 2 + 1) {
        for (var i = p - 1; i <= n - p; i++) {
            M[p - 1][i] = p;
            M[i][p - 1] = p;
            M[i][n - p] = p;
            M[n - p][i] = p;
        }
        p++;
    }
    M[0][0] = 0;
    M[0][n - 1] = 0;
    M[n - 1][0] = 0;
    M[n - 1][n - 1] = 0;
    return M;
}


function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};

function use_helper(soluciones, helper) {
    var pos = -1;
    var min = 10000;
    soluciones = shuffleArray(soluciones);
    for (var i = 0; i < soluciones.length; i++) {
        var x = soluciones[i].x;
        var y = soluciones[i].y;
        if (helper[x][y] < min) {
            min = helper[x][y];
            pos = i;
        }
    }
    return pos;
}

function gen_solution(M, helper, n) {
    var mov_x = [-2, -1, +1, +2, +2, +1, -1, -2];
    var mov_y = [-1, -2, -2, -1, +1, +2, +2, +1];
    var step = 1;
    var x = 0;
    var y = 0;

    M[x][y] = step;
    while (true) {
        if (step == n * n) {
            console.log('eureka!!!');
            return true;
        }
        var soluciones = [];
        for (var index = 0; index < mov_x.length; index++) {
            var i = x + mov_x[index];
            var j = y + mov_y[index];
            if (check(i, j, n) && M[i][j] == 0) {
                soluciones.push({
                    x: i,
                    y: j
                });
            }
        }
        if (soluciones.length == 0) {
            console.log("fail!!");
            break;
        }
        var idx = use_helper(soluciones, helper);
        x = soluciones[idx].x;
        y = soluciones[idx].y;
        step++;
        M[x][y] = step;
        //console.log ("step: " + step);

    }
    return false;
}


function initMatrix(n) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
        var fila = [];
        for (var j = 0; j < n; j++) {
            fila[j] = 0;
        }
        matrix[i] = fila;
    }
    return matrix;
}

generar.onclick = function () {
    contador = 0;
    tablero.innerHTML = '';
    var n = parseInt(document.getElementById('lados').value);
    num = n;

    for (var i = 0; i < 1000; i++) {
        var M = initMatrix(n); // crea la matriz llena de  ceros n x n
        var helper = gen_heuristic(n); // genera matriz de posibles movimientos 
        if (gen_solution(M, helper, n)) {
            printMatrix(M);
            break;
        }
    }

    matrizEureka = M;

    var tabla = document.createElement('table');
    tabla.border = "1";
    for (var i = 0; i < n; i++) {
        var fila = document.createElement('tr');
        for (var j = 0; j < n; j++) {
            var celda = document.createElement('td');
            celda.setAttribute('id', i + '' + j);
            if (i % 2 == 0 && j % 2 != 0 || i % 2 != 0 && j % 2 == 0) {
                celda.setAttribute('class', 'negro');
            }
            var text = document.createTextNode(M[i][j]);
            celda.appendChild(text);

            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tablero.appendChild(tabla);
}

var btnPasoAPaso = document.getElementById('pasoApaso');
contador = 0;

btnPasoAPaso.onclick = function () {
    var celdasTablero = document.getElementsByTagName('td');
    if (contador == 0) {
        for (var i = 0; i < celdasTablero.length; i++) {
            //var x = celdasTablero[i].id;
            celdasTablero[i].textContent = "";
        }
    }
    contador++;
    if (contador <= (Math.pow(matrizEureka.length, 2))) {
        for (var i in matrizEureka) {
            var j = matrizEureka[i].indexOf(contador);
            if (j != -1) {
                var ids = i + "" + j;
                var movida = matrizEureka[i][j];
            }
        }
        document.getElementById(ids).innerHTML = movida;
    } else {
        alert("ya no hay mas movidas")
        contador = 0;
    }
}

btnSigSolucion = document.getElementById('sig_Solucion');
btnSigSolucion.onclick = function(){
    generar();
}