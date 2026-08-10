"""Seed SPOT with 140 verified + approximate Hyderabad spots across 30 categories"""
import sys
sys.path.append('.')
from app.database import SessionLocal, engine, Base
from app.models import User, Spot
from app.auth import hash_password
import uuid

Base.metadata.create_all(bind=engine)
db = SessionLocal()

admin = db.query(User).filter(User.username == "admin").first()
if not admin:
    admin = User(id=uuid.uuid4(), username="admin", email="admin@spotapp.com", hashed_password=hash_password("admin123"), role="admin")
    db.add(admin)
    db.commit()

admin_id = admin.id

spots = [
    # 🌇 Sunset Points
    {"name":"Moula Ali Hilltop","category":"Sunset Points","description":"360 city skyline. Climb 400 steps. Best sunset view in Hyderabad.","latitude":17.4554,"longitude":78.5441,"verification":"approximate"},
    {"name":"Koheda Gutta Viewpoint","category":"Sunset Points","description":"Hidden hilltop with panoramic sunset. Zero crowd. Raw nature.","latitude":17.3038,"longitude":78.5656,"verification":"approximate"},
    {"name":"Khajaguda Rock View","category":"Sunset Points","description":"Ancient rock formations glowing at golden hour.","latitude":17.4029,"longitude":78.3655,"verification":"approximate"},
    {"name":"Himayat Sagar View Road","category":"Sunset Points","description":"Lake reflection sunset. Empty stretch of road. Pure silence.","latitude":17.3448,"longitude":78.3197,"verification":"approximate"},
    {"name":"Mahendra Hills Viewpoint","category":"Sunset Points","description":"Underrated sunset spot in Secunderabad. City lights after dark.","latitude":17.4584,"longitude":78.5037,"verification":"approximate"},
    {"name":"Gandipet Lake Edge","category":"Sunset Points","description":"Water reflection golden hour. Peaceful, far from city noise.","latitude":17.3912,"longitude":78.2861,"verification":"approximate"},
    {"name":"Rachakonda Fort Hilltop","category":"Sunset Points","description":"Ancient fort ruins plus sunset combo. 1hr drive, worth it.","latitude":17.2969,"longitude":78.7545,"verification":"approximate"},

    # 🌙 Late Night Runs
    {"name":"DLF Cybercity Food Lane","category":"Late Night Runs","description":"IT crowd post-shift hangout. Food open till 2 AM.","latitude":17.4394,"longitude":78.3495,"verification":"approximate"},
    {"name":"Tank Bund Midnight Stretch","category":"Late Night Runs","description":"Buddha statue plus city lights. Classic Hyderabad midnight drive.","latitude":17.4238,"longitude":78.4744,"verification":"approximate"},
    {"name":"Necklace Road Service Stretch","category":"Late Night Runs","description":"Lake on one side, city on other. Peaceful late night walk.","latitude":17.4234,"longitude":78.4637,"verification":"approximate"},

    # ☕ Cheap Thrills
    {"name":"Dimmy Pan House","category":"Cheap Thrills","description":"Legendary late-night pan shop. 100+ varieties. Sindhi Colony icon.","latitude":17.4255,"longitude":78.4915,"verification":"approximate"},
    {"name":"Famous Soda Sindhi Colony","category":"Cheap Thrills","description":"Goli soda plus ice cream combo. Rs 50 max. Nostalgia in a glass.","latitude":17.4252,"longitude":78.4910,"verification":"approximate"},
    {"name":"Sindhi Colony Snack Lane","category":"Cheap Thrills","description":"Rs 30-50 snacks. Pani puri, pav bhaji, chaat. Food coma guaranteed.","latitude":17.4258,"longitude":78.4918,"verification":"approximate"},

    # 📸 Aesthetic AF
    {"name":"Autumn Leaf Cafe","category":"Aesthetic AF","description":"Hidden garden cafe behind bookstore. Golden hour perfection.","latitude":17.4230,"longitude":78.4057,"verification":"verified"},
    {"name":"Lamakan","category":"Aesthetic AF","description":"Cultural space with courtyard. Boho aesthetic, fairy lights.","latitude":17.4167,"longitude":78.4168,"verification":"verified"},
    {"name":"The Hole In The Wall Cafe","category":"Aesthetic AF","description":"Cozy breakfast spot. Vintage decor. Instagram famous pancakes.","latitude":17.4261,"longitude":78.4127,"verification":"verified"},
    {"name":"Roastery Coffee House","category":"Aesthetic AF","description":"Minimal aesthetic. Pour-over coffee. Plant-filled courtyard.","latitude":17.4312,"longitude":78.3995,"verification":"verified"},
    {"name":"Makau","category":"Aesthetic AF","description":"Asian fusion cafe. Neon signs, mood lighting, aesthetic bowls.","latitude":17.4235,"longitude":78.4090,"verification":"approximate"},
    {"name":"Katha Cafe","category":"Aesthetic AF","description":"Book-themed cafe. Every corner is Instagram-worthy.","latitude":17.4254,"longitude":78.4078,"verification":"approximate"},
    {"name":"Sodabottleopenerwalla","category":"Aesthetic AF","description":"Parsi cafe with retro Bombay vibe. Colorful, quirky, photogenic.","latitude":17.4218,"longitude":78.4070,"verification":"verified"},

    # 🌳 Green Escape
    {"name":"Gandipet Landscape Park","category":"Green Escape","description":"Massive green space by the lake. Picnic heaven. Zero crowds.","latitude":17.3908,"longitude":78.2865,"verification":"verified"},
    {"name":"Japanese Garden Kothaguda","category":"Green Escape","description":"Zen garden hidden in IT corridor. Koi ponds, bonsai trees.","latitude":17.4585,"longitude":78.3641,"verification":"approximate"},
    {"name":"Mahavir Harina Vanasthali","category":"Green Escape","description":"Deer park. Spot blackbucks in the wild inside city limits.","latitude":17.3570,"longitude":78.5650,"verification":"verified"},
    {"name":"Palapitta Cycling Park","category":"Green Escape","description":"Dedicated cycling track in forest. Fresh air, no vehicles.","latitude":17.5101,"longitude":78.3827,"verification":"verified"},
    {"name":"Narsapur Forest Edge","category":"Green Escape","description":"Dense forest 40km from city. Weekend nature escape.","latitude":17.7350,"longitude":78.2980,"verification":"approximate"},

    # 🏛️ Old City Secrets
    {"name":"Purani Haveli Back Streets","category":"Old City Secrets","description":"Nizam old palace area. Creepy and cool. Time capsule.","latitude":17.3640,"longitude":78.4801,"verification":"approximate"},
    {"name":"Kali Kaman Lane","category":"Old City Secrets","description":"Hidden lane near Charminar. Old Hyderabadi architecture untouched.","latitude":17.3612,"longitude":78.4758,"verification":"approximate"},
    {"name":"Dargah Yousufain Lanes","category":"Old City Secrets","description":"Spiritual alleyways. Qawwali on Thursdays. Hidden gem.","latitude":17.3915,"longitude":78.4700,"verification":"approximate"},
    {"name":"Moti Darwaza Area","category":"Old City Secrets","description":"Ancient gateway area. Narrow lanes, old havelis, street food.","latitude":17.3790,"longitude":78.4780,"verification":"approximate"},
    {"name":"Toli Masjid Area","category":"Old City Secrets","description":"300-year-old mosque. Peaceful courtyard. Zero tourists.","latitude":17.3603,"longitude":78.4578,"verification":"approximate"},
    {"name":"Khursheed Jah Devdi","category":"Old City Secrets","description":"Abandoned palace. European-Indian fusion architecture.","latitude":17.3672,"longitude":78.4708,"verification":"verified"},
    {"name":"Badshahi Ashurkhana","category":"Old City Secrets","description":"400-year-old Shia shrine. Stunning Persian tile work.","latitude":17.3725,"longitude":78.4793,"verification":"verified"},

    # 🎨 Creative Corners
    {"name":"Shilparamam Artisan Lanes","category":"Creative Corners","description":"Craft village. Live pottery, weaving demos. Weekend creative hub.","latitude":17.4538,"longitude":78.3780,"verification":"approximate"},
    {"name":"Lamakaan Courtyard","category":"Creative Corners","description":"Sunday open mics. Poetry, theatre, indie music.","latitude":17.4167,"longitude":78.4168,"verification":"verified"},
    {"name":"State Gallery of Art","category":"Creative Corners","description":"Contemporary art in a stunning building. Free entry, AC halls.","latitude":17.4271,"longitude":78.4102,"verification":"verified"},
    {"name":"Kalakriti Art Gallery","category":"Creative Corners","description":"Rotating exhibitions. Indie artists. Intimate gallery space.","latitude":17.4161,"longitude":78.4194,"verification":"verified"},
    {"name":"Muse Art Gallery","category":"Creative Corners","description":"Rooftop gallery plus cafe. Art, coffee, skyline views.","latitude":17.4201,"longitude":78.4160,"verification":"approximate"},
    {"name":"Ravindra Bharathi Grounds","category":"Creative Corners","description":"Cultural complex. Dance, drama, exhibitions year-round.","latitude":17.4032,"longitude":78.4692,"verification":"verified"},

    # 🏍️ Bike Points
    {"name":"Narsapur Lake Forest Road","category":"Bike Points","description":"Forest canopy road. Twisties. Biker morning ritual.","latitude":17.7420,"longitude":78.3030,"verification":"approximate"},
    {"name":"Ananthagiri Hills Interior Roads","category":"Bike Points","description":"Ghat sections, coffee at the top. 80km of pure riding joy.","latitude":17.3415,"longitude":77.8990,"verification":"approximate"},
    {"name":"Gottam Gutta Road","category":"Bike Points","description":"Lesser-known ghat road. Zero traffic. Raw riding experience.","latitude":17.2860,"longitude":77.8600,"verification":"approximate"},
    {"name":"Konda Pochamma Reservoir Road","category":"Bike Points","description":"Long curves, dam view. Full-day ride destination.","latitude":17.6500,"longitude":78.7100,"verification":"approximate"},
    {"name":"Rachakonda Fort Road","category":"Bike Points","description":"Ancient fort road. Off-road sections. Adventure ride.","latitude":17.2970,"longitude":78.7540,"verification":"approximate"},

    # 🎧 Chill & Study
    {"name":"Naad Coffee","category":"Chill & Study","description":"Quiet corner cafe. Minimal, WiFi, power outlets. Focus mode.","latitude":17.4304,"longitude":78.3860,"verification":"approximate"},
    {"name":"Subko Coffee Jubilee Hills","category":"Chill & Study","description":"Specialty coffee. Laptop-friendly tables. Aesthetic workspace.","latitude":17.4272,"longitude":78.4074,"verification":"verified"},
    {"name":"Roast CCX","category":"Chill & Study","description":"24/7 work cafe in Gachibowli. Freelancer second home.","latitude":17.4472,"longitude":78.3754,"verification":"approximate"},
    {"name":"Lamakaan","category":"Chill & Study","description":"Daytime is all about chai and laptops. Quiet until 4 PM.","latitude":17.4167,"longitude":78.4168,"verification":"verified"},
    {"name":"Ciclo Cafe","category":"Chill & Study","description":"Cycle-themed cafe. Good coffee, quiet corners, unique vibe.","latitude":17.4350,"longitude":78.4080,"verification":"approximate"},

    # 🔥 Underrated AF
    {"name":"Koheda Gutta","category":"Underrated AF","description":"Hidden hillock with 360 view. Nobody knows about this place.","latitude":17.3038,"longitude":78.5656,"verification":"verified"},
    {"name":"Moula Ali Hill Back Trail","category":"Underrated AF","description":"Secret trail behind the dargah. Better views, zero people.","latitude":17.4562,"longitude":78.5460,"verification":"approximate"},
    {"name":"18 Sidiya Hill","category":"Underrated AF","description":"18 stepwell plus hill combo. Mysterious and unexplored.","latitude":17.3865,"longitude":78.3975,"verification":"approximate"},
    {"name":"Khajaguda Cave Cluster","category":"Underrated AF","description":"Natural caves in the rocks. Free exploration. Indiana Jones vibes.","latitude":17.4050,"longitude":78.3640,"verification":"approximate"},
    {"name":"Rachakonda Fort Trail","category":"Underrated AF","description":"Rarely visited fort. 14th century ruins. Pure exploration.","latitude":17.2970,"longitude":78.7540,"verification":"approximate"},

    # 🎉 Group Hangout
    {"name":"DLF Cybercity Eat Street","category":"Group Hangout","description":"Open-air food court. 20 plus stalls. Perfect squad dinner spot.","latitude":17.4394,"longitude":78.3495,"verification":"approximate"},
    {"name":"NTR Gardens Evening Zone","category":"Group Hangout","description":"Garden plus food stalls plus play area. Budget group outing.","latitude":17.4095,"longitude":78.4690,"verification":"approximate"},
    {"name":"Necklace Road Food Zone","category":"Group Hangout","description":"Lakeside food stalls. Evening hangout with a view.","latitude":17.4230,"longitude":78.4630,"verification":"approximate"},
    {"name":"Shilparamam","category":"Group Hangout","description":"Cultural village. Shopping plus food plus live shows.","latitude":17.4538,"longitude":78.3780,"verification":"verified"},
    {"name":"Sanjeevaiah Park","category":"Group Hangout","description":"Riverside park. Boating, walking, chai. Classic group outing.","latitude":17.4238,"longitude":78.4740,"verification":"verified"},
    {"name":"Durgam Cheruvu Walkway","category":"Group Hangout","description":"Lakeside walkway. Sunset plus snacks plus squad photos.","latitude":17.4305,"longitude":78.3860,"verification":"approximate"},
    {"name":"Palapitta Cycling Park","category":"Group Hangout","description":"Group cycling spot. Rentals available. Post-ride chai nearby.","latitude":17.5100,"longitude":78.3827,"verification":"verified"},

    # 🌧️ Monsoon Special
    {"name":"Gandipet Lake Edge","category":"Monsoon Special","description":"Full reservoir in monsoon. Misty mornings. Pure magic.","latitude":17.3912,"longitude":78.2861,"verification":"approximate"},
    {"name":"Narsapur Forest Road","category":"Monsoon Special","description":"Canopy road. Rain dripping through trees. Dreamy AF.","latitude":17.7350,"longitude":78.2980,"verification":"approximate"},
    {"name":"Ananthagiri Forest Roads","category":"Monsoon Special","description":"Coffee plantations plus rain plus mist. Weekend monsoon classic.","latitude":17.3415,"longitude":77.8990,"verification":"approximate"},
    {"name":"Koheda Gutta","category":"Monsoon Special","description":"Greenest hillock in rain. Clouds at eye level.","latitude":17.3038,"longitude":78.5656,"verification":"verified"},

    # 🛍️ Local Bazaar
    {"name":"Laad Bazaar","category":"Local Bazaar","description":"Bangle street near Charminar. Colorful chaos. Bargain hard.","latitude":17.3617,"longitude":78.4740,"verification":"verified"},
    {"name":"Begum Bazaar","category":"Local Bazaar","description":"Wholesale market. Everything from spices to sarees. Old school.","latitude":17.3768,"longitude":78.4765,"verification":"verified"},
    {"name":"Sunday Book Bazaar Abids","category":"Local Bazaar","description":"Second-hand books at throwaway prices. Bibliophile Sunday ritual.","latitude":17.3938,"longitude":78.4770,"verification":"approximate"},
    {"name":"Erragadda Sunday Market","category":"Local Bazaar","description":"Furniture, antiques, random treasures. Flea market vibes.","latitude":17.4500,"longitude":78.4310,"verification":"approximate"},
    {"name":"Moazzam Jahi Market","category":"Local Bazaar","description":"Fruit market in a heritage building. Photogenic chaos.","latitude":17.3852,"longitude":78.4733,"verification":"verified"},
    {"name":"Koti Sultan Bazaar","category":"Local Bazaar","description":"Affordable clothes, accessories. College student paradise.","latitude":17.3858,"longitude":78.4860,"verification":"verified"},
    {"name":"General Bazaar Secunderabad","category":"Local Bazaar","description":"Oldest market in Secunderabad. Electronics, clothes, spices.","latitude":17.4398,"longitude":78.4980,"verification":"verified"},

    # 🍜 Street Food Trail
    {"name":"DLF Food Street","category":"Street Food Trail","description":"Open-air food court. 20 plus stalls. Friday night ritual.","latitude":17.4394,"longitude":78.3495,"verification":"approximate"},
    {"name":"Sindhi Colony Food Lane","category":"Street Food Trail","description":"Pani puri, pav bhaji, sandwiches. Budget food paradise.","latitude":17.4255,"longitude":78.4915,"verification":"approximate"},

    # 🌊 Waterside
    {"name":"Ameenpur Lake","category":"Waterside","description":"Flamingo spot in winter. Bird watching paradise.","latitude":17.5405,"longitude":78.3470,"verification":"verified"},
    {"name":"Shamirpet Lake","category":"Waterside","description":"Deer park next to lake. Boating available. Weekend picnic.","latitude":17.5980,"longitude":78.5600,"verification":"verified"},
    {"name":"Saroornagar Lake","category":"Waterside","description":"Recently restored lake. Walking track, boating, peaceful.","latitude":17.3540,"longitude":78.5430,"verification":"verified"},
    {"name":"Khajaguda Lake","category":"Waterside","description":"Hidden lake near the rocks. Quiet, less known.","latitude":17.3980,"longitude":78.3690,"verification":"approximate"},
    {"name":"Osman Sagar Lake Edge","category":"Waterside","description":"Gandipet. The OG Hyderabad lake. Sunset plus chai combo.","latitude":17.3910,"longitude":78.2860,"verification":"approximate"},
    {"name":"Himayat Sagar Lake","category":"Waterside","description":"Bigger, quieter than Osman Sagar. Bird watchers secret.","latitude":17.3350,"longitude":78.3040,"verification":"verified"},
    {"name":"Mir Alam Tank","category":"Waterside","description":"200-year-old lake. Stunning design. Peaceful AF.","latitude":17.3450,"longitude":78.4570,"verification":"verified"},

    # 🎢 Adrenaline Zone
    {"name":"Ramoji Film City Adventure Zone","category":"Adrenaline Zone","description":"Theme park plus adventure sports. Full day adrenaline rush.","latitude":17.2543,"longitude":78.6808,"verification":"verified"},
    {"name":"Wonderla Hyderabad","category":"Adrenaline Zone","description":"Water park plus rides. Scream therapy with friends.","latitude":17.1950,"longitude":78.5290,"verification":"verified"},
    {"name":"Ananthagiri Trek Route","category":"Adrenaline Zone","description":"Forest trek to hilltop temple. Moderate difficulty.","latitude":17.3400,"longitude":77.9000,"verification":"approximate"},
    {"name":"Rachakonda Fort Trek","category":"Adrenaline Zone","description":"Ruins trek. 14th century fort. Indiana Jones vibes.","latitude":17.2970,"longitude":78.7540,"verification":"approximate"},

    # 🕯️ Late Night Eats
    {"name":"Shah Ghouse Tolichowki","category":"Late Night Eats","description":"Legendary mutton biryani. Open till 2 AM. Crowded at midnight.","latitude":17.3940,"longitude":78.4180,"verification":"verified"},
    {"name":"Nimrah Cafe Charminar","category":"Late Night Eats","description":"Irani chai plus osmania biscuits. Opens at 4 AM. Charminar view.","latitude":17.3617,"longitude":78.4740,"verification":"verified"},
    {"name":"Felfalah Tolichowki","category":"Late Night Eats","description":"Chicken 65 plus mandi after midnight. Students favorite.","latitude":17.3950,"longitude":78.4140,"verification":"approximate"},
    {"name":"DLF Cybercity Eat Street","category":"Late Night Eats","description":"IT crowd post-shift. Open-air. Biryani, rolls, chai.","latitude":17.4394,"longitude":78.3495,"verification":"approximate"},
    {"name":"Nayab Hotel Charminar Area","category":"Late Night Eats","description":"Old city late night mutton. Authentic, spicy, unforgettable.","latitude":17.3580,"longitude":78.4720,"verification":"approximate"},

    # 🎭 Culture Fix
    {"name":"Mecca Masjid Courtyard","category":"Culture Fix","description":"400-year-old mosque. Breathtaking architecture. Peaceful.","latitude":17.3616,"longitude":78.4735,"verification":"verified"},
    {"name":"Chowmahalla Palace","category":"Culture Fix","description":"Nizam palace. Chandeliers, vintage cars, royal history.","latitude":17.3598,"longitude":78.4710,"verification":"verified"},
    {"name":"Taramati Baradari","category":"Culture Fix","description":"12th-century caravanserai. Open-air theatre shows.","latitude":17.3827,"longitude":78.3940,"verification":"verified"},
    {"name":"Ravindra Bharathi","category":"Culture Fix","description":"Cultural complex. Classical dance, theatre, music festivals.","latitude":17.4032,"longitude":78.4692,"verification":"verified"},
    {"name":"Shilparamam","category":"Culture Fix","description":"Craft mela year-round. Pottery, weaving, folk performances.","latitude":17.4538,"longitude":78.3780,"verification":"verified"},
    {"name":"Lamakaan","category":"Culture Fix","description":"Sunday open mics. Poetry slams. Indie theatre. Creative hub.","latitude":17.4167,"longitude":78.4168,"verification":"verified"},
    {"name":"Nizam Museum","category":"Culture Fix","description":"Nizam wardrobe collection. World longest. Glorious past.","latitude":17.3650,"longitude":78.4800,"verification":"verified"},

    # 🌃 City Lights View
    {"name":"Khajaguda City View","category":"City Lights View","description":"Rocks plus city lights combo. Night photography spot.","latitude":17.4029,"longitude":78.3655,"verification":"approximate"},
    {"name":"Moula Ali City View","category":"City Lights View","description":"360 Hyderabad skyline. City glitter at night.","latitude":17.4554,"longitude":78.5441,"verification":"approximate"},
    {"name":"Mahendra Hills View","category":"City Lights View","description":"Underrated night view. Secunderabad lights from above.","latitude":17.4584,"longitude":78.5037,"verification":"approximate"},
    {"name":"Koheda Gutta City View","category":"City Lights View","description":"Distant city glow from a hillock. Raw, undeveloped.","latitude":17.3038,"longitude":78.5656,"verification":"approximate"},

    # 🐾 Pet-Friendly
    {"name":"Cafe De Loco","category":"Pet-Friendly","description":"Outdoor seating welcomes dogs. Water bowls provided.","latitude":17.4060,"longitude":78.3760,"verification":"approximate"},
    {"name":"The Pet Cafe Hyderabad","category":"Pet-Friendly","description":"Actual pet cafe. Bring your dog, meet others. Puppy social.","latitude":17.4160,"longitude":78.4300,"verification":"approximate"},
    {"name":"Le Vantage Cafe Bar","category":"Pet-Friendly","description":"Garden seating. Dogs welcome. Weekend brunch plus pups.","latitude":17.4300,"longitude":78.4050,"verification":"approximate"},
    {"name":"Tiger Lily Bistro","category":"Pet-Friendly","description":"Quiet bistro with outdoor area. Pet-friendly staff.","latitude":17.4250,"longitude":78.4080,"verification":"approximate"},
    {"name":"Ironhill Madhapur","category":"Pet-Friendly","description":"Massive outdoor space. Dogs can roam. Brewery plus pets.","latitude":17.4500,"longitude":78.3850,"verification":"approximate"},
    {"name":"Katha Cafe","category":"Pet-Friendly","description":"Book cafe. Quiet. Dogs allowed in outdoor section.","latitude":17.4254,"longitude":78.4078,"verification":"approximate"},

    # 🎮 Gaming Zones
    {"name":"Gamers Guild Banjara Hills","category":"Gaming Zones","description":"PS5, Xbox, VR. Hourly rates. Squad gaming sessions.","latitude":17.4150,"longitude":78.4350,"verification":"approximate"},
    {"name":"Get On Board Cafe","category":"Gaming Zones","description":"Board games plus coffee. 500 plus games. Ludo to Catan.","latitude":17.4250,"longitude":78.4080,"verification":"approximate"},
    {"name":"Game Theory Kompally","category":"Gaming Zones","description":"PC gaming cafe. LAN parties. Late night gaming.","latitude":17.5400,"longitude":78.4900,"verification":"approximate"},
    {"name":"Area 51 VR","category":"Gaming Zones","description":"VR gaming experience. Immersive, futuristic, fun.","latitude":17.4130,"longitude":78.4730,"verification":"approximate"},
    {"name":"Smaaash Hyderabad","category":"Gaming Zones","description":"Arcade plus VR plus bowling plus go-karting. Adult playground.","latitude":17.4350,"longitude":78.3830,"verification":"approximate"},
    {"name":"Timezone Inorbit","category":"Gaming Zones","description":"Classic arcade games. Bowling, bumper cars. Date spot.","latitude":17.4340,"longitude":78.3860,"verification":"verified"},
    {"name":"Timezone Sarath City","category":"Gaming Zones","description":"Newer Timezone. Less crowded. All the classics.","latitude":17.4570,"longitude":78.3660,"verification":"verified"},

    # 🏕️ Weekend Getaway
    {"name":"Ananthagiri Hills","category":"Weekend Getaway","description":"Coffee plantations, forest treks. 2hr drive. Classic getaway.","latitude":17.3415,"longitude":77.8990,"verification":"verified"},
    {"name":"Gottam Gutta","category":"Weekend Getaway","description":"Hidden hill station feel. Rock formations, zero commercialization.","latitude":17.2860,"longitude":77.8600,"verification":"approximate"},
    {"name":"Rachakonda Fort","category":"Weekend Getaway","description":"14th century fort. Trek plus history plus views. Day trip.","latitude":17.2970,"longitude":78.7540,"verification":"verified"},
    {"name":"Bhongir Fort","category":"Weekend Getaway","description":"Monolith hill fort. Steep climb, rewarding view.","latitude":17.5150,"longitude":78.8880,"verification":"verified"},
    {"name":"Pocharam Reservoir","category":"Weekend Getaway","description":"Lakeside camping. Bird watching. 2hr drive.","latitude":18.0600,"longitude":78.4300,"verification":"approximate"},
    {"name":"Konda Pochamma Reservoir","category":"Weekend Getaway","description":"Hidden reservoir. Fishing, boating, camping potential.","latitude":17.6500,"longitude":78.7100,"verification":"approximate"},
    {"name":"Narsapur Forest","category":"Weekend Getaway","description":"Dense forest. Walking trails. 1hr from city.","latitude":17.7350,"longitude":78.2980,"verification":"approximate"},

    # 🧘 Peace Out
    {"name":"Moula Ali Hill","category":"Peace Out","description":"Meditation at sunrise. 360 view. Above the chaos.","latitude":17.4554,"longitude":78.5441,"verification":"approximate"},
    {"name":"Gandipet Lake Edge","category":"Peace Out","description":"Silent mornings by the water. Birds, breeze, peace.","latitude":17.3912,"longitude":78.2861,"verification":"approximate"},
    {"name":"Japanese Garden Kothaguda","category":"Peace Out","description":"Zen garden. Koi ponds. Quietest spot in IT corridor.","latitude":17.4585,"longitude":78.3641,"verification":"approximate"},
    {"name":"KBR National Park","category":"Peace Out","description":"Massive lung space. Peacocks. Morning walks in silence.","latitude":17.4220,"longitude":78.4140,"verification":"verified"},
    {"name":"Mrugavani National Park","category":"Peace Out","description":"Deer park. Nature trails. Zero noise pollution.","latitude":17.3550,"longitude":78.3270,"verification":"verified"},
    {"name":"Palapitta Cycling Park","category":"Peace Out","description":"Forest cycling. Fresh air. Meditation spots along trail.","latitude":17.5100,"longitude":78.3827,"verification":"verified"},
    {"name":"Lotus Pond","category":"Peace Out","description":"Small quiet lake in Jubilee Hills. Lotuses, benches, calm.","latitude":17.4120,"longitude":78.4170,"verification":"approximate"},

    # 🍺 Drink & Chill
    {"name":"HyLife Brewing Company","category":"Drink & Chill","description":"Kompally craft beer. Outdoor seating, live music weekends.","latitude":17.4950,"longitude":78.3910,"verification":"approximate"},
    {"name":"The Hoppery","category":"Drink & Chill","description":"Lakeside brewery. Fresh craft beer. Great vibes.","latitude":17.4300,"longitude":78.3860,"verification":"verified"},
    {"name":"36 Downtown Brew Pub","category":"Drink & Chill","description":"Rooftop brewery. City views. Young crowd.","latitude":17.4250,"longitude":78.4070,"verification":"verified"},
    {"name":"Zythum Brewing Co","category":"Drink & Chill","description":"Gachibowli microbrewery. Tech crowd. Open-air.","latitude":17.4300,"longitude":78.4080,"verification":"verified"},
    {"name":"Prost Brewpub","category":"Drink & Chill","description":"Jubilee Hills craft beer. Rooftop, great vibes.","latitude":17.4250,"longitude":78.4070,"verification":"verified"},
    {"name":"Zero40 Brewing","category":"Drink & Chill","description":"Massive brewery. Outdoor plus indoor. Weekend party spot.","latitude":17.4250,"longitude":78.4090,"verification":"verified"},
    {"name":"Ironhill Hyderabad","category":"Drink & Chill","description":"Biggest brewery in India. Multiple bars, great food.","latitude":17.4510,"longitude":78.3840,"verification":"verified"},

    # 🎬 Movie Nights
    {"name":"Prasads Multiplex","category":"Movie Nights","description":"IMAX screen. Hyderabad iconic theatre. Nostalgia overload.","latitude":17.4100,"longitude":78.4730,"verification":"verified"},
    {"name":"AMB Cinemas","category":"Movie Nights","description":"Luxury cinema. Recliners, great sound. Premium experience.","latitude":17.4550,"longitude":78.3750,"verification":"verified"},
    {"name":"PVR RK Cineplex","category":"Movie Nights","description":"Banjara Hills classic. Multiple screens, central location.","latitude":17.4150,"longitude":78.4340,"verification":"verified"},
    {"name":"INOX GVK One","category":"Movie Nights","description":"Mall cinema. Good screens, food court next door.","latitude":17.4150,"longitude":78.4340,"verification":"verified"},
    {"name":"AAA Cinemas","category":"Movie Nights","description":"Affordable tickets. Old-school charm.","latitude":17.4400,"longitude":78.3850,"verification":"verified"},
    {"name":"Asian CineSquare Uppal","category":"Movie Nights","description":"Budget-friendly. Good screens. Uppal area.","latitude":17.4050,"longitude":78.5590,"verification":"approximate"},
    {"name":"Cinepolis Mantra Mall","category":"Movie Nights","description":"Kompally cinema. Less crowded. Good for north Hyd.","latitude":17.4900,"longitude":78.3990,"verification":"approximate"},

    # 🛹 Skate Spots
    {"name":"WallRide Park","category":"Skate Spots","description":"Dedicated skate park. Ramps, rails. Hyderabad skate hub.","latitude":17.4050,"longitude":78.3550,"verification":"approximate"},
    {"name":"Palapitta Cycling Park","category":"Skate Spots","description":"Smooth paths for skating. Mixed use.","latitude":17.5100,"longitude":78.3827,"verification":"approximate"},

    # 🌸 Instagram Bloom
    {"name":"Botanical Garden Kothaguda","category":"Instagram Bloom","description":"Bamboo groves, flower gardens. Every corner is photogenic.","latitude":17.4585,"longitude":78.3641,"verification":"verified"},
    {"name":"Lotus Pond","category":"Instagram Bloom","description":"Lotuses in full bloom. Golden hour magic. Quiet and beautiful.","latitude":17.4120,"longitude":78.4170,"verification":"approximate"},
    {"name":"Shilparamam Floral Area","category":"Instagram Bloom","description":"Seasonal flowers, craft backdrop. Colorful photos guaranteed.","latitude":17.4538,"longitude":78.3780,"verification":"approximate"},
    {"name":"Gandipet Landscape Park","category":"Instagram Bloom","description":"Green meadows plus lake. Perfect photo backdrop.","latitude":17.3908,"longitude":78.2865,"verification":"verified"},
    {"name":"NTR Gardens Flower Zone","category":"Instagram Bloom","description":"Well-maintained garden. Fountains plus flowers.","latitude":17.4095,"longitude":78.4690,"verification":"approximate"},

    # 🗿 Hidden Ruins
    {"name":"Paigah Tombs","category":"Hidden Ruins","description":"Intricate marble work. No crowds. Photography gem.","latitude":17.3370,"longitude":78.4960,"verification":"verified"},
    {"name":"Qutb Shahi Tombs","category":"Hidden Ruins","description":"106-acre heritage park. Persian architecture.","latitude":17.3950,"longitude":78.3940,"verification":"verified"},
    {"name":"18 Sidiya","category":"Hidden Ruins","description":"18 stepwell plus hill combo. Mysterious and unexplored.","latitude":17.3865,"longitude":78.3975,"verification":"approximate"},
    {"name":"Taramati Baradari","category":"Hidden Ruins","description":"12th-century caravanserai. Open-air theatre.","latitude":17.3827,"longitude":78.3940,"verification":"verified"},
    {"name":"Khursheed Jah Devdi","category":"Hidden Ruins","description":"Abandoned palace. European-Indian fusion architecture.","latitude":17.3672,"longitude":78.4708,"verification":"verified"},
    {"name":"Purani Haveli Old Structures","category":"Hidden Ruins","description":"Nizam old palace complex. Time capsule.","latitude":17.3640,"longitude":78.4801,"verification":"approximate"},
    {"name":"Toli Masjid","category":"Hidden Ruins","description":"300-year-old mosque. Peaceful courtyard.","latitude":17.3603,"longitude":78.4578,"verification":"verified"},

    # 🤝 First Date Spots
    {"name":"Autumn Leaf Cafe","category":"First Date Spots","description":"Hidden garden cafe. Cozy, quiet, perfect for conversation.","latitude":17.4230,"longitude":78.4057,"verification":"verified"},
    {"name":"Lamakaan Courtyard","category":"First Date Spots","description":"Cultural space. Chai, books, no pressure vibes.","latitude":17.4167,"longitude":78.4168,"verification":"verified"},
    {"name":"Naad Coffee","category":"First Date Spots","description":"Minimal cafe. Quiet corners. Good coffee equals good impression.","latitude":17.4304,"longitude":78.3860,"verification":"approximate"},
    {"name":"The Hole In The Wall Cafe","category":"First Date Spots","description":"Cozy breakfast spot. Vintage charm. Instagram-worthy.","latitude":17.4261,"longitude":78.4127,"verification":"verified"},
    {"name":"Durgam Cheruvu Walkway","category":"First Date Spots","description":"Lakeside walk. Sunset plus breeze. Simple but effective.","latitude":17.4305,"longitude":78.3860,"verification":"approximate"},
    {"name":"Gandipet Lake Edge","category":"First Date Spots","description":"Far from city. Quiet. Romantic sunset. Pack chai.","latitude":17.3912,"longitude":78.2861,"verification":"approximate"},
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
            verification_status=s["verification"],
            status="approved"
        )
        db.add(spot)
        count += 1

db.commit()
print(f"✅ {count} new spots added!")
print(f"📊 Total spots: {db.query(Spot).count()}")
db.close()