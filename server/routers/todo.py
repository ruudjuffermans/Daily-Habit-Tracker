from typing import Annotated, Optional
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status, Path
from models import Todo
from database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db = Annotated[Session, Depends(get_db)]


class TodoCreate(BaseModel):
    title: str = Field(min_length=3)
    description: Optional[str] = Field("")
    done: Optional[bool] = Field(False, title='done status of the Todo')
    completed: Optional[bool] = Field(False, title='complete status of the Todo')
    archived: Optional[bool] = Field(False, title='archive status of the Todo')

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None)
    description: Optional[str] = Field(None)
    done: Optional[bool] = Field(None)
    completed: Optional[bool] = Field(None)
    archived: Optional[bool] = Field(None)


@router.get("/todo")
async def read_all(db: db):
    return db.query(Todo).all()


@router.get("/todo/{todo_id}", status_code=status.HTTP_200_OK)
async def read_todo( db: db, todo_id: int = Path(gt=0)):
    todo_model = db.query(Todo).filter(Todo.id == todo_id).first()
    print(todo_model)
    if todo_model is not None:
        return todo_model
    raise HTTPException(status_code=404, detail='Todo not found.')


@router.post("/todo", status_code=status.HTTP_201_CREATED)
async def create_todo(db: db, todo_request: TodoCreate):

    print(todo_request)
    todo_model = Todo(**todo_request.model_dump())

    print(todo_model.to_dict())

    db.add(todo_model)
    db.commit()

    return todo_model.to_dict()


@router.put("/todo/{todo_id}", status_code=status.HTTP_200_OK)
async def update_todo(db: db,
                      todo_update: TodoUpdate,
                      todo_id: int = Path(gt=0)):

    todo_model = db.query(Todo).filter(Todo.id == todo_id).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found.')

    todo_model.title = todo_update.title if todo_update.title is not None else todo_model.title
    todo_model.description = todo_update.description if todo_update.description is not None else todo_model.description
    todo_model.done = todo_update.done if todo_update.done is not None else todo_model.done
    todo_model.archived = todo_update.archived if todo_update.archived is not None else todo_model.archived
    todo_model.completed = todo_update.completed if todo_update.completed is not None else todo_model.completed

    db.add(todo_model)
    db.commit()

    return todo_model.to_dict()


@router.delete("/todo/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(db: db, todo_id: int = Path(gt=0)):
    todo_model = db.query(Todo).filter(Todo.id == todo_id).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found.')
    db.query(Todo).filter(Todo.id == todo_id).delete()
    db.commit()







