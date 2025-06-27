from rest_framework import viewsets
from .serializer import ProductoSerializer
from .models import Producto
from .serializer import CategoriaSerializer
from .models import Categoria

# Create your views here.
class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.filter(activo=True)
    
    def perform_destroy(self, instance):
        instance.delete()
    
class CategoriaView(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()