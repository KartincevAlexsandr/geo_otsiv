export default function (loc, form) {
    form.formAllComent.innerHTML = '';
    form.stringComment = '';
    if (form.allPointComment.hasOwnProperty(loc)) {
        form.allPointComment[loc].forEach(element => {
            form.stringComment += `${element.name} ${element.local} ${element.time}<br> ${element.comment}<br>`
        });

        form.formAllComent.innerHTML = form.stringComment;
    }

}