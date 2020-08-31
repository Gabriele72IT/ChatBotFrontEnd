var tbody = document.querySelector('table tbody');

function Cadastrar() {

	var obj;
	var _texto = document.querySelector('#texto').value;
	var _tipo = $('input[name=tipo]:checked').val();
	if (_tipo === "0") {

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
	} else {
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
	$("#tabelao").html("");

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
$('#r11').on('click', function () {
	$(this).parent().find('a').trigger('click')
})

$('#r12').on('click', function () {
	$(this).parent().find('a').trigger('click')
})

function fazerPost(corpo) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", `https://localhost:44314/api/Etapas`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(corpo));
}


function imprimeEtapa(etapa) {

	if (etapa.tipo === 0) {
		var trow = `<tr>
							<td>${etapa.texto}</td>
							<td>${etapa.proxEtapaId}</td>
							<td>${etapa.id}</td>							
							<td>${etapa.respostas[0].legenda} | ${etapa.respostas[1].legenda}</td>
							<td><button type="button" class="btn btn-danger" onclick='excluir(${JSON.stringify(etapa.id)})'>Excluir</button></td>
					    </tr>
					   `
		$("#tabelao").append(trow);
	} else {
		var trow = `<tr>
							<td>${etapa.texto}</td>
							<td>${etapa.proxEtapaId}</td>
							<td>${etapa.id}</td>							
							<td> Não Preparadas</td>
							<td><button type="button" class="btn btn-danger" onclick='excluir(${JSON.stringify(etapa.id)})'>Excluir</button></td>
					    </tr>
					   `
		$("#tabelao").append(trow);
	}
}

function excluir(id){
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", `https://localhost:44314/api/Etapas/${id}`, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(true);
	Location.reload()
}

function imprimeNoChat(etapa) {
	var trow
	if (etapa.proxEtapaId != 0) {
		trow = `<tr>
					<td>${etapa.id}</td>
					<td>${etapa.texto}</td>						
				</tr>
				`
		$("#chat").append(trow);
		carregaEtapa(etapa.proxEtapaId)
	} else {
		trow = `<tr>
					<td>${etapa.id}</td>
					<td>${etapa.texto}</td>						
					<td><button type="button" class="btn btn-success" onclick='carregaEtapa(${etapa.respostas[0].proxEtapaId})'>${etapa.respostas[0].legenda} </button></td>
					<td><button type="button" class="btn btn-danger" onclick='carregaEtapa(${etapa.respostas[1].proxEtapaId})'>${etapa.respostas[1].legenda} </button></td>
				</tr>
				 `
		$("#chat").append(trow);
	}
}

function carregaEtapa(id) {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', `https://localhost:44314/api/Etapas/${id}`, true);

	xhr.setRequestHeader('Content-Type', 'application/json');		
	xhr.onreadystatechange = function (oEvent) {  
		if (xhr.readyState === 4) {  
			if (xhr.status === 200) {  

				xhr.onload = function () {
					var etapa = JSON.parse(this.responseText);
					imprimeNoChat(etapa)
				}

			} else {  
			   console.log("Error", xhr.statusText);  
			}  
		} 
		//xhr.send(); 
	}; 
	
	xhr.send(null);  

}

function chatOn(id) {
	$("#chat").html("");
	carregaEtapa(1)

}
