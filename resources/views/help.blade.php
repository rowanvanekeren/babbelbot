@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid help-section">
        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper help-wrapper">
                    <h2>Intenties</h2>
                    <hr>
                    <p>Intenties zijn bedoeld om te begrijpen wat de gebruiker exact bedoeld met een vraag of input. Bijvoorbeeld: </p>
                    <p>Gebruiker: Vertel een mop <br>
                        Intentie: vertel_mop
                    </p>

                    <p> Dit kunnen we trainen zodat de applicatie automatisch variaties van <q>vertel een mop</q> begrijpt.

                        Een voorbeeld van de werking bij dialogen:</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/intents/gebruiker-zegt-input.jpg')}}">
                    </div>
                    <p>Hier typen wij vertel een mop in en zoals je zit kent babbelbot dat nog niet <q>out of the box</q>
                        Wij moeten babbelbot dus trainen, laten we voor de zin <q>vertel een mop</q> een intentie verzinnen die overkoepelend is voor alle variaties. Wij kiezen voor <q>vertel_mop</q> als intentie naam (zie hieronder)
                    </p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/intents/nieuwe-intent-input-voorbeeld.jpg')}}">
                    </div>
                    <p>Nu drukken we op <q>nieuw</q> om de intentie aan te maken</p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/intents/actieve-intentie-voorbeeld.jpg')}}">
                    </div>
                    <p>Je zult zien dat de intentie automatisch als actieve intentie word gezet.
                        Nu kunnen wij de intentie verder trainen zodat babbelbot ons beter begrijpt.
                    </p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/intents/training-omgeving.jpg')}}">
                    </div>
                    <p>Zoals je ziet heb ik hem verder getraind zodat hij mij in de toekomst beter kan begrijpen. Laten we hem nu eens uittesten in het chatvenster (nadat we bij antwoorden een antwoord hebben toegevoegd)</p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/intents/intentie-chat-voorbeeld.jpg')}}">
                    </div>
                    <p>
                        Zoals je ziet staat deze variatie niet letterlijk in onze lijst, en begrijpt babbelbot toch wat je bedoeld.
                        Op deze manier kunnen we conversaties uitwerken.
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper help-wrapper">
                    <h2>Entities</h2>
                    <hr>
                    <p>Met entities kunnen wij zorgen dat gedeeltes uit zinnen kunnen worden gehaald. Bijvoorbeeld:
                        <q>ik wil een vliegtuig van amsterdam naar parijs</q>.
                        Hieruit kunnen we amsterdam en parijs halen. Met deze woorden kunnen wij dan eventueel bewerkingen doen. Het werkt als volgt.
                        Eerst maken wij de entities aan in het entities tab.
                    </p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/entities/entities-menu.jpg')}}">
                    </div>
                    <p>
                        Vervolgens drukken wij op <q>nieuwe entity</q> nu hebben wij twee opties
                    </p>
                    <p>
                       <strong>Sleutelwoorden en vrije tekst</strong>
                    </p>
                    <p>
                        Hiermee kun je gedeeltes uit zinnen trainen zonder dat ze exact gelijk moeten zijn aan een bepaald sleutelwoord. Dus als je zegt: <q>ik wil een vliegtuig van Amsterdam naar Parijs</q> en je kiest voor deze optie zal de applicatie na voldoende training automatisch andere steden begrijpen zonder dat ze vooraf gedefinieerd zijn
                    </p>
                    <p>
                        <strong>Sleutelwoorden</strong>
                    </p>
                    <p>
                        Als een gedeelte van een zin overeenkomt met de vooraf bepaalde sleutelwoorden dan zal de applicatie dat oppikken en doorgeven. Wanneer dat niet het geval is zal het gedeelte in de zin niet herkend worden.
                    </p>

                    <p>
                        Dit zijn de twee opties, bij sleutelwoorden heb je een extra mogelijkheid om synoniemen van woorden in te geven voor betere herkenbaarheid (bijvoorbeeld pizza hawaii en pizza ananas)
                        Voor dit voorbeeld maken wij twee entities aan met de namen vliegen_vanaf en vliegen_naar met als type <q>Sleutelwoorden en vrije tekst</q>.
                        Vervolgens gaan we naar <q>dialogen</q> en maken wij een nieuw dialoog bijvoorbeeld <q>vliegtickets</q>
                    </p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/entities/dialoog-aanmaken.jpg')}}">
                    </div>

                    <p>
                        Nu slepen we het eerste block op het scherm via de plus knop, en drukken wij op het blok
                        Nu voegen we een intent toe met de naam <q>vliegtickets_aanvragen</q>.
                    </p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/entities/intent-toevoegen.jpg')}}">
                    </div>

                    <p>
                        Vervolgens drukken we op trainen.
                        Voeg nu als eerst een aantal vergelijkbare zinnen toe.
                    </p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/entities/train-entities.jpg')}}">
                    </div>

                    <p>Nu gaan we een voor een de zinnen trainen. Selecteer de woorden in de zin in de juiste volgorde.</p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/entities/woorden-trainen-intent-entities.jpg')}}">
                    </div>

                    <p>Vervolgens drukken we op trainen.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/entities/trainen-van-intentie.jpg')}}">
                    </div>

                    <p>Doe dit vervolgens ook bij de andere zinnen en druk op trainen.
                        Vanaf nu wanneer je bijvoorbeeld een inkomende zin naar de backend stuurt (zie backend). Komen de namen van de steden als parameters binnen. Hiermee kun je nu makkelijker bewerkingen doen.
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper help-wrapper">
                    <h2>App aanmaken</h2>
                    <hr>
                    <p>Om gebruik te maken van Babbelbot dien je een access token en server token aan te maken. Dit doe
                        je door via wit.ai een account aan te maken. Dit doe je op https://wit.ai. Een account moet
                        aangemaakt worden of via Github of via Facebook.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/app/wit-login.jpg')}}">
                    </div>
                    <p>Eenmaal een account aangemaakt te hebben dien je een app aan te maken. Elke app die je via
                        Babbelbot aanmaakt dient ook een access en server token van wit.ai te hebben. Deze kun je
                        verkrijgen door op wit.ai een app aan te maken. Dit doe je als volgt.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/app/wit-nav.png')}}">
                    </div>
                    <p>Na dat je bent ingelogd klik je op het <q>plus</q> (+) teken om een app aan te maken.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/app/nieuwe-app-aanmaken.jpg')}}">
                    </div>
                    <p>Verzin een naam en een beschrijving voor je app. Vergeet niet de taal van de app in het
                        Nederlands te zetten. Druk vervolgens op <q>create app</q>.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/app/wit-nav.png')}}">
                    </div>
                    <p>Druk na het aanmaken van de app op <q>settings</q>.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/app/wit-app-details.png')}}">
                    </div>
                    <p>Hier zie je onder andere dit scherm. Pas voor de zekerheid de tijdzone aan in die waarin je
                        leeft. En druk op <q>change app details</q>.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/app/wit-ai-tokens.jpg')}}">
                    </div>
                    <p>Hier vindt je de benodigde tokens deze kun je nu in je app op <a href="https://babbelbot.be">https://babbelbot.be</a>
                        invoeren in de overeenkomstige velden.

                        Alle informatie is te vinden op <a href="https://wit.ai/docs/quickstart">https://wit.ai/docs/quickstart</a>
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Wit.ai</h2>
                    <hr>
                    <p>Wit.ai is gebasseerd op een NLP (natural language processing) algoritme, wat wit.ai in de kern
                        doet is zorgen dat zinnen een intentie krijgen. Of met andere woorden, wit.ai probeert voor jou
                        de zinnen te begrijpen. Dit vergt een klein beetje training om de bot slimmer te maken. Naast
                        intenties is wit.ai geschikt om stukken informatie uit zinnen te halen, dit noemen wij
                        entities.</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper help-wrapper">
                    <h2>Embedden naar Facebook</h2>
                    <hr>
                    <p>Wanneer je een app hebt aangemaakt kun je op <q>embedden</q> klikken. Hier krijg je onder andere de optie om via facebook te embedden. Zoals je ziet hebben wij nog wat informatie nodig.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/facebook/embedden-facebook.jpg')}}">
                    </div>
                    <p>Een verify token mag je al vrij verzinnen. Druk vervolgens op enter om op te slaan. Deze gaan wij later moeten gebruiken.
                        Via facebook je chatbot activeren kan alleen als je een bedrijfspagina hebt. Heb je dit niet? Bekijk hier de instructies om een bedrijfspagina aan te maken
                    </p>

                    <p><a href="https://www.zzpservicedesk.nl/1049/hoe-maak-succesvolle-facebook-bedrijfspagina.htm">https://www.zzpservicedesk.nl/1049/hoe-maak-succesvolle-facebook-bedrijfspagina.htm</a></p>

                <p>Heb je al een bedrijfspagina? Ga dan naar <a href="https://developers.facebook.com">https://developers.facebook.com</a>  en selecteer je pagina om op het dashboard te komen.
                    Eenmaal op het dashboard kies je de optie <q>+ Add product</q> in het linker menu. Vervolgens kies je messenger
                </p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/facebook/messenger-optie.jpg')}}">
                    </div>

                    <p>Vervolgens kun je een eigen token genereren via dit scherm</p>


                    <div class="help-img">
                        <img src="{{asset('public/img/help/facebook/token-genereren-facebook.jpg')}}">
                    </div>

                    <p>Kies je eigen app en kopieer en plak vervolgens de token in het <q>access token</q> veld van je app op Babbelbot.be, en druk op enter om op te slaan.
                        Vervolgens configureren wij de webhook.
                    </p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/facebook/messenger-post-types.jpg')}}">
                    </div>


                    <p>Bij <q>Callback URL</q> voeren we de facebook url in die je via je babbelbot app terug kunt vinden.
                        De <q>Verify Token</q> moet de zelfde token zijn als je hebt ingegeven op Babbelbot.be. Druk nu op <q>verify and save</q> en voil&#224; je chatbot is nu draaiende.
                    </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper help-wrapper">
                    <h2>Embedden op website</h2>
                    <hr>
                    <p>Je kunt er ook voor kiezen om de chatbot op je website te plaatsen. Dit kan a.d.h.v. een jquery plugin gemaakt voor Babbelbot.be deze plugin is terug te vinden op </p>
                    <p><a href="https://github.com/rowanvanekeren/babbelbot-jquery-plugin">https://github.com/rowanvanekeren/babbelbot-jquery-plugin</a> </p>
                    <p>Deze plugin genereerd een chatvenster waarmee je via de access token van wit.ai en de unieke babbelbot URL een chatbot kan embedden op je website. Dit ziet er ongeveer alsvolgt uit: </p>
                    <div class="help-img">
                        <img src="{{asset('public/img/help/chatbot/chatbox-voorbeeld.jpg')}}">
                    </div>
                    <p>Documentatie over deze plugin is te vinden op github (klik op het icoon hieronder)</p>
                    <div class="center-text">
                        <a class="github-icon" href="https://github.com/rowanvanekeren/babbelbot-jquery-plugin"><i class="fa fa-github" aria-hidden="true"></i> Bekijk op github</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper help-wrapper">
                    <h2>Backend webhook</h2>
                    <hr>
                    <p>Wanneer je zelf een antwoord wilt genereren in je eigen backend kun je gebruikmaken van een webhook hiermee kun je bijvoorbeeld je eigen api&#39;s aanspreken en daarop een antwoord genereren</p>
                    <p>Voer een webhook in in het volgende veld.</p>

                    <div class="help-img">
                        <img src="{{asset('public/img/help/backend/webhook-inputveld.jpg')}}">
                    </div>

                    <p>Het object wat je binnenkrijgt ziet er als volgt uit: </p>

                    <pre><code>
                            1.	{
                            2.	   "user_input":"ik wil graag een vlucht van antwerpen naar amsterdam",
                            3.	   "wit_data":{
                            4.	      "_text":"ik wil graag een vlucht van antwerpen naar amsterdam",
                            5.	      "entities":{
                            6.	         "flight_from":[
                            7.	            {
                            8.	               "confidence":"1",
                            9.	               "value":"antwerpen",
                            10.	               "type":"value"
                            11.	            }
                            12.	         ],
                            13.	          "flight_to":[
                            14.	            {
                            15.	               "confidence":"1",
                            16.	               "value":"amsterdam",
                            17.	               "type":"value"
                            18.	            }
                            19.	         ],
                            20.	         "intent":[
                            21.	            {
                            22.	               "confidence":"1",
                            23.	               "value":"flight_request"
                            24.	            }
                            25.	         ]
                            26.	      },
                            27.	      "msg_id":"123465498754"
                            28.	   },
                            29.	   "action":"flight_answer",
                            30.	   "parameters":[
                            31.	        "gebruikersnaam": "Henk"
                            32.	   ]
                            33.	}

                        </code></pre>

                    <p>Parameters is de data die je binnenkrijg van <q>free input</q> blokken. Dit zijn blokken waar het niet uitmaakt wat de gebruiker zegt om in een conversatie te blijven. Deze antwoorden van een gebruiker kun je meegeven als parameter in het object.</p>

                    <p>Je zult een object moeten teruggeven wat er ongeveer zo uitziet: </p>

                    <pre><code>
                        1.	array(
                        2.	    'answers' => array(
                        3.	        array('answer' => 'Jouw antwoord op de gegeven user input'),
                        4.	    ),
                        5.	    'quick_replies' => array(
                        6.	        array('answer' => 'antwoord 1'),
                        7.	        array('answer' => 'antwoord 2'),
                        8.	    ),
                        9.	);

                    </code></pre>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Dialogen</h2>
                    <hr>
                    <p>Dialogen zijn bedoeld gesprekken te kunnen voeren met mensen waarbij de applicatie onthoud in welke staat je zit. Je kunt dus zelf bepalen wat er op welk moment gezegd moet worden. Dit bied veel dynamiek voor de gebruik</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Standaard antwoorden</h2>
                    <hr>
                    <p>Wanneer er geen dialoog bestaat of je gewoon een standaard antwoord op een bepaalde input wilt,
                        dan kun je standaard antwoorden gebruiken. De applicatie zal altijd eerst proberen in een dialoog te gaan. Kan de applicatie geen geschikt dialoog vinden.
                        Dan zal babbelbot kijken of er een standaard antwoord aanwezig is</p>
                </div>
            </div>
        </div>

    </div>

@endsection