export interface EventImage {
  imagePath: string;
  credit: string;
  license: string;
  sourceUrl: string;
}

const EVENT_IMAGES: Record<string, EventImage> = {
  "amboseli-elephants": {
    imagePath: "/images/events/amboseli-elephants.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Elefante_africano_de_sabana_(Loxodonta_africana),_parque_nacional_de_Amboseli,_Kenia,_2024-05-22,_DD_07.jpg",
  },
  "great-migration-serengeti": {
    imagePath: "/images/events/great-migration-serengeti.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Western_white-bearded_wildebeest_(Connochaetes_taurinus_mearnsi)_Mara_River_crossing_1b.jpg",
  },
  "yellowstone-wolves": {
    imagePath: "/images/events/yellowstone-wolves.jpg",
    credit: "Yellowstone NPS / Jacob W. Frank / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_single_female_wolf_traveling_on_the_winter_groomed_road_(51784665337).jpg",
  },
  "costa-rica-hummingbirds": {
    imagePath: "/images/events/costa-rica-hummingbirds.jpg",
    credit: "Bernard Gagnon / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eugenes_spectabilis_in_Costa_Rica_02.jpg",
  },
  "churchill-polar-bears": {
    imagePath: "/images/events/churchill-polar-bears.jpg",
    credit: "Josh Campbell / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ursus_maritimus_in_Churchill,_Manitoba,_October_2013_(11811068445).jpg",
  },
  "great-barrier-coral-spawn": {
    imagePath: "/images/events/great-barrier-coral-spawn.jpg",
    credit: "Toby Hudson / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Coral_Outcrop_Flynn_Reef.jpg",
  },
  "pantanal-jaguars": {
    imagePath: "/images/events/pantanal-jaguars.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Jaguar_(Panthera_onca_palustris)_male_Three_Brothers_River_2.jpg",
  },
  "scotland-puffins": {
    imagePath: "/images/events/scotland-puffins.jpg",
    credit: "Romaniviatores / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:02_Atlantic_puffin_on_Treshnish_Isles_by_Romaniviatores.jpg",
  },
  "borneo-orangutans": {
    imagePath: "/images/events/borneo-orangutans.jpg",
    credit: "diego_cue / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_tightroper_orangutan_-_Sepilok_Sanctuary_Center_-_Sabah_-_Borneo_-_Malaysia_-_panoramio.jpg",
  },
  "antarctica-penguins": {
    imagePath: "/images/events/antarctica-penguins.jpg",
    credit: "Christopher Michel / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Penguin_in_Antarctica_jumping_out_of_the_water.jpg",
  },
  "sri-lanka-leopards": {
    imagePath: "/images/events/sri-lanka-leopards.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sri_Lankan_leopard_(Panthera_pardus_kotiya)_female_5.jpg",
  },
  "galapagos-endemics": {
    imagePath: "/images/events/galapagos-endemics.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Iguana_marina_(Amblyrhynchus_cristatus),_Las_Bachas,_isla_Santa_Cruz,_islas_Gal%C3%A1pagos,_Ecuador,_2015-07-23,_DD_23.jpg",
  },
  "finland-bears": {
    imagePath: "/images/events/finland-bears.jpg",
    credit: "Frank Vassen / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Juvenile_Brown_bear_(Ursus_arctos),_Viiksimo,_Kainuu_region,_Finland_(42882543372).jpg",
  },
  "madagascar-lemurs": {
    imagePath: "/images/events/madagascar-lemurs.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ring-tailed_lemur_(Lemur_catta).jpg",
  },
  "alaska-bears-brooks": {
    imagePath: "/images/events/alaska-bears-brooks.jpg",
    credit: "Brocken Inaglory / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Brown_bear_at_Brooks_Falls.jpg",
  },
  "namibia-desert-elephants": {
    imagePath: "/images/events/namibia-desert-elephants.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Desert_elephant_(Loxodonta_africana)_spraying_sand.jpg",
  },
  "philippines-whale-sharks": {
    imagePath: "/images/events/philippines-whale-sharks.jpg",
    credit: "Slunky / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rhincodon_typus_344681934.jpg",
  },
  "india-tigers-bandhavgarh": {
    imagePath: "/images/events/india-tigers-bandhavgarh.jpg",
    credit: "Thomas Fuhrmann / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bengal_tiger_(Panthera_tigris_tigris),_Bandhavgarh_National_Park.jpg",
  },
  "new-zealand-albatross": {
    imagePath: "/images/events/new-zealand-albatross.jpg",
    credit: "Pseudopanax / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Northern_Royal_albatross_flying_in_front_of_Taiaroa_Head_lighthouse.jpg",
  },
  "botswana-okavango": {
    imagePath: "/images/events/botswana-okavango.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:African_elephant_(Loxodonta_africana)_reaching_up_1.jpg",
  },
  "japan-macaques": {
    imagePath: "/images/events/japan-macaques.jpg",
    credit: "Frank Schulenburg / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kopfstudie_eines_Japanmakaken_(Macaca_fuscata)_im_Jigokudani_Yaen_K%C5%8Den,_Japan.jpg",
  },
  "ecuador-andes-macro": {
    imagePath: "/images/events/ecuador-andes-macro.jpg",
    credit: "Dick Culbert / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Morpho_achilles_-_Flickr_-_Dick_Culbert_(1).jpg",
  },
  "caribbean-manatees": {
    imagePath: "/images/events/caribbean-manatees.jpg",
    credit: "Bernard DUPONT / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:West_Indian_Manatee_(Trichechus_manatus)_in_murky_water_..._(22008870180).jpg",
  },
  "rwanda-gorillas": {
    imagePath: "/images/events/rwanda-gorillas.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mountain_gorilla_(Gorilla_beringei_beringei)_yawn.jpg",
  },
  "uganda-chimpanzees": {
    imagePath: "/images/events/uganda-chimpanzees.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:013_Alpha_male_chimpanzee_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg",
  },
  "south-africa-kruger": {
    imagePath: "/images/events/south-africa-kruger.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kruger_National_Park_(ZA),_L%C3%B6we_--_2024_--_0845.jpg",
  },
  "zambia-south-luangwa": {
    imagePath: "/images/events/zambia-south-luangwa.jpg",
    credit: "I've Got It On Film! / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Leopard_and_impala,_South_Luangwa_National_Park_(51866797500).jpg",
  },
  "ethiopia-geladas": {
    imagePath: "/images/events/ethiopia-geladas.jpg",
    credit: "A. Davey / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gelada_Baboons,_Simien_Mountains,_Ethiopia_(2457852901).jpg",
  },
  "tanzania-ngorongoro": {
    imagePath: "/images/events/tanzania-ngorongoro.jpg",
    credit: "John Mackenzie Burke / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rhinoceros,_Ngorongoro_(2015).jpg",
  },
  "mongolia-eagles": {
    imagePath: "/images/events/mongolia-eagles.jpg",
    credit: "Gabideen / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Golden_Eagle_Festival_Mongolia_2.jpg",
  },
  "komodo-dragons": {
    imagePath: "/images/events/komodo-dragons.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Komodo_dragon_(Varanus_komodoensis).jpg",
  },
  "kaziranga-rhinos": {
    imagePath: "/images/events/kaziranga-rhinos.jpg",
    credit: "Tisha Mukherjee / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Indian_rhinoceros_in_Kaziranga_National_Park_March_2025_by_Tisha_Mukherjee_02.jpg",
  },
  "nepal-red-panda": {
    imagePath: "/images/events/nepal-red-panda.jpg",
    credit: "Sunuwargr / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Curious_Red_Panda_in_Langtang_National_Park.jpg",
  },
  "oman-green-turtles": {
    imagePath: "/images/events/oman-green-turtles.jpg",
    credit: "Dhruvdhawan / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Trapped_turtle_at_ras_al_jinz.jpg",
  },
  "thailand-gaur": {
    imagePath: "/images/events/thailand-gaur.jpg",
    credit: "tontantravel / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gaur_bull,_Bos_gaurus_in_Kaeng_Krachan_national_park_(25076451099).jpg",
  },
  "norway-orcas": {
    imagePath: "/images/events/norway-orcas.jpg",
    credit: "Ximonic, Simo Räsänen / Wikimedia Commons",
    license: "GFDL",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Killer_whales_at_%C3%85_i_Lofoten_13,_2010_September.JPG",
  },
  "romania-brown-bears": {
    imagePath: "/images/events/romania-brown-bears.jpg",
    credit: "Costin Costan / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Carpathian_Brown_Bear_(232367505).jpeg",
  },
  "iceland-puffins": {
    imagePath: "/images/events/iceland-puffins.jpg",
    credit: "Boaworm / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Puffin_Latrabjarg_Iceland.jpg",
  },
  "monterey-humpbacks": {
    imagePath: "/images/events/monterey-humpbacks.jpg",
    credit: "Rick Berg / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_Whale_Monterey_Bay.jpg",
  },
  "everglades-wading-birds": {
    imagePath: "/images/events/everglades-wading-birds.jpg",
    credit: "Andy Morffew / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_roseate_spoonbill_-_Stick_Marsh,_Florida.jpg",
  },
  "denali-caribou": {
    imagePath: "/images/events/denali-caribou.jpg",
    credit: "Derek Ramsey / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Denali_National_Park_Caribou_Herd_1249px.jpg",
  },
  "baja-gray-whales": {
    imagePath: "/images/events/baja-gray-whales.jpg",
    credit: "Joe McKenna / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Big_Spy_Hop,_Laguna_San_Ignacio_(cropped).jpg",
  },
  "mexico-monarchs": {
    imagePath: "/images/events/mexico-monarchs.jpg",
    credit: "Derek Ramsey / Wikimedia Commons",
    license: "GFDL 1.2",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Monarch_Butterfly_Danaus_plexippus_on_Milkweed_Hybrid_2800px.jpg",
  },
  "belize-howler-monkeys": {
    imagePath: "/images/events/belize-howler-monkeys.jpg",
    credit: "Greg Schechter / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Stephi_and_Howler_Monkey_-_Flickr_-_GregTheBusker.jpg",
  },
  "patagonia-penguins": {
    imagePath: "/images/events/patagonia-penguins.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Magellanic_penguin_(Spheniscus_magellanicus)_Chiloe_2.jpg",
  },
  "chile-condors": {
    imagePath: "/images/events/chile-condors.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Andean_condor_(Vultur_gryphus)_male_Farellones.jpg",
  },
  "colombia-hummingbirds": {
    imagePath: "/images/events/colombia-hummingbirds.jpg",
    credit: "Elio Rafael Ariza Ramos / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lepidopyga_lilliae.png",
  },
  "peru-clay-lick-macaws": {
    imagePath: "/images/events/peru-clay-lick-macaws.jpg",
    credit: "Ricardo Sánchez / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ara_chloropterus_-Peru_-clay_lick-8.jpg",
  },
  "tasmania-devils": {
    imagePath: "/images/events/tasmania-devils.jpg",
    credit: "JJ Harrison / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sarcophilus_harrisii_taranna.jpg",
  },
  "png-birds-of-paradise": {
    imagePath: "/images/events/png-birds-of-paradise.jpg",
    credit: "markaharper1 / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Raggiana_Bird-of-Paradise_wild_5.jpg",
  },
  "ningaloo-whale-sharks": {
    imagePath: "/images/events/ningaloo-whale-sharks.jpg",
    credit: "Mbz1 / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Whale_shark_Australia.jpg",
  },
  "svalbard-polar-bears": {
    imagePath: "/images/events/svalbard-polar-bears.jpg",
    credit: "Arturo de Frias Marques / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Polar_Bear_AdF.jpg",
  },
  "bahamas-tiger-sharks": {
    imagePath: "/images/events/bahamas-tiger-sharks.jpg",
    credit: "Albert kok / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tiger_shark.jpg",
  },
  "dominica-sperm-whales": {
    imagePath: "/images/events/dominica-sperm-whales.jpg",
    credit: "Gabriel Barathieu / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mother_and_baby_sperm_whale.jpg",
  },
  "trinidad-scarlet-ibis": {
    imagePath: "/images/events/trinidad-scarlet-ibis.jpg",
    credit: "Dick Daniels / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Scarlet_Ibis_(Eudocimus_ruber)_RWD.jpg",
  },
  "grenada-leatherback-turtles": {
    imagePath: "/images/events/grenada-leatherback-turtles.jpg",
    credit: "U.S. Fish and Wildlife Service / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:LeatherbackTurtle.jpg",
  },
  "panama-harpy-eagle": {
    imagePath: "/images/events/panama-harpy-eagle.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Harpy_eagle_(Harpia_harpyja).jpg",
  },
  "guatemala-quetzal": {
    imagePath: "/images/events/guatemala-quetzal.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:056_Male_Resplendent_quetzal_in_Los_Quetzales_National_Park_Photo_by_Giles_Laurent.jpg",
  },
  "fiji-manta-rays": {
    imagePath: "/images/events/fiji-manta-rays.jpg",
    credit: "jon hanson / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Manta_birostris-Thailand.jpg",
  },
  "kangaroo-island-wildlife": {
    imagePath: "/images/events/kangaroo-island-wildlife.jpg",
    credit: "Bernd Marczak / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Australian_sea_lion_on_Kangaroo_Island.jpg",
  },
  "fiordland-penguins": {
    imagePath: "/images/events/fiordland-penguins.jpg",
    credit: "John Barkla / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eudyptes_pachyrhynchus_4342035.jpg",
  },
  "lord-howe-seabirds": {
    imagePath: "/images/events/lord-howe-seabirds.jpg",
    credit: "patrickkavanagh / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Masked_Booby_(Sula_dactylatra)_(24459357598).jpg",
  },
  "samoa-humpback-whales": {
    imagePath: "/images/events/samoa-humpback-whales.jpg",
    credit: "National Marine Sanctuaries / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_Whale_And_Calf_(42854767822).jpg",
  },
  "grand-teton-moose": {
    imagePath: "/images/events/grand-teton-moose.jpg",
    credit: "Tony Hisgett / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Moose_in_Grand_Teton_National_Park_3_(8007698498).jpg",
  },
  "vancouver-island-orcas": {
    imagePath: "/images/events/vancouver-island-orcas.jpg",
    credit: "Buiobuione / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Killer_whale_in_Telegraph_Cove_Vancouver_Island_buiobuione_04.jpg",
  },
  "maine-puffins": {
    imagePath: "/images/events/maine-puffins.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:027_Atlantic_puffin_in_flight_with_mouth_full_of_fishes_Photo_by_Giles_Laurent.jpg",
  },
  "bolivia-flamingos": {
    imagePath: "/images/events/bolivia-flamingos.jpg",
    credit: "Havardtl / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:James%27s_Flamingoes_in_Laguna_Colorada,_Bolivia.jpg",
  },
  "ecuador-pink-dolphins": {
    imagePath: "/images/events/ecuador-pink-dolphins.jpg",
    credit: "Wikimedia Commons",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Inia.jpg",
  },
  "spain-iberian-lynx": {
    imagePath: "/images/events/spain-iberian-lynx.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lince_ib%C3%A9rico_(Lynx_pardinus),_Almuradiel,_Ciudad_Real,_Espa%C3%B1a,_2021-12-19,_DD_07.jpg",
  },
  "poland-bison": {
    imagePath: "/images/events/poland-bison.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:European_bison_(Bison_bonasus)_male_Bia%C5%82owieza.jpg",
  },
  "portugal-azores-dolphins": {
    imagePath: "/images/events/portugal-azores-dolphins.jpg",
    credit: "Jules Verne Times Two / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Common_dolphins_(Delphinus_delphis),_S%C3%A3o_Miguel_Island,_Azores,_Portugal_(PPL1-Corrected).jpg",
  },
  "greece-loggerhead-turtles": {
    imagePath: "/images/events/greece-loggerhead-turtles.jpg",
    credit: "U.S. Fish and Wildlife Service / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Loggerhead_sea_turtle.jpg",
  },
  "china-giant-pandas": {
    imagePath: "/images/events/china-giant-pandas.jpg",
    credit: "Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Giant_Panda_at_Chengdu_Panda_Base.jpg",
  },
  "hokkaido-cranes": {
    imagePath: "/images/events/hokkaido-cranes.jpg",
    credit: "Alastair Rae / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Grus_japonensis_-Hokkaido,_Japan_-several-8_(1).jpg",
  },
  "israel-hula-migration": {
    imagePath: "/images/events/israel-hula-migration.jpg",
    credit: "מינוזיג / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Feeding_Common_crane_in_Hula_Valley,_Israel.jpg",
  },
  "jordan-dana-ibex": {
    imagePath: "/images/events/jordan-dana-ibex.jpg",
    credit: "Rhododendrites / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Juvenile_Nubian_ibex_in_Mitzpe_Ramon_(40409).jpg",
  },
  "kazakhstan-saiga": {
    imagePath: "/images/events/kazakhstan-saiga.jpg",
    credit: "Andrey Giljov / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Saiga_antelope_at_the_Stepnoi_Sanctuary.jpg",
  },
  "kyrgyzstan-snow-leopard": {
    imagePath: "/images/events/kyrgyzstan-snow-leopard.jpg",
    credit: "PeCeT_full / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Snow_leopard(Panthera_uncia).jpg",
  },
};

export function getEventImage(eventId: string): EventImage | undefined {
  return EVENT_IMAGES[eventId];
}
