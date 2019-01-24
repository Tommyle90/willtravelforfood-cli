# Capstone Project - *Will Travel For Food*

## Front-End Application README

#### by Hoa 'Tommy' Le

## Links
* [Front-End GitHub Repo](https://github.com/Tommyle90/willtravelforfood-cli)
* [Back-End GitHub Repo](https://github.com/Tommyle90/willtravelforfood-api)
* [Deployed Front-End Client](https://tommyle90.github.io/willtravelforfood-cli/)
* [Deployed Back-End API](https://fathomless-eyrie-86820.herokuapp.com/)

## Preparation

1.  Fork and clone this repository.
1.  Create a new branch, `training`, for your work.
1.  Checkout to the `training` branch.
1.  Install dependencies with `npm install`.
1.  Run `npm start` to run website on local

## Description
Will Travel for Food is a website for making a traveling itinerary. You enter in the city you are traveling to and the date, do a yelp search using Yelp's third party api to look up local eats, then add those eats to your trip!.

## Webpage Screenshot
![Imgur](https://i.imgur.com/Xmc9iHm.png)

## Technologies Used
* React
* Sass
* JSX
* JavaScript
* HTML
* BootStrap
* Yelp's API

## User Stories
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create a travel trip with dates when they get there
- As a signed in user, I would like to add restaurants to my trips.
- As a signed in user, I would like to view a list of restaurants that I added.
- As a signed in user, I would like to delete my restaurants.

## Wireframe
![Wireframe](https://i.imgur.com/vrsgGFF.jpg)

## Planning/ Problems

**First Step**
- I drew out all the ERD and wireframes, and wrote down the user stories I wanted the user to perform.

**Second Step**
- I knew I wanted to do the back-end api right away, this took the shortest time to set up so that'll allow me to have more time in the front to work with react. What I didn't know was the original back-end I wanted to use, `Express`, did not fit my overall project so I had to scrap that idea. So the plan to do the back-end to give myself more time backfired in the end. But I was able to set it up and move onwards

**Third Step**
- I used react for the versaitility it provided, I wanted to set up displaying all of my trips and being able to delete and update the trip as well before moving on. After I trips to perform all the CRUD actions I moved on to the restaurant component, using the nested properties was a challenge for me. Took me awhile to understand how to use the keys in the state properly. After I got all of those working I moved to my next challenge

**Fourth Step**
- My biggest challenge was setting up the yelp api, I found that using a third party api was tougher than I expected. Reading through several StackOverflow links and documentations, the process became simplier as I moved along, soon after making small things work everything came into place at the end. Using a third api gave me a fun personal challenge to tackle

## Future Iterations

For future plans on this project I want to add these features.
- After a user finishes a search result using the api search function they can add the restaurants they found directly into their trip itinerary
- Integrate Googles API to use geolocation to search the surrounding area for restaurants for you to try
- Implement a date range depending on how long your trips will be
