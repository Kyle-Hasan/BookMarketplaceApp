# Generated by Django 4.0.3 on 2022-04-11 05:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BookMarketplaceApp', '0011_wants_wants_id_alter_purchase_detail_orderdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wants',
            name='Book_ID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='BookMarketplaceApp.book'),
        ),
        migrations.AlterField(
            model_name='wants',
            name='User_Email',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='BookMarketplaceApp.login'),
        ),
    ]
