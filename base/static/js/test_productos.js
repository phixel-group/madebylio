function create_rules(zonas,v_zonas,escala,reglas,v_reglas,distancia,v_distancia) {
        var medidas = [];
        var delimitadores = [];
        var v_medidas =[];
        var v_delimitadores = [];
        var h_rule;
        var v_rule;
        if(document.querySelector('#h-rule'))
        {
            h_rule = document.querySelector('#h-rule');//
            v_rule = document.querySelector('#v-rule');
        }
        else
        {
            /*h_rule = document.createElement('div');
            h_rule.id = 'h-rule';
            h_rule.style.width = '95.83%';
            h_rule.style.height = '3vh';
            h_rule.style.position = 'absolute';
            h_rule.style.top = '0';
            h_rule.style.left = '4vh';
            h_rule.style.backgroundColor = 'white';


            v_rule = document.createElement('div');
            v_rule.id = 'v-rule';
            v_rule.style.width = '4vh';
            v_rule.style.height = '94.28571429%';
            v_rule.style.position = 'absolute';
            v_rule.style.top = '3vh';
            v_rule.style.left = '0';
            v_rule.style.backgroundColor = 'white';
            document.querySelector('#productos-cont-dragdrop').appendChild(v_rule);
            document.querySelector('#productos-cont-dragdrop').appendChild(h_rule);*/

        }
        h_rule.innerHTML = '';
        v_rule.innerHTML = '';
        for(var cuenta = 0;cuenta<zonas;cuenta++)
        {
            medidas[cuenta] = document.createElement('p');
            medidas[cuenta].style.position = 'absolute';
            medidas[cuenta].style.top = '0';
            medidas[cuenta].style.zIndex = '10000';
            medidas[cuenta].style.fontSize = '0.5vw';

            if(cuenta === 0)
            {
                delimitadores[cuenta] = document.createElement('div');
                delimitadores[cuenta].style.width = '2px';
                delimitadores[cuenta].style.height = '40%';
                delimitadores[cuenta].style.position = 'absolute';
                delimitadores[cuenta].style.bottom = '0';
                delimitadores[cuenta].style.left = '0';
                delimitadores[cuenta].style.backgroundColor = 'black';
                medidas[cuenta].style.left = '0%';
                medidas[cuenta].innerHTML = distancia[escala]*cuenta + 'cm';
            }
            else
            {
                delimitadores[cuenta] = document.createElement('div');
                delimitadores[cuenta].style.width = '2px';
                delimitadores[cuenta].style.height = '40%';
                delimitadores[cuenta].style.position = 'absolute';
                delimitadores[cuenta].style.bottom = '0';
                delimitadores[cuenta].style.left = (1/reglas[escala])*cuenta*100 + '%';
                delimitadores[cuenta].style.backgroundColor = 'black';
                if(escala == 7 && cuenta== parseInt(zonas,10))
                {
                    medidas[cuenta].style.left = (((1/reglas[escala])*cuenta*100) - (35/reglas[escala]))  + '%';
                }
                else
                {
                    medidas[cuenta].style.left = (((1/reglas[escala])*cuenta*100) - (20/reglas[escala]))  + '%';
                }

                medidas[cuenta].innerHTML = distancia[escala]*cuenta + 'cm';
            }

            h_rule.appendChild(medidas[cuenta]);
            h_rule.appendChild(delimitadores[cuenta]);
        }

        for(var cuent = 0;cuent<v_zonas;cuent++)
        {
            v_medidas[cuent] = document.createElement('p');
            v_medidas[cuent].style.position = 'absolute';
            v_medidas[cuent].style.left = '1px';
            v_medidas[cuent].style.fontSize = '0.55vw';

            if(cuent === 0)
            {

            }
            else
            {
                v_delimitadores[cuent] = document.createElement('div');
                v_delimitadores[cuent].style.height = '2px';
                v_delimitadores[cuent].style.width = '20%';
                v_delimitadores[cuent].style.position = 'absolute';
                v_delimitadores[cuent].style.right = '0';
                v_delimitadores[cuent].style.top = (1/v_reglas[escala])*cuent*100 + '%';
                v_delimitadores[cuent].style.backgroundColor = 'black';
                v_medidas[cuent].style.top = (((1/v_reglas[escala])*cuent*100) - (15/v_reglas[escala]))  + '%';
                v_medidas[cuent].innerHTML = v_distancia[escala]*cuent + 'cm';
                v_rule.appendChild(v_medidas[cuent]);
                v_rule.appendChild(v_delimitadores[cuent]);
            }


        }
    }
function charge_class_animation(objeto,clase)
{
    $(objeto).removeClass(clase);
    setTimeout(function(){$(objeto).addClass(clase);},100);
}
function erase_zone_colors(board)
{
    var board_element = document.querySelector(board);
    var clon =  board_element.querySelector('div');
    var $tablero = $(clon).clone();
    var fake_board = document.querySelector('#fake-tablero');
    //fake_board.appendChild(clon);
        $(fake_board).html($tablero);
    //board_element.appendChild(clon);
    var all_svg = fake_board.querySelectorAll('#'+clon.id + ' div svg');
    var paint_zones = [];
    var algo = [];
     for(var c = 0;c<all_svg.length;c++)
    {
        algo = all_svg[c].querySelectorAll('[id^=click]');
        for(var cont = 0; cont<algo.length;cont++)
        {
            paint_zones = all_svg[c].querySelectorAll('#'+ algo[cont].id.slice(5)+' image');
            for(var pc = 0; pc<paint_zones.length;pc++)
            {
                paint_zones[pc].setAttribute('xlink:href','');
            }
        }
    }
    console.log(fake_board.innerHTML);
}
function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}
function  save_board_table(board,table,dropproducts,files,data)
{
    //var board_element = document.querySelector(board).innerHTML;
    var board_element = document.querySelector(board).innerHTML;
        //console.log(board_element);
    //TEST PROBLEMA DE TAMAÑO DE COOKIE (REVISAR Y CORREGIR)

    var board_element1 = document.querySelector(board);
    var clon =  board_element1.querySelector('div');
    var tablero = clon.cloneNode(true);
    var fake_board = document.querySelector('#fake-tablero');
    fake_board.innerHTML = '';
    //fake_board.appendChild(clon);
    fake_board.append(tablero);
    //board_element.appendChild(clon);
    var all_svg = fake_board.querySelectorAll('#'+clon.id + ' div div svg');
    var paint_zones = [];
    var algo = [];
     for(var c = 0;c<all_svg.length;c++)
    {
        algo = all_svg[c].querySelectorAll('[id^=click]');
        for(var cont = 0; cont<algo.length;cont++)
        {
            paint_zones = all_svg[c].querySelectorAll('#'+ algo[cont].id.slice(5)+' image');
            for(var pc = 0; pc<paint_zones.length;pc++)
            {
                paint_zones[pc].setAttribute('xlink:href','');
            }
        }
    }
    //console.log(fake_board.innerHTML);




    //console.log(all_svg.length + ' ' + algo.length);
    var table_element = document.querySelector(table).innerHTML;
    sessionStorage.setItem("board", fake_board.innerHTML);
    sessionStorage.setItem("table", table_element);
    sessionStorage.setItem("dropproducts", String(dropproducts));
    sessionStorage.setItem("files", String(files));
    sessionStorage.setItem("data", JSON.stringify(data));
    //alert(board_element);
}
function  save_board_table_mob(board,table,dropproducts,files,data)
{
    //var board_element = document.querySelector(board).innerHTML;
    var board_element = document.querySelector(board).innerHTML;
        //console.log(board_element);
    //TEST PROBLEMA DE TAMAÑO DE COOKIE (REVISAR Y CORREGIR)

    var board_element1 = document.querySelector(board);
    var clon =  board_element1.querySelector('div');
    var tablero = clon.cloneNode(true);
    var fake_board = document.querySelector('.fake-mob');
    fake_board.innerHTML = '';
    //fake_board.appendChild(clon);
    fake_board.append(tablero);
    //board_element.appendChild(clon);
    var all_svg = fake_board.querySelectorAll('#'+clon.id + ' div div svg');
    var paint_zones = [];
    var algo = [];
     for(var c = 0;c<all_svg.length;c++)
    {
        algo = all_svg[c].querySelectorAll('[id^=click]');
        for(var cont = 0; cont<algo.length;cont++)
        {
            paint_zones = all_svg[c].querySelectorAll('#'+ algo[cont].id.slice(5)+' image');
            for(var pc = 0; pc<paint_zones.length;pc++)
            {
                paint_zones[pc].setAttribute('xlink:href','');
            }
        }
    }
    //console.log(fake_board.innerHTML);




    //console.log(all_svg.length + ' ' + algo.length);
    var table_element = document.querySelector(table).innerHTML;
    sessionStorage.setItem("board", fake_board.innerHTML);
    sessionStorage.setItem("table", table_element);
    sessionStorage.setItem("dropproducts", String(dropproducts));
    sessionStorage.setItem("files", String(files));
    sessionStorage.setItem("data", JSON.stringify(data));
    //alert(board_element);
}

function charge_board_table_mob(board,table,same_products)
{
   // var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
    //var distancia = ['',10,5,5,2,2,2,2];
    //var v_reglas = ['',10,10,6.666666667,12.5,10,8.333333333,7.142857143];
    //var v_distancia = ['',10,5,5,2,2,2,2];
    var board_element = sessionStorage.getItem(board);
    //console.log(board_element);
    var table_element = sessionStorage.getItem(table);
    if(board_element === undefined || table_element === undefined || board_element === null || table_element === null) //
    {
        //no cargar nada
        //alert('sin cargar');

        //create_rules(17,10,1,reglas,v_reglas,distancia,v_distancia); //creamos reglas en escala 1
    }
    else
    {
        var base64_images = document.querySelector('#trigg-b64-to-key-dict').colorimages;//diccipnario con nuestras imagenes en base64
        //var percents = ['','100%','200%','300%','300%','400%','600%','700%'];
        //var act_scale = document.querySelector('#act-scale');

        //alert(escala);


        //CARGA DE TABLERO Y TABLA DE PRODUCTOS
        var cont_destino = document.querySelector('#cont-test-mob');
            cont_destino.innerHTML = board_element;
             //var escala = parseInt(document.querySelector('#productos-cont-dragdrop').getAttribute('data-escala'),10);
            //act_scale.innerHTML =percents[escala];
        document.querySelector('#productos-cont-compra-mob').innerHTML = table_element;

        var input = document.querySelector('#info-productos');

        input.data = JSON.parse(sessionStorage.getItem('data'));
        input.filas = parseInt(sessionStorage.getItem('files'),10);
        input.drop_products = parseInt(sessionStorage.getItem('dropproducts'),10);

        ////////////////////////////////////////////////////////////////////////////////////////////
        //set all events for charged svgs
        var alldivdrag = document.querySelectorAll('#test-dnd-mob div div[id^=drop-productos]');
        var cont_producto = document.querySelectorAll('#test-dnd-mob div[id^=cont-productos]');
        var alldivmatrix = document.querySelectorAll('#test-dnd-mob div img[id^=same-productos]');
        var allshowprod = document.querySelectorAll('.show_prod_menu');
        var allprodmenu = document.querySelectorAll('.prod_menu');
        var allleftarrow = document.querySelectorAll('.left_arrow');
        var allrightarrow = document.querySelectorAll('.right_arrow');
        var allsameprod = document.querySelectorAll('.same_prod');
        var div2change = [];//para corroborar si tiene svg adentro
        var paint_zones;
        var sss = [];
        var color;
        var elemBelow = [] ;
        var elementbellow = [];
        var offsetX = [] ;
        var offsetY= [] ;
        var bufferX = [] ;
        var bufferY = [] ;
        for(var ct = 0 ;ct<alldivdrag.length;ct++)
        {
            div2change[ct] = alldivdrag[ct].querySelector('svg');//obtenemos svg del div a cambiar del producto
            //svgreplace = div2change[ct].innerHTML;
            //div2change[ct].innerHTML = svgreplace;

            //CONVERTIR NUESTRO PROD DRAG

            alldivdrag[ct].id_producto = alldivdrag[ct].getAttribute('data-id_producto');
            alldivdrag[ct].nombre_producto = alldivdrag[ct].getAttribute('data-nombre');
            alldivdrag[ct].precio_producto = alldivdrag[ct].getAttribute('data-precio');
            alldivdrag[ct].tamano_producto = alldivdrag[ct].getAttribute('data-tamano');
            alldivdrag[ct].prev_producto   = alldivdrag[ct].getAttribute('data-prev_producto');
            alldivdrag[ct].img_producto   =  alldivdrag[ct].getAttribute('data-img_producto');
            alldivdrag[ct].video_producto   =alldivdrag[ct].getAttribute('data-video_producto');
            alldivdrag[ct].troquel_producto__file_troquel = alldivdrag[ct].getAttribute('data-troquel');
            console.log(div2change[ct]);//



            if(div2change[ct]==null)
            {
                console.log('nada');
            }
            else
            {
                console.log('algo');
                sss = div2change[ct].querySelectorAll("[id^=click]");//
                //seleccionamos las zonas dentro del svg que deben cambiar de color
                for(var ii= 0;ii<sss.length;ii++)
                {
                    paint_zones = div2change[ct].querySelectorAll('#' + sss[ii].id.slice(5) + ' image');
                    for (var k = 0; k < paint_zones.length; k++)
                    {

                        color = paint_zones[k].getAttribute('data-realimage');
                        paint_zones[k].setAttribute('xlink:href', base64_images.get(color));
                        //console.log(paint_zones[k].getAttribute('data-realimage')); //
                    }
                }
            }
            (function (x) {

                //EVENTOS MENU PRODUCTOS Y PLAY VIDEO

                if(cont_producto[x].querySelector('div[id^=play]'))
                    {
                        cont_producto[x].querySelector('div[id^=play]').style.pointerEvents = 'auto';
                        cont_producto[x].querySelector('div[id^=play]').style.top = '0%';//
                        cont_producto[x].querySelector('div[id^=play]').style.left = '-30%';//
                        cont_producto[x].querySelector('div[id^=play]').style.top = '30%';//
                        cont_producto[x].append(cont_producto[x].querySelector('div[id^=play]'));
                       cont_producto[x].querySelector('div[id^=play]').addEventListener('touchstart',function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                alldivdrag[x].querySelector('video').play();
                         },false);
                    }

                allshowprod[x].addEventListener('load',function (e) {
                allshowprod[x].addEventListener('touchstart',function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (allprodmenu[x].style.display == 'none')
                {
                    allprodmenu[x].style.display = 'block';
                }
                else
                {
                    allprodmenu[x].style.display = 'none';
                }
            },false);
            },false);


                allrightarrow[x].addEventListener('touchstart',function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                var angulo = parseInt(alldivdrag[x].getAttribute('data-angle'),10);
                if(angulo=='360')
                {
                    angulo = 0;
                }
                else
                    {
                    }
                angulo = angulo + 10;
                alldivdrag[x].style.transform = 'rotate('+angulo+'deg)';//
                alldivdrag[x].setAttribute('data-angle',angulo);
                console.log(angulo);
                save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
            });
            allleftarrow[x].addEventListener('touchstart',function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                var angulo = parseInt(alldivdrag[x].getAttribute('data-angle'),10);
                if(angulo=='-360')
                {
                    angulo = 0;
                }
                else
                    {
                    }
                angulo = angulo - 10;
                alldivdrag[x].style.transform = 'rotate('+angulo+'deg)';//
                alldivdrag[x].setAttribute('data-angle',angulo);
                console.log(angulo);
                save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
            });

            allsameprod[x].addEventListener('touchstart',function (e)
                                  {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      var file_troquel = alldivdrag[x].getAttribute('data-troquel'); // obtenemos el nombre del archivo del troquel que fue pulsado
                 //motramos matriz de productos

                                     setTimeout(function () {
                                        $('#same-mob-products').css('display','block');
                                        $('#cancel-mob-same').css('display','block');
                                     },1000);
                                    ajax_show_same_mob_products(same_prod_mob_matrix,file_troquel,alldivdrag[x]);
                                  },false);




                //ACTIVACION DE EVENTOS DRAG AND DROP
            cont_producto[x].addEventListener('touchstart',function(e)
            {
                e.preventDefault();
                offsetX = e.touches[0].clientX - this.getBoundingClientRect().left;
                offsetY = e.touches[0].clientY - this.getBoundingClientRect().top;
                bufferX =  (e.touches[0].clientX - document.querySelector('#cont-test-mob').getBoundingClientRect().left) - offsetX + 'px';
                bufferY = (e.touches[0].clientY  - document.querySelector('#cont-test-mob').getBoundingClientRect().top) - offsetY + 'px';
                cont_producto[x].style.left = (e.touches[0].clientX - document.querySelector('#cont-test-mob').getBoundingClientRect().left) - offsetX + 'px';
                cont_producto[x].style.top = (e.touches[0].clientY  - document.querySelector('#cont-test-mob').getBoundingClientRect().top) - offsetY + 'px';
                //cont_producto[x].style.backgroundColor = 'red';
            },false);

            cont_producto[x].addEventListener('touchmove',function(e)
            {
                e.preventDefault();
               cont_producto[x].style.left = (e.touches[0].clientX - document.querySelector('#cont-test-mob').getBoundingClientRect().left) - offsetX + 'px';
                cont_producto[x].style.top = (e.touches[0].clientY  - document.querySelector('#cont-test-mob').getBoundingClientRect().top) - offsetY + 'px';

                //DETERMINAMOS LA UBICACION DEL PRODUCTO DRAGEADO Y DE ACUERDO A ELLO TOMAMOS DECISIONES
                //document.querySelector('#show-coor').innerHTML = '';
                cont_producto[x].hidden = true;
                elemBelow = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).parentNode.id;
                elementbellow = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).id;
                cont_producto[x].hidden = false;
                //document.querySelector('#show-coor').innerHTML = elemBelow + ' ' + elementbellow;
                //console.log(cont_clon);
                //console.log(elemBelow.id + ' ' + elemBelow.id.substr(0, 14) + ' ' + elementbellow.id);
                            //if (!elemBelow) return;
                if (elementbellow== 'test-dnd-mob')//
                {
                    cont_producto[x].classList.add('tablero');
                    cont_producto[x].classList.remove('nada');
                    cont_producto[x].classList.remove('papelera');
                }
                else if(elementbellow== 'mob-papelera')
                {
                    cont_producto[x].classList.add('papelera');
                    cont_producto[x].classList.remove('nada');
                    cont_producto[x].classList.remove('tablero');
                }
                else
                {
                    cont_producto[x].classList.add('nada');
                    cont_producto[x].classList.remove('tablero');
                    cont_producto[x].classList.remove('papelera');
                }
                    //console.log(elemBelow);
                    //console.log(elementbellow);

            },false);
            cont_producto[x].addEventListener('touchend',function(e) {

                var adentro = cont_producto[x].classList.contains('tablero');
                var papelera = cont_producto[x].classList.contains('papelera');
                var afuera = cont_producto[x].classList.contains('nada');

                if(adentro)
                {
                    //alert('adentro');
                    save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
                }
                else if(papelera)
                {
                    cont_producto[x].remove();
                    delete_file_mob_productos('#subtotal_productos_mob tbody',[alldivdrag[x].getAttribute('data-nombre'),alldivdrag[x].getAttribute('data-idproducto'),1]);
                    create_subtotal_productos_mob();
                    //guardamos tabla y tablero
                    save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
                }
                else
                {
                    cont_producto[x].style.left = bufferX;
                    cont_producto[x].style.top = bufferY;
                    //alert('afuera');
                }

            },false);

            })(ct);
        }


       create_subtotal_productos_mob();//recalculamos subtotal en caso de recargar, necesario para actualizar el subtotal de la tabla
        //alert(board_element + ' ' + table_element);

    }
}
function charge_board_table(board,table,same_products)
{
    var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
    var distancia = ['',10,5,5,2,2,2,2];
    var v_reglas = ['',10,10,6.666666667,12.5,10,8.333333333,7.142857143];
    var v_distancia = ['',10,5,5,2,2,2,2];
    var board_element = sessionStorage.getItem(board);
    //console.log(board_element);
    var table_element = sessionStorage.getItem(table);
    if(board_element === undefined || table_element === undefined || board_element === null || table_element === null) //
    {
        //no cargar nada
        //alert('sin cargar');

    create_rules(17,10,1,reglas,v_reglas,distancia,v_distancia); //creamos reglas en escala 1
    }
    else
    {
        var base64_images = document.querySelector('#trigg-b64-to-key-dict').colorimages;//diccipnario con nuestras imagenes en base64
        var percents = ['','100%','200%','300%','300%','400%','600%','700%'];
        var act_scale = document.querySelector('#act-scale');

        //alert(escala);

        //CARGA DE TABLERO Y TABLA DE PRODUCTOS
        var cont_destino = document.querySelector('#cont-productos-cont-drag-drop');
            cont_destino.innerHTML = board_element;
             var escala = parseInt(document.querySelector('#productos-cont-dragdrop').getAttribute('data-escala'),10);
            act_scale.innerHTML =percents[escala];
        document.querySelector('#productos-cont-compra').innerHTML = table_element;

        var input = document.querySelector('#info-productos');

        input.data = JSON.parse(sessionStorage.getItem('data'));
        input.filas = parseInt(sessionStorage.getItem('files'),10);
        input.drop_products = parseInt(sessionStorage.getItem('dropproducts'),10);

        ////////////////////////////////////////////////////////////////////////////////////////////
        //set all events for charged svgs
        var alldivdrag = document.querySelectorAll('#productos-cont-dragdrop div div[id^=drop-productos]');

        var alldivmatrix = document.querySelectorAll('#productos-cont-dragdrop div img[id^=same-productos]');

        //alert(alldivdrag.length+ ' ' + alldivmatrix.length);
        var fromto = [];
        var nombre = [];
        var idproducto = [];
        var div2change = [];
        var sss = [];
        var paint_zones = [];
        var svgreplace = [];
        var color;//donde encontraremos los colores por ej.. color/color_madebylio.jpg
        var menu_productos = document.querySelectorAll('div[id^=change_prev]'); //borrar todos los menus de los productos en el tablero

        //PINTAMOS DE NUEVO NUESTROS PRODUCTOS
        for(var ct = 0 ;ct<alldivdrag.length;ct++)
        {
            //REMOVEMOS TODOS LOS PLAY QUE ESTEN
            //alldivdrag.parentNode.querySelector('div[id^=play-video]').remove();
            div2change[ct] = alldivdrag[ct].querySelector('svg');//obtenemos svg del div a cambiar del producto
            //svgreplace = div2change[ct].innerHTML;
            //div2change[ct].innerHTML = svgreplace;
            console.log(div2change[ct]);//
            if(div2change[ct]==null)
            {

            }
            else
            {
                sss = div2change[ct].querySelectorAll("[id^=click]");//
                //seleccionamos las zonas dentro del svg que deben cambiar de color
                for(var ii= 0;ii<sss.length;ii++)
                {
                    paint_zones = div2change[ct].querySelectorAll('#' + sss[ii].id.slice(5) + ' image');
                    for (var k = 0; k < paint_zones.length; k++)
                    {

                        color = paint_zones[k].getAttribute('data-realimage');
                        paint_zones[k].setAttribute('xlink:href', base64_images.get(color));
                        //console.log(paint_zones[k].getAttribute('data-realimage')); //
                    }
                }
            }
            menu_productos[ct].remove();//borramos todos los menu de los productos en el tablero

            //CARGAMOS LOS ATRIBUTOS DEL HTML EN LOS OBJETOS DE LOS PRODUCTOS PARA PODERLOS USAR EN LAS FUNCIONES DE ACTIVACION DE EVENTOS DE LOS MISMOS
            alldivdrag[ct].fromto = alldivdrag[ct].getAttribute('data-fromto');
            alldivdrag[ct].nombre_producto = alldivdrag[ct].getAttribute('data-nombre');
            alldivdrag[ct].id_producto = alldivdrag[ct].getAttribute('data-idproducto');
            alldivdrag[ct].precio_producto = alldivdrag[ct].getAttribute('data-precio');
            alldivdrag[ct].tamano_producto = alldivdrag[ct].getAttribute('data-tamano');
            alldivdrag[ct].troquel_producto__file_troquel = alldivdrag[ct].getAttribute('data-troquel');
            alldivdrag[ct].img_producto = alldivdrag[ct].getAttribute('data-img_producto');
            alldivdrag[ct].video_producto =alldivdrag[ct].getAttribute('data-video_producto');

            //CLAVE SON LAS FUNCIONES QUE LE DEVUELVEN TODA LA FUNCIONALIDAD A NUESTROS PRODUCTOS EN EL TABLERO
            (function (xx) {
                activate_product_dragV2(alldivdrag[xx],xx);
                create_prod_menu_btns(alldivdrag[xx].parentNode,xx,same_products);
            })(ct);

        }

                                    //alert(div2change);





        //ACTIVAMOS EVENTOS DROP EN NUESTRO TABLERO
        /*
        document.querySelector('#productos-cont-dragdrop').addEventListener("dragover",function (e) {e.preventDefault(); e.dataTransfer.dropEffect = "move"},false);
                         document.querySelector('#productos-cont-dragdrop').addEventListener("drop",function(e){create_drag_objects(e,'toboard',same_products);},false); */

        create_subtotal_productos();//recalculamos subtotal en caso de recargar, necesario para actualizar el subtotal de la tabla
        //alert(board_element + ' ' + table_element);



        create_rules(reglas[escala],v_reglas[escala],escala,reglas,v_reglas,distancia,v_distancia);
    }
}
function renderPage(type){
        var canvita = '';
    'use strict';
    var resultDiv = document.getElementById('previewImage');
    while (resultDiv.firstChild) {
      resultDiv.removeChild(resultDiv.firstChild);
    }
    function setpixelated(context) {
context['imageSmoothingEnabled'] = false; // standard /
context['mozImageSmoothingEnabled'] = false; /// Firefox /
context['oImageSmoothingEnabled'] = false; // Opera /
context['webkitImageSmoothingEnabled'] = false; // Safari /
context['msImageSmoothingEnabled'] = false; // IE
}
    //LIMPIAR CACHE DE FACEBOOK API GRAPH
    html2canvas(document.querySelector('#productos-cont-dragdrop'),{width:500,height:261}).then(
        function(canvas) {
          resultDiv.appendChild(canvas);

          canvita = canvas;
          canvas.id = 'canvons';
          //alert(document.querySelector('#canvons'));
          var tainted;
          try {
            canvas.getContext("2d").getImageData(0, 0, 1, 1);
            tainted = false;
          } catch (err) {
            tainted = true;
          }

          setTimeout(function () {
              //dependiendo del tipo de red social solicitada se hace una acciom
              var type_social = document.querySelector('#info-share-social');
              if(type=='face')
              {
                  document.querySelector('#info-share-social').typesocial = 'face';
              }
              else if(type == 'pinte')
              {
                  document.querySelector('#info-share-social').typesocial = 'pinterest';
              }
              else
                  {

                  }
              $('#base64').trigger('submit');
          },1000);
          //resultDiv.appendChild(document.createTextNode("Tainted: " + tainted));
          //alert('cañijo');
        },
        function(error) { resultDiv.appendChild(document.createTextNode(error)); }
    );
    return false;
  }
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(cname) {

    var expires = "expires="+ "Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = cname + "=" + "algo" + ";" + expires + ";path=/";
}
function create_subcategories(categorias,abrev,prod_matrix,drag_drop_lio) {
        var cont_subcategory = document.querySelector('#cont-subcategories');
        var subcategory = [];
        var text_subcat = [];
        var objeto_svg = [];
        var object_svg = [];
        for(var c = 0; c<categorias.length;c++)
        {
            subcategory[c] = document.createElement('div');
            text_subcat[c] = document.createElement('div');

            cont_subcategory.appendChild(subcategory[c]);
            //$(subcatory).html('asdasd');
            object_svg[c] = create_object_tag_V1('testiandoasd','responsive-object-img','/static/img/svg/productos/subcategories.svg','image/svg+xml',subcategory[c]);
            //Solo se observa el svg para la primera subcategoria
             if(c===0)
             {

             }
             else
             {

                 $(object_svg[c]).css('opacity',0);

             }
            $(text_subcat[c]).addClass('txt-subcat');
            $(subcategory[c]).addClass('subcategories');
            $(subcategory[c]).addClass('check-category');
            subcategory[c].appendChild(text_subcat[c]);


            text_subcat[c].innerHTML = gettext(categorias[c]);
            text_subcat[c].setAttribute('data-category',abrev[c]);
            (
                //eventos click para LAS SUBCATEGORIAS
                function (x) {
                    $(text_subcat[x]).eq(0).on('click').click(function () {
                   ajax_category_pais_finder($(this).attr('data-category'),prod_matrix,drag_drop_lio);
                   $(object_svg).css('opacity',0);//oculto todos
                   $(object_svg[x]).css('opacity',1); //muestro el que pulse
                        console.log('apuntado');
           });
                }
            )(c);


        }

        //disparamos click para la primera subcategoria
}
function create_prod2board(sel_prod,input,data)
        {
            //e.stopPropagation();

            var offsetX, offsetY,elemBelow,elementbellow,bufferX,bufferY;

            var show_prod_menu; //ojo que muestra/esconde menu
            var prod_menu; // menu de productos
            var left_arrow,right_arrow;
            var same_prod;
            //CLONAMOS NUESTRO PRODUCTO
            var prod_drag = sel_prod.cloneNode(true);
            var cont_producto = document.createElement('div');

            cont_producto.id = 'cont-productos' + input.drop_products;
            cont_producto.style.position = 'absolute';
            cont_producto.style.overflow = 'visible';

            show_prod_menu = document.createElement('img');
            show_prod_menu.classList.add('show_prod_menu');
            show_prod_menu.src = '/static/img/show.png';

            /*CAMBIO DE FUNCIONALIDAD AHORA MOSTRAMOS MENU EN EL EVENTO MOUSEUP Y NO CUANDO DAMOS CLICK AL OJO*/
            /*show_prod_menu.addEventListener('load',function (e) {
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
            },false);*/


            prod_menu = document.createElement('div');
            prod_menu.classList.add('prod_menu');

            left_arrow= document.createElement('img');
            left_arrow.classList.add('left_arrow');
            left_arrow.src = '/static/img/left_rot.png';

            right_arrow= document.createElement('img');
            right_arrow.classList.add('right_arrow');
            right_arrow.src = '/static/img/left_rot.png';

            same_prod= document.createElement('img');
            same_prod.classList.add('same_prod');
            same_prod.src = '/static/img/png/productos/botones/change_product.png';

            cont_producto.append(show_prod_menu);
            cont_producto.append(prod_menu);
            prod_menu.append(left_arrow);
            prod_menu.append(same_prod);
            prod_menu.append(right_arrow);




            //EVALUAMOS CUAL TAMAÑO TIENE EL PRODUCTO Y ASI LE DAMOS UN TAMAÑO
            //alert(data.tamano_producto);
            switch(String(data.tamano_producto)) {
                case '1':
                                        cont_producto.style.width = (10) + '%';
                                        cont_producto.style.height = (13) + '%';
                                        console.log('tamano 1');
                                        break;
                                    case '2':
                                        cont_producto.style.width = (13) + '%';
                                        cont_producto.style.height = (15) + '%';
                                        break;
                                    case '3':
                                        cont_producto.style.width = (17) + '%';
                                        cont_producto.style.height = (20) + '%';
                                        break;
                                    case '4':
                                        cont_producto.style.width = (20) + '%';
                                        cont_producto.style.height = (23) + '%';
                                        break;
                                    case '5':
                                        cont_producto.style.width = (24) + '%';
                                        cont_producto.style.height = (27) + '%';
                                        break;
                                    case '6':
                                        cont_producto.style.width = (28) + '%';
                                        cont_producto.style.height = (30) + '%'; //
                                        break;
                                    case '7':
                                        cont_producto.style.width = (31.66) + '%';///
                                        cont_producto.style.height = (35) + '%';
                                        console.log('tamano 7');
                                        break;
                default:

            }


            prod_drag.style.width = '90%';
            prod_drag.id = 'drop-productos' + input.drop_products;
            prod_drag.style.height = '90%';
            prod_drag.style.position = 'relative'; //
            prod_drag.style.left = '5%';
            prod_drag.style.top = '5%';
            prod_drag.style.overflow = 'visible';
            prod_drag.style.backgroundColor = 'transparent';
            prod_drag.style.pointerEvents = 'none';
            prod_drag.id_producto = data.id;
            prod_drag.nombre_producto = data.nombre_producto;
            prod_drag.precio_producto = data.precio_producto;
            prod_drag.tamano_producto = data.tamano_producto;
            prod_drag.prev_producto   = data.prev_producto;
            prod_drag.img_producto   =  data.img_producto;
            prod_drag.video_producto   = data.video_producto;
            prod_drag.troquel_producto__file_troquel = data.troquel_producto__file_troquel;

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

            console.log(prod_drag.querySelector('div[id^=play]')); // SI HAY VIDEO ACTIVAMOS SU EVENTO DE PLAY
            if(prod_drag.querySelector('div[id^=play]'))
            {
                prod_drag.querySelector('div[id^=play]').style.pointerEvents = 'auto';
                prod_drag.querySelector('div[id^=play]').style.top = '0%';//
                prod_drag.querySelector('div[id^=play]').style.left = '-30%';//
                prod_drag.querySelector('div[id^=play]').style.top = '30%';//
                cont_producto.append(prod_drag.querySelector('div[id^=play]'));
               cont_producto.querySelector('div[id^=play]').addEventListener('touchstart',function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        prod_drag.querySelector('video').play();
                 },false);
            }

            //BORRAMOS INFORMACION INNECESARIO DEL PRODUCTO
            var who_delete = prod_drag.querySelectorAll('div');////
            who_delete[0].remove();
            who_delete[1].remove();
            var delete_p = prod_drag.querySelector('p');
            delete_p.remove();
            cont_producto.append(prod_drag);
            ////

            document.querySelector('#test-dnd-mob').append(cont_producto);
            cont_producto.style.top = '10%';
            cont_producto.style.left = '50%';

            //CREAMOS VARIABLE DE TIMEOUT PARA MOSTRAR NUESTRO MENU
            var timemobmenu;
            //ACTIVACION DE EVENTOS DRAG AND DROP
            cont_producto.addEventListener('touchstart',function(e)
            {
                e.preventDefault(); // prevenir scroll en nuestra web mobile
                //MOSTRAMOS MENU !!! NUEVA FUNCIONALIDAD!!!!
                prod_menu.style.display = 'block';
                clearTimeout(timemobmenu);

                //POSICIONAMIENTO DE NUESTRO OBJETO
                offsetX = e.touches[0].clientX - this.getBoundingClientRect().left;
                offsetY = e.touches[0].clientY - this.getBoundingClientRect().top;
                bufferX =  (e.touches[0].clientX - document.querySelector('#cont-test-mob').getBoundingClientRect().left) - offsetX + 'px';
                bufferY = (e.touches[0].clientY  - document.querySelector('#cont-test-mob').getBoundingClientRect().top) - offsetY + 'px';
                cont_producto.style.left = (e.touches[0].clientX - document.querySelector('#cont-test-mob').getBoundingClientRect().left) - offsetX + 'px';
                cont_producto.style.top = (e.touches[0].clientY  - document.querySelector('#cont-test-mob').getBoundingClientRect().top) - offsetY + 'px';
                //cont_producto.style.backgroundColor = 'blue';

            },false);

            cont_producto.addEventListener('touchmove',function(e)
            {
                e.preventDefault();
               cont_producto.style.left = (e.touches[0].clientX - document.querySelector('#cont-test-mob').getBoundingClientRect().left) - offsetX + 'px';
                cont_producto.style.top = (e.touches[0].clientY  - document.querySelector('#cont-test-mob').getBoundingClientRect().top) - offsetY + 'px';

                //DETERMINAMOS LA UBICACION DEL PRODUCTO DRAGEADO Y DE ACUERDO A ELLO TOMAMOS DECISIONES
                //document.querySelector('#show-coor').innerHTML = '';
                cont_producto.hidden = true;
                elemBelow = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).parentNode.id;
                elementbellow = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY).id;
                cont_producto.hidden = false;
                //document.querySelector('#show-coor').innerHTML = elemBelow + ' ' + elementbellow;
                //console.log(cont_clon);
                //console.log(elemBelow.id + ' ' + elemBelow.id.substr(0, 14) + ' ' + elementbellow.id);
                            //if (!elemBelow) return;
                if (elementbellow== 'test-dnd-mob')//
                {
                    cont_producto.classList.add('tablero');
                    cont_producto.classList.remove('nada');
                    cont_producto.classList.remove('papelera');
                }
                else if(elementbellow== 'mob-papelera')
                {
                    cont_producto.classList.add('papelera');
                    cont_producto.classList.remove('nada');
                    cont_producto.classList.remove('tablero');
                }
                else
                {
                    cont_producto.classList.add('nada');
                    cont_producto.classList.remove('tablero');
                    cont_producto.classList.remove('papelera');
                }
                    //console.log(elemBelow);
                    //console.log(elementbellow);

            },false);
            cont_producto.addEventListener('touchend',function(e) {

                //ACTIVAMOS TIMEOUT PARA OCULTAR NUESTRO MENU

                timemobmenu =  setTimeout(function () {
                                          prod_menu.style.display = 'none';
                                      },1500);

                var adentro = cont_producto.classList.contains('tablero');
                var papelera = cont_producto.classList.contains('papelera');
                var afuera = cont_producto.classList.contains('nada');

                if(adentro)
                {
                    //alert('adentro');
                    save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
                }
                else if(papelera)
                {
                    cont_producto.remove();
                    delete_file_mob_productos('#subtotal_productos_mob tbody',[data.nombre_producto,data.id,1]);
                    create_subtotal_productos_mob();
                    //guardamos tabla y tablero
                    save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
                }
                else
                {
                    cont_producto.style.left = bufferX;
                    cont_producto.style.top = bufferY;
                    //alert('afuera');
                }

            },false);

        }
