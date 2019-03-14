from django.conf.urls import url
from django.contrib import admin

from sys import path
from django.conf.urls import url,include
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns
from django.utils.translation import ugettext_lazy as _
from django.views.i18n import javascript_catalog
from django.contrib.auth.views import logout
from .views import create_order,CrearZona,returninfoprod,epaycotest,epaycoresponse,epaycoconfirmacion
js_info_dict = {
    #domain is default
    'packages': ('pagos',),
}
urlpatterns = [
    url(r'^$', CrearZona.as_view(), name="compra"),
    url(r'^epaycotest',epaycotest,name="epaycotest"),
    url(r'^epaycoresponse',epaycoresponse,name='response'),
    url(r'^epaycoconfirmacion',epaycoconfirmacion,name='confirmation'),
    url(r'^returninfoprod', returninfoprod, name="returninfoprod"),
]