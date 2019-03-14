(
    function ()
    {
        $('.login-btn').click(function ()
        {
            //alert('Este es el login');
            if($('.login-content').css('display') === 'none')
            {
                $('.cont-log-reg-content').css('display','block');
                $('.reg-content').css('display','none');
                $('.login-content').css('display','block');
            }
            else
            {
                $('.login-content').css('display','none');
                $('.cont-log-reg-content').css('display','none');
            }

        });
        $('.reg-btn').click(function ()
        {
            if($('.reg-content').css('display') === 'none')
            {
                $('.reg-content').css('display','block');
                $('.login-content').css('display','none');
                $('.cont-log-reg-content').css('display','block');
            }
            else
            {
                $('.reg-content').css('display','none');
                $('.cont-log-reg-content').css('display','none');
            }

        });

        $('#show-facebook').on('click',function () {
            $(this).addClass('white-background');
            $('#show-instagram').removeClass('white-background');
            $('#facebook-feed').css('display','block');
            $('#instagram-feed').css('display','none');
        });
        $('#show-instagram').on('click',function () {
            $(this).addClass('white-background');
            $('#show-facebook').removeClass('white-background');
            $('#facebook-feed').css('display','none');
            $('#instagram-feed').css('display','block');
        });
    }
)();