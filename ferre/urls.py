from django.contrib import admin
from django.urls import path
from ferreapp import views

from django.conf import settings
from django.contrib.staticfiles.urls import static

urlpatterns = [
    #path("admin/", admin.site.urls),
    path('', views.mainView, name="home"),
    path('search', views.search, name="search"),
    path('login/', views.signin, name="login"),
    path('register/', views.registerView, name="register"),
    path('logout/', views.signout, name='logout'),
    path('admin/', views.crudView, name="admin"),
    path('admin/create', views.createView, name="create"),
    path('admin/edit', views.editView, name="edit"),
    path('admin/data', views.getData, name="data"),
    path('eliminar/<int:id>', views.deleteView, name="eliminar")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
