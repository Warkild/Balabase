document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log("////////////////////////////////////////////////");
    console.log("/////      BALABASE SEARCH ALGO V.1.0      /////");
    console.log("////////////////////////////////////////////////");
    ajoutEcouteurs();
    initialiserFiltre();
    lancementAffichage();
}

function ajoutEcouteurs() {
    console.log(">>>>    AJOUT DES ECOUTEURS D'EVENEMENTS    <<<<");
    // FILTRE PAR CATEGORIE
    document.getElementById("filtre_categorie_couvrechefs").addEventListener("click", process_changement_filtre_categorie)
    document.getElementById("filtre_categorie_vetements").addEventListener("click", process_changement_filtre_categorie)
    document.getElementById("filtre_categorie_accessoiresPortables").addEventListener("click", process_changement_filtre_categorie)
    console.log("Filtre par catégorie ........................ OK")
    console.log("////////////////////////////////////////////////");
}

////////////////////////////////////
//// PROCESS CHANGEMENT FILTRES ////
////////////////////////////////////

function process_changement_filtre_categorie() {
    console.log("Une modification a été faite dans : catégorie");
    if(this.classList.contains("categorie_coche")) {
        this.classList.remove("categorie_coche");
        filtre_categorie.splice(filtre_categorie.indexOf(this.id.split("_")[2]), 1);
    } else {
        this.classList.add("categorie_coche");
        filtre_categorie.push(this.id.split("_")[2])
    }
    lancementAffichage();
}


function initialiserFiltre() {
    // Définition : Cette fonction a pour objectif principal d'initialiser les filtres de recherches
    console.log(">>>>       INITIALISATION DES FILTRES       <<<<");
    // Filtre par catégorie
    filtre_categorie = [];
    console.log("Filtre par catégorie ........................ OK")
    console.log("////////////////////////////////////////////////");
}

///////////////////////////////////
////      PROCEDER AU TRI      ////
///////////////////////////////////

function lancementAffichage() {
    console.log(">>>>           LANCEMENT AFFICHAGE          <<<<");
    
    //  Filtre par catégorie :
    //  Définition : Procède au tri des différentes grandes catégories
    //  Entrée : Le tableau : filtre_categorie
    //  Sortie : Le tableau des éléments à envoyer à l'étape de tri suivante, après avoir été trié en
    //           fonction des filtres existants.

    affichage_post_categorie = []

    statut = "NON"
    if(filtre_categorie.length == 0) {
        statut = "OUI"
    }
    console.log("FILTRE CATEGORIE ........................... " + statut);

    if (filtre_categorie.length == 0) { // si aucune catégorie
        affichage_post_categorie = couvre_chefs;
        affichage_post_categorie = affichage_post_categorie.concat(vetements);
        affichage_post_categorie = affichage_post_categorie.concat(accessoires_portables);
    }
    if (filtre_categorie.includes("couvrechefs")) {
        affichage_post_categorie = affichage_post_categorie.concat(couvre_chefs);
    } 
    if (filtre_categorie.includes("vetements")) {
        affichage_post_categorie = affichage_post_categorie.concat(vetements);
    } 
    if (filtre_categorie.includes("accessoiresPortables")) {
        affichage_post_categorie = affichage_post_categorie.concat(accessoires_portables);
    } 

    console.log("    ELEMENTS RESTANTS :")
    console.log("Après Catégorie : " + affichage_post_categorie.length)

    console.log("////////////////////////////////////////////////");
    affichage();
}

function affichage() {

    // A MODIFIER SI NOUVEAU FILTRE !!!!!
    tableau_affichage = affichage_post_categorie;
    f_affichage_longueur = tableau_affichage.length

    // ON SUPPRIME TOUT 
    document.getElementById("search_resultats").innerHTML = ""

    // ON AFFICHE LE NB DE RESULTATS
    document.getElementById("number_results").innerHTML = f_affichage_longueur

    for(var i=0;i<f_affichage_longueur;i++) {

        ////creation div general////
        var newDiv       = document.createElement("a")
        newDiv.className = "divGeneral"
        newDiv.id        = "divGeneral" + i
        document.getElementById("search_resultats").appendChild(newDiv)

        ////creation div photo////
        var photo        = document.createElement("img");
        var test_ref     = tableau_affichage[i]['réf'].split("/")[0]
        if (test_ref == "COI") {
            photo.src    = "../img/couvre_chefs/" + tableau_affichage[i]['id'] + ".jpg"
        }
        if (test_ref == "VET") {
            photo.src    = "../img/vetements/" + tableau_affichage[i]['id'] + ".jpg"
        }
        if (test_ref == "ACC") {
            photo.src    = "../img/accessoires_portables/" + tableau_affichage[i]['id'] + ".jpg"
        }
        document.getElementById("divGeneral" + i).appendChild(photo)

        //// Création div + ////
        var newDiv       = document.createElement("div")
        newDiv.className = "divPlus"
        newDiv.id        = "divPlus" + i
        newDiv.innerHTML = "+"
        document.getElementById("divGeneral" + i).appendChild(newDiv)

        //// Création div infos ////
        var newDiv       = document.createElement("div")
        newDiv.className = "divInfos"
        newDiv.id        = "divInfos" + i
        document.getElementById("divGeneral" + i).appendChild(newDiv)


        // Création type //
        var newDiv       = document.createElement("p")
        newDiv.className = "type"
        console.log(test_ref)
        if (test_ref == "COI") {
            newDiv.innerHTML    = "Couvre - Chef"
        }
        if(test_ref == "VET") {
            newDiv.innerHTML   = "Vetement  -   " + tableau_affichage[i]["type"]
        }
        if(test_ref == "ACC") {
            newDiv.innerHTML   = "Accessoire  -   " + tableau_affichage[i]["type"]
        }
        document.getElementById("divInfos" + i).appendChild(newDiv)

        //// Création texte ////
        var newDiv       = document.createElement("h5")
        newDiv.className = "titre"
        newDiv.innerHTML = tableau_affichage[i]["nom"]
        document.getElementById("divInfos" + i).appendChild(newDiv)

        //// Création texte ////
        var newDiv = document.createElement("h5")
        newDiv.className = "titre"
        newDiv.innerHTML = tableau_affichage[i]["lieu"]
        document.getElementById("divInfos" + i).appendChild(newDiv)
    }
}