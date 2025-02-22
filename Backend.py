from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost:5432/mydatabase"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define User model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    age = Column(Integer)

Base.metadata.create_all(bind=engine)

# Define GraphQL Schema
@strawberry.type
class UserType:
    id: int
    name: str
    email: str
    age: int

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
    def create_user(self, name: str, email: str, age: int) -> UserType:
        db = SessionLocal()
        user = User(name=name, email=email, age=age)
        db.add(user)
        db.commit()
        db.refresh(user)
        db.close()
        return user

schema = strawberry.Schema(query=Query, mutation=Mutation)

# FastAPI App
app = FastAPI()
gql_router = GraphQLRouter(schema)
app.include_router(gql_router, prefix="/graphql")