function create_mob_products(data,zones)
{
    var cont_products = []; // contenedor de productos
    var producto = []; // producto
    var precio_prod = [];  // precio productos
    var svg_prod = [];
    var img_prod = [];
    var video_prod = [];
    var list_productos = document.querySelector('#mob-products-list');
    var input = document.querySelector('#info-productos');
    var prod_object = [];
    var play_video = [];
    var select_prod = [];
    var text_select_prod  = [];
    var exit_select_prod  = [];





    var prod_drag;
    var cont_prod_drag;
    var c_buffer;
    for(var c = 0; c<data.length;c++)
    {
        cont_products[c] = document.createElement('div');//
        cont_products[c].classList += 'mob-prod';
        cont_products[c].show = 'no';
        exit_select_prod[c] = document.createElement('p');
        exit_select_prod[c].classList += 'exit-sel-prod';
        exit_select_prod[c].innerHTML = 'X';
        select_prod[c] = document.createElement('div');
        text_select_prod[c] = document.createElement('p');
        text_select_prod[c].innerHTML = gettext('select') + '<br>' + 'product';

        select_prod[c].classList += 'select-prod';
        precio_prod[c] = document.createElement('div');
        precio_prod[c].classList += 'mob-price-prod';
        list_productos.append(cont_products[c]);
        select_prod[c].append(text_select_prod[c]);
        cont_products[c].append(select_prod[c]);
        cont_products[c].append(precio_prod[c]);
        cont_products[c].append(exit_select_prod[c]);

        precio_prod[c].innerHTML = data[c].precio_producto + ' ' + getCookie('cambio');

           console.log(data[c].prev_producto);
         if(data[c].prev_producto == 'ZON')
         {
             prod_object[c]  = create_object_tag_V1('obj-svg-mob' + c, 'mob-img-responsive', '/media/' +data[c].troquel_producto__file_troquel, 'image/svg+xml', document.querySelector('#mobile-product'));
             prod_object[c].style.position = 'absolute';
             prod_object[c].style.left = '2000px';
             prod_object[c].style.left = '3000px';

                    (function (x) {
                    //evento cuando carga producto para cargar sus colores asociados
                        $(prod_object[x]).on('load',function ()
                        {
                            svg_prod[x] = this.contentDocument.querySelector('svg');
                            svg_prod[x].style.width = '100%';
                            svg_prod[x].style.height = '100%';
                            svg_prod[x].setAttribute('pointer-events','none');//prevenimos eventos disparados por elementos dentro del svg
                            //alert(svg_prod);
                            var sss = svg_prod[x].querySelectorAll("[id^=click]");
                            for(var ii= 0;ii<sss.length;ii++)
                            {
                                    svg_prod[x].querySelector('#'+ sss[ii].id.slice(5)+' image').setAttribute('xlink:href','/media/'+zones[x][ii]['color_zona__file_color']);
                                    svg_prod[x].querySelector('#'+ sss[ii].id.slice(5)+' image').setAttribute('data-realimage',zones[x][ii]['color_zona__file_color']);
                            }
                              //MANEJANDO PATRONES
                                var circ = svg_prod[x].querySelector("g#patrones");
                                    var rayas = svg_prod[x].querySelector("g#patrones2");

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
                            cont_products[x].append(svg_prod[x]);

                        });
                })(c);


         }
         else if(data[c].prev_producto == 'IMG')
         {
             img_prod[c] = document.createElement('img');
             img_prod[c].style.width = '100%';
             img_prod[c].style.height = 'auto';
             img_prod[c].setAttribute('pointer-events','none');//prevenimos eventos disparados por elementos dentro del svg

             img_prod[c].src = '/media/'+ data[c].img_producto;
             cont_products[c].append(img_prod[c]);
         }
         else
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

             cont_products[c].append(video_prod[c]);

             play_video[c] = document.createElement('div');
             play_video[c].style.width = '35%';
             play_video[c].id = 'play'+c;
             play_video[c].style.height = '25%';
             play_video[c].style.backgroundColor = 'yellow';
             play_video[c].style.position = 'absolute';
             play_video[c].style.top = '0%';
             play_video[c].style.left = '103%';
             play_video[c].innerHTML = '<svg pointer-events="none" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32"><title></title><path d="M6 4l20 12-20 12z"></path></svg>';
             cont_products[c].append(play_video[c]);

             (function (xx) {
                 play_video[xx].addEventListener('touchstart',function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        video_prod[xx].play();
                 },false);
             })(c);

         }

          //AGREGAR PARAMETROS DEL PRODUCTO EN EL CONTENEDOR DE MISMO

            //ESTABLECEMOS LOS ATRIBUTOS QUE NECESITA NUESTRO PRODUCTO PARA FUNCIONAR CON COOKIES
            cont_products[c].setAttribute('data-fromto','papelera');
            cont_products[c].setAttribute('data-nombre',data[c].nombre_producto);
            cont_products[c].setAttribute('data-idproducto',data[c].id);//
            cont_products[c].setAttribute('data-precio',data[c].precio_producto);
            cont_products[c].setAttribute('data-tamano',data[c].tamano_producto);
            cont_products[c].setAttribute('data-angle','0');
            cont_products[c].setAttribute('data-troquel',data[c].troquel_producto__file_troquel);
            cont_products[c].setAttribute('data-prev_producto',data[c].prev_producto);
            cont_products[c].setAttribute('data-img_producto',data[c].img_producto);
            cont_products[c].setAttribute('data-video_producto',data[c].video_producto);


        //EVENTOS PARA EL DRAG AND DROP

        var offsetX;
        var offsetY;
        var elemBelow;
        var elementbellow;


        (function (x) {
             select_prod[x].addEventListener('touchstart',function (e) {
                //creacion de producto en el tablero
                 e.stopPropagation();
                 create_file_productos('#subtotal_productos_mob tbody',[data[x].id,data[x].nombre_producto,data[x].precio_producto,1,'#cantidad'+input.filas,data[x].tamano_producto]);
                 create_subtotal_productos_mob();
                 create_prod2board(cont_products[x],input,data[x]);
                 input.drop_products++;

                 $(select_prod[x]).fadeOut('slow');
                 $(exit_select_prod[x]).fadeOut('slow');
                 cont_products[x].show = 'no';

                 save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);

             },false);

            cont_products[x].addEventListener('touchstart',function(e)
            {
                e.stopPropagation();
                if(this.show == 'no')
                {
                    $(select_prod[x]).fadeIn('slow');
                    $(exit_select_prod[x]).fadeIn('slow');
                    this.show = 'si';
                }
                else
                 {
                    /* select_prod[x].style.display = 'none';
                     exit_select_prod[x].style.display = 'none';
                     this.show = 'no';*/
                 }

            },false);
            exit_select_prod[x].addEventListener('touchstart',function (e) {
                 //creacion de producto en el tablero
                 e.stopPropagation();
                 //alert('exit');
                 $(select_prod[x]).fadeOut('slow');
                 $(exit_select_prod[x]).fadeOut('slow');
                 //select_prod[x].style.display = 'none';
                 //exit_select_prod[x].style.display = 'none';
                 cont_products[x].show = 'no';
             },false);
        })(c);


    }

}
function panel_mobile_products(data,zones)
        {
            var prod_object = [];
            var cont_product_dash = [];
            var left_dash = [];
            var center_dash = [];
            var right_dash = [];
            var svgobject = [];
            var p_nombre = [];
            var p_precio = [];
            var p_descripcion = [];
            var p_cantidad = [];
            var a_compra = [];
            for(var c = 0; c<data.length;c++)
            {
                cont_product_dash[c] = document.createElement('div');
                left_dash[c] = document.createElement('div');
                center_dash[c] = document.createElement('div');
                right_dash[c] = document.createElement('div');

                p_nombre[c] = document.createElement('p');
                p_nombre[c].innerHTML =  '<span><strong> Nombre: </strong></span>'  + data[c].nombre_producto;
                right_dash[c].appendChild(p_nombre[c]);

                p_precio[c] = document.createElement('p');
                p_precio[c].innerHTML = '<span><strong>Precio: </strong></span>' + data[c].precio_producto;
                right_dash[c].appendChild(p_precio[c]);

                p_descripcion[c] = document.createElement('p');
                p_descripcion[c].innerHTML = '<span><strong> Descripción: </strong></span>' +data[c].descripcion_producto;
                right_dash[c].appendChild(p_descripcion[c]);

                p_cantidad[c] = document.createElement('div');
                p_cantidad[c].innerHTML = "<input  type='number' value='1' min='1' max='10' step='1' style='width: 35px;'><span class='validity'></span>";
                p_cantidad[c].id = 'test-input'+c;
                right_dash[c].appendChild(p_cantidad[c]);

                a_compra[c] = document.createElement('a');
                a_compra[c].href = '';
                a_compra[c].style.display = 'inline';
                $(a_compra[c]).addClass('simple-link');
                a_compra[c].innerHTML = "<p class='p-shopcar'><span class='icon-shopcarsmall'>Añadir al carrito</span></p>";
                a_compra[c].info_product = data[c];
                right_dash[c].appendChild(a_compra[c]);

                center_dash[c].style.width = 3 + 'px';
                center_dash[c].style.height = 15 + 'vh';
                //center_dash[c].style.position = 'absolute';
                //center_dash[c].style.top = 5 + '%';
                //center_dash[c].style.left = 50 + '%';
                center_dash[c].style.backgroundColor = 'black';

                cont_product_dash[c].appendChild(left_dash[c]);
                cont_product_dash[c].appendChild(center_dash[c]);
                cont_product_dash[c].appendChild(right_dash[c]);

                $(cont_product_dash[c]).addClass('cont-dash-product');
                $(left_dash[c]).addClass('left-dash');
                $(right_dash[c]).addClass('right-dash');

                //DEFINIR TIPO DE IMAGEN A MOSTRAR
                console.log(data[c].prev_producto);
                if(data[c].prev_producto == 'IMG')
                {
                    console.log('troquel');
                    prod_object[c]  = create_object_tag_V1('sliderimg' + c, 'mob-img-responsive', '/media/' +data[c].troquel_producto__file_troquel, 'image/svg+xml', left_dash[c]);

                    (function (x) {
                    //evento cuando carga producto para cargar sus colores asociados
                        $(prod_object[x]).on('load',function ()
                        {
                            svgobject[x] = this.contentDocument;
                            var sss = svgobject[x].querySelectorAll("[id^=click]");
                            for(var ii= 0;ii<sss.length;ii++)
                            {
                                    svgobject[x].querySelector('#'+ sss[ii].id.slice(5)+' image').setAttribute('xlink:href','/media/'+zones[x][ii]['color_zona__file_color']);
                            }
                        });

                        //EVENTOS TOUCH
                        prod_object[x].addEventListener('click',function(e)
                        {
                            //this.style.left = (e.pageX - 10) + 'px';
                            //this.style.top = (e.pageY - 10) + 'px';
                            alert('touch');
                        },false);
                })(c);
                }
                else if(data[c].prev_producto == 'ZON')
                {
                    console.log('imagen');
                }
                else //VID video
                {
                    console.log('video');
                }
                document.querySelector('#cont-mobile-products').appendChild(cont_product_dash[c]);






                (function (x) {
                //evento click para el carrito de compra cookie y demas juguetes
                    $(a_compra[x]).on('click',function (e) {
                        var info_producto = [data[x].id,$('#test-input'+x +' input').val(),data[x].precio_producto];
                        e.preventDefault();
                        $.ajax({
                             url:  'fillmobileshopcar', //  guardar/ the endpoint,commonly same url
                             type: 'get', //parece que no es necesario
                             data: {'datos[]':JSON.stringify(info_producto)}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                             cache: false,
                             //processData: false, // csrfmiddlewaretoken : csrftoken
                             dataType: 'json',
                             // handle a successful response
                             success: function (data) {
                                 //alert(data.datos.resultado + ' ' + data.datos.shopitems);
                                 alert('producto añadido al carrito');
                                 $('#cart-number').html(data.datos.shopitems);
                                 //setCookie('shopitem',data.datos.shopitems,30);
                             },
                             // handle a non-successful response
                             error: function (xhr, errmsg, err) {
                                 alert(errmsg);
                             }
                        });
                        return false;
                    });
            })(c);

            }


        }
