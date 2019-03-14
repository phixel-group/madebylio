"""
Django settings for phixeldev project.

Generated by 'django-admin startproject' using Django 1.11.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
from django.utils.translation import ugettext_lazy as _         #Traduccion
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'e*a#7wfopdh3n3jl#27wotl3rmou4-&_mwg_#bk8cdyx+(!#@l'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['.madebylio.com','127.0.0.1','localhost','madebylio.com']
#ALLOWED_HOSTS = ['*']
#SECURE_HSTS_SECONDS = 2
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'base.apps.BaseConfig',
    'login',
    'adminlio',
    'galeria',
    'pagos',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'corsheaders'
    #'social_django',
]

SITE_ID =3 #IMPORTANTISIMO!!!!!!! DEBE SER EL ID DE LA PAGINA DE APP ACTUAL SI NO SALDRA ERROR DE MACHT QUERY SITE
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',     #Traduccion
    'django.middleware.locale.LocaleMiddleware',                #traduccion
    'django.middleware.common.CommonMiddleware',                #traduccion
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    #'social_django.middleware#.SocialAuthExceptionMiddleware',  #social auth https://simpleisbetterthancomplex.com/tutorial/2016/10/24/how-to-add-social-login-to-django.html
]

ROOT_URLCONF = 'madebylio.urls'

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'login.backends.EmailAuthBackend',
# `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
   # 'social_core.backends.github.GithubOAuth2',
    ##'social_core.backends.twitter.TwitterOAuth',
    #'social_core.backends.facebook.FacebookOAuth2'
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',

                #'social_django.context_processors.backends',  # <-- social auth
                #'social_django.context_processors.login_redirect', # <-- social auth https://simpleisbetterthancomplex.com/tutorial/2016/10/24/how-to-add-social-login-to-django.html
            ],
        },
    },
]

WSGI_APPLICATION = 'madebylio.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#LOGIN_URL = '/oauth/login/'
LOGIN_REDIRECT_URL = '/'

SOCIALACCOUNT_PROVIDERS = {'facebook':
       {'METHOD': 'js_sdk',
        'SCOPE': ['email', 'public_profile'],
        'AUTH_PARAMS': {'auth_type': 'rerequest'},
        'FIELDS': [
            'id',
            'email',
            'name',
            'first_name',
            'last_name',
            'verified',
            'locale',
            'timezone',
            'link',
            'gender',
            'updated_time'],
        'EXCHANGE_TOKEN': True,
        'LOCALE_FUNC': lambda request: 'alternate',
        'VERIFIED_EMAIL': False,
        'VERSION': 'v2.10'}
     }
SOCIAL_AUTH_FACEBOOK_KEY = '547750025693775'  # App ID
SOCIAL_AUTH_FACEBOOK_SECRET = '5814294c572a0a9137edda3e6642df5c'  # App Secret https://simpleisbetterthancomplex.com/tutorial/2016/10/24/how-to-add-social-login-to-django.html
#SOCIAL_AUTH_FACEBOOK_API_VERSION = '2.10'
#SOCIAL_AUTH_FACEBOOK_API_VERSION = '2.10'
# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/
LANGUAGE_CODE = 'en-us'
LANGUAGES = (  # Traduccion
    ('en', _('English')),
    ('es', _('Spanish')),
    ('it', _('Italian')),
    # ('fr',_('French')),
)

LOCALE_PATHS = (                        #Traduccion
    os.path.join(BASE_DIR, 'locale'),
)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
#RECUPERACION CONTRASEÑA

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'webmail.phixelgroup.com'
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "eng@phixelgroup.com"
EMAIL_HOST_PASSWORD = "LuisCaro12"
EMAIL_PORT = 587
#SESSION_COOKIE_AGE = 600


#CORS_ORIGIN_ALLOW_ALL = True
