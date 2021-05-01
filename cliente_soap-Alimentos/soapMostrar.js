var mensaje

function ini(){
    mensaje = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'+
'<Body>' +
    '<BusquedaAlimentoRequest xmlns="http://tell.me/alimentos"></BusquedaAlimentoRequest>' +
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
        var resultado = xmlDoc.getElementsByTagName("ns2:BusquedaAlimentoResponse")[0].childNodes[0];

        do {
            var id = resultado.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue
            var nombre = resultado.getElementsByTagName("ns2:nombre")[0].childNodes[0].nodeValue
            var descripcion = resultado.getElementsByTagName("ns2:descripcion")[0].childNodes[0].nodeValue
            var precio = resultado.getElementsByTagName("ns2:precio")[0].childNodes[0].nodeValue
            var cantidad_existente = resultado.getElementsByTagName("ns2:cantidad_existente")[0].childNodes[0].nodeValue
            var fecha_elaboracion = resultado.getElementsByTagName("ns2:fecha_elaboracion")[0].childNodes[0].nodeValue
            var fecha_caducidad = resultado.getElementsByTagName("ns2:fecha_caducidad")[0].childNodes[0].nodeValue
            var categoria = resultado.getElementsByTagName("ns2:categoria")[0].childNodes[0].nodeValue

            fila ="<tr><td>"+id+"</td><td>"+nombre+"</td><td>"+descripcion+"</td><td>"+precio+"</td><td>"+cantidad_existente+"</td><td>"+fecha_elaboracion+"</td><td>"+fecha_caducidad+"</td><td>"+categoria+"</td>";
            var tablaRef = document.getElementById('table').getElementsByTagName('tbody')[0];
            var newRow = tablaRef.insertRow(tablaRef.rows.length);
            newRow.innerHTML = fila;   

            console.log(id + ", "+ nombre + ", "+ descripcion + ", "+ precio + ", "+ cantidad_existente + ", "+ fecha_elaboracion+ ", "+ fecha_caducidad + ", "+ categoria);
            resultado = resultado.nextSibling;
        } while (resultado.hasChildNodes() != null);        
        
    })
    .catch(err => console.log(err))
}