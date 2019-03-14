import getAllComments from './getAllComments.js';
import form from './form.js'; // данные формы

export default function (cordination, pxEnter) {
    var forms = document.querySelector('#form')
    ymaps.geocode(cordination, {
        results: 1
    }).then(function (res) {
        var newContent = res.geoObjects.get(0);
        loc = newContent.properties.get('text');
        forms.style.display = 'block';
        forms.style.top = (pxEnter[1] - 20) + 'px';
        forms.style.left = (pxEnter[0]) + 'px';
        forms.style.zIndex = "300";
        getAllComments(form.loc);
        form.formLocation.innerHTML = loc;
        form.formAddName.value = '';
        form.formAddLocation.value = '';
        form.formAddComment.value = '';

    });
}