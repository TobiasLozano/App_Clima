fetch("https://www.datos.gov.co/resource/95qx-tzs7.json")
  .then((response) => response.json())
  .then((data) => {
    departamento(data);
  });

const departamento = (data) => {
  const dptos = data.map((n) => n["departamento"]);
  const sinRepetir = [...new Set(dptos)];
  mostrar(sinRepetir);
  return sinRepetir;
};

const selectDpto = document.getElementById("departamento");
const mostrar = (lista) => {
  lista.forEach((n) => {
    let option = document.createElement("option");
    option.value = `${n}`;
    option.textContent = `${n}`;
    option.name = `${n}`;
    selectDpto.appendChild(option);
  });
};
cambio();

function cambio() {
  selectDpto.addEventListener("change", () => {
    const dep = selectDpto.value;
    fetch("https://www.datos.gov.co/resource/95qx-tzs7.json")
      .then((response) => response.json())
      .then((data) => {
        municipios(data, dep);
      });
  });
}

const municipios = (data, dep) => {
  const filtrar = data.filter((n) => n["departamento"] == dep);
  const muni = filtrar.map((n) => n["municipio"]);
  selectMun(muni);
  return muni;
};

const selectMunicipio = document.getElementById("municipio");
const selectMun = (lista) => {
  selectMunicipio.textContent = "";
  lista.forEach((n) => {
    let option = document.createElement("option");
    option.value = `${n}`;
    option.textContent = `${n}`;
    option.name = `${n}`;
    selectMunicipio.appendChild(option);
  });
};

const submit = document.getElementById("submit");
const resultado = document.getElementById("resultado")
submit.addEventListener("click", () => {
  if (selectMunicipio.value !="Seleccione un municipio") {

    let api_key = 'd29cd9f5a671097d90603caf57a48770';
    city=quitarTilde(selectMunicipio.value);
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city},co&appid=${api_key}&cnt=5&units=metric&lang=es` ;
    cambiar();

    setTimeout(()=>consultarClima(url),1000)
    
    
  } 
  else {
    texto.innerHTML="<p id='texto' style='color:rgb(160, 116, 116);font-size: 30px;'>Selecciona un municipio</p>"
   
    
  }
});

const quitarTilde = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

function consultarClima(url){
  fetch(url)
  .then((response)=>response.json())
  .then((data)=>mostrarClima(data))
} 

function mostrarClima(data){
  let temperatura =data['main']['feels_like'];
  let ciudad =data['name'];
  let icono = data["weather"][0]["icon"];
  let humedad= data['main']['humidity'];
  let viento= data['wind']['speed'];
  let urlIcon = `https://openweathermap.org/img/wn/${icono}@2x.png`

  resultado.innerHTML=''

  //resultado.innerHTML= `<img src="${urlIcon}"/>  ${temperatura},  ${humedad},  ${viento}`
  let ciudadElement = document.createElement("p");
  ciudadElement.textContent = `Ciudad: ${ciudad}`;
  ciudadElement.id = 'ciudad';
  resultado.appendChild(ciudadElement);

  let temperaturaElement = document.createElement("p");
  temperaturaElement.textContent = `Temperatura: ${temperatura}°C`;
  temperaturaElement.id = 'temperatura';
  resultado.appendChild(temperaturaElement);

  let iconoElement = document.createElement("img");
  iconoElement.src = ` ${urlIcon}`;
  iconoElement.id = 'icono';
  resultado.appendChild(iconoElement);

  let humedadElement = document.createElement("p");
  humedadElement.textContent = `Humedad: ${humedad}%`;
  humedadElement.id = 'humedad';
  resultado.appendChild(humedadElement);

  let vientoElement = document.createElement("p");
  vientoElement.textContent = `Viento: ${viento}m/s`;
  vientoElement.id = 'viento';
  resultado.appendChild(vientoElement);
}

const info = document.getElementById('clima');
const texto= document.getElementById('texto');
info.addEventListener('mouseover',()=>{texto.className='a'})
info.addEventListener('mouseleave',()=>{texto.className=''})

const cambiar = ()=>{
  texto.className+='desaparecer'
}