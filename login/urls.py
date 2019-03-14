from django.conf.urls import url
from django.contrib import admin

from sys import path
from django.conf.urls import url,include
from django.contrib import admin
from login.views import Loginusuario, AddUsuario
from django.conf.urls.i18n import i18n_patterns
from django.utils.translation import ugettext_lazy as _
from django.views.i18n import javascript_catalog
from django.contrib.auth.views import logout

js_info_dict = {
    #domain is default
    'packages': ('login',),
}
urlpatterns = [
    url(r'^$', Loginusuario.as_view(), name="login"),
    url(r'^registro/', AddUsuario.as_view(), name='registro'),
    url(r'^salir$', logout, name="salir", kwargs={'next_page': 'login:login'})
]