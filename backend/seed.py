"""
Seed the database with real Hyderabad spots.
Run once: python seed.py
"""
import sys
sys.path.append('.')

from app.database import SessionLocal, engine, Base
from app.models import User, Spot
from app.auth import hash_password
import uuid

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Create admin user if not exists
admin = db.query(User).filter(User.username == "admin").first()
if not admin:
    admin = User(
        id=uuid.uuid4(),
        username="admin",
        email="admin@spotapp.com",
        hashed_password=hash_password("admin123"),
        role="admin"
    )
    db.add(admin)
    db.commit()
    print("✅ Admin created (admin / admin123)")

admin_id = admin.id

spots = [
    {"name": "Autumn Leaf Cafe", "category": "Cafes", "description": "Quiet cafe hidden behind a bookstore in Jubilee Hills. Great coffee, free WiFi, peaceful garden seating.", "latitude": 17.4321, "longitude": 78.4095},
    {"name": "Lamakaan", "category": "Cafes", "description": "Iconic cultural space in Banjara Hills. Affordable chai, progressive vibe, regular events. A Hyderabad institution.", "latitude": 17.4185, "longitude": 78.4138},
    {"name": "Noorani Cafe", "category": "Food", "description": "Legendary Irani chai and osmania biscuits near Charminar. Opens at 4 AM. Authentic old Hyderabad.", "latitude": 17.3609, "longitude": 78.4738},
    {"name": "Secret Lake Viewpoint", "category": "Nature", "description": "Hidden viewpoint over Durgam Cheruvu. Best at sunset. Walk through a small trail behind the rocks.", "latitude": 17.4278, "longitude": 78.3880},
    {"name": "British Library", "category": "Study", "description": "Quiet, air-conditioned library in Secunderabad. Cheap membership, good WiFi, always has empty seats.", "latitude": 17.4422, "longitude": 78.4982},
    {"name": "Moula Ali Dargah Viewpoint", "category": "Sunset", "description": "Climb 400 steps to this hilltop dargah. 360° view of Hyderabad. Incredible at sunrise and sunset.", "latitude": 17.4665, "longitude": 78.5870},
    {"name": "Qutb Shahi Tombs", "category": "Hidden Gem", "description": "Stunning 16th-century tombs near Golconda. Massively underrated. Beautiful Persian architecture.", "latitude": 17.3932, "longitude": 78.3967},
    {"name": "Midnight Biryani at Bawarchi", "category": "Food", "description": "The original Bawarchi at RTC X Roads. Open till 2 AM. Mutton biryani at midnight hits different.", "latitude": 17.3986, "longitude": 78.4835},
    {"name": "Rockscape at Khajaguda", "category": "Nature", "description": "Ancient rock formations perfect for bouldering and sunset photography. Right inside the city.", "latitude": 17.4200, "longitude": 78.3551},
    {"name": "Sailing at Hussain Sagar", "category": "Adventure", "description": "Secret sailing club at Hussain Sagar lake. Learn sailing cheap on weekends. Contact Secunderabad Sailing Club.", "latitude": 17.4233, "longitude": 78.4756},
    {"name": "Makers of Milkshakes", "category": "Food", "description": "Tiny hole-in-the-wall in Himayatnagar. Insane freakshakes and thick milkshakes. Instagram famous.", "latitude": 17.4022, "longitude": 78.4878},
    {"name": "KBR Park", "category": "Nature", "description": "Massive green lung in Banjara Hills. Great morning walks. Peacocks everywhere if you go early.", "latitude": 17.4273, "longitude": 78.4158},
    {"name": "AnTeRa Cafe & Gallery", "category": "Cafes", "description": "Art gallery + cafe in Sainikpuri. Rotating local art exhibitions. Great pour-over coffee.", "latitude": 17.4876, "longitude": 78.5592},
    {"name": "Osmania University Campus", "category": "Study", "description": "Beautiful heritage campus with quiet corners for studying outdoors. Stunning library. Open daytime.", "latitude": 17.4098, "longitude": 78.5279},
    {"name": "Taramati Baradari", "category": "Hidden Gem", "description": "12th-century caravanserai with open-air amphitheater. Stunning Persian architecture. Cultural shows weekends.", "latitude": 17.3670, "longitude": 78.3702},
]

count = 0
for s in spots:
    existing = db.query(Spot).filter(Spot.name == s["name"]).first()
    if not existing:
        spot = Spot(
            user_id=admin_id,
            name=s["name"],
            category=s["category"],
            description=s["description"],
            latitude=s["latitude"],
            longitude=s["longitude"],
            status="approved"
        )
        db.add(spot)
        count += 1

db.commit()
print(f"✅ {count} spots added!")
print(f"📊 Total spots: {db.query(Spot).count()}")
db.close()