function mobile_category_finder(category)
{
     var pais = getCookie('pais');
    $.ajax({
                 url:  'testquery', //  guardar/ the endpoint,commonly same url
                 type: 'get', //parece que no es necesario
                 data: {'category': category,'pais':pais}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //DAMOS FORMATO A NUESTRO ARRAY DE PRODUCTOS PARA QUE SE PROCESADO ADECUADAMENTE
                     var newproduct = [] ;
                            for(var c = 0; c<data.productos.length;c++)
                            {
                                newproduct[c] = data.productos[c][0];
                                //console.log(newproduct[c].video_producto +newproduct[c].troquel_producto__file_troquel + ' ' +newproduct[c].troquel_producto__editable_troquel + ' ' +newproduct[c].img_producto + ' ' + newproduct[c].prev_producto );   ////
                            }

                     $('#mob-products-list').html('');
                     if(newproduct.length === 0)
                     {
                         //$('#cont-mobile-products').css('display','flex');
                         $('#mob-products-list').html('No se ha encontrado ningún producto, elige otra categoría.');
                     }
                     else
                     {
                         //$('#cont-mobile-products').css('display','flex');
                         //panel_mobile_products(newproduct,data.datazones);
                         create_mob_products(newproduct,data.datazones);
                     }

                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
}
function change_element_by_mob_matrix_object(prod_selected,img_sliders,zones)//funcion que cambia los colores del producto cuando se selecciona alguna de las opciones disponibles
{
    var input  = document.querySelector('#info-productos');
    var paint_zones = []; //zonas a cambiar de color
    var  prod_object = [];
    var svg_prod = [];
                        //OBTENEMOS INPUT CON NUESTRAS IMAGENES EN BASE64  #trigg-b64-to-key-dict
                        var base64_images = document.querySelector('#trigg-b64-to-key-dict').colorimages;
                        var svg2change,img2change,video2change,svgclick,imgclick,videoclick;
                        var recoverimg = [];
                        var recovervideo = [];
                        var video_prod = [];
                        var play_video = [];
                        var recoverplay = [];
                        for(var ctn = 0; ctn<img_sliders.length; ctn++)
                        {
                            (function (x)
                                {
                            img_sliders[x].addEventListener("click",function (e) {
                                //console.log('selected' + prod_selected.tamano+ ' op '+ this.tamano);
                                //creacion de scope por iteracion interna
                                   //svg de producto a cambiar //alert(prod_selected.querySelector('svg'));

                                //cambiamos los data de nuestro drop-productos (se necesitan para las cookies)
                                  prod_selected.setAttribute('data-fromto','papelera');
                                  prod_selected.setAttribute('data-nombre',img_sliders[x].nombre_producto);
                                  prod_selected.setAttribute('data-idproducto',img_sliders[x].id_producto);
                                  prod_selected.setAttribute('data-precio',img_sliders[x].precio_producto);
                                  prod_selected.setAttribute('data-tamano',img_sliders[x].tamano_producto);
                                  //prod_selected.setAttribute('data-angle','0'); //puede que el producto anterior este en otro angulo de giro
                                  prod_selected.setAttribute('data-troquel',img_sliders[x].troquel_producto__file_troquel);
                                  prod_selected.setAttribute('data-prev_producto',img_sliders[x].prev_producto);
                                  prod_selected.setAttribute('data-img_producto',img_sliders[x].img_producto);
                                  prod_selected.setAttribute('data-video_producto',img_sliders[x].video_producto);
                                switch(String(this.tamano_producto))
                                {
                                        case '1':
                                        prod_selected.parentNode.style.width = (10) + '%';
                                        prod_selected.parentNode.style.height = (13) + '%';
                                        console.log('tamano 1');
                                        break;
                                    case '2':
                                        prod_selected.parentNode.style.width = (13) + '%';
                                        prod_selected.parentNode.style.height = (15) + '%';
                                        break;
                                    case '3':
                                        prod_selected.parentNode.style.width = (17) + '%';
                                        prod_selected.parentNode.style.height = (20) + '%';
                                        break;
                                    case '4':
                                        prod_selected.parentNode.style.width = (20) + '%';
                                        prod_selected.parentNode.style.height = (23) + '%';
                                        break;
                                    case '5':
                                        prod_selected.parentNode.style.width = (24) + '%';
                                        prod_selected.parentNode.style.height = (27) + '%';
                                        break;
                                    case '6':
                                        prod_selected.parentNode.style.width = (28) + '%';
                                        prod_selected.parentNode.style.height = (30) + '%';
                                        break;
                                    case '7':
                                        prod_selected.parentNode.style.width = (31.66) + '%';///
                                        prod_selected.parentNode.style.height = (35) + '%';
                                        console.log('tamano 7');
                                        break;
                                    default:

                                    }

                                    svg2change = prod_selected.querySelector('svg');//obtenemos svg del div a cambiar del producto
                                     img2change = prod_selected.querySelector('img');//obtenemos img del div a cambiar del producto
                                     video2change = prod_selected.querySelector('video');//obtenemos svg del div a cambiar del producto
                                    svgclick = img_sliders[x].querySelector('svg');
                                    imgclick = img_sliders[x].querySelector('img');
                                    videoclick = img_sliders[x].querySelector('video');
                                    console.log(svg2change);
                                    console.log(svgclick);
                                    console.log(img_sliders[x].querySelector('div[id^=play]'));
                                    if(!(svgclick == null))//si hay svg
                                    {


                                        if(img_sliders[x].querySelector('div[id^=play]') == null)
                                        {
                                            console.log('si video');
                                        }
                                        else
                                        {
                                            console.log('no video');
                                            if(svg2change == null) //no hay svg en el tablero
                                        {
                                            prod_object[x]  = create_object_tag_V1('obj-svg-mob' + x, 'mob-img-responsive', '/media/' +img_sliders[x].troquel_producto__file_troquel, 'image/svg+xml', document.querySelector('#mobile-product'));
                                             prod_object[x].style.position = 'absolute';
                                             prod_object[x].style.left = '2000px';
                                             prod_object[x].style.left = '3000px';

                                                    (function (xx) {
                                                    //evento cuando carga producto para cargar sus colores asociados
                                                        $(prod_object[xx]).on('load',function ()
                                                        {
                                                            svg_prod[xx] = this.contentDocument.querySelector('svg');
                                                            console.log(svg_prod[xx]);
                                                            svg_prod[xx].style.width = '100%';
                                                            svg_prod[xx].style.height = '100%';
                                                            svg_prod[xx].setAttribute('pointer-events','none');//prevenimos eventos disparados por elementos dentro del svg
                                                            //alert(svg_prod);
                                                            var sss = svg_prod[xx].querySelectorAll("[id^=click]");
                                                            for(var ii= 0;ii<sss.length;ii++)
                                                            {
                                                                    svg_prod[xx].querySelector('#'+ sss[ii].id.slice(5)+' image').setAttribute('xlink:href','/media/'+zones[x][ii]['color_zona__file_color']);
                                                                    svg_prod[xx].querySelector('#'+ sss[ii].id.slice(5)+' image').setAttribute('data-realimage',zones[x][ii]['color_zona__file_color']);
                                                            }
                                                            prod_selected.append(svg_prod[xx]); //

                                                        });
                                                })(x);
                                        }
                                        else // si hay svg en el tablero
                                            {
                                                var sss = svg2change.querySelectorAll("[id^=click]");
                                            //seleccionamos las zonas dentro del svg que deben cambiar de color
                                                for(var ii= 0;ii<sss.length;ii++)
                                                {
                                                    paint_zones = svg2change.querySelectorAll('#' + sss[ii].id.slice(5) + ' image');
                                                    for (var k = 0; k < paint_zones.length; k++) {
                                                        paint_zones[k].setAttribute('xlink:href', base64_images.get(zones[x][ii]['color_zona__file_color']));
                                                        paint_zones[k].setAttribute('data-realimage',zones[x][ii]['color_zona__file_color']);
                                                    }
                                                }
                                                console.log('hay svgs1');
                                            }
                                        }

                                    }
                                    else
                                    {
                                        if (svg2change == null)//tampoco hay imagen dentro del producto
                                        {

                                        }
                                        else //hay imagen dentro del producto
                                        {
                                            svg2change.remove();//
                                        }
                                    }
                                    //console.log(svg2change);
                                    //console.log(imagenes);
                                    //console.log(video);
                                    if(!(imgclick==null)) //hay imagen el elemento del click
                                    {
                                        //console.log('hay imagen1');
                                        if(img2change == null)//no hay img en el tablero
                                        {
                                            recoverimg[x] = document.createElement('img');
                                            recoverimg[x].style.width =100+'%';
                                            recoverimg[x].style.height ='auto';
                                            recoverimg[x].style.position ='absolute';
                                            recoverimg[x].style.top ='0';
                                            recoverimg[x].style.left ='0';
                                            recoverimg[x].src = '/media/' + img_sliders[x].img_producto;
                                            prod_selected.append(recoverimg[x]);
                                            /*DEBEMOS DESHABILITAR EL FECTO DE DRAG  EN IMAGENES POR DEFECTO EN CHROME*/
                                        }
                                        else
                                        {
                                            img2change.src = '/media/'+img_sliders[x].img_producto;
                                        }

                                    }
                                    else // no hay img en el producto seleccionado
                                    {
                                        if (img2change == null)//tampoco hay imagen dentro del producto
                                        {

                                        }
                                        else //hay imagen dentro del producto
                                        {
                                            img2change.remove();
                                        }

                                    }
                                    if(!(videoclick == null))
                                    {
                                        if(video2change == null)//no hay video en el tablero
                                        {
                                            video_prod[x] = document.createElement('video');
                                             video_prod[x].style.width = '100%';
                                             video_prod[x].style.height = 'auto';
                                             video_prod[x].setAttribute('pointer-events','none');//prevenimos eventos disparados por elementos dentro del svg
                                             //video_prod[c].setAttribute('controls','true'); //los controles nos joden el cursor y eventos para nuestro drag and drop
                                             video_prod[x].setAttribute('poster','/static/img/mexico.png');
                                             video_prod[x].src = '/media/'+ img_sliders[x].video_producto;
                                             video_prod[x].src.innerHTML = '<source src="' + '/media/' + img_sliders[x].video_producto +'" type="video/mp4">\n' +
                                                            '<source src="movie.ogg" type="video/ogg">';//



                                             play_video[x] = document.createElement('div');
                                             play_video[x].style.width = '35%';
                                             play_video[x].id = 'play'+x;
                                             play_video[x].style.height = '25%';
                                             play_video[x].style.backgroundColor = 'yellow';
                                             play_video[x].style.position = 'absolute';
                                             play_video[x].style.top = '0%';
                                             play_video[x].style.left = '103%';
                                             play_video[x].innerHTML = '<svg pointer-events="none" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32"><title></title><path d="M6 4l20 12-20 12z"></path></svg>';
                                             img_sliders[x].append(video_prod[x]);
                                             img_sliders[x].parentNode.append(play_video[x]);

                                             play_video[x].style.top = '0';
                                             play_video[x].style.left = '-30%';

                                             (function (xx) {
                                                 play_video[xx].addEventListener('touchstart',function (e) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        video_prod[xx].play();
                                                 },false);
                                             })(x);
                                            //play_video[x].append(iconplay[x]);
                                        }
                                        else
                                        {
                                            video2change.innerHTML = '<source src="' + '/media/' + img_sliders[x].video_producto +'" type="video/mp4">\n' +
                                                '  <source src="movie.ogg" type="video/ogg">';
                                        }
                                    }
                                    else
                                    {
                                        if(video2change == null)
                                        {

                                        }
                                        else
                                        {
                                            video2change.remove();
                                        }
                                    }
                                    //ACTUALIZACION DE TABLAAAA!!
                                //alert(img_sliders[x].id_producto+img_sliders[x].nombre+img_sliders[x].precio);

                                //ACTIVAMOS DE NUEVO EL EVENTO DRAGSTART DE NUESTRO PRODUCTO PORQUE TAL VEZ CAMBIO DE TAMAÑO
                                console.log(img_sliders[x].id_producto + ' ' + prod_selected.id_producto);
                                    update_table_by_mob_matrix('#subtotal_productos_mob tbody',[img_sliders[x].id_producto,img_sliders[x].nombre_producto,img_sliders[x].precio_producto,1,'#cantidad'+input.filas,img_sliders[x].tamano_producto],[prod_selected.id_producto,prod_selected.nombre_producto,prod_selected.precio_producto,prod_selected.tamano_producto],prod_selected,img_sliders[x]);

                                },false);
                            })(ctn);


                        }
}
function change_element_by_matrix_object(prod_selected,img_sliders,zones)//funcion que cambia los colores del producto cuando se selecciona alguna de las opciones disponibles
{
    var input  = document.querySelector('#info-productos');
    var paint_zones = []; //zonas a cambiar de color
                        //OBTENEMOS INPUT CON NUESTRAS IMAGENES EN BASE64  #trigg-b64-to-key-dict
                        var base64_images = document.querySelector('#trigg-b64-to-key-dict').colorimages;
                        var svg2change,img2change,video2change,svgclick,imgclick,videoclick;
                        var recoverimg = [];
                        var recovervideo = [];
                        var recoverplay = [];
                        for(var ctn = 0; ctn<img_sliders.length; ctn++)
                        {
                            (function (x)
                                {

                            img_sliders[x].addEventListener("click",function (e) {
                                //console.log('selected' + prod_selected.tamano+ ' op '+ this.tamano);
                                //creacion de scope por iteracion interna
                                   //svg de producto a cambiar //alert(prod_selected.querySelector('svg'));

                                //cambiamos los data de nuestro drop-productos (se necesitan para las cookies)
                                prod_selected.setAttribute('data-fromto','papelera');
                                  prod_selected.setAttribute('data-nombre',img_sliders[x].nombre_producto);
                                  prod_selected.setAttribute('data-idproducto',img_sliders[x].id_producto);
                                   console.log(img_sliders[x].pattern_producto);
                                  prod_selected.setAttribute('data-precio',img_sliders[x].precio_producto);
                                  prod_selected.setAttribute('data-tamano',img_sliders[x].tamano_producto);
                                  //prod_selected.setAttribute('data-angle','0'); //puede que el producto anterior este en otro angulo de giro
                                  prod_selected.setAttribute('data-troquel',img_sliders[x].troquel_producto__file_troquel);
                                  prod_selected.setAttribute('data-img_producto',img_sliders[x].img_producto);
                                  prod_selected.setAttribute('data-video_producto',img_sliders[x].video_producto);
                                switch(this.tamano_producto)
                                {
                                        case 1:
                                            prod_selected.parentNode.style.width = (1.9) + '%';
                                            prod_selected.parentNode.style.height = (4) + '%';
                                            //console.log('tamano 1');
                                            break;
                                        case 2:
                                            prod_selected.parentNode.style.width = (3.333333) + '%';
                                            prod_selected.parentNode.style.height = (6) + '%';
                                            break;
                                        case 3:
                                            prod_selected.parentNode.style.width = (3.333333) + '%';
                                            prod_selected.parentNode.style.height = (6) + '%';
                                            break;
                                        case 4:
                                            prod_selected.parentNode.style.width = (3.333333) + '%';
                                            prod_selected.parentNode.style.height = (6) + '%';
                                            break;
                                        case 5:
                                            prod_selected.parentNode.style.width = (20) + '%';
                                            prod_selected.parentNode.style.height = (50) + '%';
                                            break;
                                        case 6:
                                            prod_selected.parentNode.style.width = (23.52) + '%';
                                            prod_selected.parentNode.style.height = (60) + '%';
                                            break;
                                        case 7:
                                            prod_selected.parentNode.style.width = (31.66) + '%';///
                                            prod_selected.parentNode.style.height = (70) + '%';
                                            console.log('tamano 7');
                                            break;
                                        default:

                                    }

                                    svg2change = prod_selected.querySelector('svg');//obtenemos svg del div a cambiar del producto
                                     img2change = prod_selected.querySelector('img');//obtenemos img del div a cambiar del producto
                                     video2change = prod_selected.querySelector('video');//obtenemos svg del div a cambiar del producto
                                    svgclick = img_sliders[x].querySelector('svg');
                                    imgclick = img_sliders[x].querySelector('img');
                                    videoclick = img_sliders[x].querySelector('video');
                                     //INSPECCIONAMOS PATRONES
                                    var circ = svg2change.querySelector("#patrones");
                                    var rayas = svg2change.querySelector("#patrones2");
                                    if(!(svg2change == null))
                                    {
                                        if(img_sliders[x].pattern_producto=='')
                                        {
                                            circ.style.display = 'none';
                                            rayas.style.display = 'none';
                                        }
                                        else if(img_sliders[x].pattern_producto=='pat1')
                                        {
                                            circ.style.display = 'inline';
                                            rayas.style.display = 'none';
                                        }
                                        else
                                            {
                                                circ.style.display = 'none';
                                                rayas.style.display = 'inline';
                                            }
                                        var sss = svg2change.querySelectorAll("[id^=click]");

                                        //seleccionamos las zonas dentro del svg que deben cambiar de color
                                        for(var ii= 0;ii<sss.length;ii++)
                                        {
                                            paint_zones = svg2change.querySelectorAll('#' + sss[ii].id.slice(5) + ' image');
                                            for (var k = 0; k < paint_zones.length; k++) {
                                                paint_zones[k].setAttribute('xlink:href', base64_images.get(zones[x][ii]['color_zona__file_color']));
                                                paint_zones[k].setAttribute('data-realimage',zones[x][ii]['color_zona__file_color']);
                                            }
                                        }
                                        console.log('hay svgs1');
                                    }
                                    //console.log(svg2change);
                                    //console.log(imagenes);
                                    //console.log(video);
                                    if(!(imgclick==null)) //hay imagen el elemento del click
                                    {
                                        //console.log('hay imagen1');
                                        if(img2change == null)//no hay img en el tablero
                                        {
                                            recoverimg[x] = document.createElement('img');
                                            recoverimg[x].style.width =100+'%';
                                            recoverimg[x].style.height =100+'%';
                                            recoverimg[x].style.position ='absolute';
                                            recoverimg[x].style.top ='0';
                                            recoverimg[x].style.left ='0';
                                            recoverimg[x].src = img_sliders[x].img_producto;
                                            prod_selected.append(recoverimg[x]);
                                            /*DEBEMOS DESHABILITAR EL FECTO DE DRAG  EN IMAGENES POR DEFECTO EN CHROME*/
                                            recoverimg[x].ondragstart = function() { return false;};
                                            recoverimg[x].setAttribute('draggable','false');
                                            recoverimg[x].setAttribute('ondragstart','return false;');
                                        }
                                        else
                                        {
                                            img2change.src = '/media/'+img_sliders[x].img_producto;
                                        }

                                    }
                                    else // no hay img en el producto seleccionado
                                    {
                                        if (img2change == null)//tampoco hay imagen dentro del producto
                                        {

                                        }
                                        else //hay imagen dentro del producto
                                        {
                                            img2change.remove();
                                        }

                                    }
                                    if(!(videoclick == null))
                                    {
                                        if(video2change == null)//no hay img en el tablero
                                        {
                                            recovervideo[x] = document.createElement('video');
                                            recovervideo[x].style.width =100+'%';
                                            recovervideo[x].style.height =100+'%';
                                            recovervideo[x].style.position ='absolute';
                                            recovervideo[x].style.top ='0';
                                            recovervideo[x].style.left ='0';
                                            recovervideo[x].setAttribute('autoplay','true');
                                            //video_prod[x].setAttribute('controls','');
                                            //video_prod[prod].setAttribute('draggable','true');
                                            recovervideo[x].innerHTML = '<source src="' + '/media/' + img_sliders[x].video_producto +'" type="video/mp4">\n' +
                                                '  <source src="movie.ogg" type="video/ogg">';

                                            recoverplay[x] = document.createElement('div');
                                            recoverplay[x].style.width = '20%';
                                            recoverplay[x].style.height = '14%';
                                            recoverplay[x].style.backgroundColor = 'yellow';
                                            recoverplay[x].style.position = 'absolute';
                                            recoverplay[x].style.top = '90%';
                                            recoverplay[x].style.left = '0%';
                                            recoverplay[x].style.opacity = '0';
                                            recoverplay[x].innerHTML ='<!-- Generated by IcoMoon.io -->\n' +
                                                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 100%;height: 100%;position:absolute;top:0%;left:0;" viewBox="0 0 32 32">\n' +
                                                '<title>play3</title>\n' +
                                                '<path d="M6 4l20 12-20 12z"></path>\n' +
                                                '</svg>';
                                            //iconplay[x] = document.createElement('p');
                                            //iconplay[x].className += "play-icon";
                                            //iconplay[x].innerHTML = 'a';
                                            img_sliders[x].append(recovervideo[x]);
                                            img_sliders[x].parentNode.append(recoverplay[x]);

                                            recoverplay[x].addEventListener('click',function (e) {
                                                //console.log('play');

                                                        recovervideo[x].play();

                                                    });
                                            //play_video[x].append(iconplay[x]);
                                            }
                                        else
                                        {
                                            video2change.innerHTML = '<source src="' + '/media/' + img_sliders[x].video_producto +'" type="video/mp4">\n' +
                                                '  <source src="movie.ogg" type="video/ogg">';
                                        }
                                    }
                                    else
                                    {
                                        if(video2change == null)
                                        {

                                        }
                                        else
                                        {
                                            video2change.remove();
                                        }
                                    }
                                    //ACTUALIZACION DE TABLAAAA!!
                                //alert(img_sliders[x].id_producto+img_sliders[x].nombre+img_sliders[x].precio);

                                //ACTIVAMOS DE NUEVO EL EVENTO DRAGSTART DE NUESTRO PRODUCTO PORQUE TAL VEZ CAMBIO DE TAMAÑO
                                console.log(this.id_producto + ' ' + prod_selected.id_producto);
                                    update_table_by_matrix('#subtotal_productos tbody',[this.id_producto,this.nombre_producto,this.precio_producto,1,'#cantidad'+input.filas,this.tamano_producto],[prod_selected.id_producto,prod_selected.nombre_producto,prod_selected.precio_producto,prod_selected.tamano_producto],prod_selected,img_sliders[x]);

                                },false);
                            })(ctn);


                        }
}
function ajax_show_same_mob_products(sameproducts,troquel,prod_selected)
{
    var pais = getCookie('pais');
    $.ajax({
                 url:  'showsameproducts', //  guardar/ the endpoint,commonly same url
                 type: 'get', //parece que no es necesario
                 data: {'troquel': troquel,'pais':pais}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //COMO MOSTRAR DATOS VIA AJAX  data.<variable_django>[posicion].<campo del modelo>
                    //alert(data.productos[0].nombre_producto + ' ' + data.productos.length) ;
                        //console.log(data.productos[0]['nombre_producto']);

                        //document.querySelector('#same-mob-products').style.display = 'block';
                        //document.querySelector('#cancel-mob-same').style.display = 'block';
                        document.querySelector('#cancel-mob-same').addEventListener('touchstart',function (e) {
                            document.querySelector('#same-mob-products').style.display = 'none';
                            document.querySelector('#cancel-mob-same').style.display = 'none';
                        },false);
                        sameproducts.clear_matrix();//limpiamos en caso de ya existir containers
                        sameproducts.charge_containers(data.productos,'matrix-mob-containers');
                        sameproducts.activate_pretty_mouseover();
                        var img_sliders = sameproducts.paint_object_with_64images_same_mob('/media/',data.productos,data.datazones);
                        //FUNCIÓN CLAVE CAMBIA NUESTROS PRODUCTOS EN EL TABLERO AL ELEMENTO QUE SE MUESTRE EN LA MATRIZ
                        change_element_by_mob_matrix_object(prod_selected,img_sliders,data.datazones); //donde prod_selected es el objeto del producto a editar, img_sliders son los objetos del desplegable osea, son las opciones de cambio de motivo para el producto,data.datazones son los datos de las zonas






                         /*APLICACION DRAG AND DROP*/
                         //activamos drag a los objetos de la galeria

                         //drag_drop_lio.set_drag_object(img_sliders,data.productos,'toboard',['id','nombre_producto','precio_producto','troquel_producto__file_troquel'],0,0);
                     //DROP
                         //---------------------------------------

                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
}
function ajax_show_same_products(sameproducts,troquel,prod_selected)
{
    var pais = getCookie('pais');
    $.ajax({
                 url:  'showsameproducts', //  guardar/ the endpoint,commonly same url
                 type: 'get', //parece que no es necesario
                 data: {'troquel': troquel,'pais':pais}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //COMO MOSTRAR DATOS VIA AJAX  data.<variable_django>[posicion].<campo del modelo>
                    //alert(data.productos[0].nombre_producto + ' ' + data.productos.length) ;
                        //console.log(data.productos[0]['nombre_producto']);
                     console.log('patrones: ' + data.productos[0].pattern_producto);
                        sameproducts.clear_matrix();//limpiamos en caso de ya existir containers
                        sameproducts.charge_containers(data.productos,'matrix-containers');
                        sameproducts.activate_pretty_mouseover();
                        var img_sliders = sameproducts.paint_object_with_64images_noinfo_mfile('/media/',data.productos,data.datazones);
                        //FUNCIÓN CLAVE CAMBIA NUESTROS PRODUCTOS EN EL TABLERO AL ELEMENTO QUE SE MUESTRE EN LA MATRIZ
                        console.log('img-sliders '+ img_sliders[0].prev_producto);
                        change_element_by_matrix_object(prod_selected,img_sliders,data.datazones); //donde prod_selected es el objeto del producto a editar, img_sliders son los objetos del desplegable osea, son las opciones de cambio de motivo para el producto,data.datazones son los datos de las zonas






                         /*APLICACION DRAG AND DROP*/
                         //activamos drag a los objetos de la galeria

                         //drag_drop_lio.set_drag_object(img_sliders,data.productos,'toboard',['id','nombre_producto','precio_producto','troquel_producto__file_troquel'],0,0);
                     //DROP
                         //---------------------------------------

                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
}
function ajax_category_pais_finder(category,prod_matrix,drag_drop_lio)
{
    var pais = getCookie('pais');

                $.ajax({
                         url:  'testquery', //  guardar/ the endpoint,commonly same url
                         type: 'get', //parece que no es necesario
                         data:{'category':category,'pais':pais},
                    // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache:false,
                         // handle a successful response
                         success: function (data) {
                             //alert('Redirigiendo a pagos');
                                //alert(data.archivo);
                                //console.log(data.troqueles.length)}
                            var newproduct = [] ;
                            for(var c = 0; c<data.productos.length;c++)
                            {
                                newproduct[c] = data.productos[c][0];
                                //console.log(newproduct[c].video_producto +newproduct[c].troquel_producto__file_troquel + ' ' +newproduct[c].troquel_producto__editable_troquel + ' ' +newproduct[c].img_producto + ' ' + newproduct[c].prev_producto );   ////
                            }
                            //console.info(newproduct[0]['img_producto']);
                             prod_matrix.clear_matrix();//limpiamos en caso de ya existir containers
                             console.log(data.productos);//
                             console.log(newproduct);
                             prod_matrix.charge_containers(newproduct,'matrix-containers');
                             var img_sliders = prod_matrix.paint_object_with_64images_info_mfile('/media/',newproduct,data.datazones);
                             //drag_drop_lio.set_drag_object(img_sliders,newproduct,'toboard',['id','nombre_producto','precio_producto','troquel_producto__file_troquel','cantidad_producto','tamano_producto'],0,0);
                             drag_drop_lio.deactivate_drag_and_drop(img_sliders);
                             drag_drop_lio.activate_mouse_down(img_sliders);
                             /*for(var i = 0;i<data.troqueles.length;i++)
                             {
                                console.log('id: '+data.troqueles[i].id+ ' ' +data.troqueles[i].nombre_troquel);
                             }
                             for(var c = 0;c<data.producto.length;c++)
                             {
                                console.log('id: '+data.producto[c][0].nombre_producto);
                             }

                                console.log('logitud :'+data.troqueles.length);*/
                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                     });
}
function ajax_category_finder(category,prod_matrix,drag_drop_lio)
{

    $.ajax({
                 url:  'showprodforcategories', //  guardar/ the endpoint,commonly same url
                 type: 'get', //parece que no es necesario
                 data: {'category': category}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     //APLICACION SLIDER
                     //--------------------------------------------------------
                     //CREAMOS SLIDER CON NUESTRO OBJETO SLIDER CREADO AL INCIO
                     //CARGAMOS EN EL SLIDER LAS IMAGENES A MOSTRAR

                    //
           /*CARGA DE IMAGENES EN SLIDER PROD_SLIDER*/
                        //prod_slider.create_cont();//CREAMOS CONTENEDOR DEL SLIDER
                        // prod_slider.chargeobjects(data.productos,20,4,'flotame'); //CARGAMOS LOS CONTENEDORES PARA CADA IMAGEN DEL SLIDER
                         //PINTAMOS LAS IMAGENES SVG CON DATOS DE LA DB
                         //var img_sliders = prod_slider.dump_plain_svg('/media/',data.productos,data.datazones);
            /*
            * CARGA DE IMAGENES EN SLIDER PROD_SLIDER*/
                         prod_matrix.clear_matrix();//limpiamos en caso de ya existir containers
                         prod_matrix.charge_containers(data.productos,'matrix-containers');
                        var img_sliders = prod_matrix.paint_object_with_64images_no_info('/media/',data.productos,data.datazones);
                                                   //------------------------------------------------------------------------------------
                         /*APLICACION DRAG AND DROP*/
                         //activamos drag a los objetos de la galeria

                         drag_drop_lio.set_drag_object(img_sliders,data.productos,'toboard',['id','nombre_producto','precio_producto','troquel_producto__file_troquel'],0,0);
                     //DROP
                         //---------------------------------------

                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
}
var dinamic_sprite = function (width,height,ani_class,view_factor,common_class,where)
{
    this.widths = width; //ancho en px que se deseado en 1366x768
    this.heights = height; //alto en px deseado en 1366x768
    this.ani_class = ani_class; //clase css que asignaremos al sprite con caracteristicas basicos posicion, ubicacion etc...
    this.vw = window.innerWidth; //ancho de la pantalla
    this.vh = window.innerHeight; // alto de la pantalla
    this.sprite = []; //el objeto div que sera nuestro sprite

    this.calculate_fixed_dimensions = function ()  //calcula las dimensiones del sprite
    {

        if (where === 'body')
        {
            this.el_widht = view_factor * 100 * (this.vw / 1366) * this.widths / this.vw + '%'; //(this.vw/1366)*this.widths nos calcula el ancho en pixeles que tendra nuestro sprite dependiendo del viewport del dispositivo conservando la relacion 16:9, osea normalizamos, multiplicamos por 100 y dividimos por this.vw para sacar el procentaje, (this.widths/this.ww) lo calculamos en el caso de que la imagen del sprite venga mas grande de lo que deberia ser, view_factor es en el caso que este quizas mas grande de lo deseado entonces nos sirve para reducir o aumentar el tamaño
            this.el_height = view_factor * 100 * (this.vh / 768) * this.heights / this.vh + '%'; //con el alto hacemos el mismo calculo en comparacion con el ancho
        }
        else
        {
            //var contenedor = document.querySelector('#goproductos');

            this.el_width = view_factor* 100*(this.vw / 1366)*this.widths/parseInt($(where).css('width')) + '%';
            this.el_height = view_factor* 100*(this.vh / 768)*this.heights/parseInt($(where).css('height')) +'%';
        }
    };

    this.create_fixed_sprite = function () {
        this.calculate_fixed_dimensions();
        this.sprite = document.createElement('div');
        this.sprite.style.width = this.el_width;
        this.sprite.style.height = this.el_height;
        if (where === 'body')
        {
            document.body.appendChild(this.sprite);
        }
        else
        {
            where.appendChild(this.sprite);
        }

        //this.classList.contains('bad'), verificamos si el objeto tiene la clase bad devuelve true o false
        //this.classList.remove('bad'); remueve clase bad
        //this.classList.add('good'); añade clase good
        this.sprite.classList.add(this.ani_class);
        this.sprite.classList.add(common_class);
    };
    this.add_css_animation = function (css_class) {
        this.sprite.classList.add(css_class);
    };
    this.del_css_animation = function (css_class) {
        if(this.sprite.classList.contains(css_class))
        {
            this.sprite.classList.remove(css_class);
        }
        else
        {

        }

    }
};

function go_section(whosection,pagina)
{

    var viewport_height = window.innerHeight;
    var target = document.querySelector(whosection);
    switch (whosection)
    {
        case '#zona1':
            switch (pagina)
            {
                case 1:

                break;
                case 2:

                     $('html, body').stop().animate({
                                        scrollTop: 0
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');

                     });
                break;
                case 3:
                     $('html, body').stop().animate({
                                        scrollTop: 0
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');
                     });
                break;
                case 4:
                     $('html, body').stop().animate({
                                        scrollTop: 4*viewport_height
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');//
                         $('.hideme').stop().animate({'right':'-110%'},5);//devolvemos a su lugar los botones de nav
                     });
                break;

                default:
            }
            break;
        case '#zona2':
            switch (pagina)
            {
                case 1:
                    $('html, body').stop().animate({
                                        scrollTop: viewport_height
                                    }, 3000, function ()
                    {
                        $('#escritorio').removeClass('click');
                    });
                break;
                case 2:

                break;
                case 3:
                     $('html, body').stop().animate({
                                        scrollTop:viewport_height
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');
                     });
                break;
                case 4:
                     $('html, body').stop().animate({
                                        scrollTop: viewport_height
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');
                     });
                break;

                default:
            }
            break;
        case '#zona3':
            switch (pagina)
            {
                case 1:
                    $('html, body').stop().animate({
                                        scrollTop: 2*viewport_height
                                    }, 3000, function ()
                    {
                        $('#escritorio').removeClass('click');
                    });
                break;
                case 2:
                    $('html, body').stop().animate({
                                        scrollTop: 2*viewport_height
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');
                     });
                break;
                case 3:

                break;
                case 4:
                     $('html, body').stop().animate({
                                        scrollTop: 2*viewport_height
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');
                     });
                break;

                default:
            }
            break;
        case '#zona4':
            switch (pagina)
            {
                case 1:
                    $('html, body').stop().animate({
                                        scrollTop: 3*viewport_height
                                    }, 3000, function ()
                    {
                        $('#escritorio').removeClass('click');
                    });
                break;
                case 2:
                    $('html, body').stop().animate({
                                        scrollTop: 3*viewport_height
                                    }, 3000, function ()
                        {
                         $('#escritorio').removeClass('click');
                        });
                break;
                case 3:
                    $('html, body').stop().animate({
                                        scrollTop: 3*viewport_height
                                    }, 3000, function ()
                     {
                         $('#escritorio').removeClass('click');

                     });
                break;
                case 4:

                break;

                default:
            }
            break;
        default:
    }
}
function crear_table_productos() {
    var tabla    =    document.createElement('table');
    tabla.id = 'subtotal_productos';
    var thead    =    document.createElement('thead');
    thead.id = 'thead-compra';
    var tfoot    =    document.createElement('tfoot');
    var tr       =    document.createElement('tr');
    var columna0 =    document.createElement('th');
    var columna1 =    document.createElement('th');
    var columna2 =    document.createElement('th');
    var columna3 =    document.createElement('th');
    var tbody    =    document.createElement('tbody');
    tbody.id     =    'tbodycompra';
    var filafoot = document.createElement('tr');
    var columna4 =    document.createElement('th');
    columna4.innerHTML = 'SUBTOTAL';
    var columna5 =    document.createElement('th');
    columna5.id ='subtotal';
    columna0.innerHTML = gettext('Qty');
    columna1.innerHTML = gettext('NAME');
    columna2.innerHTML = gettext('SIZE');
    columna3.innerHTML = gettext('PRICE');
    document.querySelector('#productos-cont-compra').appendChild(tabla);
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.appendChild(tfoot);
    filafoot.appendChild(document.createElement('th'));
    filafoot.appendChild(columna4);
    filafoot.appendChild(columna5);

    tfoot.appendChild(filafoot);

    thead.appendChild(tr);
    tr.appendChild(columna0);
    tr.appendChild(columna1);
    tr.appendChild(columna2);
    tr.appendChild(columna3);
    tabla.style.position = "absolute";
    //tabla.style.top = 100 + '%';
    /*Creamos input para manipular la tabla*/
    var input = document.querySelector('#info-productos');
    input.filas = 0;//numero de filas
    input.drop_products = 0; //orden de productos
    input.data = [];
    document.querySelector('#productos-cont-compra').appendChild(input);

}
function crear_table_productos_mobile() {
    var tabla    =    document.createElement('table');
    tabla.id = 'subtotal_productos_mob';
    var thead    =    document.createElement('thead');
    thead.id = 'thead-compra';
    var tfoot    =    document.createElement('tfoot');
    var tr       =    document.createElement('tr');
    var columna0 =    document.createElement('th');
    var columna1 =    document.createElement('th');
    var columna2 =    document.createElement('th');
    var columna3 =    document.createElement('th');
    var tbody    =    document.createElement('tbody');
    tbody.id     =    'tbodycompra';
    var filafoot = document.createElement('tr');
    var columna4 =    document.createElement('th');
    columna4.innerHTML = 'SUBTOTAL';
    var columna5 =    document.createElement('th');
    columna5.id ='subtotal_mob';
    columna0.innerHTML = gettext('Qty');
    columna1.innerHTML = gettext('NAME');
    columna2.innerHTML = gettext('SIZE');
    columna3.innerHTML = gettext('PRICE');
    document.querySelector('#productos-cont-compra-mob').appendChild(tabla);
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.appendChild(tfoot);
    filafoot.appendChild(document.createElement('th'));
    filafoot.appendChild(columna4);
    filafoot.appendChild(columna5);

    tfoot.appendChild(filafoot);

    thead.appendChild(tr);
    tr.appendChild(columna0);
    tr.appendChild(columna1);
    tr.appendChild(columna2);
    tr.appendChild(columna3);
    tabla.style.position = "absolute";
    //tabla.style.top = 100 + '%';
    /*Creamos input para manipular la tabla*/
    var input = document.querySelector('#info-productos');
    input.filas = 0;//numero de filas
    input.drop_products = 0; //orden de productos
    input.data = [];
   // document.querySelector('#productos-cont-compra').appendChild(input);

}
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    var cont_prod = element.parentNode; //seleccionamos el contenedor que contiene el producto y los demas elementos
    //cont_prod.parentNode.removeChild(cont_prod); //eliminamos el contenedor
    //cont_prod.remove();
    document.querySelector('.papelera').remove();    //element.parentNode.remo
    // veChild(element);
}
function Droppapelera(e)
{
    e.preventDefault();
    var input = document.querySelector('#info-productos');
    var id_producto = e.dataTransfer.getData('id_producto');
    var nombre = e.dataTransfer.getData('nombre_prod');
    var fromto = e.dataTransfer.getData('fromproducts');
    if(fromto === 'papelera')
    {

        delete_file_productos('#subtotal_productos tbody',[nombre,id_producto,1]);
            //Droppapelera('#subtotal_productos tbody',[nombre,precio,1]);
            //alert(window.pageYOffset);
        save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
    }
    else
    {

    }
}
function delete_file_mob_productos(tbody,datos)
{
    var cuerpo = document.querySelector(tbody);
    var input  = document.querySelector('#info-productos');
    for (var p = 0; p<input.data.length;p++)
        {
            //alert(datos[0]);
            //alert(input.data[p][0]);
            var componente = parseInt(document.querySelector(input.data[p][4]).innerHTML,10);
            //alert(datos[0] + ' ' + input.data[p][1] );
            if(datos[0]===input.data[p][1])
            {
                //alert('ya esta');
                //alert(document.querySelector('#cantidad'+p).innerHTML);

                if(componente===1)
                {
                    //alert(document.querySelector(input.data[p][3]).id);
                    //document.querySelector('#'+ datos[1]);
                    //alert(document.querySelector('#cantidad'+p).parentElement);
                    document.querySelector(input.data[p][4]).parentElement.remove();
                    //alert(input.data);
                    input.data.splice(p,1);//eliminamos el elemento de la fila
                    //alert(input.data);
                    //removeElement(datos[1]);
                    //input.filas--;
                    //input.drop_products--;
                    //alert(input.drop_products);
                }
                else
                {
                    document.querySelector(input.data[p][4]).innerHTML= componente-1;
                    input.data[p][3]--;
                    //removeElement(datos[1]);
                }
                break;
            }
            else
            {

            }
        }
        create_subtotal_productos_mob();

}
function delete_file_productos(tbody,datos)
{
    var cuerpo = document.querySelector(tbody);
    var input  = document.querySelector('#info-productos');
    for (var p = 0; p<input.data.length;p++)
        {
            //alert(datos[0]);
            //alert(input.data[p][0]);
            var componente = parseInt(document.querySelector(input.data[p][4]).innerHTML,10);
            //alert(datos[0] + ' ' + input.data[p][1] );
            if(datos[0]===input.data[p][1])
            {
                //alert('ya esta');
                //alert(document.querySelector('#cantidad'+p).innerHTML);

                if(componente===1)
                {
                    //alert(document.querySelector(input.data[p][3]).id);
                    //document.querySelector('#'+ datos[1]);
                    //alert(document.querySelector('#cantidad'+p).parentElement);
                    document.querySelector(input.data[p][4]).parentElement.remove();
                    //alert(input.data);
                    input.data.splice(p,1);//eliminamos el elemento de la fila
                    //alert(input.data);
                    removeElement(datos[1]);
                    //input.filas--;
                    //input.drop_products--;
                    //alert(input.drop_products);
                }
                else
                {
                    document.querySelector(input.data[p][4]).innerHTML= componente-1;
                    input.data[p][3]--;
                    removeElement(datos[1]);
                }
                break;
            }
            else
            {

            }
        }
        create_subtotal_productos();

}
function update_table_by_matrix(tbody,click_prod,prod2change,prod_selected,image_sliders)//actualizamos tabla de productos de acuerdo a el producto seleccionado  donde tbody es la tabla a editar click_prod es el producto de la matrix que clickeamos y prod2change es el producto que se quiere editar prod_selected es el objeto del div con svg que esta en el board, esto es para poder redifinir el evento de drop a la papelera,image_sliders es el svg que se selecciono

{

    var nuevop = false;
    var fila = document.createElement('tr');
    var cuerpo = document.querySelector(tbody);
    var columna0;
    var columna1;
    var columna2;
    var columna3;
    var input = document.querySelector('#info-productos');
    console.log('click_prod '  +click_prod[0]+ 'prod2change ' + prod2change[0]);
    if(click_prod[0]==prod2change[0])
    {
        //no se hace nada porque el producto no ha cambiado
        //alert('equal' + ' ' +click_prod[0]+ ' ' +prod2change[0]);
        console.log('equal' + ' click' +click_prod[0]+ '2change ' + prod2change[0]);
        //OCULTAMOS MATRIZ DE PRODUCTOS
        $('#back-prod-options').css('display','none');
        $('#same-products').css('display','none');
        $('#cancel-matrix-options').css('display','none');
    }
    else
    {
        console.log('different' + 'click ' +click_prod[0]+ '2change ' + prod2change[0]);
        prod_selected.id_producto = click_prod[0];
        prod_selected.nombre = click_prod[1];
        prod_selected.precio = click_prod[2];
        prod_selected.tamano = click_prod[5];

        prod_selected.setAttribute('data-idproducto',click_prod[0]);//establecemos datos del productos
        prod_selected.setAttribute('data-nombre',click_prod[1]); //
        prod_selected.setAttribute('data-precio',click_prod[2]);
        prod_selected.setAttribute('data-tamano',click_prod[5]);

        //verificamos si ya esta el producto seleccionado en la tabla
        for (var ctn = 0; ctn<input.data.length;ctn++)
        {   //alert(datos[0]);
            //alert(input.data[p][0] + ' ' + datos[0]);
           // console.log('id_click '+ click_prod[0] + 'datoinput '+ input.data[ctn][0]);
            if(click_prod[0]==input.data[ctn][0])
            {
                document.querySelector(input.data[ctn][4]).innerHTML = input.data[ctn][3] + 1;
                input.data[ctn][3]++ ;
                nuevop = false;
                break;
                console.log(nuevop);
            }
            else
            {
                nuevop = true;
                console.log(nuevop);
            }
        }
        console.log(nuevop);
        //en caso de que no exista debemos crear otra fila
        if(nuevop === true)
        {
                /*creamos una nueva fila*/

                input.data.push(click_prod);
                columna0 =    document.createElement('th');
                columna1 =    document.createElement('th');
                columna2 =    document.createElement('th');
                columna3 =    document.createElement('th');
                columna0.innerHTML = click_prod[1];
                columna1.innerHTML = click_prod[2]+ ' '+getCookie('cambio');
                columna2.innerHTML = click_prod[3] ;
                columna3.innerHTML = click_prod[5];
                columna2.id = 'cantidad' + input.filas;
                fila.appendChild(columna2);
                fila.appendChild(columna0);
                fila.appendChild(columna3);
                fila.appendChild(columna1);
                cuerpo.appendChild(fila);
                input.filas = input.filas + 1;
        }

        //borrar el registro del producto que estaba dropeado y ahora ha sido cambiado

        for (var p = 0; p<input.data.length;p++)
        {
            //alert(datos[0]);
            //alert(input.data[p][0]);

            var componente = parseInt(document.querySelector(input.data[p][4]).innerHTML,10);
            console.log(prod2change[0]+' '+componente + 'prod2 '+ prod2change +'input ' + input.data[p][0]);
            //alert(prod2change[0] + ' ' + input.data[p][1] );
            if(prod2change[0]==input.data[p][0])
            {
                //alert('ya esta');
                //alert(document.querySelector('#cantidad'+p).innerHTML);
                console.log(prod2change[0] + ' changed');
                if(componente===1)
                {
                    //alert(document.querySelector(input.data[p][3]).id);
                    //document.querySelector('#'+ datos[1]);
                    //alert(document.querySelector('#cantidad'+p).parentElement);
                    document.querySelector(input.data[p][4]).parentElement.remove();
                    //alert(input.data);
                    input.data.splice(p,1);//eliminamos el elemento de la fila
                    //alert(input.data);
                    //removeElement(datos[1]);
                    //input.filas--;
                    //input.drop_products--;
                    //alert(input.drop_products);
                    //input.filas = input.filas - 1;
                }
                else
                {
                    document.querySelector(input.data[p][4]).innerHTML= componente-1;
                    input.data[p][3]--;
                    //removeElement(datos[1]);
                }
                break;
            }
            else
            {

            }
        }
        create_subtotal_productos();
        //OCULTAMOS MATRIZ DE PRODUCTOS
        $('#back-prod-options').css('display','none');
        $('#same-products').css('display','none');
        $('#cancel-matrix-options').css('display','none');
    }
        save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
        //alert(input.data[0][0]);
       // alert(nuevop);

    //var columna2 =    document.createElement('th');
    //var columna3 =    document.createElement('th');
}
function update_table_by_mob_matrix(tbody,click_prod,prod2change,prod_selected,image_sliders)//actualizamos tabla de productos de acuerdo a el producto seleccionado  donde tbody es la tabla a editar click_prod es el producto de la matrix que clickeamos y prod2change es el producto que se quiere editar prod_selected es el objeto del div con svg que esta en el board, esto es para poder redifinir el evento de drop a la papelera,image_sliders es el svg que se selecciono

{

    var nuevop = false;
    var fila = document.createElement('tr');
    var cuerpo = document.querySelector(tbody);
    var columna0;
    var columna1;
    var columna2;
    var columna3;
    var input = document.querySelector('#info-productos');
    console.log('click_prod '  +click_prod[0]+ 'prod2change ' + prod2change[0]);
    if(click_prod[0]==prod2change[0])
    {
        //no se hace nada porque el producto no ha cambiado
        //alert('equal' + ' ' +click_prod[0]+ ' ' +prod2change[0]);
        console.log('equal' + ' click' +click_prod[0]+ '2change ' + prod2change[0]);
        //OCULTAMOS MATRIZ DE PRODUCTOS
        $('#same-mob-products').css('display','none');
        $('#cancel-mob-same').css('display','none');
    }
    else
    {
        console.log('different' + 'click ' +click_prod[0]+ '2change ' + prod2change[0]);
        prod_selected.id_producto = click_prod[0];
        prod_selected.nombre = click_prod[1];
        prod_selected.precio = click_prod[2];
        prod_selected.tamano = click_prod[5];

        prod_selected.setAttribute('data-idproducto',click_prod[0]);//establecemos datos del productos
        prod_selected.setAttribute('data-nombre',click_prod[1]); //
        prod_selected.setAttribute('data-precio',click_prod[2]);
        prod_selected.setAttribute('data-tamano',click_prod[5]);

        //verificamos si ya esta el producto seleccionado en la tabla
        for (var ctn = 0; ctn<input.data.length;ctn++)
        {   //alert(datos[0]);
            //alert(input.data[p][0] + ' ' + datos[0]);
           // console.log('id_click '+ click_prod[0] + 'datoinput '+ input.data[ctn][0]);
            if(click_prod[0]==input.data[ctn][0])
            {
                document.querySelector(input.data[ctn][4]).innerHTML = input.data[ctn][3] + 1;
                input.data[ctn][3]++ ;
                nuevop = false;
                break;
                console.log(nuevop);
            }
            else
            {
                nuevop = true;
                console.log(nuevop);
            }
        }
        console.log(nuevop);
        //en caso de que no exista debemos crear otra fila
        if(nuevop === true)
        {
                /*creamos una nueva fila*/

                input.data.push(click_prod);
                columna0 =    document.createElement('th');
                columna1 =    document.createElement('th');
                columna2 =    document.createElement('th');
                columna3 =    document.createElement('th');
                columna0.innerHTML = click_prod[1];
                columna1.innerHTML = click_prod[2]+ ' '+getCookie('cambio');
                columna2.innerHTML = click_prod[3] ;
                columna3.innerHTML = click_prod[5];
                columna2.id = 'cantidad' + input.filas;
                fila.appendChild(columna2);
                fila.appendChild(columna0);
                fila.appendChild(columna3);
                fila.appendChild(columna1);
                cuerpo.appendChild(fila);
                input.filas = input.filas + 1;
        }

        //borrar el registro del producto que estaba dropeado y ahora ha sido cambiado

        for (var p = 0; p<input.data.length;p++)
        {
            //alert(datos[0]);
            //alert(input.data[p][0]);

            var componente = parseInt(document.querySelector(input.data[p][4]).innerHTML,10);
            console.log(prod2change[0]+' '+componente + 'prod2 '+ prod2change +'input ' + input.data[p][0]);
            //alert(prod2change[0] + ' ' + input.data[p][1] );
            if(prod2change[0]==input.data[p][0])
            {
                //alert('ya esta');
                //alert(document.querySelector('#cantidad'+p).innerHTML);
                console.log(prod2change[0] + ' changed');
                if(componente===1)
                {
                    //alert(document.querySelector(input.data[p][3]).id);
                    //document.querySelector('#'+ datos[1]);
                    //alert(document.querySelector('#cantidad'+p).parentElement);
                    document.querySelector(input.data[p][4]).parentElement.remove();
                    //alert(input.data);
                    input.data.splice(p,1);//eliminamos el elemento de la fila
                    //alert(input.data);
                    //removeElement(datos[1]);
                    //input.filas--;
                    //input.drop_products--;
                    //alert(input.drop_products);
                    //input.filas = input.filas - 1;
                }
                else
                {
                    document.querySelector(input.data[p][4]).innerHTML= componente-1;
                    input.data[p][3]--;
                    //removeElement(datos[1]);
                }
                break;
            }
            else
            {

            }
        }
        create_subtotal_productos_mob();
        //OCULTAMOS MATRIZ DE PRODUCTOS
        $('#same-mob-products').css('display','none');
        $('#cancel-mob-same').css('display','none');
    }
        save_board_table_mob('#cont-test-mob','#productos-cont-compra-mob',input.drop_products,input.filas,input.data);
        //alert(input.data[0][0]);
       // alert(nuevop);

    //var columna2 =    document.createElement('th');
    //var columna3 =    document.createElement('th');
}
function create_file_productos(tbody,datos)
{

    var nuevop = false;
    var fila = document.createElement('tr');
    var cuerpo = document.querySelector(tbody);
    alert(datos);
    var columna0;
    var columna1;
    var columna2;
    var columna3;
    var input = document.querySelector('#info-productos');

    //alert(input.data);
    if(input.data === undefined || input.data.length===0)// si la tabla esta vacia
    {
        //alert(input.data);
        input.data = [];
        //alert(input.data);
        input.data.push(datos);
        input.data[0][4] = '#cantidad'+input.filas;
        //alert('vacio');
        nuevop = true;
        columna0 =    document.createElement('th');
        columna1 =    document.createElement('th');
        columna2 =    document.createElement('th');
        columna3 =    document.createElement('th');
        columna0.innerHTML = datos[1];
        columna1.innerHTML = datos[2]+' '+getCookie('cambio');
        columna2.innerHTML = datos[3];
        columna3.innerHTML = datos[5];
        //alert(columna0 + ' ' + columna1 + ' ' + columna2 + ' ' + columna3);
        columna2.id = 'cantidad' + input.filas;
        fila.appendChild(columna2);
        fila.appendChild(columna0);
        fila.appendChild(columna3);
        fila.appendChild(columna1);

        cuerpo.appendChild(fila);
        //alert(input.data);
        input.filas = input.filas + 1;
        //alert('vacio');
         //alert(typeof(input.data));
    }
    else
    {
        for (var p = 0; p<input.data.length;p++)
        {   //alert(datos[0]);
            //alert(input.data[p][0] + ' ' + datos[0]);
            if(datos[0]===input.data[p][0])
            {
                document.querySelector(input.data[p][4]).innerHTML = input.data[p][3] + 1;
                input.data[p][3]++ ;
                nuevop = false;
                break;
            }
            else
            {
                nuevop = true;
            }
        }
        //alert(nuevop);
        /* Preguntamos si hay nuevo producto, en tal caso agregamos 1*/
        if(nuevop === true)
        {
                /*creamos una nueva fila*/

                input.data.push(datos);
                columna0 =    document.createElement('th');
                columna1 =    document.createElement('th');
                columna2 =    document.createElement('th');
                columna3 =    document.createElement('th');
                columna0.innerHTML = datos[1];
                columna1.innerHTML = datos[2]+' '+getCookie('cambio');
                columna2.innerHTML = datos[3];
                columna3.innerHTML = datos[5];
                columna2.id = 'cantidad' + input.filas;
                fila.appendChild(columna2);
                fila.appendChild(columna0);
                fila.appendChild(columna3);
                fila.appendChild(columna1);
                cuerpo.appendChild(fila);
                input.filas = input.filas + 1;
        }


    }
        //alert(input.data[0][0]);
       // alert(nuevop);

    //var columna2 =    document.createElement('th');
    //var columna3 =    document.createElement('th');
}
function create_subtotal_productos()
{
    var subtotal_column    =    document.querySelector('#subtotal');
    //var fila     =    document.createElement('tr');
    //var columna1 =    document.createElement('th');
    //var columna2 =    document.createElement('th');
    var input    =    document.querySelector('#info-productos');
    var subtotal = 0;
    for (var h = 0; h<input.data.length;h++)
    {
        subtotal = subtotal + (input.data[h][2] * input.data[h][3]);
    }
    subtotal_column.innerHTML =  subtotal+ ' '+getCookie('cambio');
}
function create_subtotal_productos_mob()
{
    var subtotal_column    =    document.querySelector('#subtotal_mob');
    //var fila     =    document.createElement('tr');
    //var columna1 =    document.createElement('th');
    //var columna2 =    document.createElement('th');
    var input    =    document.querySelector('#info-productos');
    var subtotal = 0;
    for (var h = 0; h<input.data.length;h++)
    {
        subtotal = subtotal + (input.data[h][2] * input.data[h][3]);
    }
    subtotal_column.innerHTML =  subtotal+ ' '+getCookie('cambio');
}
function  StarDragtopapelera(e,nombre,fromto,id_producto,x_offset,y_offset)
{
    e.dataTransfer.setData("Text", e.target.innerHTML);
     e.dataTransfer.dropEffect = "copy";
     var test = e.target;
     test.style.width = '100%';
     test.style.height = '100%';
        var rect = test.parentNode.getBoundingClientRect();
    console.log('x '+ rect.left+' y '+ rect.top);
    var relx_offset = parseInt(e.target.clientWidth,10)*0.45;
    var rely_offset = parseInt(e.target.clientHeight,10)*0.45;
     //console.log('x '+relx_offset+ 'y '+ rely_offset);
     //e.dataTransfer.//
     e.dataTransfer.setDragImage(e.target,e.clientX-rect.left,e.clientY-rect.top);/////document.querySelector('#'+e.target.parentNode.id)
    //e.dataTransfer.setDragImage(img, 0, 0);
     //e.target.style.opacity = '0.4';
     //alert(nombre);
     e.dataTransfer.setData('nombre_prod', nombre);
     e.dataTransfer.setData('fromproducts',fromto);
     e.dataTransfer.setData('id_producto',e.target.id);
     e.dataTransfer.setData('x_offset',x_offset);
     e.dataTransfer.setData('y_offset',y_offset);
}
function create_drag_objects(e,group,same_object) {
        e.preventDefault();
        var input = document.querySelector('#info-productos'); // input que guarda la info de los productos drageados
        var prod = e.dataTransfer.getData("Text");//donde elem_destino es el destino
        var translate_product;
        var fromto = e.dataTransfer.getData('group');

        var precio, nombre, id_productos,troquel_file,tamano_producto;

        //OFFSETS DE RECOLOCACION DE OBJETOS QUE SON DROPEADOS
        var xoffset = e.dataTransfer.getData('x_offset');
        var yoffset = e.dataTransfer.getData('y_offset');
        var cont_destino = document.querySelector('#cont-productos-cont-drag-drop');
        var destino = document.querySelector('#productos-cont-dragdrop');
        if (fromto === 'toboard')
        {
            precio = e.dataTransfer.getData('precio_producto');
            nombre = e.dataTransfer.getData('nombre_producto');
            tamano_producto = e.dataTransfer.getData('tamano_producto');
            troquel_file = e.dataTransfer.getData('troquel_producto__file_troquel');
            //console.log(troquel_file);
            id_productos = e.dataTransfer.getData('id');

            var cont_producto = document.createElement('div');// contenedor  del drop-productosX
            cont_producto.style.position = 'absolute';
            var contra_clockwise = document.createElement('img');//en contra de las manecillas
            var clockwise = document.createElement('img');
            var producto = document.createElement('div');// contenedor  del producto drageado en el tablero
            var shadow_producto; //div encima de todo el producto para hacer los eventos drag drop etc
            clockwise.style.position = 'absolute';
            clockwise.style.display = 'none';
            clockwise.style.bottom = '0%';
            clockwise.style.right = '0';
            clockwise.style.width = '25%';
            clockwise.style.height = 'auto';
            clockwise.style.backgroundColor = 'white';
            clockwise.style.borderRadius = '50%';
            clockwise.style.transform = 'scale(-1)';
            clockwise.src = '/static/img/left_rot.png';

            contra_clockwise.style.position = 'absolute';
            contra_clockwise.style.display = 'none';
            contra_clockwise.style.bottom = '0%';
            contra_clockwise.style.left = '0%';
            contra_clockwise.style.width = '25%';
            contra_clockwise.style.height = 'auto';
            contra_clockwise.style.borderRadius = '50%';
            contra_clockwise.style.backgroundColor = 'white';
            contra_clockwise.src = '/static/img/left_rot.png';


            var same_products = document.createElement('img');//contenedor  de slider de los productos relacionados
            same_products.style.position = 'absolute';
            same_products.style.width = 30+'%';
            same_products.style.height = 'auto';
            //OBTENEMOS el valor actual de la escala
            var escala = parseInt(document.querySelector('#productos-cont-dragdrop').getAttribute('data-escala'),10);
            switch(tamano_producto) {
                case '1':
                    cont_producto.style.width = (1.9) + '%';
                    cont_producto.style.height = 'auto';
                    console.log('tamano 1');
                    break;
                case '2':
                    cont_producto.style.width = (3.333333) + '%';
                    cont_producto.style.height = 'auto';
                    break;
                case '3':
                    cont_producto.style.width = (3.333333) + '%';
                    cont_producto.style.height = 'auto';
                    break;
                case '4':
                    cont_producto.style.width = (3.333333) + '%';
                    cont_producto.style.height = 'auto';
                    break;
                case '5':
                    cont_producto.style.width = (3.333333) + '%';
                    cont_producto.style.height = 'auto';
                    break;
                case '6':
                    cont_producto.style.width = (3.333333) + '%';
                    cont_producto.style.height = 'auto';
                    break;
                case '7':
                    cont_producto.style.width = (31.66) + '%';///
                    cont_producto.style.height = 'auto';
                    console.log('tamano 7');
                    break;
                default:

            }
            same_products.src = "/static/img/png/productos/botones/change_product.png";
            //same_products.style.backgroundSize   = 'contain';
            //same_products.style.backgroundRepeat = 'no-repeat';

            //same_products.style.zIndex = 1000;
            same_products.id = 'same-productos' + input.drop_products;
            same_products.style.display = 'none';
            /*producto.style.width = 3.333333 + '%';
            producto.style.height = 'auto';*/
            producto.style.position = "relative";
            producto.style.background = "transparent";

            producto.style.width = '100%';
            producto.style.height = 'auto';

            same_products.style.top ='0';
            same_products.style.right = '0';
            //same_products.style.transform = 'translateY(300%)';
            //producto.style.top = '0';
            //producto.style.left = '0';
            //producto.style.transform = 'rotate(45deg)';
            producto.style.border = 'solid 1px transparent';
            //producto.style.backgroundColor = '#d9e021';
            producto.innerHTML = prod;

            //ASIGNAMOS NUESTRA SSHADOW PARA LOS PRODUCTOS
            //shadow_producto = producto.querySelector('div');
            //alert(shadow_producto);
            producto.id = 'drop-productos' + input.drop_products; // input.drop_products es el numero de productos creados comenzando desde 0
            producto.fromto = 'papelera';
            //alert(producto.id);
            producto.precio = precio;//
            producto.nombre = nombre;
            producto.tamano = tamano_producto;
            //console.log(tamano_producto);
            producto.id_producto = id_productos;
            producto.setAttribute('data-fromto','papelera');
            producto.setAttribute('data-nombre',nombre);
            producto.setAttribute('data-idproducto',id_productos);
            producto.setAttribute('data-precio',precio);
            producto.setAttribute('data-tamano',tamano_producto);
            producto.setAttribute('data-angle','0');

            same_products.setAttribute('data-troquel',troquel_file);
            //alert(window.pageYOffset);

            //producto.querySelector('svg').style.width = 100 + '%';
           // producto.querySelector('svg').style.height = 'auto';




                        //ESTA VARIABLE onAppend NOS PERMITE OBTENER EL EVENTO CUANDO UN OBJETO ES AÑADIDO AL DOM






            ///////////////////////
            cont_producto.style.left = e.clientX + 0 -$('#cont-productos-cont-drag-drop').position().left  + cont_destino.scrollLeft+'px'; //-50 deleted
            cont_producto.style.top =e.clientY + 0 -$('#cont-productos-cont-drag-drop').position().top + cont_destino.scrollTop + 'px';//-50 deleted


            cont_producto.appendChild(producto);
            cont_producto.appendChild(clockwise);
            cont_producto.appendChild(contra_clockwise);
            /////// AÑADIMOS CONT DE PRODUCTOS SIMILARES DENTRO DEL CONTENEDOR DEL PRODUCTO DRAGEADO
            cont_producto.appendChild(same_products);
            destino.appendChild(cont_producto);
            //erase_zone_colors('#cont-productos-cont-drag-drop');
            //alert(cont_destino.scrollLeft);
            //alert(e.clientX + destino.scrollLeft - document.querySelector('#productos-cont-dragdrop').offsetLeft + ' ' + (e.clientY-$('#cont-productos-cont-drag-drop').position().top) );
            //alert(id_productos);
            create_file_productos('#subtotal_productos tbody',[id_productos,nombre,precio,1,'#cantidad'+input.filas,tamano_producto]);
            create_subtotal_productos();
            /*AUMENTAMOS EN EL 1 EL NUMERO DE PRODUCTOS*/
            input.drop_products++;
            //EVENTO DE DRAG PARA EL PRODUCTO QUE YA ESTA EN EL TABLERO!!
            producto.setAttribute('draggable','true');
            producto.addEventListener("dragstart",function (e) {
                var x_offset = e.clientX-$('#cont-productos-cont-drag-drop').position().left - $(document.querySelector('#'+e.target.id).parentNode).position().left + cont_destino.scrollLeft;
                var y_offset = e.clientY-$('#cont-productos-cont-drag-drop').position().top- $(document.querySelector('#'+e.target.id).parentNode).position().top + cont_destino.scrollTop;
                //console.log(document.querySelector('#productos-cont-dragdrop').offsetTop);

                   StarDragtopapelera(e,producto.nombre,producto.fromto,producto.id,x_offset,y_offset);
            },false);
            var time_rot;//variable del timeout para los botones de rotacion
            producto.addEventListener("mouseover",function (e) {
                same_products.style.display = 'block';
                clockwise.style.display = 'block';
                contra_clockwise.style.display = 'block';
                clearTimeout(time_rot);
            },false);
            producto.addEventListener("mouseleave",function (e) {

                time_rot = setTimeout(function () {
                   same_products.style.display = 'none';//
                   clockwise.style.display = 'none';
                   contra_clockwise.style.display = 'none';

                },2000);
            },false);

            clockwise.addEventListener("click",function () {
                var angulo = parseInt(producto.getAttribute('data-angle'),10);
                if(angulo=='360')
                {
                    angulo = 0;
                }
                else
                {

                }
                angulo = angulo + 10;
                producto.style.transform = 'rotate('+angulo+'deg)';//
                producto.setAttribute('data-angle',angulo);
                console.log(angulo);
                save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
            },false);

            contra_clockwise.addEventListener('click',function () {
                var angulo = parseInt(producto.getAttribute('data-angle'),10);
                if(angulo=='-360')
                {
                    angulo = 0;
                }
                else
                {

                }
                angulo = angulo - 10;
                producto.style.transform = 'rotate('+angulo+'deg)';//
                producto.setAttribute('data-angle',angulo);
                console.log(angulo);
                save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
            },false);
            /////////////////////////////////////////////////////////////////
            //muestra matriz de opciones de producto
             same_products.addEventListener("click",function (e) {
                 var file_troquel = this.getAttribute('data-troquel'); // obtenemos el nombre del archivo del troquel que fue pulsado
                 //motramos matriz de productos

                 setTimeout(function () {
                    $('#back-prod-options').css('display','block');
                    $('#same-products').css('display','block');
                    $('#cancel-matrix-options').css('display','block');
                 },500);
                ajax_show_same_products(same_object,file_troquel,producto);
            },false);
            ////////////////////////////////////////////////////////////////////////////////
            save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
    }
    else
    {

        translate_product = document.querySelector('#'+ e.dataTransfer.getData('id_producto')).parentNode;

        //vamos a verificar el que el producto a dropear no desborde el tablero!!!
        var width_product = translate_product.clientWidth;
        var height_product = translate_product.clientHeight;
        var new_left = e.clientX -xoffset- $('#cont-productos-cont-drag-drop').position().left+ cont_destino.scrollLeft;
        var new_top  = e.clientY -yoffset- $('#cont-productos-cont-drag-drop').position().top+ cont_destino.scrollTop;
        var tablero_w = destino.clientWidth; //
        var tablero_h = destino.clientHeight;
        if( ( (tablero_w-new_left)<width_product) || ( (tablero_h-new_top)<height_product) )
        {
            //no hacer nada
            console.log('algo pasa');
        }
        else
        {
            //reañadimos el producto para que quede encima
            translate_product.parentNode.appendChild(translate_product);

            //CLAVE!!  USARLO CUANDO SE USE EL TABLERO
            //CONTENEDOR.insertBefore(ELEMENTO, CONTENEDOR.childNodes[0]);
            translate_product.style.left = new_left +'px';//+50 - document.querySelector('#productos-cont-dragdrop').offsetLeft + 'px';
            translate_product.style.top = new_top+ 'px'; //+ 50- document.querySelector('#productos-cont-dragdrop').getBoundingClientRect().top + 'px';
            //console.log(e.clientX+ ' ' +xoffset+ ' '+$('#cont-productos-cont-drag-drop').position().left+ ' '+cont_destino.scrollTop);
            save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
        }





            //document.querySelector('#productos-cont-dragdrop').appendChild(info_xy);
            //info_xy.innerHTML = 'coordenada x ' + e.clientX;

           // alert('mouse x ' +(e.clientX+  ' mouse y ' +(e.clientY - document.querySelector('#productos-cont-dragdrop').getBoundingClientRect().top));
        }



}
setSkrollr = function(contenedor, propiedad)
    {
        for (var i = 0, l = propiedad.length; i < l; i++)
        {
            var d = propiedad[i],
                px = d[0];
                css = d[1];
            contenedor.attr('data-' + px, css);
        }
    };
var pagina = 1;
var pagina_check = 1; //para el comportamiento de los announcement menu
window.onload = function () {
    //sessionStorage.removeItem("board");
    //sessionStorage.removeItem("board");
                //sessionStorage.removeItem("table");
                //sessionStorage.removeItem("dropproducts");
                //sessionStorage.removeItem("files");
                //sessionStorage.removeItem("data");//
    $('html').click(function() {
           $('#back-prod-options').css('display','none');
           $('#same-products').css('display','none');
           $('#same-mob-products').css('display','none');
           $('#cancel-matrix-options').css('display','none');
           document.querySelector('#cancel-mob-same').style.display = 'none';
    });
    var iter_canvas = 0;//variable para saber en que iteracion de conversion de svg a canvas va
    var num_iter_canvas = 0; //cuantos svg a canvas del tablero se deben convertir
            //verificar que no se repita usuarios al registrarse
            $(".usernorepeat").change(function () {
                var username = $(this).val();
                var input = $(this);
                  $.ajax({
                    url: 'validateusername',
                    data: {
                      'username': username
                    },
                    dataType: 'json',
                    success: function (data) {
                      if (data.is_taken) {
                        alert("A user with this username already exists.");
                        $(input).val('');
                        $(input).focus();
                        //alert(data.is_taken);
                      }
                    }
                  });

            });

            //alert(screen.height);
            var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        //MENU DE IDIOMA
            var contflag = document.querySelector('.cont-flags');
            var contflagm = document.querySelector('.cont-flags-mob');
            contflag.estado = 'oculto'; //bandera de estado para menu de banderas
            contflagm.estado = 'oculto'; //bandera de estado para menu de banderas
            //SETEAMOS COOKIES Y POSICIONES DE BANDERAS SEGÚN IDIOMA
            var actual_lang = $("#select-language").find('select').val();
            var scrollin_wrap = document.querySelector(".scrolling-wrapper");
            var scrollin_wrapm = document.querySelector(".scrolling-wrapper-mob");
            var dir_imgs_countries = ['/static/img/australia.png','/static/img/colombia.jpg','/static/img/estados_unidos.png','/static/img/italia.png'];
            var atributes_country = ['AUS','COL','USA','ITA'];
            var atributes_cambio = ['AUD','COP','USD','Euros'];
            var divs_flags = [];
            var img_flags = [];
        if( isMobile.any() || window.innerWidth <= 720)
        {
            //limpiando cookies

            $('#cleancookies').on('click',function () {
                $.ajax({
                         url:  'cleancookies', //  guardar/ the endpoint,commonly same url
                         type: 'GET', //parece que no es necesario
                         data: {}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache: false,
                         //processData: false, // csrfmiddlewaretoken : csrftoken
                         dataType: 'json',
                         // handle a successful response
                         success: function (data) {
                             alert(data.cookies+ ' ' + data.estado);
                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                     });
            });
            $.ajax({
                         url:  'chargecolors', //  guardar/ the endpoint,commonly same url
                         type: 'get', //parece que no es necesario
                         data: {}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache: false,
                         //processData: false, // csrfmiddlewaretoken : csrftoken
                         dataType: 'json',
                         // handle a successful response
                         success: function (data) {
                                var colordict = [];


                                var links = [];
                                for(var cc = 0; cc<data.colores.length;cc++)
                                {
                                    IterativeImgToBase64URL('https://madebylio.com/media/'+data.colores[cc].file_color,
                                function (base64,posicion,total)
                                {
                                    links[posicion] = base64;
                                    if(posicion===total-1)
                                    {
                                        //$('#trigg-b64-to-key-dict').trigger('set-b64-to-dict',[data.colores,links]);//evento que creara el dicccionario par {color/color.jpg:base64URI}
                                        setTimeout(
                                            function () {
                                                var input_base64 = document.querySelector('#trigg-b64-to-key-dict');
                                                input_base64.base64data = links;
                                               //console.log(document.querySelector('#trigg-b64-to-key-dict').base64data);
                                                var sayings = new Map();
                                             for(var c = 0; c<data.colores.length;c++)
                                             {
                                                 sayings.set(data.colores[c].file_color,input_base64.base64data[c]);
                                             }
                                             input_base64.colorimages = sayings;
                                             //console.log(input_base64.colorimages.get('color/verde_madebylio.jpg')); //s
                                            }
                                        ,1000);

                                    }
                                    else
                                    {

                                    }
                                },cc,data.colores.length);


                                }

                                //IterativeImgToBase64URL(colordict, callback,posicion,total);



                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                    });
             //CARGAR PROGRESO DEL TABLERO Y TABLA EN CASO DE QUE EXISTA, SE CARGA
            setTimeout(function () {
                charge_board_table_mob('board','table',same_prod_matrix);
            },10000);
            $('.mob-comprar').on('touchstart',function (e) {
        //objetenemos los datos de nuestra tabla de productos y lo enviamos a los datos de nuestra sesion
        e.preventDefault();
        alert('as');
        var datos_compra = document.querySelector('#info-productos');
        if(datos_compra.data === undefined)
        {
            alert('No has seleccionado ningún producto!!');
        }
        else
        {
            //alert(datos_compra.data);
        //var caca ={'producto_item':[3,2],'cantidad_item':2};
        //caca = datos_compra.data;
            //VERIFICAMOS SI EL USUARIO ESTA LOGEADO
            var check_user = getCookie('username');
            if(check_user === '' && usuario === 'AnonymousUser')
            {
                alert('Logeate primero porfavor!');
                //$('.login-btn').trigger('click');
            }
            else
            {
                var prueba = [['9',2],['16',4]];
                var shop_detail = datos_compra.data;
                //alert(JSON.stringify(shop_detail));
                var pos1,pos3,pos5;
                /*ACONDICIONAMOS LA MATRIZ PARA QUE LLEGUE A NUESTRO FORMSET [ID,CANTIDAD,..,..]*/
                for(var fila = 0; fila<shop_detail.length;fila++)
                {
                    pos1 = shop_detail[fila][1];
                    pos3 = shop_detail[fila][3];
                    pos5 = shop_detail[fila][5];
                    shop_detail[fila][1] = pos3;
                    shop_detail[fila][3] = pos5;
                    shop_detail[fila][4] = pos1;
                    alert(JSON.stringify(shop_detail));
                    //alert(shop_detail);
                    //alert(shop_detail[fila][3]);
                }
                $.ajax({
                         url:  'savebuy', //  guardar/ the endpoint,commonly same url
                         type: 'GET', //parece que no es necesario
                         data: {'datos[]':JSON.stringify(shop_detail)}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache: false,
                         //processData: false, // csrfmiddlewaretoken : csrftoken
                         dataType: 'json',
                         // handle a successful response
                         success: function (data) {
                             alert('Redirigiendo a pagos');
                              window.location = '/pagos/';

                            //alert(data.test.test_id);
                             //document.querySelector('#formtroquel').reset();
                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                     });
                }
            }



    });
            //CREAMOS TABLA DE PRODUCTOS
            crear_table_productos_mobile();
            //alert('Mobile');
            //variables de incializacion para contenedores de menu de categorias
            var imanes = document.querySelectorAll('.bemagnet');
            var ceramicas = document.querySelectorAll('.bepottery');
            var bisuteria = document.querySelectorAll('.becatchpenny');
            var hogar = document.querySelectorAll('.behome');
            $(imanes).css('display','none');
            $(ceramicas).css('display','none');
            $(bisuteria).css('display','none');
            $(hogar).css('display','none');
            $('#maquechita').on('click',function () {
                alert(getCookie('datacompra'));

            });
            //inicializamos video 1 en mobile
            //INCIALIZAMOS VIDEO
            var mobmyPlayer1 = videojs("mob-video1");
            mobmyPlayer1.src({ type: "video/webm", src: '/static/video/bunny.webm'});
            //$('.vjs-play-control').trigger('click');
            mobmyPlayer1.play();
            //VERIFICAMOS SI EL USUARIO ESTA LOGEADO MEDIANTE COOKIE

            if(usuario==='AnonymousUser')
            {
               setCookie('username',''); //limpiamos la cookie cuando salimos del login
            }
            var check_mob_user = getCookie('username');

            if(check_mob_user === '' && usuario === 'AnonymousUser') //usuario no logeado
            {
                alert('no logeado');

            }
            /*else if(getCookie('username') === '' && usuario !== 'AnonymousUser')
            {
                alert(usuario + ' ' +'log face');

                $('.no-log').toggle();
                $('.log').toggle();
                document.querySelector('#name-profile').innerHTML = nombre;
            }*/
            else
            {
                //alert('log interno');
                $('.no-log').toggle();
                $('.log').toggle();
                document.querySelector('#name-profile').innerHTML = getCookie('username');
            }
            viewport_height = screen.height;
            //alert('celuco');
            //DESHABILITAMOS SKROLL
            document.querySelector('#escritorio').removeAttribute('data-emit-events');


            //MENU DE IDIOMA
            if(getCookie('pais')==='')
            {
                //osea no hay cookie OSEA PRIMERA VEZ QUE ENTRA EL USUARIO
                if(actual_lang === 'en')
                {

                    setCookie('pais', 'AUS', 30);
                    setCookie('cambio', 'AUD', 30);
                    setCookie('img-flag', '/static/img/australia.png', 30);

                    //ORGANIZAMOS NUESTROS DATOS EN FUNCION DE AUSTRALIA
                    for (var cm = 0;cm<4;cm++)
                {
                    divs_flags[cm] = document.createElement('div');
                    $(divs_flags[cm]).addClass('card-mob');
                    img_flags[cm] = document.createElement('img');
                    $(img_flags[cm]).addClass('img-flag');
                    $(img_flags[cm]).attr("src",dir_imgs_countries[cm]);
                    $(img_flags[cm]).attr("data-pais",atributes_country[cm]);
                    scrollin_wrapm.appendChild(divs_flags[cm]);
                    divs_flags[cm].appendChild(img_flags[cm]);

                    //EVENTO CLICK PARA BANDERAS
                    $(img_flags[cm]).on('click',function () {
                if($(this).attr('data-pais')==='AUS')
                {
                    $("#select-language").find('select').val("en");
                    setCookie('pais','AUS',30);
                    setCookie('cambio','AUD',30);
                    $("#select-language").submit();


                }
                else if($(this).attr('data-pais')==='COL')
                {
                    $("#select-language").find('select').val("es");
                    setCookie('pais','COL',30);
                    setCookie('cambio','COP',30);
                    $("#select-language").submit();

                }
                else if($(this).attr('data-pais')==='USA')
                {
                    $("#select-language").find('select').val("en");
                    setCookie('pais','USA',30);
                    setCookie('cambio','USD',30);
                    $("#select-language").submit();

                }
                else
                {
                    setCookie('pais','ITA',30);
                    setCookie('cambio','Euros',30);
                    $("#select-language").find('select').val("it");
                    $("#select-language").submit();

                }

                });
                }
                }
                else //si es otro idioma
                {


                    setCookie('pais', 'COL', 30);
                    setCookie('cambio', 'COP', 30);
                    setCookie('img-flag', '/static/img/colombia.jpg', 30);
                    //ORGANIZAMOS NUESTROS DATOS EN FUNCION DE AUSTRALIA
                    for (var ccm = 0;ccm<4;ccm++)
                {
                    divs_flags[ccm] = document.createElement('div');
                    $(divs_flags[ccm]).addClass('card-mob');
                    img_flags[ccm] = document.createElement('img');
                    $(img_flags[ccm]).addClass('img-flag');
                    $(img_flags[ccm]).attr("src",dir_imgs_countries[ccm]);
                    $(img_flags[ccm]).attr("data-pais",atributes_country[ccm]);
                    scrollin_wrapm.appendChild(divs_flags[ccm]);
                    divs_flags[ccm].appendChild(img_flags[ccm]);

                    //EVENTO CLICK PARA BANDERAS
                    $(img_flags[ccm]).on('click',function () {
                if($(this).attr('data-pais')==='AUS')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','AUS',30);
                    setCookie('cambio','AUD',30);

                }
                else if($(this).attr('data-pais')==='COL')
                {
                    $("#select-language").find('select').val("es");
                    $("#select-language").submit();
                    setCookie('pais','COL',30);
                    setCookie('cambio','COP',30);
                }
                else if($(this).attr('data-pais')==='USA')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','USA',30);
                    setCookie('cambio','USD',30);
                }
                else
                {
                    $("#select-language").find('select').val("it");
                    $("#select-language").submit();
                    setCookie('pais','ITA',30);
                    setCookie('cambio','Euros',30);
                }

                });
                }
                }

            }
            else
            {
                //YA HAY REGISTRADO UN PAIS DE PREFERENCIA
                //REORGANIZAMOS MATRIZ DE PAISES
                var bufferm;
                for(var ccountrym = 0;ccountrym<atributes_country.length;ccountrym++)
                {
                    if(atributes_country[ccountrym]===getCookie('pais'))
                    {
                        bufferm = atributes_country[ccountrym];
                        atributes_country[ccountrym] = atributes_country[0];
                        atributes_country[0] = bufferm;
                        bufferm = atributes_cambio[ccountrym];
                        atributes_cambio[ccountrym] = atributes_cambio[0];
                        atributes_cambio[0] = bufferm;
                        bufferm = dir_imgs_countries[ccountrym];
                        dir_imgs_countries[ccountrym] = dir_imgs_countries[0];
                        dir_imgs_countries[0] = bufferm;
                        break;
                    }
                }

                console.log('ttt'+ ' '+ atributes_country);
                //REORGANIZAMOS MATRIZ DE CAMBIOS
                //procedemos a crear menu de banderas con las matrices organizadas
                //ORGANIZAMOS NUESTROS DATOS EN FUNCION DE AUSTRALIA
                    for (var cccm = 0;cccm<4;cccm++)
                {
                    divs_flags[cccm] = document.createElement('div');
                    $(divs_flags[cccm]).addClass('card-mob');
                    img_flags[cccm] = document.createElement('img');
                    $(img_flags[cccm]).addClass('img-flag');
                    $(img_flags[cccm]).attr("src",dir_imgs_countries[cccm]);
                    $(img_flags[cccm]).attr("data-pais",atributes_country[cccm]);
                    scrollin_wrapm.appendChild(divs_flags[cccm]);
                    divs_flags[cccm].appendChild(img_flags[cccm]);

                    //EVENTO CLICK PARA BANDERAS
                    $(img_flags[cccm]).on('click',function () {
                if($(this).attr('data-pais')==='AUS')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','AUS',30);
                    setCookie('cambio','AUD',30);
                    setCookie('img-flag','/static/img/australia.png',30);

                }
                else if($(this).attr('data-pais')==='COL')
                {
                    $("#select-language").find('select').val("es");
                    $("#select-language").submit();
                    setCookie('pais','COL',30);
                    setCookie('cambio','COP',30);
                    setCookie('img-flag','/static/img/colombia.jpg',30);
                }
                else if($(this).attr('data-pais')==='USA')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','USA',30);
                    setCookie('cambio','USD',30);
                    setCookie('img-flag','/static/img/estados_unidos.png',30);
                }
                else
                {
                    $("#select-language").find('select').val("it");
                    $("#select-language").submit();
                    setCookie('pais','ITA',30);
                    setCookie('cambio','Euros',30);
                    setCookie('img-flag','/static/img/italia.png',30);
                }

                });
                }
            }

             //MENU FLAGS

                 $('.show-flags-mob').find('img').on('click',function () {
                 var contflag = document.querySelector('.cont-flags-mob');//
                if(contflag.estado === 'visible')
                {
                    $('.shadow-flags').stop().animate({left: '33%'}, 1000);
                     contflag.estado = 'oculto';
                }
                else
                {
                    $('.shadow-flags').stop().animate({left: '100%'}, 1000);
                    contflag.estado = 'visible';//
                    setTimeout(function () {
                         $('.shadow-flags').stop().animate({left: '33%'}, 1000,
                             function () {
                        contflag.estado ='oculto';
                        console.log(contflag.estado);
                    });
                     },5000);

                }

                 });

            //BOTONES DEL MENU HEADER INICIO PRODUCTOS GALERIA CARRITO LOGIN
            //EVENTO CLICK PARA EL MENU DE NAVEGACION
            $('.icon-menu').on('click',function () {

                $('.nav-hide-menu').slideToggle('slow');
                $('.nav-hide-user').fadeOut();
                //$(this).toggleClass('resalt-menu');

            });
            $('.icon-users').on('click',function () {

                $('.nav-hide-user').slideToggle('slow');
                $('.nav-hide-menu').fadeOut();
                //$(this).toggleClass('resalt-menu');

            });

            //COMO OCULTA  ELEMENTOS CUANDO PULSAMOS EN OTRO LADO
            $(document).on("click",function(e) {

                var container = $(".nav-hide-user,.nav-hide-menu,.icon-users,.icon-menu,.icon-shopcar"); //ELEMENTOS QUE NO SE CONSIDERAN PARA ESCONDER
                var whoerrase = $(".nav-hide-user,.nav-hide-menu"); //ELEMENTOS QUE SE DEBEN ESCONDER AL DAR CLICK EN ALGUNA ZONA QUE NO PERTENEZCA A CONTAINER
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $(whoerrase).fadeOut();
                }
            });
            //escodnder dinamicamente menus
            /*$('.li-item').on('click',function () {
                var content = $('.li-content');
                $(this).parent().find('.li-content').slideToggle('slow');
                // mostramos el contenido del item que se pulso
            });*/
            $('.li-login .li-item').on('click',function () {

                $('.li-login .li-content').slideToggle('slow');
                return false;
                // mostramos el contenido del item que se pulso
            });
            $('.li-reg .li-item').on('click',function (e) {

                $('.li-reg .li-content').slideToggle('slow');
                return false;
                // mostramos el contenido del item que se pulso
            });
            $('.go2reg').on('click',function (e) {
                $('.li-login .li-item').trigger('click');
                $('.li-reg .li-item').trigger('click');
                return false;
            });

            //AJAX PARA LOGEAR AL USUARIO
            $('.ajax-login-form').on('submit',function (e) {
                    e.preventDefault();
            //  var formdata = new FormData($(this)[0]);
        //var stayloggedin = document.getElementById('stayloggedin').checked;
                    $.ajax({

                             url:  'loginuser', //  guardar/ the endpoint,commonly same url
                             type: 'POST', //parece que no es necesario
                             data: $(this).serialize(), // csrfmiddlewaretoken : csrftoken  data sent with the post request
                             cache: false,
                             //processData: false, // csrfmiddlewaretoken : csrftoken
                             dataType: 'json',
                             // handle a successful response
                             success: function (data) {
                                 if(data.respuesta.resultado === 'success') //login completado
                                 {
                                     $('.ajax-login-form')[0].reset();
                                     setCookie('username',data.respuesta.usuario,30);
                                     //mostramos usuario en panel
                                     document.querySelector('#name-profile').innerHTML = getCookie('username');
                                     $('.no-log').toggle();//quitamos el login y ponemos info de usuario
                                     $('.log').toggle();
                                     //alert('logeado');
                                 }
                                 else
                                 {
                                     //alert('usuario o contraseña incorrecta!');
                                     $('.ajax-login-form')[0].reset();
                                 }
                                //alert(data.respuesta.resultado);
                                 //document.querySelector('#formtroquel').reset();
                             },
                             // handle a non-successful response
                             error: function (xhr, errmsg, err) {
                                 alert(errmsg);
                             }
                         });
                });

            $('.icon-shopcar').on('click',function () {
                var check_user = getCookie('username');
                if(check_user === '' && usuario === 'AnonymousUser')
                {
                    alert('Logeate primero porfavor!');
                    $('.nav-hide-user').slideToggle();
                }
                else {
                    //window.location = '/pagos/';
                    if ($('#cart-number').html() === '0')
                    {
                        alert('Please, add products to car!');
                        $('html, body').stop().animate({
                                        scrollTop: viewport_height - (viewport_height*0.2)
                                    }, 1000, function ()
                        {

                        });
                    }
                    else
                    {
                        window.location = '/pagos/';
                    }

                }
            });
            //AJAX PARA REGISTRAR USUARIO
            $('.ajax-reg-form').on('submit',function (e) {
            e.preventDefault();
            //  var formdata = new FormData($(this)[0]);
        //var stayloggedin = document.getElementById('stayloggedin').checked;
        $.ajax({

                 url:  'reguser', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: $(this).serialize(), // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     if(data.respuesta.resultado === 'success') //login completado
                     {
                         $('.ajax-reg-form')[0].reset();
                         alert('usuario creado satisfactoriamente');
                         //$('.cont-user-log-reg').css('display','none');
                         //$('#cont-user-access1').removeClass('cont-user-access');
                         //$('#cont-user-access1').addClass('usermsg');
                         //$('#btn-loginadmin').css('display','none');
                         //$('#cont-user-access1').html('Bienvenido ' + data.respuesta.usuario);
                         //$('.btn-salir').css('display','flex');
                         //$('.user-info').html('Bienvenido ' + data.respuesta.usuario);
                     }
                     else
                     {
                         alert('verifica los datos!');
                         $('.ajax-login-form')[0].reset();
                     }
                   // alert(data.respuesta.resultado);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
    });
            //borrar cookie cuando queremos salir del nuestro login
            $('.btn-mob-salir').on('click',function () {
                deleteCookie('username');
                //alert('asdasd');
            });

            //botones de navegacion inicio productos
            //BOTON INICIO
            $('#mob-home-btn').on('click',function () {
                $('.nav-hide-menu').fadeOut(); //escondemos el menu
                var  viewport_height = screen.height; // altura del viewport del celular
                $('html, body').stop().animate({
                                        scrollTop: 0
                                    }, 3000, function ()
                     {

                     });
                return false;
            });
            $('#mob-prod-btn').on('click',function () {
                $('.nav-hide-menu').fadeOut(); //escondemos el menu
                var  viewport_height = screen.height; // altura del viewport del celular

                $('html, body').stop().animate({
                                        scrollTop: viewport_height
                                    }, 3000, function ()
                     {

                     });
                return false;
            });
            $('#mob-gal-btn').on('click',function () {
                $('.nav-hide-menu').fadeOut(); //escondemos el menu
                var  viewport_height = screen.height; // altura del viewport del celular
                $('html, body').stop().animate({
                                        scrollTop: 2*viewport_height
                                    }, 3000, function ()
                     {

                     });
                return false;
            });
            $('#mob-contact-btn').on('click',function () {
                $('.nav-hide-menu').fadeOut(); //escondemos el menu
                var  viewport_height = screen.height; // altura del viewport del celular
                $('html, body').stop().animate({
                                        scrollTop: 3*viewport_height
                                    }, 3000, function ()
                     {

                     });
                return false;
            });
             $( "input, textarea" ).on( "focus",function() {
               var that = this;
                //alert('focus');
                $('.nav-hide-user .no-log ul li.li-reg').css('padding-bottom','200px');
            } ).on( "blur", function(){
                $('.nav-hide-user .no-log ul li.li-reg').css('padding-bottom','0');
            });

            $('#test_cookies').on('click',function () {
               var dict = {};
               dict['nombre'] = 'producto1';
               dict['precio'] = 3000;
               dict['imagen'] = 'imagen/test.tesst';
               alert(dict.nombre);

            });
            $('#mob-imanes').on('click',function (e) {
               e.preventDefault();
               if($(imanes).css('display')==='block')
               {
                   $(imanes).css('display','none');
               }
               else
               {
                   $(imanes).css('display','block');
                   $(ceramicas).css('display','none');
                   $(bisuteria).css('display','none');
                   $(hogar).css('display','none');
               }

               return false;
            });
            $('#mob-ceramica').on('click',function (e) {
               e.preventDefault();
               if($(ceramicas).css('display')==='block')
               {
                   $(ceramicas).css('display','none');
               }
               else
               {
                   $(imanes).css('display','none');
                   $(ceramicas).css('display','block');
                   $(bisuteria).css('display','none');
                   $(hogar).css('display','none');
               }

               return false;
            });
            $('#mob-bisuteria').on('click',function (e) {
               e.preventDefault();
               if($(bisuteria).css('display')==='block')
               {
                   $(bisuteria).css('display','none');
               }
               else
               {
                   $(imanes).css('display','none');
                   $(ceramicas).css('display','none');
                   $(bisuteria).css('display','block');
                   $(hogar).css('display','none');
               }

               return false;
            });
            $('#mob-hogar').on('click',function (e) {
                e.preventDefault();
                if($(hogar).css('display')==='block')
               {
                   $(hogar).css('display','none');
               }
               else
               {
                   $(imanes).css('display','none');
                   $(ceramicas).css('display','none');
                   $(bisuteria).css('display','none');
                   $(hogar).css('display','block');
               }

               return false;
            });
            $('.mob-show-prod').on('click',function (e) {
                e.preventDefault();
                var categoria  = $(this).attr('data-cat');
                mobile_category_finder(categoria);
                return false;
            });

            $('.clean-board').on('click',function () {
                alert('removed');
                //var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
                //var distancia = ['',10,5,5,5,2,5,2];
                //var v_reglas = ['',10,10,6.666666667,5,10,3.333333333,7.142857143];
                //var v_distancia = ['',10,5,5,5,2,5,2];
                document.querySelector('#cont-test-mob').innerHTML = '<div id="test-dnd-mob"></div>';
                //document.querySelector('#productos-cont-dragdrop').style.width = '100%';
                //document.querySelector('#productos-cont-dragdrop').style.height = '100%';
                //document.querySelector('#productos-cont-dragdrop').setAttribute('data-escala',1);
                //var act_scale = document.querySelector('#act-scale');
                //act_scale.innerHTML = '100%';
                //create_rules(17,10,1,reglas,v_reglas,distancia,v_distancia);
                sessionStorage.removeItem("board");
                sessionStorage.removeItem("table");
                sessionStorage.removeItem("dropproducts");
                sessionStorage.removeItem("files");
                sessionStorage.removeItem("data");//

                var input = document.querySelector('#info-productos');

                input.data = [];
                input.filas = 0;
                input.drop_products = 0;
                document.querySelector('#subtotal_mob').innerHTML = '0';
                document.querySelector('#subtotal_productos_mob #tbodycompra').innerHTML = '';


            });

            /*
            document.querySelector('.test-mob-dnd').addEventListener('touchstart',function(e)
            {
               this.style.backgroundColor = 'blue';
            },false);
            document.querySelector('.test-mob-dnd').addEventListener('touchmove',function(e)
            {
                e.preventDefault();
                this.style.left = (e.touches[0].clientX - 20 ) + 'px';
               this.style.top = (e.touches[0].clientY - 20 - document.querySelector('#test-dnd-mob').getBoundingClientRect().top) + 'px';
               document.querySelector('#show-coor').innerHTML =  'x ' + e.touches[0].clientX + ' y ' + e.touches[0].clientY + ' yoff ' + document.querySelector('#test-dnd-mob').getBoundingClientRect().top;
            },false);

            document.querySelector('.test-mob-video').addEventListener('touchstart',function(e)
            {
               this.style.backgroundColor = 'blue';
               var xoffset = e.touches[0].clientX - this.getBoundingClientRect().left;
               var yoffset = e.touches[0].clientY - this.getBoundingClientRect().top;

               document.querySelector('.test-mob-video').addEventListener('touchmove',function(e)
                {
                    e.preventDefault();// prevenir que la pantalla scrollee


                    this.style.left = (e.touches[0].clientX - document.querySelector('#test-dnd-mob').getBoundingClientRect().left) - xoffset+ 'px';
                   this.style.top = (e.touches[0].clientY  - document.querySelector('#test-dnd-mob').getBoundingClientRect().top) - yoffset + 'px';
                   document.querySelector('#show-coor').innerHTML =  'x ' + e.touches[0].clientX + ' y ' + e.touches[0].clientY + ' yoff ' + this.getBoundingClientRect().top;
                },false);


            },false);


            document.querySelector('#play-video-test').addEventListener('touchstart',function(e)
            {
                document.querySelector('.test-mob-video').querySelector('video').play();
            },false); */
        }

        else
        {
            //CARGAMOS NUESTRAS VARIABLES QUE DETERMINAN LAS PROPORCIONES Y UBICACION DE REGLA
            var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
            var distancia = ['',10,5,5,2,2,2,2];
            var v_reglas = ['',10,10,6.666666667,12.5,10,8.333333333,7.142857143];
            var v_distancia = ['',10,5,5,2,2,2,2];


           // alert(document.querySelector('#pinki'));
           /* PRUEBAS SVG PARA LA ZONA DE PRODUCTOS
           var prod_svg = document.querySelector('#fondo-principal');
            var svg_prod = prod_svg.contentDocument;
            var board = svg_prod.querySelector('#board');
            board.cat = 'cat';
            board.style.display = 'none';
            alert(board.cat);*/

           //cargar colores y conversion a base 64 para optimizacion de svg con imagen de pixel embebida
            //FUNCION PRIME: CONVERTIR IMAGENES A BASE 64 Y GUARDARLAS EN INPUT COMO DATO TIPO MAP

           $.ajax({
                         url:  'chargecolors', //  guardar/ the endpoint,commonly same url
                         type: 'get', //parece que no es necesario
                         data: {}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache: false,
                         //processData: false, // csrfmiddlewaretoken : csrftoken
                         dataType: 'json',
                         // handle a successful response
                         success: function (data) {
                                var colordict = [];


                                var links = [];
                                for(var cc = 0; cc<data.colores.length;cc++)
                                {
                                    IterativeImgToBase64URL('https://madebylio.com/media/'+data.colores[cc].file_color,
                                function (base64,posicion,total)
                                {
                                    links[posicion] = base64;
                                    if(posicion===total-1)
                                    {
                                        //$('#trigg-b64-to-key-dict').trigger('set-b64-to-dict',[data.colores,links]);//evento que creara el dicccionario par {color/color.jpg:base64URI}
                                        setTimeout(
                                            function () {
                                                var input_base64 = document.querySelector('#trigg-b64-to-key-dict');
                                                input_base64.base64data = links;
                                               //console.log(document.querySelector('#trigg-b64-to-key-dict').base64data);
                                                var sayings = new Map();
                                             for(var c = 0; c<data.colores.length;c++)
                                             {
                                                 sayings.set(data.colores[c].file_color,input_base64.base64data[c]);
                                             }
                                             input_base64.colorimages = sayings;
                                             //console.log(input_base64.colorimages.get('color/verde_madebylio.jpg')); //s
                                            }
                                        ,1000);

                                    }
                                    else
                                    {

                                    }
                                },cc,data.colores.length);


                                }

                                //IterativeImgToBase64URL(colordict, callback,posicion,total);



                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                    });
             //CARGAR PROGRESO DEL TABLERO Y TABLA EN CASO DE QUE EXISTA, SE CARGA
            setTimeout(function () {
                charge_board_table('board','table',same_prod_matrix);
            },10000);
            setTimeout(function(){
               $(document.querySelectorAll('.txt-subcat')[0]).trigger('click');
               console.log('end_charge');
            },11000);
            //deleteCookie('pais');
            //deleteCookie('cambio');
            //deleteCookie('img-flag');
            //console.log(getCookie('pais'));
            //console.log(getCookie('cambio'));
            if(getCookie('pais')==='')
            {
                //osea no hay cookie OSEA PRIMERA VEZ QUE ENTRA EL USUARIO
                if(actual_lang === 'en')
                {

                    setCookie('pais', 'AUS', 30);
                    setCookie('cambio', 'AUD', 30);
                    setCookie('img-flag', '/static/img/australia.png', 30);

                    //ORGANIZAMOS NUESTROS DATOS EN FUNCION DE AUSTRALIA
                    for (var c = 0;c<4;c++)
                {
                    divs_flags[c] = document.createElement('div');
                    $(divs_flags[c]).addClass('card');
                    img_flags[c] = document.createElement('img');
                    $(img_flags[c]).addClass('img-flag');
                    $(img_flags[c]).attr("src",dir_imgs_countries[c]);
                    $(img_flags[c]).attr("data-pais",atributes_country[c]);
                    scrollin_wrap.appendChild(divs_flags[c]);
                    divs_flags[c].appendChild(img_flags[c]);

                    //EVENTO CLICK PARA BANDERAS
                    $(img_flags[c]).on('click',function () {
                if($(this).attr('data-pais')==='AUS')
                {
                    $("#select-language").find('select').val("en");
                    setCookie('pais','AUS',30);
                    setCookie('cambio','AUD',30);
                    $("#select-language").submit();


                }
                else if($(this).attr('data-pais')==='COL')
                {
                    $("#select-language").find('select').val("es");
                    setCookie('pais','COL',30);
                    setCookie('cambio','Pesos',30);
                    $("#select-language").submit();

                }
                else if($(this).attr('data-pais')==='USA')
                {
                    $("#select-language").find('select').val("en");
                    setCookie('pais','USA',30);
                    setCookie('cambio','USD',30);
                    $("#select-language").submit();

                }
                else
                {
                    setCookie('pais','ITA',30);
                    setCookie('cambio','Euros',30);
                    $("#select-language").find('select').val("it");
                    $("#select-language").submit();

                }

                });
                }
                }
                else //si es otro idioma
                {


                    setCookie('pais', 'COL', 30);
                    setCookie('cambio', 'Pesos', 30);
                    setCookie('img-flag', '/static/img/colombia.jpg', 30);
                    //ORGANIZAMOS NUESTROS DATOS EN FUNCION DE AUSTRALIA
                    for (var cc = 0;cc<4;cc++)
                {
                    divs_flags[cc] = document.createElement('div');
                    $(divs_flags[cc]).addClass('card');
                    img_flags[cc] = document.createElement('img');
                    $(img_flags[cc]).addClass('img-flag');
                    $(img_flags[cc]).attr("src",dir_imgs_countries[cc]);
                    $(img_flags[cc]).attr("data-pais",atributes_country[cc]);
                    scrollin_wrap.appendChild(divs_flags[cc]);
                    divs_flags[cc].appendChild(img_flags[cc]);

                    //EVENTO CLICK PARA BANDERAS
                    $(img_flags[cc]).on('click',function () {
                if($(this).attr('data-pais')==='AUS')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','AUS',30);
                    setCookie('cambio','AUD',30);

                }
                else if($(this).attr('data-pais')==='COL')
                {
                    $("#select-language").find('select').val("es");
                    $("#select-language").submit();
                    setCookie('pais','COL',30);
                    setCookie('cambio','Pesos',30);
                }
                else if($(this).attr('data-pais')==='USA')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','USA',30);
                    setCookie('cambio','USD',30);
                }
                else
                {
                    $("#select-language").find('select').val("it");
                    $("#select-language").submit();
                    setCookie('pais','ITA',30);
                    setCookie('cambio','Euros',30);
                }

                });
                }
                }

            }
            else
            {
                //YA HAY REGISTRADO UN PAIS DE PREFERENCIA
                //REORGANIZAMOS MATRIZ DE PAISES
                var buffer;
                for(var ccountry = 0;ccountry<atributes_country.length;ccountry++)
                {
                    if(atributes_country[ccountry]===getCookie('pais'))
                    {
                        buffer = atributes_country[ccountry];
                        atributes_country[ccountry] = atributes_country[0];
                        atributes_country[0] = buffer;
                        buffer = atributes_cambio[ccountry];
                        atributes_cambio[ccountry] = atributes_cambio[0];
                        atributes_cambio[0] = buffer;
                        buffer = dir_imgs_countries[ccountry];
                        dir_imgs_countries[ccountry] = dir_imgs_countries[0];
                        dir_imgs_countries[0] = buffer;
                        break;
                    }
                }

                console.log('ttt'+ ' '+ atributes_country);
                //REORGANIZAMOS MATRIZ DE CAMBIOS
                //procedemos a crear menu de banderas con las matrices organizadas
                //ORGANIZAMOS NUESTROS DATOS EN FUNCION DE AUSTRALIA
                    for (var ccc = 0;ccc<4;ccc++)
                {
                    divs_flags[ccc] = document.createElement('div');
                    $(divs_flags[ccc]).addClass('card');
                    img_flags[ccc] = document.createElement('img');
                    $(img_flags[ccc]).addClass('img-flag');
                    $(img_flags[ccc]).attr("src",dir_imgs_countries[ccc]);
                    $(img_flags[ccc]).attr("data-pais",atributes_country[ccc]);
                    scrollin_wrap.appendChild(divs_flags[ccc]);
                    divs_flags[ccc].appendChild(img_flags[ccc]);

                    //EVENTO CLICK PARA BANDERAS
                    $(img_flags[ccc]).on('click',function () {
                if($(this).attr('data-pais')==='AUS')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','AUS',30);
                    setCookie('cambio','AUD',30);
                    setCookie('img-flag','/static/img/australia.png',30);

                }
                else if($(this).attr('data-pais')==='COL')
                {
                    $("#select-language").find('select').val("es");
                    $("#select-language").submit();
                    setCookie('pais','COL',30);
                    setCookie('cambio','COP',30);
                    setCookie('img-flag','/static/img/colombia.jpg',30);
                }
                else if($(this).attr('data-pais')==='USA')
                {
                    $("#select-language").find('select').val("en");
                    $("#select-language").submit();
                    setCookie('pais','USA',30);
                    setCookie('cambio','USD',30);
                    setCookie('img-flag','/static/img/estados_unidos.png',30);
                }
                else
                {
                    $("#select-language").find('select').val("it");
                    $("#select-language").submit();
                    setCookie('pais','ITA',30);
                    setCookie('cambio','Euros',30);
                    setCookie('img-flag','/static/img/italia.png',30);
                }

                });
                }
            }


            $('#test-query').on('click',function () {
                var pais = getCookie('pais');
                $.ajax({
                         url:  'testquery', //  guardar/ the endpoint,commonly same url
                         type: 'get', //parece que no es necesario
                         data:{'category':'THI','pais':pais},
                    // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache:false,
                         // handle a successful response
                         success: function (data) {
                             //alert('Redirigiendo a pagos');
                                //alert(data.archivo);
                                //console.log(data.troqueles.length)}
                            var newproduct = [] ;
                            for(var c = 0; c<data.productos.length;c++)
                            {
                                newproduct[c] = data.productos[c][0];
                            }
                             prod_matrix.clear_matrix();//limpiamos en caso de ya existir containers
                             console.log(data.productos);
                             console.log(newproduct);
                         prod_matrix.charge_containers(newproduct,'matrix-containers');
                        var img_sliders = prod_matrix.paint_object_with_64images('/media/',newproduct,data.datazones);
                                                   //------------------------------------------------------------------------------------
                         /*APLICACION DRAG AND DROP*/
                         //activamos drag a los objetos de la galeria

                         drag_drop_lio.set_drag_object(img_sliders,newproduct,'toboard',['id','nombre_producto','precio_producto','troquel_producto__file_troquel'],10,10);
                             /*for(var i = 0;i<data.troqueles.length;i++)
                             {
                                console.log('id: '+data.troqueles[i].id+ ' ' +data.troqueles[i].nombre_troquel);
                             }
                             for(var c = 0;c<data.producto.length;c++)
                             {
                                console.log('id: '+data.producto[c][0].nombre_producto);
                             }

                                console.log('logitud :'+data.troqueles.length);*/
                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                     });
            });






               //CARGA DE SPRITE LOGO

            charge_class_animation('#sprite-double','jumperload');

            //creacion tablad de productos

            crear_table_productos();

            //INICIALIZACION SLIDER Y DRAG AND DROP

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

        //var prod_slider = new slider('#cont-show-products');
        var prod_matrix = new matrix_display_images(document.querySelector('#slider-products'));
        var drag_drop_lio =  new drag_and_drop();
        //var same_prod_matrix = new matrix_display_images(document.querySelector('#same-products'));



            /////////////////////////////////////////////////////////////////////
      /*      $('#test-scope').on('click',function () {
                FB.ui({
                        method: 'share_open_graph',
                        action_type: 'og.shares',
                        action_properties: JSON.stringify({
                            object: {
                                'og:url': 'https://madebylio.com/' ,
                                'og:title': 'ocoquito quiere morir',
                                'og:description': 'ocoquito no quiere morir',
                                'og:image':'https://madebylio.com/media/basesixfor/lospasse.png'
                            }
                        })
                    },
                 function (response) {
                 function (response) {
                //your code goes here
                 });
            }); */
            $('#clean-board').on('click',function () {
                alert('removed');
                var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
                var distancia = ['',10,5,5,5,2,5,2];
                var v_reglas = ['',10,10,6.666666667,5,10,3.333333333,7.142857143];
                var v_distancia = ['',10,5,5,5,2,5,2];
                document.querySelector('#productos-cont-dragdrop').innerHTML = '<div id="grid-background"></div>';
                document.querySelector('#productos-cont-dragdrop').style.width = '100%';
                document.querySelector('#productos-cont-dragdrop').style.height = '100%';
                document.querySelector('#productos-cont-dragdrop').setAttribute('data-escala',1);
                var act_scale = document.querySelector('#act-scale');
                act_scale.innerHTML = '100%';
                create_rules(17,10,1,reglas,v_reglas,distancia,v_distancia);
                sessionStorage.removeItem("board");
                sessionStorage.removeItem("table");
                sessionStorage.removeItem("dropproducts");
                sessionStorage.removeItem("files");
                sessionStorage.removeItem("data");//

                var input = document.querySelector('#info-productos');

                input.data = [];
                input.filas = 0;
                input.drop_products = 0;
                document.querySelector('#subtotal').innerHTML = '0';
                document.querySelector('#tbodycompra').innerHTML = '';


            });


            //EVENTO QUE CARGA EN DICCIONARIO LOS COLORES USADOS Y SUS RESPECTIVOS VALORES EN BASE64

             $('#trigg-b64-to-key-dict').on('set-b64-to-dict',function (e,colores,base64uri) {
                 var sayings = new Map();
                 for(var c = 0; c<colores.length;c++)
                 {
                     sayings.set(colores[c].file_color,base64uri[c]);
                 }
                                console.log(sayings);
             });


             //PERZONALIZACION DE PRODUCTOS QUE HAN SIDO DRAGEADOS
            var test_slider = new slider('#slider-drag-products');//creacion slider
            $('#btn-size').on('click',function () {
                console.log('test-img');
            });


           //ZONA DE LOGIN Y REGISTRO



            var viewport_height = window.innerHeight;
            //setCookie('username','');
            if(usuario==='AnonymousUser')
            {
               setCookie('username',''); //limpiamos la cookie cuando salimos del login
            }
            var check_user = getCookie('username');


            //check_user = '';
            //alert(check_user);
            if(check_user === '' && usuario === 'AnonymousUser')//si el usuario es anonimo no logeado
            {
                //$('.dash-log-reg').css('right','-5.5%');//panel a la mitad usuario debe registrarse o logearse
                 $('.login-text').css('display','block');
                 $('.reg-text').css('display','block');
                 $('.cont-prof-photo').css('display','none');
                 $('#btn-salir-login').css('display','none'); //esconder boton salir
                 $('.vertical-line').css('display','none');
                 $('.vertical-line2').css('left','31.25%');
                 $('.dash-log-reg').css('width','45%');

                 //MENU FLAGS

                 $('.show-flags').find('img').on('click',function () {
                 var contflag = document.querySelector('.cont-flags');//
                if(contflag.estado === 'visible')
                {
                    $('.cont-flags').stop().animate({left: '-10.5%'}, 1000);
                     contflag.estado = 'oculto';

                }
                else
                {
                    $('.cont-flags').stop().animate({left: '-33%'}, 1000);
                    contflag.estado = 'visible';
                    setTimeout(function () {
                         $('.cont-flags').stop().animate({left: '-10.5%'}, 1000,
                             function () {
                        contflag.estado ='oculto';
                        console.log(contflag.estado);
                    });
                     },5000);

                }

                 });

            }
            else //usuario logeado
            {
                //alert(check_user);
                 //$('.dash-log-reg').css('right','-10.5%');
                $('.cont-flags').css('width','28.481%');//ajuste a menu banderas
                $('.cont-flags').css('left','-9%');//ajuste a menu banderas
                 //MENU FLAGS

                 $('.show-flags').find('img').on('click',function () {
                 var contflag = document.querySelector('.cont-flags');//
                if(contflag.estado === 'visible')
                {
                    $('.cont-flags').stop().animate({left: '-9.5%'}, 1000);
                     contflag.estado = 'oculto';
                }
                else
                {
                    $('.cont-flags').stop().animate({left: '-25%'}, 1000);
                    contflag.estado = 'visible';
                    setTimeout(function () {
                         $('.cont-flags').stop().animate({left: '-9.5%'}, 1000,function () {
                        contflag.estado ='oculto';
                    });
                     },5000);

                }
                    });

                 $('.nickname').css('display','block');
                 $('.myprofile').css('display','block');
                 $('.myshops').css('display','block');
                 $('.cont-prof-photo').css('display','block');
                 $('#btn-salir-login').css('display','block'); //mostrar boton salir

                 /*$('.dash-log-reg').on('mouseenter', function () {}).children().on('mouseenter', function (event) {
                    event.stopPropagation();
                    //alert('aasas');
                    $('.dash-log-reg').css('right','0%');
                    //you can also use `return false;` which is the same as `event.preventDefault()` and `event.stopPropagation()` all in one (in a jQuery event handler)
                });
             $('.dash-log-reg').on('mouseleave', function () {}).children().on('mouseleave', function (event) {
                    event.stopPropagation();
                    //alert('aasas');
                    $('.dash-log-reg').css('right','-10.5%');
                    //you can also use `return false;` which is the same as `event.preventDefault()` and `event.stopPropagation()` all in one (in a jQuery event handler)
                }); */
            }
            $('.login-text').on('click',function () {
                if($('#ajax-login-form').css('display')==='block')
                {
                    $('.cont-login-desktop').css('padding','0');
                    $('#ajax-login-form').css('display','none');
                    $('#ajax-reg-form').css('display','none');
                    $(this).removeClass('active-dash-login');
                }
                else
                {
                    $('.cont-login-desktop').css('padding','5px');
                    $('#ajax-login-form').css('display','block');
                    $('#ajax-reg-form').css('display','none');
                    $(this).addClass('active-dash-login');
                    $('.reg-text').removeClass('active-dash-login');
                }


            });
            $('.reg-text').on('click',function () {

                if($('#ajax-reg-form').css('display')==='block')
                {
                    $('.cont-login-desktop').css('padding','0');
                    $('#ajax-login-form').css('display','none');
                    $('#ajax-reg-form').css('display','none');
                    $(this).removeClass('active-dash-login');
                }
                else
                {
                    $('.cont-login-desktop').css('padding','5px');
                    $('#ajax-login-form').css('display','none');
                    $('#ajax-reg-form').css('display','block');
                    $(this).addClass('active-dash-login');
                    $('.login-text').removeClass('active-dash-login');
                }

            });
            $('#btn-salir').on('click',function () {
                deleteCookie('username');
            });

            //ocultar o mostrar menu login cuando pasamos el raton





            function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage)
            {
                FB.ui({
                    method: 'share_open_graph',
                    action_type: 'og.likes',
                    action_properties: JSON.stringify({
                        object: {
                            'og:url': overrideLink,
                            'og:title': overrideTitle,
                            'og:description': overrideDescription,
                            'og:image:url': overrideImage,
                            'og:image:width':500,
                            'og:image:height':261
                        }
                    })
                },
                function (response) {
                // Action after response
                });
            }

            $('#test-ajax').on('click',function(){
                shareOverrideOGMeta('https://madebylio.com','Made By Lio', 'Contemporany products for home',
'https://madebylio.com/static/img/test-img.png');
            });

            $('#shareFB').click(function () {
                //var data = $('#canvas')[0].toDataURL("image/png");
                //alert(dataURItoBlob(data));
                /* var image = $('#hopeimage').attr('src');
                    FB.ui(
                {
                    method: 'share',
                    href: $(location).attr('href') + '?og_img=' + image,
                },
                function (response) {

                }
            ); */
                //alert(document.querySelector("div canvas").toDataURL());


            });

           /* $('#test-face-share').on('click',function () {
                var u=location.href;
                var t=document.title;
                window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),
                'sharer',
                'toolbar=0,status=0,width=626,height=436');

            return false;
            });*/
            console.log(document.querySelector('#info-share-social').estado);
            //base 64 convert
            $('#base64').on('submit',function (e) {
                e.preventDefault();
                //var formData = new FormData();
                $(this)[0].reset();
                var image = document.querySelector('#canvons').toDataURL();
                $("input[name=base64image]").val(image);
                //formData.append('image',image);

                $.ajax({
                         url:  'savecanvas', //  guardar/ the endpoint,commonly same url
                         type: 'POST', //parece que no es necesario
                         data:$(this).serialize(),
                    // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache:false,
                         // handle a successful response
                         success: function (data) {
                             //alert('Redirigiendo a pagos');
                                //alert(data.archivo);
                               var typesocial = document.querySelector('#info-share-social').typesocial;
                               console.log('es social ' + typesocial);
                               if(typesocial == 'face')
                               {
                                    shareOverrideOGMeta('https://madebylio.com/','Made By Lio',gettext('Contemporany products for home'),'https://madebylio.com'+data.archivo);

                               }
                               else
                               {

                                   document.querySelector('#a-url').setAttribute('href','http://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent($(location).attr("href")) + '&media=' + encodeURIComponent("https://madebylio.com" + data.archivo) + '&description=' + encodeURIComponent("test a image"));
                                   $('#a-url').click();
                                   console.log('aaasdeasd');
                               }
                                //(shareOverrideOGMeta('https://madebylio.com/','Made By Lio',gettext('Contemporany products for home'),'https://madebylio.com'+data.archivo);
                            //alert(data.test.test_id);
                                console.log(data.archivo);

                             //document.querySelector('#formtroquel').reset();
                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                     });
            });
            //INCIALIZAMOS VIDEO
            var myPlayer = videojs("video-large");
            myPlayer.src({ type: "video/webm", src: '/static/video/bunny.webm'}); myPlayer.play();
            //alert('desktop');
            //VARIABLE MENU
            //ZONAS DEL SVG MENU LOS QUE SE RESALTAN CUANDO SE ESTA EN ESA ZONA
    var menu_content = document.querySelector('#menu-nav').contentDocument;
    var crab_zone = menu_content.querySelector('.home_menu');
    var dragon_zone = menu_content.querySelector('.productos_menu');
    var frog_zone = menu_content.querySelector('.galeria_menu');
    var buho_zone = menu_content.querySelector('.contactenos_menu');

    //INICIALIZACION SPRITES
    var crab_sprite = new dinamic_sprite(179.142857143,126,'crab',1,'animenu',document.querySelector('#gohome'));
    var dragon_sprite = new dinamic_sprite(175,128,'dragon',1,'animenu',document.querySelector('#goproductos'));
    var frog_sprite = new dinamic_sprite(115,118,'frog',1,'animenu',document.querySelector('#gogaleria'));
    var buho_sprite = new dinamic_sprite(114.4545455,118,'buho',1,'animenu',document.querySelector('#gocontacto'));

    //var logo_sprite = new dinamic_sprite(100,100,'',document.querySelector('#'));
    //CREAMOS SPRITE PARa crab
    crab_sprite.create_fixed_sprite();
    //crab_sprite.add_css_animation('hello');

     //CREAMOS SPRITE PARa dragon
    dragon_sprite.create_fixed_sprite();
    //dragon_sprite.add_css_animation('hello');

    //CREAMOS SPRITE PARa frog
    frog_sprite.create_fixed_sprite();
    //frog_sprite.add_css_animation('hello');

    //CREAMOS SPRITE PARa buho
    buho_sprite.create_fixed_sprite();
    //buho_sprite.add_css_animation('hello');





    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


    //EVENTOS DROP PARA PRODUCTOS
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
/*
     document.querySelector('#productos-cont-dragdrop').addEventListener("dragover",function (e) {e.preventDefault(); e.dataTransfer.dropEffect = "move"},false);
                         document.querySelector('#productos-cont-dragdrop').addEventListener("drop",function(e){create_drag_objects(e,'toboard',same_prod_matrix);},false);
    document.querySelector('#productos-cont-trash').addEventListener("dragover",function (e) {e.preventDefault(); e.dataTransfer.dropEffect = "move"},false);

    document.querySelector('#productos-cont-trash').addEventListener("drop",Droppapelera,false);*/


    /*document.querySelector('#productos-cont-dragdrop').onmousemove = function (e)
    {
        var x = e.clientX;
        var y = e.clientY;
        var obj_x = document.querySelector('#productos-cont-dragdrop').offsetLeft;
    };*/

   //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    //MENU DE NAVEGACION PARA SLIDER DE PRODUCTOS
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    /*$('#right-img').on('click',function () {
        prod_slider.moveright();
    });
    //menu de navegacion slider der
    $('#left-img').on('click',function () {
        prod_slider.moveleft();
    });*/

    $('#cont-imanes').eq(0).off('click').click(function (){
        //mostramos contenedor de las categorias
        $('#cont-subcategories').html('');
        create_subcategories([gettext('Letters'),gettext('Stuff'),gettext('Cars'),gettext('Fruit'),gettext('Characters'),gettext('Sheets')],['LET','THI','CAR','FRU','PER','SHE'],prod_matrix,drag_drop_lio);
        //$(this).find('object').not().css('display','none');
        //OCULTAR TODAS LOS OBJECT DE LAS CATEGORIAS
        $('.check-cat').find('object').css('display','none'); //encuentras los object de las categorias y los oculta
        //MUESTRA EL OBJECT DE LA CATEGORIA QUE SE PULSÓ
        $(this).find('object').css('display','block');
        //$('#cont-ceramica').css('top','100%');
    });

    $('#cont-ceramica').on('click',function () {
        //mostramos contenedor de las categorias
       $('#cont-subcategories').html('');

           create_subcategories([gettext('Plates'),gettext('Spoons'),gettext('Forks'),gettext('Teapot'),gettext('Mugs')],['PLA','SPO','FOR','TEA','MUG'],prod_matrix,drag_drop_lio);

        //OCULTAR TODAS LOS OBJECT DE LAS CATEGORIAS
        $('.check-cat').find('object').css('display','none'); //encuentras los object de las categorias y los oculta
        //MUESTRA EL OBJECT DE LA CATEGORIA QUE SE PULSÓ
        $(this).find('object').css('display','block');
    });

    $('#cont-bisuteria').on('click',function () {
        //mostramos contenedor de las categorias
       $('#cont-subcategories').html('');
        create_subcategories([gettext('Diadem'),gettext('Earings')],['DIA','EAR'],prod_matrix,drag_drop_lio);
        //OCULTAR TODAS LOS OBJECT DE LAS CATEGORIAS
        $('.check-cat').find('object').css('display','none'); //encuentras los object de las categorias y los oculta
        //MUESTRA EL OBJECT DE LA CATEGORIA QUE SE PULSÓ
        $(this).find('object').css('display','block');
    });

    $('#cont-hogar').on('click',function () {
        //mostramos contenedor de las categorias
       $('#cont-subcategories').html('');
        create_subcategories([gettext('Clocks'),gettext('Pictures')],['CLK','PIC'],prod_matrix,drag_drop_lio);
        //OCULTAR TODAS LOS OBJECT DE LAS CATEGORIAS
        $('.check-cat').find('object').css('display','none'); //encuentras los object de las categorias y los oculta
        //MUESTRA EL OBJECT DE LA CATEGORIA QUE SE PULSÓ
        $(this).find('object').css('display','block');
    });

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    //EVENTOS DE SLIDERS POR CADA PRODUCTO
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    /*$('#test-slider').on('click',function () {
        //alert($(this).attr('data-category'));
        ajax_category_finder('THI',test_slider,drag_drop_lio);
        //ajax_category_finder($(this).attr('data-category'),test_slider,drag_drop_lio);
    });*/



    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    //BTN DE COMPRA
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    $('#productos-cont-btncompra').on('click',function (e) {
        //objetenemos los datos de nuestra tabla de productos y lo enviamos a los datos de nuestra sesion
        e.preventDefault();
        var datos_compra = document.querySelector('#info-productos');
        if(datos_compra.data === undefined)
        {
            alert('No has seleccionado ningún producto!!');
        }
        else
        {
            //alert(datos_compra.data);
        //var caca ={'producto_item':[3,2],'cantidad_item':2};
        //caca = datos_compra.data;
            //VERIFICAMOS SI EL USUARIO ESTA LOGEADO
            var check_user = getCookie('username');
            if(check_user === '' && usuario === 'AnonymousUser')
            {
                alert('Logeate primero porfavor!');
                //$('.login-btn').trigger('click');
            }
            else
            {
                var prueba = [['9',2],['16',4]];
                var shop_detail = datos_compra.data;
                //alert(JSON.stringify(shop_detail));
                var pos1,pos3,pos5;
                /*ACONDICIONAMOS LA MATRIZ PARA QUE LLEGUE A NUESTRO FORMSET [ID,CANTIDAD,..,..]*/
                for(var fila = 0; fila<shop_detail.length;fila++)
                {
                    pos1 = shop_detail[fila][1];
                    pos3 = shop_detail[fila][3];
                    pos5 = shop_detail[fila][5];
                    shop_detail[fila][1] = pos3;
                    shop_detail[fila][3] = pos5;
                    shop_detail[fila][4] = pos1;
                    alert(JSON.stringify(shop_detail));
                    //alert(shop_detail);
                    //alert(shop_detail[fila][3]);
                }
                $.ajax({
                         url:  'savebuy', //  guardar/ the endpoint,commonly same url
                         type: 'GET', //parece que no es necesario
                         data: {'datos[]':JSON.stringify(shop_detail)}, // csrfmiddlewaretoken : csrftoken  data sent with the post request
                         cache: false,
                         //processData: false, // csrfmiddlewaretoken : csrftoken
                         dataType: 'json',
                         // handle a successful response
                         success: function (data) {
                             alert('Redirigiendo a pagos');
                              window.location = '/pagos/';

                            //alert(data.test.test_id);
                             //document.querySelector('#formtroquel').reset();
                         },
                         // handle a non-successful response
                         error: function (xhr, errmsg, err) {
                             alert(errmsg);
                         }
                     });
                }
            }



    });


    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    //LOGIN PARA USUARIOS
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    $('#ajax-login-form').on('submit',function (e) {
            e.preventDefault();
            //  var formdata = new FormData($(this)[0]);
        //var stayloggedin = document.getElementById('stayloggedin').checked;
        $.ajax({

                 url:  'loginuser', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: $(this).serialize(), // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     if(data.respuesta.resultado === 'success') //login completado
                     {
                         $('#ajax-login-form')[0].reset();

                         //$('#cont-user-access1').html('Bienvenido ' + data.respuesta.usuario);
                         $('.user-info').css('display','flex');
                         $('.login-btn').trigger('click');
                         $('.btn-salir').css('display','block');
                         $('.user-info').html('Bienvenido ' + data.respuesta.usuario);
                         setCookie('username',data.respuesta.usuario,30);
                         location.href = '/';
                     }
                     else
                     {
                         alert('usuario o contraseña incorrecta!');
                         $('#ajax-login-form')[0].reset();
                     }
                    //alert(data.respuesta.resultado);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
    });

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    //EVENTO POST FORMULARIO DE REGISTRO AJAX
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    $('#ajax-reg-form').on('submit',function (e) {
            e.preventDefault();
            //  var formdata = new FormData($(this)[0]);
        //var stayloggedin = document.getElementById('stayloggedin').checked;
        $.ajax({

                 url:  'reguser', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: $(this).serialize(), // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                     if(data.respuesta.resultado === 'success') //login completado
                     {
                         $('#ajax-reg-form')[0].reset();
                         alert('usuario creado satisfactoriamente');
                         //$('.cont-user-log-reg').css('display','none');
                         //$('#cont-user-access1').removeClass('cont-user-access');
                         //$('#cont-user-access1').addClass('usermsg');
                         //$('#btn-loginadmin').css('display','none');
                         //$('#cont-user-access1').html('Bienvenido ' + data.respuesta.usuario);
                         //$('.btn-salir').css('display','flex');
                         //$('.user-info').html('Bienvenido ' + data.respuesta.usuario);
                     }
                     else
                     {
                         alert('usuario o contraseña incorrecta!');
                         $('#ajax-login-form')[0].reset();
                     }
                   // alert(data.respuesta.resultado);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
    });

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    //SKROLLR API
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    $('.animenu').hover(
        function ()
        {
            var aviso = $(this).siblings('div');
            if(pagina_check === 3 || pagina_check === 4)
            {
                $(aviso).stop().animate({'right':'-100%'},500);
            }
            else
            {
                $(aviso).stop().animate({'right':'110%'},500);//
            }

            //alert($(aviso).attr('id'));
            switch ($(aviso).attr('id'))
            {
                case 'inicio-announce':
                    crab_sprite.add_css_animation('hello');
                break;
                case 'productos-announce':
                    dragon_sprite.add_css_animation('hello');
                break;
                case 'galeria-announce':
                    frog_sprite.add_css_animation('hello');
                break;
                case 'contacto-announce':
                    buho_sprite.add_css_animation('hello');
                break;
                default:
            }


        },
        function ()
        {
           var aviso = $(this).siblings('div');
           if(pagina_check === 3 || pagina_check === 4)
            {
                $(aviso).stop().animate({'right':'100%'},500);
            }
            else
            {
                $(aviso).stop().animate({'right':'-30%'},500);
            }

            switch ($(aviso).attr('id'))
            {
                case 'inicio-announce':
                    crab_sprite.del_css_animation('hello');
                break;
                case 'productos-announce':
                    dragon_sprite.del_css_animation('hello');
                break;
                case 'galeria-announce':
                    frog_sprite.del_css_animation('hello');
                break;
                case 'contacto-announce':
                    buho_sprite.del_css_animation('hello');
                break;
                default:
            }
        }
    );


    //BOTONES MENU DE NAVEGACION DE LA PAGINA
     $('.crab').on('click',function (e, pag) {
        $('#escritorio').addClass('click');
        if(pag === undefined)//quiere decir que se activo el boton de navegaciony no por scroll
        {
            var current_scroll = $(window).scrollTop();
	        var max_scroll = viewport_height*4;
	        pag =Math.trunc(1+((current_scroll/max_scroll)*4));

        }
        else
        {

        }
        //escondemos y mostramos de nuevo los announcements
        $('.hideme').css('display','none');
        setTimeout(function(){$('.hideme').css('display','block');},2000);
        pagina_check = 1;
        go_section('#zona1',pag);
        //prendemos boton de crab y apagamos resto
        $(crab_zone).css('display','block');
        $(dragon_zone).css('display','none');
        $(frog_zone).css('display','none');
        $(buho_zone).css('display','none');
        //alert(current_scroll + ' ' +viewport_height);
    });


    $('.dragon').on('click',function (e, pag)
    {
        //alert('checkccrab');
        $('#escritorio').addClass('click');
        if(pag === undefined)
        {
            var current_scroll = $(window).scrollTop();
	        var max_scroll = viewport_height*4;
	        pag =Math.trunc(1+((current_scroll/max_scroll)*4));
        }
        else
        {

        }
        //escondemos y mostramos de nuevo los announcements
        $('.hideme').css('display','none');
         setTimeout(function(){$('.hideme').css('display','block');},2000);
        go_section('#zona2',pag);
        pagina_check = 2;

        $(crab_zone).css('display','none');
        $(dragon_zone).css('display','block');
        $(frog_zone).css('display','none');
        $(buho_zone).css('display','none');
        //alert('productos');
    });

    $('.frog').on('click',function (e,pag) {
        $('#escritorio').addClass('click');
        if(pag === undefined)
        {
            var current_scroll = $(window).scrollTop();
	        var max_scroll = viewport_height*4;
	        pag =Math.trunc(1+((current_scroll/max_scroll)*4));
        }
        else
        {

        }
        //escondemos y mostramos de nuevo los announcements
        $('.hideme').css('display','none');
        setTimeout(function(){$('.hideme').css('display','block');},2000);
        go_section('#zona3',pag);
        pagina_check = 3;
        $(crab_zone).css('display','none');
        $(dragon_zone).css('display','none');
        frog_zone.style.display = 'block';
        $(buho_zone).css('display','none');

    });

    $('.buho').on('click',function (e,pag) {
        $('#escritorio').addClass('click');
        if(pag === undefined)
        {
            var current_scroll = $(window).scrollTop();
	        var max_scroll = viewport_height*4;
	        pag =Math.trunc(1+((current_scroll/max_scroll)*4));
        }
        else
        {

        }
        //escondemos y mostramos de nuevo los announcements
        $('.hideme').css('display','none');
        setTimeout(function(){$('.hideme').css('display','block');},2000);
        pagina_check = 4;
        go_section('#zona4',pag);

        $(crab_zone).css('display','none');
        $(dragon_zone).css('display','none');
        $(frog_zone).css('display','none');
        $(buho_zone).css('display','block');
    });

    //disparamos evento click del boton magnet para mostrar las subcategorias
            $('#cont-imanes object').css('display','block');
                $('#cont-subcategories').html('');

                //COMENTADO CAMBIO DE SLIDER A TABLERO SCROLLEABLE
                create_subcategories([gettext('Letters'),gettext('Stuff'),gettext('Cars'),gettext('Fruit'),gettext('Characters'),gettext('Sheets')],['LET','THI','CAR','FRU','PER','SHE'],prod_matrix,drag_drop_lio);

    var conscroll = [[0,"left:0vw;top:0vh"],
        [viewport_height/2,"left:0vw;top:-50vh"],
        [viewport_height,"left:0vw;top:-100vh"],
        [3*viewport_height/2,"left:-50vw;top:-100vh;"],
        [2*viewport_height,"left:-100vw;top:-100vh;"],
        [5*viewport_height/2,"left:-100vw;top:-50vh"],
        [3*viewport_height,"left:-100vw;top:0vh"],
        [7*viewport_height/2,"left:-50vw;top:0vh"],
        [4*viewport_height,"left:0vw;top:0vh"]
    ];

    var scrollinicio = [[0,"left:0vw;top:0vh"],
        [viewport_height/2,"left:0vw;top:0vh"],
        [viewport_height,"left:-100vw;top:0vh"],
        [3*viewport_height/2,"left:-100vw;top:0vh"],
        [2*viewport_height,"left:-100vw;top:0vh"],
        [5*viewport_height/2,"left:-100vw;top:0vh"],
        [3*viewport_height,"left:-100vw;top:0vh"],
        [7*viewport_height/2,"left:-100vw;top:0vh"],
        [4*viewport_height,"left:0vw;top:0vh"]
    ];
    var scrollproductos = [[0,"left:-100vw;top:100vh"],
        [viewport_height/2,"left:-100vw;100vh"],
        [viewport_height,"left:0vw;100vh"],
        [3*viewport_height/2,"left:0vw;100vh"],
        [2*viewport_height,"left:-100vw;100vh"],
        [5*viewport_height/2,"left:-100vw;100vh"],
        [3*viewport_height,"left:-100vw;100vh"],
        [7*viewport_height/2,"left:-100vw;100vh"],
        [4*viewport_height,"left:-100vw;100vh"]
    ];

    var scrollgaleria = [[0,"left:200vw;top:100vh"],
        [viewport_height/2,"left:200vw;top:100vh"],
        [viewport_height,"left:200vw;top:100vh"],
        [3*viewport_height/2,"left:200vw;top:100vh"],
        [2*viewport_height,"left:100vw;100vh"],
        [5*viewport_height/2,"left:100vw;100vh"],
        [3*viewport_height,"left:200vw;100vh"],
        [7*viewport_height/2,"left:200vw;100vh"],
        [4*viewport_height,"left:200vw;100vh"]
    ];
    var scrollcontacto = [[0,"left:200vw;top:0vh"],
        [viewport_height/2,"left:200vw;top:0vh"],
        [viewport_height,"left:200vw;top:0vh"],
        [3*viewport_height/2,"left:200vw;top:0vh"],
        [2*viewport_height,"left:200vw;top:0vh"],
        [5*viewport_height/2,"left:200vw;top:0vh"],
        [3*viewport_height,"left:100vw;top:0vh"],
        [7*viewport_height/2,"left:100vw;top:0vh"],
        [4*viewport_height,"left:200vw;0vh"]
    ];
    var scrollnavmenu = [[0,"right:-8.12%;opacity:1;"],
        [viewport_height/2,"right:-8.12%;opacity:1;"],
        [viewport_height,"right:-8.12%;opacity:1;"],
        [3*viewport_height/2,"right:-8.12%;opacity:0;"],
        [7*viewport_height/4,"right:92%;opacity:0;"],
        [9*viewport_height/5,"right:92%;opacity:0;"],
        [2*viewport_height,"right:92%;opacity:1;"],
        [5*viewport_height/2,"right:92%;opacity:1;"],
        [3*viewport_height,"right:92%;opacity:1;"],
        [7*viewport_height/2,"right:50%;opacity:0;"],
        [15*viewport_height/4,"right:-8.12%;opacity:0;"],
        [19*viewport_height/5,"right:-8.12%;opacity:0;"],
        [4*viewport_height,"right:-8.12%;opacity:1;"]
    ];
    var scrollcrab = [[0,"left:-5%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:-5%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:-5%;transform:scaleX(1);"],
        [9*viewport_height/5,"left:20%;transform:scaleX(-1);"],
        [2*viewport_height,"left:20%;transform:scaleX(-1);"],
        [7*viewport_height/2,"left:20%;transform:scaleX(-1);"],
        [19*viewport_height/5,"left:-5%;transform:scaleX(1);"],
        [4*viewport_height,"left:-5%;transform:scaleX(1);"]
    ];
    var scrolldragon = [[0,"left:-5%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:-5%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:-5%;transform:scaleX(1);"],
        [9*viewport_height/5,"left:35%;transform:scaleX(-1);"],
        [2*viewport_height,"left:35%;transform:scaleX(-1);"],
        [7*viewport_height/2,"left:35%;transform:scaleX(-1);"],
        [19*viewport_height/5,"left:-5%;transform:scaleX(1);"],
        [4*viewport_height,"left:-5%;transform:scaleX(1);"]
    ];
    var scrollfrog = [[0,"left:10%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:10%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:10%;transform:scaleX(1);"],
        [9*viewport_height/5,"left:45%;transform:scaleX(-1);"],
        [2*viewport_height,"left:45%;transform:scaleX(-1);"],
        [7*viewport_height/2,"left:45%;transform:scaleX(-1);"],
        [19*viewport_height/5,"left:10%;transform:scaleX(1);"],
        [4*viewport_height,"left:10%;transform:scaleX(1);"]
    ];
    var scrollbuho = [[0,"left:7%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:7%;transform:scaleX(1);"],
        [7*viewport_height/4,"left:7%;transform:scaleX(1);"],
        [9*viewport_height/5,"left:48%;transform:scaleX(-1);"],
        [2*viewport_height,"left:48%;transform:scaleX(-1);"],
        [7*viewport_height/2,"left:48%;transform:scaleX(-1);"],
        [19*viewport_height/5,"left:48%;transform:scaleX(1);"],
        [4*viewport_height,"left:7%;transform:scaleX(1);"]
    ];
    //FUNCION DE ACTIVACION DE SKROLL

    setSkrollr($("#escritorio"),conscroll);
    setSkrollr($("#inicio"),scrollinicio);
    setSkrollr($("#productos"),scrollproductos);
    setSkrollr($("#galeria"),scrollgaleria);
    setSkrollr($("#contacto"),scrollcontacto);
    setSkrollr($("#navmenu"),scrollnavmenu);
    setSkrollr($(".crab"),scrollcrab);
    setSkrollr($(".dragon"),scrolldragon);
    setSkrollr($(".frog"),scrollfrog);
    setSkrollr($(".buho"),scrollbuho);

    var s = skrollr.init(
        {
		render: function (data) {
            //document.querySelector('#testcur').innerHTML = data.curTop;
            //document.querySelector('#test').innerHTML = 4*viewport_height;
            if (data.curTop === 4 * viewport_height) {
                s.setScrollTop(0, true);
                //alert('llego');
            }

			console.log(data.curTop);
		},
		keyframe: function (element, keyframe, direction)
        {
            if (keyframe === 'data'+viewport_height/2 && direction === 'down')
                {
                    //alert('uptodown');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.dragon').trigger('click',[1]);
                    }
                    charge_class_animation('#sprite-double','jumperload');


				}
				else if (keyframe === 'data'+viewport_height/2 && direction === 'up')
				{
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.crab').trigger('click',[2]);

                    }
                    charge_class_animation('#sprite-double','jumperload');
				}

				if (keyframe === 'data'+viewport_height*3/2 && direction === 'down')
                {
                    //alert('uptodown');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.frog').trigger('click',[2]); //vamos para el sapo desde la pagina 2

                    }
                    var aviso = $('.animenu').siblings('div'); //detectamos anounce y cambiamos su posicion
                    $(aviso).css('right','100%');
                    charge_class_animation('#sprite-double','jumperload');
				}
				else if (keyframe === 'data'+viewport_height*3/2 && direction === 'up')
				{
					//alert('downtoup');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.dragon').trigger('click',[3]);
                    }
                    var aviso1 = $('.animenu').siblings('div');
                    $(aviso1).css('right','-20%');
                    charge_class_animation('#sprite-double','jumperload');
				}

				if (keyframe === 'data'+viewport_height*5/2 && direction === 'down')
                {
                    //alert('uptodown');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.buho').trigger('click',[3]);
                    }
                    charge_class_animation('#sprite-double','jumperload');
				}
				else if (keyframe === 'data'+viewport_height*5/2 && direction === 'up')
				{
					//alert('downtoup');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.frog').trigger('click',[4]);
                    }
                    charge_class_animation('#sprite-double','jumperload');
				}

				if (keyframe === 'data'+viewport_height*7/2 && direction === 'down')
                {
                    //alert('uptodown');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.crab').trigger('click',[4]);
                    }
                    charge_class_animation('#sprite-double','jumperload');
				}
				else if (keyframe === 'data'+viewport_height*7/2 && direction === 'up')
				{
					//alert('downtoup');
                    if($('#escritorio').hasClass('click'))
                    {

                    }
                    else
                    {
                        $('.buho').trigger('click',[1]);
                    }
                    charge_class_animation('#sprite-double','jumperload');
				}
		},
		smoothScrolling: true,
		mobileDeceleration: 0.004
	});

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    //PROBANDO COOKIE

    /*$('#test-cookie').on('click',function () {
        var name = "username" + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        setCookie('username','alberto',30);
        decodedCookie = decodeURIComponent(document.cookie);
        alert(decodedCookie);
    });*/
    /*$('#verify-cookie').on('click',function () {
        var decodedCookie = decodeURIComponent(document.cookie);
        alert(decodedCookie + ' ' + getCookie('sername'));
    });*/




    //boton de facebook
	$("#btn-Convert-Html2Image").on('click', function (e) {
	    e.preventDefault();
        /*html2canvas(document.querySelector('#productos-cont-dragdrop'),{allowTaint: true}).then(function (canvas) {
            document.querySelector('#previewImage').appendChild(canvas);
        });*/

            renderPage('face');
        return false;

    });
    $('#pinte-button').on('click', function(){
        console.log('pinterest');
       renderPage('pinte');
    });
	//CANVAS CARGADO Y LISTO PARA  COMPARTIR
         $('canvas#canvons').on('load',function () {
             alert('asdasd');

         });

	$('#trigger-svg-canvas').on('svg-canvas',function () {
          iter_canvas++;
          if(iter_canvas<num_iter_canvas)
          {
              console.log(iter_canvas);
          }
          else
          {
              renderPage();//dejamos nuestro tablero listo para ser enviado a face
              iter_canvas = 0; //inicializamos variables
              num_iter_canvas = 0; //inicializamos
          }


    });

	/*GUARDAR TABLERO */




    $('.btn-salir').on('click',function () {
        deleteCookie('username');
    });

    $('#go2reg').on('click',function () {
        $('.reg-btn').trigger('click');
    });


          /*  window.mobilecheck = function() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        };*/
        }
   /* var width_tablero =   ['','100%','200%','300%','400%','500%','600%','700%'];
    var tablero = document.querySelector('#productos-cont-dragdrop');
    var act_escala = tablero.getAttribute('data-escala');
    tablero.style.width = width_tablero[parseInt(act_escala,10)];*/
    var percents = ['','100%','200%','300%','400%','500%','600%','700%'];
    //var reglas   =['','5.8823%','5.8823%','2.941%','2.941%','2.941%','1.11765%','1.11765%'];




    $('#zoom-board').on('click',function () {
        var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
        var distancia = ['',10,5,5,5,2,5,2];
        var v_reglas = ['',10,10,6.666666667,5,10,3.333333333,7.142857143];
        var v_distancia = ['',10,5,5,5,2,5,2];
        //alert(document.querySelectorAll('div[id^=drop-productos]').length);
        var productos = document.querySelectorAll('div[id^=drop-productos]');
        var tablero = document.querySelector('#productos-cont-dragdrop');
        //var grilla = document.querySelector('#cont-rules');
        var act_scale = document.querySelector('#act-scale');
        var escala = parseInt(tablero.getAttribute('data-escala'),10);
        var prod_w = [];
        var prod_l = [];//
        var prod_t = [];
        var width_board,height_board,new_width,new_height;
        if(escala<7)
        {
            //CAMBIO DE MEDIDAS REGLA!!
            create_rules(reglas[escala+1],v_reglas[escala+1],escala+1,reglas,v_reglas,distancia,v_distancia);


            //CAMBIO EN EL TAMAÑO DEL TABLERO


            width_board = tablero.clientWidth;//ancho actual
            height_board = tablero.clientHeight; //alto actual


            //CAMBIO DE TAMAÑO Y POSICION PRODUCTOS

            for(var c = 0;c<productos.length;c++)
            {
                prod_l[c] = $(productos[c].parentNode).position().left;//left actual
                prod_t[c] = $(productos[c].parentNode).position().top; //top actual
                prod_w[c] = productos[c].parentNode.clientWidth;
                productos[c].parentNode.style.width = ((prod_w[c]/width_board)*100).toFixed(4) +'%';//prod_w[c] +(prod_w[c]/escala)+'px'
                productos[c].parentNode.style.left =  ((prod_l[c]/width_board)*100).toFixed(4)+'%';//
                productos[c].parentNode.style.top =  ((prod_t[c]/height_board)*100).toFixed(4)+'%';
                console.log(productos[c].parentNode.style.left + ' '+productos[c].parentNode.style.top);
            }
            new_width = ((escala+1)*100)+'%';//nuevo alto
            new_height = ((escala+1)*100)+'%';//nuevo bajo
            //grilla.style.width = new_width;
            //grilla.style.height = new_height;
            tablero.style.width = new_width;//
            tablero.style.height = new_height;
            tablero.setAttribute('data-escala',escala+1);
            act_scale.innerHTML =percents[escala+1];
            var input = document.querySelector('#info-productos');
            save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
        }
        else
        {

        //CAMBIO EN EL TAMAÑO DEL TABLERO

        /*
        width_board = tablero.clientWidth;//ancho actual
        height_board = tablero.clientHeight; //alto actual


        //CAMBIO DE TAMAÑO Y POSICION PRODUCTOS

        for(var c = 0;c<productos.length;c++)
        {

            prod_l[c] = $(productos[c]).position().left;//left actual
            prod_t[c] = $(productos[c]).position().top; //top actual
            prod_w[c] = productos[c].clientWidth;
            productos[c].style.width = ((prod_w[c]/width_board)*100).toFixed(4) +'%';//prod_w[c] +(prod_w[c]/escala)+'px'
            productos[c].style.left =  ((prod_l[c]/width_board)*100).toFixed(4)+'%';//
            productos[c].style.top =  ((prod_t[c]/height_board)*100).toFixed(4)+'%';
            //console.log(prod_l[c] + ' '+prod_t[c]+' '+prod_w[c]);

        }

        new_width = 100+'%';//nuevo alto
            new_height = 100+'%';//nuevo bajo
            tablero.style.width = new_width;//
            tablero.style.height = new_height;
        tablero.setAttribute('data-escala',1);
        escala = 1;
        act_scale.innerHTML =percents[0]; */
        }
        //document.querySelector('#productos-cont-dragdrop').style.height = '2450px';
        //$('#drop-productos0').css('left',$('#drop-productos0').position().left*0.2);
        //console.log($(this).position().left);
        //test.style.width = test.style.width * ;
    });
    $('#zoomless').on('click',function () {
        var reglas = ['',17,17,11.333333,8.5,17,5.666666667,12.14285714];
        var distancia = ['',10,5,5,2,2,2,2];
        var v_reglas = ['',10,10,6.666666667,12.5,10,8.333333333,7.142857143];
        var v_distancia = ['',10,5,5,2,2,2,2];
        //alert(document.querySelectorAll('div[id^=drop-productos]').length);
        //var test = document.querySelector('div[id^=drop-productos]');
        var productos = document.querySelectorAll('div[id^=drop-productos]');
        var tablero = document.querySelector('#productos-cont-dragdrop');
        //var grilla = document.querySelector('#cont-rules');
        var act_scale = document.querySelector('#act-scale');
        var prod_w = [];
        var prod_l = [];
        var prod_t = [];
        //CAMBIO EN EL TAMAÑO DEL TABLERO
        var escala = parseInt(tablero.getAttribute('data-escala'),10);
        if(escala <=1)
        {
            tablero.setAttribute('data-escala',1);
        }
        else
        {
            //CAMBIO DE MEDIDAS REGLA!!
            create_rules(reglas[escala-1],v_reglas[escala-1],escala-1,reglas,v_reglas,distancia,v_distancia);
            var width_board = tablero.clientWidth;//ancho actual
            var height_board = tablero.clientHeight; //alto actual


            //CAMBIO DE TAMAÑO Y POSICION PRODUCTOS

            for(var c = 0;c<productos.length;c++)
            {

                prod_l[c] = $(productos[c].parentNode).position().left;//left actual
                prod_t[c] = $(productos[c].parentNode).position().top; //top actual
                prod_w[c] = productos[c].parentNode.clientWidth;
                productos[c].parentNode.style.width = ((prod_w[c]/width_board)*100).toFixed(4) +'%';//prod_w[c] +(prod_w[c]/escala)+'px'
                productos[c].parentNode.style.left =  ((prod_l[c]/width_board)*100).toFixed(4)+'%';//
                productos[c].parentNode.style.top =  ((prod_t[c]/height_board)*100).toFixed(4)+'%';
                console.log(productos[c].parentNode.style.left + ' '+productos[c].parentNode.style.top);
            }
            var new_width = (((escala-1)*100))+'%';//nuevo alto
            var new_height = ((escala-1)*100)+'%';//nuevo bajo
            tablero.style.width = new_width;//
            tablero.style.height = new_height;
            //grilla.style.width = new_width;//
            //grilla.style.height = new_height;
            tablero.setAttribute('data-escala',escala-1);
            act_scale.innerHTML =percents[escala-1];
            var input = document.querySelector('#info-productos');
            save_board_table('#cont-productos-cont-drag-drop','#productos-cont-compra',input.drop_products,input.filas,input.data);
        }


        //alert(escala);
        //test.style.width = test.style.width * ;
    });

    //ANIMACION AYUDA DE INTERACCION DEL USUARIO CON LA INTERFAZ DE PRODUCTOS
    $('#help-drag').on('click',function (e) {

        var help = document.querySelector('#help-drag');

        if(!help.estado)
        {
            help.estado = 'off';
        }
        else
        {

        }

        if(help.estado === 'off')
        {
            $('#click-help').css('display','block');
            $('#click-help').addClass('click-help-animation');//activamos la animacion del la flecha
            $('#cont-help-text').css('left','26%');
            $('#cont-help-text').css('top','20%');
            $('#desc-help').html(gettext('Click on the categories and then the product types!'));
            $('#cont-help-text').css('width','10%');

            $('#cont-help-text').css('display','flex');

            help.estado = 'on';

            $('#ok-help').on('click',function () {
                $('#click-help').css('display','none');
                $('#click-help').removeClass('click-help-animation');//desactivamos la animacion del la flecha

                $('#cont-help-text').css('left','32%');
                $('#cont-help-text').css('top','55%');
                $('#desc-help').html(gettext('Drag the products to the board, You can rotate them or change their size to your liking.!!!'));
                $('#cont-help-text').css('width','15%');
                $('#cont-help-text').css('display','flex');

                $('#test-help').css('display','block');
                $('#test-help').addClass('test-help-animation');
                $('#ok-help').on('click',function () {
                     $('#test-help').removeClass('test-help-animation');
                     $('#test-help').css('display','none');
                     $('#cont-help-text').css('display','none');
                     help.estado = 'off';
                });
            });
        }
        else
        {
            $('#test-help').removeClass('test-help-animation');
            $('#test-help').css('display','none');
            help.estado = 'off';
            $('#click-help').css('display','none');
            $('#click-help').removeClass('click-help-animation');//desactivamos la animacion del la flecha
            $('#cont-help-text').css('display','none');
        }


    });

   /*document.querySelector('#productos-cont-dragdrop').escala = 0;
        $('#zoom-board').on('click',function () {
            var tablero = document.querySelector('#productos-cont-dragdrop');
            if(tablero.escala<8)
            {

                $('#productos-cont-dragdrop').css('width',(tablero.escala*50+100)+'%');
                $('#productos-cont-dragdrop').css('height',(tablero.escala*50+100)+'%');
                tablero.escala++;
            }
            else
            {
                tablero.escala = 0;
            }

        });*/
    var show_rules;
    $('#cont-productos-cont-drag-drop').on('mouseover',function () {
        clearTimeout(show_rules);
        document.querySelector('#v-rule').style.display = 'block';
        document.querySelector('#h-rule').style.display = 'block';
    });
    $('#cont-productos-cont-drag-drop').on('mouseout',function () {
        show_rules = setTimeout(function () {
            document.querySelector('#v-rule').style.display = 'none';
            document.querySelector('#h-rule').style.display = 'none';
        },2000);
    });
   // $(window).on('mousemove',function(e){console.log(e.clientY)});
};