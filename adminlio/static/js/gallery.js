function addItem(form,maxform,where)
{
    var formulario = document.querySelector(form);
    var place = document.querySelector(where);
    var num_elemts = document.querySelector(maxform);
    var label = document.createElement('label');
    var inputs = [];
    inputs[0] = document.createElement('input');
    inputs[1] = document.createElement('input');
    inputs[2] = document.createElement('input');

    //alert(num_elemts.value);
    //id_form-0-image

    label.setAttribute('for','id_imagegallery_set-'+ num_elemts.value+'-image');
    /*establecimiento de parametros inputs*/

    inputs[0].setAttribute('id','id_imagegallery_set-'+ num_elemts.value+'-image');
    inputs[0].setAttribute('name','imagegallery_set-'+ num_elemts.value+'-image');
    inputs[0].setAttribute('type','file');

    inputs[1].setAttribute('id','id_imagegallery_set-'+ num_elemts.value+'-id');
    inputs[1].setAttribute('name','imagegallery_set-'+ num_elemts.value+'-id');
    inputs[1].setAttribute('type','hidden');

    inputs[2].setAttribute('id','id_imagegallery_set-'+ num_elemts.value+'-post');
    inputs[2].setAttribute('name','imagegallery_set-'+ num_elemts.value+'-post');
    inputs[2].setAttribute('type','hidden');
    num_elemts.value = parseInt(num_elemts.value,10) + 1;
    formulario.appendChild(label);
    var newfile = document.createElement('tr');
    newfile.id = 'godzilla';
    var newth = document.createElement('th');
    newth.innerHTML = 'Image:';
    var newtd = document.createElement('td');
    newfile.appendChild(newth);
    newfile.appendChild(newtd);
    newtd.appendChild(inputs[0]);
    newtd.appendChild(inputs[1]);
    newtd.appendChild(inputs[2]);
    $('#'+place.id +" tr:last").after(newfile);

}
function  create_gallery() {
    var inputdata = document.createElement('input');
    inputdata.setAttribute('type','hidden');
    inputdata.id = "datos_galeria";
    inputdata.data = '';
    inputdata.posimg = 0;
    var cont_gallery = document.createElement('div');
    cont_gallery.style.position = 'absolute';
    cont_gallery.style.top = 40 + '%';
    cont_gallery.style.left = 60 + '%';
    cont_gallery.style.backgroundColor = 'red';
    cont_gallery.style.width = 250 + 'px';
    cont_gallery.style.height = 250 + 'px';
    cont_gallery.id = 'cont_gallery';
    cont_gallery.innerHTML = "hola";
    var galeria = document.querySelector('#galeria');

    galeria.appendChild(cont_gallery);
    galeria.appendChild(inputdata);
    var menos = document.createElement('button');
    var mas = document.createElement('button');
    menos.id = 'menos';
    mas.id = 'mas';
    menos.innerHTML = "undo";
    mas.innerHTML = "next";
    galeria.appendChild(menos);
    galeria.appendChild(mas);
    var hidden_img = document.createElement('div');
    hidden_img.id = "hidden_img";
    document.body.appendChild(hidden_img);

}
function show_gallery(data) {
    var hidden_img = document.querySelector('#hidden_img');
    var inputdata = document.querySelector('#datos_galeria');

    /*for(var c = 0; c<data.length;c++)
    {
        hidden_img.setAttribute('src',"/media/" + data[c].image);
        //alert(data[c].image);
    }*/

     $('#mas').on('click',function () {
         var num_img = document.querySelector('#datos_galeria');
         var estado = num_img.posimg;
         estado = estado + 1;
         alert(estado);
         num_img.posimg = estado;
        //alert('algo');
        //var cont_gallery = document.querySelector('#cont_gallery');
        //cont_gallery.style.backgroundImage = '/media/'+ 'post_images/post2-negro_madebylio.jpg';
    //post_images/post2-morado_madebylio.jpg
        $('#test-img').attr('src','/media/'+data[estado].image);
    });
    $('#menos').on('click',function () {
         var num_img = document.querySelector('#datos_galeria');
         var estado = num_img.posimg;
         estado = estado - 1;
         alert(estado);
         num_img.posimg = estado;
        $('#test-img').attr('src','/media/'+data[estado].image);

        //alert('algo');
        //var cont_gallery = document.querySelector('#cont_gallery');
        //cont_gallery.style.background = '/media/'+ 'post_images/post2-negro_madebylio.jpg' ;
    //post_images/post2-morado_madebylio.jpg
    });

}
window.onload = function () {
    $('#show_post').on('click',function()
        {
            $.ajax({
                url : 'showpost', // the endpoint,commonly same url
                type: 'GET', //parece que no es necesario
                data : {},// data sent with the post request
                dataType: 'json',
                // handle a successful response
                success : function(json)
                {          //var datos = JSON.parse(json);
                   var lista = [];
                   var contlista = document.querySelector('#cont-galerias');
                    for(var i=0;i<json.post.length;i++)
                    {
                        lista[i] = document.createElement('div');
                        contlista.appendChild(lista[i]);
                        lista[i].innerHTML = json.post[i].title;
                        lista[i].id = json.post[i].id;

                        (function (kk) {
                            $(lista[kk]).on('click',function () {
                                create_gallery();
                                //alert(json.post[kk].title);
                                $.ajax({
                                        url : 'showimages', // the endpoint,commonly same url
                                        type: 'GET', //parece que no es necesario
                                        data : {id_gallery:lista[kk].id},// data sent with the post request
                                        dataType: 'json',
                                        // handle a successful response
                                        success : function(json)
                                        {          //var datos = JSON.parse(json);
                                          var listaimg = [];
                                           var contlista = document.querySelector('#cont-imagenes');
                                            var objimg = [];
                                            show_gallery(json.imagenes);
                                            //alert(json.imagenes);
                                        /*for(var i=0;i<json.imagenes.length;i++)
                                        {
                                            listaimg[i] = document.createElement('div');
                                            objimg[i] = document.createElement('img');
                                            contlista.appendChild(listaimg[i]);
                                            objimg[i].src = "/media/" +  json.imagenes[i].image;
                                            objimg[i].style.width = 200+'px';
                                            objimg[i].style.height = 200+'px';
                                            objimg[i].style.float = 'left';
                                            listaimg[i].append(objimg[i]);

                                        }*/
                                        //show_gallery(json.imagenes);
                                         //alert(json.elid);




                                                //alert(json.datazones[0][1]['color_zona__file_color']);
                                              //Create and append the option
                                        },


                                        error : function(xhr,errmsg,err)
                                        {
                                            alert('error');
                                        }
                                        });
                            }
                        );
                        })(i);
                    }
                        //alert(json.datazones[0][1]['color_zona__file_color']);
                      //Create and append the option
                },
                error : function(xhr,errmsg,err)
                {
                    alert('error');
                }
                });
        });
    $('#testformset').on('click',function () {
        addItem('#post_form','#post_form input#id_imagegallery_set-TOTAL_FORMS','#aditional-items');
    });

    /*PROBANDO BOTONES DE GALERIA*/

};