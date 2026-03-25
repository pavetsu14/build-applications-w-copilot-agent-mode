from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker import models as app_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear existing data safely (avoid unhashable error)
        User.objects.filter(pk__isnull=False).delete()
        app_models.Team.objects.filter(pk__isnull=False).delete()
        app_models.Activity.objects.filter(pk__isnull=False).delete()
        app_models.Leaderboard.objects.filter(pk__isnull=False).delete()
        app_models.Workout.objects.filter(pk__isnull=False).delete()

        # Create Teams
        marvel = app_models.Team.objects.create(name='Marvel')
        dc = app_models.Team.objects.create(name='DC')

        # Create Users
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc),
        ]

        # Create Activities
        activities = [
            app_models.Activity.objects.create(user=users[0], type='run', duration=30, distance=5),
            app_models.Activity.objects.create(user=users[1], type='cycle', duration=45, distance=15),
            app_models.Activity.objects.create(user=users[2], type='swim', duration=60, distance=2),
            app_models.Activity.objects.create(user=users[3], type='run', duration=25, distance=4),
        ]

        # Create Workouts
        workouts = [
            app_models.Workout.objects.create(name='Morning Cardio', description='Cardio workout for all'),
            app_models.Workout.objects.create(name='Strength Training', description='Strength workout for all'),
        ]

        # Create Leaderboard
        app_models.Leaderboard.objects.create(team=marvel, points=100)
        app_models.Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
