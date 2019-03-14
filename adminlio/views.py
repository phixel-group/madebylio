from django.shortcuts import render
from django.contrib.auth.decorators import login_required, permission_required
from django.utils.decorators import method_decorator
from django.http import HttpResponseRedirect, JsonResponse,HttpResponse
from django.views.generic import CreateView, TemplateView,View, DetailView,ListView,UpdateView,DeleteView
from django.core.urlresolvers import reverse_lazy
from login.views import LoginAdmin
from adminlio.forms import TroquelForm,ZonaFormSet,ProductoForm,ColorForm,ZonaEFormSet
from adminlio.models import Troquel,UsuarioAdmin,Producto,Color,Zona
from galeria.models import Postgallery
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.shortcuts import redirect
from django.db import transaction
from galeria.models import Postgallery,Imagegallery
from django.forms.models import inlineformset_factory,modelformset_factory
from galeria.forms import ImageForm,PostForm,GalleryFormSet
from django.contrib import messages
import json


decorators = [permission_required('adminlio.add_usuarioaw')]

class adminhome(CreateView):

    success_url = reverse_lazy("adminlio:homeadmin")
    model = Producto
    template_name = "adminlio/index.html"
    fields = ['nombre_producto', 'troquel_producto', 'pais_producto', 'ciudad_producto', 'precio_producto', 'cantidad_producto','descripcion_producto','tamano_producto','img_producto','video_producto','prev_producto','pattern_producto']

    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated() and request.user.is_superuser:
            return super(adminhome, self).dispatch(request, *args, **kwargs)
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))

    def get_context_data(self, **kwargs):
        data = super(adminhome, self).get_context_data(**kwargs)
        if self.request.POST:
            data['crearzona'] = ZonaFormSet(self.request.POST)
        else:
            form_troquel = TroquelForm()
            data['choices_type'] = form_troquel
            data['crearzona'] = ZonaFormSet()
            usuario = self.request.user
            queryset = UsuarioAdmin.objects.filter(username__icontains=usuario)
            self.my_object = get_object_or_404(queryset)
            data['userinfo'] = self.my_object  # enviando mas de un dato al template
            #data['crearzona'] = ZonaFormSet()
            #usuario = self.request.user
            #queryset = Usuario.objects.filter(username__icontains=usuario)
            #self.my_object = get_object_or_404(queryset)
            #data['userinfo'] = self.my_object  # enviando mas de un dato al template
        return data
    def form_valid(self, form):
        context = self.get_context_data()
        #form.instance.user = self.request.user #obtenemos el user
        zonas = context['crearzona']
        with transaction.atomic(): #CREAMOS COMUNICACION ASINCRONA CON LA BASE DE DATOS
            self.object = form.save()

            if zonas.is_valid(): #VERICAMOS QUE LOS CAMPOS DEL FORMULARIOS
                zonas.instance = self.object
                zonas.save()
        return super(adminhome, self).form_valid(form)

class EditarProducto(UpdateView):
    success_url = reverse_lazy("adminlio:listproductos")
    model = Producto
    template_name = "adminlio/editar_producto.html"
    fields = ['nombre_producto', 'troquel_producto', 'pais_producto', 'ciudad_producto', 'precio_producto','cantidad_producto', 'descripcion_producto','tamano_producto','img_producto','video_producto','prev_producto','pattern_producto']

    def get_context_data(self, **kwargs):  # CREAMOS EL CONTEXTO PARA NUESTRA PAGINA
        data = super(EditarProducto, self).get_context_data(**kwargs)

        if self.request.POST:
            data['crearzona'] = ZonaEFormSet(self.request.POST, instance=self.object)
        else:
            data['crearzona'] = ZonaEFormSet(instance=self.object)
            data['odo'] = Producto.objects.filter(nombre_producto=self.object).values('troquel_producto__file_troquel')[0]

        return data

    def form_valid(self, form):
        context = self.get_context_data()
        editarzona = context['crearzona']
        with transaction.atomic():
            self.object = form.save()
            if editarzona.is_valid():
                editarzona.instance = self.object
                editarzona.save()
        return super(EditarProducto, self).form_valid(form)

    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated() and request.user.is_superuser:
            return super(EditarProducto, self).dispatch(request, *args, **kwargs)
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))


class EliminarProducto(DeleteView):
    model = Producto
    template_name = 'adminlio/eliminar_producto.html'
    success_url = reverse_lazy('adminlio:listproductos')


    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated() and request.user.is_superuser:
            return super(EliminarProducto, self).dispatch(request, *args, **kwargs)
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))

#VISTA AJAX PARA GUARDAR TROQUELES
def savetroquel(request):
    data = dict()
    instancia = TroquelForm(request.POST, request.FILES)
    if instancia.is_valid() and request.method == 'POST' and request.FILES:
        guardado = instancia.save()
    else:
        TroquelForm()
        data['error'] = 'no guardo'
    return JsonResponse(data)

def repeattroquel(request):
    data = dict()
    troquel = request.GET.get('troquel')
    instancia = Troquel.objects.filter(file_troquel__exact=troquel).values('file_troquel')
    return JsonResponse({'resultado':list(instancia)})

