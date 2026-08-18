from app.routers.spots import get_spots
from app.database import SessionLocal

if __name__ == '__main__':
    db = SessionLocal()
    try:
        result = get_spots(db=db)
        print('SUCCESS', len(result))
        for spot in result[:3]:
            print(spot.id, spot.name)
    except Exception as e:
        import traceback
        traceback.print_exc()
    finally:
        db.close()
