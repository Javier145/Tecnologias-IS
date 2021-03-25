package com.example.demo;

import org.springframework.xml.xsd.simpleXsdSchema;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.config.annotation.WsConfigurerAdapter;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableWs
@Configuration
public class CalculadoraConfig extends WsConfigurerAdapter{

    @Bean
    public XsdSchema calculadoraSchema(){
        return new simpleXsdSchema(new ClassPathResource("Calculadora.xsd"));
    }//vincular nuestro contrato y ponerlo a dispocicion
    @Bean
    public ServletRegistrationBean messageDispatcherServlet (AplicationContext aplicationContext){
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setAplicationContext(aplicationContext);
        servlet.setTransformWsdlLocations(true);

        return new ServletRegistrationBean(servlet, "/ws/*");
    }//poner en contexto 
    @Bean (name = "calculadora")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema calculadoraSchema){
        DefaultWsdl11Definition wsdl = new DefaultWsdl11Definition();
        wsdl.setPortTypeName("calculadoraPort");
        wsdl.setLocationUri("/ws/calculadora");
        wsdl.setTargetNameSpace("http://www.example.org/calculadora");
        wsdl.setSchema(calculadoraSchema);
        return wsdl;
    }
    @Bean
    public FilterRegistrationBean(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return bean;
    }
}
