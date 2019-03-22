/* PROTOTIPANDO FUNCIONES JAVASCRIPT MODULARES PARA EL FUTURO
* var slider = slider || {};
slider =
{
    create_cont: function (where) {
        var cont_img =  document.createElement('div');
        $(cont_img).addClass('cont-slider');
        document.querySelector(where).appendChild(cont_img);
    },
    loadusuario: function () {
        //this.crearusuario();
    }
};
*
* */
var matrix_display_images = function (where_object)//OBJETO QUE MUESTRA IMAGENES EN FORMA DE MATRIZ
{
    this.where = where_object;
    this.emuobject_img = [];
    this.containers = [];
    this.svg_products = [];
    this.shadow_drag = [];//para permitir el drageo de objetos
    this.info_productos = []; // contenedor informacion de productos
    this.charge_containers = function (data,clase) {

        for (var c = 0;c<data.length;c++)
        {
            this.containers[c] = document.createElement('div');
            this.containers[c].className += clase;
            this.svg_products[c] = document.createElement('div');
            this.shadow_drag[c] = document.createElement('div');
            //this.svg_products[c].style.width ='100%';
            //this.svg_products[c].style.height ='100%';
            this.containers[c].appendChild(this.svg_products[c]);
            this.where.appendChild(this.containers[c]);//
        }
    };
    this.paint_object_with_64images = function (path,data,zones)
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
               this.emuobject_img[c] = create_object_tag_V1('matrix-object' + c, 'responsive-img', path + data[c].troquel_producto__file_troquel, 'image/svg+xml', cont_emuobjects);

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
       for(var prod = 0; prod<data.length;prod++)
        {
            //SERIALIZAMOS LOS DATOS DE LOS OBJECTS Y LOS CONDENSAMOS EN LOS DIV DEL SLIDER

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
                    shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);
                    shadow_object2[x].id_producto = data[x].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo

                    shadow_object2[x].nombre = data[x].nombre_producto;
                    shadow_object2[x].precio = data[x].precio_producto;
                    shadow_object2[x].tamano = data[x].tamano_producto;
                    shadow_object2[x].prev   = data[x].prev_producto;
                    shadow_object2[x].img_producto   = data[x].img_producto;
                    shadow_object2[x].video_producto   = data[x].video_producto;
                    //shadow_object2[x].style.borderLeft = '1px solid #00878b';
                    //shadow_object2[x].style.borderRight = '1px solid #00878b';
                    //shadow_object2[x].style.borderTop = '1px solid #00878b';
                    //shadow_object2[x].style.borderRadius = '5px 5px 0px 0px';

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

                    //info_prod[x].appendChild(nombre_prod[x]);
                    //info_prod[x].appendChild(cantidades_prod[x]);
                    //info_prod[x].appendChild(precios_prod[x]);
                    //info_prod[x].appendChild(tamanos_prod[x]);
                    //info_prod[x].appendChild(cantidades_prod[x]);
                    //info_prod[x].appendChild(precios_prod[x]);
                    //info_prod[x].appendChild(tamanos_prod[x]);
                    containers[x].appendChild(cantidades_prod[x]);
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
                    console.log(data[x].tamano_producto);
                    //console.log(data[x].cantidad_producto);



                    if(x===1) {

                        //parseImages(document.querySelector('.cont-prof-photo'));

                    }
                });
            })(prod);

        }
        this.emuobject_img = shadow_object;
        this.info_productos = info_prod;
        this.svg_products = shadow_object2;
        this.containers   = containers;
        return this.svg_products;//RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };
    this.paint_object_with_64images_no_info = function (path,data,zones)//PINTA PRODUCTOS CON DATOS SOBRE EL TAMAÑO, PRECIO, CANTIDAD PERO NO PERMITE EL USO DE PRODUCTOS CON MULTIPPLES ARCHIVOS (ZONAS,IMG,VIDEO)
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
               this.emuobject_img[c] = create_object_tag_V1('matrix-object' + c, 'responsive-img', path + data[c].troquel_producto__file_troquel, 'image/svg+xml', cont_emuobjects);

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
       for(var prod = 0; prod<data.length;prod++)
        {
            //SERIALIZAMOS LOS DATOS DE LOS OBJECTS Y LOS CONDENSAMOS EN LOS DIV DEL SLIDER
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
                    shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);
                    shadow_object2[x].id_producto = data[x].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo
                    shadow_object2[x].nombre = data[x].nombre_producto;
                    shadow_object2[x].precio = data[x].precio_producto;
                    shadow_object2[x].tamano = data[x].tamano_producto;
                    //shadow_object2[x].style.borderLeft = '1px solid #00878b';
                    //shadow_object2[x].style.borderRight = '1px solid #00878b';
                    //shadow_object2[x].style.borderTop = '1px solid #00878b';
                    //shadow_object2[x].style.borderRadius = '5px 5px 0px 0px';

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

                    /*cantidades_prod[x] = document.createElement('div');
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
                    cantidades_prod[x].innerHTML = data[x].cantidad_producto +'<span style="font-size: 0.5vw">u</span>';*/

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

                    /*tamanos_prod[x] = document.createElement('div');
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
                    tamanos_prod[x].innerHTML = data[x].tamano_producto;*/

                    //info_prod[x].appendChild(nombre_prod[x]);
                    //info_prod[x].appendChild(cantidades_prod[x]);
                    //info_prod[x].appendChild(precios_prod[x]);
                    //info_prod[x].appendChild(tamanos_prod[x]);
                    //info_prod[x].appendChild(cantidades_prod[x]);
                    //info_prod[x].appendChild(precios_prod[x]);
                    //info_prod[x].appendChild(tamanos_prod[x]);
                    //containers[x].appendChild(cantidades_prod[x]);
                    //containers[x].appendChild(tamanos_prod[x]);
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
                    console.log(data[x].tamano_producto);
                    //console.log(data[x].cantidad_producto);



                    if(x===1) {

                        //parseImages(document.querySelector('.cont-prof-photo'));

                    }
                });
            })(prod);

        }
        this.emuobject_img = shadow_object;
        this.info_productos = info_prod;
        this.svg_products = shadow_object2;
        this.containers   = containers;
        return this.svg_products; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };
    this.paint_object_with_64images_info_mfile = function (path,data,zones)//PINTA PRODUCTOS CON DATOS SOBRE EL TAMAÑO, PRECIO, CANTIDAD ,PERMITE EL USO DE PRODUCTOS CON MULTIPPLES ARCHIVOS (ZONAS,IMG,VIDEO)
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
            console.log('VALOR: ' + data[prod].video_producto);
            //SERIALIZAMOS LOS DATOS DE LOS OBJECTS Y LOS CONDENSAMOS EN LOS DIV DEL SLIDER
            if(data[prod].troquel_producto__editable_troquel == 'YES')//verificamos si el producto es editalble o no
            {
                console.log('yes');
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
                    if(data[x].prev_producto!='ZON')
                    {
                        //svg[x].style.display = 'none';
                        //svg[x].hidden = true;
                        svg[x].style.opacity = '0';
                    }

                    //check paterns
                    var circ = svg[x].querySelector("g#patrones");
                                    var rayas = svg[x].querySelector("g#patrones2");

                                        if(data[x].pattern_producto=='')//
                                        {
                                            circ.style.display = 'none';//
                                            rayas.style.display = 'none';
                                        }
                                        else if(data[x].pattern_producto=='pat1')
                                        {
                                            circ.style.display = 'inline';
                                            rayas.style.display = 'none';
                                        }
                                        else
                                            {
                                                circ.style.display = 'none';
                                                rayas.style.display = 'inline';
                                            }

                    //shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);
                    shadow_object2[x].append(svg[x]);
                    shadow_object2[x].id_producto = data[x].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo

                    shadow_object2[x].nombre_producto = data[x].nombre_producto;
                    shadow_object2[x].precio_producto = data[x].precio_producto;
                    shadow_object2[x].tamano_producto = data[x].tamano_producto;
                    shadow_object2[x].prev_producto   = data[x].prev_producto;
                    shadow_object2[x].img_producto   = data[x].img_producto;
                    shadow_object2[x].video_producto   = data[x].video_producto;
                    shadow_object2[x].troquel_producto__file_troquel = data[x].troquel_producto__file_troquel;

                    console.log(data[x].nombre_producto + ' ' + data[x].precio_producto + ' '+data[x].tamano_producto + ' '+  data[x].prev_producto + ' ' + data[x].img_producto + data[x].video_producto);

                    if(data[x].img_producto!='null')
                    {
                        img_prod[x] = document.createElement('img');
                        img_prod[x].style.width =100+'%';
                        img_prod[x].style.height =100+'%';
                        img_prod[x].style.position ='absolute';
                        img_prod[x].style.top ='0';
                        img_prod[x].style.left ='0';
                        img_prod[x].src = path + data[x].img_producto;
                        shadow_object2[x].append(img_prod[x]);
                        /*DEBEMOS DESHABILITAR EL FECTO DE DRAG  EN IMAGENES POR DEFECTO EN CHROME*/
                        img_prod[x].ondragstart = function() { return false;};
                        img_prod[x].setAttribute('draggable','false');
                        img_prod[x].setAttribute('ondragstart','return false;');


                    }
                     if(data[x].video_producto!='null')
                    {
                        video_prod[x] = document.createElement('video');
                        video_prod[x].style.width =100+'%';
                        video_prod[x].style.height =100+'%';
                        video_prod[x].style.position ='absolute';
                        video_prod[x].style.top ='0';
                        video_prod[x].style.left ='0';
                        video_prod[x].setAttribute('autoplay','true');
                        video_prod[x].setAttribute('loop','true');
                        //video_prod[x].setAttribute('controls','');
                        //video_prod[x].setAttribute('draggable','true');
                        video_prod[x].innerHTML = '<source src="' + path + data[x].video_producto +'" type="video/mp4">\n' +
                            '  <source src="movie.ogg" type="video/ogg">';

                        play_video[x] = document.createElement('div');
                        play_video[x].style.width = '20%';
                        play_video[x].style.height = '14%';
                        play_video[x].style.backgroundColor = 'yellow';
                        play_video[x].style.position = 'absolute';
                        play_video[x].style.top = '90%';
                        play_video[x].style.left = '0%';
                        play_video[x].style.opacity = '0';
                        play_video[x].innerHTML ='<!-- Generated by IcoMoon.io -->\n' +
                            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32">\n' +
                            '<title>play3</title>\n' +
                            '<path d="M6 4l20 12-20 12z"></path>\n' +
                            '</svg>';
                        //iconplay[x] = document.createElement('p');
                        //iconplay[x].className += "play-icon";
                        //iconplay[x].innerHTML = 'a';
                        shadow_object2[x].append(video_prod[x]);
                        containers[x].append(play_video[x]);
                        //play_video[x].append(iconplay[x]);
                        play_video[x].addEventListener('click',function (e) {
                            //console.log('play');

                            video_prod[x].play();


                        });
                    }
                    //alert(data[x].prev_producto);
                    console.log(x+ ' '+ data[x].prev_producto);
                    switch (data[x].prev_producto)//verificamos cual es el tipo de archivo por defecto
                        {
                            case 'ZON'://creamos objeto que tienen zonas
                                if(img_prod[x])
                                    {
                                        img_prod[x].style.display = 'none';
                                        console.log('svg hay img');
                                    }//
                                if(video_prod[x])
                                    {
                                        video_prod[x].style.display = 'none';
                                        play_video[x].style.display = 'none';
                                        console.log(' svg hay video');
                                    }
                                break;
                            case 'IMG':

                                    if(video_prod[x])
                                    {
                                        video_prod[x].style.display = 'none';
                                        play_video[x].style.display = 'none';
                                        console.log('img ay video');//
                                    }
                                break;
                            case 'VID':
                                    if(img_prod[x])
                                    {
                                        img_prod[x].style.display = 'none';
                                        console.log('video hay img');
                                    }
                                break;
                            default:

                        }
                    //shadow_object2[x].style.borderLeft = '1px solid #00878b';
                    //shadow_object2[x].style.borderRight = '1px solid #00878b';
                    //shadow_object2[x].style.borderTop = '1px solid #00878b';
                    //shadow_object2[x].style.borderRadius = '5px 5px 0px 0px';

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
                    shadow_object2[x].style.width = $(containers).width() + 'px';//
                    shadow_object2[x].style.height = $(containers).height() + 'px';
                });
            })(prod);
            }
            else
            {
                 shadow_object2[prod].id_producto = data[prod].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo

                    shadow_object2[prod].nombre_producto = data[prod].nombre_producto;
                    shadow_object2[prod].precio_producto = data[prod].precio_producto;
                    shadow_object2[prod].tamano_producto = data[prod].tamano_producto;
                    shadow_object2[prod].prev_producto   = data[prod].prev_producto;
                    shadow_object2[prod].img_producto   = data[prod].img_producto;
                    shadow_object2[prod].video_producto   = data[prod].video_producto; //
                    shadow_object2[prod].troquel_producto__file_troquel = data[prod].troquel_producto__file_troquel;


                    if(data[prod].img_producto!='null')
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
                     if(data[prod].video_producto!='null')
                    {
                        video_prod[prod] = document.createElement('video');
                        video_prod[prod].style.width =100+'%';
                        video_prod[prod].style.height =100+'%';
                        video_prod[prod].style.position ='absolute';
                        video_prod[prod].style.top ='0';
                        video_prod[prod].style.left ='0';
                        video_prod[prod].setAttribute('autoplay','true');
                        video_prod[prod].setAttribute('loop','true');
                        //video_prod[x].setAttribute('controls','');
                        //video_prod[prod].setAttribute('draggable','true');
                        video_prod[prod].innerHTML = '<source src="' + path + data[prod].video_producto +'" type="video/mp4">\n' +
                            '  <source src="movie.ogg" type="video/ogg">';

                        play_video[prod] = document.createElement('div');
                        play_video[prod].style.width = '20%';
                        play_video[prod].style.height = '14%';
                        play_video[prod].style.backgroundColor = 'yellow';
                        play_video[prod].style.position = 'absolute';
                        play_video[prod].style.top = '90%';
                        play_video[prod].style.opacity = '0';
                        play_video[prod].style.left = '0%';
                        play_video[prod].innerHTML ='<!-- Generated by IcoMoon.io -->\n' +
                            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32">\n' +
                            '<title>play3</title>\n' +
                            '<path d="M6 4l20 12-20 12z"></path>\n' +
                            '</svg>';
                        //iconplay[x] = document.createElement('p');
                        //iconplay[x].className += "play-icon";
                        //iconplay[x].innerHTML = 'a';
                        shadow_object2[prod].append(video_prod[prod]);
                        containers[prod].append(play_video[prod]);
                        //play_video[x].append(iconplay[x]);
                        (
                            function (xx)
                            {
                                play_video[xx].addEventListener('click',function (e) {
                            //console.log('play');

                            video_prod[xx].play();


                        });
                            }
                        )(prod);

                    }
                    switch (data[prod].prev_producto)//verificamos cual es el tipo de archivo por defecto
                        {
                            case 'ZON'://creamos objeto que tienen zonas
                                if(img_prod[prod])
                                    {
                                        img_prod[prod].style.display = 'none';
                                        console.log('svg hay img');
                                    }//
                                if(video_prod[prod])
                                    {
                                        video_prod[prod].style.display = 'none';
                                        play_video[prod].style.display = 'none';
                                        console.log('svg hay video');
                                    }
                                break;
                            case 'IMG':

                                    if(video_prod[prod])
                                    {
                                        video_prod[prod].style.display = 'none';
                                        play_video[prod].style.display = 'none';
                                        console.log(' img hay video');
                                    }
                                break;
                            case 'VID':
                                    if(img_prod[prod])
                                    {
                                        img_prod[prod].style.display = 'none';
                                        console.log('vid hay img');
                                    }//
                                break;
                            default:

                        }
                    //shadow_object2[x].style.borderLeft = '1px solid #00878b';
                    //shadow_object2[x].style.borderRight = '1px solid #00878b';
                    //shadow_object2[x].style.borderTop = '1px solid #00878b';
                    //shadow_object2[x].style.borderRadius = '5px 5px 0px 0px';

                    info_prod[prod] = document.createElement('div');
                    info_prod[prod].style.width = '100%';
                    info_prod[prod].style.height = '110%';
                    info_prod[prod].style.position = 'absolute';
                    info_prod[prod].style.top = '0%';
                    info_prod[prod].style.left = '0';
                    info_prod[prod].style.display = 'none';
                    info_prod[prod].style.backgroundColor = '#ffffff';
                    info_prod[prod].style.color =  '#03264b';


                    mas_info[prod] = document.createElement('div');
                    mas_info[prod].style.width = '100%';
                    mas_info[prod].style.height = '20%';
                    mas_info[prod].style.position = 'absolute';
                    mas_info[prod].style.bottom = '-30%';
                    mas_info[prod].style.left = '0';
                    mas_info[prod].style.display = 'block';
                    mas_info[prod].style.backgroundColor = '#00468b';
                    mas_info[prod].style.color =  '#fffce6';
                    mas_info[prod].style.textAlign = 'center';
                    mas_info[prod].style.borderRadius  = '1%';
                    mas_info[prod].innerHTML = data[prod].precio_producto + ' ' + getCookie('cambio');
                    mas_info[prod].style.fontSize = '0.7vw';
                    mas_info[prod].style.borderRadius = '5px';



                    nombre_prod[prod] = document.createElement('div');
                    nombre_prod[prod].style.fontSize = '0.75vw';
                    nombre_prod[prod].style.width = '100%';
                    nombre_prod[prod].style.wordBreak = 'break-word';
                    nombre_prod[prod].style.hyphens = 'auto';
                    nombre_prod[prod].style.textAlign = 'center';
                    nombre_prod[prod].innerHTML = 'Nombre'+ '<br>'+'producto';//data[x].nombre_producto;
                    precios_prod[prod] = document.createElement('div');
                    precios_prod[prod].style.fontSize = '0.7vw';
                    precios_prod[prod].style.textAlign = 'center';


                    containers[prod].appendChild(info_prod[prod]);
                    containers[prod].appendChild(mas_info[prod]);
                    /*mas_info[x].addEventListener('mouseover',function (e) {
                        info_prod[x].style.display = 'block';
                    });
                    mas_info[x].addEventListener('mouseleave',function (e) {
                        info_prod[x].style.display = 'none';
                    });*/
                    //precios_prod[x].style.position = 'absolute';
                    //precios_prod[x].style.top = '0';
                    //precios_prod[x].style.left = '0';
                    precios_prod[prod].innerHTML ='$'+ data[prod].precio_producto +' '+getCookie('cambio');



                    shadow_object2[prod].style.width = $(containers).width() + 'px';//
                    shadow_object2[prod].style.height = $(containers).height() + 'px';
                    //shadow_object2[prod].ondragstart = function() { return false; };
            }
                //shadow_object2[prod].style.cursor = 'move';//
            console.log('hhh');
        }





        this.emuobject_img = shadow_object;
        this.info_productos = info_prod;
        this.svg_products = shadow_object2;
        this.containers   = containers;
        return this.svg_products; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER

    };

    this.paint_object_with_64images_noinfo_mfile = function (path,data,zones)//PINTA PRODUCTOS CON DATOS SOBRE EL TAMAÑO, PRECIO, CANTIDAD ,PERMITE EL USO DE PRODUCTOS CON MULTIPPLES ARCHIVOS (ZONAS,IMG,VIDEO)
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

            //SERIALIZAMOS LOS DATOS DE LOS OBJECTS Y LOS CONDENSAMOS EN LOS DIV DEL SLIDER
            if(data[prod].troquel_producto__editable_troquel == 'YES')//verificamos si el producto es editalble o no
            {
                console.log('yes');
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
                    if(data[x].prev_producto!='ZON')
                    {
                        //svg[x].style.display = 'none';
                        //svg[x].hidden = true;
                        svg[x].style.opacity = '0';
                    }
                    //shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);
                    shadow_object2[x].append(svg[x]);
                    shadow_object2[x].id_producto = data[x].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo

                    shadow_object2[x].nombre_producto = data[x].nombre_producto;
                    shadow_object2[x].precio_producto = data[x].precio_producto;
                    shadow_object2[x].tamano_producto = data[x].tamano_producto;
                    shadow_object2[x].prev_producto   = data[x].prev_producto;
                    shadow_object2[x].pattern_producto   = data[x].pattern_producto;
                    //check paterns
                    var circ = svg[x].querySelector("g#patrones");
                                    var rayas = svg[x].querySelector("g#patrones2");

                                        if(data[x].pattern_producto=='')//
                                        {
                                            circ.style.display = 'none';
                                            rayas.style.display = 'none';
                                        }
                                        else if(data[x].pattern_producto=='pat1')
                                        {
                                            circ.style.display = 'inline';
                                            rayas.style.display = 'none';
                                        }
                                        else
                                            {
                                                circ.style.display = 'none';
                                                rayas.style.display = 'inline';
                                            }
                    console.log('paa a '+shadow_object2[x].pattern_producto);
                    shadow_object2[x].img_producto   = data[x].img_producto;
                    shadow_object2[x].video_producto   = data[x].video_producto;
                    shadow_object2[x].troquel_producto__file_troquel = data[x].troquel_producto__file_troquel;

                    console.log(data[x].nombre_producto + ' ' + data[x].precio_producto + ' '+data[x].tamano_producto + ' '+  data[x].prev_producto + ' ' + data[x].img_producto + data[x].video_producto + ' pattern: '  + data[x].pattern_producto);

                    if(data[x].img_producto!='null')
                    {
                        img_prod[x] = document.createElement('img');
                        img_prod[x].style.width =100+'%';
                        img_prod[x].style.height =100+'%';
                        img_prod[x].style.position ='absolute';
                        img_prod[x].style.top ='0';
                        img_prod[x].style.left ='0';
                        img_prod[x].src = path + data[x].img_producto;
                        shadow_object2[x].append(img_prod[x]);
                        /*DEBEMOS DESHABILITAR EL FECTO DE DRAG  EN IMAGENES POR DEFECTO EN CHROME*/
                        img_prod[x].ondragstart = function() { return false;};
                        img_prod[x].setAttribute('draggable','false');
                        img_prod[x].setAttribute('ondragstart','return false;');


                    }
                     if(data[x].video_producto!='null')
                    {
                        video_prod[x] = document.createElement('video');
                        video_prod[x].style.width =100+'%';
                        video_prod[x].style.height =100+'%';
                        video_prod[x].style.position ='absolute';
                        video_prod[x].style.top ='0';
                        video_prod[x].style.left ='0';
                        video_prod[x].setAttribute('autoplay','true');
                        video_prod[x].setAttribute('loop','true');
                        //video_prod[x].setAttribute('controls','');
                        //video_prod[x].setAttribute('draggable','true');
                        video_prod[x].innerHTML = '<source src="' + path + data[x].video_producto +'" type="video/mp4">\n' +
                            '  <source src="movie.ogg" type="video/ogg">';

                        play_video[x] = document.createElement('div');
                        play_video[x].style.width = '20%';
                        play_video[x].style.height = '14%';
                        play_video[x].style.backgroundColor = 'yellow';
                        play_video[x].style.position = 'absolute';
                        play_video[x].style.opacity = '0';
                        play_video[x].style.top = '90%';
                        play_video[x].style.left = '0%';
                        play_video[x].innerHTML ='<!-- Generated by IcoMoon.io -->\n' +
                            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32">\n' +
                            '<title>play3</title>\n' +
                            '<path d="M6 4l20 12-20 12z"></path>\n' +
                            '</svg>';
                        //iconplay[x] = document.createElement('p');
                        //iconplay[x].className += "play-icon";
                        //iconplay[x].innerHTML = 'a';
                        shadow_object2[x].append(video_prod[x]);
                        containers[x].append(play_video[x]);
                        //play_video[x].append(iconplay[x]);
                        play_video[x].addEventListener('touchstart',function (e) {
                            //console.log('play');
                            e.preventDefault();
                            e.stopPropagation();
                            video_prod[x].play();


                        });
                    }
                    //alert(data[x].prev_producto);
                    console.log(x+ ' '+ data[x].prev_producto);
                    switch (data[x].prev_producto)//verificamos cual es el tipo de archivo por defecto
                        {
                            case 'ZON'://creamos objeto que tienen zonas
                                if(img_prod[x])
                                    {
                                        img_prod[x].style.display = 'none';
                                        console.log('svg hay img');
                                    }//
                                if(video_prod[x])
                                    {
                                        video_prod[x].style.display = 'none';
                                        play_video[x].style.display = 'none';
                                        console.log(' svg hay video');
                                    }
                                break;
                            case 'IMG':

                                    if(video_prod[x])
                                    {
                                        video_prod[x].style.display = 'none';
                                        play_video[x].style.display = 'none';
                                        console.log('img ay video');//
                                    }
                                break;
                            case 'VID':
                                    if(img_prod[x])
                                    {
                                        img_prod[x].style.display = 'none';
                                        console.log('video hay img');
                                    }
                                break;
                            default:

                        }
                    //shadow_object2[x].style.borderLeft = '1px solid #00878b';
                    //shadow_object2[x].style.borderRight = '1px solid #00878b';
                    //shadow_object2[x].style.borderTop = '1px solid #00878b';
                    //shadow_object2[x].style.borderRadius = '5px 5px 0px 0px';

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
                });
            })(prod);
            }
            else
            {
                 shadow_object2[prod].id_producto =       data[prod].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo
                 shadow_object2[prod].nombre_producto =   data[prod].nombre_producto;
                 shadow_object2[prod].precio_producto =   data[prod].precio_producto;
                 shadow_object2[prod].tamano_producto  =  data[prod].tamano_producto;
                 shadow_object2[prod].pattern_producto   = data[prod].pattern_producto;
                 shadow_object2[prod].prev_producto    =  data[prod].prev_producto;
                 shadow_object2[prod].img_producto     =  data[prod].img_producto;
                 shadow_object2[prod].video_producto   =  data[prod].video_producto; //
                 shadow_object2[prod].troquel_producto__file_troquel = data[prod].troquel_producto__file_troquel;


                    if(data[prod].img_producto!='null')
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
                     if(data[prod].video_producto!='null')
                    {
                        video_prod[prod] = document.createElement('video');
                        video_prod[prod].style.width =100+'%';
                        video_prod[prod].style.height =100+'%';
                        video_prod[prod].style.position ='absolute';
                        video_prod[prod].style.top ='0';
                        video_prod[prod].style.left ='0';
                        video_prod[prod].setAttribute('autoplay','true');
                        //video_prod[x].setAttribute('controls','');
                        //video_prod[prod].setAttribute('draggable','true');
                        video_prod[prod].innerHTML = '<source src="' + path + data[prod].video_producto +'" type="video/mp4">\n' +
                            '  <source src="movie.ogg" type="video/ogg">';

                        play_video[prod] = document.createElement('div');
                        play_video[prod].style.width = '20%';
                        play_video[prod].style.height = '14%';
                        play_video[prod].style.backgroundColor = 'yellow';
                        play_video[prod].style.position = 'absolute';
                        play_video[prod].style.opacity = '0';
                        play_video[prod].style.top = '90%';
                        play_video[prod].style.left = '0%';
                        play_video[prod].innerHTML ='<!-- Generated by IcoMoon.io -->\n' +
                            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32">\n' +
                            '<title>play3</title>\n' +
                            '<path d="M6 4l20 12-20 12z"></path>\n' +
                            '</svg>';
                        //iconplay[x] = document.createElement('p');
                        //iconplay[x].className += "play-icon";
                        //iconplay[x].innerHTML = 'a';
                        shadow_object2[prod].append(video_prod[prod]);
                        containers[prod].append(play_video[prod]);
                        //play_video[x].append(iconplay[x]);
                        (
                            function (xx)
                            {
                                play_video[xx].addEventListener('click',function (e) {
                            //console.log('play');

                            video_prod[xx].play();


                        });
                            }
                        )(prod);

                    }
                    switch (data[prod].prev_producto)//verificamos cual es el tipo de archivo por defecto
                        {
                            case 'ZON'://creamos objeto que tienen zonas
                                if(img_prod[prod])
                                    {
                                        img_prod[prod].style.display = 'none';
                                        console.log('svg hay img');
                                    }//
                                if(video_prod[prod])
                                    {
                                        video_prod[prod].style.display = 'none';
                                        play_video[prod].style.display = 'none';
                                        console.log('svg hay video');
                                    }
                                break;
                            case 'IMG':

                                    if(video_prod[prod])
                                    {
                                        video_prod[prod].style.display = 'none';
                                        play_video[prod].style.display = 'none';
                                        console.log(' img hay video');
                                    }
                                break;
                            case 'VID':
                                    if(img_prod[prod])
                                    {
                                        img_prod[prod].style.display = 'none';
                                        console.log('vid hay img');
                                    }//
                                break;
                            default:

                        }
                    //shadow_object2[x].style.borderLeft = '1px solid #00878b';
                    //shadow_object2[x].style.borderRight = '1px solid #00878b';
                    //shadow_object2[x].style.borderTop = '1px solid #00878b';
                    //shadow_object2[x].style.borderRadius = '5px 5px 0px 0px';

                    info_prod[prod] = document.createElement('div');
                    info_prod[prod].style.width = '100%';
                    info_prod[prod].style.height = '110%';
                    info_prod[prod].style.position = 'absolute';
                    info_prod[prod].style.top = '0%';
                    info_prod[prod].style.left = '0';
                    info_prod[prod].style.display = 'none';
                    info_prod[prod].style.backgroundColor = '#ffffff';
                    info_prod[prod].style.color =  '#03264b';


                    mas_info[prod] = document.createElement('div');
                    mas_info[prod].style.width = '100%';
                    mas_info[prod].style.height = '20%';
                    mas_info[prod].style.position = 'absolute';
                    mas_info[prod].style.bottom = '-30%';
                    mas_info[prod].style.left = '0';
                    mas_info[prod].style.display = 'block';
                    mas_info[prod].style.backgroundColor = '#00468b';
                    mas_info[prod].style.color =  '#fffce6';
                    mas_info[prod].style.textAlign = 'center';
                    mas_info[prod].style.borderRadius  = '1%';
                    mas_info[prod].innerHTML = data[prod].precio_producto + ' ' + getCookie('cambio');
                    mas_info[prod].style.fontSize = '0.7vw';
                    mas_info[prod].style.borderRadius = '5px';



                    nombre_prod[prod] = document.createElement('div');
                    nombre_prod[prod].style.fontSize = '0.75vw';
                    nombre_prod[prod].style.width = '100%';
                    nombre_prod[prod].style.wordBreak = 'break-word';
                    nombre_prod[prod].style.hyphens = 'auto';
                    nombre_prod[prod].style.textAlign = 'center';
                    nombre_prod[prod].innerHTML = 'Nombre'+ '<br>'+'producto';//data[x].nombre_producto;
                    precios_prod[prod] = document.createElement('div');
                    precios_prod[prod].style.fontSize = '0.7vw';
                    precios_prod[prod].style.textAlign = 'center';

                    tamanos_prod[prod] = document.createElement('div');
                    tamanos_prod[prod].style.width = '25%';
                    tamanos_prod[prod].style.height = '21.35%';
                    tamanos_prod[prod].style.fontSize = '0.9vw';
                    tamanos_prod[prod].style.borderRadius = '80%';
                    tamanos_prod[prod].style.padding = '2px';
                    tamanos_prod[prod].style.textAlign = 'center';
                     tamanos_prod[prod].style.position = 'absolute';
                    tamanos_prod[prod].style.left = '0%';
                    tamanos_prod[prod].style.top = '80%';
                    tamanos_prod[prod].style.backgroundColor = '#00468b';
                    tamanos_prod[prod].style.color = 'white';
                    tamanos_prod[prod].innerHTML = data[prod].tamano_producto;

                    cantidades_prod[prod] = document.createElement('div');
                    cantidades_prod[prod].style.width = '25%';
                    cantidades_prod[prod].style.height = '21.35%';
                    cantidades_prod[prod].style.fontSize = '0.7vw';
                    cantidades_prod[prod].style.borderRadius = '80%';
                    cantidades_prod[prod].style.padding = '2px';
                    cantidades_prod[prod].style.textAlign = 'center';
                    cantidades_prod[prod].style.position = 'absolute';
                    cantidades_prod[prod].style.right = '0%';
                    cantidades_prod[prod].style.top = '80%';
                    cantidades_prod[prod].style.backgroundColor = '#00468b';
                    cantidades_prod[prod].style.color = 'white';
                    cantidades_prod[prod].innerHTML = data[prod].cantidad_producto +'<span style="font-size: 0.5vw">u</span>';
                    containers[prod].append(cantidades_prod[prod]);

                    containers[prod].appendChild(tamanos_prod[prod]);
                    containers[prod].appendChild(info_prod[prod]);
                    containers[prod].appendChild(mas_info[prod]);
                    /*mas_info[x].addEventListener('mouseover',function (e) {
                        info_prod[x].style.display = 'block';
                    });
                    mas_info[x].addEventListener('mouseleave',function (e) {
                        info_prod[x].style.display = 'none';
                    });*/
                    //precios_prod[x].style.position = 'absolute';
                    //precios_prod[x].style.top = '0';
                    //precios_prod[x].style.left = '0';
                    precios_prod[prod].innerHTML ='$'+ data[prod].precio_producto +' '+getCookie('cambio');



                    shadow_object2[prod].style.width = $(containers).width() + 'px';//
                    shadow_object2[prod].style.height = $(containers).height() + 'px';
                    //shadow_object2[prod].ondragstart = function() { return false; };
            }
                //shadow_object2[prod].style.cursor = 'move';//
            //alert(prod);//
        }





        this.emuobject_img = shadow_object;
        this.info_productos = info_prod;
        this.svg_products = shadow_object2;
        this.containers   = containers;
        return this.svg_products; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };

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
                video_prod[prod] = document.createElement('video');
                video_prod[prod].style.width = '100%';
                video_prod[prod].style.height = 'auto';
                video_prod[prod].setAttribute('pointer-events','none');//prevenimos eventos disparados por elementos dentro del svg
                //video_prod[c].setAttribute('controls','true'); //los controles nos joden el cursor y eventos para nuestro drag and drop
                video_prod[prod].setAttribute('poster','/static/img/mexico.png');
                video_prod[prod].src = '/media/'+ data[prod].video_producto;
                video_prod[prod].src.innerHTML = '<source src="' + '/media/' + data[prod].video_producto +'" type="video/mp4">\n' +
                            '<source src="movie.ogg" type="video/ogg">';//

                shadow_object2[prod].append(video_prod[prod]);

                play_video[prod] = document.createElement('div');
                play_video[prod].style.width = '35%';
                play_video[prod].style.height = '25%';
                play_video[prod].style.backgroundColor = 'yellow';
                play_video[prod].style.position = 'absolute';
                play_video[prod].style.top = '40%';
                play_video[prod].style.left = '103%';
                play_video[prod].innerHTML = '<svg pointer-events="none" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32"><title></title><path d="M6 4l20 12-20 12z"></path></svg>';
                shadow_object2[prod].append(play_video[prod]);

                (function (xx) {
                    play_video[xx].addEventListener('touchstart',function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        alert('play');
                        video_prod[xx].play();
                 },false);
                 })(prod);
           }


                    shadow_object2[prod].nombre_producto = data[prod].nombre_producto;
                    shadow_object2[prod].precio_producto = data[prod].precio_producto;
                    shadow_object2[prod].tamano_producto = data[prod].tamano_producto;
                    shadow_object2[prod].prev_producto   = data[prod].prev_producto;
                    shadow_object2[prod].img_producto   =  data[prod].img_producto;
                    shadow_object2[prod].video_producto   = data[prod].video_producto;
                    shadow_object2[prod].troquel_producto__file_troquel = data[prod].troquel_producto__file_troquel;

                    info_prod[prod] = document.createElement('div');
                    info_prod[prod].style.width = '100%';
                    info_prod[prod].style.height = '110%';
                    info_prod[prod].style.position = 'absolute';
                    info_prod[prod].style.top = '0%';
                    info_prod[prod].style.left = '0';
                    info_prod[prod].style.display = 'none';
                    info_prod[prod].style.backgroundColor = '#ffffff';
                    info_prod[prod].style.color =  '#03264b';//


                    mas_info[prod] = document.createElement('div');
                    mas_info[prod].style.width = '100%';
                    mas_info[prod].style.height = '20%';
                    mas_info[prod].style.position = 'absolute';
                    mas_info[prod].style.bottom = '-30%';
                    mas_info[prod].style.left = '0';
                    mas_info[prod].style.display = 'block';
                    mas_info[prod].style.backgroundColor = '#00468b';
                    mas_info[prod].style.color =  '#fffce6';
                    mas_info[prod].style.textAlign = 'center';
                    mas_info[prod].style.borderRadius  = '1%';
                    mas_info[prod].innerHTML = data[prod].precio_producto + ' ' + getCookie('cambio');
                    mas_info[prod].style.fontSize = '2vw';
                    mas_info[prod].style.borderRadius = '5px';



                    nombre_prod[prod] = document.createElement('div');
                    nombre_prod[prod].style.fontSize = '2vw';
                    nombre_prod[prod].style.width = '100%';
                    nombre_prod[prod].style.wordBreak = 'break-word';
                    nombre_prod[prod].style.hyphens = 'auto';
                    nombre_prod[prod].style.textAlign = 'center';
                    nombre_prod[prod].innerHTML = 'Nombre'+ '<br>'+'producto';//data[x].nombre_producto;
                    precios_prod[prod] = document.createElement('div');
                    precios_prod[prod].style.fontSize = '1.6vw';
                    precios_prod[prod].style.textAlign = 'center';

                    tamanos_prod[prod] = document.createElement('div');
                    tamanos_prod[prod].style.width = '25%';

                    tamanos_prod[prod].style.height = '21.35%';//
                    tamanos_prod[prod].style.fontSize = '3vw';
                    tamanos_prod[prod].style.borderRadius = '80%';
                    tamanos_prod[prod].style.padding = '2px';
                    tamanos_prod[prod].style.textAlign = 'center';
                     tamanos_prod[prod].style.position = 'absolute';
                    tamanos_prod[prod].style.left = '0%';
                    tamanos_prod[prod].style.top = '80%';
                    tamanos_prod[prod].style.backgroundColor = '#00468b';
                    tamanos_prod[prod].style.color = 'white';
                    tamanos_prod[prod].innerHTML = data[prod].tamano_producto;

                    cantidades_prod[prod] = document.createElement('div');
                    cantidades_prod[prod].style.width = '25%';
                    cantidades_prod[prod].style.height = '21.35%';
                    cantidades_prod[prod].style.fontSize = '2.5vw';
                    cantidades_prod[prod].style.borderRadius = '80%';
                    cantidades_prod[prod].style.padding = '2px';
                    cantidades_prod[prod].style.textAlign = 'center';
                    cantidades_prod[prod].style.position = 'absolute';
                    cantidades_prod[prod].style.right = '0%';
                    cantidades_prod[prod].style.top = '80%';
                    cantidades_prod[prod].style.backgroundColor = '#00468b';
                    cantidades_prod[prod].style.color = 'white';
                    cantidades_prod[prod].innerHTML = data[prod].cantidad_producto +'<span style="font-size: 0.5vw">u</span>';
                    containers[prod].append(cantidades_prod[prod]);
                    containers[prod].appendChild(tamanos_prod[prod]);
                    containers[prod].appendChild(info_prod[prod]);
                    containers[prod].appendChild(mas_info[prod]);
                    /*mas_info[x].addEventListener('mouseover',function (e) {
                        info_prod[x].style.display = 'block';
                    });
                    mas_info[x].addEventListener('mouseleave',function (e) {
                        info_prod[x].style.display = 'none';
                    });*/
                    //precios_prod[x].style.position = 'absolute';
                    //precios_prod[x].style.top = '0';
                    //precios_prod[x].style.left = '0';
                    precios_prod[prod].innerHTML = data[prod].precio_producto +' '+getCookie('cambio');

                    //alert($(containers).width());
                    shadow_object2[prod].style.width = '100%';//
                    shadow_object2[prod].style.height = '100%';
        }





        this.emuobject_img = shadow_object;
        this.info_productos = info_prod;
        this.svg_products = shadow_object2;
        this.containers   = containers;
        return this.svg_products; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };
    this.clear_matrix = function () {
        if(this.containers)
        {
            this.where.innerHTML = '';
        }
        else
        {

        }

    };
    this.activate_pretty_mouseover = function () {
        for (var containers = 0; containers<this.containers.length;containers++)
        {
            this.containers[containers].addEventListener('mouseenter',function (e) {
            this.style.backgroundColor = '#c4e4df';
            //console.log('cambio');
            },false);
            this.containers[containers].addEventListener('mouseleave',function (e) {
            this.style.backgroundColor = 'transparent';
            //console.log('cambio');
            },false);
        }

    };

    this.show_information = function(){
        var p_info = [];
        var p_svgproducts = [];
        p_info = this.info_productos;
        p_svgproducts = this.svg_products;
        for (var infos = 0; infos<this.info_productos.length;infos++)
        {
            (function (x) {
                p_svgproducts[x].addEventListener('mouseover',function(e)
                {
                    p_info[x].style.display = 'block';
                });
            })(infos);

        }
        this.info_productos = p_info;
        this.svg_products = p_svgproducts;
    }
};
var same_prod_matrix = new matrix_display_images(document.querySelector('#same-products'));
var same_prod_mob_matrix = new matrix_display_images(document.querySelector('#same-mob-products'));
  function create_prod_menu_btns(cont_producto,iter,find_same_prod)
                              {
                                  var contra_clockwise = document.createElement('img');//en contra de las manecillas
                                  var clockwise = document.createElement('img');

                                  var same_products = document.createElement('img');

                                  var change_prev = document.createElement('div');
                                  var input  = document.querySelector('#info-productos');

                                  var hijos = cont_producto.firstChild.childNodes;

                                  var show_menu = document.createElement('img');
                                  var play_video;



                                  if(cont_producto.firstChild.querySelector('svg'))
                                          {
                                              //alert('asdad');
                                              var svg_btn = document.createElement('img');
                                              svg_btn.src = '/static/img/png/svg.png';
                                              svg_btn.style.position = 'relative';
                                              //svg_btn.style.float = 'left';
                                              svg_btn.style.width = '10%';
                                              svg_btn.style.height = 'auto';
                                              svg_btn.classList.add('previsual-svg'+String(iter));
                                              change_prev.append(svg_btn);
                                              svg_btn.onclick = function()
                                              {
                                                 //hijos[0].style.display = 'block';
                                                 // hijos[0].hidden = false;
                                                 // hijos[0].style.opacity = '1';
                                                 //hijos[1].style.display = 'none';
                                                 //hijos[2].style.display = 'none';

                                                 if(cont_producto.firstChild.querySelector('svg'))
                                                 {
                                                     cont_producto.firstChild.querySelector('svg').style.opacity = '1';
                                                 }
                                                 if(cont_producto.firstChild.querySelector('img'))
                                                 {
                                                     cont_producto.firstChild.querySelector('img').style.display= 'none';
                                                 }
                                                 if(cont_producto.firstChild.querySelector('video'))
                                                 {
                                                     cont_producto.firstChild.querySelector('video').style.display= 'none';
                                                      cont_producto.querySelector('div[id^=play-video]').style.display = 'none';
                                                 }
                                                 save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                                              }

                                          }

                                  if (cont_producto.firstChild.querySelector('img'))
                                      {
                                            //alert('asdad');
                                              var img_btn = document.createElement('img');
                                              img_btn.src = '/static/img/png/camera.png';
                                              img_btn.style.position = 'relative';
                                              //img_btn.style.float = 'left';
                                              img_btn.style.width = '10%';
                                              img_btn.style.height = 'auto';
                                              img_btn.classList.add('previsual-img'+String(iter));
                                              change_prev.append(img_btn);
                                              img_btn.onclick = function()
                                              {
                                                 if(cont_producto.firstChild.querySelector('svg'))
                                                 {
                                                     cont_producto.firstChild.querySelector('svg').style.opacity = '0';
                                                 }
                                                 if(cont_producto.firstChild.querySelector('img'))
                                                 {
                                                     cont_producto.firstChild.querySelector('img').style.display= 'block';
                                                 }
                                                 if(cont_producto.firstChild.querySelector('video'))
                                                 {
                                                     cont_producto.firstChild.querySelector('video').style.display= 'none';
                                                     cont_producto.querySelector('div[id^=play-video]').style.display = 'none';
                                                 }
                                                 save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                                              };
                                      }



                                   if (cont_producto.firstChild.querySelector('video'))
                                      {
                                            //alert('asdad');
                                             //creamos btn PLAY
                                              play_video = document.createElement('div');
                                              play_video.id = 'play-video'+ iter;
                                                play_video.style.width = '20%';
                                                play_video.style.height = '14%';
                                                play_video.style.backgroundColor = 'yellow';
                                                play_video.style.position = 'absolute';
                                                play_video.style.top = '85%';
                                                play_video.style.left = '0%';

                                                play_video.style.opacity = '0';
                                                play_video.innerHTML ='<!-- Generated by IcoMoon.io -->\n' +
                                                    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32">\n' +
                                                    '<title>play3</title>\n' +
                                                    '<path d="M6 4l20 12-20 12z"></path>\n' +
                                                    '</svg>';
                                                //iconplay[x] = document.createElement('p');
                                                //iconplay[x].className += "play-icon";
                                                //iconplay[x].innerHTML = 'a';
                                                //PREGUNTAMOS SI ESTA VISIBLE EL VIDEO Y EN ESE CCASO MOSTRAMOS EL BOTON DE PLAY DE LO CONTRARIO NO
                                                if(cont_producto.firstChild.querySelector('video').style.display == 'none')
                                                {
                                                    play_video.style.display = 'none';
                                                }
                                                else
                                                {
                                                    play_video.style.display = 'block';
                                                }
                                                cont_producto.append(play_video);
                                                //play_video[x].append(iconplay[x]);
                                                play_video.addEventListener('click',function (e) {
                                                    //console.log('play');

                                                    cont_producto.firstChild.querySelector('video').play();


                                                });
                                              var vid_btn = document.createElement('img');
                                              vid_btn.src = '/static/img/png/video.png';
                                              vid_btn.style.position = 'relative';
                                              //vid_btn.style.float = 'left';
                                              vid_btn.style.width = '10%';
                                              vid_btn.style.height = 'auto';
                                               vid_btn.classList.add('previsual-video'+String(iter));
                                               change_prev.append(vid_btn);
                                              vid_btn.onclick = function()
                                              {
                                                 if(cont_producto.firstChild.querySelector('svg'))
                                                 {
                                                     cont_producto.firstChild.querySelector('svg').style.opacity = '0';
                                                 }
                                                 if(cont_producto.firstChild.querySelector('img'))
                                                 {
                                                     cont_producto.firstChild.querySelector('img').style.display= 'none';
                                                 }
                                                 if(cont_producto.firstChild.querySelector('video'))
                                                 {
                                                     cont_producto.firstChild.querySelector('video').style.display= 'block';
                                                     play_video.style.display = 'block';//
                                                 }
                                                 save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                                              };
                                      }

                                  //var input = document.querySelector('#')

                                  clockwise.style.position = 'relative';
                                  clockwise.style.display = 'block';
                                  //clockwise.style.bottom = '-20%';
                                  //clockwise.style.right = '0';
                                  //clockwise.style.float = 'left';
                                  clockwise.style.width = '15%';
                                  clockwise.style.height = 'auto';
                                  clockwise.style.backgroundColor = 'white';
                                  clockwise.style.borderRadius = '50%';
                                  clockwise.style.transform = 'scale(-1)';
                                  clockwise.src = '/static/img/left_rot.png';

                                  contra_clockwise.style.position = 'relative';
                                  contra_clockwise.style.display = 'block';
                                  //contra_clockwise.style.bottom = '-20%';
                                  //contra_clockwise.style.left = '0%';
                                  //contra_clockwise.style.float = 'left';
                                  contra_clockwise.style.width = '15%';
                                  contra_clockwise.style.height = 'auto';
                                  contra_clockwise.style.borderRadius = '50%';
                                  contra_clockwise.style.backgroundColor = 'white';
                                  contra_clockwise.src = '/static/img/left_rot.png';

                                  same_products.style.position = 'relative';
                                  same_products.style.width = 15+'%';
                                  same_products.style.height = 'auto';
                                  //same_products.style.float = 'left';

                                  same_products.src = "/static/img/png/productos/botones/change_product.png";
                                  //same_products.id = 'same-productos' + input.drop_products;
                                  same_products.style.display = 'block';


                                  change_prev.style.width = '100%';
                                  change_prev.id = 'change_prev' + iter;
                                  change_prev.style.height = '20%';
                                  change_prev.style.top = '100%';
                                  change_prev.style.left = '0';
                                  change_prev.style.position = 'absolute';
                                  change_prev.style.backgroundColor = 'blue';
                                  change_prev.style.display = 'none';
                                  change_prev.style.borderRadius = '5px';
                                  change_prev.style.border = '1px solid #ECECEC';
                                  change_prev.style.backgroundColor = '#ECECEC';
                                  change_prev.style.flexDirection = 'row';
                                  change_prev.style.justifyContent = 'space-around';
                                  change_prev.style.alignItems = 'center';
                                  change_prev.estado = 'oculto';

                                  change_prev.append(same_products);
                                  var timeprodmenu;
                                  //ACTIVAMOS EVENTO MOUSEOVER PARA NUESTROS PRODUCTOS DRAGEADOS
                                  cont_producto.firstChild.onmouseover = function (e)
                                  {
                                      clearTimeout(timeprodmenu);
                                      change_prev.style.display = 'flex';
                                      change_prev.estado = 'visible';

                                  };

                                  cont_producto.firstChild.onmouseleave =function(e)
                                  {

                                      timeprodmenu =  setTimeout(function () {
                                          change_prev.style.display = 'none';
                                          change_prev.estado = 'oculto';
                                      },1500);
                                  };


                                  show_menu.onclick = function () {
                                      change_prev.style.display = 'flex';
                                      change_prev.estado = 'visible';
                                      /*if(change_prev.estado === 'oculto')
                                      {
                                          change_prev.style.display = 'flex';
                                          change_prev.estado = 'visible';
                                      }
                                      else
                                      {
                                          change_prev.style.display = 'none';
                                          change_prev.estado = 'oculto';
                                      }*/
                                      setTimeout(function () {
                                          change_prev.style.display = 'none';
                                          change_prev.estado = 'oculto';
                                      },1500);

                                  };

                                  show_menu.src = '/static/img/show.png';
                                  show_menu.id = 'show_menu' + iter;

                                  show_menu.style.position = 'absolute';
                                  //img_btn.style.float = 'left';
                                  show_menu.style.width = '20%';
                                  show_menu.style.height = 'auto';
                                  show_menu.style.right = '0';
                                  show_menu.style.top = '0';
                                  show_menu.style.opacity = '0';


                                  clockwise.addEventListener("click",function () {
                                        var angulo = parseInt(cont_producto.firstChild.getAttribute('data-angle'),10);
                                        if(angulo=='360')
                                        {
                                            angulo = 0;
                                        }
                                        else
                                        {

                                        }
                                        angulo = angulo + 10;
                                        cont_producto.firstChild.style.transform = 'rotate('+angulo+'deg)';//
                                        cont_producto.firstChild.setAttribute('data-angle',angulo);
                                        console.log(angulo);
                                        save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                                    },false);

                                  contra_clockwise.addEventListener('click',function () {
                                        var angulo = parseInt(cont_producto.firstChild.getAttribute('data-angle'),10);
                                        if(angulo=='-360')
                                        {
                                            angulo = 0;
                                        }
                                        else
                                        {

                                        }
                                        angulo = angulo - 10;
                                        cont_producto.firstChild.style.transform = 'rotate('+angulo+'deg)';//
                                        cont_producto.firstChild.setAttribute('data-angle',angulo);
                                        console.log(angulo);
                                        save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                                    },false);

                                  same_products.onclick = function ()
                                  {
                                      var file_troquel = cont_producto.firstChild.getAttribute('data-troquel'); // obtenemos el nombre del archivo del troquel que fue pulsado
                 //motramos matriz de productos

                                     setTimeout(function () {
                                        $('#back-prod-options').css('display','block');
                                        $('#same-products').css('display','block');
                                        $('#cancel-matrix-options').css('display','block');
                                     },500);
                                    ajax_show_same_products(find_same_prod,file_troquel,cont_producto.firstChild);
                                  };
                                  change_prev.append(clockwise);
                                  change_prev.append(contra_clockwise);
                                  cont_producto.append(show_menu);
                                  cont_producto.append(change_prev);

                              }
