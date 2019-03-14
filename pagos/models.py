from django.db import models
from adminlio.models import Producto
from login.models import Usuario
from django.contrib.auth.models import User
# Create your models here.
class Factura(models.Model): #sera en si el compilado de una compra con uno o varios productos
    usuario_factura = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre_factura = models.CharField(max_length=40)
    fecha_factura = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return "%s" % self.nombre_factura

class Item(models.Model):
    producto_item = models.ForeignKey(Producto,on_delete = models.CASCADE)
    factura_item = models.ForeignKey(Factura,on_delete = models.CASCADE)
    cantidad_item = models.IntegerField()
