# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-07 17:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminlio', '0003_auto_20180907_1336'),
    ]

    operations = [
        migrations.AddField(
            model_name='troquel',
            name='subcategoria_troquel',
            field=models.CharField(choices=[('', ''), ('LET', 'Letter'), ('THI', 'Things'), ('CAR', 'Cars and home'), ('FRU', 'Fruits'), ('PER', 'Persons'), ('SHE', 'SHEET'), ('PLA', 'Dish'), ('SPO', 'Spoon'), ('FOR', 'Fork'), ('TEA', 'Teapot'), ('MUG', 'Mugs'), ('DIA', 'Diadem'), ('EAR', 'Earring'), ('CLK', 'Clock'), ('PIC', 'Picture')], default='none', max_length=3),
        ),
        migrations.AlterField(
            model_name='troquel',
            name='categoria_troquel',
            field=models.CharField(choices=[('', ''), ('IMA', 'Letter'), ('CER', 'Things'), ('BIS', 'Cars and home'), ('HOG', 'Fruits')], default='none', max_length=3),
        ),
    ]
