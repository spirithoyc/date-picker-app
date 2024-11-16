# date-picker-app

# How to run 
1. Clone the repository and start npm project
   ```bash
   git clone git@github.com:spirithoyc/date-picker-app.git
   cd date-picker-app
   npm install
   npm start
   ```
2. Open browser http://localhost:3000

# Folder structure

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


# Component date-picker
![alt text](image-1.png)
## composed
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

## functions
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

# Learning Journey 
### Stage 0: 
Review pure JavaScript, CSS, and jQuery basics. **Output**: `test.html`

| #  | **QQ**                                                                                                                                                    |
|----|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | html5 root tag|
| 2 | import jQuery|
| 3 | jQuery create div component|
| 4 | 修改 CSS style row flex, column 平均寬度比重|
| 5 | background color 如果要有選取的 style, CSS attr 應該為何|
| 6 | 如何讓 `newColumn.css({"background-color": 'red'})` 不蓋掉 hover 的動畫|
| 7 | 如何增加 onclick，實現以下需求：|
|   | - 點擊後 `css = selected`|
|   | - 有無類似 `.calendar-column:selected` 的做法，避免重複定義 `.calendar-column` 和 `.calendar-column-selected`|
| 8 | 將 `const months = ["Jan", "Feb", ...]` 修改為完整月份名稱|
| 9 | css pointer
|10 | 如何用 css 定義一個 div 使他的 child 按照每列四個換行 ex 
|   | 1 2 3 4 
|   | 5 6 7 8
|11 | const calendar = {'year': 2024, 'month': 1, 'start': 0, 'days': 28,'selected': 10} 我只要改其中某個值怎麼寫? `{...calendar, {'month': 2}}`?
---



### Stage 1 

| #  | **QQ**                                                                                                                                                    |
|----|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | QQ1                                                                                                                             |
| 2  | QQ2                                                                                                                      |
| 3  | QQ3                                                                                                   |
