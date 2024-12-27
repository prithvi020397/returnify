from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import PickupRequest
from .serializers import PickupRequestSerializer

class PickupRequestViewSet(viewsets.ModelViewSet):
    serializer_class = PickupRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return PickupRequest.objects.all()
        return PickupRequest.objects.filter(customer=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        pickup = self.get_object()
        if pickup.status in ['PENDING', 'SCHEDULED']:
            pickup.status = 'CANCELLED'
            pickup.save()
            return Response({'status': 'pickup cancelled'})
        return Response(
            {'error': 'Cannot cancel pickup in current status'},
            status=status.HTTP_400_BAD_REQUEST
        )