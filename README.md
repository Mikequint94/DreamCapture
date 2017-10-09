# Dream Capture

## Background and Overview

Dreams are a unique phenomenon.  They let us connect to our subconscious and explore parts of our brains and inner creativity that we otherwise have no means to access.  Everybody dreams, and everybody can remember their dreams given the proper tools.  95% of dreams are forgotten within the first 5 minutes of waking up, and any distracting thoughts or stimulations will accelerate the forgetting process.  Dream Capture is the solution.

Dream Capture is a mobile app to record dreams via speech-to-text. The app also doubles as an alarm, and will prompt users to record the dream after the alarm is turned off. Users can add notes and tags to their dreams. There will be a search functionality and the ability to browse by keywords and user-added tags.


## Functionality and MVP

##### This app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation:

- [ ] Reliable alarm to gently wake up user at the correct time and days of the week
 -  Will immediately launch app on snooze and prompt for audio recording
- [ ] User Authentication (email and password)
- [ ] Recording speech to text is accurate and quick.
- [ ] Dreams are searchable
- [ ] Adding notes to dreams
- [ ] Adding keywords to dreams
- [ ] Demo page showcasing relevant app features
 - Customized to look more unique
- [ ]Production README

#### Bonus:

- [ ] Analytics
 - Collect demographic info on user during sign up

- [ ] Charts and graphs to display keyword frequency and sentiment tracking
- [ ] 3rd Party Authentication
 - Auth0 or similar
 - Oauth potentially upon user request
- [ ] Reference Guide
 - Explaining what your dreams may mean based on analyzed content
- [ ] Intro to app tutorial to explain workflow
- [ ] Graphic time display with a sun/moon travelling across the top of the screen


## Technologies and Technical Challenges
#### Backend:
- Ruby on Rails
- PostgreSQL
- AWS S3 - https://aws.amazon.com/s3/

#### Frontend:
- React Native
- Processing language keywords
- Watson API
https://www.ibm.com/watson/services/discovery/

#### Challenges:
- Connecting React Native front end to Rails
- Managing permissions (local storage, calendar, microphone, speech-to-text):
 - Getting access to local storage and calendar for our alarm feature, as well as the microphone and speech-to-text functionality built into iOS.
- Integrating Watson API for Natural language processing:   
 - Using built in speech-to-text to record a user’s dream, then linking it with IBM’s watson for speech analysis.
- Pleasing and relaxing UX/UI: aim is to gently guide user through workflow just as they wake up.

## Wireframes

#### Signup and Login

![wireframe1](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_1_signup_login.png)
---
#### Signup Form

![wireframe2](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_2_signup_form.png)
--
#### Dream Index

![wireframe3](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_3_main.png)
--
#### Alarm

![wireframe4](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_4_alarm.png)
--
#### Record Dream Start

![wireframe5](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_5_record_dream_start.png)
--
#### In Recording Screen

![wireframe6](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_6_in_recording.png)
--
#### Post Recording Review

![wireframe7](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_7_post_recording_review.png)
--
#### Add Keywords

![wireframe8](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_8_add_keywords.png)
--
#### Dream Show

![wireframe9](https://github.com/Mikequint94/DreamCapture/blob/master/docs/Wireframe_9_dream_show.png)


### Sample Schema

https://github.com/Mikequint94/DreamCapture/blob/master/docs/Schema.md

### Sample State

https://github.com/Mikequint94/DreamCapture/blob/master/docs/SampleState.md

## Group Members and Work Breakdown

##### We have three members: Michael Quint, Peter Ludlum, Adrienne Lin

__Michael’s__ primary responsibilities will be:
- Implementing voice to text feature
- Sending text to Watson NLP API for analysis
- Alarm functionality setup.

__Peter’s__ primary responsibilities will be:
- Backend setup - User Auth frontend
- AWS setup and usage
- Setting up Demo Page
- Writing Production Readme

__Adrienne’s__ primary responsibilities will be:
- Frontend - React Native
- user login/signup screen
- signup form
- main index
- alarm screen
- record start screen in recording screen
- recording review screen
- add keywords screen
- dream show screen
- Submit app for review on Apple App Store


## Plan for getting Users and Reviews
- All members will share the published app with at least 20 friends and family members.
- Soft launch with several close friends to get feedback before final publishing to the app store.
- Peter will post in appropriate sub-reddit.
- Michael will utilize all of social medias to advertise the app.
- Adrienne will submit the app for review on the App Store.

## Implementation Timeline
#### __Phase 1:__ Learn Technologies (2 days - first weekend)
All teammates will use the weekend to learn React Native.

Team members will also individually research the following technologies:
- Michael
 - Research Watson and other speech-to-text.
 - Start setting up API keys.

- Peter 		
 - Research AWS.
 - Look at alarm functionality.

- Adrienne
 - Research OAuth providers and determine if app will use.

All teammates will complete and submit proposal by Monday morning.
#### __Phase 2:__ Foundation (2 days)
- User authentication
 - Set up using Rails
 - Set up views with React Native - signup/login screen and signup form
 - Session Show and Session Form pages

- Create Skeleton of the following pages and Navigation between them
 - Index Page
 - Option to record
 - Shows all dreams
 - Dream Record Page
 - Dream Edit Page
 - Dream Show Page
 - Add note
 - Add seeds for testing

#### __Phase 3:__ MVP Features  (4 days)
- Alarm
- Speech to text
- Add keywords - automatic and user-generated
- Edit/add notes to dreams
- Search

#### __Phase 4:__ Demo/README.md/Styling  (1 day)
- Make demo page with gifs
- Make production README
- Add final styling touchups

##### __Phase 5:__ Get Feedback/App Store/Bonuses (ongoing for future)
- Get feedback from friends and family
- Submit app on Apple App Store
- Port to Android
- Add bonus features from user feedback
