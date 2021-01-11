let firebaseConfig = {
    apiKey: "AIzaSyCzXPHJKYRG5yodUIlmgQ_cf21RD22bQDI",
    authDomain: "demofirebase-4db21.firebaseapp.com",
    projectId: "demofirebase-4db21",
    storageBucket: "demofirebase-4db21.appspot.com",
    messagingSenderId: "306173996933",
    appId: "1:306173996933:web:1a435aef39ae9702c6deec"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let questions = {};
let acumulado = [];
let fechas = [];
let values = [];
let respuestas = [];
let media = 0;
let acumulativo = 0;
let j;
let numrespuestas = 1;
let respuestasbuenas = 0;
let marcas = 0;
let value = 1;
let comprobador = 0;
let resultados = document.getElementById("resultados")
let question = document.getElementById("question")
let formulario = document.createElement("form");
formulario.setAttribute("id","formulario");
let next = document.createElement("button");
next.setAttribute("id", "next");
next.innerText="Next";
let contador = document.createElement("h6");
let pregunta = document.createElement("h3");
pregunta.setAttribute("id","pregunta");
let div1 = document.createElement("div");
let div5 = document.createElement("div");
let div6 = document.createElement("div");
let div7 = document.createElement("div");
div1.setAttribute("id","div1");
div5.setAttribute("id","div5");
div6.setAttribute("id","div6");
div7.setAttribute("id","div7");
let respuesta1 = document.createElement("label");
let input1 = document.createElement("input");
input1.setAttribute("type","radio");
input1.setAttribute("name","reply");
respuesta1.setAttribute("id","respuesta1");
respuesta1.setAttribute("for","input1");
input1.setAttribute("id","input1");
let div2 = document.createElement("div");
div2.setAttribute("id","div2");
let respuesta2 = document.createElement("label");
respuesta2.setAttribute("id","respuesta2");
let input2 = document.createElement("input");
respuesta2.setAttribute("for","input2");
input2.setAttribute("id","input2");
input2.setAttribute("type","radio");
input2.setAttribute("name","reply");
let div3 = document.createElement("div");
div3.setAttribute("id","div3");
let respuesta3 = document.createElement("label");
respuesta3.setAttribute("id","respuesta3");
let input3 = document.createElement("input");
respuesta3.setAttribute("for","input3");
input3.setAttribute("id","input3");
input3.setAttribute("type","radio");
input3.setAttribute("name","reply");
let div4 = document.createElement("div");
div4.setAttribute("id","div4");
let respuesta4 = document.createElement("label");
respuesta4.setAttribute("id","respuesta4");
let input4 = document.createElement("input");
respuesta4.setAttribute("for","input4");
input4.setAttribute("id","input4");
input4.setAttribute("type","radio");
input4.setAttribute("name","reply");
let intentos = [];
let fechadeintentos =[];
let graficos = document.getElementById("graficos")
if (graficos != null){
let canvas = document.createElement("canvas");
canvas.setAttribute("id","canvas");
document.getElementById("graficos").appendChild(canvas)
    db.collection("quiz").orderBy("fecha").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        acumulado.push(doc.data());
        console.log(acumulado);
    });
}).then(item => {
    for (let k = 0; k<acumulado.length ; k++){
        fechas.push(acumulado[k].fecha.slice(0,10));
        values.push(acumulado[k].aciertos);
    }
    for (let k = 0; k<fechas.length ; k++){
        if (fechas[k] === fechas[k+1]){
            media = media +1;
        } else {
            if (media > 0){
                for (let p = 0 ; p<=media ; p++){
                    acumulativo = acumulativo + values[(k-media+p)];
                }
                intentos.push(acumulativo/(media+1));
                fechadeintentos.push(fechas[k]);
                acumulativo = 0;
            } else {
                intentos.push(values[k]);
                fechadeintentos.push(fechas[k]);
            }
            media = 0;
        }
        }
    let myLineChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: fechadeintentos,
            datasets: [{
                fill: false,
                borderColor : 'rgb(210, 105, 30)',
                backgroundColor : 'rgb(210, 105, 30)',
                label: 'Nº de Aciertos por día',
                data: intentos,
                pointStyle: 'rectRot',
            }]
        },
    scaleOverride: true, 
    scaleSteps: 2, 
    scaleStepWidth: Math.ceil(10/2), 
    scaleStartValue: 0,
    options: {
            showLines: true,
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 11
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 9
                    }
                }]
            }
            }
        }
    );
}
)}
if (resultados != null){
    let final = document.createElement("h2");
    let valores = document.createElement("h3");
    let agradecimiento = document.createElement("h4");
    let regresar = document.createElement("button");
    let inicio = document.createElement("button");
    regresar.innerText="Volver a Intentarlo";
    inicio.innerText="🏠";
    regresar.setAttribute("onclick", "location.href='./question.html'");
    regresar.setAttribute("id", "regresar");
    inicio.setAttribute("onclick", "location.href='./index.html'");
    inicio.setAttribute("id", "inicio");
    valores.setAttribute("id","valores");
    final.innerText = "Aquí van tus resultados:"
    agradecimiento.innerText = "¡Muchas gracias por jugar!"
    document.getElementById("resultados").appendChild(final);
    document.getElementById("resultados").appendChild(valores);
    document.getElementById("resultados").appendChild(agradecimiento);
    document.getElementById("resultados").appendChild(inicio);
    document.getElementById("resultados").appendChild(regresar);
    db.collection("quiz").orderBy("fechaorden").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            acumulado.push(doc.data());
            console.log(acumulado);
        })})
    .then(item => {
    let longitud = acumulado.length - 1;
    valores.innerText= `${acumulado[longitud].aciertos}/10`;
    })}
 if (question != null && numrespuestas<11){
      printQuestions()
     .then(printQuestion)
 }
