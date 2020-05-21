# COVolunteer
COMP 2800
During this critical period where the world is hit with COVID-19, this is an app that brings the community together by having volunteers shop for those in need. Moreover, allowing users to share information on where certain items were last seen in town.
<hr>

Language(s) used in this application: 
1. JavaScript
2. JQuery
3. Firestore syntax for db and user authentication (more info found: https://firebase.google.com/docs/firestore)

Prerequistes/ installations:
1. Clone or fork this repository
2. Open command Prompt, cd into this repo on your machine. 
3. Download npm https://www.npmjs.com/get-npm (node js is optional, if you have downloaded node js, npm will be automatically included)
4. Download any choice of IDE that is compatible with JavaScript (VisualStudio Code is recommended)
5. Download any choice of web browser (Google Chrome and Firefox are recommended for best compatibility without any error)
6. Sign up/ Login to Firebase and setup your own project to link with this app
    - Add Firebase to your project, detailed instructions here: https://firebase.google.com/docs/web/setup
    - Cloud Firestore as db, detailed instructions here: https://firebase.google.com/docs/firestore/quickstart
    - After selecting project on Firebase, click on tag "</>[projectName]" on the top of the page. Click on the gear icon.
    - Copy the key under the WEB API KEY row
    - Create a js file, name it “config.js” within the js folder. (js/config.js) 
    - Paste the Firebase Web API Key as the value of a key value pair (key named FIREBASE_KEY) of the var config object.
        -   var config = {
                FIREBASE_KEY : '[insertWebAPIKeyHere]'
            }
7. Set up db on FireStore with the following collections:
    - Requestpost
    - volunteerPosts
    - User
        - metaData
            - map
        - pastRequestsToOthers
        - requestForMe
        - shoppingList
            - currentlist

Start up APP:
1. Open command prompt
2. cd into application on your local machine
3. Run the following command: npm install http-server
4. To start up server locally run the following command: http-server


<hr>
Testing:
- List of tests can be found on sheet 2 in the following doc: https://docs.google.com/spreadsheets/d/180pahpnMnETkrxSpJYE8Bc4xCNZP6ZZYT6G828y963Q/edit#gid=906423772
