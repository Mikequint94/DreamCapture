![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_400/v1508102268/DreamCaptureLong_twzq3b.jpg "DreamCapture Logo")


Brief Overview
==

Dreams are a unique phenomenon. They let us connect to our subconscious and explore parts of our brains and inner creativity that we otherwise have no means to access. Everybody dreams, and everybody can remember their dreams given the proper tools. 95% of dreams are forgotten within the first 5 minutes of waking up, and any distracting thoughts or stimulations will accelerate the forgetting process. Dream Capture is the solution.

Dream Capture is a mobile app to record and store dreams.  The app uses speech-to-text technology, and will prompt users to record the dream with a notification upon wakeup. Users can add notes and tag keywords to their dreams. Users can search by dream text or keyword to remember past dreams.  
####   [DreamCapture Demo Page](http://www.dream-capture.com "DreamCapture Demo Page")


This full stack mobile application was crafted to be functional yet simple.  DreamCapture uses Ruby on Rails for the backend and React Native with a Redux architectural framework for the frontend.  The app utilizes a PostgreSQL database, and benefits from advanced performance with the addition of various installed packages.

Design
==

MakeAnything was designed with user experience in mind.  The site is fun to navigate, and returns desired results.

![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_540/v1506715231/Screen_Shot_2017-09-29_at_12.59.51_PM_byuxgc.png "Splash Page")

The splash homepage was a challenge in many senses.  Not only did I want the desired parallax scroll effect, but also I wanted the background image to be a slideshow.  Finally I wanted text on top of each image to give examples of project categories.  Creating the parallax scroll effect on the homepage was challenging in its own sense, but I figured out that wrapping all of my elements with appropriate CSS kept the site functional and stylish on all pages.    I used a simple timer to advance the background image, but timing was a challenge since I had to pair the text with the image perfectly.  

By utilizing class and timers I was able to craft the perfect solution.  

```javascript
dummyInput(string, idx){
    let dummyText = Array.from(string);
    this.setState({text: ""});
    this.clearInterval = setInterval(() => {
      if (dummyText.length) {
        this.setState({text: this.state.text + dummyText.shift()});
      } else {
        clearTimeout(this.clearInterval);
        if (idx === 0) {
          this.bgclass="section parallax bg3";
          this.dummyInput("Woodwork   ", 1);
        } else if (idx === 1) {
          this.bgclass="section parallax bg1";
          this.dummyInput("Artwork      ", 2);
        } else {
          this.bgclass="section parallax bg2";
          this.dummyInput("Cooking      ", 0);
        }
      }
    }, 300);
}
```
Additionally, all the forms are styled to match.  Logged in visitors can create new projects, add steps for the project, edit projects, edit steps, and add comments to any existing project.  
![alt text](https://res.cloudinary.com/make-anything/image/upload/c_scale,h_540/v1506718182/MakeAnythingFormFeatures_h3dsu6.jpg
"Form Features")

Functionality
==

MakeAnything features search to filter projects by title.  I was able to combine this component with the page showing all projects by a single crafter.  Here is an example of a typical user going through the site and leaving a comment.

![alt text](https://res.cloudinary.com/make-anything/image/upload/v1506721204/giphy_uneqcu.gif
  "Search")

Since this is a single page application, it was difficult to maintain similar visual feel across components.  I achieved consistency and non-repetitive code by using conditional statements to set visibility and content of subcomponents based on factors such as logged in user, project author, and the type of media present in the step or project.
````javascript
return(
  <div className="projectshow">
    <ul className="header">
      <li className="steps-edit">
        {editproject}
      </li>
      <li className={titleclass}>{project.title}</li>
      <li className={authorclass}>by:
        <Link to={`/member/${project.author.id}/${project.author.username}/projects`}>  {project.author.username}</Link>
      </li>
    </ul>
    <ul className="pictextvid">
      {image}
      <h2>{project.description}</h2>
      {video}
    </ul>
    <ul className="steps">
      {steps}
      <br/>
      {addSteps}
    </ul>
    <div className="comment-form">
      {comments}
      <CommentIndexContainer />
    </div>
  </div>
);
} else {
  return(
    <div className="loadingtext">
      <h3>Loading</h3>
    </div>
  );
  ````

Technologies
==

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