async function printQuestions (){
    await fetch ("https://opentdb.com/api.php?amount=50&type=multiple")
    .then (item => item.json())
    .then (item => questions = item.results)
}
function printQuestion (){
    let i = Math.floor(Math.random() * 50);
    j = Math.floor(Math.random() * 4);
    respuestas = questions[i].incorrect_answers;
    respuestas.splice(j,0, questions[i].correct_answer);
    pregunta.innerHTML = questions[i].question;
    document.getElementById("question").appendChild(formulario);
    document.getElementById("formulario").appendChild(pregunta);
    respuesta1.innerHTML = respuestas[0];
    respuesta2.innerHTML = respuestas[1];
    respuesta3.innerHTML = respuestas[2];
    respuesta4.innerHTML = respuestas[3];
    document.getElementById("formulario").appendChild(pregunta);
    document.getElementById("formulario").appendChild(div7);
    document.getElementById("div7").appendChild(div5);
    document.getElementById("div5").appendChild(div1);
    document.getElementById("div1").appendChild(respuesta1);
    document.getElementById("respuesta1").appendChild(input1);
    document.getElementById("div5").appendChild(div2);
    document.getElementById("div2").appendChild(respuesta2);
    document.getElementById("respuesta2").appendChild(input2);
    document.getElementById("div7").appendChild(div6);
    document.getElementById("div6").appendChild(div3);
    document.getElementById("div3").appendChild(respuesta3);
    document.getElementById("respuesta3").appendChild(input3);
    document.getElementById("div6").appendChild(div4);
    document.getElementById("div4").appendChild(respuesta4);
    document.getElementById("respuesta4").appendChild(input4);
    document.getElementById("question").appendChild(next);
    contador.innerText= `${numrespuestas}/10`;
    document.getElementById("question").appendChild(contador)
    document.getElementById("input1").style.visibility = "hidden";
    document.getElementById("input2").style.visibility = "hidden";
    document.getElementById("input3").style.visibility = "hidden";
    document.getElementById("input4").style.visibility = "hidden";
  }
next.addEventListener("click", function(e){
    e.preventDefault();
    if (marcas ==1){
        if (comprobador == 0){
        if (input1.checked == true){
            if (respuesta1.innerText == respuestas[j]){
                respuestasbuenas = respuestasbuenas + 1;
            }
        }
        if (input2.checked == true){
            if (respuesta2.innerText == respuestas[j]){
                respuestasbuenas = respuestasbuenas + 1;
            }
        }
        if (input3.checked == true){
            if (respuesta3.innerText == respuestas[j]){
                respuestasbuenas = respuestasbuenas + 1;
            }
        }
        if (input4.checked == true){
            if (respuesta4.innerText == respuestas[j]){
                respuestasbuenas = respuestasbuenas + 1;
            }
        }}
    if (numrespuestas<10){
        numrespuestas = numrespuestas + 1;
        div1.removeAttribute("style");
        div2.removeAttribute("style");
        div3.removeAttribute("style");
        div4.removeAttribute("style");
        marcas = 0;
        printQuestions()
        .then(printQuestion)
    } if (numrespuestas == 10 && marcas == 1){
        if (comprobador == 0){
            comprobador = 1;
            let mes = (new Date()).getMonth();
            mes = mes + 1;
            let dia = (new Date()).getDate();
            var año = (new Date()).getFullYear();
            let diaactual = dia + "/" + mes + "/" + año;
            console.log(diaactual);

            db.collection("quiz").add({
                fecha: diaactual,
                fechaorden: new Date (),
                aciertos: respuestasbuenas
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        formulario.remove()
        contador.remove()
        next.innerText = "Results!"
        next.setAttribute("onclick", "location.href='./results.html'");
        if (value == 1){
        let img = document.createElement("img");
        img.setAttribute("id","minions");
        img.setAttribute("src", "./img/aciertos.gif" );
        question.appendChild(img);
        }value = 0;      
    }
    } else if (marcas != 1 || comprobador == 1) {
        alert("Chose one option")
    }
})
respuesta1.addEventListener("click", function(){
    div1.style.border = "thick solid #D2691E";
    div2.removeAttribute("style");
    div3.removeAttribute("style");
    div4.removeAttribute("style");
    marcas = 1;
})
respuesta2.addEventListener("click", function(){
    div2.style.border = "thick solid #D2691E";
    div1.removeAttribute("style");
    div3.removeAttribute("style");
    div4.removeAttribute("style");
    marcas = 1;
})
respuesta3.addEventListener("click", function(){
    div3.style.border = "thick solid #D2691E";
    div1.removeAttribute("style");
    div2.removeAttribute("style");
    div4.removeAttribute("style");
    marcas = 1;
})
respuesta4.addEventListener("click", function(){
    div4.style.border = "thick solid #D2691E";
    div1.removeAttribute("style");
    div2.removeAttribute("style");
    div3.removeAttribute("style");
    marcas = 1;
})