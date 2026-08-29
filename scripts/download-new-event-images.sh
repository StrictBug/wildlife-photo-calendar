#!/usr/bin/env bash
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

download uganda-chimpanzees \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chimpanzee-Head_02.JPG/960px-Chimpanzee-Head_02.JPG"

download south-africa-kruger \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Lions_on_a_mound_in_Kruger_National_Park.jpg/960px-Lions_on_a_mound_in_Kruger_National_Park.jpg"

download zambia-south-luangwa \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Leopard_%28Panthera_pardus%29_%2816727787616%29.jpg/960px-Leopard_%28Panthera_pardus%29_%2816727787616%29.jpg"

download ethiopia-geladas \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Gelada_male_in_Simien_Mountains_National_Park.jpg/960px-Gelada_male_in_Simien_Mountains_National_Park.jpg"

download tanzania-ngorongoro \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Black_rhinoceros_in_Ngorongoro_crater.jpg/960px-Black_rhinoceros_in_Ngorongoro_crater.jpg"

download mongolia-eagles \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Golden_Eagle_hunting_on_Marmots.jpg/960px-Golden_Eagle_hunting_on_Marmots.jpg"

download komodo-dragons \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Komodo_dragon_Varanus_komodoensis_Rinca.jpg/960px-Komodo_dragon_Varanus_komodoensis_Rinca.jpg"

download kaziranga-rhinos \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Indian_Rhinoceros_Rhinoceros_unicornis.jpg/960px-Indian_Rhinoceros_Rhinoceros_unicornis.jpg"

download nepal-red-panda \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_Panda.JPG/960px-Red_Panda.JPG"

download oman-green-turtles \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Green_sea_turtle_on_beach.jpg/960px-Green_sea_turtle_on_beach.jpg"

download thailand-gaur \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Gaur_%28Bos_gaurus%29.jpg/960px-Gaur_%28Bos_gaurus%29.jpg"

download norway-orcas \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killer_Whales_in_Norway_%288778366740%29.jpg/960px-Killer_Whales_in_Norway_%288778366740%29.jpg"

download romania-brown-bears \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2012-brown-bear-ursus-arctos.jpg/960px-2012-brown-bear-ursus-arctos.jpg"

download iceland-puffins \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Atlantic_Puffins_%28Fratercula_arctica%29_on_Latrabjarg%2C_Iceland.jpg/960px-Atlantic_Puffins_%28Fratercula_arctica%29_on_Latrabjarg%2C_Iceland.jpg"

download monterey-humpbacks \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Humpback_whale_in_Monterey_Bay.jpg/960px-Humpback_whale_in_Monterey_Bay.jpg"

download everglades-wading-birds \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Roseate_spoonbill_in_the_Florida_Everglades.jpg/960px-Roseate_spoonbill_in_the_Florida_Everglades.jpg"

download denali-caribou \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Caribou_in_Denali_National_Park.jpg/960px-Caribou_in_Denali_National_Park.jpg"

download baja-gray-whales \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Gray_whale_and_calf_in_San_Ignacio_Lagoon.jpg/960px-Gray_whale_and_calf_in_San_Ignacio_Lagoon.jpg"

download mexico-monarchs \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Monarch_Butterfly_Danaus_plexippus_on_Eupatorium_Vertical_Card.jpg/960px-Monarch_Butterfly_Danaus_plexippus_on_Eupatorium_Vertical_Card.jpg"

download belize-howler-monkeys \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Alouatta_pigra_%28Mexican_black_howler%29.jpg/960px-Alouatta_pigra_%28Mexican_black_howler%29.jpg"

download patagonia-penguins \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Spheniscus_magellanicus_-Isla_Magdalena%2C_Patagonia%2C_Chile_-flying-8a.jpg/960px-Spheniscus_magellanicus_-Isla_Magdalena%2C_Patagonia%2C_Chile_-flying-8a.jpg"

download chile-condors \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Condor_Andino.jpg/960px-Condor_Andino.jpg"

download colombia-hummingbirds \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Coeligena_wilsoni_%28female%29_-_Colombia.jpg/960px-Coeligena_wilsoni_%28female%29_-_Colombia.jpg"

download peru-clay-lick-macaws \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Scarlet_Macaws_at_clay_lick.jpg/960px-Scarlet_Macaws_at_clay_lick.jpg"

download tasmania-devils \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tasmanian_Devil_at_Australia_Zoo.jpg/960px-Tasmanian_Devil_at_Australia_Zoo.jpg"

download png-birds-of-paradise \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Raggiana_bird-of-paradise_Paradisaea_raggiana.jpg/960px-Raggiana_bird-of-paradise_Paradisaea_raggiana.jpg"

download ningaloo-whale-sharks \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Whale_shark_Australia.jpg/960px-Whale_shark_Australia.jpg"

download svalbard-polar-bears \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_bear_on_sea_ice_close_to_Svalbard.jpg/960px-Polar_bear_on_sea_ice_close_to_Svalbard.jpg"

download bahamas-tiger-sharks \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tiger_shark_%28Galeocerdo_cuvier%29_at_Tiger_Beach%2C_Bahamas.jpg/960px-Tiger_shark_%28Galeocerdo_cuvier%29_at_Tiger_Beach%2C_Bahamas.jpg"

download dominica-sperm-whales \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sperm_whale_Physeter_macrocephalus.jpg/960px-Sperm_whale_Physeter_macrocephalus.jpg"

echo "Done. $(ls -1 "$DIR"/*.jpg | wc -l | tr -d ' ') images in $DIR"
