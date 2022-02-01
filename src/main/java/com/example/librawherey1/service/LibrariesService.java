package com.example.librawherey1.service;

import com.example.librawherey1.model.Libraries;

import java.util.ArrayList;

public interface LibrariesService {

    ArrayList<Libraries> findAll();
    ArrayList<Libraries> passNearbyLibraries(ArrayList<Libraries> libraries, Double tLat, Double tLon);

}
