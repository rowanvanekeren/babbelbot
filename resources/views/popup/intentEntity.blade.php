<div class="app-wrapper fast-entity-popup"  ng-controller='intentEntityController'  active-entity="toggleEntityPopup(data)" ng-init="initEntity()">
    <div class="fast-entity-top">
        <h3>@{{ (entityName)? entityName : 'Nieuwe entity' }}</h3>
        <i class="fa fa-times " aria-hidden="true" ng-click="showEnitityPopup('close')"></i>

    </div>
    <div class="entity-select-wrapper" ng-show="!entityName">


        <select class="default-select entity-select"  {{--ng-model="selectedEntity"--}}>
            <option ng-repeat="entity in allEntities">@{{entity}}</option>

        </select>
    </div>
    <div class="form-group">

        <div class="input-wrapper ">

            <input id="" class="default-input inp-loading" type="text"
                   name="entity-value"
                   placeholder="Er is iets fout gegaan"  ng-model="entityValue"
                   disabled>

            <i class="fa fa-repeat input-saving-overlay hidden"></i>
        </div>

    </div>
    <div class="form-group delete-entity">

        <div class="input-wrapper ">

            <button class="danger-btn" ng-click="deleteEntity()" ng-show="entityName">Verwijder entity </button>
            <button class="main-btn " ng-click="saveEntity()" ng-show="!entityName">Voeg entity toe</button>
        </div>
        <span> *vereist training</span>
    </div>

</div>