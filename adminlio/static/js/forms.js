
function show_prev_img(select,img,source){
    //MOSTRAR IMAGEN UNA VEZ SELECCIONADO UN ARCHIVO
    $(select).on('change',function () {
     var imagen = this.files[0];
     var reader  = new FileReader();

  reader.onloadend = function () {
    document.querySelector(img).src = reader.result;
    //document.querySelector('#previmg').src = reader.result;
  };
  if (imagen) {
    reader.readAsDataURL(imagen);
  } else {
    document.querySelector('#troquel-previmg').src = source;
  }
 });
}
function create_checkbox_items(data) {

    var cont_troquel =  [];
    var obj_troquel = [];
    var chck_troquel = [];
    var txt_desc = [];
    document.querySelector('#cont-results-troquel').innerHTML = '';
    for(var c = 0; c<data.length;c++)
    {
        cont_troquel[c] = create_div_tag('cont_troquel'+c,'results-troquel','#cont-results-troquel');
        //verificamos que opciones tiene el troquel y en ese caso mostramos el tipo (zonas,img,video)
        obj_troquel[c] = create_object_tag('obj'+data[c].id,'results-troquel','/media/'+data[c].file_troquel,'image/svg+xml','#cont_troquel'+c);
        chck_troquel[c] = create_checkbox_tag('chck'+c,'','#cont_troquel'+c);

        txt_desc[c] = document.createElement('p');
        //$(txt_desc[c]).css('position','absolute');
        $(txt_desc[c]).css('top',0);
        $(txt_desc[c]).css('left',0);
        $(txt_desc[c]).html(data[c].nombre_troquel);
        document.querySelector('#cont_troquel'+c).appendChild(txt_desc[c]);
        $(chck_troquel[c]).attr('value',data[c].id);
    }
    /*CHECCKED DISYUNTO*/
    $('input[type="checkbox"]').on('change', function() {

        $('input[type="checkbox"]').not(this).prop('checked', false);
    });
    if(data.length>0)//verificamos si encontro elementos, en ese caso mostramos btn editar y borrar y seleccionar
    {
        $('#btn-editar-troquel').css('display','block');
        $('#btn-delete-troquel').css('display','block');
        $('#btn-select-troquel').css('display','block');
    }
    else
    {
        alert('no se ha encontrado ningún troquel');
    }
}
function who_checkbox_selected()//mira que checkbox fue seleccionada agarra su id que posteriormente servira para hacer la busqueda de ese id en labase de datos para editar
{

    //alert(document.querySelector('input[type="checkbox"]:checked').value);
    var checkbox = document.querySelector('input[type="checkbox"]:checked');
    return checkbox;
}

(function () {
    //MOSTRAR IMAGEN UNA VEZ SELECCIONADO UN ARCHIVO
    $('#file_t').on('change',function () {
     var imagen = this.files[0];
     var reader  = new FileReader();

  reader.onloadend = function () {
      $.ajax({
           url : 'repeattroquel',
           type: 'GET',
           data : {'troquel':'svg/'+imagen.name},
                dataType: 'json',

           success : function(json)
           {
               //alert(json.devuelto.length);
               if (json.resultado[0] === undefined || json.resultado === '')
               {
                   document.querySelector('#troquel-previmg').src = reader.result;
               }
               else
               {
                   alert('ya existe ese archivo');
                   document.querySelector('#file_t').value = '';

               }


               //$('#prevsvg').attr('data','../../media/'+ json.daticos[0].file_troquel);
           },

            error : function(xhr,errmsg,err)
            {
                alert('error');
            }
        });

    //document.querySelector('#previmg').src = reader.result;
  };
  if (imagen) {
   var kk =  reader.readAsDataURL(imagen);
  } else {
    document.querySelector('#troquel-previmg').src = "/static/img/emutroquel.png";
  }
 });

    //TRANSACCION AJAX PARA BUSCAR TROQUELES EN LA BASE DE DATOS
    $('#find-troquel-btn').on('click',function () {
    //obtengo el valor del select
        //var valor = $('select#troquelitos').val(); //el id nos permite filtrar en la base de datos
        var valor1 = $('#nombre_t').val();
        var valor2 = $('#size_t').val();
        var valor3 = $('#category-tfind').val();
        //alert(valor3);
        $.ajax({
           url : 'findtroquel',
           type: 'GET',
           data : {'nombre':valor1,'size':valor2,'category':valor3},
                dataType: 'json',

           success : function(json)
           {
               //alert(json.devuelto.length);
               //alert(json.devuelto.length);
               $('#cont-results-troquel').css('display','flex');
               create_checkbox_items(json.devuelto);

               //$('#prevsvg').attr('data','../../media/'+ json.daticos[0].file_troquel);
           },

            error : function(xhr,errmsg,err)
            {
                alert('error');
            }
        });
    });
})();