# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-06 18:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('adminlio', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Factura',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario_factura', models.CharField(max_length=40)),
                ('nombre_factura', models.CharField(max_length=40)),
                ('fecha_factura', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad_item', models.IntegerField()),
                ('factura_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pagos.Factura')),
                ('producto_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='adminlio.Producto')),
            ],
        ),
    ]
