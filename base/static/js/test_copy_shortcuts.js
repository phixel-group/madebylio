this.paint_object_with_64images_same_mob = function (path,data,zones)//PINTA PRODUCTOS CON DATOS SOBRE EL TAMAÑO, PRECIO, CANTIDAD ,PERMITE EL USO DE PRODUCTOS CON MULTIPPLES ARCHIVOS (ZONAS,IMG,VIDEO)
    {


        var cont_emuobjects =  document.createElement('div');
        $(cont_emuobjects).css('position','absolute');
        $(cont_emuobjects).css('top','-10000px');
        $(cont_emuobjects).css('background','blue');
        $(cont_emuobjects).css('width','100px');//100px
        $(cont_emuobjects).css('height','100px');//100px
        cont_emuobjects.id = 'cont-emu-objects';//con este id podrmemos manipular en otras funciones este div
        document.querySelector('body').appendChild(cont_emuobjects); //AGREGAMOS EL CONT AL BODY
        //AÑADIMOS EL CADA OBJECT AL CONTENEDOR


         for(var c = 0;c<data.length;c++)
           {
               /*LLENADO DE CONT DE IMAGEN CON OBJECTS SVG O IMG*/
               if(data[c].troquel_producto__editable_troquel == 'YES')//verificamos si el producto es editalble o no
               {
                  this.emuobject_img[c] = create_object_tag_V1('matrix-objectr' + c, 'responsive-img', path + data[c].troquel_producto__file_troquel, 'image/svg+xml', cont_emuobjects);
               }


           }


           //ACTIVAMOS EVENTOS DE CARGA PARA LOS OBJETOS
           var shadow_object = this.emuobject_img;
           var shadow_object2 = this.svg_products;
           var containers  = this.containers;
           var svgobject = []; //ESTA VARIABLE CONTENDRA LOS XML DE CADA OBJECT CREADA ANTERIORMENTE
           var svg = [];//ESTA VARIABLE CONTENDRA LOS XML YA SERIALIZADOS LISTO PARA PASAR A  la MATRIz

         //OBTENEMOS INPUT CON NUESTRAS IMAGENES EN BASE64  #trigg-b64-to-key-dict
        var base64_images = document.querySelector('#trigg-b64-to-key-dict').colorimages;
        var paint_zones = []; //zonas a pintar
        var cantidades_prod = [];
        var precios_prod = [];
        var tamanos_prod = [];
        var info_prod = [];
        var mas_info = [];
        var nombre_prod = [];
        var img_prod = [];
        var video_prod = [];
        var play_video = [];
        var iconplay = [];
       for(var prod = 0; prod<data.length;prod++)
        {

           if(data[prod].prev_producto == 'ZON')// si el producto para mostrar es un svg
           {
               (function (x) {
                $(shadow_object[x]).on('load',function ()
                {
                    svgobject[x] = this.contentDocument;
                    var sss = svgobject[x].querySelectorAll("[id^=click]");
                    for(var ii= 0;ii<sss.length;ii++)
                    {
                        paint_zones = svgobject[x].querySelectorAll('#'+ sss[ii].id.slice(5)+' image');
                        for(var k = 0;k<paint_zones.length;k++)
                        {
                            paint_zones[k].setAttribute('xlink:href',base64_images.get(zones[x][ii]['color_zona__file_color']));
                            paint_zones[k].setAttribute('data-realimage',zones[x][ii]['color_zona__file_color']);//
                            //console.log(base64_images.get(zones[x][ii]['color_zona__file_color']));
                        }
                        //alert(svgobject[x].querySelectorAll('#'+ sss[ii].id.slice(5)+' image').length);
                        //svgobject[x].querySelectorAll('#'+ sss[ii].id.slice(5)+' image').setAttribute('xlink:href',base64_images.get(zones[x][ii]['color_zona__file_color']));
                    }
                    svg[x] = svgobject[x].querySelector('svg');
                    svg[x].style.width = 90+'%';
                    svg[x].style.height = 90+'%';
                     shadow_object2[x].append(svg[x]);
                    shadow_object2[x].id_producto = data[x].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo

                    shadow_object2[x].nombre_producto = data[x].nombre_producto;
                    shadow_object2[x].precio_producto = data[x].precio_producto;
                    shadow_object2[x].tamano_producto = data[x].tamano_producto;
                    shadow_object2[x].prev_producto   = data[x].prev_producto;
                    shadow_object2[x].img_producto   = data[x].img_producto;
                    shadow_object2[x].video_producto   = data[x].video_producto;
                    shadow_object2[x].troquel_producto__file_troquel = data[x].troquel_producto__file_troquel;
                    });
                })(prod);
           }
           else if (data[prod].prev_producto == 'IMG') // si el producto para mostrar es una imagen
           {
                img_prod[prod] = document.createElement('img');
                img_prod[prod].style.width =100+'%';
                img_prod[prod].style.height =100+'%';
                img_prod[prod].style.position ='absolute';
                img_prod[prod].style.top ='0';
                img_prod[prod].style.left ='0';
                img_prod[prod].src = path + data[prod].img_producto;
                /*DEBEMOS DESHABILITAR EL FECTO DE DRAG  EN IMAGENES POR DEFECTO EN CHROME*/
                img_prod[prod].ondragstart = function() { return false;};
                img_prod[prod].setAttribute('draggable','false');
                img_prod[prod].setAttribute('ondragstart','return false;');
                shadow_object2[prod].append(img_prod[prod]);
           }
           else // si el producto para mostrar es un video
           {
                video_prod[c] = document.createElement('video');
                video_prod[c].style.width = '100%';
                video_prod[c].style.height = 'auto';
                video_prod[c].setAttribute('pointer-events','none');//prevenimos eventos disparados por elementos dentro del svg
                //video_prod[c].setAttribute('controls','true'); //los controles nos joden el cursor y eventos para nuestro drag and drop
                video_prod[c].setAttribute('poster','/static/img/mexico.png');
                video_prod[c].src = '/media/'+ data[c].video_producto;
                video_prod[c].src.innerHTML = '<source src="' + '/media/' + data[c].video_producto +'" type="video/mp4">\n' +
                            '<source src="movie.ogg" type="video/ogg">';//

                shadow_object2[c].append(video_prod[c]);

                play_video[c] = document.createElement('div');
                play_video[c].style.width = '35%';
                play_video[c].style.height = '25%';
                play_video[c].style.backgroundColor = 'yellow';
                play_video[c].style.position = 'absolute';
                play_video[c].style.top = '60%';
                play_video[c].style.left = '0%';
                play_video[c].innerHTML = '<svg pointer-events="none" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32"><title></title><path d="M6 4l20 12-20 12z"></path></svg>';
                shadow_object2[c].append(play_video[c]);

                (function (xx) {
                    play_video[xx].addEventListener('touchstart',function () {
                    video_prod[xx].play();
                 });
                 })(c);
           }

           info_prod[x] = document.createElement('div');
                    info_prod[x].style.width = '100%';
                    info_prod[x].style.height = '110%';
                    info_prod[x].style.position = 'absolute';
                    info_prod[x].style.top = '0%';
                    info_prod[x].style.left = '0';
                    info_prod[x].style.display = 'none';
                    info_prod[x].style.backgroundColor = '#ffffff';
                    info_prod[x].style.color =  '#03264b';


                    mas_info[x] = document.createElement('div');
                    mas_info[x].style.width = '100%';
                    mas_info[x].style.height = '20%';
                    mas_info[x].style.position = 'absolute';
                    mas_info[x].style.bottom = '-30%';
                    mas_info[x].style.left = '0';
                    mas_info[x].style.display = 'block';
                    mas_info[x].style.backgroundColor = '#00468b';
                    mas_info[x].style.color =  '#fffce6';
                    mas_info[x].style.textAlign = 'center';
                    mas_info[x].style.borderRadius  = '1%';
                    mas_info[x].innerHTML = data[x].precio_producto + ' ' + getCookie('cambio');
                    mas_info[x].style.fontSize = '0.7vw';
                    mas_info[x].style.borderRadius = '5px';



                    nombre_prod[x] = document.createElement('div');
                    nombre_prod[x].style.fontSize = '0.75vw';
                    nombre_prod[x].style.width = '100%';
                    nombre_prod[x].style.wordBreak = 'break-word';
                    nombre_prod[x].style.hyphens = 'auto';
                    nombre_prod[x].style.textAlign = 'center';
                    nombre_prod[x].innerHTML = 'Nombre'+ '<br>'+'producto';//data[x].nombre_producto;
                    precios_prod[x] = document.createElement('div');
                    precios_prod[x].style.fontSize = '0.7vw';
                    precios_prod[x].style.textAlign = 'center';

                    tamanos_prod[x] = document.createElement('div');
                    tamanos_prod[x].style.width = '25%';

                    tamanos_prod[x].style.height = '21.35%';
                    tamanos_prod[x].style.fontSize = '0.9vw';
                    tamanos_prod[x].style.borderRadius = '80%';
                    tamanos_prod[x].style.padding = '2px';
                    tamanos_prod[x].style.textAlign = 'center';
                     tamanos_prod[x].style.position = 'absolute';
                    tamanos_prod[x].style.left = '0%';
                    tamanos_prod[x].style.top = '80%';
                    tamanos_prod[x].style.backgroundColor = '#00468b';
                    tamanos_prod[x].style.color = 'white';
                    tamanos_prod[x].innerHTML = data[x].tamano_producto;

                    cantidades_prod[x] = document.createElement('div');
                    cantidades_prod[x].style.width = '25%';
                    cantidades_prod[x].style.height = '21.35%';
                    cantidades_prod[x].style.fontSize = '0.7vw';
                    cantidades_prod[x].style.borderRadius = '80%';
                    cantidades_prod[x].style.padding = '2px';
                    cantidades_prod[x].style.textAlign = 'center';
                    cantidades_prod[x].style.position = 'absolute';
                    cantidades_prod[x].style.right = '0%';
                    cantidades_prod[x].style.top = '80%';
                    cantidades_prod[x].style.backgroundColor = '#00468b';
                    cantidades_prod[x].style.color = 'white';
                    cantidades_prod[x].innerHTML = data[x].cantidad_producto +'<span style="font-size: 0.5vw">u</span>';
                    containers[x].append(cantidades_prod[x]);
                    containers[x].appendChild(tamanos_prod[x]);
                    containers[x].appendChild(info_prod[x]);
                    containers[x].appendChild(mas_info[x]);
                    /*mas_info[x].addEventListener('mouseover',function (e) {
                        info_prod[x].style.display = 'block';
                    });
                    mas_info[x].addEventListener('mouseleave',function (e) {
                        info_prod[x].style.display = 'none';
                    });*/
                    //precios_prod[x].style.position = 'absolute';
                    //precios_prod[x].style.top = '0';
                    //precios_prod[x].style.left = '0';
                    precios_prod[x].innerHTML ='$'+ data[x].precio_producto +' '+getCookie('cambio');

                    //alert($(containers).width());
                    shadow_object2[x].style.width = '100%';//
                    shadow_object2[x].style.height = '100%';
        }





        this.emuobject_img = shadow_object;
        this.info_productos = info_prod;
        this.svg_products = shadow_object2;
        this.containers   = containers;
        return this.svg_products; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };


