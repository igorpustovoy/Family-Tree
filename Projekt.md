# Serwis genealogiczny

## Opis problemu

- Należy zaprojektować i zaprogramować „serwis genealogiczny”, pozwalający na budowanie „drzew” genealogicznych.
- Serwis:
  - dla zaoferowania jakiejkolwiek funkcjonalności wymaga rejestracji i zalogowania się
  - ma mieć wielu użytkowników,
  - udostępnia „wyszukiwarkę” użytkowników i grup (patrz poniżej), w których „drzewach genealogicznych” występuje podany **zbiór nazwisk** połączonych (opcjonalnie) z **datami urodzenia**.
- Użytkownicy mogą łączyć się w „grupy”
  - Tworzenie grupy zaczyna się od „propozycji” użytkownika `A` w stosunku do użytkownika `B`, którą `B` musi zaakceptować (można w tym celu wykorzystać „instancję” komunikatora)
  - Aby dołączyć do istniejącej grupy `G`, użytkownik `X` musi uzyskać akceptację **wszystkich** członków grupy (pomyśleć o eleganckim rozwiązaniu tego „problemu”)
- W ramach grupy użytkownicy mogą
  - komunikować się korzystając ze związanego z grupą czatu,
  - wykorzystywać dane genealogiczne (fragmenty drzew/grafów) innych członków grupy (bez ingerowania w oryginalne dane)

## Wytyczne technologiczne

- Do realizacji projektu wykorzytaj język `JavaScript` lub `TypeScript` oraz narzędzia: `Node.js`, `Express.js`, `bcrypt.js`, `passsport.js`.
- Dane genealogiczne przechwuj w postaci **grafów**, korzystając z bazy `Neo4J` lub `OrientDB`
- Interfejs użytkownika aplikacji stwórz w oparciu o `Vue.js`

## Uwagi

- Kod „początkowy” czatu wbudowanego w serwis genealogiczny powinien pochodzić z rozwiązania „serii zadań czatowych”. Jego pierwsza wersja w repozytorium projektu powinna być „obrazem” konkretnego „commitu” rozwiązania tychże zadań.
