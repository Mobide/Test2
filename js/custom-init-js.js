	
$(document).on("mobileinit", function() {

$.mobile.defaultPageTransition = "slide";
});
// Evento para la primera carga de la página	
$(document).ready(function(event){
	if(window.location.href.indexOf("detallepintxo") != -1)
	{
		aux1=(window.location.href.substr(window.location.href.indexOf('&id=')+4));
		obtenerDetalle(aux1.substr(0,aux1.indexOf("&")));
	}
	else
	{
		if(window.location.href.indexOf("tipo") != -1)
		{
			aux2=(window.location.href.substr(window.location.href.indexOf('&tipo=')+6));
			obtenerListado(aux1.substr(0,aux1.indexOf("&")));
		}
		else
		{
			obtenerListado("Pintxo");
		}
	}

	
	/*if(window.location.href.substr(window.location.href.indexOf('id')+1)=="detallepintxo"
		{
		obtenerDetalle(" + pintxo.id + ")'
		}
	*/

	$("#detallepintxo").on('pageremove', function(){ 
	alert("remove");
	});

	$( "#detallepintxo" ).on( "pagebeforeload", function( event ) {
	alert("bedore load");
	} );
		
	$("#detallepintxo").on('pageshow', function(){ 

	});

	$("#detallepintxo").on( "pageload", function( event ) {  
	alert("pageload");
	});
	
	$("#detallepintxo").on( "pagebeforechange", function( event ) { 
	alert("pagebeforechange");
	} );
});





	
function obtenerListado(tipo){
	var parametros = {
	"tipo" : tipo
	};

	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/testbartolo/ObtenerListadoPintxos.php',
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
			var $Listado = $("#listadoPintxos");
			
		 
			// ahora, para cada pintxo
			var pintxo;
			for (var idx in pintxos)
			{
				pintxo = pintxos[idx];
				$Listado.append(
				"<li><a href='#' onclick='obtenerDetalle(" + pintxo.id + ")'>"+
				"<img src='img/listado/" + pintxo.srcimg + "'>" +
				"<h2>" + pintxo.alias + "</h2>" +
				"<p>" + pintxo.ingredientes + "</p>" +
				"</a></li>").listview("refresh"); 
			} 
					
		}
	});
}






function obtenerDetalle(id){

	var parametros = {
	"id" : id
	};
	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/testbartolo/ObtenerDetallePintxo.php',
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
			$("#listado-page").attr("data-id",pintxo.id);
			$("#image_principal_pintxo").html("<img width='100%' src='img/detalle/" + pintxo.srcimg +"'>");
			$("#title_pintxo").html(pintxo.alias);
			$("#info_pintxo").html(pintxo.ingredientes);
			// hay que poner un retardo porque si no en la recarga hay veces que el evento se hace dos veces.
			
			if(window.location.href.indexOf("detallepintxo") != -1)
			{
				setTimeout(function(){
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "#detallepintxo", { dataUrl: "detallepintxo&id=" + pintxo.id + "&tipo=" + pintxo.tipo } );
				},800);
			}
			else
			{
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "#detallepintxo", { dataUrl: "detallepintxo&id=" + pintxo.id + "&tipo=" + pintxo.tipo } );
			}
					
		}
	});
}


function CrearSesion(id){
	var parametros = {
	"id" : id
	};
	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/testbartolo/CrearSesion.php',
		type: 'get',
		beforeSend: function () {
			//$("#resultado").html("Procesando, espere por favor..."); para introducir en el futuro el gif de cargando
		},
		success: function ProcesarRespuesta(ajaxResponse) {
		alert(ajaxResponse);
			if (typeof ajaxResponse == "string"){
				var pintxo  = $.parseJSON(ajaxResponse);
			}
			if (!pintxo)
			{
				// no se encontraron registros :(
				return;
			}
			alert("Se ha creado la sesion");		
		}
	});
}

function ObtenerSesion(){
	var parametros = {
	};
	$.ajax({
		data: parametros,
		url: 'http://demo.mobide.es/testbartolo/ObtenerSesion.php',
		type: 'get',
		beforeSend: function () {
			//$("#resultado").html("Procesando, espere por favor..."); para introducir en el futuro el gif de cargando
		},
		success: function ProcesarRespuesta(ajaxResponse) {
		alert(ajaxResponse);
			if (typeof ajaxResponse == "string"){
				var pintxo  = $.parseJSON(ajaxResponse);
			}
			if (!pintxo)
			{
				// no se encontraron registros :(
				return;
			}
			alert("Se ha obtenido la sesion");		
		}
	});
}
