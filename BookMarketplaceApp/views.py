from django.shortcuts import render

def BookMarketplaceApp(request):
    return render(request, 'BookMarketplaceApp.html', {})