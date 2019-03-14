from django.conf.urls import url
from django.contrib import admin

from sys import path
from django.conf.urls import url,include
from django.contrib import admin
from login.views import LoginAdmin
from adminlio.views import adminhome,savetroquel,findtroqueles,edittroqueles,deletetroqueles,updatetroquel,addcolor,getcolores,CreateGallery,showpost,showimagenes,Listaproductos,getzonesforproduct,EditarProducto,EliminarProducto,repeattroquel,EditGallery,Listagalerias,EliminarGaleria,validate_troquel
from django.conf.urls.i18n import i18n_patterns
from django.utils.translation import ugettext_lazy as _
from django.views.i18n import javascript_catalog
from django.contrib.auth.views import logout


js_info_dict = {
    #domain is default
    'packages': ('adminlio',),
}
urlpatterns = [
    url(r'^$', adminhome.as_view(), name="homeadmin"),
    url(r'^login$', LoginAdmin.as_view(), name="loginadmin"),
    url(r'^savetroquel$',savetroquel , name="savetroquel"),
    url(r'^repeattroquel$',repeattroquel , name="repeattroquel"),
    url(r'^findtroquel$',findtroqueles , name="findtroquel"),
    url(r'^updatetroquel$',updatetroquel , name="updatetroquel"),
    url(r'^creategallery',CreateGallery.as_view() , name="creategallery"),
    url(r'^editgallery/(?P<pk>\d+)$',EditGallery.as_view() , name="editgallery"),
    url(r'^listgallery',Listagalerias , name="listgallery"),
    url(r'^deletegallery/(?P<pk>\d+)$',EliminarGaleria.as_view() , name="deletegallery"),
    url(r'^getcolores$',getcolores, name="getcolores"),
    url(r'^addcolor$',addcolor , name="addcolor"),
    url(r'^edittroqueles/(?P<pk>\d+)$',edittroqueles , name="edittroqueles"),
    url(r'^deletetroqueles/(?P<pk>\d+)$',deletetroqueles , name="deletetroqueles"),
    url(r'^editarproducto/(?P<pk>\d+)$',EditarProducto.as_view(),name="editarproducto"),
    url(r'^elmininarproducto/(?P<pk>\d+)$',EliminarProducto.as_view(),name="eliminarproducto"),

    url(r'^validatetroquel$', validate_troquel, name="validatetroquel"),

    url(r'^listproductos',Listaproductos,name='listproductos'),
    url(r'^zonas$', getzonesforproduct, name="zonas"),
    #url(r'^registro/', AddAdmin.as_view(), name='registroadmin'),
    url(r'^salir$', logout, name="salir", kwargs={'next_page': 'adminlio:loginadmin'})
]