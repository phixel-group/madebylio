function validate_productform(campos) {
    var dataform = $('#create_product_form').serializeArray().map(function(v) {return [v.name, v.value];});
    var datos_input = document.querySelectorAll('#create_product_form input');
    var check = false;
    for(var x = 0; x<campos.length; x++)
    {
        if ($('#id_' + campos[x]).val() === '')
        {
            alert('campo '+ campos[x] +' esta vacio');
            check = false;
            break;
        }
        else
        {
            check = true;
        }
    }
    if(check === true)
    {
        document.getElementById('c-nombre-producto').innerHTML= document.getElementById('id_nombre_producto').value;
        document.getElementById('c-ubicacion-producto').innerHTML= document.getElementById("id_pais_producto").options[document.getElementById("id_pais_producto").selectedIndex ].text + ' - ' +document.getElementById("id_ciudad_producto").options[document.getElementById("id_ciudad_producto").selectedIndex ].text;
        document.getElementById('c-precio-producto').innerHTML=document.getElementById('id_precio_producto').value;
        document.getElementById('c-cantidad-producto').innerHTML=document.getElementById('id_cantidad_producto').value;
        document.getElementById('c-descripcion-producto').innerHTML=document.getElementById('id_descripcion_producto').value;
    $('#confirm-producto-btn').on('click',function () {
        $('#saveproducto').trigger('click');
    });
        $('#admin-interface').css('left',-200+'vw');
    }
    else
    {

    }


    //alert($("#create_product_form").serializeArray());
    //var formulario = document.querySelector('#create_product_form').elements;
    //alert(formulario[1].value + 'valor :'+ formulario[1].value + 'valor' + formulario[2].value);
    //return false;
}
function activateselect(who,zonas)
{
            //var chg_whal = document.querySelector('object#zonas-info-troquel');
            //var svv = chg_whal.contentDocument;
            //var sss = svv.querySelectorAll("[id^=click]");
    //alert( $('input#save-troquel').attr('datos')+ 'jaha');
       for(var x = 0; x<zonas.length;x++)
        {
            (function (kk) {
                $('#id_zona_set-'+x+'-color_zona').unbind('change'); //elimina evento una vez realizado, esto evita que se repita el evento 2 veces
                $('#id_zona_set-'+x+'-color_zona').on('change',function () {
                      //alert(parcial[i]);
                 //var parcial = ['branquias','cabeza','cuerpo','aletalateral','aletasuperior','aletatrasera'];
                    alert(zonas[kk].id.slice(5));
                   who.querySelector('#'+ zonas[kk].id.slice(5)+' image').setAttribute('xlink:href','/media/'+ $('#id_zona_set-'+kk+'-color_zona' +' option:selected').text());
                alert($('#id_zona_set-'+kk+'-color_zona' +' option:selected').text());
                  });
            })(x);


        }

}
function clear_zone_formset()
{
    var formsets = document.querySelectorAll('.formset_row');
    for(var cc= 1;cc<formsets.length;cc++)
    {
        $(formsets[cc]).remove();
    }
    $('input#id_zona_set-TOTAL_FORMS').val(1);
}
function update_select_color(tupla1,tupla2,zonas,datos)
{
    for(var c = 0;c<zonas;c++)
    {
            $('select#'+tupla1+c+tupla2).empty();
                   $("<option />", {value: 0, text: '------'}).appendTo($ ('select#'+tupla1+c+tupla2));
                   for(var cuenta = 0;cuenta<datos.length;cuenta++)
                   {
                       $("<option />", {
                           value: datos[cuenta].id,
                           text: datos[cuenta].file_color
                       }).appendTo($('select#'+tupla1+c+tupla2));
                   }
    }
}
function addItem(zona,cuantos) {
    // Clonamos la ultima fila de la tabla
    var newElement = $("table.table tr:last").clone(true);
    var clonsito = 0;
    var total = $("input#id_zona_set-TOTAL_FORMS").val();
    //alert(total);
    //alert(total);
    total = parseInt(total, 10);
    // Cuando se usan formsets, los elementos del formulario
    // son enumerados (id_item-0-rate, id_item-1-rate, etc.)
    // entonces necesitamos que el nuevo elemento siga esa
    // numeración
    newElement.find(":input").each(function () {
        var name = $(this).attr("name").replace("-" + (total - 1) + "-", "-" + total + "-");
        var id = "id_" + name;
        // Seteamos los atributos y limpiamos los valores
        $(this).attr({"name": name, "id": id}).val();
    });
    $('input#id_zona_set-' + (total - 1) + '-nombre_zona').val(zona); //total - 1  para que edite desde 1
    // Aumentamos en 1 la cantidad de formularios en el formset
    total++;
    if (total>cuantos)
    {}
    else
    {
        $("input#id_zona_set-TOTAL_FORMS").val(total);
        // Insertamos el nueva formulario al final
        $("table.table tr:last").after(newElement);
    }

        // Solo mostramos el botón para quitar si hay mas de un formulario
        if (total > 1) {
            //$("#remove-item").show();
        }
}
function checkzonestroquel(datos)
{
    //alert(datos.file_troquel);
    $('object#zonas-info-troquel').attr('data','/media/'+datos.file_troquel);
    $('object#zonas-info-troquel').unbind('load');
    $('object#zonas-info-troquel').on('load',function () {
            //alert('si');
            var chg_whal = document.querySelector('object#zonas-info-troquel');
            var svv = chg_whal.contentDocument;
            var sss = svv.querySelectorAll("[id^=click]");
            //alert(sss[0].id);
            //alert(sss.length);
            //CREANDO FILA CON ZONAS
            //alert('oinasd');
            //return false;
         var zona = [];
         //$('input#id_zona_set-TOTAL_FORMS').val(7);
         //$('input#id_zona_set-0-nombre_zona').val(sss[0].id.slice(5));
         for (var i = 0; i < sss.length; i++)
         {
             //alert(sss[i].id.slice(5));
             addItem(sss[i].id.slice(5),sss.length);

         }
         $('input#how-zones').val(sss.length);
         $('input#save-troquel').attr('datos',2);
         activateselect(svv,sss);
        //activateselect(svv,sss);
        });
}



