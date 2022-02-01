package com.example.librawherey1.service.impl;

import com.example.librawherey1.model.Libraries;
import com.example.librawherey1.repository.LibrariesRepository;
import com.example.librawherey1.service.LibrariesService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class LibrariesServiceImpl implements LibrariesService {

    private final LibrariesRepository librariesRepository;

    public LibrariesServiceImpl(LibrariesRepository librariesRepository) {
        this.librariesRepository = librariesRepository;
    }

    @Override
    public ArrayList<Libraries> findAll() {
        return (ArrayList<Libraries>) this.librariesRepository.findAll();
    }

    public ArrayList<Libraries> passNearbyLibraries(ArrayList<Libraries> libraries, Double latSchool, Double lonSchool)
    {
        return (ArrayList<Libraries>) libraries.stream()
                .filter(l -> haversine(l.getLat(), l.getLon(), latSchool, lonSchool) <= 5)
                .collect(Collectors.toList());
    }

//    Function for calculating distance between a library and the selected school

    public static Double haversine(Double latLibrary, Double lonLibrary, Double latLocation, Double lonLocation)
    {
        Integer radius = 6371; // average radius of the earth in km

//        distance between specific lat and lon

        Double distanceLat = Math.toRadians(latLocation - latLibrary);
        Double distanceLon = Math.toRadians(lonLocation - lonLibrary);

//        calculating distance
        Double a = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
                Math.cos(Math.toRadians(latLibrary)) * Math.cos(Math.toRadians(latLocation))
                        * Math.sin(distanceLon / 2) * Math.sin(distanceLon / 2);

        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        Double distance = radius * c;

        return distance;
    }

}
