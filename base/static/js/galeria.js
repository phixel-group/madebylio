( function () {
    function creategallery()
    {
        $.ajax({
           url : 'showgalleries',
           type: 'GET',
           data : {},
                dataType: 'json',

           success : function(json) {

               var div_galeria = []; // contenedor imagen
               var title_galeria = []; // titulo galeria
               var div_pack_galeria = []; //contenedor imagen y titulo
               var div_mask_galeria = []; //mascara para eventos click y over
               var obj_galeria = [];

               var cont_galeria = document.querySelector('#cont-gallery');
               for (var c = 0; c < json.post.length; c++) {
                   div_galeria[c] = document.createElement('div');
                   //title_galeria[c] = document.createElement('div');
                   div_pack_galeria[c] = document.createElement('div');
                   div_mask_galeria[c] = document.createElement('div');
                   obj_galeria[c] = document.createElement('object');
                   $(obj_galeria[c]).attr('data','/static/img/svg/galeria/marcogaleria.svg');
                   $(obj_galeria[c]).css('width','100%');
                   $(obj_galeria[c]).css('height','auto');
	               $(obj_galeria[c]).attr('type','image/svg+xml');
                   $(div_mask_galeria[c]).css('width','100%');
                   $(div_mask_galeria[c]).css('height','100%');
                   $(div_mask_galeria[c]).css('position','absolute');
                   $(div_mask_galeria[c]).css('top','0');
                   $(div_pack_galeria[c]).addClass('gallery-item');
                   $(div_galeria[c]).addClass('image-gallery');
                   //$(title_galeria[c]).addClass('title-galleria');
                   //$(div_galeria[c]).css('background','url(/media/'+ json.imagenes[c][0].image+')');
                   //$(div_galeria[c]).css('background-size','100% 100%');
                   //$(title_galeria[c]).html('Galería'+(c+1));
                   div_galeria[c].appendChild(obj_galeria[c]);
                   div_pack_galeria[c].appendChild(div_galeria[c]);
                   //div_pack_galeria[c].appendChild(title_galeria[c]);
                   div_pack_galeria[c].appendChild(div_mask_galeria[c]);
                   cont_galeria.appendChild(div_pack_galeria[c]);

                   (function (x) {

                       $(obj_galeria[x]).on('load',function ()
                       {
                            var svv = obj_galeria[x].contentDocument;
                            var sss = svv.querySelector("image");
                            $(sss).attr('xlink:href','/media/'+ json.imagenes[x][0].image);
                            //$(sss).attr('xlink:href','/static/img/peregrinos.jpg');
                       });
                       $(div_mask_galeria[c]).on('click',function () {
                           $('#cont-shadow-gallery').css('display','block');
                           $('#cont-show-gallery-img').css('display','block');
                           $('#left-img-gal').css('display','block');
                           $('#right-img-gal').css('display','block');
                           $('#exit-gallery').css('display','block');
                           if (document.querySelector('.cont-slider'))
                             {
                                 $('.cont-slider').remove(); //limpiamos el slider
                             }
                             else
                             {

                             }
                           //alert('asasd');
                           gallery_slider.create_cont();//CREAMOS CONTENEDOR DEL SLIDER
                            gallery_slider.chargeobjects(json.imagenes[x],60,1,'float-img-gallery'); //CARGAMOS LOS CONTENEDORES PARA CADA IMAGEN DEL SLIDER
                   var img_sliders = gallery_slider.dump_pure_object('/media/',json.imagenes[x]);
                       });
                       $(div_mask_galeria[c]).on('mouseover',function () {
                           //$(title_galeria[x]).css('top',65 + '%');
                       });
                       $(div_mask_galeria[c]).on('mouseleave',function () {
                           //$(title_galeria[x]).css('top',100 + '%');
                       });
                   })(c);
               }


           }
           ,

            error : function(xhr,errmsg,err)
            {
                alert('error');
            }
        });

    }

    var gallery_slider = new slider('#cont-show-gallery-img');
    creategallery();
    $('#exit-gallery').on('click',function ()
    {
                        $('#cont-shadow-gallery').css('display','none');
                        $('#cont-show-gallery-img').css('display','none');
                        $('#left-img-gal').css('display','none');
                        $('#right-img-gal').css('display','none');
                        $('#exit-gallery').css('display','none');
                        gallery_slider.posslider = -1;
                         gallery_slider.moveleft();
    });
    //menu de navegacion slider der
    $('#right-img-gal').on('click',function () {
       gallery_slider.moveright();
    });
    //menu de navegacion slider der
    $('#left-img-gal').on('click',function () {
        gallery_slider.moveleft();
    });

   /* $('#galeria-cont-post1,#galeria-cont-post2,#galeria-cont-post3,#galeria-cont-post4').on('click',function ()
    {
        $.ajax({
           url : 'showimagenes',
           type: 'GET',
           data : {'id_gallery':7},
                dataType: 'json',

           success : function(json)
           {
               //alert(json.imagenes[0]['image']);
               $('#cont-shadow-gallery').css('display','block');
               $('#cont-show-gallery-img').css('display','block');
               $('#left-img-gal').css('display','block');
               $('#right-img-gal').css('display','block');
               $('#exit-gallery').css('display','block');
                gallery_slider.create_cont();//CREAMOS CONTENEDOR DEL SLIDER
                gallery_slider.chargeobjects(json.imagenes,60,1); //CARGAMOS LOS CONTENEDORES PARA CADA IMAGEN DEL SLIDER
               var img_sliders = gallery_slider.dump_pure_object('/media/',json.imagenes);
           },

            error : function(xhr,errmsg,err)
            {
                alert('error');
            }
        });
    });*/

})();