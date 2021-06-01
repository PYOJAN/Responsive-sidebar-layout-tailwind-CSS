import axios from 'axios';
import isValid from './vailidator';
import Notiflix from "notiflix";

flatpickr('#DOB', {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
})

// Notiflix.Notify.info("test")
// Notiflix.Block.hourglass('#registration-form-wrapper', 'Creating......');
// setTimeout(function () {
//     Notiflix.Block.remove('#registration-form-wrapper');
// }, 3000)

$(document).ready(function () {
    $('#registration-form').submit(async function (e) {
        e.preventDefault();
        // Registration form
        const form = this;
        const rawData = $(form).serializeArray();
        let data = {};

        // console.info(isValid(form))
        if (isValid(form)) {
            Notiflix.Block.dots('#registration-form-wrapper');

            data = {};

            $.each(rawData, function (indexInArray, valueOfElement) {
                data[valueOfElement.name] = valueOfElement.value;
            });

            await axios.post('/auth/register', data).then(res => {
                console.log(res.data.data)
                Notiflix.Notify.success(res.data.message);
                Notiflix.Block.remove('#registration-form-wrapper');
            }).catch(err => {
                Notiflix.Notify.failure(err.response.data.message);
                Notiflix.Block.remove('#registration-form-wrapper');
            })

        }

    });
});