function place_board_drag_product(clon,offsetX,offsetY,tablero,mouseX,mouseY,previous_width,previous_height)//posicionar producto que ya esta en el tablero
{
    var cont_tablero = document.querySelector('#cont-productos-cont-drag-drop');
    var corx = mouseX - offsetX - cont_tablero.getBoundingClientRect().left + cont_tablero.scrollLeft;
    var cory = mouseY - offsetY - cont_tablero.getBoundingClientRect().top + cont_tablero.scrollTop;

    console.log(corx + ' ' + cory);

    clon.style.left = 0;//redefinimos para que quede exacamente en la pos de su contenedor
    clon.style.top = 0;//redefinimos para que quede
    // exacamente en la pos de su contenedor

    //truco para cambiar el clon del body al tablero
    var fragment = document.createDocumentFragment();
    fragment.append(clon.parentNode);//

    clon.parentNode.style.width = previous_width;
    clon.parentNode.style.height = previous_height;
    clon.parentNode.style.left = corx +'px';
    clon.parentNode.style.top = cory +'px';
    //console.log(clon.nombre_producto + ' '+ clon.precio_producto + ' '+ clon.tamano_producto + ' '+  clon.prev_producto +' ' + clon.img_producto + ' ' + clon.video_producto);//
                                  //DEFINIMOS LAS COORDENADAS DE UBICACION PARA NUESTRO PRODUCTO (CLON)

    tablero.appendChild(fragment);
    return clon.parentNode;
}
function activate_product_drag(clon,iter)//activamos evento drag and drop del producto drag
{
    var cont_tablero = document.querySelector('#productos-cont-dragdrop');
    var input = document.querySelector('#info-productos');
    var cont_clon; //variable que contendra nuestro producto para dragear
    var prod_viewport = document.querySelector('#desktop-product');//viewport de productos
    clon.onmousedown = function (event)
                {
                    var shiftX = event.clientX - this.parentNode.getBoundingClientRect().left; //getbounding nos da la posicion relativa al viewport y e.clientx es la posicion relativa del mouse respecto al viewport
                    var shiftY = event.clientY - this.parentNode.getBoundingClientRect().top;
                    //alert('x '+ shiftX + ' y '+ shiftY);
                    //this.style.position = 'absolute';
                    //this.style.zIndex = 1000;
                    cont_clon = this.parentNode.cloneNode(true);
                    console.log($(this.parentNode).position().left);
                    //BORRAMOS EL MENU Y LA IMAGEN QUE YA EXISTIAN  DEL CLON ANTERIOR!!!
                    var hijos_contenedor1 = cont_clon.querySelector('#show_menu'+iter);
                    var hijos_contenedor2 = cont_clon.querySelector('#change_prev'+iter);
                    hijos_contenedor1.remove();
                    hijos_contenedor2.remove();

                    cont_clon.querySelector('div[id^=play-video]').remove();




                    //alert(100*(this.clientWidth/window.innerWidth));
                    var previous_width = clon.parentNode.style.width;
                    var previous_height = clon.parentNode.style.height;
                    cont_clon.style.width = 100*(this.clientWidth/window.innerWidth) +'%';
                    cont_clon.style.height = 100*(this.clientHeight/window.innerHeight) +'%';//debemos sacar de nuevo el tamaño por que como ahora el clon va a estar en el body cambia el tamaño
                    //TRANSFERIMOS TODOS LOS DATOS DEL PRODUCTO HACIA EL CLON

                    this.parentNode.style.display = 'none';//desaparecemos miestras drageamos
                    cont_clon.firstChild.id_producto = this.id_producto;
                    cont_clon.firstChild.nombre_producto = this.nombre_producto;
                    cont_clon.firstChild.precio_producto = this.precio_producto;
                    cont_clon.firstChild.tamano_producto = this.tamano_producto;
                    cont_clon.firstChild.prev_producto = this.prev_producto;
                    cont_clon.firstChild.img_producto = this.img_producto;
                    cont_clon.firstChild.video_producto = this.video_producto;
                    cont_clon.firstChild.troquel_producto__file_troquel = this.troquel_producto__file_troquel;


                    //clon_producto[x].style.top = '100px';
                    //clon_producto[x].style.left = '300px';
                    prod_viewport.appendChild(cont_clon);
                    moveAt(event.clientX, event.clientY);


                      function moveAt(pageX, pageY) {
                          cont_clon.style.left = pageX - shiftX + 'px';
                          cont_clon.style.top = pageY - shiftY + 'px';
                          //console.log(pageX + ' ' + pageY);
                      }

                      function onMouseMove(event) {
                            moveAt(event.clientX, event.clientY);
                            cont_clon.hidden = true;
                            var elemBelow = document.elementFromPoint(event.clientX, event.clientY).parentNode;
                            var elementbellow = document.elementFromPoint(event.clientX, event.clientY);
                            cont_clon.hidden = false;
                            console.log(cont_clon);
                            console.log(elemBelow.id + ' ' + elemBelow.id.substr(0, 14) + ' ' + elementbellow.id);
                            //if (!elemBelow) return;
                            if (elemBelow.id == 'productos-cont-dragdrop' || elemBelow.id.substr(0, 14) == 'drop-productos')
                              {
                                  cont_clon.classList.add('tablero');
                                  cont_clon.classList.remove('nada');
                                  cont_clon.classList.remove('papelera');

                              }
                            else if(elementbellow.id == 'productos-cont-trash')
                              {
                                  console.log('papelera');
                                  cont_clon.classList.add('papelera');
                                  cont_clon.classList.remove('nada');
                                  cont_clon.classList.remove('tablero');
                              }
                              else
                              {
                                  cont_clon.classList.add('nada');
                                  cont_clon.classList.remove('tablero');
                                  cont_clon.classList.remove('papelera');
                              }
                            //console.log(elemBelow);
                            //console.log(droppableBelow);
                      }

                      // (3) move the ball on mousemove
                      document.addEventListener('mousemove', onMouseMove);

                      // (4) drop the ball, remove unneeded handlers


                      cont_clon.onmouseup = function(e) {

                          document.removeEventListener('mousemove', onMouseMove);
                          cont_clon.onmouseup = null;//borramos el evento mouse up y mouse move
                          var adentro = this.classList.contains('tablero');
                          var afuera = this.classList.contains('nada');
                          var papelera = this.classList.contains('papelera');
                          //alert('se movio');
                          if(adentro) {
                              //evaluamos si en realidad el objeto esta dentro del tablero
                              var t_cont_tablero = document.querySelector('#cont-productos-cont-drag-drop');
                              var corx = e.clientX - shiftX - cont_tablero.getBoundingClientRect().left + cont_tablero.scrollLeft;
                              var cory = e.clientY - shiftY - t_cont_tablero.getBoundingClientRect().top + t_cont_tablero.scrollTop;
                              var escala = parseInt(document.querySelector('#productos-cont-dragdrop').getAttribute('data-escala'),10);
                              var t_tablero_w = t_cont_tablero.clientWidth * escala;
                              var t_tablero_h = t_cont_tablero.clientHeight * escala;
                              console.log(t_tablero_w + ' ' + t_tablero_h + ' '+ corx+ ' ' + cory);
                              if (corx < 0 || cory < 0 || corx>= t_tablero_w|| cory>=t_tablero_h)
                              {
                                  cont_clon.remove();
                                  clon.parentNode.style.display = 'block';
                              }
                              else
                              {
                                  clon.parentNode.remove();
                                  place_board_drag_product(cont_clon.firstChild,shiftX,shiftY,cont_tablero,e.clientX,e.clientY,previous_width,previous_height);
                              //falta crear los botones de menu para productos
                                  activate_product_drag(cont_clon.firstChild,iter);
                                  create_prod_menu_btns(cont_clon, iter,same_prod_matrix);//as
                                  //guardamos tablero
                                   save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                              }

                          }
                          else if (papelera)
                          {
                              clon.parentNode.remove();
                               alert(clon.id);
                              delete_file_productos('#subtotal_productos tbody',[clon.nombre_producto,clon.id,1]);
                              //guardamos tabla y tablero
                              save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                          }
                          else if(afuera)
                          {
                                cont_clon.remove();
                                clon.parentNode.style.display = 'block';
                          }
                          else
                          {

                          }

                      };
                }
}

