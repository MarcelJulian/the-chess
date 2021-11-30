//package com.example.thesis.service;
//
//import com.example.thesis.model.App;
//import com.example.thesis.model.FileOperator;
//import com.example.thesis.repository.AppRepository;
//import com.github.fge.jsonpatch.JsonPatch;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class AppService {
//    private final Logger logger = LoggerFactory.getLogger(FileOperator.class);
//
//    @Autowired
//    private AppRepository appRepository;
//
//    public Optional<App> get(String id){
//        return appRepository.findById(id);
//    }
//
//    public List<App> get(List<String> names){
//        List<App> tempApps = new ArrayList<>();
//        for (String name : names)
//            tempApps.add(appRepository.findByName((name)));
//        return tempApps;
//    }
//
//    public List<App> getAll(){
//        return appRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
//    }
//
//    public App save(App app) {
//        return appRepository.save(app);
//    }
//    public List<App> saveAll(List<App> apps){
//        return appRepository.saveAll(apps);
//    }
//
//
//}
