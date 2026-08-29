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
  Singapore: { airport: "SIN", lat: 1.36, lng: 103.99 },
};

export function getGateway(event: WildlifeEvent): Gateway {
  return (
    BY_COUNTRY[event.country] ?? {
      airport: "—",
      lat: event.lat,
      lng: event.lng,
    }
  );
}
