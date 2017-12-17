@extends('layouts.dashboard')



@section('content')

    <div class="flowchart-wrapper" ng-cloak>
        <div id="flowchart-base" class="flowchart-base"> </div>
        <div class="row modal-overlay hidden" ></div>
        <div class="app-wrapper warning-box delete-link hidden">
            <h2>Weet je zeker dat je deze link wilt verwijderen?</h2>

            <button class="danger-btn delete-link-button">Verwijder</button>
            <button class="main-btn exit-warning-box" >Annuleer</button>
        </div>

        <div class="app-wrapper warning-box delete-state hidden">
            <h2>Weet je zeker dat je dit blok wilt verwijderen?</h2>

            <button class="danger-btn delete-state-button">Verwijder</button>
            <button class="main-btn exit-delete-state" >Annuleer</button>
        </div>


        @include('popup/intentEntity')
        @include('popup/intentTrain')
        @include('popup.intent-state-select')

        <div id="flowchart-menu" class="flowchart-menu">

            <div class="toggle-menu"><i class="fa fa-wrench" aria-hidden="true"></i></div>
            <div class="toggle-menu-collapse">
                <div class="toggle-content-wrapper">
                <div class="toggle-menu-close"><div><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>
                <div class="toggle-menu-content">
                <div class="drag-intent draggable_operator ui-draggable ui-draggable-handle" data-default-text="(nog geen titel)" data-intent-type="1" data-nb-inputs="1" data-nb-outputs="1">AI</div>
                <div class="drag-keyword draggable_operator ui-draggable ui-draggable-handle" data-default-text="(nog geen titel)" data-intent-type="2" data-nb-inputs="1" data-nb-outputs="1"><i class="fa fa-key" aria-hidden="true"></i></div>
                </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom-scripts-before')
    <script src="{{asset('public/js/flowchart/jquery-1.10.2.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery-ui.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.panzoom.min.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.mousewheel.min.js')}}"></script>
    <script src="{{asset('public/js/flowchart/jquery.flowchart.js')}}"></script>
    <script src="{{asset('public/js/addons/select2.min.js')}}"></script>

@endsection

@section('custom-scripts-after')

    <script src="{{asset('public/js/diagram.js')}}"></script>
@endsection

