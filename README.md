# F1 Dashboard - Code Test

This deliverable follows all the requirements of the documentation presented. Furthermore, there is also the ability to configure which season's data to fetch. This functionality is presented at the footer of the main screen on route '/tables'. 

To create the UI, due to time limitations, I used elements from the Angular Material package to offer a more modern/material-style look to the project.

The main component used is the TablesComponent that offers the dashboard and the option to toggle between driver & constructor standings. One issue with this approach and the added functionality of changing the seasonal data is that not all API data follow the same structure for all seasons. More precisely, between the years 1950-1958 the constructor standings don't follow the same pattern and, thus, the respective table isn't populated. This could be fixed if there was more time with a more specific approach to handling these responses from the server for these seasons.

When clicking on the header of the tables, the data are being sorted, with each click the sorting follows the pattern of ascending -> descending -> none. 

There is also a filter for each table. When giving an input without using the dropdown to specify the column, the filtering happens across all columns and changes the dataset to all records that contain the filter value, this happens with every key press. If the dropdown is used then only the values of the specified column are filtered. At this point, if a user has filtered without a specific column in mind and click one from the dropdown menu, then the filtering happens without any keypress, with the filter value being what was left in the input.

When a row is clicked the user is routed to another component, either the DriverDetails component or the ConstructorDetails component.

As for challenges, the most challenging part was attaching the sorting functionality to the table of drivers, aka the preselected table. Due to the delay from the asynchronous calls and the formation of the driver standings, the sorting was attached only when the list was complete and this was solved using a Subject variable that emitted a boolean value when the list was formed.
