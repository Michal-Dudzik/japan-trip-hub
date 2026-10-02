export type Priority = 'MUST' | 'OPTIONAL' | 'DROP FIRST';
export type CityKey = 'travel' | 'tokyo' | 'fuji' | 'kyoto' | 'ohara' | 'osaka';

export type Stop = {
  time?: string;
  name: string;
  note?: string;
  priority?: Priority;
  mapQuery?: string;
};

export type DayPlan = {
  date: string;
  title: string;
  city: CityKey;
  overnight?: string;
  summary: string;
  image?: string;
  stops: Stop[];
  planB?: string;
  notes?: string[];
};

export const photos = {
  shibuya: 'https://images.unsplash.com/photo-1772059195993-27cde1912c85?auto=format&fit=crop&fm=jpg&q=78&w=1800',
  fushimi: 'https://images.unsplash.com/photo-1777036137303-12b7926bc97a?auto=format&fit=crop&fm=jpg&q=78&w=1800',
  dotonbori: 'https://images.unsplash.com/photo-1675609647660-f2d8fa566cd9?auto=format&fit=crop&fm=jpg&q=78&w=1800',
  fuji: 'https://images.unsplash.com/photo-1774946479825-b82724a69d6f?auto=format&fit=crop&fm=jpg&q=78&w=1800',
  osakaCastle: 'https://images.unsplash.com/photo-1744479039687-c04851f76dd9?auto=format&fit=crop&fm=jpg&q=78&w=1800',
  sensoji: 'https://images.unsplash.com/photo-1543402701-cfd2d56f773b?auto=format&fit=crop&fm=jpg&q=78&w=1800',
};

export const cityMeta: Record<CityKey, { label: string; lat: number; lon: number }> = {
  travel: { label: 'Podróż', lat: 35.6762, lon: 139.6503 },
  tokyo: { label: 'Tokio', lat: 35.6762, lon: 139.6503 },
  fuji: { label: 'Fuji / Kawaguchiko', lat: 35.4983, lon: 138.7687 },
  kyoto: { label: 'Kioto', lat: 35.0116, lon: 135.7681 },
  ohara: { label: 'Ohara', lat: 35.1195, lon: 135.8343 },
  osaka: { label: 'Osaka', lat: 34.6937, lon: 135.5023 },
};

