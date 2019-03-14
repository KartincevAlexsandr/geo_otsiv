import getAllComments from './getAllComments.js';
import getMyForm from './getMyForm.js';

export default function (cordination, myClaster, form) {
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
    getAllComments(form.loc, form);
    let myPlacemark = new ymaps.Placemark(cordination, {
        balloonContentHeader: form.formAddLocation.value,
        balloonContentBody: form.formAddComment.value,
        balloonContentFooter: form.strTime,
        id: form.loc
    });
    myPlacemark.events.add('click', (event) => {
        console.log(event);
        getMyForm(cordination, event.get('pagePixels'));
    });
    myClaster.add(myPlacemark);
    form.formAddName.value = '';
    form.formAddLocation.value = '';
    form.formAddComment.value = '';
}