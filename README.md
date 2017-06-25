# Airbnb-Prototype
<p align="center"><img src="http://logok.org/wp-content/uploads/2014/07/Airbnb-new-logo-2014.png" width="40%" /></p>

>Airbnb is an online marketplace that enables people to list, find, then rent vacation homes for a processing fee. It has over 2,000,000 listings in 34,000 cities and 191 countries. Founded in August 2008 and headquartered in San Francisco California.
Airbnb is a peer-to-peer accommodation market place that connects hosts (vendors of accommodations) and travelers via its website. Airbnb enables transactions between these two entities by charging a 'service fee' without directly owning any rooms by itself.

**Airbnb-Prototype provides all the core features of [Airbnb](www.airbnb.com) and one extra feature of auctioning for properties .**

## Table of contents
- [Getting Started](#getting-started)
- [Architecture Diagram](#architecture-diagram)
- [Technology Stack](#technology-stack)
- [Screenshots](#screenshots)
- [Features](#features)
- [Future Enhancements](#future-enhancements)

## Getting Started
1. Download all the modules (Client, Server, Admin)
2. Install MongoDB and start MongoDB server
3. Start Airbnb Client by running www from bin folder
4. Start Airbnb Server by running server.js from root folder 
5. Start Airbnb Admin by running www from bin folder
6. Client will run on port 3000 and Admin will run on port 3001

## Architecture Diagram
<p align="center"><img src="https://github.com/Sagar-Mane/Airbnb-Prototype/blob/master/docs/Architecture%20Diagram.jpg" /></p>

## Technology Stack
| Domain               | Technology         |
| ---------------------|:-------------:     |
| FrontEnd             | Angular JS         |
| Backend              | Node JS            |
| UI/UX                | CSS and Bootstrap  |
| Markup Language      | HTML5              |
| Scripting Language   | JavaScript         |
| UI/UX                | CSS and Bootstrap  |
| Database             | MongoDB            |
| Password Encryption  | Bcrypt             |
| Authentication       | Passport JS        |
| Messaging Protocol   | AMQP               |
| Middleware           | RabbitMQ           |
| SQL Caching          | Redis              |
| Visualization Graphs | D3 JS              |
| Load Testing         | JMeter             |
| API Testing          | Mocha              |



## Screenshots
<p align="center"><h4 align="center">HomePage</h4><img src="https://github.com/Sagar-Mane/Airbnb-Prototype/blob/master/docs/Screenshots/Homepage.png"/>
<h4 align="center">Sign Up</h4><img src="https://github.com/Sagar-Mane/Airbnb-Prototype/blob/master/docs/Screenshots/Sign%20UP.png"/>
<h4 align="center">Finding Property</h4><img src="https://github.com/Sagar-Mane/Airbnb-Prototype/blob/master/docs/Screenshots/Properties.png"/>
<h4 align="center">Payment Page</h4><img src="https://github.com/Sagar-Mane/Airbnb-Prototype/blob/master/docs/Screenshots/Payment.png"/>
<h4 align="center">Admin Analytics</h4><img src="https://github.com/Sagar-Mane/Airbnb-Prototype/blob/master/docs/Screenshots/Admin%20Dashboard.png"/>
</p>


## Features
#### User Module
- Create a new User
- Delete an existing User
- User can place the bid
- Change a user’s information (name, address,profile image etc)
- Search for a property based on attributes.
- Display information about a User.
- Reviews and rating.

#### Host Module
- Create a new Host.
- Delete an existing Host
- Dashboard : Able to see analytics activities.
- Generate Bill for a User (Every Trip).
- Upload introductory video.
- Approval of requested property by user. (Accept/Denied)

#### Billing Module
- Create a new Bill for each trip.
- Delete an existing Bill.
- Search an existing Bill.

#### Admin Module
- Add host to the system.
- Search for enrolled host area wise.
- Review host/customer account
- Search for a Bill based on attributes (fetch all bills By date, By months)
- Display information about a Bill.

#### Trips Module
- Create Edit and Delete Trip.
- History of trips (Display in user’s account)
- History of trips (Display in host’s account)

#### Log Processing Service

#### Admin Dashboard
- Retrieve data from database and show first 10 properties with its revenue/year
- City wise revenue/year.
- 10 hosts who sold maximum number of properties last month with its revenue.

#### Bidding 
- User is able to place bid
- Bid timings will be 4 days
- After completing the bid user is able to see pending trip bid in his trip history.


## Future Enhancements
