import strawberry

@strawberry.type
class UserType:
    id: int
    name: str
    email: str
    age: int

@strawberry.input
class CreateUserInput:
    name: str
    email: str
    age: int
