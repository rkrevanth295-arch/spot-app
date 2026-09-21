from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from urllib.parse import urlparse

from .. import models, schemas, auth
from ..database import get_db


def escape_like(term: str) -> str:
    return term.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def assert_safe_image_url(url: Optional[str]) -> Optional[str]:
    if not url:
        return url
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        raise HTTPException(status_code=400, detail="Invalid image URL")
    return url

router = APIRouter(prefix="/spots", tags=["Spots"])


@router.post("/", response_model=schemas.SpotResponse, status_code=status.HTTP_201_CREATED)
def create_spot(
    spot_data: schemas.SpotCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    new_spot = models.Spot(
        user_id=current_user.id,
        name=spot_data.name,
        place=spot_data.place,
        category=spot_data.category,
        description=spot_data.description,
        latitude=spot_data.latitude,
        longitude=spot_data.longitude,
        image_url=assert_safe_image_url(spot_data.image_url),
        status="approved"
    )
    db.add(new_spot)
    db.commit()
    db.refresh(new_spot)
    return new_spot


@router.get("/", response_model=List[schemas.SpotResponse])
def get_spots(
    category: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db)
):
    query = db.query(models.Spot).filter(models.Spot.status == "approved")
    if category:
        query = query.filter(models.Spot.category == category)
    return query.order_by(models.Spot.created_at.desc()).limit(limit).all()


@router.get("/search/", response_model=List[schemas.SpotResponse])
def search_spots(q: str = Query(..., min_length=2, max_length=80), db: Session = Depends(get_db)):
    term = f"%{escape_like(q.strip())}%"
    return db.query(models.Spot).filter(
        models.Spot.status == "approved",
        (models.Spot.name.ilike(term, escape="\\") | models.Spot.description.ilike(term, escape="\\") | models.Spot.category.ilike(term, escape="\\"))
    ).limit(20).all()


@router.get("/saved/mine", response_model=List[schemas.SpotResponse])
def get_saved_spots(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return db.query(models.Spot).join(models.SavedSpot, models.SavedSpot.spot_id == models.Spot.id).filter(models.SavedSpot.user_id == current_user.id).all()


@router.get("/{spot_id}", response_model=schemas.SpotResponse)
def get_spot(spot_id: str, db: Session = Depends(get_db)):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id, models.Spot.status == "approved").first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    return spot


@router.put("/{spot_id}", response_model=schemas.SpotResponse)
def update_spot(spot_id: str, spot_data: schemas.SpotCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    if spot.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your spot")
    spot.name = spot_data.name
    spot.place = spot_data.place
    spot.category = spot_data.category
    spot.description = spot_data.description
    spot.latitude = spot_data.latitude
    spot.longitude = spot_data.longitude
    spot.image_url = assert_safe_image_url(spot_data.image_url)
    db.commit()
    db.refresh(spot)
    return spot


@router.delete("/{spot_id}")
def delete_spot(spot_id: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    if spot.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your spot")
    db.delete(spot)
    db.commit()
    return {"message": "Spot deleted"}


@router.post("/{spot_id}/save", status_code=status.HTTP_201_CREATED)
def save_spot(spot_id: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    already_saved = db.query(models.SavedSpot).filter(models.SavedSpot.user_id == current_user.id, models.SavedSpot.spot_id == spot_id).first()
    if already_saved:
        raise HTTPException(status_code=400, detail="Spot already saved")
    db.add(models.SavedSpot(user_id=current_user.id, spot_id=spot_id))
    db.commit()
    return {"message": "Spot saved!"}


@router.delete("/{spot_id}/save")
def unsave_spot(spot_id: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    saved = db.query(models.SavedSpot).filter(models.SavedSpot.user_id == current_user.id, models.SavedSpot.spot_id == spot_id).first()
    if not saved:
        raise HTTPException(status_code=404, detail="Not saved")
    db.delete(saved)
    db.commit()
    return {"message": "Spot removed from saved"}

@router.get("/admin/pending", response_model=List[schemas.SpotResponse])
def get_pending_spots(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_admin)
):
    return db.query(models.Spot).filter(models.Spot.status == "pending").all()


@router.put("/admin/{spot_id}/approve", response_model=schemas.SpotResponse)
def approve_spot(
    spot_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_admin)
):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    spot.status = "approved"
    db.commit()
    db.refresh(spot)
    return spot


@router.delete("/admin/{spot_id}/reject")
def reject_spot(
    spot_id: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_admin)
):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    spot.status = "rejected"
    db.commit()
    return {"message": "Spot rejected"}
