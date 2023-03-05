# Cloud-Computing
## Homework 1

### How to run using docker-compose

1. Install docker and docker-compose
2. Run `docker-compose up` in the root directory of the project
3. The server will be running on port 4001

### Endpoints



#### POST /api/v1/product/

This endpoint is used to create a new product.



```
POST /api/v1/product/ HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Content-Length: 122

{
    "name": "apple",
    "price":10,
    "productImage":"http://apple-image.com",
    "description":"Green apple"
}
```

#### GET /api/v1/product/:id

This endpoint is used to get a product by id.

```
GET /api/v1/product/6404fd91f4bf4017b7230fb3 HTTP/1.1
Host: localhost:4001
```


#### PUT /api/v1/product/:id

This endpoint is used to update a product by id. (All fields are required)

```
PUT /api/v1/product/64051c4cfe9f41f2669d15d1 HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Content-Length: 122

{
    "name": "apple",
    "price":10,
    "productImage":"http://apple-image.com",
    "description":"Green apple"
}
```

#### PATCH /api/v1/product/:id

This endpoint is used to update a product by id. (Only the fields that are provided will be updated)

```
PATCH /api/v1/product/6404fd91f4bf4017b7230fb3 HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Content-Length: 46

{
"productImage":"http://apple-image2.com"
}
```

#### DELETE /api/v1/product/:id

This endpoint is used to delete a product by id.

```
DELETE /api/v1/product/6404fd91f4bf4017b7230fb3 HTTP/1.1
Host: localhost:4001
```



#### POST /api/v1/sellers/

This endpoint is used to create a new seller.

```
POST /api/v1/sellers/ HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Content-Length: 119

{
    "name": "Marina",
    "email": "mmm@gmail.com",
    "password" : "123456",
    "phone": "3232242344324"   
}
```

#### GET /api/v1/sellers/:id

This endpoint is used to get a seller by id.

```
GET /api/v1/sellers/64051ace04224cb96efdb089 HTTP/1.1
Host: localhost:4001
```

#### PUT /api/v1/sellers/:id


This endpoint is used to update a seller by id. (All fields are required)

```
PUT /api/v1/sellers/64051ace04224cb96efdb089 HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Content-Length: 115

{
    "name": "Marian",
    "email": "mmm@gmail.com",
    "password": "123456",
    "phone": "3232242344324"
}
```

#### PATCH /api/v1/sellers/:id

This endpoint is used to update a seller by id. (Only the fields that are provided will be updated)

```
PATCH /api/v1/sellers/64051ace04224cb96efdb089 HTTP/1.1
Host: localhost:4001
Content-Type: application/json
Content-Length: 35

{
    "name": "Marian Popovici"
}
```

#### DELETE /api/v1/sellers/:id

This endpoint is used to delete a seller by id.

```
DELETE /api/v1/sellers/64051ace04224cb96efdb089 HTTP/1.1
Host: localhost:4001
```

#### GET /api/v1/sellers/:id/products

This endpoint is used to get all products from a seller.

```
GET /api/v1/sellers/6405205add4379a6201aa046/products HTTP/1.1
Host: localhost:4001
```