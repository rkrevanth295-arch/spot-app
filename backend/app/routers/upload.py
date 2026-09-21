from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from .. import models, auth
from ..database import get_db
from ..s3_service import upload_photo

router = APIRouter(prefix="/upload", tags=["Upload"])

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_BYTES = 5 * 1024 * 1024


@router.post("/spot/{spot_id}")
async def upload_spot_photo(
    spot_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    if spot.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your spot")
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, or WebP photos are allowed")

    contents = await file.read()
    if len(contents) > MAX_BYTES:
        raise HTTPException(status_code=400, detail="Photo must be under 5MB")

    try:
        url = upload_photo(contents, file.filename or "photo.jpg")
    except Exception:
        raise HTTPException(status_code=500, detail="Unable to store photo")

    spot.image_url = url
    db.commit()
    return {"image_url": url}
