from .models import Item,Factura
from django import forms
from django.forms.models import inlineformset_factory,formset_factory
class FacturaForm(forms.ModelForm):
    class Meta:
        model = Factura
        fields = ['nombre_factura']
        exclude =['usuario_factura','fecha_factura']

class ItemForm(forms.ModelForm):
    show_price_producto = forms.CharField()
    tamaño_producto = forms.CharField()
    class Meta:
        model = Item
        fields = ['producto_item','cantidad_item']

#ItemFormSet = inlineformset_factory(Factura,Item,
#form=ItemForm,extra=3,max_num=6,can_delete=False)


#ASI DEBEMOS ENVIARLE LOS DATOS A EL FORMSET PARA PODER HACER LA COMPRA
#data = [{'producto_item':9,'cantidad_item':2},{'producto_item':6,'cantidad_item':3}]
# DE ESA MANERA PODEMOS CARGAR EL FORSET ASI
#detalle_compra_form_set = ItemFormSet(initial=data)
#Y LO RENDERIZAMOS Y SALE
#COMO ? EN ESTA PAGINA APARECE http://pythonpiura.org/posts/modificacion-de-datos-con-django-formset/

#detalle_compra_form_set = ItemFormSet(initial=detalles_data)

