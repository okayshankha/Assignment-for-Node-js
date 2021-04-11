# Assignment-for-Node-js


Installation:
- npm i
- cp .env.sample .env

```
End points:

# Create new User
POST http://localhost:3000/api/auth/register
Form-Data: (example)
    name: Shankhadeep Das,
    email: example@emample.com,
    password: 123456rd,
    phone: 9876543210,
    image: (type File)


# Generate JWT token
POST http://localhost:3000/api/auth/login
JSON Body: (example)
    {
        "email": "example@emample.com,",
        "password": ********
    }



# Get User data by JWT token
POST http://localhost:3000/api/user/me (JWT PROTECTED)
Header:
    Authorization: Bearer {token}



# Create A Post
POST http://localhost:3000/api/post/ (JWT PROTECTED)
Header:
    Authorization: Bearer {token}
JSON Body: (example)
    {
        "title": "Hello",
        "description": "description"
    }


# Get all users data
GET http://localhost:3000/api/user



# Get all user data by ID
GET http://localhost:3000/api/user/:id



# Get all posts grouped by users
GET http://localhost:3000/api/post

```

