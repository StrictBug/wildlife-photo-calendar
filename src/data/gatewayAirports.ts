import type { WildlifeEvent } from "@/lib/types";

/** International gateway hub used for flight estimates (not the final bush airstrip). */
export interface Gateway {
  airport: string;
  lat: number;
  lng: number;
}

const BY_COUNTRY: Record<string, Gateway> = {
  Kenya: { airport: "NBO", lat: -1.32, lng: 36.93 },
  Tanzania: { airport: "JRO", lat: -3.38, lng: 36.63 },
  Uganda: { airport: "EBB", lat: 0.05, lng: 32.44 },
  Rwanda: { airport: "KGL", lat: -1.97, lng: 30.14 },
  Ethiopia: { airport: "ADD", lat: 8.98, lng: 38.8 },
  Zambia: { airport: "LUN", lat: -15.33, lng: 28.45 },
  Botswana: { airport: "MUB", lat: -19.97, lng: 23.43 },
  Namibia: { airport: "WDH", lat: -22.48, lng: 17.47 },
  "South Africa": { airport: "JNB", lat: -26.14, lng: 28.24 },
  Madagascar: { airport: "TNR", lat: -18.8, lng: 47.48 },
  India: { airport: "DEL", lat: 28.56, lng: 77.1 },
  "Sri Lanka": { airport: "CMB", lat: 7.18, lng: 79.88 },
  Nepal: { airport: "KTM", lat: 27.7, lng: 85.36 },
  Japan: { airport: "HND", lat: 35.55, lng: 139.78 },
  China: { airport: "CTU", lat: 30.58, lng: 103.95 },
  Malaysia: { airport: "BKI", lat: 5.94, lng: 116.05 },
  Indonesia: { airport: "LBJ", lat: -8.49, lng: 119.89 },
  Philippines: { airport: "MPH", lat: 11.92, lng: 121.95 },
  Thailand: { airport: "BKK", lat: 13.69, lng: 100.75 },
  Mongolia: { airport: "ULN", lat: 47.84, lng: 106.77 },
  Oman: { airport: "MCT", lat: 23.59, lng: 58.28 },
  Israel: { airport: "TLV", lat: 32.01, lng: 34.89 },
  Jordan: { airport: "AMM", lat: 31.72, lng: 35.99 },
  Kazakhstan: { airport: "ALA", lat: 43.35, lng: 77.04 },
  Kyrgyzstan: { airport: "FRU", lat: 42.85, lng: 74.58 },
  Norway: { airport: "TOS", lat: 69.68, lng: 18.92 },
  Finland: { airport: "HEL", lat: 60.32, lng: 24.96 },
  Iceland: { airport: "KEF", lat: 63.99, lng: -22.6 },
  Romania: { airport: "OTP", lat: 44.57, lng: 26.08 },
  Spain: { airport: "MAD", lat: 40.49, lng: -3.57 },
  Poland: { airport: "WAW", lat: 52.17, lng: 20.97 },
  Portugal: { airport: "PDL", lat: 37.74, lng: -25.7 },
  Greece: { airport: "ATH", lat: 37.94, lng: 23.94 },
  "United Kingdom": { airport: "EDI", lat: 55.95, lng: -3.37 },
  USA: { airport: "DEN", lat: 39.86, lng: -104.67 },
  Canada: { airport: "YVR", lat: 49.19, lng: -123.18 },
  Mexico: { airport: "MEX", lat: 19.44, lng: -99.07 },
  "Costa Rica": { airport: "SJO", lat: 9.99, lng: -84.21 },
  Panama: { airport: "PTY", lat: 9.07, lng: -79.38 },
  Guatemala: { airport: "GUA", lat: 14.58, lng: -90.53 },
  Belize: { airport: "BZE", lat: 17.54, lng: -88.31 },
  Brazil: { airport: "CGB", lat: -15.65, lng: -56.12 },
  Ecuador: { airport: "UIO", lat: -0.13, lng: -78.36 },
  Colombia: { airport: "MDE", lat: 6.22, lng: -75.59 },
  Peru: { airport: "CUZ", lat: -13.54, lng: -71.94 },
  Argentina: { airport: "BRC", lat: -41.15, lng: -71.16 },
  Chile: { airport: "PUQ", lat: -53.0, lng: -70.85 },
  Bolivia: { airport: "UYU", lat: -20.13, lng: -67.55 },
  Australia: { airport: "SYD", lat: -33.95, lng: 151.18 },
  "New Zealand": { airport: "CHC", lat: -43.49, lng: 172.53 },
  Fiji: { airport: "NAN", lat: -17.76, lng: 177.44 },
  Samoa: { airport: "APW", lat: -13.83, lng: -172.01 },
  "Papua New Guinea": { airport: "POM", lat: -9.44, lng: 147.22 },
  Bahamas: { airport: "FPO", lat: 26.56, lng: -78.7 },
  Dominica: { airport: "DOM", lat: 15.55, lng: -61.3 },
  "Trinidad and Tobago": { airport: "POS", lat: 10.6, lng: -61.34 },
  Grenada: { airport: "GND", lat: 12.0, lng: -61.79 },
  Antarctica: { airport: "USH", lat: -54.84, lng: -68.3 },
  "South Georgia": { airport: "USH", lat: -54.84, lng: -68.3 },
  Greenland: { airport: "GOH", lat: 64.19, lng: -51.68 },
  Gabon: { airport: "LBV", lat: 0.46, lng: 9.41 },
  Egypt: { airport: "SSH", lat: 27.98, lng: 34.39 },
  Morocco: { airport: "CMN", lat: 33.37, lng: -7.59 },
  Mauritania: { airport: "NKC", lat: 18.1, lng: -15.95 },
  Ghana: { airport: "ACC", lat: 5.61, lng: -0.17 },
  Mozambique: { airport: "MPM", lat: -25.92, lng: 32.57 },
  Senegal: { airport: "DKR", lat: 14.74, lng: -17.49 },
  Seychelles: { airport: "SEZ", lat: -4.67, lng: 55.52 },
  Russia: { airport: "PKC", lat: 53.17, lng: 158.45 },
  Maldives: { airport: "MLE", lat: 4.19, lng: 73.53 },
  Bangladesh: { airport: "DAC", lat: 23.84, lng: 90.4 },
  Cambodia: { airport: "PNH", lat: 11.55, lng: 104.84 },
  Vietnam: { airport: "HAN", lat: 21.22, lng: 105.81 },
  Bhutan: { airport: "PBH", lat: 27.4, lng: 89.42 },
  France: { airport: "MRS", lat: 43.44, lng: 5.22 },
  Switzerland: { airport: "ZRH", lat: 47.46, lng: 8.55 },
  Sweden: { airport: "ARN", lat: 59.65, lng: 17.92 },
  Italy: { airport: "FCO", lat: 41.8, lng: 12.25 },
  Netherlands: { airport: "AMS", lat: 52.31, lng: 4.76 },
  Germany: { airport: "MUC", lat: 48.35, lng: 11.79 },
  Honduras: { airport: "RTB", lat: 16.32, lng: -86.52 },
  Nicaragua: { airport: "MGA", lat: 12.14, lng: -86.17 },
  Guyana: { airport: "GEO", lat: 6.5, lng: -58.25 },
  Cuba: { airport: "HAV", lat: 22.99, lng: -82.41 },
  "Cayman Islands": { airport: "GCM", lat: 19.29, lng: -81.36 },
  "Turks and Caicos": { airport: "PLS", lat: 21.77, lng: -72.27 },
  "New Caledonia": { airport: "NOU", lat: -22.01, lng: 166.21 },
  Vanuatu: { airport: "VLI", lat: -17.7, lng: 168.32 },
  Singapore: { airport: "SIN", lat: 1.36, lng: 103.99 },
};

/** Prefer a nearer hub when the country default is a poor fit. */
const BY_EVENT: Record<string, Gateway> = {
  "philippines-thresher-sharks": { airport: "CEB", lat: 10.31, lng: 123.98 },
  "cocos-hammerheads": { airport: "SJO", lat: 9.99, lng: -84.21 },
};

export function getGateway(event: WildlifeEvent): Gateway {
  return (
    BY_EVENT[event.id] ??
    BY_COUNTRY[event.country] ?? {
      airport: "—",
      lat: event.lat,
      lng: event.lng,
    }
  );
}
