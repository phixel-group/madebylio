from django.shortcuts import render
from adminlio.models import Producto,Zona,Troquel,Base64images,Color
from login.models import Usuario
from django.http import HttpResponseRedirect, JsonResponse,HttpResponse
from django.template.loader import render_to_string
from django.shortcuts import redirect
from django.core.mail import EmailMessage
from django.db.models import Subquery
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialAccount

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

import json
import base64

from django.core.files.base import ContentFile


def cleancookies(request):
    longitud = 0
    if 'datacompra' in request.session:
        longitud = request.session['datacompra']
        del request.session['datacompra']
        estado = 'esta la cookie'
    else:
        estado = 'no esta la cookie'
        longitud = []
    return JsonResponse({'cookies':len(longitud),'estado':estado})
def home(request):
    #data = 0
    if 'datacompra' in request.session:
        data = request.session['datacompra']
        longitud = len(data)
    else:
        longitud = 0

    try:
        go = User.objects.get(id=request.user.id).first_name
    except ObjectDoesNotExist:
        go = None

        #request.session['shopcarnumber'] = 0
    return render(request,'base/base.html',{'user':request.user,'shopitem':longitud,'transfer':go})
def hometeste(request):
    #data = 0
    if 'datacompra' in request.session:
        data = request.session['datacompra']
        longitud = len(data)
    else:
        longitud = 0

    try:
        go = User.objects.get(id=request.user.id).first_name
    except ObjectDoesNotExist:
        go = None

        #request.session['shopcarnumber'] = 0
    return render(request,'base/test_base.html',{'user':request.user,'shopitem':longitud,'transfer':go})

# Create your views here.
def showproducts(request):
    zonas = []
    if request.method == 'GET':
        if request.is_ajax():
            data = Producto.objects.all().values('id','nombre_producto','precio_producto', 'troquel_producto__file_troquel')
            datazone = Producto.objects.all().values('id').distinct()
            for pos in range(len(data)):
                zonas.append(list(
                    Zona.objects.filter(color_producto__id=datazone[pos]['id']).values('color_zona', 'nombre_zona',
                                                                                       'color_zona__file_color')))
            # response = serializers.serialize("json", data)
            return JsonResponse({'productos': list(data),'datazones': list(zonas)})


def send_mail(request):
    name = request.POST['name_email']
    email = request.POST['email_addr']
    message = request.POST['email_msg']
    body = render_to_string(
        'plantillas_html/email_content.html',{
        'name':name,
        'email': email,
        'message': message,
        },
    )
    email_message = EmailMessage(
        subject= 'Mensaje de usuario',
        body = body,
        from_email=email,
        to=['eng@phixelgroup.com'],
    )
    email_message.content_subtype = 'html'
    email_message.send()
    return JsonResponse({'productos': message})


def findprodforcategory(request): #vista que me actualiza troqueles dentrod el formulario de productos Y ADEMAS DE UNA VEZ CARGAMOS LA INFORMACION DE TROQUEL SELECCIONADO PARA CREAR EL PRODUCTO
    zonas = []
    #unique_productos = [] # productos [:5]
    unique_productos = []
    unique_datazones = []
    primary = request.GET.get('category')
    troquel = Troquel.objects.filter(subcategoria_troquel=primary).values('id')

    #for one_troquel in troquel:


        #producto = Producto.objects.filter(troquel_producto__in = Subquery(one_troquel)).first().values('id','nombre_producto','precio_producto','troquel_producto__file_troquel','descripcion_producto')
        #unique_productos.append(producto)
        #datazones = Producto.objects.filter(troquel_producto__in=Subquery(one_troquel)).first().values('id').distinct()
        #unique_datazones.append(datazones)
    #producto = Producto.objects.filter(troquel_producto__in = Subquery(troquel)).values('id','nombre_producto','precio_producto','troquel_producto__file_troquel','descripcion_producto')

    #datazones = Producto.objects.filter(troquel_producto__in = Subquery(troquel)).values('id').distinct()


    #for pos in range(len(producto)):
    #    zonas.append(list(
    #        Zona.objects.filter(color_producto__id=datazones[pos]['id']).values('color_zona','nombre_zona',                                                                  'color_zona__file_color')))
    for pos in range(len(unique_productos)):
        zonas.append(list(Zona.objects.filter(color_producto__id=unique_productos[pos]['id']).values('color_zona','nombre_zona',                                                                  'color_zona__file_color')))
    # img = {'dato':dato}
    return JsonResponse({'productos': list(unique_productos),'datazones':list(zonas)})

