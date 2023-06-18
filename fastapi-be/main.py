from fastapi import FastAPI

import models, crud, database

app = FastAPI()

@app.post('/rooms')
def create_room_handler(room: models.Room):
  db = database.SessionLocal()
  db_room = crud.create_room(db, room)
  db.close()
  return {"message": f'Room Id: {db_room.name} is created'}

@app.get("/rooms/{room_id}")
def get_room_handler(room_id: str):
  db = database.SessionLocal()
  room = crud.get_room(db, room_id)
  db.close()
  if room:
    return {"id": room.id, "name": room.name}
  return {"message": "Room not found"}
