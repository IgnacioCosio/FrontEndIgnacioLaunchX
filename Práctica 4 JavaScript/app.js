var shiny = 0;
var pos = 0;

const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    const pokeNum = document.getElementById("pokeNum");
    const pokelab = document.getElementById("labAbilities");
    const poketype1 = document.getElementById("Type1");
    const poketype2 = document.getElementById("Type2");
    let url = "";
    let pokeImg;

    if (pokeNum.value !== '') {
        let pokeInputNum = pokeNum.value;
        url = `https://pokeapi.co/api/v2/pokemon/${pokeInputNum}`;
    } else {
        let pokeInputName = pokeName.value.toLowerCase();
        url = `https://pokeapi.co/api/v2/pokemon/${pokeInputName}`;
    }
    
    fetch(url).then((res) => {
        if(res.status != "200") {
            console.log(res);
            pokeImage("./img/Pikachu Llorando.jpg");
            pokeName.value = "Pokémon not found";
            pokeNum.value = "";
            pokelab.textContent = "";
            poketype1.textContent = "";
            poketype2.textContent = "";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        if (shiny == 0) {
            if (pos == 0) {
                pokeImg = data.sprites.other.home.front_default;
            } else {
                pokeImg = data.sprites.back_default;
            }
        } else {
            if (pos == 0) {
                pokeImg = data.sprites.other.home.front_shiny
            } else {
                pokeImg = data.sprites.back_shiny;
            }
        }
        pokeImage(pokeImg);
        pokeName.value = data.name.toUpperCase();
        pokeNum.value = data.id;
        pokelab.textContent = `Abilities:     ${data.abilities[0].ability.name}    ${data.abilities[1].ability.name}`;
        poketype1.textContent = `${data.types[0].type.name}`;
        poketype2.textContent = `${data.types[1].type.name}`;
    })
}

const Delete = () => {
    const pokeName = document.getElementById("pokeName");
    const pokeNum = document.getElementById("pokeNum");
    const pokelab = document.getElementById("labAbilities");
    const poketype1 = document.getElementById("Type1");
    const poketype2 = document.getElementById("Type2");

    pokeName.value = ""
    pokeNum.value = ""
    pokeImage("./img/Pokeball.jpg");
    pokelab.textContent = "";
    poketype1.textContent = "";
    poketype2.textContent = "";
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const Mov = (num) => {
    const pokeNum = document.getElementById("pokeNum");
    if (num == 1) {
        if (pokeNum.value === '') {
            pokeNum.value = "1";
        } else {
            pokeNum.value = Number(pokeNum.value) + 1;
        }
    } else {
        if (Number(pokeNum.value) > 1) {
            pokeNum.value = Number(pokeNum.value) - 1;
        }
    }
    fetchPokemon();
}

const changeInput = (op) => {
    const pokeName = document.getElementById("pokeName");
    const pokeNum = document.getElementById("pokeNum");
    if (op == "nom") {
        pokeNum.value = "";
    } else {
        pokeName.value = "";
    }
}

const changeShiny = (op) => {
    if (op == 1) {
        shiny = 1;
    } else {
        shiny = 0;
    }
    fetchPokemon();
}

const changePos = () => {
    if (pos == 0) {
        pos = 1;
    } else {
        pos = 0;
    }
    fetchPokemon();
}