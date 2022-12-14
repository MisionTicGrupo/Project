# Generated by Django 4.1.1 on 2022-10-03 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ferreapp", "0002_producto_imagen_alter_producto_nombre_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="producto",
            name="descripcion",
            field=models.TextField(blank=True, verbose_name="Descripcion"),
        ),
        migrations.AlterField(
            model_name="producto",
            name="imagen",
            field=models.ImageField(
                null=True, upload_to="imagenes/", verbose_name="Imagen"
            ),
        ),
        migrations.AlterField(
            model_name="producto",
            name="nombre",
            field=models.TextField(max_length=60, verbose_name="Nombre"),
        ),
        migrations.AlterField(
            model_name="producto",
            name="precio_venta",
            field=models.IntegerField(default=0, verbose_name="Precio"),
        ),
        migrations.AlterField(
            model_name="producto",
            name="stock_disponible",
            field=models.IntegerField(default=0, verbose_name="Cantidad"),
        ),
    ]