export const itinerary: DayPlan[] = [
  {
    date: '2026-10-04', title: 'Wylot z Krakowa', city: 'travel', summary: 'Kraków → Niemcy → Tokio. Tylko podróż i sen w samolocie.',
    stops: [{ name: 'Lot do Japonii', priority: 'MUST' }],
    notes: ['Dokumenty, powerbanki i elektronika w bagażu podręcznym.', 'Nie planować żadnych atrakcji.'],
  },
  {
    date: '2026-10-05', title: 'Przylot + Shinjuku', city: 'tokyo', overnight: 'HANAYADO SHINJUKU', summary: 'Łagodny start po locie. Wszystko blisko noclegu i bez presji czasowej.', image: photos.shibuya,
    stops: [
      { time: '~10:00', name: 'Lądowanie na Hanedzie', priority: 'MUST', mapQuery: 'Haneda Airport Tokyo' },
      { time: '~13:00–14:00', name: 'HANAYADO SHINJUKU / zostawienie bagaży', mapQuery: 'HANAYADO SHINJUKU Tokyo' },
      { name: 'Tokyo Metropolitan Government Building', priority: 'OPTIONAL', note: 'Darmowy punkt widokowy — główna alternatywa dla płatnego Shibuya Sky. Jeśli po locie będziecie zmęczeni, można przenieść na inny dzień.', mapQuery: 'Tokyo Metropolitan Government Building Observatories' },
      { name: 'Giant 3D Cat', priority: 'OPTIONAL', mapQuery: 'Cross Shinjuku Vision' },
      { name: 'Godzilla Head', priority: 'OPTIONAL', mapQuery: 'Godzilla Head Shinjuku' },
      { name: 'Kabukicho', priority: 'MUST', mapQuery: 'Kabukicho Tokyo' },
      { name: 'Omoide Yokocho', priority: 'MUST', mapQuery: 'Omoide Yokocho' },
      { name: 'Golden Gai', priority: 'OPTIONAL', mapQuery: 'Shinjuku Golden Gai' },
    ],
    planB: 'To już jest dobry plan na deszcz: większość punktów można skrócić, a czas spędzić w lokalach i galeriach Shinjuku.',
  },
  {
    date: '2026-10-06', title: 'Shinjuku → Harajuku → Shibuya', city: 'tokyo', overnight: 'HANAYADO SHINJUKU', summary: 'Jeden z najważniejszych dni w Tokio. Trasa układa się liniowo i ogranicza zbędne przejazdy.', image: photos.shibuya,
    stops: [
      { time: '09:00', name: 'Shinjuku Gyoen', priority: 'MUST', mapQuery: 'Shinjuku Gyoen National Garden' },
      { name: 'Meiji Jingu', priority: 'MUST', mapQuery: 'Meiji Jingu' },
      { name: 'Yoyogi Park', priority: 'OPTIONAL', mapQuery: 'Yoyogi Park' },
      { name: 'Harajuku / Takeshita Street', priority: 'MUST', mapQuery: 'Takeshita Street Harajuku' },
      { name: 'Miyashita Park', priority: 'OPTIONAL', mapQuery: 'Miyashita Park' },
      { name: 'Hachikō + Shibuya Crossing', priority: 'MUST', mapQuery: 'Shibuya Crossing' },
      { name: 'Shibuya Hikarie 11F Sky Lobby', priority: 'OPTIONAL', note: 'Darmowy widok na Shibuyę; dobra alternatywa dla płatnego Shibuya Sky.', mapQuery: 'Shibuya Hikarie Sky Lobby' },
      { name: 'Center-Gai / Mega Don Quijote', priority: 'OPTIONAL', mapQuery: 'MEGA Don Quijote Shibuya' },
    ],
    planB: 'Jeśli mocno pada: Meiji/Yoyogi skrócić, więcej czasu dać Shibuyi, sklepom i galeriom. Darmowy Sky Lobby w Shibuya Hikarie można potraktować jako krótki punkt widokowy.',
  },
  {
    date: '2026-10-07', title: 'Imperial Palace + Ginza', city: 'tokyo', overnight: 'HANAYADO SHINJUKU', summary: 'Spokojniejszy dzień po intensywnej Shibuyi: centrum, zakupy i architektura.',
    stops: [
      { name: 'Imperial Palace East Gardens', priority: 'MUST', mapQuery: 'Imperial Palace East Gardens' },
      { name: 'Tokyo Station', priority: 'MUST', mapQuery: 'Tokyo Station Marunouchi' },
      { name: 'Pokémon Center Tokyo DX', priority: 'OPTIONAL', mapQuery: 'Pokemon Center Tokyo DX' },
      { name: 'Ginza', priority: 'OPTIONAL', mapQuery: 'Ginza Tokyo' },
      { name: 'Godzilla Statue', priority: 'OPTIONAL', mapQuery: 'Godzilla Statue Hibiya' },
      { name: 'Shimbashi', priority: 'DROP FIRST', mapQuery: 'Shimbashi Tokyo' },
    ],
    planB: 'Ginza, Pokémon Center i Tokyo Station dobrze działają jako plan deszczowy.',
  },
  {
    date: '2026-10-08', title: 'Tsukiji + Tokyo Tower + teamLab', city: 'tokyo', overnight: 'HANAYADO SHINJUKU', summary: 'Dzień z twardą rezerwacją: teamLab Borderless o 13:00.',
    stops: [
      { time: '09:00', name: 'Tsukiji Outer Market', priority: 'MUST', mapQuery: 'Tsukiji Outer Market' },
      { time: '~10:30', name: 'Tokyo Tower', priority: 'MUST', mapQuery: 'Tokyo Tower' },
      { time: '13:00', name: 'teamLab Borderless', priority: 'MUST', note: 'Bilety kupione.', mapQuery: 'teamLab Borderless Azabudai Hills' },
      { name: 'Azabudai Hills', priority: 'OPTIONAL', mapQuery: 'Azabudai Hills' },
      { name: 'Roppongi / Tokyo Midtown', priority: 'OPTIONAL', mapQuery: 'Tokyo Midtown' },
    ],
    planB: 'Idealny dzień deszczowy: teamLab i Azabudai są w większości pod dachem.',
  },
  {
    date: '2026-10-09', title: 'Odaiba + Daikoku PA', city: 'tokyo', overnight: 'HANAYADO SHINJUKU', summary: 'Dzień motoryzacyjny zaczyna się wieczorem. Odaiba wcześniej, potem odbiór auta i Daikoku.',
    stops: [
      { name: 'Odaiba / nabrzeże', priority: 'MUST', mapQuery: 'Odaiba Tokyo' },
      { name: 'DiverCity + Gundam Base Tokyo', priority: 'MUST', mapQuery: 'THE GUNDAM BASE TOKYO' },
      { name: 'Statue of Liberty', priority: 'OPTIONAL', mapQuery: 'Statue of Liberty Odaiba' },
      { name: 'Rainbow Bridge', priority: 'OPTIONAL', mapQuery: 'Rainbow Bridge Tokyo' },
      { time: '~17:00–18:00', name: 'Odbiór auta', priority: 'MUST', note: 'Rezerwacja do zrobienia; najlepiej ETC.' },
      { time: 'wieczór', name: 'Daikoku Parking Area', priority: 'MUST', note: 'Sprawdzić status Shutoko tego samego dnia.', mapQuery: 'Daikoku Parking Area' },
    ],
    planB: 'Jeśli Daikoku jest czasowo zamknięte, zachować możliwość drugiej próby 10.10 wieczorem.',
  },
  {
    date: '2026-10-10', title: 'Kawaguchiko + Fuji Motorsports Museum', city: 'fuji', overnight: 'HANAYADO SHINJUKU', summary: 'Najbardziej pogodowo-zależny dzień całego planu. Wczesny wyjazd zwiększa szanse na widok Fuji.', image: photos.fuji,
    stops: [
      { time: '~06:30–07:00', name: 'Wyjazd z Tokio', priority: 'MUST' },
      { time: '~09:00', name: 'Lake Kawaguchi', priority: 'MUST', mapQuery: 'Lake Kawaguchi' },
      { time: '~13:00–15:00', name: 'Fuji Motorsports Museum', priority: 'MUST', note: 'Warto zarezerwować online.', mapQuery: 'Fuji Motorsports Museum' },
      { name: 'Powrót do Tokio + zwrot auta', priority: 'MUST' },
    ],
    planB: 'Jeśli Fuji jest całkowicie zasłonięte, skrócić Kawaguchiko i dać więcej czasu muzeum / Gotembie.',
  },
  {
    date: '2026-10-11', title: 'Tokio → Kioto → Ohara', city: 'kyoto', overnight: 'Yumoto Onsen OharaSansou', summary: 'Dzień transferowy. Priorytetem jest spokojny dojazd na odbiór auta o 15:00 i wieczór w ryokanie.',
    stops: [
      { time: '~10:15–10:30', name: 'Wyjście z noclegu', priority: 'MUST', note: 'Zostawić duży zapas na dojazd na właściwą stację i znalezienie peronu.' },
      { time: '12:00', name: 'Shinkansen do Kyoto', priority: 'MUST', note: 'Bilet kupiony. Sprawdźcie na bilecie dokładną stację odjazdu, numer pociągu i wagon. Po przyjeździe jedźcie bezpośrednio do wypożyczalni — odbiór auta o 15:00.' },
      { time: '15:00', name: 'Odbiór auta — Kyoto Downtown', priority: 'MUST', note: '9 Nakatonoda Cho Higashi 9 Jo', mapQuery: '9 Nakatonoda Cho Higashi 9 Jo Kyoto' },
      { name: 'Przejazd do OharaSansou', priority: 'MUST', mapQuery: 'Yumoto Onsen OharaSansou' },
      { name: 'Onsen / kolacja / odpoczynek', priority: 'MUST' },
    ],
  },
  {
    date: '2026-10-12', title: 'Ohara → szybki zwrot auta → Osaka', city: 'ohara', overnight: 'Apartment Hotel 11 Kuromon 9', summary: 'Po ryokanie jedziemy praktycznie prosto oddać auto, a potem do Osaki odebrać wcześniej wysłany bagaż i zameldować się w apartamencie.',
    stops: [
      { time: 'rano', name: 'Śniadanie / ostatni onsen / pakowanie', priority: 'MUST' },
      { time: '~10:00', name: 'Check-out z OharaSansou i wyjazd', priority: 'MUST', mapQuery: 'Yumoto Onsen OharaSansou' },
      { time: '~11:15–12:00', name: 'Tankowanie + zwrot auta — Kyoto Downtown', priority: 'MUST', note: 'Rezerwacja jest do 15:00, ale plan zakłada oddanie auta wcześniej i bez dodatkowego zwiedzania Kioto.', mapQuery: '9 Nakatonoda Cho Higashi 9 Jo Kyoto' },
      { name: 'Kyoto → Osaka', priority: 'MUST', note: 'Po zwrocie auta jedziemy bezpośrednio do Osaki.' },
      { name: 'Odbiór wysłanego bagażu', priority: 'MUST', note: 'Bagaż ma czekać w Osace po wcześniejszej wysyłce z Tokio/Kioto.', mapQuery: 'Apartment Hotel 11 Kuromon 9 Osaka' },
      { name: 'Apartment Hotel 11 Kuromon 9 — check-in / zostawienie rzeczy', priority: 'MUST', mapQuery: 'Apartment Hotel 11 Kuromon 9 Osaka' },
      { name: 'Luźny wieczór w Namba / Dotonbori albo odpoczynek', priority: 'OPTIONAL', mapQuery: 'Dotonbori Osaka' },
    ],
    planB: 'Jeśli formalny check-in będzie później, priorytetem jest odebranie/zostawienie bagażu; resztę czasu można spędzić w Kuromon lub Namba.',
    notes: ['Warto potwierdzić z obiektem, że odbierze przesłany bagaż także przed godziną formalnego check-inu.'],
  },
  {
    date: '2026-10-13', title: 'Kioto cały dzień + Arashiyama + noc na mieście', city: 'kyoto', overnight: 'Apartment Hotel 11 Kuromon 9 (rezerwacja zostaje, ale noc spędzamy w Kioto)', summary: 'Najdłuższy dzień wyjazdu: całodzienne zwiedzanie Kioto, Arashiyama pod wieczór, a potem bary do rana. Fushimi Inari przenosimy na świt 14.10.', image: photos.fushimi,
    stops: [
      { time: '~07:30–08:00', name: 'Wyjazd z Osaki do Kioto', priority: 'MUST' },
      { time: '~09:00', name: 'Kiyomizu-dera', priority: 'MUST', mapQuery: 'Kiyomizu-dera' },
      { name: 'Ninenzaka / Sannenzaka', priority: 'MUST', mapQuery: 'Ninenzaka Kyoto' },
      { name: 'Yasaka Shrine + Gion', priority: 'MUST', mapQuery: 'Gion Kyoto' },
      { time: '~12:30–13:30', name: 'Nishiki Market / lunch', priority: 'OPTIONAL', mapQuery: 'Nishiki Market' },
      { name: 'Nijō Castle', priority: 'OPTIONAL', note: 'Jeśli tempo będzie za wolne, to pierwszy duży punkt do odpuszczenia.', mapQuery: 'Nijo Castle' },
      { name: 'Kinkaku-ji', priority: 'MUST', mapQuery: 'Kinkaku-ji' },
      { time: '~16:30–18:00', name: 'Arashiyama Bamboo Grove + okolice', priority: 'MUST', note: 'Celowo późnym popołudniem / o zmierzchu. Nie planujemy pełnego dnia w Arashiyamie.', mapQuery: 'Arashiyama Bamboo Forest' },
      { time: '~19:30', name: 'Powrót do centrum Kioto / kolacja', priority: 'MUST' },
      { time: 'noc', name: 'Ponto-chō / Kiyamachi / Gion — bary do rana', priority: 'MUST', note: 'Nie wracamy tej nocy do Osaki; po barach jedziemy prosto na Fushimi Inari.', mapQuery: 'Pontocho Alley Kyoto' },
    ],
    planB: 'Jeśli pogoda lub tempo nie pozwolą zrobić wszystkiego: odpuścić Nijō Castle, a zachować Kiyomizu, Gion, Kinkaku-ji, Arashiyamę i nocny plan.',
    notes: ['To będzie bardzo długi dzień bez normalnego snu. Zabrać powerbank, cienką warstwę na noc i nie nosić zbędnego bagażu.'],
  },
  {
    date: '2026-10-14', title: 'Fushimi Inari o świcie → powrót do Osaki', city: 'kyoto', overnight: 'Apartment Hotel 11 Kuromon 9', summary: 'Po całej nocy w Kioto jedziemy przed świtem do Fushimi Inari. Wschód słońca w Kioto jest około 06:01, więc chcemy być przy torii wyraźnie wcześniej.', image: photos.fushimi,
    stops: [
      { time: '~04:45–05:00', name: 'Wyjazd z centrum Kioto do Fushimi Inari', priority: 'MUST', note: 'Dla 5 osób taxi może być najprostszą opcją o tej porze; jeśli chcecie jechać pociągiem, sprawdzić dzień wcześniej pierwszy kurs.' },
      { time: '~05:15', name: 'Fushimi Inari Taisha — wejście przed świtem', priority: 'MUST', mapQuery: 'Fushimi Inari Taisha' },
      { time: '~05:35', name: 'Świt / pierwsze światło', priority: 'MUST', note: 'Najlepszy moment na spokojne zdjęcia i spacer bez typowych tłumów.' },
      { time: '~06:01', name: 'Wschód słońca', priority: 'MUST' },
      { time: '~07:00–07:30', name: 'Koniec spaceru / zejście', priority: 'OPTIONAL' },
      { time: '~08:00', name: 'Pociąg do Osaki', priority: 'MUST' },
      { time: '~09:00', name: 'Powrót do apartamentu / śniadanie / sen', priority: 'MUST', mapQuery: 'Apartment Hotel 11 Kuromon 9 Osaka' },
      { time: 'popołudnie / wieczór', name: 'Regeneracja albo bardzo luźna Osaka', priority: 'OPTIONAL', note: 'Nie planować na ten dzień żadnej obowiązkowej atrakcji.' },
    ],
    planB: 'Przy mocnym deszczu Fushimi nadal jest możliwe, ale świt traci część sensu — wtedy skrócić spacer i wrócić wcześniej do Osaki.',
    notes: ['Telefon/powerbank naładowany przed nocnym wyjściem.', 'Po całonocnym wyjściu nie planujemy żadnego prowadzenia auta ani wymagających aktywności.'],
  },
  {
    date: '2026-10-15', title: 'Osaka Castle + Umeda', city: 'osaka', overnight: 'Apartment Hotel 11 Kuromon 9', summary: 'Historia Osaki rano, panorama miasta na koniec dnia.', image: photos.osakaCastle,
    stops: [
      { name: 'Osaka Castle + park', priority: 'MUST', mapQuery: 'Osaka Castle' },
      { name: 'Lunch / centrum', priority: 'OPTIONAL' },
      { name: 'Umeda', priority: 'MUST', mapQuery: 'Umeda Osaka' },
      { time: 'przed zachodem', name: 'Umeda Sky Building', priority: 'MUST', mapQuery: 'Umeda Sky Building' },
      { name: 'Sprawdzić projection mapping przy Osaka Castle', priority: 'OPTIONAL', note: 'Jeśli godziny dobrze pasują.' },
    ],
    planB: 'Przy deszczu: Umeda, galerie i observatory; Osaka Castle nadal możliwe, ale park skrócić.',
  },
  {
    date: '2026-10-16', title: 'Kuromon → Den Den Town → Shinsekai → Dotonbori', city: 'osaka', overnight: 'Apartment Hotel 11 Kuromon 9', summary: 'Najbardziej spójny pieszo dzień w południowej Osace. Jedzenie, gry, retro i neony.', image: photos.dotonbori,
    stops: [
      { time: 'rano', name: 'Kuromon Market', priority: 'MUST', mapQuery: 'Kuromon Ichiba Market' },
      { name: 'Den Den Town', priority: 'MUST', mapQuery: 'Nipponbashi Denden Town' },
      { name: 'Shinsekai', priority: 'MUST', mapQuery: 'Shinsekai Osaka' },
      { name: 'Tsutenkaku', priority: 'OPTIONAL', mapQuery: 'Tsutenkaku' },
      { name: 'Shinsaibashi', priority: 'OPTIONAL', mapQuery: 'Shinsaibashi-suji Shopping Street' },
      { time: 'wieczór', name: 'Dotonbori', priority: 'MUST', mapQuery: 'Dotonbori Osaka' },
    ],
    planB: 'Bardzo dobry dzień na deszcz dzięki targom, pasażom i sklepom.',
  },
  {
    date: '2026-10-17', title: 'Minoh + buffer Kansai', city: 'osaka', overnight: 'Apartment Hotel 11 Kuromon 9', summary: 'Celowo elastyczny dzień. Jeśli coś wypadło wcześniej — naprawiamy plan tutaj.',
    stops: [
      { name: 'Minoh Park', priority: 'OPTIONAL', mapQuery: 'Minoh Park' },
      { name: 'Powrót do Osaki / zakupy / odpoczynek', priority: 'OPTIONAL' },
      { name: 'Nadrobić pominięty punkt z Kioto lub Osaki', priority: 'OPTIONAL' },
    ],
    planB: 'Jeśli mocno pada: całkowicie odpuścić Minoh i wykorzystać dzień na indoor / shopping / odpoczynek.',
  },
  {
    date: '2026-10-18', title: 'Osaka → Tokio + Asakusa', city: 'tokyo', overnight: 'THE BONDS HOTEL TOKYO', summary: 'Powrót Shinkansenem i rozpoczęcie drugiej części Tokio od wschodniej strony miasta.', image: photos.sensoji,
    stops: [
      { time: '~10:00–11:00', name: 'Shinkansen Shin-Osaka → Tokyo', priority: 'MUST', note: 'Rezerwacja do zrobienia.' },
      { name: 'THE BONDS HOTEL TOKYO / bagaże', priority: 'MUST', mapQuery: 'THE BONDS HOTEL TOKYO' },
      { name: 'Asakusa', priority: 'MUST', mapQuery: 'Asakusa Tokyo' },
      { name: 'Sensō-ji po zmroku', priority: 'MUST', mapQuery: 'Senso-ji' },
      { name: 'Tokyo Skytree / okolice', priority: 'OPTIONAL', mapQuery: 'Tokyo Skytree' },
    ],
    planB: 'Jeśli dojazd się przeciągnie: zrobić tylko Asakusa + Sensō-ji.',
  },
  {
    date: '2026-10-19', title: 'Asakusa + Akihabara', city: 'tokyo', overnight: 'THE BONDS HOTEL TOKYO', summary: 'Popkultura, elektronika i arcade. Dzień celowo bez muzeum narodowego (poniedziałek).', image: photos.sensoji,
    stops: [
      { name: 'Asakusa za dnia', priority: 'OPTIONAL', mapQuery: 'Asakusa Tokyo' },
      { name: 'Akihabara Electric Town', priority: 'MUST', mapQuery: 'Akihabara Electric Town' },
      { name: 'Mandarake Complex', priority: 'MUST', mapQuery: 'Mandarake Complex Akihabara' },
      { name: 'Arcade / sklepy / elektronika', priority: 'OPTIONAL', mapQuery: 'Akihabara Tokyo' },
    ],
    planB: 'Akihabara to naturalny plan na złą pogodę.',
  },
  {
    date: '2026-10-20', title: 'Ueno + Tokyo National Museum', city: 'tokyo', overnight: 'THE BONDS HOTEL TOKYO', summary: 'Spokojniejszy dzień kulturalny i częściowo pod dachem.',
    stops: [
      { name: 'Tokyo National Museum', priority: 'MUST', mapQuery: 'Tokyo National Museum' },
      { name: 'Ueno Park', priority: 'OPTIONAL', mapQuery: 'Ueno Park' },
      { name: 'Nadrobienie punktu pominiętego wcześniej', priority: 'OPTIONAL' },
    ],
    planB: 'To już jest jeden z najlepszych planów deszczowych w całym wyjeździe.',
  },
  {
    date: '2026-10-21', title: 'Buffer Tokyo / ostatni pełny dzień', city: 'tokyo', overnight: 'THE BONDS HOTEL TOKYO', summary: 'Nie wypełniamy tego dnia na siłę. To zapas na pogodę, zakupy, ulubione dzielnice i odpoczynek.',
    stops: [
      { name: 'Gōtokuji', priority: 'OPTIONAL', mapQuery: 'Gotokuji Temple' },
      { name: 'Kichijoji / Hard Off', priority: 'OPTIONAL', mapQuery: 'HARD OFF Kichijoji' },
      { name: 'Yokohama', priority: 'OPTIONAL', mapQuery: 'Minatomirai Yokohama' },
      { name: 'Zakupy / powrót do ulubionej dzielnicy', priority: 'MUST' },
      { name: 'Pakowanie przed lotem', priority: 'MUST' },
    ],
    planB: 'Wybór robimy na miejscu na podstawie pogody, zmęczenia i brakujących punktów.',
  },
  {
    date: '2026-10-22', title: 'Powrót do Polski', city: 'travel', summary: 'Lot z Hanedy o 11:45. Bez atrakcji.',
    stops: [
      { time: '~07:15–07:30', name: 'Wyjazd z hotelu', priority: 'MUST' },
      { time: '~08:30–08:45', name: 'Haneda Airport', priority: 'MUST', mapQuery: 'Haneda Airport Tokyo' },
      { time: '11:45', name: 'Odlot', priority: 'MUST' },
    ],
  },
];

