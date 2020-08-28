var tbody = document.querySelector('table tbody');

function Cadastrar() {
	var _texto = document.querySelector('#texto').value;
	var _proxEtapaId = document.querySelector('#proxEtapaId').value;
	var _tipo = document.querySelector('#tipo').value;
	var _respostas = document.querySelector('#respostas').value;

	var etapa = {
		texto: _texto,
		proxEtapaId: Number(_proxEtapaId),
		tipo: Number(_tipo),
		respostas: [],
	}

	fazerPost(etapa)
	$('#myModal').modal('hide')
}

function Cancelar() {
	var btnSalvar = document.querySelector('#btnSalvar');
	var btnCancelar = document.querySelector('#btnCancelar');

	btnSalvar.textContent = 'Cadastrar';
	btnCancelar.textContent = 'Limpar';
}


function carregaEtapas(metodo, id, corpo) {
	tbody.innerHTML = '';

	var xhr = new XMLHttpRequest();

	if (id === undefined || id === 0) { id = ''; }

	xhr.open(metodo, `https://localhost:44314/api/Etapas/${id}`, true);

	xhr.onload = function () {
		var etapas = JSON.parse(this.responseText);
		for (indice in etapas) {
			imprimeEtapa(etapas[indice])
		}
	}
	xhr.send();
}

function fazerPost(corpo) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", `https://localhost:44314/api/Etapas`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(corpo));
}

carregaEtapas('GET');

function ediatar(id) {

	console.log(id);
}

function imprimeEtapa(etapa) {

	var trow = `<tr>
							<td>${etapa.texto}</td>
							<td>${etapa.proxEtapaId}</td>
							<td>${etapa.tipo}</td>
							<td>${etapa.respostas}</td>
							<td><button type="button" class="btn btn-warning" onclick='editarEstudante(${JSON.stringify(etapa)})'>Editar</button></td>
					    </tr>
					   `
	tbody.innerHTML += trow;
}