function activate_product_dragV2(clon,iter)//activamos evento drag and drop del producto drag
{
    var cont_tablero = document.querySelector('#productos-cont-dragdrop');
    var cont_drag = document.querySelector('#cont-productos-cont-drag-drop');
    var input = document.querySelector('#info-productos');
    var cont_clon; //variable que contendra nuestro producto para dragear
    var prod_viewport = document.querySelector('#desktop-product');//viewport de productos
    var lastposX = $(clon.parentNode).position().left;
    var lastposY = $(clon.parentNode).position().top;

    clon.onmouseover = function (e)
    {

    };

    clon.onmousedown = function (event)
                {
                    var shiftX = event.clientX - this.parentNode.getBoundingClientRect().left; //getbounding nos da la posicion relativa al viewport y e.clientx es la posicion relativa del mouse respecto al viewport
                    var shiftY = event.clientY - this.parentNode.getBoundingClientRect().top;


                    //alert('x '+ shiftX + ' y '+ shiftY);
                    //this.style.position = 'absolute';
                    //this.style.zIndex = 1000;
                    //var poscontenedorX = ;//posicion antes de dragear de nuestro producto en el tablero
                    console.log(this.parentNode.getBoundingClientRect().left);
                    cont_clon = clon.parentNode;
                    console.log(cont_clon);
                    //BORRAMOS EL MENU Y LA IMAGEN QUE YA EXISTIAN  DEL CLON ANTERIOR!!!
                    var hijos_contenedor1 = cont_clon.querySelector('#show_menu'+iter);
                    var hijos_contenedor2 = cont_clon.querySelector('#change_prev'+iter);
                    //cont_clon.childNodes[2].remove();//removemos el boton play
                    hijos_contenedor1.remove();
                    hijos_contenedor2.remove();




                    //alert(100*(this.clientWidth/window.innerWidth));

                    //TRANSFERIMOS TODOS LOS DATOS DEL PRODUCTO HACIA EL CLON

                    //clon_producto[x].style.top = '100px';
                    //clon_producto[x].style.left = '300px';
                    //prod_viewport.appendChild(cont_clon);
                    moveAt(event.clientX, event.clientY);


                      function moveAt(pageX, pageY) {
                          cont_clon.style.left = pageX - cont_drag.getBoundingClientRect().left - shiftX +cont_drag.scrollLeft+ 'px';
                          cont_clon.style.top = pageY - cont_drag.getBoundingClientRect().top - shiftY + cont_drag.scrollTop +'px';
                          cont_clon.parentNode.appendChild(cont_clon);
                          //console.log(pageX + ' ' + pageY);
                      }

                      function onMouseMove(event) {
                            moveAt(event.clientX, event.clientY);
                            cont_clon.hidden = true;
                            var elemBelow = document.elementFromPoint(event.clientX, event.clientY).parentNode;
                            var elementbellow = document.elementFromPoint(event.clientX, event.clientY);
                            cont_clon.hidden = false;
                            console.log(cont_clon);
                            console.log(elemBelow.id + ' ' + elemBelow.id.substr(0, 14) + ' ' + elementbellow.id);
                            //if (!elemBelow) return;
                            if (elemBelow.id == 'productos-cont-dragdrop' || elemBelow.id.substr(0, 14) == 'drop-productos')
                              {
                                  cont_clon.classList.add('tablero');
                                  cont_clon.classList.remove('nada');
                                  cont_clon.classList.remove('papelera');

                              }
                            else if(elementbellow.id == 'productos-cont-trash')
                              {
                                  console.log('papelera');
                                  document.removeEventListener('mousemove', onMouseMove);
                                  cont_clon.onmouseup = null;//borramos el evento mouse up y mouse move
                                  cont_clon.classList.add('papelera');
                                  cont_clon.classList.remove('nada');
                                  cont_clon.classList.remove('tablero');
                                  //alert(clon.id);
                              delete_file_productos('#subtotal_productos tbody',[clon.nombre_producto,clon.id,1]);
                              //guardamos tabla y tablero
                              save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                              }
                              else
                              {
                                  cont_clon.classList.add('nada');
                                  cont_clon.classList.remove('tablero');
                                  cont_clon.classList.remove('papelera');
                              }
                            //console.log(elemBelow);
                            //console.log(droppableBelow);
                      }

                      // (3) move the ball on mousemove
                      document.addEventListener('mousemove', onMouseMove);

                      // (4) drop the ball, remove unneeded handlers


                      cont_clon.onmouseup = function(e) {

                          document.removeEventListener('mousemove', onMouseMove);
                          cont_clon.onmouseup = null;//borramos el evento mouse up y mouse move
                          var adentro = this.classList.contains('tablero');
                          var afuera = this.classList.contains('nada');
                          var papelera = this.classList.contains('papelera');
                          //alert('se movio');
                          if(adentro) {
                              //evaluamos si en realidad el objeto esta dentro del tablero
                              var t_cont_tablero = document.querySelector('#cont-productos-cont-drag-drop');
                              var corx = e.clientX - shiftX - t_cont_tablero.getBoundingClientRect().left + t_cont_tablero.scrollLeft;
                              var cory = e.clientY - shiftY - t_cont_tablero.getBoundingClientRect().top + t_cont_tablero.scrollTop;
                              var escala = parseInt(document.querySelector('#productos-cont-dragdrop').getAttribute('data-escala'),10);
                              var t_tablero_w = t_cont_tablero.clientWidth * escala;
                              var t_tablero_h = t_cont_tablero.clientHeight * escala;
                              console.log(t_tablero_w + ' ' + t_tablero_h + ' '+ corx+ ' ' + cory);
                              if (corx < 0 || cory < 0 || corx>= t_tablero_w|| cory>=t_tablero_h)
                              {
                                  cont_clon.style.left = lastposX +'px';
                                  cont_clon.style.top  = lastposY +'px';
                                  cont_clon.parentNode.appendChild(cont_clon);
                                  activate_product_dragV2(cont_clon.firstChild,iter);
                                  create_prod_menu_btns(cont_clon, iter,same_prod_matrix);//as
                                  //guardamos tablero
                                   save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                              }
                              else
                              {
                              //falta crear los botones de menu para productos
                                  activate_product_dragV2(cont_clon.firstChild,iter);
                                  create_prod_menu_btns(cont_clon, iter,same_prod_matrix);//as
                                  //guardamos tablero
                                   save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                              }

                          }
                          else if (papelera)
                          {
                               //alert(clon.id);
                              delete_file_productos('#subtotal_productos tbody',[clon.nombre_producto,clon.id,1]);
                              //guardamos tabla y tablero
                              save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                          }
                          else if(afuera)
                          {
                              cont_clon.style.left = lastposX +'px';
                              cont_clon.style.top  = lastposY +'px';
                              activate_product_dragV2(cont_clon.firstChild,iter);
                                  create_prod_menu_btns(cont_clon, iter,same_prod_matrix);//as
                                  //guardamos tablero
                                   save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
                          }
                          else
                          {

                          }

                      };
                }
}
function create_prod_table(clon_producto)
{
                                  var input = document.querySelector('#info-productos'); // input que guarda la info de los productos drageados

                                  create_file_productos('#subtotal_productos tbody',[clon_producto.id_producto,clon_producto.nombre_producto,clon_producto.precio_producto,1,'#cantidad'+input.filas,clon_producto.tamano_producto]);
                                    create_subtotal_productos();
                                    input.drop_products++;
                                    /*AUMENTAMOS EN EL 1 EL NUMERO DE PRODUCTOS*/

}
function set_size_prod(contenedor,producto)
                              {
                                  //reajustamos el tamaño de nuestro producto que fue arrastrado
                                  producto.style.width = '100%';
                                  producto.style.height = '100%';
                                  producto.style.position = "relative";
                                  switch(producto.tamano_producto) {
                                    case 1:
                                        contenedor.style.width = (1.9) + '%';
                                        contenedor.style.height = (4) + '%';
                                        console.log('tamano 1');
                                        break;
                                    case 2:
                                        contenedor.style.width = (3.333333) + '%';
                                        contenedor.style.height = (6) + '%';
                                        break;//
                                    case 3:
                                        contenedor.style.width = (3.333333) + '%';
                                        contenedor.style.height = (6) + '%';
                                        break;
                                    case 4:
                                        contenedor.style.width = (3.333333) + '%';
                                        contenedor.style.height = (6) + '%';
                                        break;
                                    case 5:
                                        contenedor.style.width = (20) + '%';
                                        contenedor.style.height = (50) + '%';
                                        break;
                                    case 6:
                                        contenedor.style.width = (23.52) + '%';
                                        contenedor.style.height = (60) + '%';
                                        break;
                                    case 7:
                                        contenedor.style.width = (31.66) + '%';///
                                        contenedor.style.height = (70) + '%';
                                        console.log('tamano 7');
                                        break;
                                    default:

                                }
                              }
