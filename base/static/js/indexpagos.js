function calc_total() {
        $("[id*='cantidad_item']").on('change',function () {
        var elementos = document.querySelectorAll("[id*='cantidad_item']");
        var precios = document.querySelectorAll('.show-price-producto');
        var total = 0;
        for(var c = 0;c<elementos.length;c++)
        {
            total = total + (parseInt(elementos[c].value,10)*parseInt(precios[c].innerHTML,10));
        }
        document.querySelector('#total-compra').innerHTML = 'Total compra: ' + total;
        document.querySelector('#input-total-compra').value = total;
        //alert(elementos.length);
    });
    }
    function addItemcompra(item,cuantos) {
    // Clonamos la ultima fila de la tabla
    var newElement = $("table tr:last").clone(true);

    var clonsito = 0;
    var total = $("#id_"+ item +"_set-TOTAL_FORMS").val();
    //alert(total);
    total = parseInt(total, 10);
    newElement.find("input,select").each(function () {
        var name = $(this).attr("name").replace("-" + (total - 1) + "-", "-" + total + "-");
        var id = "id_" + name;
        // Seteamos los atributos y limpiamos los valores
        $(this).attr({"name": name, "id": id}).val();
    });
    total++;
        $("#id_"+item +"_set-TOTAL_FORMS").val(total);
        //ACTIVAMOS EVENTOS ON CHANGE PARA EL ELEMENTO QUE SE CREA
            $(newElement.find('select')).on('change',function () {

                    var id_producto  = $(this).val();
                    //alert(id_producto);
                    var iam = $(this).parents('tr').find('input:last').css('background-color','blue');
                    $('table').find('input').css('background-color','transparent');
                    $(this).parents('tr').find('input:last').css('background-color','blue');
                    $.ajax({

                             url:  'returninfoprod', //  guardar/ the endpoint,commonly same url
                             type: 'GET', //parece que no es necesario
                             data: {'id_producto':id_producto}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                             cache: false,
                             //processData: false, // csrfmiddlewaretoken : csrftoken
                             dataType: 'json',
                             // handle a successful response
                             success: function (data)
                             {
                             //alert($(iam).attr('value'));
                               //alert($(this).closest('tr').children('input').val());
                                 //document.querySelector('#formtroquel').reset();
                                 //alert(data.datos.producto);
                                 $(iam).val(data.datos.producto);

                             },
                             // handle a non-successful response
                             error: function (xhr, errmsg, err) {
                                 alert(errmsg);
                             }
                         });
                    //alert(iam);

                });
        // Insertamos el nueva formulario al final
        $("table tr:last").after(newElement);
        var elementos = document.querySelectorAll("[id*='cantidad_item']");
        var precios = document.querySelectorAll("[id*='show_price_producto']");
        var total1 = 0;
        for(var c = 0;c<elementos.length;c++)
        {
            total1 = total1 + (parseInt(elementos[c].value,10)*parseInt(precios[c].value,10));
        }
        document.querySelector('#total-compra').innerHTML = 'Total compra: ' + total1;
        document.querySelector('#input-total-compra').value = total1;
        //alert(elementos.length);
        // Solo mostramos el botón para quitar si hay mas de un formulario
}
    calc_total();
    var elementos = document.querySelectorAll("[id*='cantidad_item']");
        var precios = document.querySelectorAll('.show-price-producto');
        var total = 0;
        for(var c = 0;c<elementos.length;c++)
        {
            total = total + (parseInt(elementos[c].value,10)*parseInt(precios[c].innerHTML,10));
        }
        document.querySelector('#total-compra').innerHTML = 'Total compra: ' + total;
        document.querySelector('#input-total-compra').value = total;
        //alert(total);
window.onload = function () {
     $('#add-compra-producto').on('click',function () {
        addItemcompra('item',1);

    });
    $('.btn-delete-compra').on('click',function () {
        $(this).parents('tr').remove();
        var num_forms = parseInt($("#id_item_set-TOTAL_FORMS").val(),10);
        if(num_forms === 1)
        {
            $('#btn-submit-compra').fadeOut(500);
        }
        else
        {

        }
         $("#id_item_set-TOTAL_FORMS").val(num_forms - 1);
        var elementos = document.querySelectorAll("[id*='cantidad_item']");
        var precios = document.querySelectorAll("[id*='show_price_producto']");
        var total1 = 0;
        for(var c = 0;c<elementos.length;c++)
        {
            total1 = total1 + (parseInt(elementos[c].value,10)*parseInt(precios[c].value,10));
        }
        document.querySelector('#total-compra').innerHTML = 'Total compra: ' + total1;
         document.querySelector('#input-total-compra').value = total1;
        //alert(elementos.length);

    });
    //LLAMADA AJAX CUANDO EL USUARIO DECIDA CAMBIAR DE PRODUCTO, DEBE CAMBIAR TAMBN SU PRECIO
    var selects = document.querySelectorAll('select');
    for (var cc = 0; cc<selects.length;cc++)
    {
        (function (x) {
            $(selects[x]).on('change',function () {

                    var id_producto  = $(selects[x]).val();
                    alert(id_producto);
                    var iam = $(this).parents('tr').find('input:last').css('background-color','blue');
                    $('table').find('input').css('background-color','transparent');
                    $(this).parents('tr').find('input:last').css('background-color','blue');
                    $.ajax({

                             url:  'returninfoprod', //  guardar/ the endpoint,commonly same url
                             type: 'GET', //parece que no es necesario
                             data: {'id_producto':id_producto}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                             cache: false,
                             //processData: false, // csrfmiddlewaretoken : csrftoken
                             dataType: 'json',
                             // handle a successful response
                             success: function (data)
                             {
                             //alert($(iam).attr('value'));
                               //alert($(this).closest('tr').children('input').val());
                                 //document.querySelector('#formtroquel').reset();
                                 //alert(data.datos.producto);
                                 $(iam).val(data.datos.producto);

                             },
                             // handle a non-successful response
                             error: function (xhr, errmsg, err) {
                                 alert(errmsg);
                             }
                         });
                    //alert(iam);

                });
        })(cc);
    }
};
