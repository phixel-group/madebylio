from django.forms import ModelForm, inlineformset_factory
from django import forms
from django.forms.models import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario

class UsuarioForm(UserCreationForm):
    class Meta:
        model = Usuario # modelo a usar
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