function create_prod_inboard(mouseX,mouseY,clon,offsetX,offsetY,iter)
                              {
                                   //calculamos la coordenada donde debe estar ubicado el producto
                                  var cont_tablero = document.querySelector('#productos-cont-dragdrop');
                                  var corx = mouseX - offsetX -cont_tablero.getBoundingClientRect().left + cont_tablero.scrollLeft;
                                  var cory = mouseY - offsetY -cont_tablero.getBoundingClientRect().top + cont_tablero.scrollTop;
                                  clon.id = 'drop-productos'+iter;
                                  clon.style.left = 0;//redefinimos para que quede exacamente en la pos de su contenedor
                                  clon.style.top = 0;//redefinimos para que quede
                                  clon.style.position = 'relative';
                                  // exacamente en la pos de su contenedor

                                  //ESTABLECEMOS LOS ATRIBUTOS QUE NECESITA NUESTRO PRODUCTO PARA FUNCIONAR CON COOKIES
                                  clon.setAttribute('data-fromto','papelera');
                                  clon.setAttribute('data-nombre',clon.nombre_producto);
                                  clon.setAttribute('data-idproducto',clon.id_producto);
                                  clon.setAttribute('data-precio',clon.precio_producto);
                                  clon.setAttribute('data-tamano',clon.tamano_producto);
                                  clon.setAttribute('data-angle','0');
                                  clon.setAttribute('data-troquel',clon.troquel_producto__file_troquel);
                                  clon.setAttribute('data-img_producto',clon.img_producto);
                                  clon.setAttribute('data-video_producto',clon.video_producto);
                                  //truco para cambiar el clon del body al tablero
                                  var fragment = document.createDocumentFragment();
                                  fragment.append(clon);

                                  var cont_producto = document.createElement('div');

                                  cont_producto.id = 'cont-productos'+iter;
                                  cont_producto.style.position = 'absolute';
                                  cont_producto.style.left = corx +'px';
                                  cont_producto.style.top = cory +'px';
                                  //console.log(clon.nombre_producto + ' '+ clon.precio_producto + ' '+ clon.tamano_producto + ' '+  clon.prev_producto +' ' + clon.img_producto + ' ' + clon.video_producto);//
                                  //DEFINIMOS LAS COORDENADAS DE UBICACION PARA NUESTRO PRODUCTO (CLON)

                                  cont_producto.appendChild(fragment);
                                  cont_tablero.append(cont_producto);

                                  return cont_producto;
                              }
