function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
async function prepareCoffee() {
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
    const time = randomTimer(15, 20);
    await delay(time * 1000)
    console.log("La poele est chaude !");
}

function randomTimer(min, max, decimal = 2) {
    const precision = (10 ** decimal);
    const range = (max - min) * precision;
    const offset = min * precision;
    const time = Math.round((Math.random() * range) + offset) / precision

    return time;
}

async function servirLaViande() {
    console.log("On sert la viande !");
    await delay(10_000);
    console.log("La viand est servie !");
}

async function faireCuireLaViande() {
    /// faire cuire la viande
    console.log("on cuit la viande");
    await delay(15000);

    if (randomTimer(0, 4, 0) === 1) {
        throw new Error("la viande est cramé");
    }
    /// si ça se passe bien affiche réussi
    console.log('la viande est bien cuit');
}

//? La fonction qui prépare le repas

async function preparerLeRepas() {
    try {
        await prepareCoffee();
        await servirCoffee();
        await prepareSalade('tomate', 'salade', 'oignon');
        await ajouterLaVinegrette();
        await chaufferLaPoele();
        await faireCuireLaViande();
        await servirLaViande();
        console.log('Le repas est prêt');
    } catch (error) {
        console.log('Désolé je vous appelle au resto !');
        console.error(error)
    }

}
preparerLeRepas() ;