from django.forms import ModelForm, inlineformset_factory
from .models import Postgallery,Imagegallery
from django import forms
from django.forms.models import inlineformset_factory,modelformset_factory
from django.contrib.auth.forms import UserCreationForm

class PostForm(forms.ModelForm):
    title = forms.CharField(max_length=128)
    body = forms.CharField(max_length=245, label="Item Description.")

    class Meta:
        model = Postgallery
        fields = ('title', 'body', )


class ImageForm(forms.ModelForm):
    image = forms.ImageField(label='Image',required=True)
    class Meta:
        model = Imagegallery
        fields = ('image', )

GalleryFormSet = inlineformset_factory(Postgallery,Imagegallery,
form=ImageForm,extra=1,can_delete=False,min_num=1,validate_min=True,max_num=1)