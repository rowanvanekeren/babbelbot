@extends('layouts.home')

@section('content')
    <div class="col-md-12">
        <div class="col-md-12 home-title-wrapper ">
            <h1 class="home-title">
                Maak je eigen slimme chatbot in het Nederlands !
            </h1>

            <div class="home-cta-section">
                @if($user = Auth::user())
                    <a href="{{url('/dashboard')}}" class="home-cta">Bouw je gratis Chatbot</a>

                @else
                    <a href="{{url('/login')}}" class="home-cta">Bouw je gratis Chatbot</a>

                @endif

            </div>
        </div>

    </div>
@endsection

@section('content-2')
    <div class="col-md-12 chat-examples hide-examples">
        <div class="pizza-chat">
            <div class="chat-title"> <p>Pizza</p></div>
            <div class="chat-box">
                <div class="chat-box-inner">

                    </div>
            </div>
            <div class="chat-bottom"> <p></p>{{--<div class="typing-vertical">|</div>--}}</div>
        </div>
        <div class="middel-chat flight-chat">
            <div class="chat-title"> <p>Vliegtickets</p></div>
            <div class="chat-box">
                <div class="chat-box-inner">

                    </div>
            </div>
            <div class="chat-bottom"> <p></p></div>
        </div>
        <div class="helpdesk-chat">
            <div class="chat-title">
                <p>School helpdesk</p>
            </div>
            <div class="chat-box">
                <div class="chat-box-inner">

                </div>
            </div>
            <div class="chat-bottom"> <p></p></div>
        </div>
    </div>
@endsection


@section('content-3')
    <div class="col-md-12 content-3-title">

        <h2> Maak je eigen chatbots met behulp van het Wit.ai framework</h2>
    </div>
    <div class="col-md-12 information-witai first fade-in">

        <div class="col-md-6 text-section">
            <div>
            <h3>Wit.ai is een nlp framework voor het begrijpen van wat u zegt</h3>
            <p>Het maakt gebruik van een AI algoritme waarmee het zinnen kant interpreteren, dit betekend dat u de applicatie alleen maar hoeft te trainen om zinnen te begrijpen. Daardoor kun je een chatbot 'slim' noemen</p>
            </div>
        </div>
        <div class="col-md-6 ">
            <img src="{{asset('public/img/logo/wit.ai.png')}}">
        </div>
    </div>

    <div class="col-md-12 information-witai second fade-in">
        <div class="col-md-6 ">
            <img src="{{asset('public/img/logo/babbelbot-logo.png')}}">
        </div>
        <div class="col-md-6 text-section">
            <div>
                <h3>Wat doet Babbelbot dan precies</h3>
                <p>Babbelbot zorgt ervoor dat je aan de hand van wit.ai, gehele conversaties kunt maken. Ook zijn de meeste functionaliteiten van wit.ai in babbelbot verwerkt. Daarnaast kun je via babbelbot ook je eigen chatbot bouwen en embedden</p>
            </div>
        </div>

    </div>
@endsection


@section('content-4')
    <div class="col-md-12 content-4-title">
        <h2>Met babbelbot bouw je een eigen chatbot die je geheel naar wens kunt aanpassen </h2>

    </div>

    <div class="col-md-12">
        <p>Ook zonder programeer ervaring</p>

    </div>


@endsection


@section('content-5')
    <div class="col-md-12 benefits">
        <div class="col-md-4">
            <div>
                <img src="{{asset('public/img/logo/presentation.png')}}">
                <h3>Marketing</h3>
                <p>Chatbots zijn de nieuwe marketing 'must haves'. Door middel van chabots komen er zichtbaar meer klanten binnen. Je ziet ze tegewoordig daarom ook overal verschijnen </p>

            </div>
        </div>
        <div class="col-md-4">
            <div>
                <img src="{{asset('public/img/logo/deal.png')}}">
                <h3>Natuurlijkere manier van communiceren</h3>
                <p>Door te communiceren met chatbots krijg je een natuurlijker gevoel van communiceren. Het doel is ook om een chatbot zo menselijk mogelijk te maken. De tijden dat je persoonlijk geholpen wordt door een adviseur lijken terug te komen</p>

            </div>
        </div>
        <div class="col-md-4">
            <div>
                <img src="{{asset('public/img/logo/payment-method.png')}}">
                <h3>Bestellen via een chatbot</h3>
                <p>Waarom chatbots niet gebruiken om bestellingen te doen? Ze kunnen sneller vertrouwen winnen bij klanten. En zelfs advies geven! Je zult zien dat er binnenkort veel van deze chabots online gaan komen.</p>

            </div>
        </div>
    </div>
@endsection

@section('content-footer')
    <div class="col-md-12 ">
        <p>2018 - Babbelbot | Contact: info@babbelbot.be </p>
    </div>
@endsection