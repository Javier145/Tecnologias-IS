var mensaje

function ini(){
    mensaje = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'+
'<Body>' +
    '<BusquedaAlimentoPrecioRequest xmlns="http://tell.me/alimentos">' +
        '<busqueda_precio>'+ document.getElementById('busqueda_precio').value +'</busqueda_precio>' +
    '</BusquedaAlimentoPrecioRequest>' +
'</Body>' +
'</Envelope>'
}
function soapBuscar(){
    ini()
    axios.post('http://localhost:8080/ws/alimentos', mensaje,{
        headers : {
            'Content-Type' : 'text/xml',
            'SOAPAction' : '',
        }
    })
    .then(function(response){
        console.log(response.data);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response.data, "text/xml");
        var resultado = xmlDoc.getElementsByTagName("ns2:BusquedaAlimentoPrecioResponse")[0].childNodes[0];

        do {
            var id = resultado.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue
            var nombre = resultado.getElementsByTagName("ns2:nombre")[0].childNodes[0].nodeValue
            var precio = resultado.getElementsByTagName("ns2:precio")[0].childNodes[0].nodeValue

            fila ="<tr><td>"+id+"</td><td>"+nombre+"</td><td>"+precio+"</td>";
            var tablaRef = document.getElementById('table').getElementsByTagName('tbody')[0];
            var newRow = tablaRef.insertRow(tablaRef.rows.length);
            newRow.innerHTML = fila;   

            console.log(id + ", "+ nombre + ", "+ precio );
            resultado = resultado.nextSibling;
        } while (resultado.hasChildNodes() != null);        
        
    })
    .catch(err => console.log(err))
}