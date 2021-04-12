# Django DRF Review
## Table of contents
  - [JSON Web Token](#json-web-token)
  - [Routers](#routers)
  - [Models](#models)
  - [Views](#views)
  - [Serializers](#serializers)
  - [Reference](#reference) 



## JSON Web Token
JSON Web Tokens consist of three parts separated by dots (.), which are:

* Header
* Payload
* Signature

#### How do JWT work?

* Json Web Tokens are a **stateless solution** for authentication. So there is no need to store any session state on the server, which of course is perfect for restful APIs.
* Assuming we already have a registered user in our database. So the user's client starts by making a post request with the username and the password, the application then checks if the user exists and if the password is correct, then the application will generate a unique Json Web Token for only that user.
* The token is created using a **secret string** that is **stored on a server**. Next, the server then sends that JWT back to the client which will store it either in a cookie or in **local storage**.
* Then, each time a user wants to access a protected route like his user profile data, for example. He sends his Json Web Token along with a request, so it's a bit like showing his passport to get access to that route.
* Once the request hits the server, our app will then verify if the Json Web Token is actually valid and if the user is really who he says he is, well then the requested data will be sent to the client and if not, then there will be an error telling the user that he's not allowed to access that resource.
* Both Header and Payload parts are just plain text that will get encoded, but not encrypted. **So anyone will be able to decode them and to read them, we cannot store any sensitive data in here.**
* **signing the Json Web Token**:  The signing algorithm takes the header, the payload, and the secret to create a unique signature.
* Once the server receives a JWT to grant access to a protected route, it needs to verify if no one changed the header and the payload data of the token. 
* The verification will take its **header and payload, and together with the secret that is still saved on the server**, basically create a **test signature**. And the original signature that was generated when the JWT was first created is still in the token. If the test signature is the same as the original signature, then it means that the payload and the header have not been modified. **Verification success**. 
*  If payload had been modified, then the test signature would have to be different (someone tampered with the data!😱). **Verification fail**.


> All this communication must happen over https, so secure encrypted Http in order to prevent that anyone can get access to passwords or Json Web Tokens. Only then we have a really secure system.

#### Simple JWT 
* Creating tokens manually
```
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
``` 
* User login
```
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):

        # check DB for existing user and return a pair of unique access token and refresh token. 
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        # add other info to response data for frontend use 
        for key, value in serializer.items():
            data[key] = value

        return data
```
* User authenticate
```
from rest_framework.permissions import IsAuthenticated

# use as a wrapper 
@permission_classes([IsAuthenticated])
``` 

## Routers
```
urlpatterns = [
    path('add',views.addOrder,name="order_add")
]
```
```
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/',include('base.urls.product_urls'))
]
```

## Models
A `model` is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you’re storing. Generally, each model maps to a single database table.
* Each model is a Python class that subclasses django.db.models.Model.
* Each attribute of the model represents a **database field**.
* With all of this, Django gives you an automatically-generated **database-access API**.
 
### Fields
The most important part of a model – and the only required part of a model – is the list of database fields it defines. Fields are specified by class attributes.

### Related objects
#### One-to-many relationships
**Forward**
If a model has a `ForeignKey`, instances of that model will have access to the related (foreign) object via an attribute of the model.

Example:
```
# Order is the foreign-key on model OrderItem
orderItem = OrderItem.objects.get(_id = 1)
orderItem.order  # Returns the related Order object
```

**Following relationships “backward”**
If a model has a `ForeignKey`, instances of the foreign-key model will have access to a Manager that returns all instances of the first model. By default, this Manager is named FOO_set, where FOO is the source model name, lowercased. This Manager returns QuerySets, which can be filtered and manipulated as described in the “Retrieving objects” section above.

Example:
```
# Order is the foreign-key on model OrderItem
order = Order.objects.get(id = 1)
orderItems = order.orderitem_set.all() 
```

#### Many-to-many relationships
Example:
```
e = Entry.objects.get(id=3)
e.authors.all() # Returns all Author objects for this Entry.
e.authors.count()
e.authors.filter(name__contains='John')

a = Author.objects.get(id=5)
a.entry_set.all() # Returns all Entry objects for this Author.
```

#### One-to-one relationships
If you define a OneToOneField on your model, instances of that model will have access to the related object via an attribute of the model.

Example:
```
# Order is the  OneToOneField on model ShippingAddress
shipping = ShippingAddress.objects.get(_id = 2)
shipping.order  # Returns the related Order object
```
reverse:
```
# Order is the  OneToOneField on model ShippingAddress
order = Order.objects.get(id = 1)
order.shippingaddress  # Returns the related ShippingAddress object
```

## Views
A view is a callable which takes a request and returns a response. 
#### @api_view()
The core of this functionality is the api_view decorator, which takes a list of HTTP methods that your view should respond to.
```
@api_view(['POST'])
```

#### Request
* `request.data`
returns the parsed content of the request body.
* `request.user`
typically returns an instance of django.contrib.auth.models.User, although the behavior depends on the authentication policy being used.
* `request.query_params`
returns the query parameters of the request. 

#### Response
* Creating responses
```
# data: the serialized data for the response
Response(data)
``` 

#### Making queries (with database-access API)
* Creating objects
```
review = Review.objects.create(
    user = user,
    product = product,
    name = user.first_name,
    rating = data['rating'],
    comment = data['comment']
)
``` 
* Saving change to objects
```
product.name = data['name']
product.brand = data['brand']
product.save() 
```
* Retriving objects
```
# retrieving all objects
users = User.objects.all()

# retrieving a single object with get()
user = User.objects.get(id = id)

# retrieving specific objects with filters
Entry.objects.filter(pub_date__year=2006)

# retrieving specific objects that product name contains query (case insensitive)
products = Product.objects.filter(name__icontains=query)
``` 
* Deleting objects
```
usertoDelete = User.objects.get(id = id)
usertoDelete.delete()
```

## Serializers
`Serializers` allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into `JSON`, `XML` or other content types.

* The `ModelSerializer` class provides a shortcut that lets you automatically create a Serializer class with fields that correspond to the Model fields.
```
class Meta:
    model = Order
    fields = '__all__'
``` 
* access the Manager of the model to get a collection of objects
```
items = obj.orderitem_set.all() 
```
* access the Manager of the model to get a single object
```
shipping = obj.shippingaddress
```

## Reference
* https://stackoverflow.com/questions/27301557/if-you-can-decode-jwt-how-are-they-secure#:~:text=The%20contents%20in%20a%20json,feature%20for%20verifying%20token%20authenticity.&text=There%20are%20two%20critical%20steps,signature%20immediately%20upon%20receiving%20it.

* https://www.django-rest-framework.org/