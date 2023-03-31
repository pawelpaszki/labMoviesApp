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

## Deployment
This application can be easily deployed using [Vercel](https://vercel.com/). To do this you will need to fork this repository and give `vercel` GitHub permissions, so that it can be imported. In order for the app to run properly, these env variables with correct values need to be provided when deploying the app (all taken from the `.env.template` and described above)

* `VITE_TMDB_KEY`
* `VITE_REACT_APP_SUPABASE_URL`
* `VITE_REACT_APP_SUPABASE_ANON_KEY`

## Navigation
In wide screen resolution [react-dropdown](https://www.npmjs.com/package/react-dropdown) is used (with some customizations)

## TMDB database
These databases need to be created in the [supabase](https://app.supabase.com/) to be able to use this application:

* `favouriteMovies`:

```
    - id                     VARCHAR PK
    - movie_id               VARCHAR
    - user_id                VARCHAR
    - order_id               NUMERIC
```

* `favouriteTvSeries`:

```
    - id                     VARCHAR PK
    - movie_id               VARCHAR
    - user_id                VARCHAR
    - order_id               NUMERIC
```

* `favouriteActors`:

```
    - id                     VARCHAR PK
    - actor_id               VARCHAR
    - user_id                VARCHAR
    - order_id               NUMERIC
```

* `fantasyMovies`:

```
    - id                     VARCHAR PK
    - user_id                VARCHAR
    - title                  VARCHAR     
    - overview               VARCHAR
    - runtime                NUMERIC
    - poster_path            VARCHAR
    - production_companies   TEXT ARRAY
    - genres                 TEXT ARRAY
    - release_date           VARCHAR
```

* `movieCast`:

```
    - id                     VARCHAR PK
    - movie_id               VARCHAR
    - name                   VARCHAR
    - role_name              VARCHAR
    - avatar_url             VARCHAR
    - description            VARCHAR
```

## TMDB storage
In order to be able to upload images to supabase storage, bucket needs to be created with policies attached to it.

Policies also need to be defined to be able to upload/ delete images, e.g.:

```
create policy "Images are publicly accessible." on storage.objects
  for select using (bucket_id = '<bucket_name>');

create policy "Anyone can upload an image." on storage.objects
  for insert with check (bucket_id = '<bucket_name>');
```
