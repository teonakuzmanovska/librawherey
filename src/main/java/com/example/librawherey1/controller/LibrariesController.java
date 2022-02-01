package com.example.librawherey1.controller;

import com.example.librawherey1.model.Libraries;
import com.example.librawherey1.service.LibrariesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;

@Controller
@RequestMapping("/libraries")
public class LibrariesController {

    private LibrariesService librariesService;

    public LibrariesController(LibrariesService librariesService) {
        this.librariesService = librariesService;
    }

    @PostMapping
    ModelAndView save(@RequestParam(value = "lat", required = false) Double lat, @RequestParam(value = "lon", required = false) Double lon) {
        ModelAndView mav = new ModelAndView("libraries");

        ArrayList<Libraries> libraries = librariesService.findAll();

        ArrayList<Libraries> filteredLibraries = librariesService.passNearbyLibraries(libraries, lat, lon);
        mav.addObject("filteredLibraries", filteredLibraries);

        return mav;
    }

}