window.onload = function () {
    $('#next-temp').on('click',function () {
       $('#admin-interface').css('left',-100+'vw');
    });
    $('#go-confirm').on('click',function () {
       $('#admin-interface').css('left',-200+'vw');
    });

    //FORMULARIO PARA TROQUEL
        $('#formtroquel').on('submit',function(e) {
            e.preventDefault();
            var formdata = new FormData($(this)[0]);
             $.ajax({
                 url: $(this).attr('action'), //  guardar/ the endpoint,commonly same url
                 type: $(this).attr('method'), //parece que no es necesario
                 data: formdata, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 contentType: false,
                 processData: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //alert(data.error);
                     alert('Troquel creado satisfactoriamente!');
                     document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(err);
                 }
             });
        });

    //EVENTOS DE BOTON PARA TROQUEL
    $('#mask-troquel-addbtn').on('click',function () {
        document.getElementById('troquel-create').style.display= 'block';
        document.querySelector('.troquel-newtroquel').style.display= 'block';
        document.querySelector('.troquel-resultfind').style.display= 'none';
        document.querySelector('.troquel-findmenu').style.display= 'none';
        document.querySelector('#cont-shadow-background').style.display= 'none';
         document.querySelector('#cont-edit-troquel').style.display= 'none';
         document.querySelector('#cont-delete-troquel').style.display= 'none';
    });
    $('#mask-troquel-findbtn').on('click',function () {
        document.getElementById('troquel-create').style.display= 'none';
        document.querySelector('.troquel-newtroquel').style.display= 'none';
        document.querySelector('.troquel-resultfind').style.display= 'block';
        document.querySelector('.troquel-findmenu').style.display= 'block';
    });


    //TRANSACCIONES AJAX PARA LA EDICION DE TROQUELES CARGAR FORMULARIO CON LA INSTANCIA DE TROQUEL AEDITAR
    $('#btn-editar-troquel').on('click',function () {

        var selected = who_checkbox_selected();
        if (selected === null)//en el caso de que
        {
            alert('no ha seleccionado ningún troquel');
        }
        else
        {
            selected = selected.value;
            $.ajax({
                 url:  'edittroqueles/'+selected, //  guardar/ the endpoint,commonly same url
                 type: 'GET', //parece que no es necesario
                 data: {'id':selected}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     $("#cont-shadow-background").css('display','block');
                     $("#cont-shadow-background").css('opacity','0.7');
                     $("#cont-edit-troquel").css('display','block');
                     $("#cont-delete-troquel").css('display','none');
                     $("#cont-edit-troquel").html(data.html_content);
                     $('#cancel-edit-troquel').on('click',function () {                                              $("#cont-shadow-background").css('display','none');
                        $("#cont-delete-troquel").css('display','none');
                        $("#cont-edit-troquel").css('display','none');
                    });
                     show_prev_img('#id_file_troquel','#troquel-edit-previmg','/static/img/emutroquel.png');//activar prev de imagen en el form
                     //alert(data.html_content);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     //alert(errmsg);
                     console.log(errmsg);
                 }
             });
        }

    });

    //TRANSACCIONES AJAX PARA LA EDICION DE TROQUELES FORMULARIO DE EDICION
    $('#formedittroquel').on('submit',function () {
        var selected = who_checkbox_selected();
        $.ajax({
                 url:  'edittroqueles', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: {'id':selected}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     $("#cont-edit-troquel").html(data.html_content);
                     alert(data.html_content);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
    });
    //TRANSACCIONES AJAX PARA EL BORRADO DE TROQUELES
    $('#btn-delete-troquel').on('click',function () {

        var selected = who_checkbox_selected();
        if (selected === null)//en el caso de que
        {
            alert('no ha seleccionado ningún troquel');
        }
        else
        {
            selected = selected.value;
            $.ajax({
                 url:  'deletetroqueles/'+selected, //  guardar/ the endpoint,commonly same url
                 type: 'GET', //parece que no es necesario
                 data: {'id':selected}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     $("#cont-shadow-background").css('display','block');
                     $("#cont-shadow-background").css('opacity','0.7');
                     $("#cont-delete-troquel").css('display','block');
                     $("#cont-edit-troquel").css('display','none');
                     $("#cont-delete-troquel").html(data.html_content);
                     //CANCELACIONES EDITAR Y BORRAR
                    $('#cancel-delete-troquel').on('click',function () {                                              $("#cont-shadow-background").css('display','none');
                        $("#cont-delete-troquel").css('display','none');
                        $("#cont-edit-troquel").css('display','none');
                    });
                     alert(data.html_content);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
        }

    });


    //TRANSACCIONES AJAX PARA LA BORRADO DE TROQUELES FORMULARIO DE BORRADO
    $('#formdeletetroquel').on('submit',function () {
        var selected = who_checkbox_selected();
        $.ajax({
                 url:  'deletetroqueles', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: {'id':selected}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //$("#cont-edit-troquel").html(data.html_content);
                     //alert(data.html_content);
                     alert('borrado');
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
    });
    //EVENTO PARA SELECCION DE TROQUEL
    $('#btn-select-troquel').on('click',function () {

        var selected = who_checkbox_selected();
        if (selected === null)//en el caso de que
        {
            alert('no ha seleccionado ningún troquel');
        }
        else
        {
            $('#who-troquel-selected').val(selected.value); //asignamos el id del troquel seleccionado para continuar con el diligenciamiento del formulario
             $('#admin-interface').css('left',-100+'vw');
            //alert(selected.value);
            $.ajax({
                 url:  'updatetroquel', //  guardar/ the endpoint,commonly same url
                 type: 'GET', //parece que no es necesario
                 data: {'id':selected.value}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (json) {

                     //ACTUALIZAMOS EL SELECT TROQUEL
                     $('select#id_troquel_producto').empty();
                     $("<option />", {value: 0, text: '------'}).appendTo($('select#id_troquel_producto'));
                   for(var cuenta = 0;cuenta<json.data_troquel.length;cuenta++)
                   {
                       $("<option />", {
                           value: json.data_troquel[cuenta].id,
                           text: json.data_troquel[cuenta].nombre_troquel
                       }).appendTo($('select#id_troquel_producto'));
                   }
                    //asignamos el troquel seleccionado en el checkbox troquel al formulario de productos
                     $('select#id_troquel_producto').val(selected.value);

                    //alert($("select#id_troquel_producto option:selected").index());

                     //$('input#id_zona_set-TOTAL_FORMS').val(1);
                   //CARGAMOS IMAGEN TROQUEL A EDITAR Y CREAMOS EL RESTO DE FORMSETS
                     //alert(json.troquel[0].file_troquel);


                     //SI NO HAY TROQUEL OCULTAMOS EL FORMSET DE LAS ZONAS!!!!

                     //DETERMINAMOS SI EL TROQUEL ES EDITABLE O NO
                     var select_index = parseInt($("select#id_troquel_producto option:selected").index(),10);

                        //var what_troquel = $("select#id_troquel_producto option:selected").text();
                     var edit_troquel = json.data_troquel[select_index-1].editable_troquel;
                     //console.log(edit_troquel);
                        if(edit_troquel === 'NO')
                        {
                            document.querySelector('select#id_troquel_producto').style.opacity = '0';
                            document.querySelector('.table').style.opacity = '0';
                            //alert($("select#id_troquel_producto option:selected").text());
                            $('object#zonas-info-troquel').attr('data','/media/'+json.troquel[0].file_troquel);
                            //eliminamos el campo troquel de las opciones del prev_producto, porque no existe un troquel en si entonces debemos eliminarlo
                            var prev_select = document.querySelector('#id_prev_producto');
                            var prev_options = prev_select.querySelectorAll('option');
                            prev_select.removeChild(prev_options[1]);
                        }
                        else
                        {
                            document.querySelector('select#id_troquel_producto').style.opacity = '0';
                            document.querySelector('.table').style.opacity = '1';
                            clear_zone_formset();
                            checkzonestroquel(json.troquel[0]);
                        }

                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     //alert(errmsg);
                     console.log(errmsg);
                 }
             });
        }
    });
    //BOTON VOLVER
    $('#volver-troquel').on('click',function () {

        $('#admin-interface').css('left',0);
    });

    //EVENTO AÑADIR COLOR
    $('#add-color').on('click',function () {
        $('#cont-add-color').css('display','block');
        show_prev_img('#file_c','#color-previmg','/static/img/emutroquel.png');
    });
    $('#cancel-add-color').on('click',function () {
       $('#cont-add-color').css('display','none');
    });
    //FORMULARIO PARA añadir color
        $('#formcolors').on('submit',function(e) {
            e.preventDefault();
            var formdata = new FormData($(this)[0]);
             $.ajax({
                 url: 'addcolor', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: formdata, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 contentType: false,
                 processData: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //alert('success');
                     //reseteamos form
                     document.querySelector('#formcolors').reset();
                     //escondemos formulario de creacion de colores
                     $('#cont-add-color').css('display','none');
                     //cargamos de nuevo los colores disponibles

                     $.ajax({
                             url: 'getcolores', //  guardar/ the endpoint,commonly same url
                             type: 'GET', //parece que no es necesario
                             data: {}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                             cache: false,
                             contentType: false,
                             processData: false,
                             //processData: false, // csrfmiddlewaretoken : csrftoken
                             dataType: 'json',
                             // handle a successful response
                             success: function (data) {
                                 //alert(data.daticos);
                                 //cargamos de nuevo los colores disponibles
                                 update_select_color('id_zona_set-','-color_zona',$('#how-zones').val(),data.daticos);


                             },
                             // handle a non-successful response
                             error: function (xhr, errmsg, err) {
                                 alert('error');
                             }
                         });
                    },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert('error');
                 }
             });
     });

    //BOTON DE CREACION DE PRODUCTO, NOS LLEVA A LA CONFIMACION
    $('#crear-producto-btn').on('click',function () {
        validate_productform(['nombre_producto','troquel_producto','pais_producto','ciudad_producto','precio_producto','cantidad_producto','descripcion_producto']);

    });
    //VOLVER A PRODUCTOS
    $('#volver-productos').on('click',function () {

         $('#admin-interface').css('left',-100+'vw');
    });



    $('#category-tform').on('change',function () {
        var selected = $(this).val();
        var options = document.querySelectorAll('#subcategory-tform option');
        for(var cp = 0;cp<16;cp++)
            {
                options[cp].style.display = 'block';
            }

        if(selected === 'IMA')
        {
            for(var c = 7;c<16;c++)
            {
                options[c].style.display = 'none';
            }
        }
        else if (selected === 'CER')
        {
            for(var cc = 0;cc<16;cc++)
            {
                if((cc>0 && cc<=6) || (cc>=12 && cc<16) )
                {
                  options[cc].style.display = 'none';
                }

            }
        }
        else if (selected === 'BIS')
        {
            for(var ccc = 0;ccc<16;ccc++)
            {
                if((ccc>0 && ccc<=11) || (ccc>=14 && ccc<16) )
                {
                  options[ccc].style.display = 'none';
                }

            }
        }
        else if (selected === 'HOG')
        {
            for(var cccc = 0;cccc<16;cccc++)
            {
                if(cccc<14)
                {
                  options[cccc].style.display = 'none';
                }

            }
        }

    });

    $("input#nombre_t").change(function () {
                var username = $(this).val();
                var input = $(this);
                  $.ajax({
                    url: 'validatetroquel',
                      type:'GET',
                      cache: false,
                    data: {
                      'troquel': username
                    },
                    dataType: 'json',
                    success: function (data) {
                      if (data.is_taken) {
                        alert("A troquel with this name already exists.");
                        $(input).val('');
                        $(input).focus();

                      }
                      //alert(data);
                    },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                        console.log('cambio');
                             alert(err);

                         }
                  });

            });
    $("#id_nombre_producto").change(function () {
                var username = $(this).val();
                var input = $(this);
                  $.ajax({
                    url: 'validateproducto',
                    data: {
                      'producto': username
                    },
                    dataType: 'json',
                    success: function (data) {
                      if (data.is_taken) {
                        alert("A product with this name already exists.");
                        $(input).val('');
                        $(input).focus();
                        //alert(data.is_taken);
                      }
                    },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                        console.log('cambio');
                             alert(errmsg);

                         }
                  });

            });
    $("#id_title").change(function () {
                var username = $(this).val();
                var input = $(this);
                  $.ajax({
                    url: 'validategaleria',
                    data: {
                      'galeria': username
                    },
                    dataType: 'json',
                    success: function (data) {
                      if (data.is_taken) {
                        alert("A gallery with this title already exists.");
                        $(input).val('');
                        $(input).focus();
                        //alert(data.is_taken);
                      }
                    }
                  });

            });

    //CHANGING PATTERNS WITH SELECT
    $('#id_pattern_producto').on('change',function (e) {
        //alert($(this).val());
        var chg_whal = document.querySelector('object#zonas-info-troquel');
        var svv = chg_whal.contentDocument;
        var circ = svv.querySelector("#patrones");
        var rayas = svv.querySelector("#patrones2");
        if($(this).val()== 'pat1')
        {
            circ.style.display = 'inline';
            rayas.style.display = 'none';
        }
        else if($(this).val()== 'pat2')
        {
            circ.style.display = 'none';
            rayas.style.display = 'inline';
        }
        else
        {
            circ.style.display = 'none';
            rayas.style.display = 'none';
        }
    });
};