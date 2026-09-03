export interface EventImage {
  imagePath: string;
  credit: string;
  license: string;
  sourceUrl: string;
}

const EVENT_IMAGES: Record<string, EventImage> = {
  "amboseli-elephants": {
    imagePath: "/images/events/amboseli-elephants.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:African_elephant_(Loxodonta_africana)_2.jpg",
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
    credit: "Teresa from México / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Polar_Bear,_Churchill,_Manitoba,_Canada..jpg",
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
    credit: "CEphoto, Uwe Aranas / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sandakan_Sabah_Sepilok-Orangutan-Rehabilitation-Centre-02a.jpg",
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
      "https://commons.wikimedia.org/wiki/File:Indri_(Indri_indri).jpg",
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
    credit: "PMS2718 / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Japanese_Macaque_Fuscata_Image_357.jpg",
  },
  "ecuador-andes-macro": {
    imagePath: "/images/events/ecuador-andes-macro.jpg",
    credit: "Javier Ábalos from Valencia, España / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Glass_frog_(Centrolenidae)_in_Mindo_(Ecuador)_(21090206496).jpg",
  },
  "caribbean-manatees": {
    imagePath: "/images/events/caribbean-manatees.jpg",
    credit: "Ramos Keith, U.S. Fish and Wildlife Service / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Underwater_photography_on_endangered_mammal_manatee.jpg",
  },
  "rwanda-gorillas": {
    imagePath: "/images/events/rwanda-gorillas.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mountain_gorilla_(Gorilla_beringei_beringei)_eating.jpg",
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
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gelada_(Theropithecus_gelada_gelada)_male_head.jpg",
  },
  "tanzania-ngorongoro": {
    imagePath: "/images/events/tanzania-ngorongoro.jpg",
    credit: "Yoky / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Black_Rhino_Diceros_bicornis.JPG",
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
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eurasian_brown_bear_(Ursus_arctos_arctos)_female_2.jpg",
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
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_whale_(Megaptera_novaeangliae)_Eyjafjordur_diving_15_of_27.jpg",
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
    credit: "Forest Service Photography / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Caribou-Targhee_National_Forest_(20170602-FS-Caribou-CP-001).jpg",
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
    credit: "Rhododendrites / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Monarch_butterfly_(70387).jpg",
  },
  "belize-howler-monkeys": {
    imagePath: "/images/events/belize-howler-monkeys.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Yucat%C3%A1n_black_howler_(Alouatta_pigra)_with_baby_Peten.jpg",
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
      "https://commons.wikimedia.org/wiki/File:Andean_condor_(Vultur_gryphus)_male_in_flight_Farellones.jpg",
  },
  "colombia-hummingbirds": {
    imagePath: "/images/events/colombia-hummingbirds.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Violet-tailed_sylph_(Aglaiocercus_coelestis_coelestis)_male_in_flight_Paz_de_las_Aves.jpg",
  },
  "peru-clay-lick-macaws": {
    imagePath: "/images/events/peru-clay-lick-macaws.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Scarlet_macaw_(Ara_macao_macao)_Yasuni.jpg",
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
    credit: "Sylke Rohrlach from Sydney / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Whale_shark_(Rhincodon_typus)_(16035796288).jpg",
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
    credit: "Rafa Esteve / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Oceanografic_Scarlet_Ibis_02.jpg",
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
      "https://commons.wikimedia.org/wiki/File:European_bison_(Bison_bonasus)_male_Bia%C5%82owieza_2.jpg",
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
    credit: "Chi King / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pandas!!_(GIANT_PANDA-WOLONG-SICHUAN-CHINA)_(2151391892).jpg",
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
      "https://commons.wikimedia.org/wiki/File:Feeding_Common_crane_in_Agamon_Hula_Nature_reserve,_Israel.jpg",
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
    credit: "Gage Skidmore / Flickr",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://www.flickr.com/photos/gageskidmore/55109617290/",
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
    imagePath: "/images/events/montague-island-seals.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Australian_fur_seals_(Arctocephalus_pusillus_doriferus)_Bruny.jpg",
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
    imagePath: "/images/events/eungella-platypus.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Duck-billed_platypus_(Ornithorhynchus_anatinus)_Scottsdale_4.jpg",
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
    imagePath: "/images/events/morocco-atlas-macaques.jpg",
    credit: "RedCoat / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gibraltar_Barbary_Macaque.jpg",
  },
  "mauritania-banc-darguin": {
    imagePath: "/images/events/mauritania-banc-darguin.jpg",
    credit: "Andreas Trepte / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eurasian_Spoonbill.jpg",
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
    credit: "Jeroen Looyé / Flickr",
    license: "CC BY-SA 2.0",
    sourceUrl: "https://www.flickr.com/photos/looye/6780166094/",
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
    imagePath: "/images/events/seychelles-aldabra-tortoises.jpg",
    credit: "NorbertNagel / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aldabra_giant_tortoise_(Aldabrachelys_gigantea)_in_Curieuse_Island_-_02.jpg",
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
    imagePath: "/images/events/kamchatka-brown-bears.jpg",
    credit: "Robert F. Tobler / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kamchatka_Brown_Bear_near_Dvuhyurtochnoe_on_2015-07-23.png",
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
    imagePath: "/images/events/bangladesh-sundarbans.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bengal_tiger_(Panthera_tigris_tigris)_female_2.jpg",
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
    imagePath: "/images/events/philippines-apo-turtles.jpg",
    credit: "E bailey / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Green_Sea_Turtle_-_Chelonia_mydas_-_Poipu_beach,_Kauai.jpg",
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
    imagePath: "/images/events/mongolia-khustain-takhi.jpg",
    credit: "Zazaa Mongolia / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Takhi_%E2%80%93_Wild_horse.jpg",
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
    imagePath: "/images/events/france-camargue-flamingos.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:001_Greater_flamingo_in_flight_in_the_Camargue_Photo_by_Giles_Laurent.jpg",
  },
  "switzerland-alpine-ibex": {
    imagePath: "/images/events/switzerland-alpine-ibex.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:018_Wild_Alpine_Ibex_Grammont_Photo_by_Giles_Laurent.jpg",
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
    imagePath: "/images/events/germany-bavarian-lynx.jpg",
    credit: "taken by Bernard Landgraf / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lynx_kitten.jpg",
  },
  "canary-islands-pilot-whales": {
    imagePath: "/images/events/canary-islands-pilot-whales.v3.jpg",
    credit: "Cayambe / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Globicephala_macrorhynchus_Tenerife_2012.jpg",
  },
  "cape-cod-humpbacks": {
    imagePath: "/images/events/cape-cod-humpbacks.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_whale_(Megaptera_novaeangliae)_calf_Moorea_2.jpg",
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
    imagePath: "/images/events/yucatan-whale-sharks.jpg",
    credit: "MarAlliance2018 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Whale_shark_at_Isla_Mujeres.jpg",
  },
  "channel-islands-marine": {
    imagePath: "/images/events/channel-islands-marine.jpg",
    credit: "Rhododendrites / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:California_sea_lion_nap_time_in_La_Jolla_(70474).jpg",
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
    imagePath: "/images/events/nicaragua-la-flor-turtles.jpg",
    credit: "Aliva Sahoo / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Riddle_of_Ridleys.jpg",
  },
  "brazil-fernando-noronha": {
    imagePath: "/images/events/brazil-fernando-noronha.jpg",
    credit: "Liisa Havukainen / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Spinner_Dolphin_(Stenella_longirotris).JPG",
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
    imagePath: "/images/events/colombia-pacific-whales.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Humpback_whale_(Megaptera_novaeangliae)_with_calf_Moorea_2.jpg",
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
    imagePath: "/images/events/sipadan-diving.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Banco_de_gran_barracudas_(Sphyraena_barracuda),_parque_nacional_Ras_Muhammad,_Egipto,_2022-03-27,_DD_116.jpg",
  },
  "maldives-hanifaru-mantas": {
    imagePath: "/images/events/maldives-hanifaru-mantas.v3.jpg",
    credit: "Arturo de Frias Marques / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Giant_Manta_AdF.jpg",
  },
  "japan-yakushima-monkeys": {
    imagePath: "/images/events/japan-yakushima-monkeys.jpg",
    credit: "Photos of Japan / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Yakushima_macaque_Aug_14_757am.jpg",
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
    imagePath: "/images/events/honduras-utila-diving.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Whale_shark,_Nosy_Sakatia,_Nosy_Be,_Madagascar.jpg",
  },
  "panama-bocas-dolphins": {
    imagePath: "/images/events/panama-bocas-dolphins.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Common_bottlenose_dolphins_(Tursiops_truncatus)_Knysna.jpg",
  },
  "belize-hol-chan-diving": {
    imagePath: "/images/events/belize-hol-chan-diving.jpg",
    credit: "NLEJAH / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Nurse_shark_looking_at_camera.jpg",
  },
  "argentina-valdes-orcas": {
    imagePath: "/images/events/argentina-valdes-orcas.v3.jpg",
    credit: "Ecohotel / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Orcas_in_Punta_Norte_Valdes_Peninsula_-_panoramio_-_Ecohotel.jpg",
  },
  "brazil-bonito-snorkel": {
    imagePath: "/images/events/brazil-bonito-snorkel.jpg",
    credit: "Daniel Francisco Madrigal Möller / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Piraputangas.JPG",
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
    credit: "Kris Mikael Krister / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Scalloped_Hammerhead_Shark_Sphyrna_Lewini_(226845659).jpeg",
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
    credit: "Will Hore-Lacy / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:MungoNationalParkEmu.jpg",
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
    credit: "Matt from Melbourne, Australia / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Freshwater_Crocodile_(Crocodylus_johnstoni)_(8851272319).jpg",
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
    credit: "patrickkavanagh / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Numbat_(Myrmecobius_fasciatus)_-_Flickr_-_patrickkavanagh.jpg",
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
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Koala_(Phascolarctos_cinereus),_S%C3%ADdney,_Australia18.JPG",
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
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tasmanian_wedge-tailed_eagle_(Aquila_audax_fleayi)_mobbed_by_forest_ravens_Scottsdale_2.jpg",
  },
  "daintree-night-tree-frogs": {
    imagePath: "/images/events/daintree-night-tree-frogs.jpg",
    credit: "Bernard DUPONT from FRANCE / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Dainty_Green_Tree_Frog_(Litoria_gracilenta)_(10242513334).jpg",
  },
  "costa-rica-red-eyed-tree-frogs": {
    imagePath: "/images/events/costa-rica-red-eyed-tree-frogs.jpg",
    credit: "Bernard Gagnon / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Red-eyed_tree_frog_in_Costa_Rica_01.jpg",
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
  "south-africa-sardine-run": {
    imagePath: "/images/events/south-africa-sardine-run.jpg",
    credit: "Borut Furlan / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sardine_run_in_South_Africa_2022.jpg",
  },
  "canada-spirit-bears": {
    imagePath: "/images/events/canada-spirit-bears.jpg",
    credit: "Jon Rawlinson / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ursus_americanus_kermodei,_Great_Bear_Rainforest_1.jpg",
  },
  "uganda-shoebill-stork": {
    imagePath: "/images/events/uganda-shoebill-stork.jpg",
    credit: "Olaf Oliviero Riemer / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Balaeniceps_rex_(Schuhschnabel_-_Shoebill)_-_Weltvogelpark_Walsrode_2010-10.jpg",
  },
  "bosque-sandhill-cranes": {
    imagePath: "/images/events/bosque-sandhill-cranes.jpg",
    credit: "Dori / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sandhill_Cranes_in_flight_7960.jpg",
  },
  "tonga-humpback-swim": {
    imagePath: "/images/events/tonga-humpback-swim.jpg",
    credit:
      "R. Wicklund (OAR/National Undersea Research Program (NURP); National Marine Mammal Lab) / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Megaptera_novaeangliae_underwater_NOAA.jpg",
  },
  "uganda-ishasha-tree-lions": {
    imagePath: "/images/events/uganda-ishasha-tree-lions.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tree-climbing_lions_(Panthera_leo).jpg",
  },
  "zambia-kasanka-bats": {
    imagePath: "/images/events/zambia-kasanka-bats.jpg",
    credit: "Jan Vršovský / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eidolon_helvum_283616302.jpg",
  },
  "baja-mobula-rays": {
    imagePath: "/images/events/baja-mobula-rays.jpg",
    credit: "Nick Bonzey from Corvallis, OR / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mobula_breach_2.jpg",
  },
  "tanzania-ndutu-calving": {
    imagePath: "/images/events/tanzania-ndutu-calving.jpg",
    credit: "Charles J. Sharp / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Blue_wildebeest_(Connochaetes_taurinus_taurinus)_female_and_calf.jpg",
  },
  "hawaii-humpback-whales": {
    imagePath: "/images/events/hawaii-humpback-whales.jpg",
    credit: "National Marine Sanctuaries / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Whale_Disentanglement_(41330089882).jpg",
  },
  "canada-narwhal-pond-inlet": {
    imagePath: "/images/events/canada-narwhal-pond-inlet.jpg",
    credit: "Gazprom neft / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Narwhal_tail_above_surface.jpg",
  },
  "ano-nuevo-elephant-seals": {
    imagePath: "/images/events/ano-nuevo-elephant-seals.jpg",
    credit: "Frank Schulenburg / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Northern_elephant_seal_in_A%C3%B1o_Nuevo_State_Park-2364.jpg",
  },
  "kenya-lake-bogoria-flamingos": {
    imagePath: "/images/events/kenya-lake-bogoria-flamingos.jpg",
    credit: "Steve Garvie from Dunfermline, Fife, Scotland / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Phoenicopterus_minor_-Lake_Bogoria,_Kenya-8a.jpg",
  },
  "smoky-synchronous-fireflies": {
    imagePath: "/images/events/smoky-synchronous-fireflies.jpg",
    credit: "Rick Shu / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Great_Smoky_Mountain_Fireflies_-_panoramio.jpg",
  },
  "falklands-king-penguins": {
    imagePath: "/images/events/falklands-king-penguins.jpg",
    credit: "Ben Tubby / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Falkland_Islands_Penguins_49.jpg",
  },
  "korea-jinhae-cherry-festival": {
    imagePath: "/images/events/korea-jinhae-cherry-festival.jpg",
    credit: "myllissa / Flickr",
    license: "CC BY-SA 2.0",
    sourceUrl: "https://www.flickr.com/photos/myllissa/457284469/",
  },
  "usa-colorado-maroon-bells-aspen": {
    imagePath: "/images/events/usa-colorado-maroon-bells-aspen.jpg",
    credit: "MichaelKirsh / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Autumn_Gold_and_Maroon.jpg",
  },
  "japan-nikko-autumn-maples": {
    imagePath: "/images/events/japan-nikko-autumn-maples.jpg",
    credit: "lumoplank / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Shoyo-en,_Nikko_-_Shoyoen7827.jpg",
  },
  "usa-antelope-valley-poppy-superbloom": {
    imagePath: "/images/events/usa-antelope-valley-poppy-superbloom.jpg",
    credit: "Person-with-No Name from USA / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Antelope_Valley_California_Poppy_Reserve_-_Flickr_-_JingKe888.jpg",
  },
  "usa-carrizo-plain-superbloom": {
    imagePath: "/images/events/usa-carrizo-plain-superbloom.jpg",
    credit: "Peter D. Tillman from USA / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Central_Temblors_%5E2,_4-20-2023._Along_same_track_as_%5E1._~_Explored_-_Flickr_-_Pete_Tillman.jpg",
  },
  "australia-bay-of-fires-coast": {
    imagePath: "/images/events/australia-bay-of-fires-coast.jpg",
    credit: "Ayanadak123 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Bay_of_Fires,_Tasmania.jpg",
  },
  "usa-alaska-fairbanks-aurora": {
    imagePath: "/images/events/usa-alaska-fairbanks-aurora.jpg",
    credit: "Skybluesally / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aurora_Borealis_seen_from_Fairbanks,_Alaska.jpg",
  },
  "bolivia-uyuni-salt-flats-mirror": {
    imagePath: "/images/events/bolivia-uyuni-salt-flats-mirror.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Salar_de_Uyuni,_Bolivia,_2016-02-04,_DD_10-12_HDR.JPG",
  },
  "usa-bryce-canyon-hoodoos": {
    imagePath: "/images/events/usa-bryce-canyon-hoodoos.jpg",
    credit: "Luca Galuzzi (Lucag) / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:USA_10654_Bryce_Canyon_Luca_Galuzzi_2007.jpg",
  },
  "peru-vinicunca-rainbow-mountain": {
    imagePath: "/images/events/peru-vinicunca-rainbow-mountain.jpg",
    credit: "Christian Morales Callo / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Montana_de_colores_Cusco_(Vinicunca)_y_Valle_Rojo_por_Inka_Time.jpg",
  },
  "usa-white-sands-national-park": {
    imagePath: "/images/events/usa-white-sands-national-park.jpg",
    credit: "dconvertini / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:White_Sands_National_Park,_New_Mexico,_USA_5-2024_21.jpg",
  },
  "usa-yosemite-horsetail-firefall": {
    imagePath: "/images/events/usa-yosemite-horsetail-firefall.jpg",
    credit: "Barney Moss / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:%22Firefall%22_-_Horsetail_Fall_(Yosemite).jpg",
  },
  "usa-san-francisco-golden-gate-fog": {
    imagePath: "/images/events/usa-san-francisco-golden-gate-fog.jpg",
    credit: "Dietmar Rabich / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:San_Francisco_(CA,_USA),_Golden_Gate_Bridge_--_2022_--_3023_(bw).jpg",
  },
  "venezuela-catatumbo-lightning": {
    imagePath: "/images/events/venezuela-catatumbo-lightning.jpg",
    credit: "Fernando Flores from Caracas, Venezuela / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Catatumbo_Lightning_-_Rayo_del_Catatumbo.jpg",
  },
  "japan-zao-snow-monsters": {
    imagePath: "/images/events/japan-zao-snow-monsters.jpg",
    credit: "Toto-artist (talk) / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Zao_juhyo.jpg",
  },
  "russia-lake-baikal-blue-ice": {
    imagePath: "/images/events/russia-lake-baikal-blue-ice.jpg",
    credit: "Sergey Pesterev / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lake_Baikal_in_winter.jpg",
  },
  "japan-abashiri-drift-ice": {
    imagePath: "/images/events/japan-abashiri-drift-ice.jpg",
    credit: "221.20 (talk) / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Abashiri_Drift_ice_banner.jpg",
  },

  "japan-kyoto-cherry-blossom": {
    imagePath: "/images/events/japan-kyoto-cherry-blossom.jpg",
    credit: "::::=UT=:::: / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cherry_blossom_@_Kyoto_-_panoramio_(1).jpg",
  },
  "japan-yoshino-cherry-mountain": {
    imagePath: "/images/events/japan-yoshino-cherry-mountain.jpg",
    credit: "Laitche / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cherry_blossoms_(Somei_Yoshino),_Nagai_Botanical_Garden,_April_2026_-1488.jpg",
  },
  "usa-new-england-fall-foliage": {
    imagePath: "/images/events/usa-new-england-fall-foliage.jpg",
    credit: "King of Hearts / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lake_Willoughby_October_2021_003.jpg",
  },
  "usa-great-smoky-autumn-color": {
    imagePath: "/images/events/usa-great-smoky-autumn-color.jpg",
    credit: "Rhododendrites / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Meadow_in_the_Smoky_Mountains_(41665h).jpg",
  },
  "japan-kyoto-arashiyama-autumn": {
    imagePath: "/images/events/japan-kyoto-arashiyama-autumn.jpg",
    credit: "Joli Rumi / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_Japanese_Macaque_at_Arashiyama_Monkey_Park_Iwatayama,_Japan.jpg",
  },
  "korea-seoraksan-autumn-foliage": {
    imagePath: "/images/events/korea-seoraksan-autumn-foliage.jpg",
    credit: "Joycekim77 / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Seoraksan_in_the_Fall_3-_%EC%84%A4%EC%95%85%EC%82%B0_%EB%8B%A8%ED%92%8D.jpg",
  },
  "argentina-patagonia-autumn-foliage": {
    imagePath: "/images/events/argentina-patagonia-autumn-foliage.jpg",
    credit: "strudelt / Flickr",
    license: "CC BY 2.0",
    sourceUrl: "https://www.flickr.com/photos/strudelt/13710449915/",
  },
  "scotland-glen-coe-autumn": {
    imagePath: "/images/events/scotland-glen-coe-autumn.jpg",
    credit: "Daniel Kraft / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Glencoe_Lochan_reflections_3_20211022.jpg",
  },
  "usa-death-valley-superbloom": {
    imagePath: "/images/events/usa-death-valley-superbloom.jpg",
    credit: "Laura Blanchard from Philadelphia, USA / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2016-03-06_3134i_moda_(27470425033).jpg",
  },
  "south-africa-namaqualand-daisies": {
    imagePath: "/images/events/south-africa-namaqualand-daisies.jpg",
    credit: "Cruithne9 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Namaqualand_flowers.JPG",
  },
  "australia-wa-wildflower-season": {
    imagePath: "/images/events/australia-wa-wildflower-season.jpg",
    credit: "Jean and Fred Hort / Flickr",
    license: "CC BY 2.0",
    sourceUrl: "https://www.flickr.com/photos/jean_hort/29928173062/",
  },
  "usa-texas-bluebonnet-trails": {
    imagePath: "/images/events/usa-texas-bluebonnet-trails.jpg",
    credit: "Dcrjsr / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wildflower_Center_bluebonnet_trail.jpg",
  },
  "iceland-summer-lupine-fields": {
    imagePath: "/images/events/iceland-summer-lupine-fields.jpg",
    credit: "Eric Kilby from Somerville, MA, USA / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lupines,_Chuch,_and_Glacier.jpg",
  },
  "new-zealand-lake-tekapo-lupins": {
    imagePath: "/images/events/new-zealand-lake-tekapo-lupins.jpg",
    credit: "Krzysztof Golik / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lake_Tekapo_01.jpg",
  },
  "japan-hokkaido-biei-flower-fields": {
    imagePath: "/images/events/japan-hokkaido-biei-flower-fields.jpg",
    credit: "pakku / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:%E3%83%A9%E3%83%A0%E3%82%BA%E3%82%A4%E3%83%A4%E3%83%BC%EF%BC%88Lamb%27s_ear_%EF%BC%89_-_panoramio.jpg",
  },
  "france-provence-spring-poppies": {
    imagePath: "/images/events/france-provence-spring-poppies.jpg",
    credit: "Brian Smithson / Flickr",
    license: "CC BY 2.0",
    sourceUrl: "https://www.flickr.com/photos/smithser/9132329269/",
  },
  "france-valensole-lavender": {
    imagePath: "/images/events/france-valensole-lavender.jpg",
    credit: "https://www.reddit.com/user/Grafixart-Photo / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lavender_fields_of_Valensole,_2019.jpg",
  },
  "netherlands-keukenhof-tulips": {
    imagePath: "/images/events/netherlands-keukenhof-tulips.jpg",
    credit: "Willem van Valk / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Keukenhof_tulips_-_17591061520.jpg",
  },
  "netherlands-bollenstreek-tulip-fields": {
    imagePath: "/images/events/netherlands-bollenstreek-tulip-fields.jpg",
    credit: "acediscovery / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Purple-Tulips_Bollenstreek_Hillegom.jpg",
  },
  "japan-farm-tomita-lavender": {
    imagePath: "/images/events/japan-farm-tomita-lavender.jpg",
    credit: "掬茶 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Farm_Tomita_Lavender_East_20260704b.jpg",
  },
  "morocco-valley-of-roses": {
    imagePath: "/images/events/morocco-valley-of-roses.jpg",
    credit: "Benh LIEU SONG from Torcy, France / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rose_Valley_(17455986408).jpg",
  },
  "india-srinagar-tulip-garden": {
    imagePath: "/images/events/india-srinagar-tulip-garden.jpg",
    credit: "Aman Sachan / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tulip_Garden_india_(cropped).jpg",
  },
  "uk-cotswolds-lavender-fields": {
    imagePath: "/images/events/uk-cotswolds-lavender-fields.jpg",
    credit: "Row17 / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cotswold_Lavender_-_geograph.org.uk_-_4056623.jpg",
  },
  "australia-riverina-canola-fields": {
    imagePath: "/images/events/australia-riverina-canola-fields.jpg",
    credit: "Dan O'Cker / Flickr",
    license: "CC BY 2.0",
    sourceUrl: "https://www.flickr.com/photos/danthemanocallaghan/21165736659/",
  },
  "australia-uluru-sunrise-glow": {
    imagePath: "/images/events/australia-uluru-sunrise-glow.jpg",
    credit: "Dietmar Rabich / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Petermann_Ranges_(AU),_Uluru-Kata_Tjuta_National_Park,_Uluru_--_2019_--_3688.jpg",
  },
  "australia-kata-tjuta-domes": {
    imagePath: "/images/events/australia-kata-tjuta-domes.jpg",
    credit: "Tununda / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kata_Tjuta_-_Valley_of_the_Winds.jpg",
  },
  "australia-bungle-bungle-purnululu": {
    imagePath: "/images/events/australia-bungle-bungle-purnululu.jpg",
    credit: "Graeme Churchard from Bristol (51.4414, -2.5242), UK / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Domes_Walk,_Purnululu_National_Park.jpg",
  },
  "australia-whitehaven-beach": {
    imagePath: "/images/events/australia-whitehaven-beach.jpg",
    credit: "DANIEL JULIE from Paris, France / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DSC122_Australia_Queensland_Whitsunday_Islands_Whitehaven_bay_(5491401519).jpg",
  },
  "australia-great-ocean-twelve-apostles": {
    imagePath: "/images/events/australia-great-ocean-twelve-apostles.jpg",
    credit: "Dietmar Rabich / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Princetown_(AU),_Port_Campbell_National_Park,_Twelve_Apostles_--_2019_--_0969.jpg",
  },
  "australia-lake-hillier-pink-lake": {
    imagePath: "/images/events/australia-lake-hillier-pink-lake.jpg",
    credit: "Yodaobione / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pink_Lake_(Lake_Hillier)_on_Middle_Island_off_the_coast_of_Esperance_Western_Australia.jpg",
  },
  "australia-tessellated-pavement-tasmania": {
    imagePath: "/images/events/australia-tessellated-pavement-tasmania.jpg",
    credit: "JJ Harrison (https://www.jjharrison.com.au/) / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tessellated_Pavement_Sunrise_Landscape.jpg",
  },
  "new-zealand-milford-sound-fjord": {
    imagePath: "/images/events/new-zealand-milford-sound-fjord.jpg",
    credit: "archiescat / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Milford_Sound_and_Sinbad_Gully_-New_Zealand-9Jan2009.jpg",
  },
  "norway-tromso-aurora": {
    imagePath: "/images/events/norway-tromso-aurora.jpg",
    credit: "Andi Gentsch / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aurora_Borealis_Troms%C3%B8_Norway.jpg",
  },
  "iceland-kirkjufell-aurora": {
    imagePath: "/images/events/iceland-kirkjufell-aurora.jpg",
    credit: "vaidyanathan / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aurora_Borealis_activity_on_top_of_the_Kirkjufell_mountain_in_September_2018.jpg",
  },
  "iceland-jokulsarlon-ice-lagoon": {
    imagePath: "/images/events/iceland-jokulsarlon-ice-lagoon.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:021_Wild_smiling_harbor_seal_at_J%C3%B6kuls%C3%A1rl%C3%B3n_(Iceland)_Photo_by_Giles_Laurent.jpg",
  },
  "finland-rovaniemi-aurora": {
    imagePath: "/images/events/finland-rovaniemi-aurora.jpg",
    credit: "Tarja Mitrovic / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rovaniemi_-_Aurora_Borealis.jpg",
  },
  "canada-yellowknife-aurora": {
    imagePath: "/images/events/canada-yellowknife-aurora.jpg",
    credit: "Roland Boisvert / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Yellowknife_River_Territorial_Park.jpg",
  },
  "canada-churchill-aurora-winter": {
    imagePath: "/images/events/canada-churchill-aurora-winter.jpg",
    credit: "Emmanuel Milou from Montreal, Canada / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Dancing_and_swirling_-_Flickr_-_manumilou.jpg",
  },
  "scotland-isle-of-skye-aurora": {
    imagePath: "/images/events/scotland-isle-of-skye-aurora.jpg",
    credit: "Stefan Krause, Germany / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Quiraing_Isle_of_Skye_Pano.jpg",
  },
  "norway-svalbard-polar-night-aurora": {
    imagePath: "/images/events/norway-svalbard-polar-night-aurora.jpg",
    credit: "Frode Bjorshol / Flickr",
    license: "CC BY 2.0",
    sourceUrl: "https://www.flickr.com/photos/froderamone/23303388214/",
  },
  "new-zealand-tekapo-dark-sky": {
    imagePath: "/images/events/new-zealand-tekapo-dark-sky.jpg",
    credit: "Maki Yanagimachi / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mt_John_Observatory_(fig716_wj7c9850a).jpg",
  },
  "usa-antelope-canyon-light-beams": {
    imagePath: "/images/events/usa-antelope-canyon-light-beams.jpg",
    credit: "Mferbfriske / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Upper_antelope_canyon_light_beam_page_arizona_-_Flickr_-_Mferbfriske.jpg",
  },
  "usa-monument-valley-sunrise": {
    imagePath: "/images/events/usa-monument-valley-sunrise.jpg",
    credit: "King of Hearts / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Forrest_Gump_Point_Monument_Valley_November_2018_001.jpg",
  },
  "china-guilin-li-river-karst": {
    imagePath: "/images/events/china-guilin-li-river-karst.jpg",
    credit: "chensiyuan / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:1_li_jiang_guilin_yangshuo_2011.jpg",
  },
  "vietnam-ha-long-bay-karst": {
    imagePath: "/images/events/vietnam-ha-long-bay-karst.jpg",
    credit: "Thomas Hirsch / User:Ravn / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Halong_Bay_in_Vietnam.jpg",
  },
  "turkey-cappadocia-fairy-chimneys": {
    imagePath: "/images/events/turkey-cappadocia-fairy-chimneys.jpg",
    credit: "Benh LIEU SONG (Flickr) / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Cappadocia_Aerial_View_Landscape.jpg",
  },
  "usa-grand-canyon-south-rim": {
    imagePath: "/images/events/usa-grand-canyon-south-rim.jpg",
    credit: "Mgimelfarb / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Grand_Canyon_South_Rim_at_Sunset.jpg",
  },
  "norway-geirangerfjord": {
    imagePath: "/images/events/norway-geirangerfjord.jpg",
    credit: "Jörg Hempel / Wikimedia Commons",
    license: "CC BY-SA 2.0 de",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Geirangerfjord_LC0188.jpg",
  },
  "indonesia-mount-bromo-sunrise": {
    imagePath: "/images/events/indonesia-mount-bromo-sunrise.jpg",
    credit: "Thomas Hirsch (= user Ravn) / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mount_Bromo_at_sunrise,_showing_its_volcanoes_and_Mount_Semeru_(background).jpg",
  },
  "china-longji-rice-terraces": {
    imagePath: "/images/events/china-longji-rice-terraces.jpg",
    credit: "Kurinurm / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Longji_rice_terraces_-_2023_10_11_Kaur_Virunurm.jpg",
  },
  "philippines-banaue-rice-terraces": {
    imagePath: "/images/events/philippines-banaue-rice-terraces.jpg",
    credit: "CEphoto, Uwe Aranas / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Banaue_Philippines_Batad-Rice-Terraces-02.jpg",
  },
  "japan-shirakawa-go-winter-village": {
    imagePath: "/images/events/japan-shirakawa-go-winter-village.jpg",
    credit: "雷太 / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Shirakawa_in_winter;_Gifu_Prefecture;_February_2018_(16).jpg",
  },
  "spain-andalusia-olive-hills": {
    imagePath: "/images/events/spain-andalusia-olive-hills.jpg",
    credit: "Luisacastillo / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fuenteheridos.jpg",
  },
  "italy-val-dorcia-cypress-lines": {
    imagePath: "/images/events/italy-val-dorcia-cypress-lines.jpg",
    credit: "Ciorophotoproject / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sunrise_in_Crete_dell%27Orcia.jpg",
  },
  "portugal-douro-terraced-vineyards": {
    imagePath: "/images/events/portugal-douro-terraced-vineyards.jpg",
    credit: "Rosino / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Terraced_vineyards_in_the_douro_valley.jpg",
  },
  "china-yuanyang-rice-terraces": {
    imagePath: "/images/events/china-yuanyang-rice-terraces.jpg",
    credit: "Jialiang Gao, www.peace-on-earth.org / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Terrace_field_yunnan_china_denoised.jpg",
  },
  "namibia-sossusvlei-deadvlei": {
    imagePath: "/images/events/namibia-sossusvlei-deadvlei.jpg",
    credit: "Giles Laurent / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:054e_Dead_camel_thorn_tree_in_Deadvlei_Photo_by_Giles_Laurent.jpg",
  },
  "morocco-erg-chebbi-sahara-dunes": {
    imagePath: "/images/events/morocco-erg-chebbi-sahara-dunes.jpg",
    credit: "Rosa Cabecinhas and Alcino Cunha / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Morocco_Africa_Flickr_Rosino_December_2005_84514010_edited_by_Buchling.jpg",
  },
  "chile-atacama-salt-lagoons": {
    imagePath: "/images/events/chile-atacama-salt-lagoons.jpg",
    credit: "Luca Galuzzi (Lucag) / Wikimedia Commons",
    license: "CC BY-SA 2.5",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Miscanti_Lagoon_near_San_Pedro_de_Atacama_Chile_Luca_Galuzzi_2006.jpg",
  },
  "australia-simpson-desert-big-red": {
    imagePath: "/images/events/australia-simpson-desert-big-red.jpg",
    credit: "User:Phanly (talk) / Wikimedia Commons",
    license: "CC BY 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:BigRed.JPG",
  },
  "egypt-white-desert-chalk-formations": {
    imagePath: "/images/events/egypt-white-desert-chalk-formations.jpg",
    credit: "Vyacheslav Argenberg / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:White_Desert,_Rock_formations_in_desert_landscape,_Egypt.jpg",
  },
  "jordan-wadi-rum-sandstone": {
    imagePath: "/images/events/jordan-wadi-rum-sandstone.jpg",
    credit: "Vyacheslav Argenberg / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Jordan,_Wadi_Rum_Desert,_Camel.jpg",
  },
  "iceland-seljalandsfoss-waterfall": {
    imagePath: "/images/events/iceland-seljalandsfoss-waterfall.jpg",
    credit: "Diego Delso / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Seljalandsfoss,_Su%C3%B0urland,_Islandia,_2014-08-16,_DD_189-191_HDR.JPG",
  },
  "iceland-skogafoss-waterfall": {
    imagePath: "/images/events/iceland-skogafoss-waterfall.jpg",
    credit: "Martin Falbisoner / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sk%C3%B3gafoss_July_2014.JPG",
  },
  "croatia-plitvice-autumn-lakes": {
    imagePath: "/images/events/croatia-plitvice-autumn-lakes.jpg",
    credit: "Tesla Delacroix / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Plitvice_Lakes1.jpg",
  },
  "norway-lofoten-winter-peaks": {
    imagePath: "/images/events/norway-lofoten-winter-peaks.jpg",
    credit: "Ximonic (Simo Räsänen) / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:View_to_Austnesfjorden_from_St%C3%B8velhaugen_in_a_cloudy_morning,_Austv%C3%A5g%C3%B8ya,_Lofoten,_Norway,_2015_April.jpg",
  },
  "philippines-el-nido-limestone-lagoons": {
    imagePath: "/images/events/philippines-el-nido-limestone-lagoons.jpg",
    credit: "Vyacheslav Argenberg / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Limestone_island_in_Bacuit_Bay,_El_Nido,_Palawan,_Philippines.jpg",
  },
  "thailand-phang-nga-bay-karst": {
    imagePath: "/images/events/thailand-phang-nga-bay-karst.jpg",
    credit: "Vyacheslav Argenberg / Wikimedia Commons",
    license: "CC BY 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Phang_Nga_Bay,_Karst_islands,_Thailand.jpg",
  },
  "new-zealand-hooker-valley-aoraki": {
    imagePath: "/images/events/new-zealand-hooker-valley-aoraki.jpg",
    credit: "Krzysztof Golik / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Valley_of_Hooker_River_02.jpg",
  },
  "canada-moraine-lake-turquoise": {
    imagePath: "/images/events/canada-moraine-lake-turquoise.jpg",
    credit: "Gorgo / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Moraine_Lake_17092005.jpg",
  },
  "switzerland-matterhorn-sunrise": {
    imagePath: "/images/events/switzerland-matterhorn-sunrise.jpg",
    credit: "NOTE: This image is a panorama consisting of multiple frames that were merged or stitched in software. As a result, this image necessarily underwent some form of digital manipulation. These manipulations may include blending, blurring, cloning, and color and perspective adjustments. As a result of these adjustments, the image content may be slightly different from reality at the points where multiple images were combined. This manipulation is often required due to lens, perspective, and parallax distortions. / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:CH.VS.Zermatt_Sunnegga_Grindjisee_Matterhorn_9034_16x9-R_16K.jpg",
  },
  "japan-mt-fuji-autumn-leaves": {
    imagePath: "/images/events/japan-mt-fuji-autumn-leaves.jpg",
    credit: "skyseeker / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mt._Fuji._-_Flickr_-_skyseeker.jpg",
  },
  "china-huangshan-sea-of-clouds": {
    imagePath: "/images/events/china-huangshan-sea-of-clouds.jpg",
    credit: "andreaqi / Andrew Ciceri / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Huangshan_pic_1.jpg",
  },
  "slovenia-lake-bled-morning-mist": {
    imagePath: "/images/events/slovenia-lake-bled-morning-mist.jpg",
    credit: "Mihael Grmek / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Panorama_Bled_01.jpg",
  },
  "usa-california-redwood-coastal-fog": {
    imagePath: "/images/events/usa-california-redwood-coastal-fog.jpg",
    credit: "Ken Lund from Reno, Nevada, USA / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Roosevelt_Elk_Taking_in_the_Scenery,_Prairie_Creek_Redwoods_State_Park,_California_(219386433).jpg",
  },
  "usa-blue-ridge-parkway-valley-fog": {
    imagePath: "/images/events/usa-blue-ridge-parkway-valley-fog.jpg",
    credit: "Acroterion / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Blue_Ridge_Parkway_clouds_VA1.jpg",
  },
  "faroe-islands-atlantic-fog": {
    imagePath: "/images/events/faroe-islands-atlantic-fog.jpg",
    credit: "kallerna / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Tjornuvik_from_Eidiskollur.jpg",
  },
  "italy-val-dorcia-morning-fog": {
    imagePath: "/images/events/italy-val-dorcia-morning-fog.jpg",
    credit: "Fabrizio Lunardi / Wikimedia Commons",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Fable_Land_(175900969).jpeg",
  },
  "usa-tornado-alley-supercells": {
    imagePath: "/images/events/usa-tornado-alley-supercells.jpg",
    credit: "Mike Coniglio / NOAA NSSL / Flickr",
    license: "Public domain",
    sourceUrl: "https://www.flickr.com/photos/noaanssl/48039373157/",
  },
  "usa-florida-gulf-lightning": {
    imagePath: "/images/events/usa-florida-gulf-lightning.jpg",
    credit: "Infinity & Beyond Photography: Kev Cook / Flickr",
    license: "CC BY 4.0",
    sourceUrl: "https://www.flickr.com/photos/infinity-and-beyond/5853700028/",
  },
  "usa-grand-canyon-monsoon-storms": {
    imagePath: "/images/events/usa-grand-canyon-monsoon-storms.jpg",
    credit: "Nate Loper from Flagstaff, AZ, USA / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Monsoon_storm_in_Grand_Canyon_looking_downstream_(42610606345).jpg",
  },
  "australia-top-end-wet-lightning": {
    imagePath: "/images/events/australia-top-end-wet-lightning.jpg",
    credit: "Marc Dalmulder / Flickr",
    license: "CC BY 2.0",
    sourceUrl: "https://www.flickr.com/photos/mdalmuld/10975287554/",
  },
  "finland-lapland-rime-frost": {
    imagePath: "/images/events/finland-lapland-rime-frost.jpg",
    credit: "Emr / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Winter_lapland.jpg",
  },
  "canada-abraham-lake-ice-bubbles": {
    imagePath: "/images/events/canada-abraham-lake-ice-bubbles.jpg",
    credit: "Joli Rumi / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ice_bubble_formation_at_Abraham_Lake.jpg",
  },
  "usa-yellowstone-winter-geothermal": {
    imagePath: "/images/events/usa-yellowstone-winter-geothermal.jpg",
    credit: "Yellowstone National Park from Yellowstone NP, USA / Wikimedia Commons",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Winter,_Hayden_Valley_(24275454214).jpg",
  },
  "iceland-godafoss-winter-frozen": {
    imagePath: "/images/events/iceland-godafoss-winter-frozen.jpg",
    credit: "Andreas Tille / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:GothafossWinter.jpg",
  },

  "austria-hallstatt-autumn": {
    imagePath: "/images/events/austria-hallstatt-autumn.jpg",
    credit: "Lucy Liu / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Swan_Lake_In_Hallstatt_(53948394).jpeg",
  },
  "italy-dolomites-larch-gold": {
    imagePath: "/images/events/italy-dolomites-larch-gold.jpg",
    credit: "kallerna / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Faloria_Cortina_d%27Ampezzo_4.jpg",
  },
  "australia-everlastings-midwest": {
    imagePath: "/images/events/australia-everlastings-midwest.jpg",
    credit: "Gemma Longman / Wikimedia Commons",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Flowers,_Kings_Park,_Perth.jpg",
  },
  "greece-crete-spring-poppies": {
    imagePath: "/images/events/greece-crete-spring-poppies.jpg",
    credit: "JopkeB / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Poppy_field_near_Kares_(Platanias)_2009.jpg",
  },
  "china-zhangye-rainbow-mountains": {
    imagePath: "/images/events/china-zhangye-rainbow-mountains.jpg",
    credit: "YubYub41 / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Zhangye_Danxia.JPG",
  },
  "morocco-ait-benhaddou-kasbah": {
    imagePath: "/images/events/morocco-ait-benhaddou-kasbah.jpg",
    credit: "Petar Milošević / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ksar_A%C3%AFt_Benhaddou,_Marocco_(%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8,_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93).jpg",
  },
  "australia-yarra-valley-morning-fog": {
    imagePath: "/images/events/australia-yarra-valley-morning-fog.jpg",
    credit: "MusikAnimal / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rochford_Wines_vineyard_in_Yarra_Valley_Australia.jpg",
  },
  "japan-echizen-ono-castle-fog": {
    imagePath: "/images/events/japan-echizen-ono-castle-fog.jpg",
    credit: "User:Ajax / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:EchizenOnoCastle-01.JPG",
  },
  "usa-sonoran-monsoon-lightning": {
    imagePath: "/images/events/usa-sonoran-monsoon-lightning.jpg",
    credit: "Digitalintuitive / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Blue_Lighting_in_the_Desert_02.jpg",
  },
  "botswana-kalahari-storm-light": {
    imagePath: "/images/events/botswana-kalahari-storm-light.jpg",
    credit: "DVL2 / Wikimedia Commons",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kalahari_thunder.JPG",
  },
  "poland-bieszczady-hoar-frost": {
    imagePath: "/images/events/poland-bieszczady-hoar-frost.jpg",
    credit: "Milan Bališin / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Riaba_skala_03.JPG",
  },

  "new-zealand-taupo-bay-fog": {
    imagePath: "/images/events/new-zealand-taupo-bay-fog.jpg",
    credit: "Mark in New Zealand / Wikimedia Commons",
    license: "CC BY-SA 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Taupo_Bay.jpg",
  },
};

export function getEventImage(eventId: string): EventImage | undefined {
  return EVENT_IMAGES[eventId];
}
