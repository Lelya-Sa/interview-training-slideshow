# MVC Model - Interview Material

## Definition
MVC (Model-View-Controller) is an architectural pattern that separates an application into three interconnected components: Model, View, and Controller.

## Components

### Model
- **Responsibility**: Business logic and data management
- **Contains**: Data structures, database interactions, business rules
- **Does NOT**: Handle user interface or user input
- **Examples**: Database queries, data validation, business logic

### View
- **Responsibility**: User interface presentation
- **Contains**: UI components, templates, presentation logic
- **Does NOT**: Contain business logic
- **Examples**: HTML templates, React components, UI rendering

### Controller
- **Responsibility**: Intermediary between Model and View
- **Contains**: Request handling, input processing, coordination
- **Does NOT**: Contain business logic or presentation
- **Examples**: Route handlers, request processing, response formatting

## Flow

1. **User Action**: User interacts with View
2. **Controller**: Receives input, processes request
3. **Model**: Controller updates/retrieves data from Model
4. **View Update**: Model changes trigger View update
5. **Response**: Updated View presented to user

## Benefits

- **Separation of Concerns**: Each component has single responsibility
- **Maintainability**: Changes isolated to specific components
- **Testability**: Components can be tested independently
- **Reusability**: Models and Views can be reused
- **Scalability**: Easy to extend and modify

## Variations

### MVP (Model-View-Presenter)
- Presenter replaces Controller
- View is passive, Presenter handles logic
- Better for desktop applications

### MVVM (Model-View-ViewModel)
- ViewModel replaces Controller
- Two-way data binding
- Common in frameworks like Angular

## Use Cases

- Web applications
- Desktop applications
- Mobile applications
- Any application needing clear separation

## Example Structure

```
app/
├── models/          # Data and business logic
├── views/           # UI components
└── controllers/    # Request handling
```

