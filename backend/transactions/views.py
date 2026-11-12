from django.db.models import Sum
from django.db.models.functions import TruncMonth
from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        qs = self.get_queryset()
        totals = qs.aggregate(
            income=Sum('amount', filter=None),
        )
        income = qs.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
        expenses = qs.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
        balance = income - expenses
        recent = qs.order_by('-date', '-id')[:5]
        return Response({
            'balance': balance,
            'income': income,
            'expenses': expenses,
            'recentTransactions': TransactionSerializer(recent, many=True).data,
        })

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        qs = self.get_queryset()
        monthly = (
            qs.annotate(month=TruncMonth('date'))
            .values('month')
            .annotate(
                income=Sum('amount', filter=None),
                expense=Sum('amount', filter=None),
            )
            .order_by('month')
        )
        # compute per type properly
        month_map = {}
        for tx in qs.order_by('date'):
            key = tx.date.strftime('%Y-%m')
            label = tx.date.strftime('%b')
            if key not in month_map:
                month_map[key] = {'name': label, 'income': 0, 'expense': 0}
            if tx.type == 'income':
                month_map[key]['income'] += float(tx.amount)
            else:
                month_map[key]['expense'] += float(tx.amount)
        bar_data = list(month_map.values())[-6:]

        pie_map = {}
        for tx in qs.filter(type='expense'):
            pie_map[tx.category] = pie_map.get(tx.category, 0) + float(tx.amount)
        pie_data = [{'name': k, 'value': v} for k, v in pie_map.items()]

        return Response({'barData': bar_data, 'pieData': pie_data})
