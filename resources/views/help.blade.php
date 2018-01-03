@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid help-section">
        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Intenties</h2>
                    <hr>
                    <p>Lorem UIpada sdfasdkfj ashdfkj ashdkflh asdfkjash dfkjhasdkfjasdh kasd fkjsad hfkjh sdfkljash
                        dfkjsah fkljsadh fkasjdfh kasjdfh asjkdfh sakldjfh asdjkfh sakdjfhasdkjfashdfkjasdhf asjkdfh
                        asdkjfhasdfkljashdfkjas df</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Entities</h2>
                    <hr>
                    <p>Lorem UIpada sdfasdkfj ashdfkj ashdkflh asdfkjash dfkjhasdkfjasdh kasd fkjsad hfkjh sdfkljash
                        dfkjsah fkljsadh fkasjdfh kasjdfh asjkdfh sakldjfh asdjkfh sakdjfhasdkjfashdfkjasdhf asjkdfh
                        asdkjfhasdfkljashdfkjas df</p>
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
                <div class="col-md-12 app-wrapper">
                    <h2>Embedden op website</h2>
                    <hr>
                    <p>Lorem UIpada sdfasdkfj ashdfkj ashdkflh asdfkjash dfkjhasdkfjasdh kasd fkjsad hfkjh sdfkljash
                        dfkjsah fkljsadh fkasjdfh kasjdfh asjkdfh sakldjfh asdjkfh sakdjfhasdkjfashdfkjasdhf asjkdfh
                        asdkjfhasdfkljashdfkjas df</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Dialogen</h2>
                    <hr>
                    <p>Lorem UIpada sdfasdkfj ashdfkj ashdkflh asdfkjash dfkjhasdkfjasdh kasd fkjsad hfkjh sdfkljash
                        dfkjsah fkljsadh fkasjdfh kasjdfh asjkdfh sakldjfh asdjkfh sakdjfhasdkjfashdfkjasdhf asjkdfh
                        asdkjfhasdfkljashdfkjas df</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 ">
                <div class="col-md-12 app-wrapper">
                    <h2>Standaard antwoorden</h2>
                    <hr>
                    <p>Lorem UIpada sdfasdkfj ashdfkj ashdkflh asdfkjash dfkjhasdkfjasdh kasd fkjsad hfkjh sdfkljash
                        dfkjsah fkljsadh fkasjdfh kasjdfh asjkdfh sakldjfh asdjkfh sakdjfhasdkjfashdfkjasdhf asjkdfh
                        asdkjfhasdfkljashdfkjas df</p>
                </div>
            </div>
        </div>

    </div>

@endsection