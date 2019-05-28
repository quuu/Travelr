# Travelr
Light-weight single page used to display important locations on an interactive map (travels/vacations) with descriptions and pictures

Not meant to be a stand alone application, meant to be an addition to an existing webpage 


## Frameworks:

- `Vue.js` used as the way of displaying the JSON location data by using directives and templates
- `Bootstrap` used for responsiveness and layout of the side bar and main content

## API's:

- A map tile layer service (I use [Mapbox](https://www.mapbox.com/))
  - `config.js` which contains 
   ``` 
        var config = {

          MAPBOX_KEY: 'your key',
          OPENCAGEDATA_KEY: 'your key'
  
        };
    ```
  - For simplicity of data entry, I use OpenCageData to fetch the coordinates of a location by name.


## Example `sample.json`:

- The format of the JSON data for the application to read in
- TODO: more details

# Screenshots:

![Sample Data](/screenshots/ss.png)
