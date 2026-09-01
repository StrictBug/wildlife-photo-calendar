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

  "rottnest-quokkas": {
    imagePath: "/images/events/rottnest-quokkas.v3.jpg",
    credit: "Calistemon / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Quokka_with_joey_on_Rottnest_Island,_April_2026_01.jpg",
  },
  "port-lincoln-great-whites": {
    imagePath: "/images/events/port-lincoln-great-whites.v3.jpg",
    credit: "Sharkcrew / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Guadalupe_Island_Great_White_Shark_Cage_Diving_Adventures.jpg",
  },
  "phillip-island-penguins": {
    imagePath: "/images/events/phillip-island-penguins.v3.jpg",
    credit: "JJ Harrison (https://www.jjharrison.com.au/) / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eudyptula_novaehollandiae_family_exiting_burrow.jpg",
  },
  "montague-island-seals": {
    imagePath: "/images/events/montague-island-seals.v3.jpg",
    credit: "Takver from Australia / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Australian_fur_seals_male_colony_-_Pennicott_Bruny_Island_cruise_(33758000792).jpg",
  },
  "maria-island-wombats": {
    imagePath: "/images/events/maria-island-wombats.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Common_wombat_(Vombatus_ursinus_tasmaniensis)_juvenile_Maria_Island.jpg",
  },
  "kakadu-crocodiles": {
    imagePath: "/images/events/kakadu-crocodiles.v3.jpg",
    credit: "S.miller.1994 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Saltwater_Crocodile_at_sunset,_Kakadu_National_Park.png",
  },
  "mon-repos-turtles": {
    imagePath: "/images/events/mon-repos-turtles.v3.jpg",
    credit: "Veronica Runge / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Loggerhead_Sunrise_(18423413069).jpg",
  },
  "shark-bay-dugongs": {
    imagePath: "/images/events/shark-bay-dugongs.v3.jpg",
    credit: "Sebastian Gerhard Venturemedia / Wikimedia Commons",
    license: "GFDL",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Dugong_dugon_fin_egypt.jpg",
  },
  "houtman-abrolhos-seals": {
    imagePath: "/images/events/houtman-abrolhos-seals.v3.jpg",
    credit: "Phil Whitehouse from London, United Kingdom / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sea_lions_at_a_beach_on_Kangaroo_Island.jpg",
  },
  "heron-island-reef": {
    imagePath: "/images/events/heron-island-reef.v3.jpg",
    credit: "Holobionics / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Green_Turtle_taking_a_breath.jpg",
  },
  "magnetic-island-koalas": {
    imagePath: "/images/events/magnetic-island-koalas.v3.jpg",
    credit: "KobiWiki / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Koala_in_eucalyptus.jpg",
  },
  "eungella-platypus": {
    imagePath: "/images/events/eungella-platypus.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Duck-billed_platypus_(Ornithorhynchus_anatinus)_Scottsdale.jpg",
  },
  "christmas-island-crabs": {
    imagePath: "/images/events/christmas-island-crabs.v3.jpg",
    credit: "ChrisBrayPhotography / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Christmas_Island_Red_Crab.jpg",
  },
  "kaikoura-sperm-whales": {
    imagePath: "/images/events/kaikoura-sperm-whales.v3.jpg",
    credit: "Whale Watch Kaikoura / Destination Kaikōura / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Destination_Kaikoura-513966-sperm-whale-diving.jpg",
  },
  "stewart-island-kiwi": {
    imagePath: "/images/events/stewart-island-kiwi.v3.jpg",
    credit: "Mark Anderson / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Okarito_kiwi_2.jpg",
  },
  "poor-knights-diving": {
    imagePath: "/images/events/poor-knights-diving.v3.jpg",
    credit: "Oscar Dove / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Myliobatis_tenuicaudatus_186845675.jpg",
  },
  "bay-of-islands-dolphins": {
    imagePath: "/images/events/bay-of-islands-dolphins.v3.jpg",
    credit: "Ken Lund from Reno, Nevada, USA / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Common_Bottlenose_Dolphins,_near_Santa_Cruz_Island,_Channel_Islands_National_Park,_California_(12)_(4080034896).jpg",
  },
  "new-caledonia-lagoon": {
    imagePath: "/images/events/new-caledonia-lagoon.v3.jpg",
    credit: "Ppmh21 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sunrise_Green_turtle.jpg",
  },
  "egypt-ras-mohammed": {
    imagePath: "/images/events/egypt-ras-mohammed.v3.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pez_%C3%A1ngel_real_(Pygoplites_diacanthus),_parque_nacional_Ras_Muhammad,_Egipto,_2022-03-26,_DD_155.jpg",
  },
  "morocco-atlas-macaques": {
    imagePath: "/images/events/morocco-atlas-macaques.v3.jpg",
    credit: "Merbivore / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Barbary_macaque_in_Morocco.jpg",
  },
  "mauritania-banc-darguin": {
    imagePath: "/images/events/mauritania-banc-darguin.v3.jpg",
    credit: "Lip Kee from Singapore, Republic of Singapore / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Greater_Flamingo_(Phoenicopterus_roseus)_-_Flickr_-_Lip_Kee_(2).jpg",
  },
  "ghana-mole-elephants": {
    imagePath: "/images/events/ghana-mole-elephants.v3.jpg",
    credit: "Geoff Gallice / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Loxodonta_africana_South_Luangwa_National_Park_(1).jpg",
  },
  "mozambique-ponta-turtles": {
    imagePath: "/images/events/mozambique-ponta-turtles.v3.jpg",
    credit: "カイロス / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Caretta_Shiodome_Blue_Ocean.jpg",
  },
  "south-africa-hermanus-whales": {
    imagePath: "/images/events/south-africa-hermanus-whales.v3.jpg",
    credit: "Josep M. Gracia / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:HER_-_Breaching_southern_right_whale_near_Hermanus,_South_Africa,_2017.jpg",
  },
  "kenya-samburu-special-five": {
    imagePath: "/images/events/kenya-samburu-special-five.v3.jpg",
    credit: "Sourish Trivedy / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Reticulated_Giraffe_from_Samburu.jpg",
  },
  "tanzania-nyerere-wild-dogs": {
    imagePath: "/images/events/tanzania-nyerere-wild-dogs.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:African_wild_dog_(Lycaon_pictus_pictus)_head.jpg",
  },
  "seychelles-aldabra-tortoises": {
    imagePath: "/images/events/seychelles-aldabra-tortoises.v3.jpg",
    credit: "Muhammad Mahdi Karim / Wikimedia Commons",
    license: "GFDL 1.2",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aldabra_Giant_Tortoise_Geochelone_gigantea_edit1.jpg",
  },
  "raja-ampat-reefs": {
    imagePath: "/images/events/raja-ampat-reefs.v3.jpg",
    credit: "Caparbio / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pygmy_seahorse.jpg",
  },
  "similan-diving": {
    imagePath: "/images/events/similan-diving.v3.jpg",
    credit: "Supachaiv / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Colorful_life_in_the_busy_reef,_Similan_Island_THAILAND.jpg",
  },
  "kamchatka-brown-bears": {
    imagePath: "/images/events/kamchatka-brown-bears.v3.jpg",
    credit: "Kirill.uyutnov / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bear_and_Salmon.jpg",
  },
  "baikal-nerpa-seals": {
    imagePath: "/images/events/baikal-nerpa-seals.v3.jpg",
    credit: "Sergey Gabdurakhmanov from Mountain View, USA / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Nerpa_(Pusa_sibirica)_(3635255975).jpg",
  },
  "india-gir-lions": {
    imagePath: "/images/events/india-gir-lions.v3.jpg",
    credit: "Rohit Sharma / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Portrait_of_an_Asiatic_lion_at_Gir_National_Park_02.jpg",
  },
  "bangladesh-sundarbans": {
    imagePath: "/images/events/bangladesh-sundarbans.v3.jpg",
    credit: "Kingshuk Mondal / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tourist_Boat_in_Sundarbans,_West_Bengal,_India_03.jpg",
  },
  "cambodia-mekong-dolphins": {
    imagePath: "/images/events/cambodia-mekong-dolphins.v3.jpg",
    credit: "Stefan Brending (2eight) / Wikimedia Commons",
    license: "CC BY-SA 3.0 de",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Irrawaddy_dolphin-Orcaella_brevirostris_by_2eight.jpg",
  },
  "vietnam-cat-ba-langurs": {
    imagePath: "/images/events/vietnam-cat-ba-langurs.v3.jpg",
    credit: "ALOnIShOnETH / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cat_Ba_Langur_8.jpg",
  },
  "philippines-apo-turtles": {
    imagePath: "/images/events/philippines-apo-turtles.v3.jpg",
    credit: "Wiki.mjmasangkay / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Our_friend_from_Pandan_Island_near_Apo_Reef.jpg",
  },
  "derawan-mantas": {
    imagePath: "/images/events/derawan-mantas.v3.jpg",
    credit: "No machine-readable author provided. Mbz1 assumed (based on copyright claims). / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Manta-ray_australia.jpg",
  },
  "bhutan-black-necked-cranes": {
    imagePath: "/images/events/bhutan-black-necked-cranes.v3.jpg",
    credit: "Dibyendu Ash / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Black-necked_Crane_Phobjika_Bhutan_November_2018.jpg",
  },
  "mongolia-khustain-takhi": {
    imagePath: "/images/events/mongolia-khustain-takhi.v3.jpg",
    credit: "Achim Lammerts (Syntaxys) / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2026-06-07_D500-97590M_Achim-Lammerts_Karlsruhe-Oberwald_Equus-przewalskii.jpg",
  },
  "china-crested-ibis": {
    imagePath: "/images/events/china-crested-ibis.v3.jpg",
    credit: "Ron Knight / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Crested_Ibis_(Nipponia_nippon).jpg",
  },
  "sri-lanka-udawalawe-elephants": {
    imagePath: "/images/events/sri-lanka-udawalawe-elephants.v3.jpg",
    credit: "Kavishka Kulathilaka / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_herd_of_spotted_deers_spotted_with_a_beautiful_Asian_elephant_near_the_Udawalawe_reservoir,_in_Sri_Lanka.jpg",
  },
  "france-camargue-flamingos": {
    imagePath: "/images/events/france-camargue-flamingos.v3.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:005c_Greater_flamingos_courtship_display_in_the_Camargue_during_mating_season_Photo_by_Giles_Laurent.jpg",
  },
  "switzerland-alpine-ibex": {
    imagePath: "/images/events/switzerland-alpine-ibex.v3.jpg",
    credit: "Isiwal / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Alpensteinbock_Capra_ibex-0801.jpg",
  },
  "italy-abruzzo-bears": {
    imagePath: "/images/events/italy-abruzzo-bears.v3.jpg",
    credit: "George Wheelhouse / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Casual_Forest_Bear_(141013759).jpeg",
  },
  "netherlands-wadden-seals": {
    imagePath: "/images/events/netherlands-wadden-seals.v3.jpg",
    credit: "Dirk Ingo Franke / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tertius_seehundbank_22.08.2011_15-49-53.jpg",
  },
  "scotland-mull-eagles": {
    imagePath: "/images/events/scotland-mull-eagles.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:White-tailed_eagle_(Haliaeetus_albicilla)_in_flight_3.jpg",
  },
  "germany-bavarian-lynx": {
    imagePath: "/images/events/germany-bavarian-lynx.v3.jpg",
    credit: "Böhringer Friedrich / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lynx_lynx,_Luchs_02.JPG",
  },
  "canary-islands-pilot-whales": {
    imagePath: "/images/events/canary-islands-pilot-whales.v3.jpg",
    credit: "Cayambe / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Globicephala_macrorhynchus_Tenerife_2012.jpg",
  },
  "cape-cod-humpbacks": {
    imagePath: "/images/events/cape-cod-humpbacks.v3.jpg",
    credit: "Whit Welles Wwelles14 / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_stellwagen_edit.jpg",
  },
  "florida-keys-reef": {
    imagePath: "/images/events/florida-keys-reef.v3.jpg",
    credit: "Matt MacGillivray from Toronto, Canada / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Black_sand_snooze_(4099169497).jpg",
  },
  "louisiana-alligator-swamps": {
    imagePath: "/images/events/louisiana-alligator-swamps.v3.jpg",
    credit: "Zygy / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Alligator_mississippiensis_113744549.jpg",
  },
  "south-texas-birds": {
    imagePath: "/images/events/south-texas-birds.v3.jpg",
    credit: "Chuck Homler, Focus On Wildlife / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Green_jay_(Cyanocorax_luxuosus)_in_Mission,_Texas,_USA.png",
  },
  "great-smoky-bears": {
    imagePath: "/images/events/great-smoky-bears.v3.jpg",
    credit: "NPS staff / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Black_bear_sitting_upright_at_Great_Smoky_Mountains_National_Park,_Tennessee_and_North_Carolina_(d846aeb0-01e0-4bb5-801c-d6bb26d13f85).jpg",
  },
  "newfoundland-seabirds": {
    imagePath: "/images/events/newfoundland-seabirds.v3.jpg",
    credit: "tsaiproject from Canada / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Atlantic_Puffin,_Elliston,_Newfoundland_(35538418614).jpg",
  },
  "quebec-saguenay-belugas": {
    imagePath: "/images/events/quebec-saguenay-belugas.v3.jpg",
    credit: "Luca Galuzzi (Lucag) / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Beluga_Whale_Tadoussac_Quebec_Canada_Luca_Galuzzi_2005.jpg",
  },
  "yucatan-whale-sharks": {
    imagePath: "/images/events/yucatan-whale-sharks.v3.jpg",
    credit: "Bernard DUPONT / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Only_Whale_Shark_of_the_trip_(Season_starts_in_June)_Isla_Mujeres.jpg",
  },
  "channel-islands-marine": {
    imagePath: "/images/events/channel-islands-marine.v3.jpg",
    credit: "JEERRYE AND ROY KLOTZ MD / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:HERD_OF_CALIFORNIA_SEA_LIONS_OFF_ANACAPA_ISLAND,_CA.jpg",
  },
  "pribilof-seabirds": {
    imagePath: "/images/events/pribilof-seabirds.v3.jpg",
    credit: "Department of Commerce. National Oceanic and Atmospheric Administration. National Ocean Service. Office of Response and Restoration. Pribilof Islands Restoration Project Office. 1996-9/2008 / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Seals_and_Sea_Lions--St._Paul_-_DPLA_-_187797f9df8ddf9b4ccbd40fd38f5cf4.jpg",
  },
  "arizona-desert-wildlife": {
    imagePath: "/images/events/arizona-desert-wildlife.v3.jpg",
    credit: "Alan Vernon / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Collared_Peccary_crossing_the_road.jpg",
  },
  "costa-rica-corcovado": {
    imagePath: "/images/events/costa-rica-corcovado.v3.jpg",
    credit: "Bernard Gagnon / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Scarlet_macaw_in_Costa_Rica.jpg",
  },
  "nicaragua-la-flor-turtles": {
    imagePath: "/images/events/nicaragua-la-flor-turtles.v3.jpg",
    credit: "Sundar / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Olive_Ridley_hatchlings_in_Chennai.jpg",
  },
  "brazil-fernando-noronha": {
    imagePath: "/images/events/brazil-fernando-noronha.v3.jpg",
    credit: "(c) Jon Robson, some rights reserved (CC BY-SA) / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Spinner_Dolphin,_Fernando_de_Noronha,_Fernando_de_Noronha,_BR-RN,_BR_imported_from_iNaturalist_photo_102003461.jpg",
  },
  "brazil-amazon-anavilhanas": {
    imagePath: "/images/events/brazil-amazon-anavilhanas.v3.jpg",
    credit: "Just a Brazilian man from Brazil / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Boto_cor-de-rosa_-_Pink_dolphin_(46314897644).jpg",
  },
  "argentina-ibera-wildlife": {
    imagePath: "/images/events/argentina-ibera-wildlife.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Capybara_(Hydrochoerus_hydrochaeris).jpg",
  },
  "peru-ballestas-seabirds": {
    imagePath: "/images/events/peru-ballestas-seabirds.v3.jpg",
    credit: "PsamatheM / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:15-Islas_Ballestas-nX-42.jpg",
  },
  "chile-humboldt-penguins": {
    imagePath: "/images/events/chile-humboldt-penguins.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humboldt_penguin_(Spheniscus_humboldti)_Chiloe.jpg",
  },
  "colombia-pacific-whales": {
    imagePath: "/images/events/colombia-pacific-whales.v3.jpg",
    credit: "MemoOssa / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ballena_jorobada_o_ballena_yubarta_(Megaptera_novaeangliae).jpg",
  },
  "guyana-iwokrama-rainforest": {
    imagePath: "/images/events/guyana-iwokrama-rainforest.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Jaguar_(Panthera_onca_palustris)_female_Piquiri_River_2.JPG",
  },
  "cuba-zapata-wildlife": {
    imagePath: "/images/events/cuba-zapata-wildlife.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bee_hummingbird_(Mellisuga_helenae)_immature_male.jpg",
  },
  "cayman-stingray-city": {
    imagePath: "/images/events/cayman-stingray-city.v3.jpg",
    credit: "Lhb1239 / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Southern_Stingrays_At_Stingray_City_Grand_Cayman.jpg",
  },
  "puerto-rico-mona-iguanas": {
    imagePath: "/images/events/puerto-rico-mona-iguanas.v3.jpg",
    credit: "U.S. Fish and Wildlife Service Southeast Region / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mona_ground_Iguana_Iguana_de_Mona_en_la_playa_(5839983809).jpg",
  },
  "turks-caicos-reef": {
    imagePath: "/images/events/turks-caicos-reef.v3.jpg",
    credit: "john norton / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Spotted_Eagle_Ray_(Aetobatus_narinari)2.jpg",
  },
  "south-georgia-king-penguins": {
    imagePath: "/images/events/south-georgia-king-penguins.v3.jpg",
    credit: "User:Pismire / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Colony_of_aptenodytes_patagonicus.jpg",
  },
  "greenland-diskos-icebergs": {
    imagePath: "/images/events/greenland-diskos-icebergs.v3.jpg",
    credit: "Buiobuione / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tail_of_Humpback_Whale_Megaptera_novaeangliae_in_Disko_Bay_Greenland_-_Buiobuone_02.jpg",
  },
  "daintree-rainforest": {
    imagePath: "/images/events/daintree-rainforest.v3.jpg",
    credit: "Tiaangobius20 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Southern_Cassowary_near_Etty_Bay.jpg",
  },
  "vanuatu-coolidge-wreck": {
    imagePath: "/images/events/vanuatu-coolidge-wreck.v3.jpg",
    credit: "Tilonaut / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Growing_Habitat_(220482421).jpeg",
  },
  "gabon-loango-hippos": {
    imagePath: "/images/events/gabon-loango-hippos.v3.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hipop%C3%B3tamos_(Hippopotamus_amphibius),_parque_nacional_de_Chobe,_Botsuana,_2018-07-28,_DD_79.jpg",
  },
  "senegal-djoudj-pelicans": {
    imagePath: "/images/events/senegal-djoudj-pelicans.v3.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:White_pelicans_(Pelecanus_onocrotalus)_Danube_delta.jpg",
  },
  "sipadan-diving": {
    imagePath: "/images/events/sipadan-diving.v3.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Banco_de_gran_barracudas_(Sphyraena_barracuda),_parque_nacional_Ras_Muhammad,_Egipto,_2022-03-27,_DD_115.jpg",
  },
  "maldives-hanifaru-mantas": {
    imagePath: "/images/events/maldives-hanifaru-mantas.v3.jpg",
    credit: "Arturo de Frias Marques / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Giant_Manta_AdF.jpg",
  },
  "japan-yakushima-monkeys": {
    imagePath: "/images/events/japan-yakushima-monkeys.v3.jpg",
    credit: "Garst, Warren, 1922-2016, photographer / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Japanese_macaque_sitting_on_rock_with_offspring_-_DPLA_-_7a425842286a9a9e2cd9545c99ab5a60.jpg",
  },
  "spain-donana-wetlands": {
    imagePath: "/images/events/spain-donana-wetlands.v3.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Paisaje_en_el_Parque_de_Do%C3%B1ana,_Espa%C3%B1a,_2015-12-07,_DD_18.JPG",
  },
  "sweden-boreal-bears": {
    imagePath: "/images/events/sweden-boreal-bears.v3.jpg",
    credit: "George Wheelhouse / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Casual_Forest_Bear_(141013759).jpeg",
  },
  "honduras-utila-diving": {
    imagePath: "/images/events/honduras-utila-diving.v3.jpg",
    credit: "Jaontiveros / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Snorkeling_whale_shark_4.JPG",
  },
  "panama-bocas-dolphins": {
    imagePath: "/images/events/panama-bocas-dolphins.v3.jpg",
    credit: "Ken Lund from Reno, Nevada, USA / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Common_Bottlenose_Dolphins,_near_Santa_Cruz_Island,_Channel_Islands_National_Park,_California_(14)_(4079271233).jpg",
  },
  "belize-hol-chan-diving": {
    imagePath: "/images/events/belize-hol-chan-diving.v3.jpg",
    credit: "MattWright / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Yellow_Stingray,_Belize,_2007-09.jpg",
  },
  "argentina-valdes-orcas": {
    imagePath: "/images/events/argentina-valdes-orcas.v3.jpg",
    credit: "Ecohotel / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Orcas_in_Punta_Norte_Valdes_Peninsula_-_panoramio_-_Ecohotel.jpg",
  },
  "brazil-bonito-snorkel": {
    imagePath: "/images/events/brazil-bonito-snorkel.v3.jpg",
    credit: "BRASIL AQUA / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Brycon_hilarii_-_Piraputanga_no_Monumento_Natural_do_Rio_Formoso.jpg",
  },
  "whyalla-cuttlefish": {
    imagePath: "/images/events/whyalla-cuttlefish.jpg",
    credit: "Yvonne / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sepia_apama_2.jpg",
  },
  "philippines-thresher-sharks": {
    imagePath: "/images/events/philippines-thresher-sharks.jpg",
    credit: "Jun V Lao / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Thresher_Shark_at_Monad_Shoal.png",
  },
  "cocos-hammerheads": {
    imagePath: "/images/events/cocos-hammerheads.jpg",
    credit: "Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sphyrna_lewini.jpg",
  },
  "hervey-bay-humpbacks": {
    imagePath: "/images/events/hervey-bay-humpbacks.jpg",
    credit: "National Marine Sanctuaries / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_whale_with_her_calf.jpg",
  },
  "head-of-bight-right-whales": {
    imagePath: "/images/events/head-of-bight-right-whales.jpg",
    credit: "Olga Ernst / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Southern_right_whale_breaching,_South_Africa.jpg",
  },
  "flinders-ranges-rock-wallabies": {
    imagePath: "/images/events/flinders-ranges-rock-wallabies.jpg",
    credit: "Afisch80 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pair_of_Yellow-Footed_Rock_Wallabies_in_Ikara-Flinders_Ranges_National_Park.jpg",
  },
  "lake-mungo-wildlife": {
    imagePath: "/images/events/lake-mungo-wildlife.jpg",
    credit: "Cataloging Nature / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Macropodiformes_Macropus_rufus_rufus_(Red_Kangaroo)_(30991978074).jpg",
  },
  "lamington-lyrebirds": {
    imagePath: "/images/events/lamington-lyrebirds.jpg",
    credit: "gwynmwilliams / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Albert%27s_Lyrebird_(Menura_alberti)_Lamington.jpg",
  },
  "capertee-valley-birds": {
    imagePath: "/images/events/capertee-valley-birds.jpg",
    credit: "Mark Gillow / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Regent_Honeyeater_1.jpg",
  },
  "ord-river-wetlands": {
    imagePath: "/images/events/ord-river-wetlands.jpg",
    credit: "Graham Winterflood / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Black-necked_Stork,_Jabiru,_(Ephippiorhynchus_asiaticus),_Gilbert_River,_Queensland,_20_July_2016.jpg",
  },
  "lacepede-islands-rookery": {
    imagePath: "/images/events/lacepede-islands-rookery.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Brown_booby_(Sula_leucogaster_plotus)_pair_Michaelmas_Cay.jpg",
  },
  "iron-range-parrots": {
    imagePath: "/images/events/iron-range-parrots.jpg",
    credit: "Jim Bendon / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Probosciger_aterrimus,_Cape_York_1.jpg",
  },
  "bruny-island-wildlife": {
    imagePath: "/images/events/bruny-island-wildlife.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:White_wallaby_(Notamacropus_rufogriseus_rufogriseus)_female_South_Bruny.jpg",
  },
  "victorian-alps-wombats": {
    imagePath: "/images/events/victorian-alps-wombats.jpg",
    credit: "Dmitry Brant / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Common_wombat_4.jpg",
  },
  "port-stephens-dolphins": {
    imagePath: "/images/events/port-stephens-dolphins.jpg",
    credit: "Bernard DUPONT / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Indo-Pacific_Bottlenose_Dolphins_(Tursiops_aduncus).jpg",
  },
  "boodjamulla-lawn-hill": {
    imagePath: "/images/events/boodjamulla-lawn-hill.jpg",
    credit: "DavidB601 / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Indarri_Falls_at_Lawn_Hill_National_Park.JPG",
  },
  "rowley-shoals-reef": {
    imagePath: "/images/events/rowley-shoals-reef.jpg",
    credit: "Angelo DeSantis / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fish_in_the_Ningaloo_reef_(368690753).jpg",
  },
  "dryandra-numbats": {
    imagePath: "/images/events/dryandra-numbats.jpg",
    credit: "Martybugs / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Numbat.jpg",
  },
  "wilsons-prom-wildlife": {
    imagePath: "/images/events/wilsons-prom-wildlife.jpg",
    credit: "Phil Whitehouse / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wombat_Wilsons_Promontory.jpg",
  },
  "warrnambool-right-whales": {
    imagePath: "/images/events/warrnambool-right-whales.jpg",
    credit: "Olga Ernst / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Southern_Right_Whale,_Hermanus_(South_Africa).jpg",
  },
  "raymond-island-koalas": {
    imagePath: "/images/events/raymond-island-koalas.jpg",
    credit: "John Robert McPherson / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Koala_Pine_Ridge_Conservation_Park,_Queensland_IMG_0062.jpg",
  },
  "snowy-mountains-dingoes": {
    imagePath: "/images/events/snowy-mountains-dingoes.jpg",
    credit: "brett / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Canis_lupus_dingo_-Healesville_Sanctuary,_Victoria,_Australia-8a.jpg",
  },
  "west-macdonnell-wedgetails": {
    imagePath: "/images/events/west-macdonnell-wedgetails.jpg",
    credit: "XiscoNL / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wedge-tailed_Eagle_at_Territory_Wildlife_Park.JPG",
  },
  "daintree-night-tree-frogs": {
    imagePath: "/images/events/daintree-night-tree-frogs.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:White-lipped_tree_frog_(Nyctimystes_infrafrenatus)_Daintree.jpg",
  },
  "costa-rica-red-eyed-tree-frogs": {
    imagePath: "/images/events/costa-rica-red-eyed-tree-frogs.jpg",
    credit: "Bernard DUPONT / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Red-eyed_Tree_Frog_(Agalychnis_callidryas)_(6941168748).jpg",
  },
  "ecuador-amazon-glass-frogs": {
    imagePath: "/images/events/ecuador-amazon-glass-frogs.jpg",
    credit: "bgv23 / Lycaon / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hyalinobatrachium_colymbiphyllum_edit.jpg",
  },
  "madagascar-mantella-jewels": {
    imagePath: "/images/events/madagascar-mantella-jewels.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Variegated_golden_frog_(Mantella_baroni)_Ranomafana.jpg",
  },
};

export function getEventImage(eventId: string): EventImage | undefined {
  return EVENT_IMAGES[eventId];
}
