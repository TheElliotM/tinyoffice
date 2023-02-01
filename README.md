# Tiny Office
Tiny Office is a TAMUhack 2023 Project that sorts teams into office floors based on sizing, capacities, and working preferences.
This was done in collaboration with Elliot Michlin, Salina Teng, Andrew Zheng, Summer Wong.

Try It (hosted on Microsoft Azure) -> [Live Link](https://ambitious-mud-0168f4010.2.azurestaticapps.net/)
View Our Submission Page -> [DevPost](https://devpost.com/software/tiny-office-6i9ekx#updates)

## Inspiration
We were inspired by the challenging and logical nature, as well as the applicability, of the CBRE sponsor challenge. Optimization is necessary in order to create a more productive, efficient, and healthy work place, which our application aims to solve. We were eager to try our hand at tackling this problem in order to effect positive change through our project.

## What it does
Our application allows the user to input the building floors and teams needed to be assigned to said floors. After the user inputs the data, our algorithm takes in the data and outputs the floor-team combination with the highest "SNL score" - our term for the combined weightings of the space-score (measures the amount of space taken), the number-score (measures the total number of teams in the building), and the like-score (measures the relationships between team pairings on each floor). In addition, our project also provides the user with saving and loading features.

![An image showing the website. There are three sections: a table to input team preferences, a table to input floor sizes, and a generate button.](https://x.xcal.dev/msedge_4xcAfV%202.png)

## How we built it
We built our application using ReactJS + TailwindCSS for the front end and Flask for the back end. In addition, MongoDB hosted save data for users behind keys that a user recieves once a configuration is built to their liking. We then hosted our application through Microsoft Azure cloud services and our domain on domain.com.

## Challenges we ran into
Since we were all first time hackers, we ran into challenges of coordination and tasks. We managed to solve this by coming together hourly and updating each other on our progress, as well as assigning tasks in GitHub Projects and figuring out next steps.

## Accomplishments that we're proud
TAMU Hackathon 2023 is the very first hackathon for all four members of our team. Despite our inexperience, we managed to thoroughly prepare ourselves with this event. We started off the hackathon by breaking down our schedule for the entire 24 hours, which included the brainstorming stage, set up services, and coding periods. We all split up the work that each member does. One member was in charge of designing the database, the other created the algorithm needed for the web application, and another member took care of the UI design. We all were dedicated and focused on our tasks the entire 24 hours.

## What we learned
When it came to the backend development of our project, we learned how to use MongoDB to design the database. MongoDB was unlike other databases that we have experience with such as Microsoft SQL server, so we had to do a lot of researching to learn how to work with the special relational features of MongoDB such as creating collections. 

## What's next for Tiny Office
Our next steps for Tiny Office involves adding an interactive floor viewer and finalizing the integration of save/load functionality into the front end. In addition, we need to add additional safegaurds to the API to prevent abuse.
