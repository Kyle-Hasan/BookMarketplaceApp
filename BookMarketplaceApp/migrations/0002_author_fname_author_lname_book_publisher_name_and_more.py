# Generated by Django 4.0.2 on 2022-04-07 09:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BookMarketplaceApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='FName',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='author',
            name='LName',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='book',
            name='Publisher_Name',
            field=models.ForeignKey(default=0, null=True, on_delete=django.db.models.deletion.CASCADE, to='BookMarketplaceApp.publisher'),
        ),
        migrations.AlterField(
            model_name='author',
            name='DateDied',
            field=models.DateField(default=0),
        ),
        migrations.AlterField(
            model_name='book',
            name='Damage',
            field=models.CharField(max_length=50),
        ),
        migrations.DeleteModel(
            name='Publishes',
        ),
    ]