function parseDNI () {
    parsedDNI = infoDocumento.split("@")
    console.log("DNI Parseado: " + parsedDNI)
    scannedDNILength = parsedDNI.length
    if (scannedDNILength >= 7 && scannedDNILength <= 17) {
        if (infoDocumento.charAt(0) == "@") {
            console.log("Es DNI Viejo...")
            scannedDNI = parsedDNI[1]
            // Quito espacios
            scannedDNI = scannedDNI.replace(/\s/g, "");
            scannedIDTramite = parsedDNI[10]
            scannedGenero = parsedDNI[8]
        } else {
            console.log("NO es DNI Viejo...")
            scannedDNI = parsedDNI[4]
            scannedIDTramite = parsedDNI[0]
            scannedGenero = parsedDNI[3]
        }
        if (validateDNIValues()) {
            console.log("OK: " + "Datos de DNI Validados")
            //Manejo de variables obtenidas si es necesario
            return "OK"
        } else {
            console.log("Error: " + "Datos de DNI invalidos (validateDNIValues)")
            errorEscaneo()
            return "ERROR"
        }
    } else {
        console.log("Error: " + "Length de parsedDNI incorrecto - " + scannedDNILength)
        return "ERROR"
    }
}
function errorEscaneo () {
    console.log("El documento escaneado es inválido. Por favor, intentá nuevamente.")
}
function validateDNIValues () {
    DNIValido = true
    // Valido ID Tramite
    if (scannedIDTramite.length != 11) {
        console.log("Error: " + "Length de ID Tramite")
        DNIValido = false
    }
    // Valido Genero
    if (scannedGenero != "M" && scannedGenero != "F" && scannedGenero != "X") {
        console.log("Error: " + "Genero invalido")
        DNIValido = false
    }
    // Valido Largo DNI
    if (scannedDNI.length < 7 && scannedDNI.length > 8) {
        console.log("Error: " + "Length de DNI")
        DNIValido = false
    }
    return DNIValido
}
let DNIValido = false
let scannedGenero = ""
let scannedIDTramite = ""
let scannedDNI = ""
let scannedDNILength = 0
let parseoDNI = ""
let infoDocumento = ""
let parsedDNI: string[] = []
// Main
//  Se recibe string escaneado de PDF417 de DNI
//  Valido hasta DNIs emitidos en 2023 - Pendiente version posterior a 2024
let replaceMe = "00123456789@APELLIDO@NOMBRE1 NOMBRE2@M@41234567@A@05/03/1999@28/04/2013"
infoDocumento = replaceMe
if (infoDocumento.includes("@")) {
    parseoDNI = parseDNI()
    if (parseoDNI == "OK") {
        console.log("Escaneo correcto")
    } else {
        errorEscaneo()
    }
} else {
    console.log("Error: " + "Formato invalido")
    errorEscaneo()
}