show_prod_menu.addEventListener('load',function (e) {
                show_prod_menu.addEventListener('touchstart',function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (prod_menu.style.display == 'none')
                {
                    prod_menu.style.display = 'block';
                }
                else
                {
                    prod_menu.style.display = 'none';
                }
            },false);
            },false);



            right_arrow.addEventListener('touchstart',function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                var angulo = parseInt(prod_drag.getAttribute('data-angle'),10);
                if(angulo=='360')
                {
                    angulo = 0;
                }
                else
                    {
                    }
                angulo = angulo + 10;
                prod_drag.style.transform = 'rotate('+angulo+'deg)';//
                prod_drag.setAttribute('data-angle',angulo);
                console.log(angulo);
                save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
            });
            left_arrow.addEventListener('touchstart',function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                var angulo = parseInt(prod_drag.getAttribute('data-angle'),10);
                if(angulo=='-360')
                {
                    angulo = 0;
                }
                else
                    {
                    }
                angulo = angulo - 10;
                prod_drag.style.transform = 'rotate('+angulo+'deg)';//
                prod_drag.setAttribute('data-angle',angulo);
                console.log(angulo);
                save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
            });

            same_prod.addEventListener('touchstart',function (e)
                                  {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      var file_troquel = prod_drag.getAttribute('data-troquel'); // obtenemos el nombre del archivo del troquel que fue pulsado
                 //motramos matriz de productos

                                     setTimeout(function () {
                                        $('#same-mob-products').css('display','block');
                                        $('#cancel-mob-same').css('display','block');
                                     },1000);
                                    ajax_show_same_mob_products(same_prod_mob_matrix,file_troquel,prod_drag);
                                  },false);