function convertImgToBase64URL(url, callback, outputFormat,posicion){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load',function(e){
        var canvas = document.createElement('canvas');
          canvas.width = 333;
          canvas.height = 333;
          // draw the loaded image
          canvas.getContext('2d').drawImage(this, 0, 0);
          var dataURL = canvas.toDataURL();
        //dataURL =  dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        callback(dataURL,posicion);
        //canvas = null;
    });
    var href = url;
    img.src = href + (href.indexOf('?') > -1 ? + '&1': '?1');
}

function IterativeImgToBase64URL(url, callback,posicion,total){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.addEventListener('load',function(e){
        var canvas = document.createElement('canvas');
          canvas.width = 333;
          canvas.height = 333;
          // draw the loaded image
          canvas.getContext('2d').drawImage(this, 0, 0);
          var dataURL = canvas.toDataURL();
        //dataURL =  dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        callback(dataURL,posicion,total);
        //canvas = null;
    });
    var href = url;
    img.src = href + (href.indexOf('?') > -1 ? + '&1': '?1');
}

//aplicacion drag and drop
var drag_and_drop = function () {

    this.set_drag_object = function (who,data,group,dictionary,x,y)
    {
        for(var c = 0; c<who.length;c++)//detectamos cuantos objetos seran dragables
        {
            (function (x)
                {
                    //alert(who.length);
                    who[x].setAttribute('draggable','true');

                    who[x].addEventListener("dragstart",function (e)
                    {
                        e.dataTransfer.setData("Text", e.target.innerHTML); //capturamos el contenido del objeto draggable
                        e.dataTransfer.dropEffect = "copy"; //aparece imagen cuando se comienza a dragar
                        e.dataTransfer.setDragImage(e.target, x,y);

                        for (var cc = 0; cc < dictionary.length; cc++)
                        {
                            e.dataTransfer.setData(dictionary[cc],data[x][dictionary[cc]]);//extraemos los datos del producto a partir del diccionario
                        }

                        e.dataTransfer.setData('group',group); //pasamos  al objeto el grupo ala que pertenece
                    },false);
            })(c);
        }
    };
    this.deactivate_drag_and_drop = function (who) {
        var img;
        for(var c = 0; c<who.length;c++)//detectamos cuantos objetos seran dragables
        {
            who[c].ondragstart = function () {
                return false;
            };
            img = who[c].querySelector('img');
            if(img)
            {
                img.ondragstart = function () {
                return false;
            };
            }
        }
    };
    this.activate_mouse_down = function (who) {
        var clon_producto = [];
        var content_product = [];//contenedor del dropproduct0...n
        var input = document.querySelector('#info-productos');
        var prod_viewport = document.querySelector('#desktop-product');//viewport de productos
        for(var c = 0; c<who.length;c++)//detectamos cuantos objetos seran dragables
        {

            (function (x)
            {
                who[x].onmousedown = function (event)
                {
                    var shiftX = event.clientX - this.getBoundingClientRect().left; //getbounding nos da la posicion relativa al viewport y e.clientx es la posicion relativa del mouse respecto al viewport
                    var shiftY = event.clientY - this.getBoundingClientRect().top;
                    //alert('x '+ shiftX + ' y '+ shiftY);
                    this.style.position = 'absolute';
                    //this.style.zIndex = 1000;

                    clon_producto[x] = who[x].cloneNode(true);

                    //TRANSFERIMOS TODOS LOS DATOS DEL PRODUCTO HACIA EL CLON
                    clon_producto[x].id_producto = who[x].id_producto;
                    clon_producto[x].nombre_producto = who[x].nombre_producto;
                    clon_producto[x].precio_producto = who[x].precio_producto;
                    clon_producto[x].tamano_producto = who[x].tamano_producto;
                    clon_producto[x].prev_producto = who[x].prev_producto;
                    clon_producto[x].img_producto = who[x].img_producto;
                    clon_producto[x].video_producto = who[x].video_producto;
                    clon_producto[x].troquel_producto__file_troquel = who[x].troquel_producto__file_troquel;


                    //clon_producto[x].style.top = '100px';
                    //clon_producto[x].style.left = '300px';
                    prod_viewport.appendChild(clon_producto[x]);
                    moveAt(event.clientX, event.clientY);

                      // centers the ball at (pageX, pageY) coordinates
                      function moveAt(pageX, pageY) {
                          clon_producto[x].style.left = pageX - shiftX + 'px';
                          clon_producto[x].style.top = pageY - shiftY + 'px';
                          //console.log(pageX + ' ' + pageY);
                      }

                      function onMouseMove(event) {
                            moveAt(event.clientX, event.clientY);
                            clon_producto[x].hidden = true;
                            var elemBelow = document.elementFromPoint(event.clientX, event.clientY).parentNode;
                            clon_producto[x].hidden = false;
                            if (!elemBelow) return;
                            var droppableBelow = elemBelow.closest('#grid-background');
                            if (elemBelow.id == 'productos-cont-dragdrop' || elemBelow.id.substr(0, 14) == 'drop-productos')
                              {
                                  clon_producto[x].classList.add("dropeable");
                              }
                            else
                              {
                                  clon_producto[x].classList.remove("dropeable");
                              }
                            //console.log(elemBelow);
                            //console.log(droppableBelow);
                      }

                      // (3) move the ball on mousemove
                      document.addEventListener('mousemove', onMouseMove);

                      // (4) drop the ball, remove unneeded handlers


                      clon_producto[x].onmouseup = function(e) {

                          document.removeEventListener('mousemove', onMouseMove);
                          clon_producto[x].onmouseup = null;//borramos el evento mouse up y mouse move
                          var can_drop = clon_producto[x].classList.contains('dropeable');


                          //VERIFICAMOS SI EL PRODUCTO ESTA EN UNA ZONA DROOPEABLE
                          if (can_drop)
                          {
                              console.log('yes');

                               content_product[x] = create_prod_inboard(e.clientX,e.clientY,clon_producto[x],shiftX,shiftY,input.drop_products);//
                               clon_producto[x].style.cursor = 'auto';//desactivamos el curso en modo move para dar la sensacion de drop
                              set_size_prod(content_product[x],clon_producto[x]);
                              create_prod_table(clon_producto[x]);
                              activate_product_dragV2(clon_producto[x],input.drop_products-1);
                              create_prod_menu_btns(content_product[x],input.drop_products-1,same_prod_matrix);

                              //guardamos el tablero
                               save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);


                          } 
                          else
                          {
                              console.log('no');
                              clon_producto[x].remove();
                          }
                        //clon_producto[x].hidden = false;
                        //if (!elemBelow2) return;


                      };
                }
            })(c);

        }
    };
    this.set_drag_canvas = function (who,data,group,dictionary,x,y)
    {
        var svg_drag = [];
        for(var c = 0; c<who.length;c++)//detectamos cuantos objetos seran dragables
        {
            (function (x)
                {
                    svg_drag[x] = who[x];
                    svg_drag[x].setAttribute('draggable','true');

                    svg_drag[x].addEventListener("dragstart",function (e)
                    {
                        e.dataTransfer.setData("Text", e.target.innerHTML); //capturamos el contenido del objeto draggable
                        e.dataTransfer.dropEffect = "copy"; //aparece imagen cuando se comienza a dragar
                        e.dataTransfer.setDragImage(e.target, x,y);

                        for (var cc = 0; cc < dictionary.length; cc++)
                        {
                            e.dataTransfer.setData(dictionary[cc],data[x][dictionary[cc]]);//extraemos los datos del producto a partir del diccionario
                        }
                        e.dataTransfer.setData('group',group); //pasamos  al objeto el grupo ala que pertenece
                    },false);
            })(c);
        }
    };
    this.set_drop_object = function (who,group,functions) {
           var algo = new functions();
           who.addEventListener("drop",function(e){e.preventDefault();algo(e,group)},false);
           who.addEventListener("dragover",function (e) {e.preventDefault(); e.dataTransfer.dropEffect = "move"},false);

    }
};


