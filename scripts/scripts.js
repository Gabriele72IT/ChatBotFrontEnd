var tbody = document.querySelector('table tbody');

function Cadastrar() {

	var obj;
	var _texto = document.querySelector('#texto').value;
	var _tipo = $('input[name=tipo]:checked').val();
	if(_tipo === "0"){

		var respostaText1 = document.querySelector('#respostaText1').value;
		var proxEtapaResposta1 = document.querySelector('#proxEtapaResposta1').value;

		var _resposta1 = {
			legenda: respostaText1,
			proxEtapaId: proxEtapaResposta1
		}

		var respostaText2 = document.querySelector('#respostaText2').value;
		var proxEtapaResposta2 = document.querySelector('#proxEtapaResposta2').value;

		var _resposta2 = {
			legenda: respostaText2,
			proxEtapaId: proxEtapaResposta2			
		}
	
		obj = {
			texto: _texto,
			tipo: Number(_tipo),
			respostas: [ 
				_resposta1,
				_resposta2],
		}
	}else{
		var _proxEtapaId = document.querySelector('#proxEtapaId').value;
		
		obj = {
			texto: _texto,
			proxEtapaId: Number(_proxEtapaId),
			tipo: Number(_tipo),
			respostas: [],
		}
	}	
	fazerPost(obj)
	$('#myModal').modal('hide')
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
carregaEtapas('GET');

//Controle de Formulario respostas ou perguntas
$('#r11').on('click', function(){
  $(this).parent().find('a').trigger('click')
})

$('#r12').on('click', function(){
  $(this).parent().find('a').trigger('click')
})

function fazerPost(corpo) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", `https://localhost:44314/api/Etapas`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(corpo));
}

function ediatar(id) {

	console.log(id);
}

function imprimeEtapa(etapa) {

	if(etapa.tipo === 0){
		var trow = `<tr>
							<td>${etapa.texto}</td>
							<td>${etapa.proxEtapaId}</td>
							<td>${etapa.id}</td>							
							<td>${etapa.respostas[0].legenda} | ${etapa.respostas[1].legenda}</td>
							<td><button type="button" class="btn btn-warning" onclick='editarEstudante(${JSON.stringify(etapa)})'>Editar</button></td>
					    </tr>
					   `
	tbody.innerHTML += trow;
	}else{
		var trow = `<tr>
							<td>${etapa.texto}</td>
							<td>${etapa.proxEtapaId}</td>
							<td>${etapa.id}</td>							
							<td>${etapa.respostas}</td>
							<td><button type="button" class="btn btn-warning" onclick='editarEstudante(${JSON.stringify(etapa)})'>Editar</button></td>
					    </tr>
					   `
	tbody.innerHTML += trow;
	}
}
