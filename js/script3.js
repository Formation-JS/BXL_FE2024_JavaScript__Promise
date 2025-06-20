function obtenirUneReponse(question) {
    if(!question) {
        return Promise.reject('Vous avez oublier la question !')
    }

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const response = Math.random() * 100;
            resolve(response);
        });
    });
};