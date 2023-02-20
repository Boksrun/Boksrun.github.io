//Functie om een loper in te schrijven
function bevestigInschrijving()
         {

              //Inlezen waarden form
              var voornaam = document.getElementById('idInschrijvingVoornaam').value;
              var naam = document.getElementById('idInschrijvingNaam').value;
              var postcode = document.getElementById('idInschrijvingPostcode').value;
              var gemeente = document.getElementById('idInschrijvingGemeente').value;
              var geslacht = document.getElementById('idInschrijvingGeslacht').value;
              var geboortedatum = document.getElementById('idInschrijvingGeboorteDatum').value;
              var email = document.getElementById('idInschrijvingEmail').value;
              var loopclub = document.getElementById('idInschrijvingLoopclub').value;
              var bedrijf = document.getElementById('idInschrijvingBedrijf').value;
              var bokslid = document.getElementById('idInschrijvingBokslid').value;
              var stofwisselingsziekte = document.getElementById('idInschrijvingStofwisselingsziekte').value;
              var categorie = document.getElementById('idInschrijvingCategorie').value;
              var privacyVerklaring = document.getElementById('idCbxPrivacy').checked;

              //Aanhalingstekens veranderen voor query database
              voornaam = voornaam.replace("'", "''");
              naam = naam.replace("'", "''");
              gemeente = gemeente.replace("'", "''");
              loopclub = loopclub.replace("'", "''");
              bedrijf = bedrijf.replace("'", "''");

              //Spaties van voor en vanachter verwijderen
              voornaam = voornaam.trim();
              naam = naam.trim();
              postcode = postcode.trim();
              gemeente = gemeente.trim();
              email = email.trim();
              loopclub = loopclub.trim();
              bedrijf = bedrijf.trim();

              //Declaratie + initialisatie
              var alertString = "";
              //Spaties uit postcode verwijderen
              var postcodeZonderSpaties = postcode.replace(/\s/g,"");
              //Spaties uit geboortedatum verwijderen
              var geboortedatumZonderSpaties = geboortedatum.replace(/\s/g,"");
              //Controleren of het het juiste formaat is
              var geldigeGeboortedatum = geboortedatumZonderSpaties.match(/^\d{1,2}[/]\d{1,2}[/]\d{4}$/);
              //Declaratie geboortedatum voor database
              var geboortedatumDatabase ="1980-01-01";
              //Controleren of het geldige dagen maanden, .. zijn
              if(geldigeGeboortedatum !== null)
              {
                    //Schuine strepen achterhalen
                    var indexStreep1 = geboortedatumZonderSpaties.indexOf("/");
                    var indexStreep2 = geboortedatumZonderSpaties.indexOf("/", indexStreep1 + 1);
                    //Elementen uit datum halen
                    var dag = geboortedatumZonderSpaties.substring(0, indexStreep1);
                    var maand = geboortedatumZonderSpaties.substring(indexStreep1 + 1, indexStreep2);
                    var jaar = geboortedatumZonderSpaties.substring(indexStreep2 + 1);

                    //Controleren of het geldige dag, maand, jaar is
                    if(dag <= 0 || dag > 31 || maand  <= 0 || maand > 12 || jaar < 1900 || jaar > 2016 )
                    {
                        //Geen geldige geboortedatum
                        geldigeGeboortedatum = null;
                    }
                    else
                    {
                        //Voorloop nullen plaatsen indien nodig
                        if(dag.length === 1)
                        {
                            //Voorloop nul
                            dag = "0" + dag;
                        }
                        //Voorloop nullen plaatsen indien nodig
                        if(maand.length === 1)
                        {
                            //Voorloop nul
                            maand = "0" + maand;
                        }
                        //Datum formaat database
                        geboortedatumDatabase = jaar + "-" + maand + "-" + dag;
                    }
                }


              //Declaratie geldige email
              var geldigeEmail = null;
              //Controleren of het een geldig email adres is
              if(email !== null)
              {
                    //Schuine strepen achterhalen
                    var indexApenstaartje = email.indexOf("@");
                    //Controleren of er een apenstaartje is gevonden
                    if (indexApenstaartje !== -1)
                    {
                        //Locatie punt zoeken
                        var indexPunt = email.indexOf(".", indexApenstaartje + 1);
                        //Controleren of er een punt is gevonden
                        if (indexPunt!== -1)
                        {
                            //Controleren of er nog minstens 2 karakters achter punt staan + minstens 2 karakters tussen @ en .
                            if(email.length > indexPunt + 2 && indexPunt > (indexApenstaartje + 1) )
                            {
                                //Email overnemen
                                geldigeEmail = email;

                            }

                       }
                    }
                }

              //Controleren of er een voornaam is ingevuld
              if(voornaam === "" )
              {
                  //Voeg melding toe dat men een voornaam moet invullen
                  alertString = addToAlertString("\nVoornaam niet ingevuld", alertString);
              }
              //Controleren of er een naam is ingevuld
              if(naam === "" )
              {
                  //Voeg melding toe dat men een naam moet invullen
                  alertString = addToAlertString("\nNaam niet ingevuld", alertString);
              }
              //Controleren of er een postcode is ingevuld (minimum 4 karakters)
              if(postcodeZonderSpaties.length < 4)
              {
                  //Voeg melding toe dat men een geldige postcode moet invullen
                  alertString = addToAlertString("\nGeen geldige postcode ingevuld (minstens 4 karakters)", alertString);
              }
              //Controleren of er een gemeente is ingevuld
              if(gemeente === "" )
              {
                  //Voeg melding toe dat men een gemeente moet invullen
                  alertString = addToAlertString("\nGemeente niet ingevuld", alertString);
              }
              //Controleren of geslacht geselecteerd is
              if(geslacht !== "M" && geslacht !== "V" )
              {
                  //Voeg melding toe dat men een geslacht moet selecteren
                  alertString = addToAlertString("\nGeslacht niet geselecteerd", alertString);
              }
              //Controleren of er een geldige geboortedatum is ingevuld
              if(geldigeGeboortedatum === null )
              {
                  //Voeg melding toe dat men een geldige geboortedatum moet invullen
                  alertString = addToAlertString("\nGeen geldige geboortedatum ingevuld (formaat dd/mm/jjjj)", alertString);
              }
              //Controleren of er een geldige emailis ingevuld
              if(geldigeEmail=== null )
              {
                  //Voeg melding toe dat men een geldige Email moet invullen
                  alertString = addToAlertString("\nGeen geldige mailadres ingevuld (****@**.**)", alertString);
              }
              //Controleren of bokslid geselecteerd is
              if(bokslid !== "JA" && bokslid !== "NEE" )
              {
                  //Voeg melding toe dat men moet selecteren of men bokslid is
                  alertString = addToAlertString("\nBokslid niet geselecteerd", alertString);
              }
              //Controleren of stofwisselingsziekte geselecteerd is
              if(stofwisselingsziekte!== "JA" && stofwisselingsziekte !== "NEE" )
              {
                  //Voeg melding toe dat men moet selecteren of men een stofwisselingsziekte heeft
                  alertString = addToAlertString("\nStofwisselingsziekte niet geselecteerd", alertString);
              }
              //Controleren of categorie geselecteerd is
              if(categorie !== "KIDSRUN" && categorie !== "ROLSTOELRACE" &&
                 categorie !== "HANDBIKERACE" && categorie !== "5KM" && categorie !== "10KM")

              {
                  //Voeg melding toe dat men een categorie moet selecteren
                  alertString = addToAlertString("\nCategorie niet geselecteerd", alertString);
              }

              //Controleren of checkbox PrivacyVerklaring is aangevinkt
              if(privacyVerklaring !== true)
              {
                  //Voeg melding toe dat men Privacy Verklaring moet aanvaarden
                  alertString = addToAlertString("\nAkkoord Privacy Verklaring niet aangevinkt", alertString);
              }


              //Controleren of er een alert met gegeven worden
              if(alertString !== "" )
              {
                  //Alert geven
                  //New instance of showAlertBox
                  alertBox = new showAlertBox();
                  //alertbox weergeven
                  alertBox.render("Probleem inschrijving",alertString);
              }
              else
              {
                  //Opsturen naar app.js
                  //Alle data verzamelen
                  var dataInschrijving = {voornaam: voornaam,
                                          naam: naam,
                                          postcode: postcodeZonderSpaties,
                                          gemeente: gemeente,
                                          geslacht: geslacht,
                                          geboortedatum: geboortedatumDatabase,
                                          email: email,
                                          loopclub: loopclub,
                                          bedrijf: bedrijf,
                                          bokslid: bokslid,
                                          stofwisselingsziekte: stofwisselingsziekte,
                                          categorie: categorie
                                         };

                     $.ajax({
                       url: '/inschrijving',
                       type: 'POST',
                       data: dataInschrijving,
                       //processData: false,
                       //contentType: false,
                       success: function(data){
                                    //Log result
                                    console.log('Message from app.js: ' + data);
                                    //Give alert box
                                      if (data === "InschrijvingOK")
                                      {
                                          //Melding geven dat inschrijving geslaagd is.
                                          //New instance of showAlertBox
                                          alertBox = new showAlertBox();
                                          //alertbox weergeven
                                          alertBox.render("Inschrijving geregistreerd","Uw inschrijving is verwerkt, U ontvangt weldra een bevestigingsmail.");
                                      }
                                      else
                                      {
                                          //Melding geven dat inschrijving mislukt is.
                                          //New instance of showAlertBox
                                          alertBox = new showAlertBox();
                                          //alertbox weergeven
                                          alertBox.render("Inschrijving mislukt","Gelieve op een ander moment opnieuw te proberen<br/>Onze excuses voor het ongemak!");
                                      }
                       }
                     });



              }

         }

