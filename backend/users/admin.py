from django.contrib import admin
from .models import User, Profile

class UserAdmin(admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)




class ProfileAdmin(admin.ModelAdmin):
    pass

admin.site.register(Profile, ProfileAdmin)

