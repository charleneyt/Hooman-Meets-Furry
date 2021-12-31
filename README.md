# Hooman-Meets-Furry

## Table of Contents
1. [Overview](#Overview)
2. [Features](#Features)
3. [Settings & Setups](#Settings)
4. [Schema](#Schema)


## Overview 
### Description :cat:
Hooman Meets Furry aims to help users to discover and find the animal that will be right for thier family. The application we are developing recommend user their ideal pet according to user’s preferences and search in the database according to various criteria to make recommendations of the furry babies.

## Features :dog2: 

### 1. Login
<img src="demo/login.gif" alt="Login" height="200">
* Allow user to login and use the login features(Pet similar, Pet Compare and Like Page)

### 2. Landing 
<img src="demo/home.PNG" alt="Home" height="200">

### 3. Pet Search
<img src="demo/info_page.gif" alt="info" height="200">

<img src="demo/advanced_search.PNG" alt="advanced Search"  height="200">

<img src="demo/pet_info.PNG" alt="PetInfo" height="200">
<img src="demo/search_page.gif" alt="SearchPage" height="200">


### 4. Breed Rater
<img src="demo/breed_rater.PNG" alt="BreedRater" height="200">

### 5. Rescue Search
<img src="demo/rescue_search.PNG" alt="Rescue Search" height="200">
* Allow user to search for pet rescue according to location.

### 6. Pet Recommendation 
<img src="demo/recommend.PNG" alt="Recommend" height="200">
* Allow user to select 

### 7. Pet Compare
<img src="demo/home.PNG" alt="Pet Compare" height="200">

### 8. Pet Similar
<img src="demo/similar_pet0.gif" alt="Similar Pet" height="200">



## Settings
### Settings & Setups :electric_plug:	

| Command          | Instructions                       |
| ---------------- | ---------------------------------- |
| `yarn install`    | Install package and dependecies    |
| `yarn start`      | Start running frontend, backend concurrently |
| `yarn start:backend`  | Start the backend server           |
| `yarn start:frontend` | Start the frontend                 |

## API Endpoints :pushpin:	

* base url: AWS EC2 database

| HTTP Verb | Endpoint                             | Description                                               |
| --------- | ------------------------------------ | --------------------------------------------------------- |
| GET       | /petsearch                           | Search pet by character                                   |
| GET       | /recommend                           | Recommend pet by breed feature                            |
| GET       | /rescues                             | List all rescues                                          |
| GET       | /search/rescues                      | Search rescues by feature                                 |
| GET       | /top10/:type                         | Display top 10 of selected features                       |
| GET       | compare/:username                    | Compare pet                                               |
| GET       | /get_similar                         | Find similar pets according to user                       |
| GET       | /get_all_info/id                     | Get all the pet's with the corresponding including rescue |
| GET       | /get_all_pets_liked_by_user | Get the liked pets by user id                             |
|     POST      |    /mark_favorite               |          Allow user to mark favorite pets in the pet search page                                                     |
| POST      | /delete_favorite                      |           Allow user to unmark favorite pets in the pet search page                             |




## Schema
<!-- TODO -->

###### tags: `PetFinder`
