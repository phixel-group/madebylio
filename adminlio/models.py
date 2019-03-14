from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User

class UsuarioAdmin(User):
    #color = models.CharField(max_length=10)
    class Meta:
        verbose_name = _('usuarioa')
        verbose_name_plural = _('usuariosa')


TIPO_CHOICES = (
    ('YES', "magnetized"),
    ('NO', 'not magnetized'),
)
SUB_CATEGORY_CHOICES = (
    ('', ""),
    ('LET', "Letter"),
    ('THI', 'Things'),
    ('CAR', 'Cars and home'),
    ('FRU', "Fruits"),
    ('PER', 'Persons'),
    ('SHE', 'SHEET'),
    ('PLA', 'Dish'),#plato
    ('SPO', 'Spoon'),#cuchara
    ('FOR', 'Fork'),#tenedor
    ('TEA', 'Teapot'),#tetera
    ('MUG', 'Mugs'),#Mugs
    ('DIA', 'Diadem'),#Diadema
    ('EAR', 'Earring'),#Arete
    ('CLK', 'Clock'),#Reloj
    ('PIC', 'Picture'),#Cuadro
)
CATEGORY_CHOICES = (
    ('', ""),
    ('IMA', "Magnet"),#imanes
    ('CER', 'Pottery'),#ceramica
    ('BIS', 'Catchpenny'),#bisuteria
    ('HOG', "Home"),#Decoracion para el hogar
)
COUNTRY_CHOICES = (
    ('', ""),
    ('USA', "Estados Unidos"),
    ('COL', 'Colombia'),
    ('AUS', 'Australia'),
    ('ESP', "España"),
    ('ITA', "Italia"),
    ('GER', "Alemania"),
)
CITY_CHOICES = (
    ('', ""),
    ('ORL', "Orlando"),
    ('BOG', 'Bogotá'),
    ('MEL', 'Melbourne'),
    ('VAL', "Valencia"),
    ('MIL', 'Milan'),
    ('BER', "Berlin"),
)
PREV_CHOICES = (
    ('', "----"),
    ('ZON', "troquel"),
    ('IMG', "imagen"),
    ('VID', "video"),
)
EDITABLE_CHOICES = (
    ('', "----"),
    ('NO', "No"),
    ('YES', "Si"),
)
PATTERNS = (
    ('', "----"),
    ('pat1', "Círculos"),
    ('pat2', "Rayas"),
)
class Troquel(models.Model):
    nombre_troquel =       models.CharField(max_length=40)
    file_troquel =         models.FileField(upload_to='svg',null=True,blank=True)
    size_troquel =         models.IntegerField()
    tipo_troquel =         models.CharField(max_length=3,choices=TIPO_CHOICES,default='YES')
    categoria_troquel =    models.CharField(max_length=3,choices=CATEGORY_CHOICES,default='none')
    subcategoria_troquel = models.CharField(max_length=3,choices=SUB_CATEGORY_CHOICES,default='none')
    editable_troquel     = models.CharField(max_length=3,choices=EDITABLE_CHOICES,default='')
    def __str__(self):
        return "%s" % self.nombre_troquel

# class color(models.Model):
#     nombre_color = models.CharField(max_length=40)
#     file_color = models.FileField(upload_to='color')
#     def __str__(self):
#         return "%s" % self.nombre_color

class Color(models.Model):
    nombre_color = models.CharField(max_length=40)
    file_color = models.FileField(upload_to='color')

    def __str__(self):
        return "%s" % self.file_color

class Producto(models.Model):
    nombre_producto = models.CharField(max_length=50)
    troquel_producto = models.ForeignKey(Troquel,on_delete = models.CASCADE)
    pais_producto = models.CharField(max_length=3,choices=COUNTRY_CHOICES,default='none')
    ciudad_producto = models.CharField(max_length=3,choices=CITY_CHOICES,default='none')
    precio_producto = models.IntegerField()
    cantidad_producto = models.IntegerField()
    descripcion_producto = models.CharField(max_length=200)
    tamano_producto = models.IntegerField()
    img_producto = models.FileField(upload_to='svg', null=True, blank=True,default='null')
    video_producto = models.FileField(upload_to='svg', null=True, blank=True,default='null')
    prev_producto  = models.CharField(max_length=3,choices=PREV_CHOICES,default='',null=False,blank=False)
    pattern_producto = models.CharField(max_length=4,choices=PATTERNS,default='',null=True,blank=True)

    def __str__(self):
        return "%s" % self.nombre_producto
    #compra_producto = models.ForeignKey(Compra)

class Zona(models.Model):
    nombre_zona = models.CharField(max_length=40)
    color_zona = models.ForeignKey(Color,on_delete = models.CASCADE)
    color_producto = models.ForeignKey(Producto,on_delete = models.CASCADE)
    def __str__(self):
        return "%s" % self.nombre_zona

#class Compra(models.Model):


class Base64images(models.Model):

    #ancho_image = models.IntegerField()
    #alto_image = models.IntegerField()
    archivo_image = models.FileField(upload_to='basesixfor')







