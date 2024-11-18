# date-picker-app

## Demo
[Demo page](https://spirithoyc.github.io/date-picker-app/)

## How to run 
1. Clone the repository and start npm project
   ```bash
   git clone git@github.com:spirithoyc/date-picker-app.git
   cd date-picker-app
   npm install
   npm start
   ```
2. Open browser http://localhost:3000

## Folder structure

- src
    - App.jsx
    - index.js
    - components
        - date-picker
            - date-picker.css
            - date-picker.js
        - DatePicker.jsx
    - style
        - App.css


## Component date-picker
![alt text](image-1.png)
### composed
- `<div class="date-picker"/>`
  - `<input type="text" placeholder="yyyy-mm-dd"/>`
  - `<div class="calendar"/>`
    - `<div class="calendar-control-bar"/>`  
        - `<div class="calendar-prev"/>`  
        **Content**: `&lt;` (left arrow).
        - `<div class="calendar-title"/>`  
        - `<div class="calendar-next"/>`  
        **Content**: `&gt;` (right arrow).
    - `<div class="calendar-container"></div>`  
        **Description**: Contains the calendar view, such as days, months, or years.

### functions
```
renderCalendar(data:object, unit:str)
renderCalendarDay(data:object)
renderCalendarMonth(data:object)
renderCalendarYear(data:object)
onSelect(date:str)
onClickCalendarTitle(data:object, unit:str)
onClickPrev(data:object)
onClickNext(data:object)
getCurrDate():str //yyyymmdd
getCurrYear():int
getCurrMonth():int //0~12
getWeekDayIndex(date:str):int //0~6
getDaysOfMonth(date:str):int //28~31
```
## Learning Journey 

### Stage 0
Recap pure JavaScript, CSS, and jQuery basics.  
**Output**: [Test Page](https://spirithoyc.github.io/date-picker-app/test.html)

### Stage 1
Learn how to build a React app without using the `create-react-app` command: set up `webpack.config.js`, build the app using `npm`, and configure the `dist` folder with `bundle.js`.  
Create a GitHub repository and publish the app using `gh-pages`.

### Stage 2
Re-structure the app according to React principles:  
- Move render logic to `DatePicker.jsx`  
- Place utility functions for date counting and parsing into `component/date-picker-utils.js`  
- Organize CSS files in `date-picker.css`  

### Stage 3
Implement basic logic including element display, hide, and control.  
Define and apply CSS styles.

### Stage 4
Use GPT to adjust the CSS file, including removing redundant selectors and creating a responsive style for mobile display.

### Stage 5 
**Practicing efficiently generating basic functionality for a component with GPT's assistance.**

Utilize the complete DatePicker to query Earthquake data via API:  
`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateBegin}&endtime=${dateEnd}`  

Provide clear instructions for GPT to generate:  
- `models/earthquake.js`:  
    - Fetch data  
    - Parse data with a predefined format  
- `Earthquake.jsx`  
- `component/earthquake/earthquake.css`  















