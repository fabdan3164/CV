let info = {
    template: `<div v-if="info">
    <h1>{{info.nom}} {{info.prenom}}</h1>
    <ul>
    <li> <i class="fa-solid fa-cake-candles"></i> {{info.date}} </li> 
    <li> <i class="fa-solid fa-house-chimney"></i> {{info.adresse}}</li>
    <li> <i class="fa-solid fa-phone"></i> {{info.phone}}</li>
    <li> <i class="fa-solid fa-envelope"></i> {{info.email}}</li>      
    <li> <i class="fa-solid fa-car"></i> {{hascar}}</li>  
    </ul>
    </div>`,
    props: ['info'],

    computed: {
        hascar: function () {
            return (this.info.voiture === true) ? "Oui" : "Non";
        }
    }
};

let formations = {
    template: `<div >
                <h2> Formations </h2>
                <div v-for="formation of formations" class="flexleft">
                
                <div class="diplome"> <div class="circle"></div> <h5>{{formation.niveaux}} - {{formation.formation}}</h5></div>
                <p >{{formation.dateFormationDebut}} - {{formation.dateFormationFin}} : {{formation.etablissements}} </p>
                </div>
                </div>`,
    props: ['formations']
};

let professionnelles = {
    template: `<div>
                 <h2> Expériences Professionnelles </h2>
                 <div  v-for="professionnelle of  professionnelles" class="flexleft">
                 <div class="circle"></div>
                <p > {{professionnelle.dateExperienceDebut}} - {{professionnelle.dateExperienceFin}} : {{professionnelle.experience}} </p>
                <p > {{professionnelle.descipritons}} </p>
                </div>
                </div>`,
    props: ['professionnelles']
};

let skills = {
    template: `<div>
            <h2> Compétences </h2>
             <ul>
                <li v-for="skill of skills"> {{skill}}</li>
             </ul>
                </div>`,
    props: ['skills']
};

let langues = {
    template: `<div>
            <h2> Langues </h2>
             <ul>
                <li v-for="langue of langues"> {{langue}}</li>
             </ul>
                </div>`,
    props: ['langues']
};

let deletskills = {
    template: `<div v-if="skills.length > 0 ">
                <select id="supcomp">
                    <option v-for="skill of skills">{{skill}}</option>
                </select>
                <button v-on:click="delet_selection">Supprimer Compétence</button>
                </div>`,
    props: ['skills'],

    methods: {

        delet_selection: function() {
            var local_Storage = JSON.parse(localStorage.getItem('CV'))
            var selected_comp  =document.getElementById("supcomp").value
            
            for(let i = 0; i <= local_Storage.skills.length ; i++  )
            if ( local_Storage.skills[i] === selected_comp ) 
            
            local_Storage.skills.splice(i,1)
            localStorage.setItem('CV', JSON.stringify(local_Storage))
            location.reload();
                ;
        },
    }
};

let cv = new Vue({
    el: '#cv',
    components: {
        'info': info,
        'formations': formations,
        'professionnelles': professionnelles,
        'skills': skills,
        'langues': langues,
        'deletskills': deletskills
    },
    data: {
        prenom: null,
        nom: null,
        date: null,
        adresse: null,
        email: null,
        phone: null,
        voiture: false,
        info: null,
        formations: [],
        professionnelles: [],
        skills: [],
        langues: [],
    },

    created: function () {
        let data_storage = JSON.parse(localStorage.getItem('CV'))
        for (key in data_storage) {
            this[key] = data_storage[key]
        }
    },

    methods: {

        info_function: function () {

            let dateconvert = new Date(this.date);
            this.info = {
                prenom: this.prenom,
                nom: this.nom,
                date: dateconvert.toLocaleDateString('fr'),
                adresse: this.adresse,
                voiture: this.voiture,
                phone: this.phone,
                email: this.email,
            };
        },

        formation1: function () {

            let formation = document.getElementById("formation").value
            let dateFormationDebut = new Date(document.getElementById("dateFormationDebut").value)
            let dateFormationFin = new Date(document.getElementById("dateFormationFin").value)
            let etablissement = document.getElementById("etablissement").value
            let niveau = document.getElementById("niveau").value

            this.formations.push({
                formation: formation,
                dateFormationDebut: dateFormationDebut.toLocaleDateString('fr'),
                dateFormationFin: dateFormationFin.toLocaleDateString('fr'),
                etablissements: etablissement,
                niveaux: niveau,
            });
        },
        experiencepro: function () {

            let experience = document.getElementById("experience").value
            let description = document.getElementById("descriptionexp").value
            let dateExperienceDebut = new Date(document.getElementById("dateExperienceDebut").value)
            let dateExperienceFin = new Date(document.getElementById("dateExperienceFin").value)

            this.professionnelles.push({
                experience: experience,
                dateExperienceDebut: dateExperienceDebut.toLocaleDateString('fr'),
                dateExperienceFin: dateExperienceFin.toLocaleDateString('fr'),
                descipritons: description
            });
        },

        competence_function: function () {
            let competence = document.getElementById("competence").value
            this.skills.push(competence);
        },

        langue_function: function () {
            let langue = document.getElementById("langue").value
            this.langues.push(langue);
        },

        saveinfo: function () {
            localStorage.setItem('CV', JSON.stringify(this.$data))
        },

        deletStorage: function () {
            localStorage.clear();
            location.reload();
        }
    }
}, );