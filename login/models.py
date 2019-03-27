from django.db import models

# Create your models here.
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User

class Usuario(User):
    #color = models.CharField(max_length=10)
    class Meta:
        verbose_name = _('usuario')
        verbose_name_plural = _('usuarios')

