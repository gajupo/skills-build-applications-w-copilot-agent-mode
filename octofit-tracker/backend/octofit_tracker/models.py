from django.db import models
from django.contrib.auth.models import AbstractUser
from bson import ObjectId

class User(AbstractUser):
    # Additional fields can be added here
    
    class Meta:
        db_table = 'auth_user'

class Team(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    members = models.ManyToManyField('User', related_name='teams')
    
    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)
    
    class Meta:
        db_table = 'team'

class Activity(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, editable=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    date = models.DateField()
    
    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)
    
    class Meta:
        db_table = 'activity'

class Workout(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()
    suggested_for = models.ManyToManyField('User', related_name='suggested_workouts')
    
    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)
    
    class Meta:
        db_table = 'workout'

class Leaderboard(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, editable=False)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)
    
    class Meta:
        db_table = 'leaderboard'
