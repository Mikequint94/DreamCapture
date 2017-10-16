![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_400/v1508102268/DreamCaptureLong_twzq3b.jpg "DreamCapture Logo")


Brief Overview
==

Dreams are a unique phenomenon. They let us connect to our subconscious and explore parts of our brains and inner creativity that we otherwise have no means to access. Everybody dreams, and everybody can remember their dreams given the proper tools. 95% of dreams are forgotten within the first 5 minutes of waking up, and any distracting thoughts or stimulations will accelerate the forgetting process. Dream Capture is the solution.

Dream Capture is a mobile app to record and store dreams.  The app uses speech-to-text technology, and will prompt users to record the dream with a notification upon wakeup. Users can add notes and tag keywords to their dreams. Users can search by dream text or keyword to remember past dreams.  
####   [DreamCapture Demo Page](http://www.dream-capture.com "DreamCapture Demo Page")


This full stack mobile application was crafted to be functional yet simple.  DreamCapture uses Ruby on Rails for the backend and React Native with a Redux architectural framework for the frontend.  The app utilizes a PostgreSQL database, and benefits from advanced performance with the addition of various installed packages.

Design
==

Since this app is meant to be used immediately after the user wakes up, easy navigation and a pleasant, restful color scheme were a priority.

![Navigation gif]("Navigation gif")

A goal of our app was to make journaling your dreams possible without any typing at all. When the user wakes up, they can quickly access DreamCapture through the silent notification waiting for them on their phone.  Next they will be prompted to record reflections on their dream. We use the built in speech-to-text capabilities of Android and iOS devices to capture these records, analyze and store them.


![2nd Navigation gif]("2nd Navigation gif")
Functionality
==

## Recording Dreams

Typing is slow. By using the speech-to-text capabilities now available in nearly all Android and iOS devices, we speed up the journaling process. This means users will remember and record more complete reflections on their dreams from the previous night.

![speech-to-text](
  "speech-to-text gif")

We also make use of IBM's Watson for some basic natural language analysis. After a dream is recorded as text, we use an axios request to send it along to the Watson API. Upon a success response we store the sentiment label, score, and any relevant keywords found.

```javascript
.then((response) => {
  this.sentimentLabel = response.data.sentiment.document.label;
  this.sentimentScore = response.data.sentiment.document.score;
  response.data.keywords.map(index => {
    this.keywords.push(Object.values(index)[0]);
  });
  ```


## Setting Reminders

Originally we had intend to include some sort of alarm functionality in DreamCapture. The idea was a user could set their alarm for the morning and would be prompted to record their dream upon silencing the ringing alarm.

We decided against this option in favor of silent notifications for a couple reasons. First of all, this would require users of our app to use our built-in alarm instead of one of their choice. Secondly, there doesn't appear to be a way for a third party app to access the built in alarm clock on iOS. Some alarm clocks on the app store have bypassed this restriction in [creative ways](https://oleb.net/blog/2014/02/alarm-clock-apps-ios/), but we decided against such options due to a variety of drawbacks.

In place of an alarm clock, DreamCapture allows you to set a daily reminder to record your dream. This silent notification will be waiting on your phone when you wake in the morning, allowing you to quickly jump into the app and start recording.

![push notification gif](
  "push notification gif")


```javascript
let now = new Date();
let reminder = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes)

if (reminder < now) {
  reminder.setHours(reminder.getHours() + 24)
}
```
```javascript
PushNotification.cancelAllLocalNotifications()
PushNotification.localNotificationSchedule({
  message: "Record your dream", // (required)
  date: reminder,
  repeatType:'day',
  repeatInterval: 'day'
});

this.setState({reminderSet: true})
this.props.receiveReminder({time: this.state.time,
                            set: true})
  ````

Technologies
==
## Stack
- Backend
  - [Heroku](https://www.heroku.com/)
  - [Ruby on Rails](http://rubyonrails.org/)
  - [PostgreSQL](https://www.postgresql.org/)
- Frontend
  - [React Native](https://facebook.github.io/react-native/)
  - [Redux.js](http://redux.js.org/)
- Packages
  - [axios](https://github.com/axios/axios)
  - [react-navigation](https://reactnavigation.org/)
  - [redux-persist](https://github.com/rt2zz/redux-persist)
  - [react-native-push-notification](https://github.com/zo0r/react-native-push-notification)
  - [react-native-elements](https://github.com/react-native-training/react-native-elements)
  - [react-native-voice](https://www.npmjs.com/package/react-native-voice)
  - [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
  - [react-native-datepicker](https://github.com/xgfe/react-native-datepicker)
- Tools
  - [Atom](https://atom.io/)
  - [Xcode](https://developer.apple.com/xcode/)

Future Directions
==

**Dream Analysis:**
DreamCapture already analyzes the dream content for sentiment, and eventually the app will be able to analyze for emotion as well.  Their will be an analysis page to show users trends in the content of their dreams, charting out sentiment and keyword frequencies.

**Reference Guide:**
Using analyzed content, the app will be able to explain to users what they dreams may mean!  By using the app and thinking more about their dreams, users will be shown different interpretations and be provoked to think about what their dreams are trying to communicate.

**Port to Android:**
Once our app is perfected on iOS, we will make the necessary changes to create the app for Android platforms.

 ![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_116/v1508103105/DreamFaviconLarge_a45tgh.png
 "DreamCapture Logo") **[Capture Your Dreams](https://www.dream-capture.com "DreamCapture")**
