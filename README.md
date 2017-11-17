![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_400/v1508102268/DreamCaptureLong_twzq3b.jpg "DreamCapture Logo")


Brief Overview
==

Dreams are a unique phenomenon. They let us connect with the subconscious and explore parts of our brains and inner creativity that we otherwise don't access. Everyone dreams, and everyone can remember their dreams given the proper tools. 95% of dreams are forgotten within the first 5 minutes of waking up, and any distracting thoughts or stimulations accelerate this process. DreamCapture is the solution.

DreamCapture is a mobile app to record and store dreams.  The app uses speech-to-text technology and prompts users to record their dream upon wakeup. Users can add notes and keyword tags to their dreams. The search feature lets users search past dreams by dream text or keyword.  
####   [DreamCapture Demo Page](http://www.dream-capture.com "DreamCapture Demo Page")

This full stack mobile application was crafted to be functional yet simple.  DreamCapture uses Ruby on Rails for the backend and React Native with a Redux architectural framework for the frontend.  The app utilizes a PostgreSQL database and benefits from advanced performance with the addition of various installed packages.

Design
==

Since the app is designed for use immediately after waking, easy navigation and a pleasant, restful color scheme were a priority.

![Navigation gif](http://res.cloudinary.com/dzqrzline/image/upload/v1510890476/page-1_img09_inlsxy.gif)

A key goal of the app was to make journaling dreams possible without any typing. When the user wakes up, they can easily access DreamCapture through the silent notification on their phone.  On open, the app prompts the user to reflect on their dream. We use the built in speech-to-text capabilities of Android and iOS devices to capture the recordings, analyze, and store them.


Functionality
==

## Recording Dreams

Typing is slow. By using the native speech-to-text capabilities available in Android and iOS devices, DreamCapture speeds up the journaling process. This enables users to remember and record more robust reflections of their dreams.

![speech-to-text](
  https://res.cloudinary.com/dzqrzline/image/upload/v1510890385/page-1_img08_itk0yh.gif)

We also make use of IBM's Watson for some basic natural language analysis. After a dream is recorded as text, an axios request sends it to the Watson API. Upon a success response, DreamCapture stores the sentiment label, score, and any relevant keywords suggested by Watson.

```javascript
.then((response) => {
  this.sentimentLabel = response.data.sentiment.document.label;
  this.sentimentScore = response.data.sentiment.document.score;
  response.data.keywords.map(index => {
    this.keywords.push(Object.values(index)[0]);
  });
  ```

## Setting Reminders

The original idea called for an alarm functionality. The intention for was the app to also be used as an alarm. Upon silencing the alarm, the user would then be prompted to record their dream.

We decided against this option in favor of silent notifications for a couple reasons. First of all, this would require a user to forgo their current alarm system in order to use ours. Secondly, there doesn't appear to be a way for a third party app to access the built in alarm clock on iOS. Some alarm clocks on the app store have bypassed this restriction in [creative ways](https://oleb.net/blog/2014/02/alarm-clock-apps-ios/), but we decided against such options due to the various drawbacks.

In place of an alarm clock, DreamCapture allows users to set a daily reminder to record your dream. This silent notification will be waiting on your phone when you wake in the morning, allowing you to quickly navigate into the app and start recording.

![push notification gif](
  https://res.cloudinary.com/dzqrzline/image/upload/v1510890166/page-1_img06_t8azvq.gif)


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

Future Direction
==

**Dream Analysis:**
DreamCapture already analyzes the dream content for sentiment. Eventually the app will look at emotion as well.  There will be an overview page to show users trends in their dreams, charting out sentiment and keyword frequencies.

**Reference Guide:**
Through analysis of recorded content, the app will suggest possible dream interpretations to users. Users will be shown different meanings and be able to reflect on what their dreams could be trying to communicate.

**Port to Android:**
Once our app is perfected on iOS, we will make the necessary changes to create the app for Android platforms.

 ![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_116/v1508103105/DreamFaviconLarge_a45tgh.png
 "DreamCapture Logo") **[Capture Your Dreams](https://www.dream-capture.com "DreamCapture")**