var slider = function (where,object) {
   //Elementos del constructor
    var ownobject = this; // instacia que obtiene el mismo objeto
   this.where = where;//en que div vamos a ubicar la galeria
    this.objeto = object;
   this.posslider = 0; //posicion del slider
   this.num_moves = 0;//numero de de movimientos hacia la derecha o izq sin quedarse sin espacios

   //FUNCIONES

   this.create_cont = function ()
   {
       this.cont_img =  document.createElement('div'); //NUESTRO CONTENEDOR DE IMAGENES
       this.cont = document.createElement('div'); //CONTENEDOR QUE CONTIENE TODO IMAGENES Y FLECHAS
       $(this.cont).addClass('cont-cont-slider');
       $(this.cont_img).addClass('cont-slider');
       document.querySelector(this.where).appendChild(this.cont);
       this.cont.appendChild(this.cont_img);// esto es para eliminar problema de flechas invisibles por overflow hidden

       //FLECHA IZQ
       this.left_arrow = document.createElement('img');
       this.left_arrow.src = '/static/img/svg/productos/slider-arrow.svg';
       $(this.left_arrow).addClass('left-arrow');
       document.querySelector(this.where).appendChild(this.left_arrow);
       this.left_arrow.addEventListener("click",function (e) {
                   ownobject.moveleft();
            },false);
       //FLECHA DERECHA
       this.right_arrow = document.createElement('img');
       this.right_arrow.src = '/static/img/svg/productos/slider-arrow.svg';
       $(this.right_arrow).addClass('right-arrow');
       document.querySelector(this.where).appendChild(this.right_arrow);
       this.right_arrow.addEventListener("click",function (e) {
                   ownobject.moveright();
            },false);
   };
    this.create_cont_with_object = function ()
   {
       this.cont_img =  document.createElement('div'); //NUESTRO CONTENEDOR DE IMAGENES
       this.cont = document.createElement('div'); //CONTENEDOR QUE CONTIENE TODO IMAGENES Y FLECHAS
       $(this.cont).addClass('cont-cont-slider');
       $(this.cont_img).addClass('cont-slider');
       this.objeto.appendChild(this.cont);
       this.cont.appendChild(this.cont_img);// esto es para eliminar problema de flechas invisibles por overflow hidden

       //FLECHA IZQ
       this.left_arrow = document.createElement('img');
       this.left_arrow.src = '/static/img/svg/productos/slider-arrow.svg';
       $(this.left_arrow).addClass('left-arrow');
       this.objeto.appendChild(this.left_arrow);
       this.left_arrow.addEventListener("click",function (e) {
                   ownobject.moveleft();
            },false);
       //FLECHA DERECHA
       this.right_arrow = document.createElement('img');
       this.right_arrow.src = '/static/img/svg/productos/slider-arrow.svg';
       $(this.right_arrow).addClass('right-arrow');
       this.objeto.appendChild(this.right_arrow);
       this.right_arrow.addEventListener("click",function (e) {
                   ownobject.moveright();
            },false);
   };
   this.chargeobjects = function (data,width,how_many,clase) { //CARGAR CONTENEDORES PARA CADA IMAGEN
       this.cont_object =  [];//contenedor de los object de los svg o image
       this.object_img      =  [];//object que contenedra imagenes o svg del slider
       this.local_width = width;

       if(width*how_many <= 100)
       {
           this.separation = (100 -(width*how_many))/(how_many+ 1);
           this.num_moves = data.length - how_many;
           for(var c = 0;c<data.length;c++)
           {
               /*CREACION Y ESTILOS PARA EL CONTENEDOR DE LA IMAGEN*/
               //----------------------------------------------------
               this.cont_object[c] = document.createElement('div');
               $(this.cont_object[c]).css('width',width + '%');
               $(this.cont_object[c]).css('left', (c*width)+((c+1)*this.separation) +'%');
               this.cont_img.appendChild(this.cont_object[c]);
               //----------------------------------------------------
           }
       $(this.cont_object).addClass(clase);
       }
       else
       {
           alert('redefine dimensiones porfavor!!');
       }


   };

   this.dump_pure_object = function (path,data)
   {
       for(var c = 0;c<data.length;c++)
       {
           /*LLENADO DE CONT DE IMAGEN CON OBJECTS SVG O IMG*/
           this.object_img[c] = create_object_tag_V1('sliderimg' + c, 'responsive-img-auto', path + data[c]['image'], 'image/jpg', this.cont_object[c]);
           this.cont_object[c].appendChild(this.object_img[c]);
           /*------------------------------------------------*/
       }
   };
   this.paint_puresvg_with_db = function (data,zones) //pinta el svg con datos de las zonas en la base de datos
   {
        var shadow_object_img = this.object_img;
        for(var prod = 0; prod<data.length;prod++)
        {
            //activamos el evento load para cada object. Este evento cargara los colores del mismo desde la db

            //$(this.object_img[prod]).unbind('load');

            (function (x) {
                $(shadow_object_img[x]).on('load',function ()
                {
                    var svgobject = this.contentDocument;
                    var zonasclick = svgobject.querySelectorAll("[id^=click]");
                    for(var zona= 0;zona<zonasclick.length;zona++)
                    {
                        svgobject.querySelector('#'+ zonasclick[zona].id.slice(5)+' image').setAttribute('xlink:href','/media/'+zones[x][zona]['color_zona__file_color']);
                    }
                });
            })(prod);

        }
        this.object_img = shadow_object_img; //re asignamos nuestra variable shadow scope a nuestra variable global dentro del objeto que no podiamos usar dentro de la autofuncoion
   };
    this.dump_plain_svg = function (path,data,zones)//CREAR SVG CON LOS DATOS DE BASE DE DATOS Y ENVIARLO A UN DIV ASI SE HACIA ANTES
    {
        //CREAMOS OBJECTOS SVG EMULADORES PARA CREAR DIV CON SVG PLANO
        /*CREAMOS CONTENEDOR DONDE ESTARAN LOS FAKE OBJECT*/
        this.emuobject_img = []; //objetos que no serviran como objetos para luego transformarlos en div
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
           this.emuobject_img[c] = create_object_tag_V1('sliderimg' + c, 'responsive-img', path + data[c].troquel_producto__file_troquel, 'image/svg+xml', cont_emuobjects);
           /*------------------------------------------------*/
       }
       //ACTIVAMOS EVENTOS DE CARGA PARA LOS OBJETOS
       var shadow_object = this.emuobject_img;
       var shadow_object2 = this.cont_object;
       var svgobject = []; //ESTA VARIABLE CONTENDRA LOS XML DE CADA OBJECT CREADA ANTERIORMENTE
       var svg = [];//ESTA VARIABLE CONTENDRA LOS XML YA SERIALIZADOS LISTO PARA PASAR AL SLIDER
        var return_code_url;
        /*convertImgToBase64URL('https://madebylio.com/media/color/amarillo_madebylio.jpg',function (base64img) {
            return_code_url = base64img;

        },'image/jpeg');*/

        //OBTENEMOS INPUT CON NUESTRAS IMAGENES EN BASE64  #trigg-b64-to-key-dict
        var base64_images = document.querySelector('#trigg-b64-to-key-dict').colorimages;
        var paint_zones = []; //zonas a pintar
       for(var prod = 0; prod<data.length;prod++)
        {
            //SERIALIZAMOS LOS DATOS DE LOS OBJECTS Y LOS CONDENSAMOS EN LOS DIV DEL SLIDER
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
                        }
                        //alert(svgobject[x].querySelectorAll('#'+ sss[ii].id.slice(5)+' image').length);
                        //svgobject[x].querySelectorAll('#'+ sss[ii].id.slice(5)+' image').setAttribute('xlink:href',base64_images.get(zones[x][ii]['color_zona__file_color']));
                    }
                    svg[x] = svgobject[x].querySelector('svg');
                    svg[x].style.width = 90+'%';
                    svg[x].style.height = 90+'%';
                    shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);

                    if(x===1) {

                        //parseImages(document.querySelector('.cont-prof-photo'));

                    }
                });
            })(prod);

        }
        this.emuobject_img = shadow_object;
        this.cont_object   = shadow_object2;
        return this.cont_object; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };
    this.dump_svg_to_canvas = function (path,data,zones) {
        //CREAMOS OBJECTOS SVG EMULADORES PARA CREAR DIV CON SVG PLANO
        /*CREAMOS CONTENEDOR DONDE ESTARAN LOS FAKE OBJECT*/
        this.emuobject_img = []; //objetos que no serviran como objetos para luego transformarlos en div
        var cont_emuobjects =  document.createElement('div');
        $(cont_emuobjects).css('position','absolute');
        $(cont_emuobjects).css('top','-10000px');
        $(cont_emuobjects).css('background','blue');
        $(cont_emuobjects).css('width',$(this.cont_object[0]).css('width'));//asignamos el tamaño del canvas respecto a la medida de cada cont del slider
        $(cont_emuobjects).css('height',$(this.cont_object[0]).css('height'));
        cont_emuobjects.id = 'cont-emu-objects';//con este id podrmemos manipular en otras funciones este div
        document.querySelector('body').appendChild(cont_emuobjects); //AGREGAMOS EL CONT AL BODY
        //AÑADIMOS EL CADA OBJECT AL CONTENEDOR
        for(var c = 0;c<data.length;c++)
       {
           /*LLENADO DE CONT DE IMAGEN CON OBJECTS SVG O IMG*/
           this.emuobject_img[c] = create_object_tag_V1('sliderimg' + c, 'responsive-img', path + data[c].troquel_producto__file_troquel, 'image/svg+xml', cont_emuobjects);
           /*------------------------------------------------*/
       }
       //ACTIVAMOS EVENTOS DE CARGA PARA LOS OBJETOS
       var shadow_object = this.emuobject_img;
       var shadow_object2 = this.cont_object;
       var svgobject = []; //ESTA VARIABLE CONTENDRA LOS XML DE CADA OBJECT CREADA ANTERIORMENTE
       var svg = [];//ESTA VARIABLE CONTENDRA LOS XML YA SERIALIZADOS LISTO PARA PASAR AL SLIDER

       for(var prod = 0; prod<data.length;prod++)
        {
            //SERIALIZAMOS LOS DATOS DE LOS OBJECTS Y LOS CONDENSAMOS EN LOS DIV DEL SLIDER
            (function (x) {
                $(shadow_object[x]).on('load',function ()
                {
                    svgobject[x] = this.contentDocument;
                    var sss = svgobject[x].querySelectorAll("[id^=click]");
                    for(var ii= 0;ii<sss.length;ii++)
                    {
                            svgobject[x].querySelector('#'+ sss[ii].id.slice(5)+' image').setAttribute('xlink:href','https://madebylio.com/media/'+zones[x][ii]['color_zona__file_color']);
                    }
                    svg[x] = svgobject[x].querySelector('svg');
                    svg[x].style.width = 90+'%';
                    svg[x].style.height = 90+'%';
                    //shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);
                    //CLAVE!!! PINTA NUESTROS PRODUCTOS CON LAS IMAGENES EN BASE64 DE LOS COLORES
                       parseImages(svg[x],shadow_object2[x]);

                });
            })(prod);

        }
        this.emuobject_img = shadow_object;
        this.cont_object   = shadow_object2;
        return this.cont_object; //RETORNAMOS LOS OBJETOS CREADOS PARA EL SLIDER
    };
    this.moveright = function () {
        //alert($(this.cont_img).css('left'));
        this.posslider -= 1;
        if(-this.num_moves > this.posslider)
        {
            this.posslider += 1;
        }
        else
        {

            $(this.cont_img).css('left',((this.local_width + this.separation)*this.posslider) +'%');
        }
        console.log('right');
    };
    this.moveleft = function () {
        //alert($(this.cont_img).css('left'));

        if(this.posslider===0)
        {
            //this.posslider -= 1;
        }
        else
        {
            this.posslider += 1;
            $(this.cont_img).css('left',((this.local_width + this.separation)*this.posslider) +'%');
        }
        console.log('left');
    }

};





