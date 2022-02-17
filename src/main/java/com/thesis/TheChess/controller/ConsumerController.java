package com.thesis.TheChess.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(consumes = MediaType.APPLICATION_NDJSON_VALUE)
public class ConsumerController {

}
