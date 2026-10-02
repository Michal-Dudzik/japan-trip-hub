# Japonia 2026 — Trip Hub

Mobilna, statyczna strona z planem podróży. Jest przygotowana pod szybki deploy na Vercel.

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Wrzuć katalog do repozytorium GitHub.
2. W Vercel wybierz **Add New → Project** i podłącz repo.
3. Framework powinien wykryć się automatycznie jako **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`

Każdy push do głównej gałęzi może automatycznie wdrażać nową wersję strony.

## Jak aktualizować plan

Najważniejszy plik:

`src/data/trip.ts`

Tam są:
- dni i atrakcje,
- godziny,
- priorytety MUST / OPTIONAL / DROP FIRST,
- linki do Google Maps,
- noclegi,
- rezerwacje,
- checklisty,
- notatki transportowe.

Zmiana danych nie wymaga grzebania w UI.

## Pogoda

Strona pobiera prognozę bez klucza API z **Open-Meteo**. Prognoza jest widoczna przy dniach, które mieszczą się w aktualnym oknie prognozy serwisu.

## Offline / telefon

Po pierwszym otwarciu service worker zapisuje odwiedzone zasoby w pamięci podręcznej. Dzięki temu strona może nadal otworzyć się przy słabszym internecie. Dynamiczna prognoza oczywiście wymaga połączenia.

## Notatki i checklisty

Notatki przy dniach oraz stan checklisty są zapisywane w `localStorage`, czyli **tylko na konkretnym urządzeniu**. Nie synchronizują się pomiędzy osobami.

Jeśli chcecie wspólne notatki i wspólne odhaczanie dla całej piątki, następnym krokiem może być bardzo mały backend (np. Supabase), ale do samego wspólnego planu nie jest potrzebny.

## PDF

Na stronie jest przycisk **Drukuj / PDF**. CSS ma osobny tryb wydruku, więc można zapisać aktualny plan jako PDF bez utrzymywania osobnego dokumentu.

## Zdjęcia

Wykorzystane fotografie są z Unsplash i ładowane zdalnie. Atrybucja znajduje się w stopce strony.
