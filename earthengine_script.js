var palette = [
  "#ffff64", "#ffff64", "#ffff00", "#aaf0f0", "#4c7300", "#006400", "#a8c800", "#00a000", 
  "#005000", "#003c00", "#286400", "#285000", "#a0b432", "#788200", "#966400", "#964b00", 
  "#966400", "#ffb432", "#ffdcd2", "#ffebaf", "#ffd278", "#ffebaf", "#00a884", "#73ffdf", 
  "#9ebb3b", "#828282", "#f57ab6", "#66cdab", "#444f89", "#c31400", "#fff5d7", "#dcdcdc", 
  "#fff5d7", "#0046c8", "#ffffff", "#ffffff"
];

// Function to recode class values into sequential values starting from 1 onwards
var recodeClasses = function(image) {
  // Define the class values
  var classes = [10, 11, 12, 20, 51, 52, 61, 62, 71, 72, 81, 82, 91, 92, 120, 121, 122, 
                130, 140, 150, 152, 153, 181, 182, 183, 184, 185, 186, 187, 190, 200, 
                201, 202, 210, 220, 0];
  var reclassed = image.remap(classes, ee.List.sequence(1, classes.length));
  return reclassed;
};

// Function to add a layer with given settings
var addLayer = function(image, name) {
  Map.centerObject(roi,10)
  Map.addLayer(image, {palette: palette}, name,false);
};

// Apply the function to your images and add layers
addLayer(recodeClasses(five_year.mosaic().select('b1')).clip(roi), 'GLC FCS 1985');
// addLayer(recodeClasses(five_year.mosaic().select('b2')).clip(roi), 'GLC FCS 1990',false);
// addLayer(recodeClasses(five_year.mosaic().select('b3')).clip(roi), 'GLC FCS 1995',false);
// // Load the GLC-FCS30D collection
var image = annual.mosaic();

// Iterate over each band (year) in the image
for (var i = 1; i <= 23; i++) {
  var year = 1999 + i; // starts at year 2000 for annual maps
  var layerName = "GLC FCS " + year.toString();
  var band = image.select("b" + i);
  
  // Apply the function to the band and add layer
  addLayer(recodeClasses(band).clip(roi), layerName);
}

// Define a dictionary for legend and visualization
var dict = {
  "names": [
    "Rainfed cropland",
    "Herbaceous cover cropland",
    "Tree or shrub cover (Orchard) cropland",
    "Irrigated cropland",
    "Open evergreen broadleaved forest",
    "Closed evergreen broadleaved forest",
    "Open deciduous broadleaved forest (0.15<fc<0.4)",
    "Closed deciduous broadleaved forest (fc>0.4)",
    "Open evergreen needle-leaved forest (0.15< fc <0.4)",
    "Closed evergreen needle-leaved forest (fc >0.4)",
    "Open deciduous needle-leaved forest (0.15< fc <0.4)",
    "Closed deciduous needle-leaved forest (fc >0.4)",
    "Open mixed leaf forest (broadleaved and needle-leaved)",
    "Closed mixed leaf forest (broadleaved and needle-leaved)",
    "Shrubland",
    "Evergreen shrubland",
    "Deciduous shrubland",
    "Grassland",
    "Lichens and mosses",
    "Sparse vegetation (fc<0.15)",
    "Sparse shrubland (fc<0.15)",
    "Sparse herbaceous (fc<0.15)",
    "Swamp",
    "Marsh",
    "Flooded flat",
    "Saline",
    "Mangrove",
    "Salt marsh",
    "Tidal flat",
    "Impervious surfaces",
    "Bare areas",
    "Consolidated bare areas",
    "Unconsolidated bare areas",
    "Water body",
    "Permanent ice and snow",
    "Filled value"
  ],
  "colors": [
    "#ffff64",
    "#ffff64",
    "#ffff00",
    "#aaf0f0",
    "#4c7300",
    "#006400",
    "#a8c800",
    "#00a000",
    "#005000",
    "#003c00",
    "#286400",
    "#285000",
    "#a0b432",
    "#788200",
    "#966400",
    "#964b00",
    "#966400",
    "#ffb432",
    "#ffdcd2",
    "#ffebaf",
    "#ffd278",
    "#ffebaf",
    "#00a884",
    "#73ffdf",
    "#9ebb3b",
    "#828282",
    "#f57ab6",
    "#66cdab",
    "#444f89",
    "#c31400",
    "#fff5d7",
    "#dcdcdc",
    "#fff5d7",
    "#0046c8",
    "#ffffff",
    "#ffffff",
    "#ffffff"
  ],
  "classes":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
  19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
};