function parseImages(svg,where) {
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var total, encoded,result_canvas; //result_canvas es el canvas a importar y manipular
  // convert an external bitmap image to a dataURL
  var toDataURL = function(image) {

    var img = new Image();
    // CORS workaround, this won't work in IE<11
    // If you are sure you don't need it, remove the next line and the double onerror handler
    // First try with crossorigin set, it should fire an error if not needed
    img.crossOrigin = 'anonymous';

    img.onload = function() {
      // we should now be able to draw it without tainting the canvas
      var canvas = document.createElement('canvas');
      canvas.width = 333;
      canvas.height = 333;
      // draw the loaded image
      canvas.getContext('2d').drawImage(this, 0, 0);
      // set our <image>'s href attribute to the dataURL of our canvas
      image.setAttributeNS(xlinkNS, 'href', canvas.toDataURL());
      // that was the last one

        //console.log('to data url ' +canvas.width +' '+canvas.height+' '+canvas.toDataURL());
      if (++encoded === total) exportDoc(svg,where);
    };

    // No CORS set in the response
    img.onerror = function() {
      // save the src
      var oldSrc = this.src;
      // there is an other problem
      this.onerror = function() {
        console.warn('failed to load an image at : ', this.src);
        if (--total === encoded && encoded > 0) exportDoc(svg,where);
      };
      // remove the crossorigin attribute
      this.removeAttribute('crossorigin');
      // retry
      this.src = '';
      this.src = oldSrc;
    };
    // load our external image into our img
    var href = image.getAttributeNS(xlinkNS, 'href');

    // really weird bug that appeared since this answer was first posted
    // we need to force a no-cached request for the crossOrigin be applied
    img.src = href + (href.indexOf('?') > -1 ? + '&1': '?1');
    console.log(img.src);
  };

  // get an external svg doc to data String
  var parseFromUrl = function(url, element) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status === 200) {
        var response = this.responseText || this.response;
        var dataUrl = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(response);
        console.log('tfromurl'+dataUrl);
        element.setAttributeNS(xlinkNS, 'href', dataUrl);
        if (++encoded === total) exportDoc(svg,where);
      }
      // request failed with xhr, try as an <img>
      else {
        toDataURL(element);
      }
    };
    xhr.onerror = function() {
      toDataURL(element);
    };
    xhr.open('GET', url);
    xhr.send();
  };

  var images = svg.querySelectorAll('image');
  total = images.length;
  encoded = 0;

  // loop through all our <images> elements
  for (var i = 0; i < images.length; i++) {
    var href = images[i].getAttributeNS(xlinkNS, 'href');
    // check if the image is external
    if (href.indexOf('data:image') < 0) {
      // if it points to another svg element
      if (href.indexOf('.svg') > 0) {
        parseFromUrl(href, images[i]);
      } else // a pixel image
        toDataURL(images[i]);
    }
    // else increment our counter
    else if (++encoded === total) exportDoc(svg,where);
  }
  // if there were no <image> element
  if (total === 0) exportDoc(svg,where);



}