export const reservations = [
  { status: 'confirmed', title: 'teamLab Borderless', detail: '8 października, 13:00', mapQuery: 'teamLab Borderless Azabudai Hills' },
  { status: 'confirmed', title: 'Auto — Kyoto Downtown', detail: '11.10 15:00 → 12.10 15:00 · 9 Nakatonoda Cho Higashi 9 Jo', mapQuery: '9 Nakatonoda Cho Higashi 9 Jo Kyoto' },
  { status: 'todo', title: 'Auto — Tokio / Daikoku / Fuji', detail: '9.10 wieczór → 10.10 wieczór · najlepiej ETC' },
  { status: 'todo', title: 'Fuji Motorsports Museum', detail: '10.10 · około 13:00–15:00', mapQuery: 'Fuji Motorsports Museum' },
  { status: 'confirmed', title: 'Shinkansen Tokio → Kyoto', detail: '11.10 · odjazd 12:00 · bilet kupiony' },
  { status: 'todo', title: 'Shinkansen Osaka → Tokio', detail: '18.10 · wyjazd około 10:00–11:00' },
];

export const hotels = [
  { dates: '5–11.10', title: '花宿新宿 HANAYADO SHINJUKU', city: 'Tokio', booking: 'https://www.booking.com/hotel/jp/hua-su-xin-su-hanayado-shinjuku.pl.html', mapQuery: 'HANAYADO SHINJUKU Tokyo' },
  { dates: '11–12.10', title: 'Yumoto Onsen OharaSansou', city: 'Kyoto / Ohara', booking: 'https://www.booking.com/hotel/jp/ohara-sanso.pl.html', mapQuery: 'Yumoto Onsen OharaSansou' },
  { dates: '12–18.10', title: 'Apartment Hotel 11 Kuromon 9', city: 'Osaka', booking: 'https://www.booking.com/hotel/jp/apartment-kuromon-9.pl.html', mapQuery: 'Apartment Hotel 11 Kuromon 9 Osaka' },
  { dates: '18–22.10', title: 'THE BONDS HOTEL TOKYO', city: 'Tokio / Sumida', booking: 'https://www.booking.com/hotel/jp/the-bonds-tokyo.pl.html', mapQuery: 'THE BONDS HOTEL TOKYO' },
];

