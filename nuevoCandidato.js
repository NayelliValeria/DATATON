/**
 * Requiere el archivo validar.js
 * 
 */

var valor;

$(function(){
	var valor;
	var detalles;
	var curpValido = 0;
	
	$('#curp').focus();
	
	//Para validar el CURP
	$("#curp").focus(function(){
		$('#resultado_curp').remove();
		document.getElementById('curpExistente').style.visibility='hidden';
	});
		
	$('#curp').blur(function(){
		$('.error').remove();
		valor=$('#curp').val();
		if(valor!='' && validarCURP(valor) )//validar CURP
		{
			trimmedstr = valor.replace(/\s+$/, '');
			$.ajax({//Se verifica si este CURP ya esta registrado
				url:'/Aplicacion1.3/verificarCURP',
				type:'POST',
				data:'curp=' + valor,
				success: function(resultado) 
				{
					if(resultado!='1')
					{
						curpValido=0;
						$('<img src="../images/iconos/stop32.png" id="resultado_curp" class="validar"/>').appendTo('#curp_img');
						document.getElementById('curpExistente').style.visibility='visible';
						detalles = resultado;
					}else
						curpValido=1;
				},
				error:function(jqXHR, textStatus, errorThrown)
				{
					if(jqXHR.responseText !== '')
						$('#validacion').append('<p class="error">'+jqXHR.responseText+'.</p>');
					else
					{
						$('#validacion').append('<p class="error">'+errorThrown+'.</p>');
						
					}
				}
			});//fin .ajax()
		}else{
			$('<img src="../images/iconos/stop32.png" id="resultado_curp" class="validar"/>').appendTo('#curp_img');
		    $('#validacion').append('<p class="error">Por favor verifique el CURP.</p>');
		}
	});
		
	//Para validar el nombre
	$("#nombre").focus(function(){ $('#resultado_nombre').remove(); });
	$('#nombre').blur(function()
	{
		$('.error').remove(); 
		valor=$('#nombre').val();
		if(valor=='' ||  !validarNombre(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_nombre" class="validar"/>').appendTo('#nombre_img');
			$('#validacion').append('<p class="error">El nombre no es valido.</p>');
		}
	});
		
	//Para validar el apellido paterno
	$("#paterno").focus(function(){ $('#resultado_paterno').remove();});
	$('#paterno').blur(function(){
		$('.error').remove(); 
		valor=$('#paterno').val();
		if(valor=='' || !validarApellido(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_paterno" class="validar"/>').appendTo('#paterno_img');
			$('#validacion').append('<p class="error">El apellido no es valido.</p>');
		}
	});
		
	//Para validar el apellido Materno
	$("#materno").focus(function(){ $('#resultado_materno').remove(); });
	$('#materno').blur(function()
	{
		$('.error').remove(); 
		valor=$('#materno').val();
		if(valor!='' &&  !validarApellido(valor) )
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_materno" class="validar"/>').appendTo('#materno_img');
			$('#validacion').append('<p class="error">El apellido materno no es valido.</p>');
		}
	});
		
	//Para validar el e-mail
	$("#email").focus(function() { $('#resultado_email').remove(); });
	$('#email').blur(function()
	{
		$('.error').remove(); 
		valor=$('#email').val();
		if(valor=='' || !validarEmail(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_email" class="validar"/>').appendTo('#email_img');
			$('#validacion').append('<p class="error">El e-mail no es valido.</p>');
		}
	});
		
	//Para validar el telefono
	$("#telefono").focus(function(){ $('#resultado_telefono').remove();	});
	$('#telefono').blur(function()
	{
		$('.error').remove(); 
		valor=$('#telefono').val();
		if(valor=='' || !validarTelefono(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_telefono" class="validar"/>').appendTo('#telefono_img');
			$('#validacion').append('<p class="error">El número telefónico no es valido.</p>');
		}
	});
		
	//Para validar el rfc
	$("#rfc").focus(function(){ $('#resultado_rfc').remove();});
	$('#rfc').blur(function()
	{
		$('.error').remove(); 
		valor=$('#rfc').val();
		if(valor=='' || !validarRFC(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_rfc" class="validar"/>').appendTo('#rfc_img');
			$('#validacion').append('<p class="error">El RFC no es valido.</p>');
		}
	});
		
	//Para validar el textarea de tecnologias
	/*$("#tecnologia").focus(function(){ $('#resultado_tecnologia').remove();	});
	$('#tecnologia').blur(function(){
		$('.error').remove(); 
		valor=$('#tecnologia').val();
		if(valor=='' || !validarTexto(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_tecnologia" class="validar"/>').appendTo('#tecnologia_img');
			$('#validacion').append('<p class="error">Verifique el campo tecnologías.</p>');
		}
	});*/
		
	//Para validar el textarea de palabras clave
	$("#palabras").focus(function(){ $('#resultado_palabras').remove();	});
	$('#palabras').blur(function()
	{
		$('.error').remove(); 
		valor=$('#palabras').val();
		if(valor=='' || !validarTexto(valor))
		{
			$('<img src="../images/iconos/stop32.png" id="resultado_palabras" class="validar"/>').appendTo('#palabras_img');
			$('#validacion').append('<p class="error">Verifique el campo Palabras clave del candidato.</p>');
		}
	});
	
	function obtenerTecnologias(){
		var tecnologias = "";
		var chkArray = [];
		$("#tecnologia input:checked").each(function() {
	        chkArray.push($(this).val());
	    });
		tecnologias = chkArray.join(',') + ",";
		return tecnologias;
	}
	
	/*Funcion para el botón enviar*/	
	$('#agregar').click(function()
	{	
		$('.error').remove();
		if(curpValido==0)
			$('#validacion').append('<p class="error">Error: Por favor, verifique los datos marcados.</p>');
		else{
			if( obtenerTecnologias()==""|| obtenerTecnologias()==",")
			{ 
				$('<img src="../images/iconos/stop32.png" id="resultado_tecnologia" class="validar"/>').appendTo('#tecnologia_img'); 
				$('#validacion').append('<p class="error">Error: Por favor, seleccione las tecnologías que el candidato conoce, o de de alta nuevas en la pestaña Tecnologías.</p>');
			}
			else
			if(verificarValores()){
				if(($('#materno').val()!='' && validarApellido($('#materno').val())) || $('#materno').val()=='')
				{
					$.ajax({
						url:'/Aplicacion1.3/AgregarCandidato',
						type: 'POST',
						data: 
							'nombre=' + $("#nombre").val() +
							'&materno='+ $("#materno").val() +
							'&paterno='+ $("#paterno").val() +
							'&curp='+ $("#curp").val() +
							'&rfc='+ $("#rfc").val() +
							'&numero='+ quitarSeparador("-",$('#telefono').val() ) +
							'&email='+ $("#email").val() +
							'&palabras='+ $("#palabras").val() +
							'&tecnologia='+obtenerTecnologias(),
						success: function(resultado) 
						{
							re=1;
							ventanaError("El candidato se ha registrado exitosamente", 0);
							setTimeOut(function(){
								window.location.href='Reclutador.jsp';
							},2000);
						},
						error:function(jqXHR, textStatus, errorThrown){
							if(jqXHR.responseText !== '')
								$('#validacion').append('<p class="error">Error: ' + jqXHR.responseText +'</p>');
							else
								$('#validacion').append('<p class="error">Error: ' + errorThrown +'</p>');
						}
					});
				}else
					$('#validacion').append('<p class="error">Error: Lo sentimos, uno o más campos son incorrectos, por favor verifiquelos </p>');
			}else
			{
				$('#validacion').append('<p class="error">Error: Lo sentimos, uno o más campos son incorrectos, por favor verifiquelos </p>');
			}
		}
	});
		
	/*Funcion para el botón cancelar*/	
	$('#cancelar').click(function(){ location.reload();	});
		
	//Mostrar detalles
	$('#detalles').click( function(){ re=0; ventanaError(detalles,0);});
		
	function ventanaError(text , e)
	{	
		var error = document.getElementById("ventana");
		dimmerError = document.createElement("div");
		if(e == 1)
			$('#info').append('<p class="error">'+ text +'</p>');
		else
			$('#info').append('<p class="info">'+ text +'</p>');
		dimmerError.style.width =  window.innerWidth + 'px';
		dimmerError.style.height = window.innerHeight + 'px';
		dimmerError.className = 'dimmerError';			
		dimmerError.onclick = function()
		 {
			if(re==1)
				location.reload();
			 document.body.removeChild(this);   
			 error.style.visibility = 'hidden';
			 $("#info").removeAttr("p");
			 $("#info").html('');
		 };
		document.body.appendChild(dimmerError);
		error.style.visibility = 'visible';
		return false;
	}

	$('#btnCerrarVentanaError').click(function(){
		var error = document.getElementById("ventana");
		error.style.visibility = 'hidden';
		document.body.removeChild(dimmerError);
		$("#info").html('');
		if(re == 1)
			location.reload();
		re=0;
	});
	
	$('#consultar').click(function(){
		window.top.location = "adm/Administrador.jsp";
	});
	
	function verificarValores()
	{
		$('.error').remove();
		$('#resultado_curp').remove();
		$('#resultado_nombre').remove();
		$('#resultado_paterno').remove();
		$('#resultado_materno').remove();
		$('#resultado_email').remove();
		$('#resultado_telefono').remove();
		$('#resultado_rfc').remove();
		$('#resultado_tecnologia').remove();
		$('#resultado_palabras').remove();
		var v = true;
		if( $('#curp').val()=='' || !validarCURP($('#curp').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_curp" class="validar"/>').appendTo('#curp_img'); v=false;}
		if( $('#nombre').val()=='' || !validarNombre($('#nombre').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_nombre" class="validar"/>').appendTo('#nombre_img'); v=false;}
		if( $('#paterno').val()=='' ||  !validarApellido($('#paterno').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_paterno" class="validar"/>').appendTo('#paterno_img'); v=false;}
		if( $('#materno').val()!=''&&  !validarApellido($('#materno').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_materno" class="validar"/>').appendTo('#materno_img'); v=false;}
		if( $('#email').val()=='' || !validarEmail($('#email').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_email" class="validar"/>').appendTo('#email_img'); v=false;}
		if( $('#telefono').val()=='' || !validarTelefono($('#telefono').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_telefono" class="validar"/>').appendTo('#telefono_img'); v=false;}
		if( $('#rfc').val()=='' ||  !validarRFC($('#rfc').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_rfc" class="validar"/>').appendTo('#rfc_img'); v=false;}
		if( $('#palabras').val()=='' || !validarTexto($('#palabras').val()) )
			{ $('<img src="../images/iconos/stop32.png" id="resultado_palabras" class="validar"/>').appendTo('#palabras_img'); v=false;}
		return v;
	}
	
});//Fin function