var exportDoc = function(svg,where) {
  // check if our svgNode has width and height properties set to absolute values
  // otherwise, canvas won't be able to draw it
    var export_canvas = [];
    var canvas = [];
  var bbox = svg.getBoundingClientRect();

  if (svg.width.baseVal.unitType !== 1) svg.setAttribute('width', bbox.width);
  if (svg.height.baseVal.unitType !== 1) svg.setAttribute('height', bbox.height);

  // serialize our node
  var svgData = (new XMLSerializer()).serializeToString(svg);
  // remember to encode special chars
  var svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData);

  var svgImg = new Image();

  svgImg.onload = function() {
    var canvas = document.createElement('canvas');
    // IE11 doesn't set a width on svg images...
    canvas.width = this.width || bbox.width;
    canvas.height = this.height || bbox.height;

    canvas.getContext('2d').drawImage(svgImg, 0, 0, canvas.width, canvas.height);
    //canvas.setAttribute('draggable','true');
    //doSomethingWith(canvas)
      where.appendChild(canvas);
      //export_canvas = canvas; //igualamos el canvas para poderlo exportar dentro de la funcion
      $('#trigger-svg-canvas').trigger('svg-canvas');
  };

  svgImg.src = svgURL;
  //return export_canvas;
};

/*
*
*
* function eat(food1, food2)
{
    alert("I like to eat " + food1 + " and " + food2 );
}
function myFunc(callback, args)
{
    //do stuff
    //...
    //execute callback when finished
    callback.apply(this, args);
}

//alerts "I like to eat pickles and peanut butter"
myFunc(eat, ["pickles", "peanut butter"]);
* */
//EJEMPLO DE CREACION DE OBJETOS Y PINTADO DE LOS MISMO
//prod_slider.dump_pure_object('/media/',data.productos);
//prod_slider.paint_svg_with_db(data.productos,data.datazones);
