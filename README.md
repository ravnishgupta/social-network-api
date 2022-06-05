# Social Network API
An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Technologies Used
- Javascript
- Mongoose
- MongoDB
- Express

## Videos
### NPM start and `GET` routes for all and sigle `users` and all and single `thoughts` being tested in Insomnia
https://user-images.githubusercontent.com/34320760/172070567-b016d31b-0808-4723-9eb2-aec6b06112a4.mp4


### `POST`, `PUT`, and `DELETE` routes for `users` and `thoughts` being tested in Insomnia
https://user-images.githubusercontent.com/34320760/172070573-35afd24b-c953-4d59-ae9f-87cbdb97ace9.mp4



### `POST` and `DELETE` routes for a user’s `friend` list being tested in Insomnia
https://user-images.githubusercontent.com/34320760/172070578-65d08370-cb9a-4d40-a26e-2ae32e26609c.mp4


### `POST` and `DELETE` routes for `reactions` to `thoughts` being tested in Insomnia.
https://user-images.githubusercontent.com/34320760/172070582-a7ba83dd-461d-4a51-ab7a-dfd1cf402bc3.mp4

## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```