var legend = ui.Panel({
  style: {
    position: 'middle-right',
    padding: '8px 15px'
  }
});

// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'GLC FCS Classes',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);

var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);

  // Creates and styles 1 row of the legend.
  // Creates and styles 1 row of the legend.
var makeRow = function(color, name, classNum) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });

  // Create the label filled with the description text and class number.
  var description = ui.Label({
    value: classNum + ': ' + name,
    style: { margin: '0 0 4px 6px' }
  });

  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

var palette = dict['colors'];
var names = dict['names'];
var classes = dict['classes'];
loading.style().set('shown', false);

for (var i = 0; i < names.length; i++) {
  legend.add(makeRow(palette[i], names[i], classes[i]));
}

print(legend);

// Function to recode class values into sequential values starting from 1 onwards
var recodeClasses = function(image) {
  // Define the class values
  var classes = [10, 11, 12, 20, 51, 52, 61, 62, 71, 72, 81, 82, 91, 92, 120, 121, 122,
                130, 140, 150, 152, 153, 181, 182, 183, 184, 185, 186, 187, 190, 200,
                201, 202, 210, 220, 0];
  var reclassed = image.remap(classes, ee.List.sequence(1, classes.length));
  return reclassed;
};

var addLayer = function(image, name) {
  Map.centerObject(roi,8)
  Map.addLayer(image, {palette:palette}, name, false);
};


// Define the Jodhpur city boundary
var jodhpurBoundary = roi
// Define the function to calculate class area
var calculateClassArea = function(image, boundary) {
  var classAreas = ee.Image.pixelArea().addBands(reclassed).reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'reclassed'
    }),
    geometry: roi,
    scale: 30,
    maxPixels: 1e10,
    bestEffort: true
  });

  return classAreas;
};

// Loop through the years
for (var i = 0; i < 23; i++) {
  var year = 2000 + i; // starts at year 2000 for annual maps
  var layerName = "GLC FCS " + year.toString();
  var band = image.select("b" + (i + 1)); // Adjusting index to start from 1
  // Apply the function to the band
  var reclassed = recodeClasses(band);
 
  // Clip the image to the Jodhpur city boundary
  var clipped = reclassed.clip(roi);
 
  // Add the clipped image as a layer
  //addLayer(clipped, layerName);
 
  // Calculate the area for each class
  var areas = calculateClassArea(clipped, roi);

  // Get class-wise areas
  var classAreas = ee.List(areas.get('groups'))

  // Process class-wise areas
  var classAreaLists = classAreas.map(function(item) {
    var areaDict = ee.Dictionary(item)
    var classNumber = ee.Number(areaDict.get('reclassed')).format()
    var area = ee.Number(areaDict.get('sum')).divide(1e6).format('%.2f') // converting to km²
    return ee.List([classNumber, area])
  });

  // Flatten and print the result for the current year
  var result = ee.Dictionary(classAreaLists.flatten())
  // print(layerName, result);
}


// <<---Time Series Calculation--->>//

// Function to calculate the area of class 34 for a given image
var calculateClass34Area = function(image) {
  var class34 = image.eq(31); // Select pixels of class 34
  var areaImage = class34.multiply(ee.Image.pixelArea()).divide(1e6); // Convert to square kilometers
  var area = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: roi,
    scale: 30,
    maxPixels: 1e10,
    bestEffort: true
  }).get('remapped');
  return ee.Number(area);
};

// // List to store areas
var areas = [];

// // Iterate over each band (year) in the image and calculate the area
for (var i = 1; i <= 23; i++) {
  var year = 1999 + i; // starts at year 2000 for annual maps
  var band = image.select("b" + i);
  var reclassedBand = recodeClasses(band).clip(roi);
  var area = calculateClass34Area(reclassedBand);
  areas.push(ee.Feature(null, {'year': year, 'area': area}));
}

// // Convert the list to a FeatureCollection
var areaFeatureCollection = ee.FeatureCollection(areas);

// // Create a chart
var chart = ui.Chart.feature.byFeature(areaFeatureCollection, 'year', 'area')
  .setChartType('LineChart')
  .setOptions({
    title: 'Selected Class Change Over Years',
    hAxis: {title: 'Year'},
    vAxis: {title: 'Area (sq kilometers)'},
    lineWidth: 1,
    pointSize: 4,
  });
// Print the chart
print(chart);
