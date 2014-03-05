	
$(document).on("mobileinit", function() {
$.mobile.defaultPageTransition = "slide";
});
// Evento para la primera carga de la página	
$(document).ready(function(event){
	if ($("#myslides").length) {
		$("#myslides").cycle({
		fit: 1,pause:2, timeout:4000
		});
	}
	restaurante($("#current-lang").val());
	$(document).on('pageshow', function(){ 
	restaurante();
	});

});
/*
$(document).bind('pageload', function(){
alert("load");
	restaurante();
});
*/

function restaurante(){
	if(window.location.href.indexOf("detalle") != -1)
	{
		aux1=(window.location.href.substr(window.location.href.indexOf('id=')+3));
		if (aux1.indexOf("&") != -1){
			aux1=aux1.substr(0,aux1.indexOf("&"))
			obtenerDetalle(aux1);
		}
		if(window.location.href.indexOf("tipo") != -1){
			aux3=window.location.href.substr(window.location.href.indexOf('tipo=')+5);
			if (aux3.indexOf("&") != -1){
				aux3=aux3.substr(0,aux3.indexOf("&"));
				}
			$("#link-recomended").attr("href", "listado.html?recomendado&tipo=" + aux3);
			$("#link-back").attr("href", "listado.html?tipo=" + aux3);
		}
		
	}
	
	else
	{
		if(window.location.href.indexOf("listado") != -1){
			aux2=(window.location.href.substr(window.location.href.indexOf('tipo=')+5));
			if (aux2.indexOf("&") != -1)
			{
				aux2=aux2.substr(0,aux2.indexOf("&"));
			}
			if(window.location.href.indexOf("recomendado") != -1){
				obtenerRecomendado(aux2);
			}
			else{
				
				obtenerListado(aux2);
			}
		}	
		else
		{
			//obtenerListado("Pintxo");
		}
	}


}
	
function obtenerListado(tipo){
	var parametros = {
	"tipo" : tipo,
	"lang" : $("#current-lang").val()
	};

	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/bartolo2/inc/ObtenerListadoPintxos.php',
		type: 'get',
		beforeSend: function () {
			//$("#resultado").html("Procesando, espere por favor..."); para introducir en el futuro el gif de cargando
		},
		success: function ProcesarRespuesta(ajaxResponse) {
			if (typeof ajaxResponse == "string"){
				var pintxos  = $.parseJSON(ajaxResponse);
			}
			if (!pintxos)
			{
				// no se encontraron registros :(
				return;
			} 
			// Recuperamos el elemento donde se van a postear el listado de los pintxos
		
			// ahora, para cada pintxo
			var pintxo;
			if (tipo=="Racion") $("#listadoPintxos").html("<li data-role='list-divider' class='gradiente' style=''> <h1 style='color:white;' class='title'>" + tipo + "es Casa Bartolo</h1>  ");
			else $("#listadoPintxos").html("<li data-role='list-divider' class='gradiente' style=''> <h1 style='color:white;' class='title'>" + tipo + "s Casa Bartolo</h1>  ");
			
			for (var idx in pintxos)
			{
				pintxo = pintxos[idx];
				$("#listadoPintxos").append(
				"<li><a href='detalle.html?id=" + pintxo.id + "&tipo=" + tipo + "'>"+
				"<img src='../img/listado/" + pintxo.srcimg + "'>" +
				"<h2>" + pintxo.alias + "</h2>" +
				"<p>" + pintxo.ingredientes + "</p>" +
				"</a></li>").listview("refresh"); 
			} 
					
		}
	});
}

function obtenerDetalle(id){
	var parametros = {
	"id" : id,
	"lang" : $("#current-lang").val()
	};
	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/bartolo2/inc/ObtenerDetallePintxo.php',
		type: 'get',
		beforeSend: function () {
			//$("#resultado").html("Procesando, espere por favor..."); para introducir en el futuro el gif de cargando
		},
		success: function ProcesarRespuesta(ajaxResponse) {
			if (typeof ajaxResponse == "string"){
				var pintxo  = $.parseJSON(ajaxResponse);
			}
			if (!pintxo)
			{
			alert("no se ha encontrado el pintxo");
				// no se encontraron registros :(
				return;
			}
			
			$("#image_principal_pintxo").html("<img width='100%' src='../img/detalle/" + pintxo.srcimg +"'>");
			$("#title_pintxo").html(pintxo.alias);
			$("#info_pintxo").html(pintxo.ingredientes);
			// hay que poner un retardo porque si no en la recarga hay veces que el evento se hace dos veces.
			
			if(window.location.href.indexOf("detallepintxo") != -1)
			{
				setTimeout(function(){
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "#detalle", { dataUrl: "detallepintxo&id=" + pintxo.id + "&tipo=" + pintxo.tipo } );
				},800);
			}
			else
			{
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#detalle", { dataUrl: "detallepintxo&id=" + pintxo.id + "&tipo=" + pintxo.tipo } );
			}
					
		}
	});
}



function obtenerRecomendado(tipo){
	var parametros = {
	"tipo" : tipo,
	"lang" : $("#current-lang").val()
	};
	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/bartolo2/inc/ObtenerPintxosRecomendados.php',
		type: 'get',
		beforeSend: function () {
			//$("#resultado").html("Procesando, espere por favor..."); para introducir en el futuro el gif de cargando
		},
		success: function ProcesarRespuesta(ajaxResponse) {
			if (typeof ajaxResponse == "string"){
				var pintxos  = $.parseJSON(ajaxResponse);
			}
			if (!pintxos)
			{
				// no se encontraron registros :(
				return;
			} 
			// ahora, para cada pintxo
			var pintxo;
			if (tipo=="Racion") 
			{
				$("#listadoPintxos").html("<li data-role='list-divider' class='gradiente' style=''> <h1 style='color:white;' class='title'>" + tipo + "es Casa Bartolo</h1>  ");
			}
			else 
			{
				$("#listadoPintxos").html("<li data-role='list-divider' class='gradiente' style=''> <h1 style='color:white;' class='title'>" + tipo + "s Casa Bartolo</h1>  ");
			}
			for (var idx in pintxos)
			{
				pintxo = pintxos[idx];
				$("#listadoPintxos").append(
				"<li><a href='detalle.html?id=" + pintxo.id + "&tipo=" + tipo + "'>"+
				"<img src='../img/listado/" + pintxo.srcimg + "'>" +
				"<h2>" + pintxo.alias + "</h2>" +
				"<p>" + pintxo.ingredientes + "</p>" +
				"</a></li>").listview("refresh"); 
			} 		
		}
	});
}


