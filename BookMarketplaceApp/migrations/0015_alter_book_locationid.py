# Generated by Django 4.0.2 on 2022-04-12 05:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BookMarketplaceApp', '0014_book_locationid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='LocationID',
            field=models.ForeignKey(default=0, null=True, on_delete=django.db.models.deletion.CASCADE, to='BookMarketplaceApp.location'),
        ),
    ]
