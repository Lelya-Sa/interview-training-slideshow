# MVC Model - Interview Questions

## Questions (1-10)

### 1. What is the MVC pattern? Explain its components.
**Answer:** MVC separates application into:
- **Model**: Business logic and data
- **View**: User interface
- **Controller**: Handles input and coordinates Model/View

### 2. Explain the flow of data in MVC.
**Answer:** User → View → Controller → Model → Controller → View → User

### 3. What are the benefits of MVC?
**Answer:** Separation of concerns, maintainability, testability, reusability, scalability

### 4. What is the difference between MVC and MVP?
**Answer:** MVP uses Presenter (handles all logic) instead of Controller. View is passive in MVP.

### 5. What is the difference between MVC and MVVM?
**Answer:** MVVM uses ViewModel with two-way data binding. Common in Angular, Vue.

### 6. Can a Model directly update a View?
**Answer:** No, Model should not know about View. Controller coordinates updates.

### 7. Where does business logic belong in MVC?
**Answer:** Business logic belongs in Model, not Controller or View.

### 8. What is the role of Controller in MVC?
**Answer:** Controller handles user input, processes requests, coordinates Model and View.

### 9. How does MVC improve testability?
**Answer:** Components are separated, can be tested independently with mocks.

### 10. Give an example of MVC in a web application.
**Answer:** 
- **Model**: User data, database queries
- **View**: HTML templates, React components
- **Controller**: Express routes, request handlers

