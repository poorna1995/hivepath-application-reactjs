# Hivepath Onboarding flow

### Live Demo

Master branch deployed at [https://hivepath.web.app](https://hivepath.web.app)

Development branch at [https://hivepath-onboarding.web.app/login](https://hivepath-onboarding.web.app/login)

### Routes

Entry Route -> `/` redirects to `/login`

Add User Info -> `/add-info` redirects to `/add-info/step-one`

**App Routes**

- `/app` -> WithAuth
- `/add-info/step-one` -> WithAuth
- `/add-info/step-two` -> WithAuth
- `/add-info/step-three` -> WithAuth
- `/auth/verifyRegistration/id/:id` -> Extract token as `:id`
- `/auth/resetPassword/id/:id` -> Extract token as `:id`
- `/linkedin` -> For linkedin authentication redirect
- `/login` -> No Auth
- `/sign-up` -> No Auth
- `/reset-password` ->No Auth
- `/verify` ->With Email
- `/reset-link` ->
- `/set-new-password` -> only with token

### Build the App using

`npm run build`

### Serve App using

```
npm install -g serve
serve -s build
```

to change the port number

````
serve -s build -l 5002```
````

## Working Directories

- assets
- components
- customHooks
- data
- fonts
- Layouts
- pages
- routes
- sections
- store
- theme
- utils

### assets

- contains images and svg files. {Logo, placeholder images, icons}

### components

- contains all the common components for UI

### customHooks

- the custom react hook created for verifying auth status

### data

- contains static data for placeholder items/ cards/ content

### fonts

### hoc

- contains higher order components

### Layouts

- contains layout for the auth, info, app pages

### pages

- contains app pages

### routes

- contains app routes

### sections

- contains page sections

### store

- the redux store for managing the application state

### theme

- the theme of the application

### utils

- utility functions

  // "site": "hivepath", to deploy on **hivepath.web.app**

run prettier

- npx prettier --write .

lt --port 3000 --subdomain hivepath
