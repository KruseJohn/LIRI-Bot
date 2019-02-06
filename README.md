
# LIRI Bot

### Overview

LIRI (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters and gives you back data. This app uses axios to retrieve data from Bands in Town, OMDB and Spotify. 


#### To retrieve a listing of upcoming concerts from a specific band/artist enter:

``` node liri.js concert-this <enter in specific band/artist>```

![concert-this command](https://github.com/KruseJohn/LIRI-Bot/blob/master/Images/concert.gif)
<br>
<br>
#### To retrieve song info from your favorite track enter:

``` node liri.js spotify-this-song <enter song>```

  * This will display 10 results of the song you requested...

![spotify-this-song command](https://github.com/KruseJohn/LIRI-Bot/blob/master/Images/spotify.gif)
<br>
<br>
#### If no song is provided then the program will default to "The Sign" by Ace of Base.

  * In such a case, 10 results for "The Sign" will be displayed...

![spotify-this-song default command](https://github.com/KruseJohn/LIRI-Bot/blob/master/Images/spotify-default.gif)
<br>
<br>
#### To retrieve movie info from your favorite film enter:

``` node liri.js movie-this <enter movie name>```

![movie-this command](https://github.com/KruseJohn/LIRI-Bot/blob/master/Images/movie.gif)
<br>
<br>
#### If no movie is provided then the program will output data for the movie 'Mr. Nobody.'

![movie-this default command](https://github.com/KruseJohn/LIRI-Bot/blob/master/Images/movie-default.gif)
<br>
<br>
#### Bonus command --- Using the fs Node package, LIRI will take the text stored inside of a file and use it to call one of LIRI's commands.

  * It should run spotify-this-song for "I Want it That Way."

Enter the following command:

``` node liri.js do-what-it-says```

![do command](https://github.com/KruseJohn/LIRI-Bot/blob/master/Images/do.gif)