def test_query(request):

    zonas = []

    # unique_productos = [] # productos [:5]
    unique_productos = []
    unique_datazones = []
    product = []
    product_id = [] # guarda los id de los productos
    primary = request.GET.get('category')
    pais = request.GET.get('pais')
    #troquel = Troquel.objects.filter(subcategoria_troquel=primary)
    #troquel = Troquel.objects.values('id','nombre_troquel').filter(subcategoria_troquel=primary).first() # primer elemento pero lo devuelve en forma de dict {id:1,etc}
    troquel = Troquel.objects.values('id','nombre_troquel','editable_troquel').filter(subcategoria_troquel=primary)
    for n_troquel in troquel:
        #FILTRAMOS LOS PRODUCTOS QUE PERTENEZCAN A UN TROQUEL CON ESA SUBCATEGORIA Y PAIS

        #buffer = Producto.objects.filter(Q(troquel_producto=n_troquel['id']))[:1]

        buffer = Producto.objects.filter(Q(pais_producto=pais)& Q(troquel_producto=n_troquel['id']))[:1] #obtenemos el primer producto que coincida con el troquel y el pais

        #LIST NOS CONVVIERTE DE TYPO QUERYSET A TIPO LISTA con dict cuando usamos asi query list(query.values)
        if buffer.exists():
            product.append(list(buffer.values('id', 'nombre_producto', 'precio_producto','troquel_producto__editable_troquel','troquel_producto__file_troquel','descripcion_producto','cantidad_producto','tamano_producto','img_producto','video_producto','prev_producto','pattern_producto')))
              #obtenemos los id de los productos [id1,id2] tal vez no tenga necesidad de usar for usando product_id.append(buffer.id)
            for buff in buffer:
                product_id.append(buff.id)



            #extraemos las zonas a partir de los id de productos obtenidos
    for pos in range(len(product_id)):
        zonas.append(list(Zona.objects.filter(color_producto__id=product_id[pos]).values('color_zona', 'nombre_zona','color_zona__file_color')))

    #for pos in range(len(troquel)):
    #producto = Producto.objects.all()[:1].get()
    #producto = Producto.objects.filter(troquel_producto__in=Subquery(troquel)).values('id','nombre_producto','precio_producto','troquel_producto__file_troquel','descripcion_producto')
    #unique_productos.append(producto)
    #troquel_test = troquel[0]
    return JsonResponse({'troqueles':list(troquel),'productos':list(product),'datazones':list(zonas)})

#VISTA AJAX QUE DEVUELVE LOS PRODUCTOS QUE PERTENECEN A UN TROQUEL EN ESPECÍFICO
def showsameproducts(request):

    zonas = [] #matriz que guarda las zonas para cada producto
    troquel = request.GET.get('troquel')
    pais = request.GET.get('pais')
    query_troquel = Troquel.objects.filter(file_troquel=troquel).values('id')
    #Q(pais_producto=pais) & Q(troquel_producto=query_troquel[0]['id'])
    #el siguiente filtro nos devuelve todos lo productos que tienen el troquel
    #producto = Producto.objects.filter(troquel_producto__in=Subquery(query_troquel)).values('id','nombre_producto','precio_producto','troquel_producto__file_troquel','descripcion_producto')

    # el siguientee filro de vuelve los productos con el troquel y que pertenezcan a ese pais
    producto = Producto.objects.filter(Q(pais_producto=pais) & Q(troquel_producto=query_troquel[0]['id'])).values('id','nombre_producto','precio_producto','troquel_producto__editable_troquel','troquel_producto__file_troquel','descripcion_producto','cantidad_producto','tamano_producto','img_producto','video_producto','prev_producto','pattern_producto')

    datazones = Producto.objects.filter(Q(pais_producto=pais) & Q(troquel_producto=query_troquel[0]['id'])).values('id').distinct()
    for pos in range(len(producto)):
        zonas.append(list(
            Zona.objects.filter(color_producto__id=datazones[pos]['id']).values('color_zona', 'nombre_zona',                                                                            'color_zona__file_color')))
    return JsonResponse({'productos':list(producto),'datazones':list(zonas)})


