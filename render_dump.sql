--
-- PostgreSQL database dump
--

\restrict eshLHzHXUl3fXhi2MhQdFqpqThrEiMGMuu4u3G52bhpBaLMkUG8gAObPeTwcODw

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg12+1)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP INDEX IF EXISTS public.ix_users_username;
DROP INDEX IF EXISTS public.ix_users_email;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.spots DROP CONSTRAINT IF EXISTS spots_pkey;
ALTER TABLE IF EXISTS ONLY public.saved_spots DROP CONSTRAINT IF EXISTS saved_spots_pkey;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.spots;
DROP TABLE IF EXISTS public.saved_spots;
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: saved_spots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_spots (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    spot_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: spots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.spots (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    place character varying(100),
    category character varying(30) NOT NULL,
    description character varying(1000),
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    image_url character varying(500),
    status character varying(15),
    created_at timestamp with time zone DEFAULT now(),
    verification_status character varying(20)
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    hashed_password character varying NOT NULL,
    role character varying(10),
    is_active boolean,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Data for Name: saved_spots; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.saved_spots (id, user_id, spot_id, created_at) FROM stdin;
\.


--
-- Data for Name: spots; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.spots (id, user_id, name, place, category, description, latitude, longitude, image_url, status, created_at, verification_status) FROM stdin;
bb619370-6d69-48f2-8957-d5e925c010ec	87fbdada-75da-4cf5-91cc-2822b469e52c	Moula Ali Hilltop	\N	Sunset Points	360 city skyline. Climb 400 steps. Best sunset view in Hyderabad.	17.4554	78.5441	\N	approved	2026-08-20 05:41:27.251947+00	approximate
1e9b631d-657b-4479-a656-c64cdeae2016	87fbdada-75da-4cf5-91cc-2822b469e52c	Koheda Gutta Viewpoint	\N	Sunset Points	Hidden hilltop with panoramic sunset. Zero crowd. Raw nature.	17.3038	78.5656	\N	approved	2026-08-20 05:41:27.251947+00	approximate
6f2d7ace-3b4c-46d7-b414-cb890f60e016	87fbdada-75da-4cf5-91cc-2822b469e52c	Khajaguda Rock View	\N	Sunset Points	Ancient rock formations glowing at golden hour.	17.4029	78.3655	\N	approved	2026-08-20 05:41:27.251947+00	approximate
b1f91e02-cd5d-4769-8098-aeafed6a8d2c	87fbdada-75da-4cf5-91cc-2822b469e52c	Himayat Sagar View Road	\N	Sunset Points	Lake reflection sunset. Empty stretch of road. Pure silence.	17.3448	78.3197	\N	approved	2026-08-20 05:41:27.251947+00	approximate
5c1574f9-8469-4722-ada0-cf716a78bdab	87fbdada-75da-4cf5-91cc-2822b469e52c	Mahendra Hills Viewpoint	\N	Sunset Points	Underrated sunset spot in Secunderabad. City lights after dark.	17.4584	78.5037	\N	approved	2026-08-20 05:41:27.251947+00	approximate
ca7e48dd-4029-4a84-b32e-03f82e891d49	87fbdada-75da-4cf5-91cc-2822b469e52c	Gandipet Lake Edge	\N	Sunset Points	Water reflection golden hour. Peaceful, far from city noise.	17.3912	78.2861	\N	approved	2026-08-20 05:41:27.251947+00	approximate
f3b095b0-d8a3-4329-87dd-11b31a4762f2	87fbdada-75da-4cf5-91cc-2822b469e52c	Rachakonda Fort Hilltop	\N	Sunset Points	Ancient fort ruins plus sunset combo. 1hr drive, worth it.	17.2969	78.7545	\N	approved	2026-08-20 05:41:27.251947+00	approximate
48e5b2b5-e9bb-4443-9b1d-ea69ddbe791f	87fbdada-75da-4cf5-91cc-2822b469e52c	DLF Cybercity Food Lane	\N	Late Night Runs	IT crowd post-shift hangout. Food open till 2 AM.	17.4394	78.3495	\N	approved	2026-08-20 05:41:27.251947+00	approximate
4fd2db3e-4aee-496e-9ad0-74a9d38e9ef4	87fbdada-75da-4cf5-91cc-2822b469e52c	Tank Bund Midnight Stretch	\N	Late Night Runs	Buddha statue plus city lights. Classic Hyderabad midnight drive.	17.4238	78.4744	\N	approved	2026-08-20 05:41:27.251947+00	approximate
61e184c5-662e-45fb-adba-a6a5b2b45d0d	87fbdada-75da-4cf5-91cc-2822b469e52c	Necklace Road Service Stretch	\N	Late Night Runs	Lake on one side, city on other. Peaceful late night walk.	17.4234	78.4637	\N	approved	2026-08-20 05:41:27.251947+00	approximate
f7603f6e-b797-4618-8389-5580d8c76789	87fbdada-75da-4cf5-91cc-2822b469e52c	Dimmy Pan House	\N	Cheap Thrills	Legendary late-night pan shop. 100+ varieties. Sindhi Colony icon.	17.4255	78.4915	\N	approved	2026-08-20 05:41:27.251947+00	approximate
2cefbab2-5016-488f-8e9c-e465756e5c78	87fbdada-75da-4cf5-91cc-2822b469e52c	Famous Soda Sindhi Colony	\N	Cheap Thrills	Goli soda plus ice cream combo. Rs 50 max. Nostalgia in a glass.	17.4252	78.491	\N	approved	2026-08-20 05:41:27.251947+00	approximate
8b37f779-584c-4dd7-91c9-7f4aab637bdb	87fbdada-75da-4cf5-91cc-2822b469e52c	Sindhi Colony Snack Lane	\N	Cheap Thrills	Rs 30-50 snacks. Pani puri, pav bhaji, chaat. Food coma guaranteed.	17.4258	78.4918	\N	approved	2026-08-20 05:41:27.251947+00	approximate
6a6d8251-8a41-4eac-b72f-0246241b3e40	87fbdada-75da-4cf5-91cc-2822b469e52c	Autumn Leaf Cafe	\N	Aesthetic AF	Hidden garden cafe behind bookstore. Golden hour perfection.	17.423	78.4057	\N	approved	2026-08-20 05:41:27.251947+00	verified
ab011bf6-4231-4220-99fb-d60484c41ce2	87fbdada-75da-4cf5-91cc-2822b469e52c	Lamakan	\N	Aesthetic AF	Cultural space with courtyard. Boho aesthetic, fairy lights.	17.4167	78.4168	\N	approved	2026-08-20 05:41:27.251947+00	verified
9376177a-ebd4-4a9e-b084-0ab628ad1e49	87fbdada-75da-4cf5-91cc-2822b469e52c	The Hole In The Wall Cafe	\N	Aesthetic AF	Cozy breakfast spot. Vintage decor. Instagram famous pancakes.	17.4261	78.4127	\N	approved	2026-08-20 05:41:27.251947+00	verified
22fbd257-503f-48fd-8341-fadb7a8656c4	87fbdada-75da-4cf5-91cc-2822b469e52c	Roastery Coffee House	\N	Aesthetic AF	Minimal aesthetic. Pour-over coffee. Plant-filled courtyard.	17.4312	78.3995	\N	approved	2026-08-20 05:41:27.251947+00	verified
a794e1cc-c273-49d5-95a2-57913b62bea6	87fbdada-75da-4cf5-91cc-2822b469e52c	Makau	\N	Aesthetic AF	Asian fusion cafe. Neon signs, mood lighting, aesthetic bowls.	17.4235	78.409	\N	approved	2026-08-20 05:41:27.251947+00	approximate
743ef275-6e70-412b-9ded-9ac901d3a78a	87fbdada-75da-4cf5-91cc-2822b469e52c	Katha Cafe	\N	Aesthetic AF	Book-themed cafe. Every corner is Instagram-worthy.	17.4254	78.4078	\N	approved	2026-08-20 05:41:27.251947+00	approximate
b2a7b94d-1378-4c00-957a-6bfbbed8d8a0	87fbdada-75da-4cf5-91cc-2822b469e52c	Sodabottleopenerwalla	\N	Aesthetic AF	Parsi cafe with retro Bombay vibe. Colorful, quirky, photogenic.	17.4218	78.407	\N	approved	2026-08-20 05:41:27.251947+00	verified
4802d0a4-79e0-49e8-9422-12af7868f71a	87fbdada-75da-4cf5-91cc-2822b469e52c	Gandipet Landscape Park	\N	Green Escape	Massive green space by the lake. Picnic heaven. Zero crowds.	17.3908	78.2865	\N	approved	2026-08-20 05:41:27.251947+00	verified
264db13d-d25b-47e1-9844-174abb0fdc35	87fbdada-75da-4cf5-91cc-2822b469e52c	Japanese Garden Kothaguda	\N	Green Escape	Zen garden hidden in IT corridor. Koi ponds, bonsai trees.	17.4585	78.3641	\N	approved	2026-08-20 05:41:27.251947+00	approximate
362d9132-633b-4234-8b40-422e638c1bea	87fbdada-75da-4cf5-91cc-2822b469e52c	Mahavir Harina Vanasthali	\N	Green Escape	Deer park. Spot blackbucks in the wild inside city limits.	17.357	78.565	\N	approved	2026-08-20 05:41:27.251947+00	verified
558ef8bb-f7c6-4dea-b30c-1d4ec5709dd4	87fbdada-75da-4cf5-91cc-2822b469e52c	Palapitta Cycling Park	\N	Green Escape	Dedicated cycling track in forest. Fresh air, no vehicles.	17.5101	78.3827	\N	approved	2026-08-20 05:41:27.251947+00	verified
918d15ae-54b6-4fe2-ad9c-19578805fcba	87fbdada-75da-4cf5-91cc-2822b469e52c	Narsapur Forest Edge	\N	Green Escape	Dense forest 40km from city. Weekend nature escape.	17.735	78.298	\N	approved	2026-08-20 05:41:27.251947+00	approximate
1f76a4e5-47bb-4d36-aa3c-af35b4f5d485	87fbdada-75da-4cf5-91cc-2822b469e52c	Purani Haveli Back Streets	\N	Old City Secrets	Nizam old palace area. Creepy and cool. Time capsule.	17.364	78.4801	\N	approved	2026-08-20 05:41:27.251947+00	approximate
372b60a2-6e48-42b2-a383-729e09f465a9	87fbdada-75da-4cf5-91cc-2822b469e52c	Kali Kaman Lane	\N	Old City Secrets	Hidden lane near Charminar. Old Hyderabadi architecture untouched.	17.3612	78.4758	\N	approved	2026-08-20 05:41:27.251947+00	approximate
3b8598c3-53da-4ecf-a686-e27c688ac775	87fbdada-75da-4cf5-91cc-2822b469e52c	Dargah Yousufain Lanes	\N	Old City Secrets	Spiritual alleyways. Qawwali on Thursdays. Hidden gem.	17.3915	78.47	\N	approved	2026-08-20 05:41:27.251947+00	approximate
8eb07d1a-4d14-4757-b1b7-5c56224e1784	87fbdada-75da-4cf5-91cc-2822b469e52c	Moti Darwaza Area	\N	Old City Secrets	Ancient gateway area. Narrow lanes, old havelis, street food.	17.379	78.478	\N	approved	2026-08-20 05:41:27.251947+00	approximate
1fc5c476-5ee6-49f4-b0c3-75d73de81e1d	87fbdada-75da-4cf5-91cc-2822b469e52c	Toli Masjid Area	\N	Old City Secrets	300-year-old mosque. Peaceful courtyard. Zero tourists.	17.3603	78.4578	\N	approved	2026-08-20 05:41:27.251947+00	approximate
47133cdd-8413-4936-bcda-69f05c9bb2e0	87fbdada-75da-4cf5-91cc-2822b469e52c	Khursheed Jah Devdi	\N	Old City Secrets	Abandoned palace. European-Indian fusion architecture.	17.3672	78.4708	\N	approved	2026-08-20 05:41:27.251947+00	verified
263b3c22-c16c-49be-8088-10d0251ef8cf	87fbdada-75da-4cf5-91cc-2822b469e52c	Badshahi Ashurkhana	\N	Old City Secrets	400-year-old Shia shrine. Stunning Persian tile work.	17.3725	78.4793	\N	approved	2026-08-20 05:41:27.251947+00	verified
f5541a79-c644-4d34-84e9-67bb53ce44b4	87fbdada-75da-4cf5-91cc-2822b469e52c	Shilparamam Artisan Lanes	\N	Creative Corners	Craft village. Live pottery, weaving demos. Weekend creative hub.	17.4538	78.378	\N	approved	2026-08-20 05:41:27.251947+00	approximate
31b0e2ae-6c7c-46a0-83b3-b07de49eee28	87fbdada-75da-4cf5-91cc-2822b469e52c	Lamakaan Courtyard	\N	Creative Corners	Sunday open mics. Poetry, theatre, indie music.	17.4167	78.4168	\N	approved	2026-08-20 05:41:27.251947+00	verified
c610b8a9-2c2b-4d80-89b1-14e8e64ab314	87fbdada-75da-4cf5-91cc-2822b469e52c	State Gallery of Art	\N	Creative Corners	Contemporary art in a stunning building. Free entry, AC halls.	17.4271	78.4102	\N	approved	2026-08-20 05:41:27.251947+00	verified
266a8ed3-8940-46e6-b90f-952b7a9f9f15	87fbdada-75da-4cf5-91cc-2822b469e52c	Kalakriti Art Gallery	\N	Creative Corners	Rotating exhibitions. Indie artists. Intimate gallery space.	17.4161	78.4194	\N	approved	2026-08-20 05:41:27.251947+00	verified
bac98c38-c4e7-409a-a7db-3ec98559d400	87fbdada-75da-4cf5-91cc-2822b469e52c	Muse Art Gallery	\N	Creative Corners	Rooftop gallery plus cafe. Art, coffee, skyline views.	17.4201	78.416	\N	approved	2026-08-20 05:41:27.251947+00	approximate
0116807f-323f-4359-9743-1074e395dc77	87fbdada-75da-4cf5-91cc-2822b469e52c	Ravindra Bharathi Grounds	\N	Creative Corners	Cultural complex. Dance, drama, exhibitions year-round.	17.4032	78.4692	\N	approved	2026-08-20 05:41:27.251947+00	verified
46ce190b-2aba-456e-9a85-4bdd0ecebc9f	87fbdada-75da-4cf5-91cc-2822b469e52c	Narsapur Lake Forest Road	\N	Bike Points	Forest canopy road. Twisties. Biker morning ritual.	17.742	78.303	\N	approved	2026-08-20 05:41:27.251947+00	approximate
8cc2459d-8434-458a-9db7-b4c01073e9a7	87fbdada-75da-4cf5-91cc-2822b469e52c	Ananthagiri Hills Interior Roads	\N	Bike Points	Ghat sections, coffee at the top. 80km of pure riding joy.	17.3415	77.899	\N	approved	2026-08-20 05:41:27.251947+00	approximate
61fba67d-54d9-43f0-b4d0-8d3e2915a17f	87fbdada-75da-4cf5-91cc-2822b469e52c	Gottam Gutta Road	\N	Bike Points	Lesser-known ghat road. Zero traffic. Raw riding experience.	17.286	77.86	\N	approved	2026-08-20 05:41:27.251947+00	approximate
76871ed8-fa84-4fab-8367-e4040875bd04	87fbdada-75da-4cf5-91cc-2822b469e52c	Konda Pochamma Reservoir Road	\N	Bike Points	Long curves, dam view. Full-day ride destination.	17.65	78.71	\N	approved	2026-08-20 05:41:27.251947+00	approximate
f3972ddd-c81c-4bb5-8e94-f0baae7277b3	87fbdada-75da-4cf5-91cc-2822b469e52c	Rachakonda Fort Road	\N	Bike Points	Ancient fort road. Off-road sections. Adventure ride.	17.297	78.754	\N	approved	2026-08-20 05:41:27.251947+00	approximate
48d8cc82-1a00-4175-b530-e07f2d34cce9	87fbdada-75da-4cf5-91cc-2822b469e52c	Naad Coffee	\N	Chill & Study	Quiet corner cafe. Minimal, WiFi, power outlets. Focus mode.	17.4304	78.386	\N	approved	2026-08-20 05:41:27.251947+00	approximate
1829a902-29a5-410a-8e5e-918e6e28ec10	87fbdada-75da-4cf5-91cc-2822b469e52c	Subko Coffee Jubilee Hills	\N	Chill & Study	Specialty coffee. Laptop-friendly tables. Aesthetic workspace.	17.4272	78.4074	\N	approved	2026-08-20 05:41:27.251947+00	verified
513b3133-97d4-488f-9d19-11a0d14a1641	87fbdada-75da-4cf5-91cc-2822b469e52c	Roast CCX	\N	Chill & Study	24/7 work cafe in Gachibowli. Freelancer second home.	17.4472	78.3754	\N	approved	2026-08-20 05:41:27.251947+00	approximate
28081b09-f727-4e02-b900-d0e4bdf40960	87fbdada-75da-4cf5-91cc-2822b469e52c	Lamakaan	\N	Chill & Study	Daytime is all about chai and laptops. Quiet until 4 PM.	17.4167	78.4168	\N	approved	2026-08-20 05:41:27.251947+00	verified
e9dc23c0-eeb3-42c5-b77c-1e5a1cd33a45	87fbdada-75da-4cf5-91cc-2822b469e52c	Ciclo Cafe	\N	Chill & Study	Cycle-themed cafe. Good coffee, quiet corners, unique vibe.	17.435	78.408	\N	approved	2026-08-20 05:41:27.251947+00	approximate
9c8873e7-cad9-44a2-82ff-72e64eae182b	87fbdada-75da-4cf5-91cc-2822b469e52c	Koheda Gutta	\N	Underrated AF	Hidden hillock with 360 view. Nobody knows about this place.	17.3038	78.5656	\N	approved	2026-08-20 05:41:27.251947+00	verified
46e77834-fc05-4546-bb76-bb27c226d6a8	87fbdada-75da-4cf5-91cc-2822b469e52c	Moula Ali Hill Back Trail	\N	Underrated AF	Secret trail behind the dargah. Better views, zero people.	17.4562	78.546	\N	approved	2026-08-20 05:41:27.251947+00	approximate
e6b7c888-2c86-40af-b767-96a8fe4a2e3a	87fbdada-75da-4cf5-91cc-2822b469e52c	18 Sidiya Hill	\N	Underrated AF	18 stepwell plus hill combo. Mysterious and unexplored.	17.3865	78.3975	\N	approved	2026-08-20 05:41:27.251947+00	approximate
cdf13647-504f-4c50-921e-e3ef689ac18d	87fbdada-75da-4cf5-91cc-2822b469e52c	Khajaguda Cave Cluster	\N	Underrated AF	Natural caves in the rocks. Free exploration. Indiana Jones vibes.	17.405	78.364	\N	approved	2026-08-20 05:41:27.251947+00	approximate
5b4c019f-579c-4e0c-8a7c-89ec99dc3fd8	87fbdada-75da-4cf5-91cc-2822b469e52c	Rachakonda Fort Trail	\N	Underrated AF	Rarely visited fort. 14th century ruins. Pure exploration.	17.297	78.754	\N	approved	2026-08-20 05:41:27.251947+00	approximate
61f222e2-498d-43e3-9a2d-b189da9f1832	87fbdada-75da-4cf5-91cc-2822b469e52c	DLF Cybercity Eat Street	\N	Group Hangout	Open-air food court. 20 plus stalls. Perfect squad dinner spot.	17.4394	78.3495	\N	approved	2026-08-20 05:41:27.251947+00	approximate
d345f71c-124b-4865-8d85-07bc107b3c10	87fbdada-75da-4cf5-91cc-2822b469e52c	NTR Gardens Evening Zone	\N	Group Hangout	Garden plus food stalls plus play area. Budget group outing.	17.4095	78.469	\N	approved	2026-08-20 05:41:27.251947+00	approximate
4dc593ef-5ad5-426f-b4b7-1c53350c30dc	87fbdada-75da-4cf5-91cc-2822b469e52c	Necklace Road Food Zone	\N	Group Hangout	Lakeside food stalls. Evening hangout with a view.	17.423	78.463	\N	approved	2026-08-20 05:41:27.251947+00	approximate
01e5aa43-b983-4840-a3a2-84bc81bd68d9	87fbdada-75da-4cf5-91cc-2822b469e52c	Shilparamam	\N	Group Hangout	Cultural village. Shopping plus food plus live shows.	17.4538	78.378	\N	approved	2026-08-20 05:41:27.251947+00	verified
4c194818-ca26-47d6-9f08-914ca7dde971	87fbdada-75da-4cf5-91cc-2822b469e52c	Sanjeevaiah Park	\N	Group Hangout	Riverside park. Boating, walking, chai. Classic group outing.	17.4238	78.474	\N	approved	2026-08-20 05:41:27.251947+00	verified
e082e8c2-6dd9-4700-9279-d8a7655f0589	87fbdada-75da-4cf5-91cc-2822b469e52c	Durgam Cheruvu Walkway	\N	Group Hangout	Lakeside walkway. Sunset plus snacks plus squad photos.	17.4305	78.386	\N	approved	2026-08-20 05:41:27.251947+00	approximate
c9dfa903-7ccf-40eb-b222-0f80714283c5	87fbdada-75da-4cf5-91cc-2822b469e52c	Palapitta Cycling Park	\N	Group Hangout	Group cycling spot. Rentals available. Post-ride chai nearby.	17.51	78.3827	\N	approved	2026-08-20 05:41:27.251947+00	verified
e1a25d9f-38f7-496e-8bfa-0d2568a779d4	87fbdada-75da-4cf5-91cc-2822b469e52c	Gandipet Lake Edge	\N	Monsoon Special	Full reservoir in monsoon. Misty mornings. Pure magic.	17.3912	78.2861	\N	approved	2026-08-20 05:41:27.251947+00	approximate
253e5c89-040a-48f1-99a4-77c91a45bf3b	87fbdada-75da-4cf5-91cc-2822b469e52c	Narsapur Forest Road	\N	Monsoon Special	Canopy road. Rain dripping through trees. Dreamy AF.	17.735	78.298	\N	approved	2026-08-20 05:41:27.251947+00	approximate
67cf6d67-0138-4f4c-b118-58c3a186e418	87fbdada-75da-4cf5-91cc-2822b469e52c	Ananthagiri Forest Roads	\N	Monsoon Special	Coffee plantations plus rain plus mist. Weekend monsoon classic.	17.3415	77.899	\N	approved	2026-08-20 05:41:27.251947+00	approximate
e6b17dbf-d332-414f-8d5b-bd8e171cda4a	87fbdada-75da-4cf5-91cc-2822b469e52c	Koheda Gutta	\N	Monsoon Special	Greenest hillock in rain. Clouds at eye level.	17.3038	78.5656	\N	approved	2026-08-20 05:41:27.251947+00	verified
5d2960b1-f0dc-43fb-ba51-6e2d4d16c400	87fbdada-75da-4cf5-91cc-2822b469e52c	Laad Bazaar	\N	Local Bazaar	Bangle street near Charminar. Colorful chaos. Bargain hard.	17.3617	78.474	\N	approved	2026-08-20 05:41:27.251947+00	verified
5c359fdd-be34-49ea-b358-dbec05addfcd	87fbdada-75da-4cf5-91cc-2822b469e52c	Begum Bazaar	\N	Local Bazaar	Wholesale market. Everything from spices to sarees. Old school.	17.3768	78.4765	\N	approved	2026-08-20 05:41:27.251947+00	verified
2c0b9152-e304-41d8-9296-4ad8915ef46c	87fbdada-75da-4cf5-91cc-2822b469e52c	Sunday Book Bazaar Abids	\N	Local Bazaar	Second-hand books at throwaway prices. Bibliophile Sunday ritual.	17.3938	78.477	\N	approved	2026-08-20 05:41:27.251947+00	approximate
f4376a9f-92a6-44b9-9891-7240b92bf5cb	87fbdada-75da-4cf5-91cc-2822b469e52c	Erragadda Sunday Market	\N	Local Bazaar	Furniture, antiques, random treasures. Flea market vibes.	17.45	78.431	\N	approved	2026-08-20 05:41:27.251947+00	approximate
9e078c2c-3c6e-46ab-92f1-3f837eab71ab	87fbdada-75da-4cf5-91cc-2822b469e52c	Moazzam Jahi Market	\N	Local Bazaar	Fruit market in a heritage building. Photogenic chaos.	17.3852	78.4733	\N	approved	2026-08-20 05:41:27.251947+00	verified
5dc5573e-7ec4-49ed-82fb-421fa9e9b1e5	87fbdada-75da-4cf5-91cc-2822b469e52c	Koti Sultan Bazaar	\N	Local Bazaar	Affordable clothes, accessories. College student paradise.	17.3858	78.486	\N	approved	2026-08-20 05:41:27.251947+00	verified
04ab5b40-67f5-4796-bcd3-b07478cec4a5	87fbdada-75da-4cf5-91cc-2822b469e52c	General Bazaar Secunderabad	\N	Local Bazaar	Oldest market in Secunderabad. Electronics, clothes, spices.	17.4398	78.498	\N	approved	2026-08-20 05:41:27.251947+00	verified
237037fe-fb12-440c-90bc-11b221fa55b8	87fbdada-75da-4cf5-91cc-2822b469e52c	DLF Food Street	\N	Street Food Trail	Open-air food court. 20 plus stalls. Friday night ritual.	17.4394	78.3495	\N	approved	2026-08-20 05:41:27.251947+00	approximate
120ff4c4-d77c-44e1-bc48-1eb3b06828d5	87fbdada-75da-4cf5-91cc-2822b469e52c	Sindhi Colony Food Lane	\N	Street Food Trail	Pani puri, pav bhaji, sandwiches. Budget food paradise.	17.4255	78.4915	\N	approved	2026-08-20 05:41:27.251947+00	approximate
a2797de9-623d-4a65-b8df-27f359dadb79	87fbdada-75da-4cf5-91cc-2822b469e52c	Ameenpur Lake	\N	Waterside	Flamingo spot in winter. Bird watching paradise.	17.5405	78.347	\N	approved	2026-08-20 05:41:27.251947+00	verified
dfb375b1-a973-4158-b5f1-6605144e2dde	87fbdada-75da-4cf5-91cc-2822b469e52c	Shamirpet Lake	\N	Waterside	Deer park next to lake. Boating available. Weekend picnic.	17.598	78.56	\N	approved	2026-08-20 05:41:27.251947+00	verified
deb195d6-c98b-4782-a6bd-677401d7d4ab	87fbdada-75da-4cf5-91cc-2822b469e52c	Saroornagar Lake	\N	Waterside	Recently restored lake. Walking track, boating, peaceful.	17.354	78.543	\N	approved	2026-08-20 05:41:27.251947+00	verified
196e9816-673e-4518-9674-292d2dafd8a3	87fbdada-75da-4cf5-91cc-2822b469e52c	Khajaguda Lake	\N	Waterside	Hidden lake near the rocks. Quiet, less known.	17.398	78.369	\N	approved	2026-08-20 05:41:27.251947+00	approximate
354ee188-a818-49e1-823a-a661172a9a44	87fbdada-75da-4cf5-91cc-2822b469e52c	Osman Sagar Lake Edge	\N	Waterside	Gandipet. The OG Hyderabad lake. Sunset plus chai combo.	17.391	78.286	\N	approved	2026-08-20 05:41:27.251947+00	approximate
9226c687-22ec-4429-b64b-3d9582b9a631	87fbdada-75da-4cf5-91cc-2822b469e52c	Himayat Sagar Lake	\N	Waterside	Bigger, quieter than Osman Sagar. Bird watchers secret.	17.335	78.304	\N	approved	2026-08-20 05:41:27.251947+00	verified
05502914-22d7-45da-840f-87853d4bba86	87fbdada-75da-4cf5-91cc-2822b469e52c	Mir Alam Tank	\N	Waterside	200-year-old lake. Stunning design. Peaceful AF.	17.345	78.457	\N	approved	2026-08-20 05:41:27.251947+00	verified
94ba4442-ca65-4922-9692-36f7966f4daf	87fbdada-75da-4cf5-91cc-2822b469e52c	Ramoji Film City Adventure Zone	\N	Adrenaline Zone	Theme park plus adventure sports. Full day adrenaline rush.	17.2543	78.6808	\N	approved	2026-08-20 05:41:27.251947+00	verified
6f58f0bd-ec8d-4906-b22c-a7566eb9df8b	87fbdada-75da-4cf5-91cc-2822b469e52c	Wonderla Hyderabad	\N	Adrenaline Zone	Water park plus rides. Scream therapy with friends.	17.195	78.529	\N	approved	2026-08-20 05:41:27.251947+00	verified
eba8fa31-b60b-4bd5-b353-ebfd02948fe1	87fbdada-75da-4cf5-91cc-2822b469e52c	Ananthagiri Trek Route	\N	Adrenaline Zone	Forest trek to hilltop temple. Moderate difficulty.	17.34	77.9	\N	approved	2026-08-20 05:41:27.251947+00	approximate
ca62937a-df69-4ab5-ac0f-cbd04e7b4b41	87fbdada-75da-4cf5-91cc-2822b469e52c	Rachakonda Fort Trek	\N	Adrenaline Zone	Ruins trek. 14th century fort. Indiana Jones vibes.	17.297	78.754	\N	approved	2026-08-20 05:41:27.251947+00	approximate
66933822-71f0-4ae8-9203-f91e84e57fdf	87fbdada-75da-4cf5-91cc-2822b469e52c	Shah Ghouse Tolichowki	\N	Late Night Eats	Legendary mutton biryani. Open till 2 AM. Crowded at midnight.	17.394	78.418	\N	approved	2026-08-20 05:41:27.251947+00	verified
53f894bb-76fc-4ca9-a0a3-287b8cbcf659	87fbdada-75da-4cf5-91cc-2822b469e52c	Nimrah Cafe Charminar	\N	Late Night Eats	Irani chai plus osmania biscuits. Opens at 4 AM. Charminar view.	17.3617	78.474	\N	approved	2026-08-20 05:41:27.251947+00	verified
ed296be0-e74c-4db7-996b-677e1cb83531	87fbdada-75da-4cf5-91cc-2822b469e52c	Felfalah Tolichowki	\N	Late Night Eats	Chicken 65 plus mandi after midnight. Students favorite.	17.395	78.414	\N	approved	2026-08-20 05:41:27.251947+00	approximate
14abd8cf-992f-41ab-a087-79ba630fc3a5	87fbdada-75da-4cf5-91cc-2822b469e52c	DLF Cybercity Eat Street	\N	Late Night Eats	IT crowd post-shift. Open-air. Biryani, rolls, chai.	17.4394	78.3495	\N	approved	2026-08-20 05:41:27.251947+00	approximate
542e1030-68b9-46a2-9011-035424ca7264	87fbdada-75da-4cf5-91cc-2822b469e52c	Nayab Hotel Charminar Area	\N	Late Night Eats	Old city late night mutton. Authentic, spicy, unforgettable.	17.358	78.472	\N	approved	2026-08-20 05:41:27.251947+00	approximate
9e8a8285-9131-42e0-b1b8-09f1fee14cc6	87fbdada-75da-4cf5-91cc-2822b469e52c	Mecca Masjid Courtyard	\N	Culture Fix	400-year-old mosque. Breathtaking architecture. Peaceful.	17.3616	78.4735	\N	approved	2026-08-20 05:41:27.251947+00	verified
2aa77fcf-3735-49ef-8e45-bb8b9514d8dd	87fbdada-75da-4cf5-91cc-2822b469e52c	Chowmahalla Palace	\N	Culture Fix	Nizam palace. Chandeliers, vintage cars, royal history.	17.3598	78.471	\N	approved	2026-08-20 05:41:27.251947+00	verified
54eefcb9-33d8-47bb-bad7-cb1ff0ed0ada	87fbdada-75da-4cf5-91cc-2822b469e52c	Taramati Baradari	\N	Culture Fix	12th-century caravanserai. Open-air theatre shows.	17.3827	78.394	\N	approved	2026-08-20 05:41:27.251947+00	verified
aff7a580-2a9f-4185-a153-1af38da34c68	87fbdada-75da-4cf5-91cc-2822b469e52c	Ravindra Bharathi	\N	Culture Fix	Cultural complex. Classical dance, theatre, music festivals.	17.4032	78.4692	\N	approved	2026-08-20 05:41:27.251947+00	verified
c9fd201e-129b-4d48-8190-6a15a5019439	87fbdada-75da-4cf5-91cc-2822b469e52c	Shilparamam	\N	Culture Fix	Craft mela year-round. Pottery, weaving, folk performances.	17.4538	78.378	\N	approved	2026-08-20 05:41:27.251947+00	verified
7be0767a-d296-46cb-b6f1-641aa40fb076	87fbdada-75da-4cf5-91cc-2822b469e52c	Lamakaan	\N	Culture Fix	Sunday open mics. Poetry slams. Indie theatre. Creative hub.	17.4167	78.4168	\N	approved	2026-08-20 05:41:27.251947+00	verified
24586dca-687f-47eb-9ece-6d4261fc04b6	87fbdada-75da-4cf5-91cc-2822b469e52c	Nizam Museum	\N	Culture Fix	Nizam wardrobe collection. World longest. Glorious past.	17.365	78.48	\N	approved	2026-08-20 05:41:27.251947+00	verified
5b1a2206-ddef-4cc5-9989-c49deffdba5e	87fbdada-75da-4cf5-91cc-2822b469e52c	Khajaguda City View	\N	City Lights View	Rocks plus city lights combo. Night photography spot.	17.4029	78.3655	\N	approved	2026-08-20 05:41:27.251947+00	approximate
5097e13a-8ff5-4e71-a604-51c8fc5b97b5	87fbdada-75da-4cf5-91cc-2822b469e52c	Moula Ali City View	\N	City Lights View	360 Hyderabad skyline. City glitter at night.	17.4554	78.5441	\N	approved	2026-08-20 05:41:27.251947+00	approximate
42d7009a-6281-4bf7-a4cc-d6c13c0fd562	87fbdada-75da-4cf5-91cc-2822b469e52c	Mahendra Hills View	\N	City Lights View	Underrated night view. Secunderabad lights from above.	17.4584	78.5037	\N	approved	2026-08-20 05:41:27.251947+00	approximate
1b2ccae3-68cb-4a69-8138-05f9c8bdb023	87fbdada-75da-4cf5-91cc-2822b469e52c	Koheda Gutta City View	\N	City Lights View	Distant city glow from a hillock. Raw, undeveloped.	17.3038	78.5656	\N	approved	2026-08-20 05:41:27.251947+00	approximate
abd75c72-7e11-47af-895a-5262175fec32	87fbdada-75da-4cf5-91cc-2822b469e52c	Cafe De Loco	\N	Pet-Friendly	Outdoor seating welcomes dogs. Water bowls provided.	17.406	78.376	\N	approved	2026-08-20 05:41:27.251947+00	approximate
7227d4e4-0ad8-4f70-80d8-a66cd2bf8376	87fbdada-75da-4cf5-91cc-2822b469e52c	The Pet Cafe Hyderabad	\N	Pet-Friendly	Actual pet cafe. Bring your dog, meet others. Puppy social.	17.416	78.43	\N	approved	2026-08-20 05:41:27.251947+00	approximate
586b4e3c-f9b4-4ebe-a15a-6292b0c61c35	87fbdada-75da-4cf5-91cc-2822b469e52c	Le Vantage Cafe Bar	\N	Pet-Friendly	Garden seating. Dogs welcome. Weekend brunch plus pups.	17.43	78.405	\N	approved	2026-08-20 05:41:27.251947+00	approximate
68add5a2-30ce-457f-89d1-3d8fdc516abd	87fbdada-75da-4cf5-91cc-2822b469e52c	Tiger Lily Bistro	\N	Pet-Friendly	Quiet bistro with outdoor area. Pet-friendly staff.	17.425	78.408	\N	approved	2026-08-20 05:41:27.251947+00	approximate
64fd4a35-1b32-4b50-af7a-b9406b1c8866	87fbdada-75da-4cf5-91cc-2822b469e52c	Ironhill Madhapur	\N	Pet-Friendly	Massive outdoor space. Dogs can roam. Brewery plus pets.	17.45	78.385	\N	approved	2026-08-20 05:41:27.251947+00	approximate
33d481d5-bff6-4605-93d8-139a95fa628f	87fbdada-75da-4cf5-91cc-2822b469e52c	Katha Cafe	\N	Pet-Friendly	Book cafe. Quiet. Dogs allowed in outdoor section.	17.4254	78.4078	\N	approved	2026-08-20 05:41:27.251947+00	approximate
d1dcec3b-c086-4a7f-9d24-2ff7c9e68e46	87fbdada-75da-4cf5-91cc-2822b469e52c	Gamers Guild Banjara Hills	\N	Gaming Zones	PS5, Xbox, VR. Hourly rates. Squad gaming sessions.	17.415	78.435	\N	approved	2026-08-20 05:41:27.251947+00	approximate
8e8f386c-8f8d-4a83-a818-cfc67a5ccb5e	87fbdada-75da-4cf5-91cc-2822b469e52c	Get On Board Cafe	\N	Gaming Zones	Board games plus coffee. 500 plus games. Ludo to Catan.	17.425	78.408	\N	approved	2026-08-20 05:41:27.251947+00	approximate
6dd78313-13cd-4cf8-bbdd-385fd8b53021	87fbdada-75da-4cf5-91cc-2822b469e52c	Game Theory Kompally	\N	Gaming Zones	PC gaming cafe. LAN parties. Late night gaming.	17.54	78.49	\N	approved	2026-08-20 05:41:27.251947+00	approximate
5fd0e264-5c4d-4109-a1a9-52e1cb800204	87fbdada-75da-4cf5-91cc-2822b469e52c	Area 51 VR	\N	Gaming Zones	VR gaming experience. Immersive, futuristic, fun.	17.413	78.473	\N	approved	2026-08-20 05:41:27.251947+00	approximate
7c7b1803-652c-4d02-8dd1-4a6a38e53301	87fbdada-75da-4cf5-91cc-2822b469e52c	Smaaash Hyderabad	\N	Gaming Zones	Arcade plus VR plus bowling plus go-karting. Adult playground.	17.435	78.383	\N	approved	2026-08-20 05:41:27.251947+00	approximate
7279ca68-c867-412d-8ab5-5451769d4834	87fbdada-75da-4cf5-91cc-2822b469e52c	Timezone Inorbit	\N	Gaming Zones	Classic arcade games. Bowling, bumper cars. Date spot.	17.434	78.386	\N	approved	2026-08-20 05:41:27.251947+00	verified
14a9d11d-4ec0-4a35-90a3-1987020ad8d8	87fbdada-75da-4cf5-91cc-2822b469e52c	Timezone Sarath City	\N	Gaming Zones	Newer Timezone. Less crowded. All the classics.	17.457	78.366	\N	approved	2026-08-20 05:41:27.251947+00	verified
3a9dc6db-9412-4dd0-8034-f9bb6da6e1cb	87fbdada-75da-4cf5-91cc-2822b469e52c	Ananthagiri Hills	\N	Weekend Getaway	Coffee plantations, forest treks. 2hr drive. Classic getaway.	17.3415	77.899	\N	approved	2026-08-20 05:41:27.251947+00	verified
565f9d69-c656-4932-b237-da310a847649	87fbdada-75da-4cf5-91cc-2822b469e52c	Gottam Gutta	\N	Weekend Getaway	Hidden hill station feel. Rock formations, zero commercialization.	17.286	77.86	\N	approved	2026-08-20 05:41:27.251947+00	approximate
76d59215-d60d-4dae-ba86-83c9823b0ba3	87fbdada-75da-4cf5-91cc-2822b469e52c	Rachakonda Fort	\N	Weekend Getaway	14th century fort. Trek plus history plus views. Day trip.	17.297	78.754	\N	approved	2026-08-20 05:41:27.251947+00	verified
399693f6-9e02-4bf9-9adc-b339f842381b	87fbdada-75da-4cf5-91cc-2822b469e52c	Bhongir Fort	\N	Weekend Getaway	Monolith hill fort. Steep climb, rewarding view.	17.515	78.888	\N	approved	2026-08-20 05:41:27.251947+00	verified
71e5d46a-b8bd-4403-8243-504faee06586	87fbdada-75da-4cf5-91cc-2822b469e52c	Pocharam Reservoir	\N	Weekend Getaway	Lakeside camping. Bird watching. 2hr drive.	18.06	78.43	\N	approved	2026-08-20 05:41:27.251947+00	approximate
88828bb8-88ba-451b-8caa-89eefa45a5fa	87fbdada-75da-4cf5-91cc-2822b469e52c	Konda Pochamma Reservoir	\N	Weekend Getaway	Hidden reservoir. Fishing, boating, camping potential.	17.65	78.71	\N	approved	2026-08-20 05:41:27.251947+00	approximate
7cfd92a7-3c9b-46f0-9396-499d3ed5a73f	87fbdada-75da-4cf5-91cc-2822b469e52c	Narsapur Forest	\N	Weekend Getaway	Dense forest. Walking trails. 1hr from city.	17.735	78.298	\N	approved	2026-08-20 05:41:27.251947+00	approximate
a3a7d65e-55ff-45bf-bd0d-7c18aa514840	87fbdada-75da-4cf5-91cc-2822b469e52c	Moula Ali Hill	\N	Peace Out	Meditation at sunrise. 360 view. Above the chaos.	17.4554	78.5441	\N	approved	2026-08-20 05:41:27.251947+00	approximate
f70e523b-83dd-415b-89fb-f1e747715f55	87fbdada-75da-4cf5-91cc-2822b469e52c	Gandipet Lake Edge	\N	Peace Out	Silent mornings by the water. Birds, breeze, peace.	17.3912	78.2861	\N	approved	2026-08-20 05:41:27.251947+00	approximate
9442251f-7b08-4ee2-ba24-f568506b9aad	87fbdada-75da-4cf5-91cc-2822b469e52c	Japanese Garden Kothaguda	\N	Peace Out	Zen garden. Koi ponds. Quietest spot in IT corridor.	17.4585	78.3641	\N	approved	2026-08-20 05:41:27.251947+00	approximate
98c324b8-edc3-4796-bcaa-deccdc21c6df	87fbdada-75da-4cf5-91cc-2822b469e52c	KBR National Park	\N	Peace Out	Massive lung space. Peacocks. Morning walks in silence.	17.422	78.414	\N	approved	2026-08-20 05:41:27.251947+00	verified
e0a4463f-257f-4c06-accd-8f791f215887	87fbdada-75da-4cf5-91cc-2822b469e52c	Mrugavani National Park	\N	Peace Out	Deer park. Nature trails. Zero noise pollution.	17.355	78.327	\N	approved	2026-08-20 05:41:27.251947+00	verified
e490bcdf-af39-4954-a45d-4605011b0d91	87fbdada-75da-4cf5-91cc-2822b469e52c	Palapitta Cycling Park	\N	Peace Out	Forest cycling. Fresh air. Meditation spots along trail.	17.51	78.3827	\N	approved	2026-08-20 05:41:27.251947+00	verified
91a3c19c-4bd3-4fe9-af22-50bf9f080810	87fbdada-75da-4cf5-91cc-2822b469e52c	Lotus Pond	\N	Peace Out	Small quiet lake in Jubilee Hills. Lotuses, benches, calm.	17.412	78.417	\N	approved	2026-08-20 05:41:27.251947+00	approximate
486cf5b9-07e7-40fb-a18c-9193f23ff676	87fbdada-75da-4cf5-91cc-2822b469e52c	HyLife Brewing Company	\N	Drink & Chill	Kompally craft beer. Outdoor seating, live music weekends.	17.495	78.391	\N	approved	2026-08-20 05:41:27.251947+00	approximate
196f924a-f7b3-4854-b703-11b21f88502b	87fbdada-75da-4cf5-91cc-2822b469e52c	The Hoppery	\N	Drink & Chill	Lakeside brewery. Fresh craft beer. Great vibes.	17.43	78.386	\N	approved	2026-08-20 05:41:27.251947+00	verified
b79e20b4-a142-4ac4-8cd5-6f2026eeebde	87fbdada-75da-4cf5-91cc-2822b469e52c	36 Downtown Brew Pub	\N	Drink & Chill	Rooftop brewery. City views. Young crowd.	17.425	78.407	\N	approved	2026-08-20 05:41:27.251947+00	verified
5b2d5620-34bb-4159-b0f5-d1f48d714547	87fbdada-75da-4cf5-91cc-2822b469e52c	Zythum Brewing Co	\N	Drink & Chill	Gachibowli microbrewery. Tech crowd. Open-air.	17.43	78.408	\N	approved	2026-08-20 05:41:27.251947+00	verified
95e548cf-cc15-49f0-bef0-a2e0242e5330	87fbdada-75da-4cf5-91cc-2822b469e52c	Prost Brewpub	\N	Drink & Chill	Jubilee Hills craft beer. Rooftop, great vibes.	17.425	78.407	\N	approved	2026-08-20 05:41:27.251947+00	verified
003e469e-4984-4352-b692-9e6bd4a2e59c	87fbdada-75da-4cf5-91cc-2822b469e52c	Zero40 Brewing	\N	Drink & Chill	Massive brewery. Outdoor plus indoor. Weekend party spot.	17.425	78.409	\N	approved	2026-08-20 05:41:27.251947+00	verified
bea0255a-cc63-4129-92b5-d33da5e393ac	87fbdada-75da-4cf5-91cc-2822b469e52c	Ironhill Hyderabad	\N	Drink & Chill	Biggest brewery in India. Multiple bars, great food.	17.451	78.384	\N	approved	2026-08-20 05:41:27.251947+00	verified
4d476041-b488-4dc0-8869-a9778db62cd1	87fbdada-75da-4cf5-91cc-2822b469e52c	Prasads Multiplex	\N	Movie Nights	IMAX screen. Hyderabad iconic theatre. Nostalgia overload.	17.41	78.473	\N	approved	2026-08-20 05:41:27.251947+00	verified
1fe991c4-57f9-4848-967b-8b910329926e	87fbdada-75da-4cf5-91cc-2822b469e52c	AMB Cinemas	\N	Movie Nights	Luxury cinema. Recliners, great sound. Premium experience.	17.455	78.375	\N	approved	2026-08-20 05:41:27.251947+00	verified
d7e67ce6-373e-4a84-923d-245cc0919b81	87fbdada-75da-4cf5-91cc-2822b469e52c	PVR RK Cineplex	\N	Movie Nights	Banjara Hills classic. Multiple screens, central location.	17.415	78.434	\N	approved	2026-08-20 05:41:27.251947+00	verified
42a8698d-07ac-4591-b938-92e915818642	87fbdada-75da-4cf5-91cc-2822b469e52c	INOX GVK One	\N	Movie Nights	Mall cinema. Good screens, food court next door.	17.415	78.434	\N	approved	2026-08-20 05:41:27.251947+00	verified
cf6fcca7-86af-4bd4-a536-862477546f80	87fbdada-75da-4cf5-91cc-2822b469e52c	AAA Cinemas	\N	Movie Nights	Affordable tickets. Old-school charm.	17.44	78.385	\N	approved	2026-08-20 05:41:27.251947+00	verified
bbbcdf6c-196e-4b2f-9575-ec23a55bebd2	87fbdada-75da-4cf5-91cc-2822b469e52c	Asian CineSquare Uppal	\N	Movie Nights	Budget-friendly. Good screens. Uppal area.	17.405	78.559	\N	approved	2026-08-20 05:41:27.251947+00	approximate
8f52462b-b1e4-4395-928b-cd0800475e32	87fbdada-75da-4cf5-91cc-2822b469e52c	Cinepolis Mantra Mall	\N	Movie Nights	Kompally cinema. Less crowded. Good for north Hyd.	17.49	78.399	\N	approved	2026-08-20 05:41:27.251947+00	approximate
0f3b89f5-ea48-4383-8148-6d886f43690c	87fbdada-75da-4cf5-91cc-2822b469e52c	WallRide Park	\N	Skate Spots	Dedicated skate park. Ramps, rails. Hyderabad skate hub.	17.405	78.355	\N	approved	2026-08-20 05:41:27.251947+00	approximate
71aea08b-ffd8-4527-b37a-f45f6e74b68a	87fbdada-75da-4cf5-91cc-2822b469e52c	Palapitta Cycling Park	\N	Skate Spots	Smooth paths for skating. Mixed use.	17.51	78.3827	\N	approved	2026-08-20 05:41:27.251947+00	approximate
81e1ff2d-c414-4408-a36a-343234969b19	87fbdada-75da-4cf5-91cc-2822b469e52c	Botanical Garden Kothaguda	\N	Instagram Bloom	Bamboo groves, flower gardens. Every corner is photogenic.	17.4585	78.3641	\N	approved	2026-08-20 05:41:27.251947+00	verified
a3ecdb77-c2cb-4dd9-9878-20f08c30db2f	87fbdada-75da-4cf5-91cc-2822b469e52c	Lotus Pond	\N	Instagram Bloom	Lotuses in full bloom. Golden hour magic. Quiet and beautiful.	17.412	78.417	\N	approved	2026-08-20 05:41:27.251947+00	approximate
5538115c-0bfe-4a1e-8da2-94d3a5e2d30c	87fbdada-75da-4cf5-91cc-2822b469e52c	Shilparamam Floral Area	\N	Instagram Bloom	Seasonal flowers, craft backdrop. Colorful photos guaranteed.	17.4538	78.378	\N	approved	2026-08-20 05:41:27.251947+00	approximate
0571b7ab-7b87-4683-bdf3-e4a728539efd	87fbdada-75da-4cf5-91cc-2822b469e52c	Gandipet Landscape Park	\N	Instagram Bloom	Green meadows plus lake. Perfect photo backdrop.	17.3908	78.2865	\N	approved	2026-08-20 05:41:27.251947+00	verified
67d98811-0f21-44c2-9c4b-9623d343787d	87fbdada-75da-4cf5-91cc-2822b469e52c	NTR Gardens Flower Zone	\N	Instagram Bloom	Well-maintained garden. Fountains plus flowers.	17.4095	78.469	\N	approved	2026-08-20 05:41:27.251947+00	approximate
dba1886f-aff0-4168-bf1f-4bb276174ae1	87fbdada-75da-4cf5-91cc-2822b469e52c	Paigah Tombs	\N	Hidden Ruins	Intricate marble work. No crowds. Photography gem.	17.337	78.496	\N	approved	2026-08-20 05:41:27.251947+00	verified
bc0b6fde-024e-454e-9e99-c90a56adba08	87fbdada-75da-4cf5-91cc-2822b469e52c	Qutb Shahi Tombs	\N	Hidden Ruins	106-acre heritage park. Persian architecture.	17.395	78.394	\N	approved	2026-08-20 05:41:27.251947+00	verified
fac4aaaa-fc8d-46de-9b53-fec27ddae168	87fbdada-75da-4cf5-91cc-2822b469e52c	18 Sidiya	\N	Hidden Ruins	18 stepwell plus hill combo. Mysterious and unexplored.	17.3865	78.3975	\N	approved	2026-08-20 05:41:27.251947+00	approximate
1f14bf7a-d2e6-4d5b-891c-88a718d8e1ff	87fbdada-75da-4cf5-91cc-2822b469e52c	Taramati Baradari	\N	Hidden Ruins	12th-century caravanserai. Open-air theatre.	17.3827	78.394	\N	approved	2026-08-20 05:41:27.251947+00	verified
fd52ee07-b460-4f2b-9b87-b8003c04de2a	87fbdada-75da-4cf5-91cc-2822b469e52c	Khursheed Jah Devdi	\N	Hidden Ruins	Abandoned palace. European-Indian fusion architecture.	17.3672	78.4708	\N	approved	2026-08-20 05:41:27.251947+00	verified
76f727f4-5d34-444a-b7ff-048de09dcf53	87fbdada-75da-4cf5-91cc-2822b469e52c	Purani Haveli Old Structures	\N	Hidden Ruins	Nizam old palace complex. Time capsule.	17.364	78.4801	\N	approved	2026-08-20 05:41:27.251947+00	approximate
06f570ec-a178-482b-be2d-07a417ddbbce	87fbdada-75da-4cf5-91cc-2822b469e52c	Toli Masjid	\N	Hidden Ruins	300-year-old mosque. Peaceful courtyard.	17.3603	78.4578	\N	approved	2026-08-20 05:41:27.251947+00	verified
c7164993-08f6-4cb3-9ec3-575e50530f15	87fbdada-75da-4cf5-91cc-2822b469e52c	Autumn Leaf Cafe	\N	First Date Spots	Hidden garden cafe. Cozy, quiet, perfect for conversation.	17.423	78.4057	\N	approved	2026-08-20 05:41:27.251947+00	verified
1fd09a51-ea21-401d-9cce-d9bd0b65b5c2	87fbdada-75da-4cf5-91cc-2822b469e52c	Lamakaan Courtyard	\N	First Date Spots	Cultural space. Chai, books, no pressure vibes.	17.4167	78.4168	\N	approved	2026-08-20 05:41:27.251947+00	verified
dd99d74b-be53-449c-a9d3-98e69514ced3	87fbdada-75da-4cf5-91cc-2822b469e52c	Naad Coffee	\N	First Date Spots	Minimal cafe. Quiet corners. Good coffee equals good impression.	17.4304	78.386	\N	approved	2026-08-20 05:41:27.251947+00	approximate
b1825cdc-8372-4222-8d4e-dc2d1bc6989d	87fbdada-75da-4cf5-91cc-2822b469e52c	The Hole In The Wall Cafe	\N	First Date Spots	Cozy breakfast spot. Vintage charm. Instagram-worthy.	17.4261	78.4127	\N	approved	2026-08-20 05:41:27.251947+00	verified
c0a9fffa-1c75-43ae-b48d-6577d826416a	87fbdada-75da-4cf5-91cc-2822b469e52c	Durgam Cheruvu Walkway	\N	First Date Spots	Lakeside walk. Sunset plus breeze. Simple but effective.	17.4305	78.386	\N	approved	2026-08-20 05:41:27.251947+00	approximate
01865cf9-81ce-416a-a0a7-8e0aad0e7346	87fbdada-75da-4cf5-91cc-2822b469e52c	Gandipet Lake Edge	\N	First Date Spots	Far from city. Quiet. Romantic sunset. Pack chai.	17.3912	78.2861	\N	approved	2026-08-20 05:41:27.251947+00	approximate
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, email, hashed_password, role, is_active, created_at) FROM stdin;
87fbdada-75da-4cf5-91cc-2822b469e52c	admin	admin@spotapp.com	$2b$12$fjxG9Sgx29LHq8P7v7l.2u2M26vsnIbVLTU0/SYZVTVgndzGfL/jK	admin	t	2026-08-20 05:41:26.828102+00
\.


--
-- Name: saved_spots saved_spots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_spots
    ADD CONSTRAINT saved_spots_pkey PRIMARY KEY (id);


--
-- Name: spots spots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- PostgreSQL database dump complete
--

\unrestrict eshLHzHXUl3fXhi2MhQdFqpqThrEiMGMuu4u3G52bhpBaLMkUG8gAObPeTwcODw

