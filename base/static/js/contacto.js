(function () {
    $('#mision').on('click',function () {
        $('#mision-content').css('display','block');
        $('#vision-content').css('display','none');
        $('#quienes-content').css('display','none');
        $('#faqs-content').css('display','none');
    });
    $('#vision').on('click',function () {
        $('#vision-content').css('display','block');
        $('#mision-content').css('display','none');
        $('#quienes-content').css('display','none');
        $('#faqs-content').css('display','none');
    });
    $('#quienes').on('click',function () {
        $('#mision-content').css('display','none');
        $('#vision-content').css('display','none');
        $('#quienes-content').css('display','block');
        $('#faqs-content').css('display','none');
    });
    $('#faqs').on('click',function () {
        $('#mision-content').css('display','none');
        $('#vision-content').css('display','none');
        $('#quienes-content').css('display','none');
        $('#faqs-content').css('display','block');
    });
    $('#faqs').trigger('click');
    $('#send-emailform').on('submit',function (e) {
        e.preventDefault();

       $.ajax({
                 url:  'send-mail', //  guardar/ the endpoint,commonly same url
                 type: 'POST', //parece que no es necesario
                 data: $(this).serialize(), // csrfmiddlewaretoken : csrftoken  data sent with the post request
                 cache: false,
                 //processData: false, // csrfmiddlewaretoken : csrftoken
                 dataType: 'json',
                 // handle a successful response
                 success: function (data) {
                    alert(data.productos);
                     //document.querySelector('#formtroquel').reset();
                 },
                 // handle a non-successful response
                 error: function (xhr, errmsg, err) {
                     alert(errmsg);
                 }
             });
    });
})();