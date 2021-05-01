var mensaje

function ini(){
    mensaje = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'+
'<Body>' +
    '<AnadirAlimentoRequest xmlns="http://tell.me/alimentos">' +
    '<nombre>'+ document.getElementById('nombre').value +'</nombre>' +
    '<descripcion>'+ document.getElementById('descripcion').value +'</descripcion>' +
    '<precio>'+ document.getElementById('precio').value +'</precio>' +
    '<cantidad_existente>'+ document.getElementById('cantidad_existente').value +'</cantidad_existente>' +
    '<fecha_elaboracion>'+ document.getElementById('fecha_elaboracion').value +'</fecha_elaboracion>' +
    '<fecha_caducidad>'+ document.getElementById('fecha_caducidad').value +'</fecha_caducidad>' +
    '<categoria>'+ document.getElementById('categoria').value +'</categoria>' +
    '</AnadirAlimentoRequest>' +
'</Body>' +
'</Envelope>'   
}
function soap(){
    ini()
    axios.post('http://localhost:8080/ws/alimentos', mensaje,{
        headers : {
            'Content-Type' : 'text/xml',
            'SOAPAction' : '',
        }
    })
    .then(function(response){
        console.log(response.data);
        document.getElementById('r').value = resul(response.data);
    })
    .catch(err => console.log(err))
}

function resul(rXml){
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(rXml, "text/xml");
    var resultado = xmlDoc.getElementsByTagName("ns2:respuesta")[0].childNodes[0].nodeValue;//.childNodes[0].childNodes[0].nodeValue;
    console.log(resultado);
    return resultado;
}