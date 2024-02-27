from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, PrimaryKeyConstraint
from sqlalchemy.sql import func

class Todo(Base):
    __tablename__ =  'todo'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    description = Column(String(255))
    done = Column(Boolean, default=False)
    completed = Column(Boolean, default=False)
    archived = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "done": self.done,
            "completed": self.completed,
            "archived": self.archived,
            "created_at": self.created_at
        }


class Binarie(Base):
    __tablename__ = "binarie"

    id = Column(Integer, primary_key=True, autoincrement=True)
    day = Column(Date)
    title = Column(String(255))
    active = Column(Boolean, default=False)

    
    def to_dict(self):
        return {
            "id": self.id,
            "day": self.day,
            "title": self.title,
            "active": self.active
        }