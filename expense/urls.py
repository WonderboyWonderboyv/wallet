from django.conf.urls import url
from .views import home, ExpenseListView, ExpenseDetailView, chart

app_name = 'expense'

urlpatterns = [
    url(r'^$', home, name='home'), 
    url(r'^chart/$', chart, name='chart'),  
    url(r'^api/$', ExpenseListView.as_view()),
    url(r'^api/(?P<pk>[0-9]+)/$', ExpenseDetailView.as_view()),
    
]
