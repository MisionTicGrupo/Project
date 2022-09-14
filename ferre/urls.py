from django.contrib import admin
from django.urls import path
from ferreapp import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', views.mainView, name="home"),
    path('login/', views.loginView, name="login"),
    path('register/', views.registerView, name="register"),
    path('task/', views.tasksView, name="tasks")
]
