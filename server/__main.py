from fastapi import FastAPI
import models
from routers import todo
from database import engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(todo.router)