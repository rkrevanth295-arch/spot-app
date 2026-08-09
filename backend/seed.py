"""Seed 100 Hyderabad spots across 16 categories"""
import sys
sys.path.append('.')
from app.database import SessionLocal, engine, Base
from app.models import User, Spot
from app.auth import hash_password
import uuid

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Admin user
admin = db.query(User).filter(User.username == "admin").first()
if not admin:
    admin = User(id=uuid.uuid4(), username="admin", email="admin@spotapp.com", hashed_password=hash_password("admin123"), role="admin")
    db.add(admin)
    db.commit()

admin_id = admin.id

spots = [
    # ☕ Cafes
    {"name":"Autumn Leaf Cafe","category":"Cafes","description":"Hidden behind a bookstore in Jubilee Hills. Garden seating, great coffee, free WiFi. Perfect for reading or working.","latitude":17.4321,"longitude":78.4095},
    {"name":"Lamakaan","category":"Cafes","description":"Iconic cultural space in Banjara Hills. Affordable chai, progressive vibe, regular events and open mics.","latitude":17.4185,"longitude":78.4138},
    {"name":"AnTeRa Cafe & Gallery","category":"Cafes","description":"Art gallery + cafe in Sainikpuri. Rotating local art, pour-over coffee, far from city chaos.","latitude":17.4876,"longitude":78.5592},
    {"name":"Roast 24 Seven","category":"Cafes","description":"Gachibowli 24/7 cafe. Freelancer heaven, unlimited WiFi, power outlets everywhere.","latitude":17.4408,"longitude":78.3483},
    {"name":"The Coffee Cup","category":"Cafes","description":"Vintage rooftop cafe in Secunderabad. Old-school charm, chai, books, quiet corners.","latitude":17.4422,"longitude":78.4982},
    {"name":"Feu","category":"Cafes","description":"Banjara Hills dessert bar with mood lighting. Lava cakes, late night conversations.","latitude":17.4156,"longitude":78.4350},
    {"name":"Third Wave Coffee","category":"Cafes","description":"Jubilee Hills specialty brews. Pour-over, cold brew, minimal aesthetic.","latitude":17.4310,"longitude":78.4080},
    {"name":"True Black","category":"Cafes","description":"Kondapur minimal cafe. Strong espresso, black interiors, laptop-friendly.","latitude":17.4620,"longitude":78.3560},

    # 🍔 Street Eats
    {"name":"Noorani Cafe","category":"Street Eats","description":"Legendary 4 AM Irani chai near Charminar. Osmania biscuits, authentic old Hyderabad.","latitude":17.3609,"longitude":78.4738},
    {"name":"Midnight Biryani at Bawarchi","category":"Street Eats","description":"Original Bawarchi at RTC X Roads. Open till 2 AM. Mutton biryani at midnight hits different.","latitude":17.3986,"longitude":78.4835},
    {"name":"Makers of Milkshakes","category":"Street Eats","description":"Tiny hole-in-the-wall in Himayatnagar. Insane freakshakes, Instagram famous.","latitude":17.4022,"longitude":78.4878},
    {"name":"Ram ki Bandi","category":"Street Eats","description":"MJ Market 2 AM dosa spot. Butter overload. Post-party ritual.","latitude":17.3850,"longitude":78.4750},
    {"name":"Govind Dosa","category":"Street Eats","description":"Charminar 3 AM. 50 types of dosas. Legendary street food institution.","latitude":17.3610,"longitude":78.4740},
    {"name":"Narsingh Chai","category":"Street Eats","description":"Abids 3 AM chai spot. Bun maska, cigarette chai, old city vibes.","latitude":17.3920,"longitude":78.4720},
    {"name":"Gokul Chat","category":"Street Eats","description":"Koti's best pani puri. Street-style chaat. Crowded, chaotic, worth it.","latitude":17.3855,"longitude":78.4830},
    {"name":"Shah Ghouse","category":"Street Eats","description":"Toli Chowki late-night mutton biryani. Spicy, greasy, legendary after 2 AM.","latitude":17.3950,"longitude":78.4250},

    # 🌿 Nature Fix
    {"name":"Secret Lake Viewpoint","category":"Nature Fix","description":"Hidden viewpoint over Durgam Cheruvu. Best at sunset. Walk through small trail behind rocks.","latitude":17.4278,"longitude":78.3880},
    {"name":"KBR Park","category":"Nature Fix","description":"Massive green lung in Banjara Hills. Morning walks, peacocks everywhere if you go early.","latitude":17.4273,"longitude":78.4158},
    {"name":"Rockscape at Khajaguda","category":"Nature Fix","description":"Ancient rock formations. Bouldering, sunset photography. Right inside the city.","latitude":17.4200,"longitude":78.3551},
    {"name":"Gandipet Lake","category":"Nature Fix","description":"Osman Sagar. Peaceful, less crowded than city lakes. Good for evening drives.","latitude":17.3680,"longitude":78.3250},
    {"name":"Mrugavani National Park","category":"Nature Fix","description":"Chilkur deer park. Nature trails, bird watching, morning safaris.","latitude":17.3450,"longitude":78.2850},
    {"name":"Botanical Garden","category":"Nature Fix","description":"Kondapur bamboo groves. Peaceful walks, medicinal plants, butterfly garden.","latitude":17.4550,"longitude":78.3700},
    {"name":"Ameenpur Lake","category":"Nature Fix","description":"Flamingos in winter. Hidden bird sanctuary. Photography paradise.","latitude":17.5200,"longitude":78.2900},
    {"name":"Fox Sagar Lake","category":"Nature Fix","description":"Kompally hidden lake. Fishing, bird watching, zero crowds.","latitude":17.5000,"longitude":78.5100},

    # 📚 Study Mode
    {"name":"British Library","category":"Study Mode","description":"Secunderabad. Quiet, AC, cheap membership. Always has empty seats unlike cafes.","latitude":17.4422,"longitude":78.4982},
    {"name":"Osmania University Library","category":"Study Mode","description":"Heritage campus library. Quiet corners, stunning architecture, open daytime.","latitude":17.4098,"longitude":78.5279},
    {"name":"T-Hub","category":"Study Mode","description":"Gachibowli startup incubator. Free WiFi, startup energy, meeting rooms.","latitude":17.4450,"longitude":78.3700},
    {"name":"IKEA Cafe","category":"Study Mode","description":"HITEC City. Unlimited coffee refills, quiet corners, AC. Unexpected study gem.","latitude":17.4500,"longitude":78.3800},
    {"name":"Hyderabad Central Library","category":"Study Mode","description":"Afzal Gunj historic library. Silent sections, old-world charm, serious students only.","latitude":17.3650,"longitude":78.4750},
    {"name":"Lamakaan Daytime","category":"Study Mode","description":"Banjara Hills. Work-friendly chai spot before evening events start.","latitude":17.4185,"longitude":78.4138},

    # 💕 Date Spot
    {"name":"Taramati Baradari","category":"Date Spot","description":"12th century caravanserai. Open-air amphitheater, stunning sunset dates.","latitude":17.3670,"longitude":78.3702},
    {"name":"Moula Ali Dargah Viewpoint","category":"Date Spot","description":"400 steps to 360° Hyderabad view. Sunrise dates, foggy mornings.","latitude":17.4665,"longitude":78.5870},
    {"name":"Olive Bistro","category":"Date Spot","description":"Durgam Cheruvu lakeside. Fairy lights, candlelight, lake view. Romantic AF.","latitude":17.4280,"longitude":78.3880},
    {"name":"Jewel of Nizam","category":"Date Spot","description":"Golconda fine dining. Royal vibes, Nizami cuisine, special occasion spot.","latitude":17.3850,"longitude":78.4000},
    {"name":"Durgam Cheruvu Lake Walk","category":"Date Spot","description":"Evening breeze, boating, street food nearby. Simple but effective date.","latitude":17.4270,"longitude":78.3870},
    {"name":"Ohri's Gufaa","category":"Date Spot","description":"Banjara Hills cave-themed dining. Dark, intimate, unique experience.","latitude":17.4160,"longitude":78.4360},
    {"name":"Water Front","category":"Date Spot","description":"Necklace Road candlelight by water. Hussain Sagar view, evening breeze.","latitude":17.4250,"longitude":78.4700},
    {"name":"Mist","category":"Date Spot","description":"Gachibowli poolside lounge. Cabana seating, mood lights, premium.","latitude":17.4420,"longitude":78.3500},

    # 🏍️ Biker Trails
    {"name":"Ananthagiri Hills","category":"Biker Trails","description":"80km from Hyd. Ghat sections, morning rides, coffee at the top.","latitude":17.3000,"longitude":77.8800},
    {"name":"Chevella Road","category":"Biker Trails","description":"Smooth tarmac, weekend biker meetups. Long stretches, minimal traffic.","latitude":17.3100,"longitude":78.1350},
    {"name":"ORR Late Night","category":"Biker Trails","description":"Outer Ring Road after midnight. Speed runs, open road, city lights.","latitude":17.4200,"longitude":78.3000},
    {"name":"Nagarjuna Sagar Highway","category":"Biker Trails","description":"Long curves, dam view at the end. Full day ride.","latitude":16.7500,"longitude":79.1000},
    {"name":"Osman Sagar Loop","category":"Biker Trails","description":"Short 30-min ride. Lake breeze, chai at the end.","latitude":17.3680,"longitude":78.3250},
    {"name":"Vikarabad Forest Route","category":"Biker Trails","description":"Twisty roads through canopy. Monsoon magic.","latitude":17.3400,"longitude":77.9000},

    # 📸 Photoshoot
    {"name":"Qutb Shahi Tombs","category":"Photoshoot","description":"Persian architecture, golden hour magic. Massively underrated.","latitude":17.3932,"longitude":78.3967},
    {"name":"Ameerpet Metro Art Wall","category":"Photoshoot","description":"Graffiti and street art. Colorful backdrops, street style shoots.","latitude":17.4350,"longitude":78.4450},
    {"name":"Paigah Tombs","category":"Photoshoot","description":"Intricate marble work. No crowds. Hidden photography gem.","latitude":17.3450,"longitude":78.5100},
    {"name":"Koti Women's College","category":"Photoshoot","description":"Gothic architecture. Vintage vibes. Old Hyderabad aesthetic.","latitude":17.3850,"longitude":78.4830},
    {"name":"Charminar 5 AM","category":"Photoshoot","description":"Empty streets, fog, pigeons. The iconic shot nobody else gets.","latitude":17.3616,"longitude":78.4747},
    {"name":"Falaknuma Palace","category":"Photoshoot","description":"Royalty backdrop. Palace hotel, stunning architecture.","latitude":17.3300,"longitude":78.4650},
    {"name":"Numaish","category":"Photoshoot","description":"Jan-Feb only. Carnival lights, neon, crowd energy.","latitude":17.3850,"longitude":78.4750},

    # 🍃 Smoke Spot
    {"name":"Khajaguda Hilltop","category":"Smoke Spot","description":"Wind, view, no interruptions. The classic spot.","latitude":17.4200,"longitude":78.3551},
    {"name":"Durgam Cheruvu Back Trail","category":"Smoke Spot","description":"Hidden trail, lake breeze, private.","latitude":17.4280,"longitude":78.3890},
    {"name":"ORR Service Road","category":"Smoke Spot","description":"Empty, dark, open sky. Late night solitude.","latitude":17.4500,"longitude":78.3100},
    {"name":"Gandipet Dam Midnight","category":"Smoke Spot","description":"Water sound, stars, no lights.","latitude":17.3680,"longitude":78.3250},
    {"name":"Taramati Baradari Parking","category":"Smoke Spot","description":"After hours, quiet, view of the monument.","latitude":17.3670,"longitude":78.3700},
    {"name":"Narsingi Hill","category":"Smoke Spot","description":"New development area. City lights view, empty roads.","latitude":17.3900,"longitude":78.3500},

    # 🌅 Sunset Point
    {"name":"Moula Ali Hilltop","category":"Sunset Point","description":"360° Hyderabad skyline. Sunset and city lights.","latitude":17.4665,"longitude":78.5870},
    {"name":"Golconda Fort Top","category":"Sunset Point","description":"Panoramic golden light. The classic Hyderabad sunset.","latitude":17.3833,"longitude":78.4011},
    {"name":"Osman Sagar Dam","category":"Sunset Point","description":"Water reflection sunset. Peaceful, far from city noise.","latitude":17.3680,"longitude":78.3250},
    {"name":"KBR Park Hill","category":"Sunset Point","description":"Quick access. Golden hour through trees.","latitude":17.4273,"longitude":78.4158},
    {"name":"Durgam Cheruvu West Bank","category":"Sunset Point","description":"Hidden bench. Best sunset reflection on water.","latitude":17.4278,"longitude":78.3880},
    {"name":"Narsingi Lake","category":"Sunset Point","description":"New spot. Clean view, less crowded.","latitude":17.3900,"longitude":78.3500},

    # 💎 Hidden Gem
    {"name":"Qutb Shahi Heritage Park","category":"Hidden Gem","description":"100+ tombs spread over acres. Zero tourists. Explore for hours.","latitude":17.3930,"longitude":78.3970},
    {"name":"Bansilalpet Stepwell","category":"Hidden Gem","description":"Restored ancient stepwell. Stunning architecture, hidden in plain sight.","latitude":17.4250,"longitude":78.4800},
    {"name":"Raymond's Tomb","category":"Hidden Gem","description":"French architect's tomb hidden inside NPA. Spooky and beautiful.","latitude":17.4350,"longitude":78.4600},
    {"name":"Spanish Mosque","category":"Hidden Gem","description":"Begumpet. Stunning Moorish architecture. Open to all.","latitude":17.4400,"longitude":78.4650},
    {"name":"Purani Haveli","category":"Hidden Gem","description":"Nizam's museum. Creepy and cool. Longest wardrobe in the world.","latitude":17.3700,"longitude":78.4800},
    {"name":"Mah Laqa Bai Tomb","category":"Hidden Gem","description":"Only female poet's tomb in Hyd. Secret, peaceful, historic.","latitude":17.3900,"longitude":78.4900},
    {"name":"British Residency","category":"Hidden Gem","description":"Koti. Abandoned colonial building. Urbex paradise.","latitude":17.3850,"longitude":78.4830},

    # 🎉 Night Out
    {"name":"Prost","category":"Night Out","description":"Jubilee Hills craft beer. Rooftop, young crowd, great vibes.","latitude":17.4310,"longitude":78.4100},
    {"name":"Zythum","category":"Night Out","description":"Gachibowli microbrewery. Fresh beer, open air, tech crowd.","latitude":17.4420,"longitude":78.3480},
    {"name":"10 Downing Street","category":"Night Out","description":"Begumpet retro pub. Old Hyderabad charm, cheap drinks.","latitude":17.4400,"longitude":78.4700},
    {"name":"Prism","category":"Night Out","description":"Banjara Hills rooftop. EDM nights, skyline views.","latitude":17.4160,"longitude":78.4350},
    {"name":"Over The Moon","category":"Night Out","description":"HITEC City skyline bar. Swanky, expensive, worth it.","latitude":17.4500,"longitude":78.3800},
    {"name":"Heart Cup Coffee","category":"Night Out","description":"Live music, open mic nights, indie vibes.","latitude":17.4400,"longitude":78.3500},

    # 🛹 Skate/Street
    {"name":"Necklace Road Parking","category":"Skate/Street","description":"Flat surface, late night skating spot.","latitude":17.4250,"longitude":78.4700},
    {"name":"HITEC City MMTS Plaza","category":"Skate/Street","description":"Open plaza after hours. Street skating.","latitude":17.4500,"longitude":78.3800},
    {"name":"Khajaguda Rocks","category":"Skate/Street","description":"Natural bouldering. Street climbing culture.","latitude":17.4200,"longitude":78.3551},
    {"name":"Shilparamam","category":"Skate/Street","description":"Open spaces, cultural backdrop. Skating and photography.","latitude":17.4520,"longitude":78.3750},

    # 🎵 Live Music
    {"name":"Lamakaan Open Mic","category":"Live Music","description":"Sunday open mics. Poetry, music, comedy.","latitude":17.4185,"longitude":78.4138},
    {"name":"Heart Cup Coffee","category":"Live Music","description":"Weekend gigs, indie bands, intimate venue.","latitude":17.4400,"longitude":78.3500},
    {"name":"The Moonshine Project","category":"Live Music","description":"Live bands, indie, rock. Great food + music combo.","latitude":17.4350,"longitude":78.4100},
    {"name":"Hard Rock Cafe","category":"Live Music","description":"HITEC City tribute nights. Classic rock, burgers.","latitude":17.4500,"longitude":78.3800},

    # 🏃 Run/Walk
    {"name":"KBR Park Loop","category":"Run/Walk","description":"4km loop, peacocks, shaded. The classic Hyderabad walk.","latitude":17.4273,"longitude":78.4158},
    {"name":"Necklace Road","category":"Run/Walk","description":"6km lake view stretch. Sunrise runs, evening walks.","latitude":17.4250,"longitude":78.4700},
    {"name":"Sanjeevaiah Park","category":"Run/Walk","description":"Riverside trail. Peaceful, less crowded than KBR.","latitude":17.4400,"longitude":78.4800},
    {"name":"Durgam Cheruvu Loop","category":"Run/Walk","description":"2.5km evening loop. Lake breeze, street food after.","latitude":17.4270,"longitude":78.3870},
    {"name":"OU Campus","category":"Run/Walk","description":"Endless shaded paths. Heritage buildings, quiet roads.","latitude":17.4098,"longitude":78.5279},

    # 🧘 Peace Mode
    {"name":"Buddha Statue","category":"Peace Mode","description":"Hussain Sagar. Sunrise meditation, city waking up.","latitude":17.4150,"longitude":78.4750},
    {"name":"Sanghi Temple","category":"Peace Mode","description":"Hilltop temple. Panoramic view, peaceful vibes.","latitude":17.2700,"longitude":78.6300},
    {"name":"Chilkur Balaji","category":"Peace Mode","description":"11km peaceful walk. Spiritual, no donations accepted.","latitude":17.3500,"longitude":78.2900},
    {"name":"Mahavir Harina Vanasthali","category":"Peace Mode","description":"Deer park. Silence, nature, walking trails.","latitude":17.3700,"longitude":78.5500},
    {"name":"Ameenpur Lake","category":"Peace Mode","description":"Bird sounds, solitude, flamingos in winter.","latitude":17.5200,"longitude":78.2900},

    # 🎯 Gaming Zone
    {"name":"Playmax","category":"Gaming Zone","description":"Gachibowli. PS5, VR, LAN gaming. Late night sessions.","latitude":17.4400,"longitude":78.3480},
    {"name":"Gamepoint","category":"Gaming Zone","description":"Banjara Hills. Pool tables + gaming stations.","latitude":17.4160,"longitude":78.4350},
    {"name":"Rush","category":"Gaming Zone","description":"Inorbit Mall. Bowling + arcade. Weekend fun.","latitude":17.4350,"longitude":78.3900},

    # 🌧️ Rainy Day
    {"name":"Salar Jung Museum","category":"Rainy Day","description":"One of world's largest collections. Spend hours exploring.","latitude":17.3710,"longitude":78.4800},
    {"name":"Nizam's Museum","category":"Rainy Day","description":"Royal artifacts, AC, history overdose.","latitude":17.3700,"longitude":78.4800},
    {"name":"Birla Planetarium","category":"Rainy Day","description":"Space vibes, AC, cheap tickets. Rainy day classic.","latitude":17.4000,"longitude":78.4700},
]

count = 0
for s in spots:
    existing = db.query(Spot).filter(Spot.name == s["name"]).first()
    if not existing:
        spot = Spot(user_id=admin_id, name=s["name"], category=s["category"], description=s["description"], latitude=s["latitude"], longitude=s["longitude"], status="approved")
        db.add(spot)
        count += 1

db.commit()
print(f"✅ {count} new spots added!")
print(f"📊 Total spots: {db.query(Spot).count()}")
db.close()