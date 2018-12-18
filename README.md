# Amazon_Data_Visualization

## Project presentation

### Technical Setup

You can easilly visit the website hosted on Github through: https://data-visualization-epfl.github.io/Amazon_Data_Visualization/.

You can also use a python server to serve the website. First clone the repository:

```
git clone https://github.com/Data-Visualization-EPFL/Amazon_Data_Visualization.git
cd Amazon_Data_Visualization
```

Then start the server:

```
python server.py
```

The server will be available on: http://localhost:8000/

### Intended usage

This presentation is composed of 2 different parts:
* A Map where you will see the different data evolves
* An information card composed of 5 tabs:
  * AOI: The area of interest with some extra information
  * Agriculture: Emphasasing the agriculture activity consequences on the area
  * Water: Showing the water presence and rivers in the area
  * Mines: Understanding the forest destruction meant to mines exploitation
  * Map Items: Where you will be able to display the several data

By moving from one tab to another, the map adapts itself to display the interesting data
related to the current tab category. The last tab: Map Items is a dashboard that allow you
to independantly select the data and display them through a checkbox. Thanks to that, you can
easilly overlaps several layers on the map in order to make your own conclusion.


## Hand ins

### Process Book (35%)

PDF file wrapping the following ideas:
- What am I trying to show?
- Where does it come from, what are the processing steps?
- What visualization have we used to gain insights on the dataset?

justify the design decision:
- What are the different visualizations we considered?
- include sketches, wireframes, etc...
- Is it different from the initial proposal?

Implementation:
- Describe the intent and functionality of the interactive visualization implemented.
- Clean and well-references images showing the key design and interaction elements.

Evalutation:
- What did we learn about the data by using our visualizations?
- How well does your visualization work and how could you further improve it?

### Website, presentation, screencast (15%)

Website:
- Accessible throught "https://data-visualization-epfl.github.io/Amazon_Data_Visualization/"

Screencast:
- Present a 2 minutes video showing the demonstration of the project
