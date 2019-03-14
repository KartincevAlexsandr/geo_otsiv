import {form} from './script.js';

export default function (cordination) {
    let nowTime = new Date();
    let strTime = `${nowTime.getFullYear()}.${nowTime.getMonth()}.${nowTime.getDay()} ${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`
    if (form.allPointComment.hasOwnProperty(form.loc)) {
        form.allPointComment[form.loc].push({
            name: form.formAddName.value,
            local: form.formAddLocation.value,
            time: strTime,
            comment: form.formAddComment.value,
            id: form.loc
        })
    }
    else {
        form.allPointComment[form.loc] = [{
            name: form.formAddName.value,
            local: form.formAddLocation.value,
            time: strTime,
            comment: form.formAddComment.value
        }]
    }
    form.getAllComments;
    let myPlacemark = new ymaps.Placemark(cordination, {
        balloonContentHeader: form.formAddLocation.value,
        balloonContentBody: form.formAddComment.value,
        balloonContentFooter: form.strTime,
        id: form.loc
    },{
        openBalloonOnClick: false
    });
    myPlacemark.events.add('click', (event) => {
        form.getMyForm(cordination, event.get('pagePixels'));
    });
    return myPlacemark;
}