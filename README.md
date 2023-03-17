# My Music Studio

A full-stack application for private music teachers to manage their studios and their students.

I'm currently refactoring this project in a new repo using Next.js, TypeScript, tRPC, and Prisma. You can find the new repo [here](https://github.com/Blake-Larson/t3-my-music-studio), along with more details on why I'm using a different stack and how I'm approaching the refactor.

[Live Site](https://my-music-studio.herokuapp.com/)

<p align="center" ><img align="center" src="https://github.com/Blake-Larson/my-music-studio/blob/main/client/src/assets/images/demo.jpg" alt="The inital view of My Music Studio" /></p>

## How It's Made:

### Tech used:

**HTML, CSS, JavaScript, React, Node, Express, TailwindCSS, MongoDB**

### Front-End

The front-end for this app was built using React and TailwindCSS along with Axios, React-router-dom, and DaisyUi (a Tailwindcss component library). In the app, users can create students, enter and update their information, and create lessons. This allows music teachers to view what lessons they have coming up and what the students have been working on.

The React authentication method revolves around the RequireAuth and useAuth components. useAuth uses react context to extend the auth state to any component under the AuthProvider. The RequireAuth component provides a way to check for authentication on specific routes, such as the Dashboard.

### Back-End

The back-end for this app was built using Node, Express, Mongoose, and MongoDB along with Passport-local, Express-session, and Bcrpyt for authentication. The backend is based off of an MVC architecture with the views being in the client folder. The routes and controller handle login, logout, signup, and authenticated to check if the current user has an authenticated session stored. They also handle all CRUD operations that the user interacts with.

## Optimizations

This is a long term project with many optimizations and dreams in mind.

- Optimize React state handling and organization. Specifically, I want to address my use of React Context and making requests to the server only when necessary.
- Clean up my authentication and double check it is secure and performing correctly across devices.
- Clean up the functionality of updating the users lesson data, specifically the attendance and payment areas.
- Add a student portal that students can access to view their assigned music and lessons.

## Lessons Learned:

I have really become familar with MVC architecture and navigating the backend. I have also learned that there are so many ways to authenticate your applications and they all have their pros and cons. Hosting the application and dealing with a current user base has given me daily things to check on and correct over time.

---

## Other Work:

Take a look at some other projects I have.

**Counting Cows:** [Live Site](https://counting-cows.herokuapp.com/) | [Repo](https://github.com/Blake-Larson/counting-cows)

**Karissa Derousseua: A client Website** [Kdconciergept.com](https://kdconciergept.com/)
