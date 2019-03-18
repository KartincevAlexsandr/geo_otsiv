
export default class Form {
    constructor() {
        this.style = document.querySelector('#form').style;
        this.buttonCloseForm = document.querySelector('#close-button');
        this.formLocation = document.querySelector('#addres');
        this.formAddName = document.querySelector('#add-name-input');
        this.formAddLocation = document.querySelector('#add-location-input');
        this.formAddComment = document.querySelector('#add-comment-input');
        this.formSaveButton = document.querySelector('#add-button');
        this.formAllComent = document.querySelector('#comment');
        this.allPointComment = {};
        this.loc = '';
    };

    getMyForm(cordination, pxEnter) {
        ymaps.geocode(cordination, {
            results: 1
        }).then((res) => {
            var newContent = res.geoObjects.get(0);
            this.loc = newContent.properties.get('text');
            this.style.display = 'block';
            this.style.top = (pxEnter[1] - 20) + 'px';
            this.style.left = (pxEnter[0]) + 'px';
            this.style.zIndex = "300";
            this.formLocation.innerHTML = this.loc;
            this.formAddName.value = '';
            this.formAddLocation.value = '';
            this.formAddComment.value = '';

        })
    };

    getAllComment() {
        this.formAllComent.innerHTML = '';
        let stringComment = '';
        if (this.allPointComment.hasOwnProperty(this.loc)) {
            this.allPointComment[this.loc].forEach(element => {
                stringComment += `${element.name} ${element.local} ${element.time}<br> ${element.comment}<br>`
            });

            this.formAllComent.innerHTML = stringComment;
        }
        else {
            this.formAllComent.innerHTML = '<b>В данном месте нет комментариев, Выможете оставить первый!</b>';
        };
    };

}
