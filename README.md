# Mobilno-racunarstvo-projekat
**Aplikacija za praćenje navika**

Unutar ovog repozitorijuma nalazi se projekat rađen za predmet Mobilno računarstvo i on je razvijen od strane studenata Fakulteta organizacionih nauka. U izradi smo koristili primrano Ionic + Angular razvojno okruženje. Tema našeg projekta jeste aplikacija koja je namenjena da bude "habit tracker", odnosno aplikacija koju bi ljudi koristili kako bi vodili evidenciju o tome koje su njihove navike na dnevnom nivou, nevezano da li su one negativne ili pozitivne. Korisnik ima mogućnost registracije i logovanja, uređivanja svog profila, dodavanja i menjanja navika, kao i praćenja statistike kroz jednostavan analytics prikaz. 
Funkcionalnosti naše aplikacije su:
- Autentikaciju korisnika smo ostvarili pomoću Firebase Authentication-a gde se tokeni i podaci o korisnicima čuvaju bezbedno. 
- Na stranici profila korisnik vidi svoj avatar, ime, prezime i email adresu. Klikom na dugme EDIT, polja se otključavaju i pojavljuje se dugme SAVE. Kada korisnik završi izmene i sačuva ih, podaci se ažuriraju i polja se ponovo zaključavaju.
- Svaka navika se može posebno uređivati. Pored svake se nalazi dugme EDIT/SAVE koje omogućava korisniku da izmeni naziv navike i snimi je. Ideja je da korisnik lako menja navike koje mu više ne odgovaraju ili ih prilagođava svojim potrebama i menja njihovu tezinu.
- Korisnik može da vidi osnovne informacije o broju aktivnosti i navikama po danu. Statistika je zamišljena tako da prikaže napredak i motiviše korisnika da nastavi sa zdravim navikama.

Tehnologije koje smo koristili:
- Ionic Framework
- Angular
- Firebase Authentication za logovanje i registraciju
- Firestore / Realtime Database za čuvanje dodatnih podataka o korisniku i navikama

Autori projekta: Milan Vukašinović 2021/0277 i Mihajlo Dakić 2021/0384 
