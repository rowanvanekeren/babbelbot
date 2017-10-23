@extends('layouts.home')

@section('content')
    <div class="col-md-12">
        <div class="col-md-6 home-left">
            <h1 class="home-title">
                Maak je eigen slimme chatbot in het Nederlands !
            </h1>

            <div class="home-cta-section">
            <a href="#" class="home-cta">Bouw je gratis Chatbot</a>
            </div>
        </div>
        <div class="col-md-6">
            <div class="chat-section">
                <div class="chat-dialogue">

                    <div class="chat-row">
                    <div class="chat-bot">
                        <p> hallo, hoe gaat het?</p>
                    </div>
                        <div style="clear:both"></div>
                    </div>
                    <div class="chat-row">
                    <div class="chat-user">
                        <p> goed hoor met jou?</p>
                    </div>
                        <div style="clear:both"></div>
                    </div>
                    <div class="chat-row">
                    <div class="chat-bot">
                        <p> heel goed, kan ik je ergens mee helpen?</p>
                    </div>
                        <div style="clear:both"></div>
                    </div>
                    <div class="chat-row">
                    <div class="chat-user">
                        <p> Ik zoek een goede chatbot maker</p>
                    </div>
                        <div style="clear:both"></div>
                    </div>
                    <div class="chat-row">
                    <div class="chat-bot">
                        <p> Kijk eens naar babbelbot! veel tevreden klanten</p>
                    </div>
                        <div style="clear:both"></div>
                    </div>
                </div>
                <div class="chat-input">
                    <input class="chat-input-field" type="text" >
                </div>
            </div>
        </div>
    </div>
@endsection