from rest_framework import serializers
from .models import PickupRequest, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class PickupRequestSerializer(serializers.ModelSerializer):
    pickup_address = AddressSerializer()
    
    class Meta:
        model = PickupRequest
        fields = '__all__'
        read_only_fields = ('customer', 'status')
        
    def create(self, validated_data):
        address_data = validated_data.pop('pickup_address')
        address = Address.objects.create(**address_data)
        pickup_request = PickupRequest.objects.create(
            pickup_address=address, 
            **validated_data
        )
        return pickup_request