//package com.example.thesis.controller;
//
//import com.example.thesis.model.App;
//import com.example.thesis.model.FileOperator;
//import com.example.thesis.service.AppService;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.github.fge.jsonpatch.JsonPatch;
//import com.github.fge.jsonpatch.JsonPatchException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.crossstore.ChangeSetPersister;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.NoSuchElementException;
//import java.util.stream.Collectors;
//
//@RestController
//public class AppController {
//
//    @Autowired
//    private AppService appService;
//
//    private final Logger logger = LoggerFactory.getLogger(FileOperator.class);
//
//    @GetMapping("/api/apps")
//    @ResponseBody
//    public ResponseEntity<List<App>> getAll(@RequestParam(value = "names", required = false) List<String> names){
//        if(names == null)
//            return ResponseEntity.ok(appService.getAll());
//        return ResponseEntity.ok(appService.get(names));
//    }
//
//    // Not really RESTful.
//    // 1. Only sending names, creating appLogConfigs in the backend.
//    //    By RESTful standards, shouldn't the whole appLogConfig object be
//    //    posted? (Need further research)
//    @PostMapping(value="/api/apps")
//    public ResponseEntity<List<App>> createApps(@RequestBody List<String> names){
//        List<App> currentApps = appService.getAll();
//        // TODO (MED): use sequence https://www.baeldung.com/spring-boot-mongodb-auto-generated-field
//        int appCount = currentApps.size();
//        List<String> duplicates =
//                currentApps.stream().map(App::getName).collect(Collectors.toList());
//        duplicates.retainAll(names);
//
//        List<App> newApps= new ArrayList<>();
//
//        if(!duplicates.isEmpty()) names.removeAll(duplicates);
//
//        for(String name : names){
//            String trimmedName= name.trim();
//            if(trimmedName.isEmpty()) continue;
//
//            appCount++;
//            App temp = new App(trimmedName, appCount);
//            newApps.add(temp);
//            logger.debug("Added new app: " + temp.getName() + " " + temp.getAvailablePorts().indexOf(0) + "-" + temp.getAvailablePorts().indexOf(19));
//        }
//
//        if(!duplicates.isEmpty())
//            logger.debug("Duplicate names in app POST request: " + duplicates.toString());
//
//        return ResponseEntity.ok(appService.saveAll(newApps));
//    }
//
//    @PutMapping(value="/api/apps/{id}")
//    public ResponseEntity<App> updateApp(@PathVariable String id, @RequestBody App app) {
//        try {
//            appService.get(id).orElseThrow(NoSuchElementException::new);
//
//            return ResponseEntity.ok(appService.save(app));
//        }catch (NoSuchElementException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }
//
//    // Unused. Kept for future purposes
//    @PatchMapping(value="/api/apps/{id}", consumes = "application/json-patch+json")
//    public ResponseEntity<App> patchApp(@PathVariable String id, @RequestBody JsonPatch patch){
//        try {
//            App app =
//                    appService.get(id).orElseThrow(NoSuchElementException::new);
//            App patchedApp = applyPatchToApp(patch, app);
//            appService.save(app);
//            return ResponseEntity.ok(patchedApp);
//        } catch (JsonPatchException | JsonProcessingException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        } catch (NoSuchElementException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }
//
//    private App applyPatchToApp(
//            JsonPatch patch, App app) throws JsonPatchException, JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode patched = patch.apply(objectMapper.convertValue(app, JsonNode.class));
//        return objectMapper.treeToValue(patched, App.class);
//    }
//}
