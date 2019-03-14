import Form from './form.js'; // работа с формой
import saveButton from './saveButton.js';
var form = new Form;
export {form};

ymaps.ready(initMap);

function initMap() {


    form.buttonCloseForm.addEventListener('click', () => { document.querySelector('#form').style.display = "none"; });
    var cordination;
    var myMap = new ymaps.Map("map", {
        center: [55.684758, 37.738521],
        zoom: 11,
        controls: ['zoomControl']
    });
    //getMyForm({{ properties.id|raw }},[e.pageX,e.pageY])
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
        `<div class=ballon_header><a class="link" href=# >{{ properties.id|raw }}</a></div>` +
        '<div class=ballon_body >{{ properties.balloonContentBody|raw }}</div>' +
        '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );

    //Слушаем эвенты и фильруем если эвент был по ссылке
    document.addEventListener('click', function (e) {
        if (e.target.closest("a")) {
            form.getMyForm(e.target.innerHTML, [e.pageX, e.pageY])
            myMap.balloon.close();
        }
    })
    //Создаем кластер
    var myClaster = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    })

    myMap.geoObjects.add(myClaster);

    //Слушаем клик по кнопке Сохранить
    form.formSaveButton.addEventListener('click', () => {
        let myNewPlacemark = saveButton(cordination);
        myClaster.add(myNewPlacemark);
    });


    //Слушаем Клик по карте
    myMap.events.add('click', function (event) {
        cordination = event.get('coords');
        var pxEnter = event.get('pagePixels');
        form.getMyForm(cordination, pxEnter);
        form.getAllComments;

    });

}