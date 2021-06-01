import joi from 'joi';

const isValid = (form) => {

    const schema = joi.object({
        full_name: joi.string()
            .min(4)
            .max(32)
            .required()
            .label('Full Name'),
        email: joi.string()
            .lowercase()
            .email({ tlds: { allow: false } })
            .required()
            .label('e-Mail'),
        password: joi.string()
            .min(8)
            .max(64).
            required()
            .label('PASSWORD'),
        con_password: joi.ref('password'),
        mobileNo: joi.string()
            .min(10)
            .max(13)
            .required()
            .label('Mobile Number'),
        DOB: joi.date()
            .required()
            .label('Date of Birth'),
        gender: joi.string()
            .required()
            .valid('male', 'female', 'other')
            .label('Gender')
    });

    const validate = (dataObject) => {
        const result = schema.validate({
            ...dataObject
        }, { abortEarly: false });

        return result
    }
    const errors = validate({
        full_name: $(form)
            .find('#full_name')
            .val().trim(),
        email: $(form)
            .find('#email')
            .val().toLowerCase().trim(),
        password: $(form)
            .find('#password')
            .val().trim(),
        con_password: $(form)
            .find('#con_password')
            .val().trim(),
        mobileNo: $(form)
            .find('#mobileNo')
            .val().trim(),
        DOB: $(form)
            .find('#DOB')
            .val().trim(),
        gender: $(form)
            .find('#gender')
            .val().trim()
    });


    // Initials Errors
    const initialsError = {
        full_name: null,
        email: null,
        password: null,
        con_password: null,
        mobileNo: null,
        DOB: null,
        gender: null,
        error: true
    }

    if (errors?.error) {
        const { details } = errors.error;
        details.map(function (detail) {
            if ((detail.context.key === 'con_password')) {
                initialsError[detail.context.key] = 'Password do not match'
            } else {
                initialsError[detail.context.key] = detail.message
            }
            initialsError.error = false;
        })
    }

    $(form).find('.error-message').empty(); // clear Error Message

    Object.keys(initialsError).map(error => {
        if (initialsError[error] !== null) {

            if (initialsError.error != true) {
                $(`#${error}`).parent()
                    .addClass('error')
                    .removeClass('success')
                    .find('.error-field').text(initialsError[error]);

                let messages = `<li class="break-words whitespace-normal">${initialsError[error]}.</li>`;
                $(form).find('.error-field').removeClass('invisible h-0').addClass('h-auto')
                $(form).find('.error-message').append(messages)


                if ((initialsError.con_password === null) && (initialsError.password !== null)) {
                    $(form).find(`#con_password`).parent().removeClass('success error');
                } else if ((initialsError.password === null) && (initialsError.con_password === null)) {
                    $(form).find(`#con_password`).parent().addClass('success')
                }
            }

        } else {
            $(form).find('.error-field').removeClass('h-auto').addClass('invisible h-0')
            $(form).find(`#${error}`).parent().addClass('success').removeClass('error');
        }
    });

    return initialsError.error;

}



export default isValid;