def findtroqueles(request):
    troquel = dict()
    if request.method == 'GET':
        if request.is_ajax():
            nombre = request.GET.get('nombre')
            size = request.GET.get('size')
            category = request.GET.get('category')
            troquel = Troquel.objects.filter(Q(categoria_troquel__contains=category)& Q(nombre_troquel__contains=nombre)).values('id','nombre_troquel','file_troquel')
            #troquel = Troquel.objects.all().values('nombre_troquel')
    return JsonResponse({'devuelto':list(troquel)})  # , HttpResponse(guardado.file.name)
    #User.objects.filter(
    #    Q(first_name__startswith='R') & ~Q(last_name__startswith='Z')
    #)

def edittroqueles(request,pk):
    edittroquel = ''
    data = dict()
    write = 'asdasd'
    primary = request.GET.get('id')
    troquel = get_object_or_404(Troquel, id=pk)
    #troquel = get_object_or_404(Troquel, pk=pk)
    #resultado = ''
    if request.method == 'POST':
        edittroquel = TroquelForm(request.POST, request.FILES, instance=troquel)
        if edittroquel.is_valid():
            edittroquel.save()
            resultado = 'guardado exitosamente'
            #data['respuesta'] = resultado
            data['html_content'] = render_to_string('plantillas_html/successtroqueledit.html', {'tformedit': resultado },request=request)
            return redirect('adminlio:homeadmin')

    else:
        resultado = 'editando'
        data['respuesta'] = resultado
        edittroquel = TroquelForm(instance=troquel)
        data['html_content'] = render_to_string('plantillas_html/edittroquelform.html', {'tformedit': edittroquel,'valueid':primary},request=request)
        return JsonResponse(data)

def deletetroqueles(request,pk):
    data = dict()
    write = 'asdasd'
    primary = request.GET.get('id')
    troquel = get_object_or_404(Troquel, id=pk)
    # troquel = get_object_or_404(Troquel, pk=pk)
    # resultado = ''
    if request.method == 'POST':
        #deletetroquel = TroquelForm(request.POST, request.FILES, instance=troquel)
        troquel.delete()
        resultado = 'guardado exitosamente'
        # data['respuesta'] = resultado
        data['html_content'] = render_to_string('plantillas_html/successtroqueledit.html', {'tformedit': resultado},request=request)
        return redirect('adminlio:homeadmin')

    else:
        #deletetroquel = TroquelForm(instance=troquel)
        data['html_content'] = render_to_string('plantillas_html/deletetroquelform.html',
                                                {'valueid': primary}, request=request)
        return JsonResponse(data)

def updatetroquel(request): #vista que me actualiza troqueles dentrod el formulario de productos Y ADEMAS DE UNA VEZ CARGAMOS LA INFORMACION DE TROQUEL SELECCIONADO PARA CREAR EL PRODUCTO
    primary = request.GET.get('id')
    troquel = Troquel.objects.filter(id=primary).values('file_troquel','editable_troquel')
    alltroquel = Troquel.objects.all().values('id', 'nombre_troquel', 'file_troquel','editable_troquel')
    # img = {'dato':dato}
    return JsonResponse({'data_troquel': list(alltroquel),'troquel':list(troquel)})

    # VISTA AJAX PARA GUARDAR TROQUELES
def addcolor(request):
    data = dict()
    instancia = ColorForm(request.POST, request.FILES)
    if instancia.is_valid() and request.method == 'POST' and request.FILES:

        guardado = instancia.save()
        data['color_form'] = 'guardado exitosamente'
    else:
        ColorForm()
        data['color_form'] = 'guardado exitosamente'

    return JsonResponse(data)

def getcolores(request):
    if request.method == 'GET':
        if request.is_ajax():
            data = Color.objects.all().values('id', 'nombre_color', 'file_color')
            # response = serializers.serialize("json", data)
            return JsonResponse({'daticos': list(data)})
#s.filter(booking_id__contains='25DgW').first()
#blog.objects.get(name__iexact="beatles blog")
#Entry.objects.all()[:5]

#q = q.filter(pub_date__lte=datetime.date.today())
#>>> q = q.exclude(body_text__icontains="food")



#VISTAS PARA CREACION DE GALERIAS



class CreateGallery(CreateView):
    form_class = PostForm
    template_name = 'galeria/galeria.html'

    def get_context_data(self, **kwargs):
        data = super(CreateGallery, self).get_context_data(**kwargs)
        if self.request.POST:
            data['creategaleria'] = GalleryFormSet(self.request.POST,self.request.FILES)
        else:
            data['creategaleria'] = GalleryFormSet()
        return data

    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated() and request.user.is_superuser:
            return super(CreateGallery, self).dispatch(request, *args, **kwargs)
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))

    def form_valid(self, form):
        context = self.get_context_data()
        creategaleria = context['creategaleria']
        with transaction.atomic():
        #form.instance.created_by = self.request.user
        #form.instance.updated_by = self.request.user
            algo = ''

        if creategaleria.is_valid():
            self.object = form.save()
            creategaleria.instance = self.object
            creategaleria.save()
            #print
            print('lolololo')
            return super(CreateGallery, self).form_valid(form)
        else:
            return super(CreateGallery, self).form_invalid(form)


    def get_success_url(self):
        return reverse_lazy("adminlio:creategallery")

