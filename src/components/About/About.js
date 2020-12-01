import React from 'react'


function About() {
  return (
    <div>
      <h1>About SFPOPOS</h1>
      <p>POPOS are publicly accessible spaces in
        forms of plazas, terraces, atriums, small
        parks, and even snippets which are provided
        and maintained by private developers. In San
        Francisco, POPOS mostly appear in the Downtown
        office district area.</p>
    </div>
  )
}

export default About

1  package.json
@@ -8,6 +8,7 @@
   "@testing-library/user-event": "^12.2.0",
   "react": "^17.0.1",
   "react-dom": "^17.0.1",
   "react-router-dom": "^5.2.0",
   "react-scripts": "4.0.0",
   "web-vitals": "^0.2.4"
 },
19  src/App.js
This file was deleted.

16  src/Title.js
This file was deleted.

18  src/components/About/About.js
@@ -0,0 +1,18 @@
import React from 'react'


function About() {
 return (
   <div>
     <h1>About SFPOPOS</h1>
     <p>POPOS are publicly accessible spaces in
       forms of plazas, terraces, atriums, small
       parks, and even snippets which are provided
       and maintained by private developers. In San
       Francisco, POPOS mostly appear in the Downtown
       office district area.</p>
   </div>
 )
}

export default About
0  src/App.css → src/components/App/App.css
File renamed without changes.
28  src/components/App/App.js
@@ -0,0 +1,28 @@
import React from 'react';
import './App.css';

import Title from '../Title/Title';
import POPOSList from '../POPOSList/POPOSList';
import Footer from '../Footer';
import { HashRouter as Router, Route } from 'react-router-dom'
import About from '../About/About'
import POPOSDetails from '../POPOSDetails/POPOSDetails'

function App() {
 return (
   <Router>

   <div className="App">
     <Title />
     <Route exact path="/" component={POPOSList}/>
     <Route path="/about" component={About}/>
     <Route path="/details/:id" component={POPOSDetails} />
     <POPOSList />
     <Footer />
   </div>

 </Router>
 );
}

export default App;
0  src/App.test.js → src/components/App/App.test.js
File renamed without changes.
0  src/Footer.css → src/components/Footer.css
File renamed without changes.
0  src/Footer.js → src/components/Footer.js
File renamed without changes.
27  src/components/POPOSDetails/POPOSDetails.js
@@ -0,0 +1,27 @@
import React from 'react'

import data from '../sfpopos-data.json'

function POPOSDetails(props) {
 const { id } = props.match.params // Location index
 const { images, title, desc, hours, features, geo } = data[id]

 return (
   <div>
     <div>
       <img src={`${process.env.PUBLIC_URL}images/${images[0]}`} />
     </div>

     <div>
       <h1>{ title }</h1>
       <p>{ desc }</p>
       <p>{ hours }</p>
       <p>{ features }</p>
       <p>{ geo.lat } { geo.lon }</p>
     </div>

   </div>
 )
}

export default POPOSDetails
0  src/POPOSList.css → src/components/POPOSList/POPOSList.css
File renamed without changes.
7  src/POPOSList.js → src/components/POPOSList/POPOSList.js
@@ -1,14 +1,15 @@
import React from 'react';
import POPOSSpace from './POPOSSpace';
import POPOSSpace from '../POPOSSpace/POPOSSpace';
import './POPOSList.css';
import data from './sfpopos-data.json'
import data from '../sfpopos-data.json'


function POPOSList() {
 const spaces = data.map(( { title, address, images, hours } ) => {
 const spaces = data.map(( { title, address, images, hours }, i) => {

   return (
     <POPOSSpace
       id={i}
       name={title}
       address={address}
       image={images[0]}
0  src/POPOSSpace.css → src/components/POPOSSpace/POPOSSpace.css
File renamed without changes.
11  src/POPOSSpace.js → src/components/POPOSSpace/POPOSSpace.js
@@ -1,12 +1,19 @@
import React from 'react'
import './POPOSSpace.css';
import { Link } from 'react-router-dom'

function POPOSSpace(props) {
 const { name, image, address, hours } = props
 const { name, image, address, hours, id } = props
 return (
   <div className="POPOSSpace">
     <h1>{name}</h1>
   <h1>
      <Link to={`/details/${id}`}>
       {name}
     </Link>
   </h1>
     <Link to={`/details/${id}`}>
     <img src={`${process.env.PUBLIC_URL}images/${image}`} width="300" height="300" alt="Hello" />
     </Link>
     <div>{address}</div>
     <div>{hours}</div>
   </div>
11  src/Title.css → src/components/Title/Title.css
@@ -11,3 +11,14 @@
.Title-Subtitle {
 color: rgba(255, 255, 255, 0.75);
}
.nav-link {
 display: inline-block;
 padding: 0.5em 1em;
 color: rgba(255, 255, 255, 0.835);
 font-weight: bold;
 text-decoration: none;
}
.nav-link-active {
 color: #fff;
 border-bottom: 2px solid;
}
29  src/components/Title/Title.js
@@ -0,0 +1,29 @@
import React from 'react'
import './Title.css';
import { NavLink } from 'react-router-dom'

function Title() {
 return (
   <div className="Title">
     <header>
       <h1>SFPOPOS</h1>
       <div className="Title-Subtitle">San Francisco Privately Owned Public Open Spaces</div>

       <div>
         <NavLink
           className="nav-link"
           activeClassName="nav-link-active"
           exact
           to="/">List</NavLink>

         <NavLink
           className="nav-link"
           activeClassName="nav-link-active"
           to="/about">About</NavLink>
       </div>

     </header>
   </div>
 );
}
export default Title
0  src/setupTests.js → src/components/setupTests.js
File renamed without changes.
0  src/sfpopos-data.json → src/components/sfpopos-data.json
File renamed without changes.
2  src/index.js
@@ -1,7 +1,7 @@
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
