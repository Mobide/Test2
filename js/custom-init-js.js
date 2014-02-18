	
	$(document).on("mobileinit", function() {
		$.mobile.defaultPageTransition = "slide";
	});
	
	$(document).ready(function(event){
	alert('ready');
	realizaProceso1(1, 2);
	});
	
	$(document).bind('pageload', function(){
	alert("page load");
	realizaProceso2(1, 2);	 
	});
	
	function showLogoIfHome()
	{			
		$(".index-page").on("pagehide", function() { 
			$(".index-k5-logo-container").hide();
		});
		$(".index-page").on("pageshow", function() { 
			setTimeout(function(){
				//$("#index-k5-logo").show();
				//$("#index-k5-logo-container").slideUp( "4000", function() {}).show();
				//$("#index-k5-logo-container").show("slide", { direction: "top" }, 5000);
				$(".index-k5-logo-container").fadeIn(2000);
			},2000);
		});
	}
	
	function realizaProceso1(valorCaja1, valorCaja2){
	alert("Comienzo llamada funcion");
	var parametros = {
	"valor1" : 1,
	"valor2" : "img/pintxo.png",
	"valor3" : "titulo del pintxo"
	};

	$.ajax({
		data: parametros,
		url: 'ObtenerListadoPintxos.php',
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
 
			// recupera la instancia de la tabla en donde colocaremos los 
			// Recuperamos el elemento donde se van a postear el listado de los pintxos
			var $Listado = $("#listadoPintxos");
			
		 
			// ahora, para cada pintxo
			var pintxo;
			for (var idx in pintxos)
			{
				pintxo = pintxos[idx];
				$Listado.append(
					"<li><a href='detallepintxo.html?&id=" + pintxo.id + "'>"+
					"<img src='" + pintxo.srcImagen + "'>" +
					"<h2>" + pintxo.title + "</h2>" +
					"<p>Phoenix</p>" +
					"</a></li>").listview("refresh"); 
			} 
						//$("#resultado").html(response);
			}
	});
}





function realizaProceso2(valorCaja1, valorCaja2){
	var parametros = {
	"valor1" : 1,
	"valor2" : "img/pintxo.png",
	"valor3" : "titulo del pintxo",
	"valor4" : "Descripcion del pintxo"
	};

	$.ajax({
		data: parametros,
		url: 'ObtenerDetallePintxo.php',
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
				// no se encontraron registros :(
				return;
				}
 
			// recupera la instancia de la tabla en donde colocaremos los 
			// Recuperamos el elemento donde se van a postear el listado de los pintxos
			var $Listado = $("#listadoPintxos");
			
		 
		 	var $Imagen= $("#image_principal_pintxo");
			var $Titulo= $("#title_pintxo");
			var $Descripcion=$("#info_pintxo");
			
			$Imagen.html("<img width='100%' src='" + pintxo.srcImagen +"'>");
			$Titulo.html(pintxo.title);
			$Descripcion.html(pintxo.descripcion);
		 
		 
			// ahora, para cada pintxo
			
			//$Listado.html(pintxo.descripcion).listview("refresh"); 
			}
	});
}