//Functie om iets aan een string toe te voegen
function addToAlertString(nieuweString, huidigeAlertString)
         {
            //Controleren of er string al gevormd was
            if(huidigeAlertString === "" )
            {
                //Nieuwe alert string starten.
                return "Gelieve volgende velden in te vullen / selecteren:<br/>" +
                       nieuweString;
            }

            //String toevoegen
            return huidigeAlertString + "<br/>" + nieuweString;

         }

 //Functie om Alertbox te tonen
 function showAlertBox()
  {
         this.render = function(alertTitle, alertMessage){
            //Hoogte scherm bepalen
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            //Elementen alertbox ophalen
            var alertBoxOverlay = document.getElementById('idAlertBoxInschrijvingenOverlay');
            var alertBox = document.getElementById('idAlertBoxInschrijvingen');
            //Overlay over hele scherm leggen
            alertBoxOverlay.style.display = "block";
            alertBoxOverlay.style.height = winHeight + "px";
            //Detemine width
            if(winWidth >= 550 )
            {
                //Alert Box of width 500px
                alertBox.style.width = "500px";
                alertBox.style.left= (winWidth / 2) - (500 / 2) + "px";
            }
            else
            {
                //Alert Box of width - 40px
                alertBox.style.width = (winWidth - 40) + "px";
                alertBox.style.left= (winWidth / 2) - ((winWidth - 40) / 2) + "px";
            }
            //Properties AlertBox aanpassen
            alertBox.style.top= "50px";
            alertBox.style.display = "block";
            //Teksten koppelen + button aanmaken
            document.getElementById('idAlertBoxHeader').innerHTML = alertTitle;
            document.getElementById('idAlertBoxMessage').innerHTML = alertMessage;
            document.getElementById('idAlertBoxFooter').innerHTML = "<button class=\"button style1\" onclick=\"alertBox.ok()\">OK</button>";
        }
        this.ok = function(){
            //Alertbox terug onzichtbaar maken
            document.getElementById('idAlertBoxInschrijvingenOverlay').style.display = "none";
            document.getElementById('idAlertBoxInschrijvingen').style.display = "none";

        }


  }