from sqlalchemy.orm import Session

import models, database

def create_room(db: Session, room: models.Room):
    db_room = database.RoomDB(name=room.name)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

def get_room(db: Session, room_id: int):
    return db.query(database.RoomDB).filter(database.RoomDB.id == room_id).first()


