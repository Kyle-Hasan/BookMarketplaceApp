# Generated by Django 4.0.3 on 2022-04-11 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BookMarketplaceApp', '0010_alter_purchase_detail_orderdate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='wants',
            name='Wants_ID',
            field=models.AutoField(default=2, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='purchase_detail',
            name='OrderDate',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='rental_detail',
            name='OrderDate',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='rental_detail',
            name='StartDate',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='wants',
            name='Book_ID',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='BookMarketplaceApp.book'),
        ),
        migrations.AlterUniqueTogether(
            name='wants',
            unique_together={('Book_ID', 'User_Email')},
        ),
    ]
