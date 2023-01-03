# Swiggy-food-delivery

####Introduction####
___________________________________________________________________________
This is a food browsing and ordering backend REST API.

####Features####
___________________________________________________________________________

>> It consists of multiple food categories to choose from with collection of food items inside each category section.

>> A user can access more details about a specific food with additional information and food image provided.

>> It has secure way to authenticate user logins and signups with persistence using Json Web Token mechanism.

>> User credentials are entirely safe with the use of hashing function inside database and are not stored in plain text.

####Technologies Used####

Javascript, Typescript, NodeJs, ExpressJs, JWT, Bcrypt, Prisma ORM, MySQL database

####Usage####
_____________________________________________________________________________

REST API Endpoints:

UnAuthorized Requests:

USERS:
______________________________________________________________________________
GET /users/						

// Gets information of all users inside database.

GET /users/getUser/:id			

// Gets information about a specific user.

POST /users/createUser			

// Creates user post verifying if the all the mandatory fields like firstname,  unique email & password are filled up.

PUT /users/updateUser/:id		

// Updates user details like firstname & lastname.

DELETE /users/deleteUser/:id	

// Deletes a specific user with specified id in request params.

FOODS:
______________________________________________________________________________
GET /foods/						

// Gets information about all food items inside database.

GET /foods/getFood/:id			

// Gets information about a specific food item.

GET /foods/:categoryid			

// Gets information about foods of a specific category.

CATEGORY:
______________________________________________________________________________
GET /categories/				

// Gets a list of all categories.

GET /categories/getCategory/:id		

// Gets a specific category.

Authorized Requests:

FOODS:
_______________________________________________________________________________
POST /foods/createFood			

// Creates new food item and requires logged in admin level priviledges.

PUT /foods/updateFood/:id		

// Updates existing food item and requires logged in admin level priviledges.

DELETE /foods/deleteFood/:id	

// Deletes existing food item and requires logged in admin level priviledges.

CATEGORY:
________________________________________________________________________________
POST /categories/createCategory		

// Creates new category and requires logged in admin level priviledges.

PUT /categories/updateCategory/:id		

// Updates existing category and requires logged in admin level priviledges.

DELETE /categories/deleteCategory/:id	

// Deletes existing category and requires logged in admin level priviledges.

CART:
________________________________________________________________________________
GET /cart/						
// Gets a list of food items added to cart and requires logged in user.

POST /cart/addItem/:foodid		
// Adds a food item to user specific cart and requires logged in user.

PUT /cart/deleteItem/:foodid	
// Removes food item from user cart and requires logged in user.

