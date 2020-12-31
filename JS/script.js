let questions = {};
let respuestas = [];
let j;
let numrespuestas = 1;
let respuestasbuenas = 0;
let marcas = 0;
let value = 1;
let comprobador = 0;
let acumulado = JSON.parse(localStorage.getItem("estadisticas"));
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
div1.setAttribute("id","div1");
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

if (resultados != null){
    let final = document.createElement("h2");
    let valores = document.createElement("h3");
    let agradecimiento = document.createElement("h4");
    let regresar = document.createElement("button");
    regresar.innerText="Volver a Intentarlo";
    regresar.setAttribute("onclick", "location.href='./question.html'");
    regresar.setAttribute("id", "regresar");
    let longitud = acumulado.length - 1;
    valores.setAttribute("id","valores");
    valores.innerText= `${acumulado[longitud].aciertos}/10`;
    final.innerText = "Aquí van tus resultados:"
    agradecimiento.innerText = "¡Muchas gracias por jugar!"
    document.getElementById("resultados").appendChild(final);
    document.getElementById("resultados").appendChild(valores);
    document.getElementById("resultados").appendChild(agradecimiento);
    document.getElementById("resultados").appendChild(regresar);
}
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
    document.getElementById("formulario").appendChild(div1);
    document.getElementById("div1").appendChild(respuesta1);
    document.getElementById("respuesta1").appendChild(input1);
    document.getElementById("formulario").appendChild(div2);
    document.getElementById("div2").appendChild(respuesta2);
    document.getElementById("respuesta2").appendChild(input2);
    document.getElementById("formulario").appendChild(div3);
    document.getElementById("div3").appendChild(respuesta3);
    document.getElementById("respuesta3").appendChild(input3);
    document.getElementById("formulario").appendChild(div4);
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
        }
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
        if (comprobador == 1){
            let nuevoresultado = {
                fecha: new Date (),
                aciertos: respuestasbuenas
            }
            if (acumulado!=null){
                acumulado.push(nuevoresultado);
            }else {
                acumulado = [nuevoresultado];
            }
            let subir = JSON.stringify(acumulado);
            localStorage.setItem("estadisticas", subir);
        }
        formulario.remove()
        contador.remove()
        next.innerText = "Results!"
        next.setAttribute("onclick", "location.href='./results.html'");
        comprobador = 1;
        if (value == 1){
        let img = document.createElement("img");
        img.setAttribute("id","minions");
        img.setAttribute("src", "./img/aciertos.gif" );
        question.appendChild(img);
        } value = 0;
      
    }
    } else {
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