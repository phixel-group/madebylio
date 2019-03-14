from django.shortcuts import render
from .models import Item,Factura
from .forms import ItemForm,FacturaForm#,ItemFormSet
from django.forms.models import inlineformset_factory,formset_factory
from django.views.generic import View,TemplateView, CreateView, UpdateView, FormView,DeleteView, ListView
from adminlio.models import Producto
from django.shortcuts import render, render_to_response,redirect,HttpResponse,HttpResponseRedirect
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect, JsonResponse,HttpResponse
from django.db import transaction
from django.contrib.auth.models import User
from login.models import Usuario
import _pickle as cPickle
import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.template.loader import render_to_string
# Create your views here.
def create_order(request):

    if request.method == 'POST':

        factura = FacturaForm(request.POST)
        if factura.is_valid():
            factura.save()

        itemFormSet = formset_factory(ItemForm)
        item_formset = itemFormSet(request.POST)

        if item_formset.is_valid():
            for algo in item_formset:
                pass#new_orders = []
            #for order_form in item_formset:
            #    new_order = Item(
            #         Factura,
            #    )
            #    new_orders.append(new_order)

            #Item.objects.bulk_create(new_orders)
            item_formset.save()



    if request.method == 'GET':

       factura_form = FacturaForm()

       ItemFormSet = formset_factory(ItemForm, extra=2)
       item_formset = ItemFormSet()

       template_context = {
           'factura_form': factura_form,
           'item_formset': item_formset,
           }

       template = 'pagos/index.html'

       return render(request, template, template_context)


class CrearZona(CreateView):
    success_url = reverse_lazy("pagos:epaycotest")
    model = Factura
    template_name = 'pagos/index.html'
    fields = ['nombre_factura']
    peticion = dict()
    #success_url = reverse_lazy('home')
    def get_context_data(self, **kwargs):
        data = super(CrearZona, self).get_context_data(**kwargs)

        if self.request.POST:
            ItemFormSet = inlineformset_factory(Factura, Item,
                                                form=ItemForm)
            data['crearzona'] = ItemFormSet(self.request.POST)
            self.peticion = self.request.POST
        else:
            datos_compra = self.request.session['datacompra']
            #dataaa = [[9, 1200], [16, 12]]
            compra = [dict(zip(['producto_item','cantidad_item','show_price_producto','tamaño_producto'], alumno)) for alumno in datos_compra]
            ItemFormSet = inlineformset_factory(Factura, Item,
                                                form=ItemForm, extra=len(compra), can_delete=False)
            data['crearzona'] = ItemFormSet(initial=compra)
            data['cookiet'] = len(self.request.session['datacompra'])
            data['usuario'] = self.request.user
            #usuario = self.request.user
            #queryset = Usuario.objects.filter(username__icontains=usuario)
            #self.my_object = get_object_or_404(queryset)
            #data['userinfo'] = self.my_object#enviando mas de un dato al template
        return data

    def form_valid(self, form):
        context = self.get_context_data()

        #form.instance.user = self.request.user #obtenemos el user
        zonas = context['crearzona']
        with transaction.atomic(): #CREAMOS COMUNICACION ASINCRONA CON LA BASE DE DATOS
            #self.object = form.save(commit=False)
            #self.object.usuario_factura = User.objects.get(username=self.request.user)
            #self.object.save()

            if zonas.is_valid(): #VERICAMOS QUE LOS CAMPOS DEL FORMULARIOS para los inline formsets
                zonas.instance = self.object


            #print(crearzonas)
            fake_zonas = zonas.cleaned_data # diccionario con los datos para llenar el formulario
            #print(zonas.cleaned_data)
            for zone in fake_zonas:
                fact_producto = Producto.objects.get(nombre_producto=zone['producto_item'])
                zone['producto_item'] = fact_producto.id #las sessiones no aceptan objetos query por eso le damos directamente el id usando un busqueda en la base datos
                zone['factura_item'] = '' # valor vacio porque tambien es un query object

            #ItemFormSeta = inlineformset_factory(Factura, Item, form=ItemForm, extra=1, can_delete=False)
            #crearzonas = ItemFormSeta(initial=fake_zonas)

            #print(fake_zonas)
                #zonas.save()
                #print(zonas)
            #print(fake_zonas)


            #algo = render_to_string(zonas)

            self.request.session['inline'] = fake_zonas
            #print(self.request.session.get('inline'))
            self.request.session['form'] = form.cleaned_data
            #print(form)

            #ENVIAMOS EL VALOR TOTAL DE LA TRANSACCION
            self.request.session['val_total'] = self.request.POST.get('total-compra')
            self.request.session['cambio'] = self.request.POST.get('input-cambio')
            #print(val_total)

            #print(zonas.cleaned_data[0]['producto_item'])
        #return super(CrearZona, self).form_valid(form)
        return redirect('pagos:epaycotest') # redireccionamos a nuestra app de compras epayco

