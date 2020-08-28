# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.destroy_all
Brand.destroy_all
Category.destroy_all

BRANDS = ["A Pet's Life", 'A&E Cage Company', 'AA Aquarium', 'ACANA', 'Acurel', 'Adams', 'Adaptil', 'Adequan Canine', 'Adequan Equine', 'Advantage', 'Advantek', 
'Advantus', 'Advecta', 'Albon', 'All Four Paws', 'All-Glass', 'American Cat Club', 'American Pet', 'Amici Home', 'Amitriptyline', 'Amlodipine Besylate', 'Amoxicillin', 
'Andis', "Angels' Eyes", 'Animax', 'Animaze', 'Anipryl', 'API', 'Apoquel', 'Applaws', 'AQAMAI', 'Aqua Euro USA', 'Aqua Natural', 'Aquabella', 'Aquapaw', 'Aquatic Fundamentals', 
'Aquatic Life', 'Aqueon', 'Arm & Hammer', 'Armarkat', 'As Seen on TV', 'ASL', 'ASPCA', 'Atenolol', 'ATM', 'Atopica', 'Aussie Naturals', 'Avery', 'Avian Adventures', 'AvoDerm', 
'AWESOME PAWSOME', 'Bags on Board', 'Bamboo', 'Bark', 'Bark-A-Boo', 'Barklogic', 'Barkworthies', 'Baskerville', 'Bayer', 'Baytril', 'Be Good', 'Be One Breed', 'Beast & Buckle', 
'Beco Pet', 'Belle Fleur', 'Benazepril', 'Benebone', 'Bergan', 'Bessie and Barnie', 'Better Belly', 'Bio Spot', 'BioBag USA', 'Bionic', 'biOrb', 'Biosilk', 'Bison Pet', 
'Bissell', 'biUbe', 'Black Flag', 'Blue Buffalo', 'Blue Ribbon Pet', 'Blue Ridge Naturals', 'BOBS', "Bocce's Bakery", 'Bond & Co', 'Booda', 'Bootique', 'Bowlmates', 'Boxiecat', 
'BoxiePro', 'Boyd Enterprises', 'Bravecto', 'Brilliant Pad', 'Bristly', 'Bronchicine CAe', "Brown's", 'Brutus Bone Broths', 'Buckle-Down', 'Bungalow Flooring', "Burt's Bees", 
'Caitec', 'Caldera', 'Cali Vinyl', 'Calm Paws', 'Calmz', 'Canidae', 'CapAction', 'Capstar', 'Cardinal', 'Cardinal Gates', 'Carefresh', 'CaribSea', 'Carlson Pet Products', 
'Carolina Pet Company', 'Carprofen', 'CARU', 'Castor & Pollux', 'Cat Dancer', 'Cat-Sip', 'CatastrophiCreations', 'CatGenie', 'Catit', 'Cats Claws', 'Cephalexin', 'Cerenia', 
'Cesar', 'Charlee Bear', "Charlotte's Web", 'Cheristin', 'Chew King', 'Chuckit!', 'Circle T', 'Clavamox', 'Cleanze', 'Clemastine', 'ClindaMed', 'Clindamycin', 'Clomicalm', 
'Clorox', 'Cloud Star', 'Coastal Pet', 'Cobalt', 'Cold Life', 'Coleman', 'Comfort Zone', 'Comfortis', 'Conceptual Creations', 'Contech', 'Coolaroo', 'Coralife', 'Cosequin', 
'Cozy Products', 'Crave', 'Crazy Dog', 'Credelio', 'CueCuePet', 'Current USA', 'Custom Personalization Solutions', 'Cyclosporine', 'Cyproheptadine', 'daily dose', 'Dallas Manufacturing', 
'DASUQUIN', 'DC Comics', 'Deramaxx', 'Dexamethasone', 'Dexas', 'Diamond Naturals', 'Dig Defence', 'Digoxin', 'Diltiazem', 'Dog Gone Smart', 'Dog Helios', 'Doggie Dooley', 'Doggles', 
'Dogness', 'Dogs Rock', 'Dogswell', 'Dogtra', 'DOOG', 'Dorzolamide', 'Doxycycline', "Dr. Elsey's", 'Droncit', 'Drontal', 'Drontal Plus', 'Drs. Foster and Smith', 'Drymate', 'Duralactin', 
'Duramune Max', 'DUZ Dryer', 'Earth Rated', 'Earthbath', 'EcoBio-Block', 'Economy', 'eCOTRITION', 'Educator', 'Embark Vet', 'Emerald Pet Products', 'Enalapril', 'Enchanted Home Pet', 
'Epizyme', 'Epogen', 'Equizone', 'Espree', 'Eukanuba', 'Ever Clean', 'EveryYay', 'Exo-Terra', 'Eyenimal', 'Fancy Feast', 'Febreze', 'Fel-O-Vax', 'Felimazole', 'Feline Pine', 'Feliway', 
'FenceMaster', 'Fieldcrest Farms', 'FIPROGUARD', 'Flexi', 'Fluconazole', 'Fludrocortisone Acetate', "Fluker's", 'Fluoxetine', 'Fluval', 'Fly Free Zone', 'Flys-Off', 'FM Browns', 
'foufouBRANDS', 'Four Paws', 'Free Spirit', "Fresh 'n Clean", 'Fresh Kitty', 'Fresh Pawz', 'Fresh Step', 'Freshpet', 'Friskies', 'Fritz', 'FroliCat', 'FRONTLINE', 'Fruitables', 
'Furbliss', 'FurHaven', 'FURminator', 'Furosemide', 'G&G Outfitters', 'Gabapentin', 'Galapagos', 'Galliprant', 'Gamma', 'Gen7Pets', 'Gentle Giants', 'Gimborn', 'GLAD for Pets', 'Glandex', 
'GloFish', 'GNC Ultra', 'Go Cat', 'Go Pet Club', 'goDog', 'Gooby Pet', "Good Lovin'", 'Good Pet Stuff', 'Good Stuffing Company', 'Good2Go', "Grannick's", 'Greenies', 'Habitrail', 'Hagen', 
'Halo', 'Hamilton Technology', 'Happy Again Pet', 'Happy Happenings', 'Happy Kisses', 'Harmony', 'Hauspanther Collection by Primetime', 'HEALERS', 'Healthy Pet', 'Healthy Select', 
'Heartgard', 'Heartgard Plus', 'Hero', 'Higgins', 'Higgins Sunburst', 'High Tech Pet', 'Hikari', "Hill's", 'Hillman', 'Himalayan Dog Chew', 'HomeoPet', 'Houses & Paws', 'HQ', 
'Humulin-N', 'Hydor', 'Hydroxyzine HCl', 'Hydroxyzine Pamoate', 'Hyper Pet', 'Iams', 'iFetch', 'Imagine This', 'Imagitarium', 'Inaba', 'Indipets', 'Innovation Pet', 'Instant Ocean', 
'Instinct', 'Interceptor', 'Interceptor Plus', 'Iris', 'Isle of Dogs', 'Iverhart Max', 'Iverhart Plus', 'JBJ', 'JLA', 'John Paul Pet', 'Jolly Pet', 'Jungle Talk', 'JurassiPet', 
'JustFoodForDogs', 'JW Pet', 'K&H', 'K-BroVet', 'K9 Advantix II', 'K9 Sport Sack', 'Kaytee', 'Kent Marine', 'Ketoconazole', 'Kitty City', 'Kitty Kasas', 'Kitty Mansions', 
"Kitty's WonderBox", 'KONG', "KONG Stuff'N", 'Kopeks', 'Kordon', 'Kurgo', 'Kwik Stop', 'La-Z-Boy', 'Lactated Ringers', 'Lactulose', "Lafeber's", 'Laguna', 'Lambert Kay', 'Lantus', 
'LaurDIY', 'Leaps & Bounds', "Lee's", 'Lickable', 'Lifegard Aquatics', 'Link AKC', 'Litter Genie', 'Litter Kwitter', 'Litter Locker', 'LitterMaid', 'Live Aquaria', 'Lixit', 
'LM Animal Farms', 'Long Dog Clothing Co.', 'Love My Pup', 'Lucky Dog', "Mac's", 'Magic Coat', 'Majestic Pet', 'Mammoth', 'Manna Pro', 'Marina', 'Marineland', 'Marshall Pet Products', 
'Martha Stewart', 'Marvel', 'Mazuri', 'Meowijuana', 'Merrick', 'Merry Products', 'Metacam', 'Methimazole', 'METHOD', 'Metoclopramide', 'Metro', 'Metronidazole', 'Microbe-Lift', 'Midwest', 
'Midwest Tropical', 'Mighty Toys', 'Milk-Bone', 'Millers Forge', "Milo's Kitchen", 'Miracle Coat', 'Modern Luxe Collection', 'Moderna', 'Mometamax', 'Monoject', 'Morning Song', 
"Mr. Herzher's", 'Multipet', "Musher's Secret", 'Mutt Nation', 'N-Bone', 'Natural Balance', 'Natural Chemistry', 'Naturally Fresh', 'Nature Zone', "Nature's Miracle", "Nature's Ocean", 
"Nature's Recipe", 'NaturVet', 'Neater Brands', 'Neo-Poly-Dex', 'Nerf', 'New Age Pet', 'New Cat Condos', 'New Life Spectrum', 'NexGard', 'Nite Ize Innovation', 'NOBA', 'Nobivac', 
'Normosol-R', 'North American Pet', 'North States', 'Northstar Balloons', 'Novox', 'Noz2Noz', 'NutraFin', 'Nutri Dent', 'Nutri-Vet', 'Nutro', 'Nylabone', 'Oase', 'Oasis', 'Ocean Nutrition', 
'Oceanic', 'Okocat', 'Old Mother Hubbard', 'Olvipet', 'Omega One', 'Omega Paw', 'Omega Sea', 'On2Pets', 'ONE', 'Open Road Brands', 'Optimmune', 'Orbax', 'ORIJEN', 'Orivet', 'Otomax', 
"Our Pet's", 'Outback Jack', 'Outward Hound', 'Overby Farm', 'Oxbow', 'Oxygenics', 'Panacur', 'Pancrezyme', 'Paw Prints', 'Paws & Pals', 'Pawscout', 'PAWZ', 'Pearhead', 'Peeps for Pets',
'Pendleton', 'Penn Plax', 'Pentair', 'Percorten-V', 'Perfect Pet', 'Perky-Pet', 'Pestell', 'Pet Acoustics', 'Pet Botanics', 'Pet Brush by Wet Brush', 'Pet Gear', 'Pet Greens', 'Pet Krewe',
'Pet Life', 'Pet Loo', 'Pet Lounge Studios', 'Pet Organics', 'Pet Parade', 'Pet Qwerks', 'Pet Releaf', 'Pet Safety Alert', 'Pet Therapeutics', 'Pet Top', 'PetAg', 'PetAlive', 'PetArmor',
'PetArmor Simple Source', 'PETCO', 'Petco', 'Petco Foundation', 'Petco Freshwater Fish', 'Petco Freshwater Inverts', 'Petco Marine Fish', 'Petco Marine Inverts', 'Petco Plants', 
'Petcube', 'PetDek', "Peter's", 'PetFusion', 'PetKit', 'Petlinks', 'Petlogix', 'Petlou', 'PETMAKER', 'Petmate', 'PetNation', 'Petnet', 'PetPals Group', 'Petrageous Designs', 
'Pets First', 'Pets on Safari', 'PetSafe', 'PetShop', 'Petsport', 'Petstages', 'Piddle Place', 'PillStashios', 'Pioneer Pet', 'Planet PETCO', 'Planet Pleasures', 'Plato Pet', 
'Playology', 'Plexidor', 'Pondmaster', 'Pooch Creamery', 'Pooch-O', 'PoochPads', 'PortablePET', 'Precision Pet', 'Prednisolone', 'Prednisone', "Premium L'Avian Plus", 
'Prestige Cat Trees', 'Previcox', 'Prevue Pet Products', 'Primetime Petz', 'Pro Bugs', 'Pro Clear Aquatic Systems', 'Pro Plan', 'Profivex', 'Proin', 'PromAce', 'Proviable', 'ProZinc',
'Prozyme', 'PupBox', 'Puppia', 'Pure Bites', 'Pure Bliss', 'Pure Water Pebbles', 'PureBites', 'Purina', 'Purr-ifier', 'Pusheen', 'Python', 'Quality Marine', 'quellin', 'Quick-Tag',
'Quiko', 'Quirky', 'R&J Enterprises', 'R-7', 'Rachael Ray Nutrish', 'RC Pet', 'Ready America', 'Realtree', 'Redbarn', 'Reddy', 'RelaxoPet', 'Remington', 'RenaKare', 'Rep-Cal',
'Repashy', 'Revolution', 'Revolution Plus', "Richard's Organics", 'Richell', 'Rimadyl', 'RockGarden', 'Roudybush', 'Royal Canin', 'Rubit', 'Ruff Dawg', 'RugArmour', 
'S&K Manufacturing', 'Safe Paw', 'Salix', 'San Francisco Bay Brand', 'Sauder', 'Schwinn', 'Scoop Away', 'ScoopFree', 'Seachem', 'SeaClear', 'Seaside Summer', 'SeaView', 'Sentinel', 
'Sentinel Spectrum', 'Sentry', 'Septiderm', 'Sera', 'Serenity', 'Seresto', 'Sheba', 'Shed-X', 'Sherpa', 'Shout', 'Side by Side', 'Simparica', 'Simparica Trio', 'Simple Green', 
'Simple Solution', 'Simplicef', 'Skechers', "Skout's Honor", 'Smart Cart', 'SmartBones', 'SmartCat', 'SmartPetLove', 'Snoozer', 'So Phresh', 'Sodium Chloride', 'Soft Claws', 'Solid Gold', 
'Solvit', 'Soulistic', 'Spironolactone', 'SportDOG', 'SportPet', 'SportPet Designs', 'Spot', 'Spot Farms', 'Spree', 'Spunky Pup', 'Star Mark', 'STAR WARS', 'Starmark', 
'Stayjax Pet Products', 'Stewart', 'Sticky Paws', 'Stokes Select', 'Sturdi Products', 'Sucralfate', 'Sulfasalazine', 'Sulfodene', 'Sun Seed', 'Super Bird Creations', 'Supreme Aqua-Mag', 
'Supreme Science Selective', 'SureFlap', 'Sustainably Yours', 'Sweet Feet & Beak', 'Swheat Scoop', 'Synergy Labs', 'Synotic', 'T-Rex', 'Taste of the Wild', 'Temaril-P', 'Temptations', 
'Territory', 'Tether Tug', 'Tetra', 'TetraBetta', 'TetraPond', 'The Aquarium Pump', 'The Company of Animals', 'The Gourmet Rodent', 'The Grrrip', 'The Kennel Deck', 'The Laundress', 
'The Missing Link', 'The Original Poop Bags', 'The Refined Canine', 'The Refined Feline', 'ThunderEase', 'ThunderLeash', 'Thundershirt', 'ThunderWorks', 'ThunderWunders', 'Thyro-L', 
'Thyro-Tabs', 'Tickless', 'Tiki Cat', 'Tiki Dog', 'Timberline Fisheries', 'Tomlyn', 'Tonka', 'Track & Tail', 'Tresaderm', 'Tri-Heart Plus', 'Trifexis', 'Trixie', 'Trolls', 'Tropic Marin', 
'TropiClean', 'True Chews', "Tuffy's", 'Tumbo', 'Twistix', 'Tylan', 'Ulticare', 'Underwater Galleries', 'UniPaws', 'UNKNOWN', 'UNLEASHED', 'Urban Suburban Apparel', 'Urine OFF', 
'Van Ness', 'Versele-Laga', 'Vesper', 'Vet Worthy', "Vet's Best", 'Vetericyn', 'VetIQ', 'Vetmedin', 'Vetoryl', 'Vetri-Science Laboratories', 'Vetsulin', 'VIP Products', 'Virbac', 
'Vista Pet Supplies', 'Vitakraft', 'Wags & Wiggles', 'Wahl', 'Walt Smith', 'Wardley', 'WARE', 'Warren London', 'Waterbox', 'Wave Point', 'Wee-Wee', 'Well & Good', 'Wellness', 'Weruva', 
'Wesco', 'West Paw', 'West Paw Designs', 'Wet Noses', 'Whimzees', 'White Mill', 'Whole Earth Farms', 'Whole Life Pet', 'WholeHearted', 'Wholesome Pride', 'Wigzi', 'Wild Alaskan', 
'Wild Delight', 'Wild Frontier', 'Willow Creek Press', 'Wisdom Panel', 'WizSmart', "World's Best", 'YML', 'Yoghund', 'You & Me', 'Zen Pet', 'Zeniquin', 'Zenpet', 'Zilla', 'ZippyPaws', 
'Zodiac', 'Zoo Med', 'Zoovilla', "Zuke's", 'ZuPreem', 'Zymox']

CATES=[
  "beds",
  "collars",
  "feeding_supplies",
  "food",
  "toys"
]

100.times do |index|
    User.create!(name: Faker::Name.name, password:Faker::Internet.password, email: Faker::Internet.email)
end

BRANDS.each do |brand|
    Brand.create(name: brand)
end

CATES.each do |c|
    Category.create(name:c)
end