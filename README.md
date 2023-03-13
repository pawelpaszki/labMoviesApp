# Movies App
developed for the Enterprise Web Development module in Masters Course in SETU

## Running the app
* make sure that you have node installed on your system (this app was developed on the latest MacOS with node version `v16.15.1`)
* clone the repo
* run `npm install` to install all dependencies
* run `npm run dev` to run the app locally in your browser and go to [this url](http://localhost:5173)

## TMDB key
TMDB_KEY is required to run this application. Sign up [here](https://www.themoviedb.org/signup) to get the API key that can be used for the API calls to the TMDB API. It needs to be added to the `.env` file in the root of this repo (copy `.env.template` to `.env` and provide your secret values there).

## Authentication (subject to change with the progress of the development)
[supabase](https://supabase.com/) is used for authentication/ authorization

In order to use your own supabase project for authentication you need to copy `.env.template` to `.env` and provide the values of your supabase project `url` and `anon key`.

To access all parts of the web application you need to register with an unique email address and password.
