from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework import serializers
from .models import Transaction


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'title', 'amount', 'type', 'category', 'date', 'note')
        read_only_fields = ('id',)

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError('Amount must be greater than 0.')
        return value

    def validate_type(self, value):
        if value not in ('income', 'expense'):
            raise serializers.ValidationError('Type must be income or expense.')
        return value

    def validate(self, attrs):
        transaction_type = attrs.get('type', self.instance.type if self.instance else None)
        if transaction_type == 'expense':
            amount = attrs.get('amount', self.instance.amount if self.instance else None)
            transactions = Transaction.objects.filter(user=self.context['request'].user)
            if self.instance:
                transactions = transactions.exclude(pk=self.instance.pk)

            income = transactions.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
            expenses = transactions.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
            if amount > income - expenses:
                raise serializers.ValidationError({'amount': 'Expense exceeds the available balance.'})

        return attrs