export const checklist = {
  'Dokumenty': ['Paszport', 'Visit Japan Web + screenshot QR', 'Polisa ubezpieczeniowa + assistance', 'Polskie prawo jazdy', 'Międzynarodowe prawo jazdy — Konwencja Genewska 1949', 'Rezerwacje noclegów offline', 'Bilety / potwierdzenia rezerwacji offline'],
  'Pieniądze': ['Gotówka JPY', 'Revolut', 'Visa debetowa jako backup', 'Mastercard kredytowa', 'Nie trzymać wszystkich kart razem', 'Przy płatności wybierać JPY, nie PLN (bez DCC)'],
  'Elektronika': ['Smartfon', 'MacBook Pro 14 + kabel USB-C', 'Baseus 100W', 'Powerbank 10 000 mAh', 'Powerbank 25 000 mAh — sprawdzić oznaczenie Wh', 'Sony WH-1000XM4', 'PS Vita', 'Kable', 'eSIM', 'Mały statyw — opcjonalnie'],
  'Bagaż / praktyczne': ['Packing cubes', 'Szybkoschnący ręcznik', 'Softshell', 'Cienki bezrękawnik', '8 par skarpet', 'Plastry na pęcherze', 'Lekka torba na zakupy', 'Adapter typu A do Japonii'],
};

