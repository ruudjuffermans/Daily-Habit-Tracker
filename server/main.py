from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import todo, binarie

app = FastAPI()

allowed_origins = [
    "http://localhost:3000",  # Assuming your frontend runs on this URL
    "https://www.example.com",
]

# Add CORSMiddleware to the application instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # List of allowed origins
    allow_credentials=True,  # Allow credentials (cookies, authorization headers, etc.)
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)



models.Base.metadata.create_all(bind=engine)

app.include_router(todo.router)
app.include_router(binarie.router)

# def get_new_todo_id():
#     return uuid.uuid4()

# class Todo:
#     id: int
#     title: str
#     done: int

#     def __init__(self, title, done=False):
#         self.id = get_new_todo_id()
#         self.title = title
#         self.done = done

# TODOS = [
#     Todo('Computer Science Pro', done=True),
#     Todo('Be Fast with FastAPI'),
#     Todo('Master Endpoints'),
#     Todo('TODO 1'),
#     Todo('TODO 2', done=False),
#     Todo('TODO 3')
# ]



# def find_todo_index(id: int):
#     for i in range(len(TODOS)):
#         if TODOS[i].id == id:
#             return i
#     raise HTTPException(status_code=404, detail='Item not found')

# def find_todo_by_id(id: int):
#     for todo in TODOS:
#         if todo.id == id:
#             return todo
#     raise HTTPException(status_code=404, detail='Item not found')

# class CreateRequest(BaseModel):
#     title: str = Field(min_length=3)
#     done: Optional[bool] = Field(False, title='Done status of the Todo')

#     class Config:
#         json_schema_extra = {
#             'example': {
#                 'title': 'A new todo',
#                 'done': 'false',
#             }
#         }

# @app.get("/todo", status_code=status.HTTP_200_OK)
# async def get_all_todos():
#     return TODOS


# @app.get("/todo/{todo_id}", status_code=status.HTTP_200_OK)
# async def read_todo(todo_id: int = Path(gt=0)):
#     return find_todo_by_id(todo_id)


# @app.post("/todo", status_code=status.HTTP_201_CREATED)
# async def create_todo(todo_request: CreateRequest):
#     new_todo = Todo(**todo_request.model_dump())
#     TODOS.append(new_todo)
#     return new_todo

# @app.put("/todo/{todo_id}", status_code=status.HTTP_200_OK)
# async def toggle_todo(todo_id: int = Path(gt=0)):
#     index = find_todo_index(todo_id)
#     TODOS[index].done = not TODOS[index].done
#     return TODOS[index]


# @app.delete("/todo/{todo_id}", status_code=status.HTTP_200_OK)
# async def delete_todo(todo_id: int = Path(gt=0)):
#     index = find_todo_index(todo_id)
#     print(index)
#     return TODOS.pop(index)