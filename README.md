# Movies App
developed for the Enterprise Web Development module in Masters Course in SETU

## Running the app
* make sure that you have node installed on your system (this app was developed on the latest MacOS with node version `v16.15.1`)
* clone the repo
* run `npm install` to install all dependencies
* run `npm run dev` to run the app locally in your browser and go to [this url](http://localhost:5173)

## TMDB key
TMDB_KEY is required to run this application. Sign up [here](https://www.themoviedb.org/signup) to get the API key that can be used for the API calls to the TMDB API. It needs to be added to the `.env` file in the root of this repo (copy `.env.template` to `.env` and provide your secret values there).

## Authentication
[supabase](https://supabase.com/) is used for authentication/ authorization/ persistence

In order to use your own supabase project for authentication you need to copy `.env.template` to `.env` and provide the values of your supabase project `url` and `anon key`.

To access all parts of the web application you need to register with an unique email address and password.

## Deployment
This application can be easily deployed using [Vercel](https://vercel.com/). To do this you will need to fork this repository and give `vercel` GitHub permissions, so that it can be imported. In order for the app to run properly, these env variables with correct values need to be provided when deploying the app (all taken from the `.env.template` and described above)

* `VITE_TMDB_KEY`
* `VITE_REACT_APP_SUPABASE_URL`
* `VITE_REACT_APP_SUPABASE_ANON_KEY`

## Navigation
In wide screen resolution [react-dropdown](https://www.npmjs.com/package/react-dropdown) is used (with some customizations)

## Data picker
When creating fantasy movie or performing advanced search, [data pickers](https://www.npmjs.com/package/react-dropdown) are provided to easily select date(s). 

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

* `fantasyMovieCast`:

```
    - id                     VARCHAR PK
    - movie_id               VARCHAR
    - name                   VARCHAR
    - role_name              VARCHAR
    - avatar_url             VARCHAR
    - description            VARCHAR
```

* `playlists`:

```
    - id                     VARCHAR PK
    - user_id                VARCHAR
    - title                  VARCHAR
    - theme                  VARCHAR
    - movies                 TEXT ARRAY
```

## TMDB storage
In order to be able to upload images to supabase storage, bucket needs to be created with policies attached to it.

Policies also need to be defined to be able to upload/ select/ delete images, e.g.:

```
create policy "Images are publicly accessible." on storage.objects
  for select using (bucket_id = '<bucket_name>');

create policy "Anyone can upload an image." on storage.objects
  for insert with check (bucket_id = '<bucket_name>');

create policy "Anyone can delete an image." on storage.objects
  for delete using (bucket_id = '<bucket_name>');
```

## Work completed (as per assignment spec)
### Good (40-50%).

Features:

* UI - New views/pages (3+).
    * List view (e.g. Most popular movies, Actors, Similar movies, TV Series).
        * `Following paths are implemented on top of the already existing views`
            * `/movies/:id/similar` - similar movies (to one in a movie card) (paginated)
            * `fantasy/create` - create fantasy movie (each logged in user has their own list)
            * `/fantasy` - list fantasy movies (each logged in user has their own list)
            * `/fantasy/:id` - view fantasy movie (and cast with option to add cast) - (each logged in user has their own list)
            * `/tv` - similar to existing discover movies, but for tv (paginated)
            * `/tv/favourites` - favourite tv series (each logged in user has their own list)
            * `/tv/:id` - tv series details
            * `/tv/:id/similar` - list of tv series similar to one represented in card (paginated)
            * `/actors` - list of popular actors (paginated)
            * `/actors/search` - search for actor with string query
            * `actors/favourites` - favourite tv series (each logged in user has their own list)
            * `/actors/:id` - actor details
            * `/playlists/create/:id` - create playlist (only accessible from home view) and add movie from which the option was selected to the playlists table (each logged in user has their own list)
            * `/playlists/:id` - show playlist movies (each logged in user has their own list)
            * `/playlists` - show playlists cards (title, theme, number of movies) (each logged in user has their own list)
            * `/login` - login existing user
            * `/register` - register new user
    * Detail view (e.g. Actor Bio, TV Series).
        * see above (actor, tv series, fantasy movie)
* Routing - New routes.
    * At least one additional parameterized URL.
        * see above
    * Data hyperlinking.
        * see above
* Data Model.
    * An additional data entity type, e.g. Actor, TV series.
        * `Following is implemented`
            * `tv series`
            * `playlist`
            * `fantasy movie`
            * `actor`
* Server state Caching.
    * `replicated for all added pages - where it made sense and where applicable`
* Functionality.
    * Additional filtering and/or sorting criteria.
        * added sorting by (ascending and descending - only in the lists pages) :
            * `title`/ `name`
            * `popularity`
            * `average_vote`
    * My fantasy movie. (Basic)
        * The user can create their fantasy movie record. Limit the details to Title, Overview, Genres, Release Date, Runtime, and Production Company(s).
            * `done` for all levels (including CRUD persistence in supabase)
### Very Good (50-70%).

Features:

* UI.
    * Extensive data hyperlinking.
        * `added to all lists to access individual details pages`
    * Pagination - for data-listing pages.
        * `done for`:
            * `home page (discover movies)`
            * `upcoming movies`
            * `discover tv series`
            * `discover tv series`
            * `popular actors`
* Routing - Basic authentication.
    * Private and Public routes (e.g. Movie Details).
        * `everything apart from discover movies (home page) is private (including certain options in home page)`
    * Premium functionality (e.g. Filtering).
        * `add/ remove from favourites`
        * `fantasy movies/ create playlists`
        * `all pages but home page`
* Functionality.
    * Favourite Actors/TV series.
        * `done`
    * Multi-criteria Search.
        * Search for movies based on criteria submitted on a web form. The form should use appropriate controls - menus, checkboxes, etc.
            * `done for tv or movies (available to chose either of them) - search by`:
                * `minRating`
                * `maxRating`
                * `releaseStartDate` (range from)
                * `releaseEndDate` (range to)
                * `genre`
                * `keywords`
                * (`not providing value means skip particular search query`)
* Storybook support.
    * `should be done for most pages/ components`

### Excellent (70-90%)
Features:

* Functionality.
    * Ordered Favourites.
        * `done for all favourites - movies/ tv series/ actors` - additionally all of these are only displayed per logged in user
    * Create themed movie playlists (Title, Theme, Movies).
        * `done` 
    * My fantasy movie (Advanced) - Allow the addition of a cast, where each member has a role name and description. Adding/Uploading a movie poster.
        * `done - including persistence in supabase storage`
* Routing.
    * 3rd party authentication - Supabase.
        * `done`
            * `registration and login`
    * Deployment (e.g. Vercel)
        * `done`

Outstanding (90+)

Features:

* Backend persistence using Supabase - e.g. Favourites, Fantasy movie.
    * `done` - persistence of favourite movies/ tv series/ actors/ fantasy movies (including movie poster and cast avatars)/ playlists per logged in user (each user has their own set of data)
* Rich feature set - `up to the lecturer to decide. Some extra features included`:
    * `navbar not showing private routes when not logged in`
    * `uncluttered navbar in wide view -> dropdowns for themed pages (e.g. movies)`
