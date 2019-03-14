from django.forms import ModelForm, inlineformset_factory
from django import forms
from django.forms.models import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from .models import UsuarioAdmin,Troquel,Producto,Zona,Color

class AdminUsuarioForm(UserCreationForm):
    class Meta:
        model = UsuarioAdmin # modelo a usar
        #campos a utilizar adicionales los agregamos en fields
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            #'color',
        ]
        labels = {
            'username': 'Nombre de usuario',
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'email': 'Correo',
            #'color':'color',
        }


class TroquelForm(forms.ModelForm):
    class Meta:
        model = Troquel
        fields = ['nombre_troquel','file_troquel','size_troquel','tipo_troquel','categoria_troquel','subcategoria_troquel','editable_troquel']#

class ColorForm(forms.ModelForm):
    class Meta:
        model = Color
        fields = ['nombre_color','file_color']

class ZonaForm(forms.ModelForm):
    class Meta:
        model = Zona
        fields = ['nombre_zona','color_zona']


class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre_producto','troquel_producto','pais_producto', 'ciudad_producto','precio_producto','cantidad_producto','descripcion_producto','tamano_producto','img_producto','video_producto','prev_producto','pattern_producto']


ZonaFormSet = inlineformset_factory(Producto, Zona,
                                            form=ZonaForm, min_num=1,validate_min=True,extra=1,can_delete=False)

ZonaEFormSet = inlineformset_factory(Producto, Zona,
                                            form=ZonaForm, min_num=1,validate_min=True,extra=0,can_delete=False)