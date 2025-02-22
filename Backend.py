from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
from backend.database import SessionLocal, engine, Base
from backend.models import User
from backend.schemas import UserType, CreateUserInput

Base.metadata.create_all(bind=engine)

@strawberry.type
class Query:
    @strawberry.field
    def get_users(self) -> list[UserType]:
        db = SessionLocal()
        users = db.query(User).all()
        db.close()
        return users

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_user(self, input: CreateUserInput) -> UserType:
        db = SessionLocal()
        user = User(name=input.name, email=input.email, age=input.age)
        db.add(user)
        db.commit()
        db.refresh(user)
        db.close()
        return user

schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")
