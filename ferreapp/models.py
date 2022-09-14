from django.db import models
from django.contrib.auth.models import User

class Producto(models.Model):
    nombre = models.TextField()
    descripcion = models.TextField()
    ventas = models.IntegerField()
    
    precio_compra = models.IntegerField()
    precio_venta = models.IntegerField()
    
    stock_inicial = models.IntegerField()
    stock_disponible = models.IntegerField()
    
class Carrito(models.Model): # Carrito de compra (añadir, eliminar, comprar)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)