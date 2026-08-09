from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from .. import models, auth
from ..database import get_db
from ..s3_service import upload_photo

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/spot/{spot_id}")
async def upload_spot_photo(
    spot_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Upload a photo for a spot"""
    spot = db.query(models.Spot).filter(models.Spot.id == spot_id).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    if spot.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your spot")
    
    contents = await file.read()
    url = upload_photo(contents, file.filename)
    
    spot.image_url = url
    db.commit()
    
    return {"image_url": url}