def returninfoprod(request):
    data = dict()
    if request.method == 'GET':
        if request.is_ajax():
            id_produc  = request.GET.get('id_producto')
            producto = Producto.objects.get(pk=id_produc).precio_producto
            data['producto'] = producto
    return JsonResponse({'datos':data})

def epaycotest(request):
    #ItemFormSet = inlineformset_factory(Factura, Item,
                                        #form=ItemForm, extra=len(request.session['inline']), can_delete=False)
    #form = FacturaForm(request.session['form'])
    #crearzona = ItemFormSet(initial=request.session['inline'])
    total = request.session['val_total']
    cambio = request.session['cambio']
    return render(request, 'pagos/epayco.html',{'total':total,'cambio':cambio})


def epaycoresponse(request):
    form = ''
    crearzona = ''
    ItemFormSet = inlineformset_factory(Factura, Item,
                                        form=ItemForm, extra=len(request.session['inline']), can_delete=False)
    if request.method == 'GET':

        form = FacturaForm(request.session['form'])
        crearzona = ItemFormSet(initial=request.session['inline'])
    else:
        factura = FacturaForm(request.POST)
        items = ItemFormSet(request.POST)
        with transaction.atomic():
            f_instance = factura.save(commit=False)
            f_instance.usuario_factura = User.objects.get(username=request.user)
            f_instance.save()
            if items.is_valid():
                items.instance = f_instance
                items.save()
            #actualizamos stock
            productos = items.cleaned_data

            for zone in productos:
                fact_producto = Producto.objects.get(nombre_producto=zone['producto_item'])
                fact_producto.cantidad_producto = fact_producto.cantidad_producto - zone['cantidad_item']#las sessiones no aceptan objetos query por eso le damos directamente el id usando un busqueda en la base datos
                fact_producto.save()


            form = FacturaForm()
            crearzona = ItemFormSet()

        del request.session['datacompra']  # borramos nuestra session de compra porque ya compramos!
        return render(request, 'pagos/epaycoconfirmation.html', {'form': form, 'crearzona': crearzona})

    return render(request,'pagos/epaycoresponse.html', {'form': form, 'crearzona': crearzona})

def epaycoconfirmacion(request):
    form = ''
    crearzona = ''
    ItemFormSet = inlineformset_factory(Factura, Item,
                                        form=ItemForm, extra=len(request.session['inline']), can_delete=False)
    if request.method == 'GET':


        form = FacturaForm(request.session['form'])
        crearzona = ItemFormSet(initial=request.session['inline'])
    else:
        factura = FacturaForm(request.POST)
        items = ItemFormSet(request.POST)
        with transaction.atomic():
            f_instance = factura.save(commit=False)
            f_instance.usuario_factura = User.objects.get(username=request.user)
            f_instance.save()
            if items.is_valid():
                items.instance = f_instance
                items.save()
            form = FacturaForm()
            crearzona = ItemFormSet()

        del request.session['datacompra']  # borramos nuestra session de compra porque ya compramos!
        return redirect('home')



    return render(request, 'pagos/epaycoconfirmation.html', {'form': form, 'crearzona': crearzona})
