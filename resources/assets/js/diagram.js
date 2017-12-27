$(document).ready(function() {
    var flowchartReady = false;
    var $flowchartPopup = $('#flowchart-popup');
    var $flowchartPopupIntent = $('#flowchart-popup-intent');
    var $flowchart = $('#flowchart-base');
    var $container = $flowchart.parent();
    var startIntent = null;
    var cx = $flowchart.width() / 2;
    var cy = $flowchart.height() / 2;

    $flowchartPopupIntent.draggable({cancel : '.styled-input, .fast-entity-popup, .new-expression-wrapper'});
    $flowchartPopup.draggable();


    // Panzoom initialization...
    $flowchart.panzoom();

    // Centering panzoom
    $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);

    // Panzoom zoom handling...
    var possibleZooms = [0.5, 0.75, 1, 2, 3];
    var currentZoom = 1;
    $container.on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = (e.delta || e.originalEvent.wheelDelta) || e.originalEvent.detail;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, (currentZoom + (zoomOut * 2 - 1))));
        $flowchart.flowchart('setPositionRatio', possibleZooms[currentZoom]);
        $flowchart.panzoom('zoom', possibleZooms[currentZoom], {
            animate: false,
            focal: e
        });
    });




    // Apply the plugin on a standard, empty div...

    $flowchart.flowchart({
        defaultLinkColor : '#4ca78c',

    /* data: data,*/
        onOperatorCreate: function(operatorID, operatorData){



            return true;
        },
        onOperatorSelect: function(operatorId) {

            angular.element(document.getElementById('flowchart-popup')).scope().popupOpen(operatorId);
            $flowchartPopup.removeClass('hidden');
            return true;
        },
        onLinkCreate: function(linkID, linkData){

            if(flowchartReady){

              //  console.log( $flowchart.flowchart('getOperatorCompleteData', $flowchart.flowchart('getOperatorData', linkData.fromOperator)));
                createLinkOperator(linkID,linkData);
            }

            return true;

        },

        onOperatorMoved: function(operatorID, position){

            updateOperatorPosition(operatorID,position);
        },

        onAfterChange: function(data1 ,data2){

        },
        onOperatorUnselect: function(operatorId){
            angular.element(document.getElementById('flowchart-popup')).scope().popupClose();
            $flowchartPopup.addClass('hidden');

            return true;
        },
        onLinkSelect: function(linkID){
            console.log(linkID);
            //deleteSelectedLink(linkID);
            toggleWarningLink(true, linkID);
            return true;
        },
        onLinkUnselect: function(){
            toggleWarningLink(false);

            return true;
        }
    });

    $('.delete-link-button').click(function(){
        deleteSelectedLink( $(this).attr('data-delete-link-id'));
    });

    $('.exit-warning-box').click(function(){
        toggleWarningLink(false);
    })


    function toggleWarningLink(toggleEvent, linkID){

        if(toggleEvent){
            $('.delete-link-button').attr('data-delete-link-id', linkID);
            $('.modal-overlay').removeClass('hidden');
            $('.delete-link').removeClass('hidden');
        }else{
            $('.delete-link-button').attr('data-delete-link-id', '');
            $('.modal-overlay').addClass('hidden');
            $('.delete-link').addClass('hidden');
        }

    }


    $flowchart.parent().siblings('.delete_selected_button').click(function() {
        $flowchart.flowchart('deleteSelected');
    });


    var $draggableOperators = $('.draggable_operator');
    function deleteSelectedLink(linkID){

        var linkObj = getSelectedLink(linkID);
        $.ajax({
            url: '../../deleteLinkOperator',
            type: 'post',
            data: {
                custom_link_id:linkObj.custom_link_id,
                state_id: linkObj.fromOperator
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (data) {
                $flowchart.flowchart('deleteSelected');
            }
        });
    }

    function getSelectedLink(linkID){
        var data = $flowchart.flowchart('getData');


        for (var key in data.links) {
            // skip loop if the property is from prototype
            if (!data.links.hasOwnProperty(key)) continue;

            if(data.links[key].custom_link_id == linkID){
                return data.links[key];
            }
        }
    }




    var operatorId = 0;

    $draggableOperators.draggable({
        cursor: "move",
        opacity: 0.7,

        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000,

/*        helper: function(e) {
            var $this = $(this);
            var data = createDraggableOperator($this);
            return $flowchart.flowchart('getOperatorElement', data);
        },*/
        stop: function(e, ui) {
            var $this = $(this);
            var elOffset = ui.offset;
            var containerOffset = $container.offset();
            if (elOffset.left > containerOffset.left &&
                elOffset.top > containerOffset.top &&
                elOffset.left < containerOffset.left + $container.width() &&
                elOffset.top < containerOffset.top + $container.height()) {

                var flowchartOffset = $flowchart.offset();

                var relativeLeft = elOffset.left - flowchartOffset.left;
                var relativeTop = elOffset.top - flowchartOffset.top;

                var positionRatio = $flowchart.flowchart('getPositionRatio');
                relativeLeft /= positionRatio;
                relativeTop /= positionRatio;

                var data = createDraggableOperator($this, relativeLeft , relativeTop);
               // data.left = relativeLeft;
              //  data.top = relativeTop;

            }
        }
    });


    $('.toggle-menu').click(function(){
        $('.toggle-content-wrapper').toggleClass('toggle-animation');
    });

    $('.toggle-menu-close').click(function(){
        $('.toggle-content-wrapper').toggleClass('toggle-animation');
    });

    $('#intent-title').on('changeOperatorTitle',function(event, name, operatorID, forceActive){
        forceActive = forceActive || false;

        $flowchart.flowchart('setOperatorTitle', operatorID , checkActiveTitle(null,name, forceActive));
    });

    $(document).on('changeOperatorClass',function(event, intentType, operatorID){

        $flowchart.flowchart('removeClassOperator', operatorID , generateClass(1, null));
        $flowchart.flowchart('removeClassOperator', operatorID , generateClass(2, null));
        $flowchart.flowchart('removeClassOperator', operatorID , generateClass(3, null));
        $flowchart.flowchart('addClassOperator', operatorID , generateClass(intentType, null));
    });

    $(document).on('deleteState',function(event, state_id){
          var links =  getAllLinksFromAndToState(state_id);

          deleteAllLinksFromState(links, state_id);
    });




    $.ajax({
        url: '../../getAllStates',
        type: 'post',
        data: {
          test: 'test'
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },

        success: function (data) {

           processData(data);

        }
    });

    function deleteAllLinksFromState(links, state_id){

        $.ajax({
            url: '../../deleteAllLinksState',
            type: 'post',
            data: {
                links: links,
                state_id: state_id
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (data) {
                deleteState(state_id);
            }
        });
    }

    function deleteState(state_id){

        $.ajax({
            url: '../../deleteState',
            type: 'post',
            data: {

                state_id: state_id
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (data) {
                $flowchart.flowchart('deleteOperator', state_id);
            }
        });
    }
    function getAllLinksFromAndToState(state_id){
        var completeData = $flowchart.flowchart('getData');

        var completeLinks = completeData.links;
        var links = [];


        for (var key in completeLinks) {
            if(completeLinks[key].fromOperator == state_id || completeLinks[key].toOperator == state_id){
                completeLinks[key]['custom_link_id'] = key;
                links.push(completeLinks[key]);
            }
        }


        return links;
    }
    function checkActiveTitle(intent, name, forceActive, intent_type){
        if((typeof  intent != 'undefined' &&
                    intent!= '' &&
                    intent != null) ||
            forceActive

        ){

                return '<i class="fa fa-circle active-intent-color" aria-hidden="true"></i> ' + name;

        }else{
                return '<i class="fa fa-circle inactive-intent-color" aria-hidden="true"></i> ' + name;
        }
    }
    function processData(data){

        var chartJson = {

            operators : {

            },
            links : {

            }
        };



        for(var i = 0; i < data.length; i++){


            if(typeof data[i].state_data.link_data != 'undefined' &&
                data[i].state_data.link_data != '' &&
                data[i].state_data.link_data != null){
                var links = JSON.parse(data[i].state_data.link_data);
            }



            if(parseInt(data[i].state_intents.intent_type) == 1){
                var titleToCheck = data[i].state_intents.intent
            }else if(parseInt(data[i].state_intents.intent_type) == 2){
                var titleToCheck = data[i].state_intents.keyword
            }else if(parseInt(data[i].state_intents.intent_type) == 3){
                var titleToCheck = data[i].state_intents.parameter
            }

            chartJson.operators[data[i].id] = {
                top: data[i].state_data.top,
                left: data[i].state_data.left,
                properties: {
                        class:  generateClass(parseInt(data[i].state_intents.intent_type), data[i]),
                        title: checkActiveTitle(titleToCheck, data[i].state_data.name),
                    inputs: {
                        ins: {
                            label: 'Input (:i)',
                            multiple: true
                        }
                    },
                    outputs: {

                        outs: {
                            label: 'Output (:i)',
                            multiple: true
                        }
                    }
                }
            };

            if(data[i].hasOwnProperty('start_state')){
                if(data[i].start_state == 1){
                   delete chartJson.operators[data[i].id]['properties']['inputs'];
                }
            }

            if(typeof links != 'undefined' &&  links != '' && links != null){
                    for(var a = 0; a < links.length; a++){
                        chartJson.links[links[a].custom_link_id] = {
                            fromOperator: links[a].fromOperator,
                            fromConnector: links[a].fromConnector,
                            fromSubConnector: parseInt(links[a].fromSubConnector),
                            toOperator: links[a].toOperator,
                            toConnector: links[a].toConnector,
                            toSubConnector: parseInt(links[a].toSubConnector),
                            custom_link_id:links[a].custom_link_id
                        };
                    }
            }


        }





        $flowchart.flowchart('setData', chartJson);


        flowchartReady = !flowchartReady;
    }

    function getAllLinksFromOperator(operatorID){


        var completeData = $flowchart.flowchart('getData');

        var completeLinks = completeData.links;
        var links = [];


        for (var key in completeLinks) {
            if(completeLinks[key].fromOperator == operatorID){
                completeLinks[key]['custom_link_id'] = key;
                links.push(completeLinks[key]);
            }
        }


        return links;
    }

    function createLinkOperator(linkID, linkData){

        if(linkData.fromOperator == linkData.toOperator){
            setTimeout(function(){
                $flowchart.flowchart('deleteLink', linkID);
            }, 200);

            return;
        }

        var allLinks = getAllLinksFromOperator(linkData.fromOperator);
        var currentLink = linkData;
        currentLink['custom_link_id'] = linkID;
        allLinks.push(currentLink);

        $.ajax({
            url: '../../createStateLink',
            type: 'post',
            data: {
                link_data: allLinks,
                parent_id : linkData.fromOperator
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (data) {


            },
            error: function(error){

                $flowchart.flowchart('deleteLink', linkID);
            }
        });
    }

    function createDraggableOperator($element , $left, $top) {




        $.ajax({
            url: '../../createState',
            type: 'post',
            data: {
                top : $top,
                left : $left,
                title : $element.attr('data-default-text'),
                type : $element.attr('data-intent-type') // intent_type
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (data) {

                var resultData = data;

                var Newoperator= {
                    top: resultData.top,
                    left: resultData.left,

                    properties: {
                        class: generateClass(parseInt($element.attr('data-intent-type')), data),
                        title: "<i class='fa fa-circle inactive-intent-color' aria-hidden='true'></i> " + $element.attr('data-default-text'),
                        inputs: {
                            ins: {
                                label: 'Input (:i)',
                                multiple: true
                            }
                        },
                        outputs: {

                            outs: {
                                label: 'Output (:i)',
                                multiple: true
                            }
                        }
                    }
                };

                if(resultData.hasOwnProperty('start_state')){
                    if(resultData.start_state == 1){
                        delete Newoperator['properties']['inputs'];
                    }
                }

                $flowchart.flowchart('createOperator', data.state_id, Newoperator);

            }
        });


    }
    function generateClass(type, data){


       switch(type){
           case 1 :

               if(data){
                   if( data.hasOwnProperty('start_state')){
                       if(data.start_state == 1){
                           startIntent = data.id;
                           return 'state-type-intent start_state';
                       }
                   }
               }
               return 'state-type-intent';

           case 2 :
               return 'state-type-keyword';
           case 3 :
               return 'state-type-free-input';
       }

    }

    function updateOperatorPosition(operatorID, position){
        $.ajax({
            url: '../../updateOperatorPosition',
            type: 'post',
            data: {
                operator_id: operatorID,
                top: position.top,
                left: position.left
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (data) {

            },
            error: function(error){

            }
        });
    }


});