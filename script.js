/*------------------------------------------- Funcionalidades del programa ---------------------------------------------*/
const renderOptionsListFormat = (options) =>{
    let result = ""
    for(let i = 0; i < options.length; i++){
        result += "\n" + (i + 1) + ") " + options[i] 
    }
    return result
}
const listAviableDecisions = () =>{
    const aviableDecisions = ["calculadora basica", "calcular iva", "calcular cuotas","historial", "esc"]
    return renderOptionsListFormat(aviableDecisions)
}

const isValidQuery = (query) => query !== null && query !== ""  

const query = () => "Elije una operacion \nOperaciones disponibles: " + listAviableDecisions()

const errorQuery = () => "La opcion seleccionada es invalida\nRecuerda poner el numero de la decision\nDecisiones disponibles:" + listAviableDecisions()


/* ------------------------------------------- Funcionalidades de la calculadora -------------------------------------*/
const calc = (op, a, b) =>{
    switch(op){
        case "+":
            return {ok: true , result: Number(a) + Number(b)}
        case "-":
            return {ok: true , result: a - b}
        case "*":
        case "x":
        case ".":
            return {ok: true , result: a * b}
        case "/":
            return {ok: true, result: a / b}
        default:
            return {ok: false, result: "Error: la operacion seleccionada es invalida"}
    }
}

const onSelectCalc = () =>{
    const op = prompt("Elije una operacion mediante su simbolo: \nEjemplo 'x'")
    const a = prompt("Elije un numero")
    const b = prompt("Elije un numero")
    if(!isNaN(a) || !isNaN(b) ){
        if(isValidQuery(op)){
            const calcResult = calc(op,a,b)
            if(calcResult.ok){
                const result = "El resultado de " + a + " " + op + " " +  b +  " es: " + calcResult.result
                alert(result)
                saveOperation({result, operation: "calculadora basica"})
            }else{
                alert(calcResult.result)
            }
        }else{
            alert("Errores: La operacion seleccionada es invalida")
        }
    }   
    else{
        alert("Error: Uno de los numeros seleccionados no es un numero")
    }
}

/*------------------------------------- Funcionalidades de la calculadora del iva ----------------------------------- */

const onSelectIva = () =>{
    const value = prompt("Ingrese el monto del producto")
    if(value !== null && !isNaN(value)){
        const iva = value*21/100
        const result = "El precio del producto con iva incluido: $"+(Number(value) + iva)+ "\nEl precio del iva es: $" + iva
        alert(result)
        saveOperation({result, operation: "calculadora iva"})
    }else{
        alert("Error: el valor ingresado no es numerico o presiono el boton de cancelar")
    }
}
/*------------------------------------- Funcionalidades de la calculadora de cuotas --------------------------------- */
const onSelectCuotas = () =>{
    const price = prompt("Ingrese un precio")
    const feeUnits = prompt("Ingrese la cantidad de cuotas a pagar")
    const feeInterest = prompt("Ingrese un valor de interes o escriba 'no' si no tiene valor")

    if(!isNaN(feeUnits) && !isNaN(price) && (!isNaN(feeInterest) || feeInterest === "no") ){
        let result 
        if(feeInterest !== "no"){
            let finalFee = ( Number(price) + (price * feeInterest / 100)) / feeUnits
            result = "Para el valor $" +  price + " a " + feeUnits + " cuotas y un interes mensual del " + feeInterest + "% el precio de la cuota mensual seria $ " + finalFee
        }
        else if (feeInterest === "no"){
            finalFee = price / feeUnits
            result = "Para el valor $" +  price + " a " + feeUnits + " cuotas el precio de la cuota mensual seria $ " + finalFee  
            
        }
        saveOperation({result, operation: "calcular cuotas"})
        alert(result)
    }else{
        alert("Error: Uno de los valores ingresados es invalido")
    }
}
/*-------------------------------------------------- Funcionalidades del historial ----------------------------------------------------- */
const getTime = () =>{
    const time = new Date()
    return `${time.getDay()}hrs : ${time.getMinutes()}m : ${time.getSeconds()}s `
}
const onSelectHistory = () =>{
    const aviableCategories = ["calculadora basica", "calculadora iva", "calcular cuotas", "todas"]
    let filterCategory = prompt("Seleccione un numero valido para filtrar por categoria" +  renderOptionsListFormat(aviableCategories))
    if(history.length >= 1){
        if (isValidQuery(filterCategory)){
            if(Number(filterCategory) === 4){
                alert(renderHistory(history))
            }else{
                alert(renderHistory(history.filter(action => action.operation === aviableCategories[filterCategory - 1])))
            }
        }else{
            alert("Error: Opcion no valida")
        }
    }else{
        alert("Aun no has hecho operaciones, deberias probar con otra operacion...")
    }
}
const saveOperation = (data) =>{

    history.push({...data, date: getTime()})
}
const renderHistory = (historyToRender) =>{
    let count = 0
    const historyTemplate = historyToRender.map(action =>{
        return `\n${++count}) La operacion realizada fue ${action.operation}, y su resultado fue: \n${action.result}\nHora: ${action.date}` 
    })
    return historyTemplate.join()
}

/*--------------------------------------------------- Programa -------------------------------------------------------*/
const history = []
let decision = prompt(query())
while( decision !== "5"){
    if(isValidQuery(decision) ){
        switch(decision){
            case "1":
                onSelectCalc()
                break
            case "2":
                onSelectIva()
                break
            case "3":
                onSelectCuotas()
                break
            case "4":
                onSelectHistory()
                break
            default:
                alert("no seleccionaste una operacion valida")
        }
    }
    else{
        alert(errorQuery())
    }
    decision = prompt(query())
}
alert("El programa ha finalizado")