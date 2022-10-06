from re import A
from django.db import models
from django.contrib.auth.models import User

class Producto(models.Model):
    nombre = models.TextField(max_length=60, verbose_name="Nombre")
    descripcion = models.TextField(blank=True, verbose_name="Descripcion")
    imagen = models.ImageField(upload_to="imagenes/", verbose_name="Imagen", null=True)
    
    precio = models.IntegerField(default=0, verbose_name="Precio")
    
    stock = models.IntegerField(default=0, verbose_name="Cantidad")
    
    def delete(self, using=None, keep_parents=False):
        self.imagen.storage.delete(self.imagen.name)
        super().delete()
    
class Carrito(models.Model): # Carrito de compra (añadir, eliminar, comprar)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)