def savebuy(request):
    data = dict()
    #instancia = TroquelForm(request.POST, request.FILES)
    #if instancia.is_valid() and request.method == 'POST' and request.FILES:
    #datos_compra = [{'producto_item': 9, 'cantidad_item': 2}, {'producto_item': 6, 'cantidad_item': 3}]
    if request.method == 'GET':
        testid = request.GET.getlist('datos[]')
        data['request'] = testid
        data['onloadse']  = json.loads(testid[0])
        #[dict(zip(['producto_item', 'cantidad_item'], alumno))
        #  for alumno in datos_compra]
        request.session['datacompra'] = json.loads(testid[0])
        #request.session.save()
        #request.session['catch_id'] = test_id
        #data['test_id'] = test_id
    return JsonResponse({'datos':data})
def matrix_compare(m1,m2):
    for a, b in zip(m1,m2):
        if(a!=b):
            return False
    return True

def fillmobileshopcar(request):
    data = dict()
    cont_session = [] #variable que contendra nuestra session con el objetivo se saber el tamaño correcto
    #instancia = TroquelForm(request.POST, request.FILES)
    #if instancia.is_valid() and request.method == 'POST' and request.FILES:
    #datos_compra = [{'producto_item': 9, 'cantidad_item': 2}, {'producto_item': 6, 'cantidad_item': 3}]
    data['shopitems'] = 0
    if request.method == 'GET':
        testid = request.GET.getlist('datos[]')
        #testid.append(list(['as','asd','asd']))
        data['request'] = testid
        data['onloadse']  = len(json.loads(testid[0]))

        #del request.session['datacompra']
        #del request.session['shopcarnumber']
        if 'datacompra' in request.session:
            cont_session = request.session['datacompra']
            contador = 0
            p_existe = True  # bool para saber si el producto ya existe en el carrito
            for busqueda in cont_session:
                if busqueda[0] == json.loads(testid[0])[0]:

                    cont_session[contador][1] = int(cont_session[contador][1]) + int(json.loads(testid[0])[1])
                    data['resultado'] = cont_session
                    p_existe = True
                    break
                else:

                    p_existe = False
                    # data['resultado'] = busqueda[0]

                contador = contador + 1
                print(busqueda)

            if p_existe == False:
                cont_session.append(json.loads(testid[0]))
                #request.session['shopcarnumber'] = request.session['shopcarnumber'] + 1
                # data['resultado'] = request.session['datacompra']

            request.session['datacompra'] = cont_session


        else:
            cont_session.append(json.loads(testid[0]))
            request.session['datacompra'] = cont_session
            data['resultado'] = 'no existia'
            #request.session['shopcarnumber'] = 1

        data['shopitems'] = len(request.session['datacompra'])



    return JsonResponse({'datos':data})


def retrieve_data(request): #vista para recuperar los datos de la cookie
    datas = dict()
    el_id = request.session.get('catch_id')
    datas['cookiet'] = el_id
    return JsonResponse({'datos':datas})


def validate_username(request):
    username = request.GET.get('username', None) # con esta linea podemos tomar los datos de data de nuestro script ajax y los podemos usar en django y si el caso, devolvemos una respuesta si asi se requiere
    data = {
        'is_taken': Usuario.objects.filter(username__iexact=username).exists()
    }
    return JsonResponse(data)


def savecanvasimage(request):
    dataimg = request.POST.get('base64image')
    format, imgstr = dataimg.split(';base64,')
    ext = format.split('/')[-1]

    data = ContentFile(base64.b64decode(imgstr), name='takansat.' + ext)
    image = Base64images()
    image.archivo_image = data
    image.save()
    obj = Base64images.objects.last().archivo_image.url
    print(data)
    return JsonResponse({'imagenes':'existosos','nombre':'takansat.png','archivo':obj},safe=False)


def chargecolors(request):

    if request.is_ajax():
        colores = Color.objects.all().values('file_color')

    return JsonResponse({'colores':list(colores)})
