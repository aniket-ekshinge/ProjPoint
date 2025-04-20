from rest_framework import serializers
from .models import Query, Answer

class AnswerSerializer(serializers.ModelSerializer):
    responder = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Answer
        fields = ('id', 'query', 'responder', 'content', 'created_at', 'updated_at')
        read_only_fields = ('query', 'responder', 'created_at', 'updated_at')

class QuerySerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Query
        fields = ('id', 'author', 'title', 'description', 'created_at', 'updated_at', 'answers')
        read_only_fields = ('author', 'created_at', 'updated_at', 'answers')