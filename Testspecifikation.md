# Testspecifikation

## Testfall 1.1 Visa spelaren

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Spelaren visas längst ner på spelytan.

### Krav.ID
3-Spelaren

## Testfall 1.2 Flytta spelaren

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Spelaren visas längst ner på spelytan.
3. Användaren trycker på vänster piltangent eller a-tangenten.
4. Spelaren flyttas åt vänster.

### Alternativt scenario

3A. Användaren trycker på höger piltangent eller d-tangenten.
4A. Spelaren flyttas åt höger.

### Krav-ID
3-Spelaren






## Testfall 2 Skjuta skott

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Spelaren visas längst ner på spelytan.
3. Användaren trycker på spacebar
4. ETT skott avfyras från spelarens position.
5.Användaren släpper spacebar
6.Användaren trycker på spacebar
7.Ett skott avfyras från spelarens position.

### Alternativt scenario
3A. Användaren håller inne spacebar
4A. ETT skott avfyras från spelarens position.

### Krav-ID
4-Skjuta skott.

## Testfall 3 Pausa/starta spelet

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3. Spelet startas och texten på knappen ändras till “pause”.

### Alternativg scenarion
2A. Användaren trycker på knappen pause uppe i vänstra hörnet på spelytan eller p-tangenten.
3A. Spelet pausas och texten på knappen ändras till “play”.

### Krav-ID
1-Starta/pausa spelet.
2-Snabbpaus/-start



## Testfall 4 FPS

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Antal FPS som spelet körs i visas nere i vänstra hörnet under spelytan.

### Krav-ID
13- FPS


## Testfall 5.1 spöken faller neråt och rör sig slumpat i sidled

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Efter fyra sekunder renderas spökena ut.

### Krav-ID
5-Spöken












##Testfall 5.2 Skjuta ner spöken

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Efter fyra sekunder renderas spökena ut.
4.Spelaren skjuter ett skott.
5.Skottet träffar spöket
6. Spöket och skottet tas bort.

### Krav-ID
6-Skjuta ner spöken

## Testfall 6.1 visa hinder

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Efter fyra sekunder faller ett hinder ner och fastnar på den övre spelytan.

### Krav-ID
7-Hinder










## Testfall 6.2 Hinder flyttas

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Efter fyra sekunder faller ett hinder ner och fastnar på den övre spelytan.
4. När spelaren får 8 poäng faller ytterligare ett hinder ner och fastnar på den övre spelytan.
5. När spelaren får 28 poäng faller det ena hindret ytterligare en bit.


### Krav-ID
8-Hinder flyttas

## Testfall 7 Spöken faller igenom hinder

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3. Ett eller flera spöken faller igenom hindret/hindrena.

### Krav-ID
9-Spöken faller igenom










## Testfall 8 Skott förstörs

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Användaren skjuter ett skott.
4. Skottet träffar ett hinder.
5. Skottet förstörs

### Alternativt scenario
4a. Skottet går över spelytan.
5a.skottet förstörs.



### Krav-ID
10-Skott förstörs

## Testfall 9 Poäng

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3.Användaren skjuter ett skott.
4. Skottet träffar ett spöke.
5. poängen som står längst uppe i vänstra hörnet ökar med 1 poäng.
6.Upprepa scenariot igen.

### Krav-ID
16-Poäng







## Testfall 10 Webbläsare

### Förkrav
Javascript skall vara aktiverat.

### Scenario
1.Starta igång applikationen i Google Chrome.
2.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3. Spela spelet tills du förlorar.

### Alternativa scenarion
1a. Starta igång applikationen i Firefox.
2a.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3a. Spela spelet tills du förlorar.

1b. Starta igång applikationen i Opera.
2b.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3b. Spela spelet tills du förlorar.


1c. Starta igång applikationen i  Intetnet Explorer av nyare verision.
2c.Användaren trycker på knappen play uppe i vänstra hörnet på spelytan eller p-tangenten.
3c. Spela spelet tills du förlorar.

### Krav-ID
13-Webbläsarre









