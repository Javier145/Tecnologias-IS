package com.example.demo;

import org.example.calculadora.SumarRequest;
import org.example.calculadora.SumarResponse;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
@Endpoint

public class CalculadoraEndPoint {

    @PayloadRoot(namespace= "http://www.example.org/calculadora", localPart= "SumarRequest")
    @PayloadRoot(namespace= "http://www.example.org/calculadora", localPart= "RestarRequest")
    @PayloadRoot(namespace= "http://www.example.org/calculadora", localPart= "MultiplicarRequest")
    @PayloadRoot(namespace= "http://www.example.org/calculadora", localPart= "DividirRequest")
    
    public SumarResponse dameSuma(SumarRequest peticion){
        SumarResponse respuesta =  new SumarResponse();
        respuesta.setResultado( String.valueOf(
            Integer.parseInt(peticion.getA()) +
            Integer.parseInt(peticion.getB())
        ));

        return respuesta;
    }

    public RestarResponse dameResta(RestarRequest peticion){
        RestarResponse respuesta =  new RestarResponse();
        respuesta.setResultado( String.valueOf(
            Integer.parseInt(peticion.getA()) -
            Integer.parseInt(peticion.getB())
        ));

        return respuesta;
    }   

    public MultiplicarResponse dameMultiplicacion(MultiplicarRequest peticion){
        MultiplicarResponse respuesta =  new MultiplicarResponse();
        respuesta.setResultado( String.valueOf(
            Integer.parseInt(peticion.getA()) *
            Integer.parseInt(peticion.getB())
        ));

        return respuesta;
    }
    
    public DividirResponse dameDivision(DividirRequest peticion){
        DividirResponse respuesta =  new DividirResponse();
        respuesta.setResultado( String.valueOf(
            Integer.parseInt(peticion.getA()) /
            Integer.parseInt(peticion.getB())
        ));

        return respuesta;
    }   

}