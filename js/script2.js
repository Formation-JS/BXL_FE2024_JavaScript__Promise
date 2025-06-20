//! Les méthodes utils
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

function randomNumberGenerator(min, max, decimal = 2) {
    const precision = (10 ** decimal);
    const range = (max - min) * precision;
    const offset = min * precision;

    return Math.round((Math.random() * range) + offset) / precision
}


//! Les méthodes asynchrone
async function sortirApero() {
    console.log(`Les apéro sont en préparation`);
    await delay(3_000);
    console.log(`L'apéro est prêt !`);
}

async function prepareCoffee() {
    if(randomNumberGenerator(0, 100, 0) == 1) {
        await delay(1_000);
        throw new Error('Machine à café HS (╯°□°）╯︵ ┻━┻ ')
    }
    
    console.log(`Le café est en cours de préparation`);
    await delay(25_000);
    console.log(`Le café est prêt !`);
}

async function servirCoffee() {
    console.log(`Le café est en cours de service`);
    await delay(5_000);
    console.log(`Le café est servi !`);
}

async function prepareSalade(...legumes) {
    console.log('Préparation salade');
    for (const legume of legumes) {
        await delay(10_000);
        console.log(`Le(s) ${legume} est prêt !!!`);
    }
    await delay(5_000);
    console.log('La salade est prête');
}

async function ajouterLaVinegrette() {
    console.log('Ajout de la vinegrette ...');
    await delay(5_000)
    console.log('La vinegrette  a été ajoutée !!!');
}

async function chaufferLaPoele() {
    console.log("On commence à chauffer la poele !")
    const time = randomNumberGenerator(15, 20);
    await delay(time * 1000)
    console.log("La poele est chaude !");
}

async function faireCuireLaViande() {
    /// faire cuire la viande
    console.log("On cuit la viande");
    await delay(15000);

    if (randomNumberGenerator(0, 4, 0) === 1) {
        throw new Error("La viande est cramé.");
    }
    /// si ça se passe bien affiche réussi
    console.log('La viande est bien cuit.');
}

async function servirLaViande() {
    console.log("On sert la viande !");
    await delay(10_000);
    console.log("La viand est servie !");
}


//! Utilisation des méthodes async
//? - V1 Enchainnement des méthodes avec "await"
// Non optimisé car chaque tache se lance les une après les autres...
async function preparerLeRepas_v1() {
    console.warn("Debut de la préparation du repas");
    try {
        await sortirApero();
        await prepareCoffee();
        await servirCoffee();
        await prepareSalade('tomate', 'salade', 'oignon');
        await ajouterLaVinegrette();
        await chaufferLaPoele();
        await faireCuireLaViande();
        await servirLaViande();
        console.warn('Le repas est prêt !');
    } catch (error) {
        console.error(error)
        console.warn('Le repas est foiré !');
    }
}
// preparerLeRepas_v1() ;


//? - V2 Enchainnement des méthodes des promesse
// Non optimisé - Même problematique
function preparerLeRepas_v2() {
    console.warn("Debut de la préparation du repas");
    return sortirApero
        .then(() => prepareCoffee())
        .then(() => servirCoffee())
        .then(() => prepareSalade('tomate', 'salade', 'oignon'))
        .then(() => ajouterLaVinegrette())
        .then(chaufferLaPoele)
        .then(faireCuireLaViande)
        .then(servirLaViande)
        .then(() => console.warn('Le repas est prêt !'))
        .catch((error) => {
            console.error(error)
            console.warn('Le repas est foiré !');
        });
}
//preparerLeRepas_v2();


//? - V3 Traitement en parallele
async function preparerLeRepas_v3() {

    const methodeCafe = async () => {
        await prepareCoffee();
        await servirCoffee();
    };

    try {
        console.warn("Debut de la préparation du repas");

        const promesseCafe = methodeCafe();
        const promesseSalade = prepareSalade('tomate', 'salade', 'oignon')
            .then(() => ajouterLaVinegrette());
        const promesseViande = (async () => {
            await chaufferLaPoele();
            await faireCuireLaViande();
            await servirLaViande();
        })(); // Fonction imédiatement executé

        await Promise.all([sortirApero(), promesseCafe, promesseSalade, promesseViande])
        console.warn('Le repas est prêt !');
    }
    catch (error) {
        console.error(error);
        console.warn('Le repas estr foiré !');
    }
}
preparerLeRepas_v3();