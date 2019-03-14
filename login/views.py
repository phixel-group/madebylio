from django.shortcuts import render
from django.views.generic import View,TemplateView, CreateView, UpdateView, FormView,DeleteView, ListView
from django.contrib.auth.forms import AuthenticationForm
from django.urls import reverse_lazy
from django.http import HttpResponseRedirect, JsonResponse
from login.models import Usuario
from adminlio.models import UsuarioAdmin
from login.forms import UsuarioForm
from django.contrib.auth import login,authenticate
from django.contrib import  messages
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_protect



# Create your views here.

class LoginAdmin(FormView):
    template_name = 'login/loginadmin.html'
    # Le indicamos que el formulario a utilizar es el formulario de autenticación de Django
    form_class = AuthenticationForm
    # Le decimos que cuando se haya completado exitosamente la operación nos redireccione a la url bienvenida de la aplicación personas
    success_url = reverse_lazy("adminlio:homeadmin")

    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if self.request.user.is_authenticated() and self.request.user.is_superuser:
            return HttpResponseRedirect(self.get_success_url())
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return super(LoginAdmin, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        if(form.get_user().is_superuser):
            login(self.request, form.get_user())
            return super(LoginAdmin, self).form_valid(form)
        else:
            return render(self.request,'adminlio/noperm.html')

    def get_context_data(self, **kwargs):
        context = super(LoginAdmin, self).get_context_data(**kwargs)
        usuarios = UsuarioAdmin.objects.all()
        context['datos_user'] = usuarios
        return context

class Loginusuario(FormView): #Login convencional donde pueden entrar usuarios normales(usuarios,asesores,publicadores)
    # Establecemos la plantilla a utilizar
    template_name = 'login/login.html'
    # Le indicamos que el formulario a utilizar es el formulario de autenticación de Django
    form_class = AuthenticationForm
    # Le decimos que cuando se haya completado exitosamente la operación nos redireccione a la url bienvenida de la aplicación personas
    success_url = reverse_lazy("home")


    def dispatch(self, request, *args, **kwargs):
        # Si el usuario está autenticado entonces nos direcciona a la url establecida en success_url
        if request.user.is_authenticated():
            return HttpResponseRedirect(self.get_success_url())
        # Sino lo está entonces nos muestra la plantilla del login simplemente
        else:
            return super(Loginusuario, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        login(self.request, form.get_user())
        return super(Loginusuario, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(Loginusuario, self).get_context_data(**kwargs)
        usuarios = Usuario.objects.all()
        context['datos_user'] = usuarios
        return context

class AddUsuario(CreateView):#Vista para añadir usuarios convencionales
    model = Usuario
    template_name = "login/registro.html"
    form_class = UsuarioForm #form que creamos
    success_url = reverse_lazy('login:login')
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            # <proceso el formulario con cleaned data>
            form.save()
            #set_group,valor = Group.objects.get_or_create(name='prueba')
            #actual_user = User.objects.get(username=request.POST.get('username'))
            #actual_user.groups.add(set_group)
            return HttpResponseRedirect(self.success_url)
        return render(request, self.template_name, {'form': form})

class AddUsuarioAdmin(CreateView):#Vista para añadir usuarios convencionales
    model = UsuarioAdmin
    template_name = "adminlio/registro.html"
    form_class = UsuarioForm #form que creamos
    success_url = reverse_lazy('login:login')
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            # <proceso el formulario con cleaned data>
            form.save()
            #set_group,valor = Group.objects.get_or_create(name='prueba')
            #actual_user = User.objects.get(username=request.POST.get('username'))
            #actual_user.groups.add(set_group)
            return HttpResponseRedirect(self.success_url)
        return render(request, self.template_name, {'form': form})


######################################################
        #VISTA AJAX PARA LOGIN
#####################################################}
def loginajax(request):
    response_data = dict()
    #username = request.GET.get('username')
    #password = request.GET.get('pwd')
    #stayloggedin = request.GET.get('stayloggedin')
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        #login_form = AuthenticationForm(request,request.POST)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            response_data['resultado'] = 'success'
            login(request,user)# nos logeamos super importante para quedar#
            #   autentificados
            response_data['usuario'] = user.username
            #response_data['message'] = 'You"re logged in'
        else:
            response_data['resultado'] = 'failed'
            #response_data['message'] = 'You messed up'

    return JsonResponse({'respuesta':response_data})

def userregajax(request):
    data = dict()
    if request.method =='POST':
        registro = UsuarioForm(request.POST)
        if registro.is_valid():
            registro.save()
            data['resultado'] = 'success'
        else:
            data['resultado'] = 'failed'

    return JsonResponse({'respuesta':data})
