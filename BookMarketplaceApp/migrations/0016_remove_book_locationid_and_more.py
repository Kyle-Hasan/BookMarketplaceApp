# Generated by Django 4.0.2 on 2022-04-13 22:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BookMarketplaceApp', '0015_alter_book_locationid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='LocationID',
        ),
        migrations.RemoveField(
            model_name='insuranceprovider',
            name='Location_ID',
        ),
        migrations.DeleteModel(
            name='Location',
        ),
    ]
