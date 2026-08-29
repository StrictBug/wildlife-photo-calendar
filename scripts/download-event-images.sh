#!/usr/bin/env bash
# Downloads curated Wikimedia Commons 960px thumbs for Wild Season events.
set -euo pipefail
DIR="$(cd "$(dirname "$0")/../public/images/events" && pwd)"
UA="WildSeason/1.0 (wildlife-photo-calendar; educational)"

download() {
  local name="$1"
  local url="$2"
  echo "Downloading $name..."
  curl -fsSL -A "$UA" "$url" -o "$DIR/$name.jpg"
  sleep 1
}

download amboseli-elephants \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Elefante_africano_de_sabana_%28Loxodonta_africana%29%2C_parque_nacional_de_Amboseli%2C_Kenia%2C_2024-05-22%2C_DD_07.jpg/960px-Elefante_africano_de_sabana_%28Loxodonta_africana%29%2C_parque_nacional_de_Amboseli%2C_Kenia%2C_2024-05-22%2C_DD_07.jpg"

download great-migration-serengeti \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Western_white-bearded_wildebeest_%28Connochaetes_taurinus_mearnsi%29_Mara_River_crossing_1b.jpg/960px-Western_white-bearded_wildebeest_%28Connochaetes_taurinus_mearnsi%29_Mara_River_crossing_1b.jpg"

download yellowstone-wolves \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/A_single_female_wolf_traveling_on_the_winter_groomed_road_%2851784665337%29.jpg/960px-A_single_female_wolf_traveling_on_the_winter_groomed_road_%2851784665337%29.jpg"

download costa-rica-hummingbirds \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Eugenes_spectabilis_in_Costa_Rica_02.jpg/960px-Eugenes_spectabilis_in_Costa_Rica_02.jpg"

download churchill-polar-bears \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ursus_maritimus_in_Churchill%2C_Manitoba%2C_October_2013_%2811811068445%29.jpg/960px-Ursus_maritimus_in_Churchill%2C_Manitoba%2C_October_2013_%2811811068445%29.jpg"

download great-barrier-coral-spawn \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Coral_Outcrop_Flynn_Reef.jpg/960px-Coral_Outcrop_Flynn_Reef.jpg"

download pantanal-jaguars \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jaguar_%28Panthera_onca_palustris%29_male_Three_Brothers_River_2.jpg/960px-Jaguar_%28Panthera_onca_palustris%29_male_Three_Brothers_River_2.jpg"

download scotland-puffins \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/02_Atlantic_puffin_on_Treshnish_Isles_by_Romaniviatores.jpg/960px-02_Atlantic_puffin_on_Treshnish_Isles_by_Romaniviatores.jpg"

download borneo-orangutans \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/The_tightroper_orangutan_-_Sepilok_Sanctuary_Center_-_Sabah_-_Borneo_-_Malaysia_-_panoramio.jpg/960px-The_tightroper_orangutan_-_Sepilok_Sanctuary_Center_-_Sabah_-_Borneo_-_Malaysia_-_panoramio.jpg"

download antarctica-penguins \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Penguin_in_Antarctica_jumping_out_of_the_water.jpg/960px-Penguin_in_Antarctica_jumping_out_of_the_water.jpg"

download sri-lanka-leopards \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sri_Lankan_leopard_%28Panthera_pardus_kotiya%29_female_5.jpg/960px-Sri_Lankan_leopard_%28Panthera_pardus_kotiya%29_female_5.jpg"

download galapagos-endemics \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Iguana_marina_%28Amblyrhynchus_cristatus%29%2C_Las_Bachas%2C_isla_Santa_Cruz%2C_islas_Gal%C3%A1pagos%2C_Ecuador%2C_2015-07-23%2C_DD_23.jpg/960px-Iguana_marina_%28Amblyrhynchus_cristatus%29%2C_Las_Bachas%2C_isla_Santa_Cruz%2C_islas_Gal%C3%A1pagos%2C_Ecuador%2C_2015-07-23%2C_DD_23.jpg"

download finland-bears \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Juvenile_Brown_bear_%28Ursus_arctos%29%2C_Viiksimo%2C_Kainuu_region%2C_Finland_%2842882543372%29.jpg/960px-Juvenile_Brown_bear_%28Ursus_arctos%29%2C_Viiksimo%2C_Kainuu_region%2C_Finland_%2842882543372%29.jpg"

download madagascar-lemurs \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ring-tailed_lemur_%28Lemur_catta%29.jpg/960px-Ring-tailed_lemur_%28Lemur_catta%29.jpg"

download alaska-bears-brooks \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Brown_bear_at_Brooks_Falls.jpg/960px-Brown_bear_at_Brooks_Falls.jpg"

download namibia-desert-elephants \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Desert_elephant_%28Loxodonta_africana%29_spraying_sand.jpg/960px-Desert_elephant_%28Loxodonta_africana%29_spraying_sand.jpg"

download philippines-whale-sharks \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rhincodon_typus_344681934.jpg/960px-Rhincodon_typus_344681934.jpg"

download india-tigers-bandhavgarh \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Bengal_tiger_%28Panthera_tigris_tigris%29%2C_Bandhavgarh_National_Park.jpg/960px-Bengal_tiger_%28Panthera_tigris_tigris%29%2C_Bandhavgarh_National_Park.jpg"

download new-zealand-albatross \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Northern_Royal_albatross_flying_in_front_of_Taiaroa_Head_lighthouse.jpg/960px-Northern_Royal_albatross_flying_in_front_of_Taiaroa_Head_lighthouse.jpg"

download botswana-okavango \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/African_elephant_%28Loxodonta_africana%29_reaching_up_1.jpg/960px-African_elephant_%28Loxodonta_africana%29_reaching_up_1.jpg"

download japan-macaques \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Kopfstudie_eines_Japanmakaken_%28Macaca_fuscata%29_im_Jigokudani_Yaen_K%C5%8Den%2C_Japan.jpg/960px-Kopfstudie_eines_Japanmakaken_%28Macaca_fuscata%29_im_Jigokudani_Yaen_K%C5%8Den%2C_Japan.jpg"

download ecuador-andes-macro \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Morpho_achilles_-_Flickr_-_Dick_Culbert_%281%29.jpg/960px-Morpho_achilles_-_Flickr_-_Dick_Culbert_%281%29.jpg"

download caribbean-manatees \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/West_Indian_Manatee_%28Trichechus_manatus%29_in_murky_water_..._%2822008870180%29.jpg/960px-West_Indian_Manatee_%28Trichechus_manatus%29_in_murky_water_..._%2822008870180%29.jpg"

download rwanda-gorillas \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mountain_gorilla_%28Gorilla_beringei_beringei%29_yawn.jpg/960px-Mountain_gorilla_%28Gorilla_beringei_beringei%29_yawn.jpg"

echo "Done. $(ls -1 "$DIR"/*.jpg | wc -l | tr -d ' ') images in $DIR"
