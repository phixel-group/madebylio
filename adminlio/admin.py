from django.contrib import admin
from adminlio.models import Troquel,Color,Producto,Base64images,Zona
from login.models import Usuario
# Register your models here
admin.site.register(Troquel)
admin.site.register(Producto)
admin.site.register(Color)
admin.site.register(Zona)
admin.site.register(Base64images)
# Register your models here.
