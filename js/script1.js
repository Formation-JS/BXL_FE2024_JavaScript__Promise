function demoPromise(nb1, nb2) {

    //! Création d'un objet "Promesse"
    //? Le constructeur prendre un callback qui contient 2 parametres
    //? - resolve : Permet de cloturer avec succes et d'envoyer des données
    //? - reject : Permet de cloturer en echec la promesse
    return new Promise((resolve, reject) => {
        console.log('Demo de la promesse');
        
        //? Simulation d'async avec un timeout
        setTimeout(() => {

            // Test de garde (Division par zéro)
            if(nb2 === 0) {
                //! Promesse rompue
                console.log('Promesse echoué');
                reject('Division par zéro non autorisé (╯°□°）╯︵ ┻━┻');
                return;
            }
            
            // Traitement
            console.log('Traitement...');
            const res = nb1 / nb2;

            //! La promesse tenu avec succes
            //! On renvoi le resultat avec "resolve"
            console.log('Promesse tenu !');
            resolve(res);

        }, 1_000);

    });
}


/**
 * Utilisation via les méthodes de l'objet "Promise"
 */
function utilisationPromiseMethod() {
    
    return demoPromise(84, 2)
        .then(res => {
            console.log(`Resultat 1 : ${res}`);
        })
        .then(() => {
            console.log('Log qui sert a rien...');
        })
        .catch((error) => {
            console.log(`Erreur : ${error}`);
        })
        .finally(() => {
            console.log('Traitment terminé');
        });
}
utilisationPromiseMethod().then(() => console.log('test'));

/**
 * Utilisation de la syntaxe "async await"
 */
async function utilisationAsyncAwait() {
    
    try {
        const res = await demoPromise(84, 2);
        console.log(`Resultat 1 : ${res}`);
        console.log('Log qui sert a rien...');
    }
    catch(e) {
        console.log(`Erreur : ${e}`);
    }
    finally {
        console.log('Traitment terminé');
    }

}
// utilisationAsyncAwait().then(() => console.log('test'));