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
                        svg[x].style.display = 'none';
                    }
                    //shadow_object2[x].innerHTML = new XMLSerializer().serializeToString(svg[x]);
                    shadow_object2[x].append(svg[x]);
                    shadow_object2[x].id_producto = data[x].id; //pasamos los datos del producto a nuestro objeto para poderlo usar en las funciones cuando se le da click por ejemplo
                    shadow_object2[x].nombre = data[x].nombre_producto;
                    shadow_object2[x].precio = data[x].precio_producto;
                    shadow_object2[x].tamano = data[x].tamano_producto;
                    shadow_object2[x].prev   = data[x].prev_producto;
                    shadow_object2[x].img_producto   = data[x].img_producto;
                    shadow_object2[x].video_producto   = data[x].video_producto;


                    if(data[x].img_producto!='null')
                    {
                        img_prod[x] = document.createElement('img');
                        img_prod[x].style.width =100+'%';
                        img_prod[x].style.height =100 + '%';
                        img_prod[x].style.position ='absolute';
                        img_prod[x].style.top ='0';
                        img_prod[x].style.left ='0';
                        img_prod[x].src = path + data[x].img_producto;
                        shadow_object2[x].append(img_prod[x]);

                    }
                     if(data[x].video_producto!='null')
                    {
                        video_prod[x] = document.createElement('video');
                        video_prod[x].style.width =90+'%';
                        video_prod[x].style.height ='auto';
                        video_prod[x].style.position ='absolute';
                        video_prod[x].style.top ='0';
                        video_prod[x].style.left ='0';
                        video_prod[x].setAttribute('controls','true');
                        video_prod[x].setAttribute('draggable','true');
                        video_prod[x].innerHTML = '<source src="' + path + data[x].video_producto +'" type="video/mp4">\n' +
                            '  <source src="movie.ogg" type="video/ogg">';
                        shadow_object2[x].append(img_prod[x]);
                    }
                    switch (data[x].prev_producto)//verificamos cual es el tipo de archivo por defecto
                        {
                            case 'ZON'://creamos objeto que tienen zonas
                                if(img_prod[x])
                                    {
                                        img_prod[x].style.display = 'none';
                                        console.log('hay img');
                                    }//
                                if(video_prod[x])
                                    {
                                        video_prod[x].style.display = 'none';
                                        console.log('hay video');
                                    }
                                break;
                                break;
                            case 'IMA':

                                    if(video_prod[x])
                                    {
                                        video_prod[x].style.display = 'none';
                                        console.log('hay video');
                                    }
                                break;
                            case 'VID':
                                    if(img_prod[x])
                                    {
                                        img_prod[x].style.display = 'none';
                                        console.log('hay img');
                                    }//
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
                    console.log(data[x].tamano_producto);
                    //console.log(data[x].cantidad_producto);



                    if(x===1) {

                        //parseImages(document.querySelector('.cont-prof-photo'));

                    }
                });
            })(prod);
            }


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

//EJEMPLO DE CREACION DE OBJETOS Y PINTADO DE LOS MISMO
//prod_slider.dump_pure_object('/media/',data.productos);
//prod_slider.paint_svg_with_db(data.productos,data.datazones);
