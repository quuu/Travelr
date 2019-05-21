# Travelr
Light-weight web application to display important locations on a map (travels/vacations) with descriptions and pictures


## Requrements:

- A map tile layer service (I use [Mapbox](https://www.mapbox.com/))
  - `config.js` which contains 
   ``` 
        var config = {

          MAPBOX_KEY: 'your key',
          OPENCAGEDATA_KEY: 'your key'
  
        };
    ```
  - For simplicity of data entry, I use OpenCageData to fetch the coordinates of a location by name.


## Example data.json:

- The format of the JSON data for the application to read in
