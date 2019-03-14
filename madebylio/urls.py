"""phixeldev URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from base.views import home,showproducts
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.utils.translation import ugettext_lazy as _
from django.views.i18n import javascript_catalog
from django.contrib.staticfiles.urls import static
from adminlio.views import showimagenes,showpost
from login.views import loginajax,userregajax
from base.views import send_mail,findprodforcategory,savebuy,retrieve_data,fillmobileshopcar,validate_username,cleancookies,savecanvasimage,chargecolors,showsameproducts,test_query,hometeste
from adminlio.views import validate_troquel
from django.contrib.auth.views import logout
from django.contrib.auth.views import password_reset,password_reset_done,password_reset_confirm,password_reset_complete

js_info_dict = {
    #domain is default
    'packages': ('base',),
}
urlpatterns = [

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += i18n_patterns(
        url(_(r'^admin/'), admin.site.urls),
        url(_(r'^login/'), include('login.urls', namespace='login')),
        url(_(r'^adminlio/'), include('adminlio.urls', namespace='adminlio')),
        url(_(r'^pagos/'), include('pagos.urls', namespace='pagos')),
        url(_(r'^$'), home,name='home'),
        url(_(r'^teste'), hometeste,name='hometeste'),
        #url(_(r'^oauth/'), include('social_django.urls', namespace='social')),  # <-- social auth
        url(_(r'accounts/'),include('allauth.urls')),
        url(_(r'^cleancookies$'), cleancookies,name='cleancookies'),
        url(_(r'^showsameproducts$'), showsameproducts,name='showsameproducts'),
        url(_(r'chargecolors$'), chargecolors,name='chargecolors'),
        url(_(r'^savecanvas$'), savecanvasimage,name='savecanvas'),
        url(_(r'^savebuy$'), savebuy,name='savebuy'),
        url(_(r'^testquery$'), test_query,name='testquery'),
        url(_(r'^fillmobileshopcar$'), fillmobileshopcar,name='fillmobileshopcar'),
        url(_(r'^pagos/retrieve_data$'), savebuy,name='retrieve_data'),
        url(r'^send-mail$',send_mail , name="send-mail"),       
        url(r'^loginuser$', loginajax, name="loginuser"),
        url(r'^reguser$', userregajax, name="reguser"),
        url(_(r'^showproducts$'), showproducts,name='showproducts'),
        url(_(r'^validateusername$'), validate_username,name='validateusername'),
        url(_(r'^showimagenes$'),showimagenes, name="showimages"),
        url(_(r'^showgalleries$'),showpost, name="showgalleries"),
        url(_(r'^showprodforcategories'),findprodforcategory,name='showprodforcategories'),
        url(_(r'^salir$'), logout, name="salirhome", kwargs={'next_page': 'home'}),
        #url para recuperar contraseña
        url(_(r'^reset/password_reset/$'),password_reset,{'template_name':'registration/password_reset_form.html','email_template_name':'registration/password_reset_email.html'},name='password_reset'),
                url(_(r'^reset/password_reset_done/$'),password_reset_done,{'template_name':'registration/password_reset_done.html'},name='password_reset_done'),
                url(_(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$'),password_reset_confirm, {'template_name':'registration/password_reset_confirm.html'},name='password_reset_confirm'),
                url(_(r'^reset/done/$'),password_reset_complete,{'template_name':'registration/password_reset_complete.html'},name="password_reset_complete"),
        url(r'^i18n/',include('django.conf.urls.i18n')),
        url(r'^jsi18n/$', javascript_catalog, js_info_dict, name='javascript-catalog'),
)
