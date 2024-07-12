# KGP Tracker

KGP Tracker to aplikacja webowa, która umożliwia śledzenie i zarządzanie zdobytymi szczytami górskimi z Korony Gór Polski.

## Funkcjonalności

- Rejestracja i logowanie użytkowników
- Wyświetlanie listy szczytów z Korony Gór Polski
- Potwierdzanie zdobycia szczytu poprzez dodanie daty, opisu oraz zdjęcia
- Śledzenie postępów zdobycia wszystkich szczytów
- Pobieranie informacji o szczytach z Wikipedii

## Technologie

- React
- React Bootstrap
- Axios
- React Router
- Sass
- Font Awesome
- JSON Server

## Instalacja

1. Sklonuj repozytorium:
    ```sh
    git clone https://github.com/coffeetunes/KGP-Tracker.git
    ```
2. Przejdź do katalogu projektu:
    ```sh
    cd kgp-tracker
    ```
3. Zainstaluj zależności:
    ```sh
    npm install
    ```
4. Zainstaluj globalnie JSON Server
    ```sh
    npm install -g json-server
    ```

## Uruchamianie

Aby uruchomić aplikację lokalnie, uruchom JSON Server korzystającego z pliku database/db.json:
```sh
json-server --watch db.json --port 5001
```
Następnie zbuduj aplikację w trybie deweloperskim

```sh
npm start
```

Otwórz [http://localhost:3000](http://localhost:3000), aby zobaczyć ją w przeglądarce.

## Budowanie wersji produkcyjnej

Uruchom:
```sh
npm run build
```
Aby zbudować aplikację w trybie produkcyjnym do folderu `build`.

## Konfiguracja
W pliku `config/config.js` znajdują się ustawienia dostępów do baz danych oraz API.

## Kolory
Kolory aplikacji są zdefiniowane w pliku `assets/styles/colors.scss`