export const transportNotes = [
  { title: 'Tokio → Kyoto', text: '11.10: Shinkansen kupiony na 12:00. Rano bez atrakcji: spokojne pakowanie, wyjazd z Shinjuku około 10:15–10:30 i duży zapas na dojazd na stację. Po przyjeździe do Kyoto od razu kierunek wypożyczalnia — auto czeka od 15:00.' },
  { title: 'Kyoto → Osaka', text: '12.10: po check-oucie z ryokanu jedziemy praktycznie prosto oddać auto, najlepiej jeszcze przed końcem rezerwacji o 15:00. Następnie Kyoto → Osaka, odbiór wcześniej wysłanego bagażu i check-in w Apartment Hotel 11 Kuromon 9.' },
  { title: 'Osaka → Tokio', text: '18.10: Shinkansen jest zdecydowanie najbardziej praktyczny. Zwykłe pociągi oznaczają wiele godzin i liczne przesiadki.' },
  { title: 'Daikoku PA', text: 'Dostęp wyłącznie od strony Shutoko. Sprawdzić ewentualne czasowe zamknięcia tego samego dnia.' },
  { title: 'Fuji', text: '10.10 jest dniem pogodowym. Jeśli widoczność Fuji jest słaba, skrócić Kawaguchiko i skupić się na muzeum / trasie.' },
  { title: 'Noc w Kioto + Fushimi', text: '13/14.10: po całym dniu zwiedzania zostajemy w Kioto na nocne bary. Około 04:45–05:00 ruszamy do Fushimi Inari, żeby wejść przed świtem; wschód słońca 14.10 wypada około 06:01. Po zwiedzaniu wracamy pociągiem do Osaki i resztę dnia traktujemy jako regenerację.' },
];
