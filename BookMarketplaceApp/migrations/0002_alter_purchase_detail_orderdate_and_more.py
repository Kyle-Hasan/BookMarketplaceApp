# Generated by Django 4.0.2 on 2022-04-09 05:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BookMarketplaceApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase_detail',
            name='OrderDate',
            field=models.DateField(default=datetime.datetime(2022, 4, 8, 23, 36, 19, 486861)),
        ),
        migrations.AlterField(
            model_name='rental_detail',
            name='OrderDate',
            field=models.DateField(default=datetime.datetime(2022, 4, 8, 23, 36, 19, 486861)),
        ),
        migrations.AlterField(
            model_name='rental_detail',
            name='StartDate',
            field=models.DateField(default=datetime.datetime(2022, 4, 8, 23, 36, 19, 486861)),
        ),
    ]
