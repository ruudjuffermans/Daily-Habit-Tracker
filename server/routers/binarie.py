from typing import Annotated, Optional
from datetime import datetime, date
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status, Path
from models import Binarie
from database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db = Annotated[Session, Depends(get_db)]

class BinarieCreate(BaseModel):
    title: str = Field(min_length=3)
    day: date = Field()

@router.get("/binarie")
async def read_all(db: db):
    return db.query(Binarie).all()


@router.put("/binarie/{binarie_id}", status_code=status.HTTP_200_OK)
async def toggle_binarie(db: db,
                      binarie_id: int = Path(gt=0)):

    binarie_model = db.query(Binarie).filter(Binarie.id == binarie_id).first()
    if binarie_model is None:
        raise HTTPException(status_code=404, detail='Todo not found.')

    binarie_model.active = not binarie_model.active

    db.add(binarie_model)
    db.commit()

    return binarie_model.to_dict()

@router.post("/newday", status_code=status.HTTP_201_CREATED)
async def create_binarie(db: db):
    today = datetime.today().date()

    existing_day = db.query(Binarie).filter(Binarie.day == today).first()

    if existing_day is None:
        db.add(Binarie(day=today, title="cold shower 🚿"))
        db.add(Binarie(day=today, title="vitamins 💊"))
        db.add(Binarie(day=today, title="creatine 🤍"))
        db.add(Binarie(day=today, title="reading 📚"))
        db.add(Binarie(day=today, title="language 🌍"))
        db.commit()
        return
    else:
        return 

@router.post("/binarie", status_code=status.HTTP_201_CREATED)
async def create_binarie(db: db, binarie_create: BinarieCreate):

    new_binarie = Binarie(**binarie_create.model_dump())

    print(new_binarie.to_dict())

    db.add(new_binarie)
    db.commit()

    return new_binarie.to_dict()


@router.delete("/binarie/{binarie_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_binarie(db: db, binarie_id: int = Path(gt=0)):
    todo_model = db.query(Binarie).filter(Binarie.id == binarie_id).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Todo not found.')
    db.query(Binarie).filter(Binarie.id == binarie_id).delete()
    db.commit()
