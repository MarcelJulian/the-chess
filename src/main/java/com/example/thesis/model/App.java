//package com.example.thesis.documents;
//
//import lombok.*;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//import java.util.stream.IntStream;
//
//@NoArgsConstructor
//@Getter
//@Setter
//@ToString
//@Document
//public class App {
//    @Id
//    private String id;
//    private String name;
//    private List<Integer> availablePorts;
//    private List<Integer> usedPorts;
//    private List<String> logConfigIds;
//    private List<String> usedOs;
//
//    public App(String name, int appNum) {
//        int startPort = 35000 + (appNum-1)*20;
//        int endPort = 35000 + appNum*20 -1;
//
//        this.name = name;
//        this.availablePorts = IntStream.rangeClosed(startPort, endPort)
//                .boxed().collect(Collectors.toList());
//        this.usedPorts = null;
//        this.logConfigIds = null;
//        this.usedOs = null;
//    }
//}