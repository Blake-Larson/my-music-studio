# My Music Studio

A full-stack application for private music teachers to manage their studios and their students.

<!-- **Link to project:** http://recruiters-love-seeing-live-demos.com/

![alt tag](http://placecorgi.com/1200/650)-->

## How It's Made:

### Tech used:

**HTML, CSS, JavaScript, React, Node, Express, TailwindCSS, MongoDB**

### Front-End

The front-end for this app was built using React and Tailwindcss along with Axios, React-router-dom, and DaisyUi (a Tailwindcss component library). The React authentication method revolves around the RequireAuth and useAuth components. useAuth uses react context to extend the auth state to any component under the AuthProvider. The RequireAuth component provides a way to check for authentication on specific routes, such as the Dashboard. Because this is a template, I left the rest of the React app pretty simple with a public home page and a private dashboard page.

### Back-End

The back-end for this app was built using Node, Express, Mongoose, and MongoDB along with Passport-local, Express-session, and Bcrpyt for authentication. The backend is based off of an MVC architecture with the views being in the client folder. The routes and controller handle login, logout, signup, and authenticated to check if the current user has an authenticated session stored.

## Optimizations

Current work in progress.

## Lessons Learned:

I have really become familar with MVC architecture and navigating the backend. I have also learned that there are so many ways to authenticate your applications and they all have their pros and cons. It was a challenge to try to keep the authentication simple while still being secure.

---

## Other Work:

Take a look at some other projects I have.

**Counting Cows:** [Live Site](https://counting-cows.herokuapp.com/) | [Repo](https://github.com/Blake-Larson/counting-cows)

**Karissa Derousseua: A client Website** [Kdconciergept.com](https://kdconciergept.com/)