class EditGallery(UpdateView):
    model = Postgallery
    form_class = PostForm
    template_name = 'galeria/edit_galeria.html'

    def get_context_data(self, **kwargs):
        data = super(EditGallery, self).get_context_data(**kwargs)
        if self.request.POST:
            data['editgaleria'] = GalleryFormSet(self.request.POST,self.request.FILES, instance = self.object)
        else:
            data['editgaleria'] = GalleryFormSet(instance = self.object)
        return data

    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated() and request.user.is_superuser:
            return super(EditGallery, self).dispatch(request, *args, **kwargs)
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))

    def form_valid(self, form):
        context = self.get_context_data()
        editgaleria = context['editgaleria']
        with transaction.atomic():
        #form.instance.created_by = self.request.user
        #form.instance.updated_by = self.request.user
            algo = ''

        if editgaleria.is_valid():
            self.object = form.save()
            editgaleria.instance = self.object
            editgaleria.save()
            #print
            print('lolololo')
            return super(EditGallery, self).form_valid(form)
        else:
            return super(EditGallery, self).form_invalid(form)


    def get_success_url(self):
        return reverse_lazy("adminlio:listgallery")


class EliminarGaleria(DeleteView):
    model = Postgallery
    template_name = 'galeria/eliminar_galeria.html'
    success_url = reverse_lazy('adminlio:listgallery')


    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated() and request.user.is_superuser:
            return super(EliminarGaleria, self).dispatch(request, *args, **kwargs)
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))



def showpost(request): #obtencion de troqueles mediante transaccion ajax
    if request.method == 'GET':
        images = []
        if request.is_ajax():
            post   =  Postgallery.objects.all().distinct().values('id','title')
            for pos in range(len(post)):
                images.append(list(Imagegallery.objects.filter(post__id=post[pos]['id']).values('id','image')))
            #response = serializers.serialize("json", data)
            return JsonResponse({'post':list(post),'imagenes':list(images)})

def showimagenes(request): #obtencion de troqueles mediante transaccion ajax
    if request.method == 'GET':
        images = []
        if request.is_ajax():
            post   =  Postgallery.objects.all().distinct().values('id','title')
            getgallery = request.GET.get('id_gallery')
            imagenes = Imagegallery.objects.filter(post__id=getgallery).values('image')
            #response = serializers.serialize("json", data)
            return JsonResponse({'imagenes':list(imagenes),'elid':getgallery})


#VISTAS PARA VER Y EDITAR PRUDCTOS TROQUELES COLORES ETOC

#LISTA DE PRODUCTOS
def Listaproductos(request):

    # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
    if request.user.is_authenticated() and request.user.is_superuser:
        data = Producto.objects.all().values('id', 'nombre_producto', 'precio_producto',
                                             'troquel_producto__nombre_troquel','pais_producto', 'ciudad_producto',
                                             'precio_producto', 'cantidad_producto','troquel_producto__file_troquel')
        return render(request, 'adminlio/listproductos.html', context={'productos': data})
    # Sino lo está entonces nos muestra la plantilla del login simplemente
    else:
        return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))




def getzonesforproduct(request): #esta vista devuelve un json con los datos de las zonas para el listiview de productos
    if request.method == 'GET':
        data = dict()
        zonas = []
        datazone = Producto.objects.all().values('id').distinct()
        for pos in range(len(datazone)):
            zonas.append(list(
                Zona.objects.filter(color_producto__id=datazone[pos]['id']).values('color_zona', 'nombre_zona','color_zona__file_color')))
        #data['zonas'] = 'algo'
        return JsonResponse({'zone':list(zonas)})



#VISTAS PARA LA EDICCION Y LISTA DE GALERIAS

#LISTA DE PRODUCTOS
def Listagalerias(request):

    # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
    if request.user.is_authenticated() and request.user.is_superuser:
        data = Postgallery.objects.all().values('id','title','body')
        return render(request, 'galeria/listgalerias.html', context={'galerias': data})
    # Sino lo está entonces nos muestra la plantilla del login simplemente
    else:
        return HttpResponseRedirect(reverse_lazy('adminlio:loginadmin'))


 #PREVENIR QUE SE REPITAN LOS NOMBRE DE TROQUEL Y PRODUCTO
def validate_troquel(request):
    troquel = request.GET.get('troquel', None) # con esta linea podemos tomar los datos de data de nuestro script ajax y los podemos usar en django y si el caso, devolvemos una respuesta si asi se requiere
    data = {}
    if request.is_ajax():

        data = {
            'is_taken': Troquel.objects.filter(nombre_troquel__iexact=troquel).exists(),
            'datos': 'resultado'
        }
    return JsonResponse(data)



