package com.example.librawherey1.controller;

import com.example.librawherey1.model.Schools;
import com.example.librawherey1.service.SchoolsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;

@Controller
@RequestMapping({"/", "/home"})
public class HomeController {

    private SchoolsService schoolsService;

    public HomeController(SchoolsService schoolsService) {
        this.schoolsService = schoolsService;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    ModelAndView index() {

        ModelAndView mav = new ModelAndView("home");

        ArrayList<Schools> schools = schoolsService.findAll();
        mav.addObject("schools", schools);

        return mav;

    }

}
