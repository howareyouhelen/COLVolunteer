# COVolunteer
COMP 2800
During this critical period where the world is hit with COVID-19, this is an app that brings the community together by having volunteers shop for those in need. Moreover, allowing users to share information on where certain items were last seen in town.
<hr>

Team Info:<br>
Animesh Kaushal<br>
- Animesh is a second term student at BCIT. Outside of class Animesh makes beautiful handcrafted tables out of wood and visit the liqour store <del>with social distancing in mind.</del><br>
Connie Wu<br>
- Connie is a first term student at BCIT. Outside of class Connie likes to try new foods and drinks.<br>
Helen Lee<br>
- Helen is a first term student at BCIT. Outside of class Helen likes to eat desserts and play Animal Crossing: New Horizons.<br>
Jack Shih<br>
- Jack is a second term student at BCIT. Outside of class Jack likes to go on walks with his dog and take pretty pictures of scenery.<br>
<hr>

How repo is organized:<br>
We are using the Gitflow Workflow for our application on version controls, so our repo will be consisted of master, dev and feature branches. We sometimes push out hot fixes to dev but after each sprint, we will tag the merge to master. The app base will consist of our html files, including .md, .txt, .rules, .json. We then separate our files into js folder where all the .js files are at and a css folder where all the .css files are at.<br>
- COVolunteer<br>
    - .html<br>
    - .json<br>
    - .md<br>
    - .rules<br>
    - .txt<br>
    - js/ folder<br>
        - all .js files<br>
    - css/ folder<br>
        - all .css files<br>
    - img/ folder<br>
        - all .png files<br>
    - archived pages/ folder<br>
        - all archieved .html files<br>
<hr>

Language(s) used in this application: <br>
1. JavaScript<br>
2. JQuery<br>
3. Firestore syntax for db and user authentication (more info found: https://firebase.google.com/docs/firestore)<br>

Prerequistes/ installations:<br>
1. Clone or fork this repository<br>
2. Open command Prompt, cd into this repo on your machine. <br>
3. Download npm https://www.npmjs.com/get-npm (node js is optional, if you have downloaded node js, npm will be automatically included)<br>
4. Download any choice of IDE that is compatible with JavaScript (VisualStudio Code is recommended)<br>
5. Download any choice of web browser (Google Chrome and Firefox are recommended for best compatibility without any error)<br>
6. Sign up/ Login to Firebase and setup your own project to link with this app<br>
    - Add Firebase to your project, detailed instructions here: https://firebase.google.com/docs/web/setup<br>
    - Cloud Firestore as db, detailed instructions here: https://firebase.google.com/docs/firestore/quickstart<br>
    - After selecting project on Firebase, click on tag "</>[projectName]" on the top of the page. Click on the gear icon.<br>
    - Copy the key under the WEB API KEY row<br>
    - Create a js file, name it “config.js” within the js folder. (js/config.js) <br>
    - Paste the Firebase Web API Key as the value of a key value pair (key named FIREBASE_KEY) of the var config object.<br>
        -   var config = {<br>
                FIREBASE_KEY : '[insertWebAPIKeyHere]'<br>
            }<br>
7. Set up db on FireStore with the following collections:<br>
    - Requestpost<br>
    - volunteerPosts<br>
    - User<br>
        - metaData<br>
            - map<br>
        - pastRequestsToOthers<br>
        - requestForMe<br>
        - shoppingList<br>
            - currentlist<br>

Start up APP:<br>
1. Open command prompt<br>
2. cd into application on your local machine<br>
3. Run the following command: npm install http-server<br>
4. To start up server locally run the following command: http-server<br>

Configurations:<br>
1. configuration on firebase for WEB API KEY please refer to #6<br>
2. database setup please refer to #7 under<br>
Example of a db structure after it is completed and app running with tests:<br>
Requestpost<br>
    - docRefid (STRING)<br>
    - items (STRING)<br>
    - message (STRING)<br>
    - needbydate (STRING)<br>
    - postrequester_uid (STRING)<br>
    - timestamp (NUMBER)<br>
User<br>
    -address (STRING)<br>
    -currentVolpostDocId (STRING)<br>
    -Email (STRING)<br>
    -Name (STRING)<br>
    -newMsg (boolean)<br>
    -newReq (boolean)<br>

    Under collection user, create 4 additional collections<br>
    -metaData<br>
        - map	<br>
            - Geolocation (geopoint)<br>
    - pastRequestsToOthers<br>
        - volPostDocId (STRING)<br>
    - requestForMe <br>
        - docRefid (STRING)<br>
        - fromUserId (STRING)<br>
        - List (ARRAY)<br>
        - message (STRING)<br>
        - myUID (STRING)<br>
        - reqAccepted (STRING)<br>
        - reqCompleted (STRING)<br>
        - reqDeclined (STRING)<br>
        - volPostDocId (STRING)<br>
    - shoppingList<br>
        - currentList<br>
            - List (ARRAY)<br>
volunteerPosts<br>
    date (STRING)<br>
    geopoint (geopoint)<br>
    store (STRING)<br>
    storeAddress (STRING)<br>
    volUID (STRING)<br>
    voladdress (STRING)<br>
    volemail (STRING)<br>
    volname (STRING)<br>
<br>
<hr>
Testing:<br>
- List of tests can be found on sheet 2 in the following doc: https://docs.google.com/spreadsheets/d/180pahpnMnETkrxSpJYE8Bc4xCNZP6ZZYT6G828y963Q/edit#gid=906423772
