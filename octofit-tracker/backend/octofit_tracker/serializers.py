from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = '__all__'

    def get_id(self, obj):
        return str(obj.pk)

class UserSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True, required=False)
    id = serializers.SerializerMethodField()
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'team', 'team_id']

    def get_id(self, obj):
        return str(obj.pk)

class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user', write_only=True, required=False)
    id = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'type', 'duration', 'distance', 'timestamp']

    def get_id(self, obj):
        return str(obj.pk)

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description']
    def get_id(self, obj):
        return str(obj.pk)

class LeaderboardSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True, required=False)
    id = serializers.SerializerMethodField()
    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'team_id', 'points']
    def get_id(self, obj):
        return str(obj.pk)
