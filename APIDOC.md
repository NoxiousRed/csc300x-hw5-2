# *jokebook* API Documentation

## Endpoint 1 - Jokebook Categories

**Request Format:**  
/jokebook/categories

**Request Type:**  
GET

**Returned Data Format:**  
JSON

**Description:**  
Retrieves a list of possible categories in the jokebook.

**Example Request:**  
GET /jokebook/categories

**Example Response:**  
```json
["funnyJoke", "lameJoke"]
```

**Error Handling:**  
No specific error handling for this endpoint.

## Endpoint 2 - Jokes in a Category

**Request Format:**  
/jokebook/joke/:category Query Parameter: 'limit' (optional)

**Request Type:**  
GET

**Returned Data Format:**  
JSON

**Description:**  
Retrieves a list of jokes from the specified category.

**Example Request:**  
GET /jokebook/joke/funnyJoke?limit=2

**Example Response:**  
```json
[
    {
        "joke": "Why did the student eat his homework?",
        "response": "Because the teacher told him it was a piece of cake!"
    },
    {
        "joke": "What kind of tree fits in your hand?",
        "response": "A palm tree"
    }
]
```

**Error Handling:**  
If the specified category does not exist:
```json
{"error": "no category listed for [category]"}
```

## Endpoint 3 - Add a New Joke

**Request Format:**  
/jokebook/joke/new

**Request Type:**  
POST

**Returned Data Format:**  
JSON

**Description:**  
Adds a new joke to the specified category.

**Example Request:**  
POST /jokebook/joke/new  
Content-Type: application/json    
```json
{
    "category": "lameJoke",
    "joke": "Why didn’t the skeleton cross the road?",
    "response": "He didn't have the guts"
}
```

**Example Response:**  
```json
[
    {
        "joke": "Why didn’t the skeleton cross the road?", 
        "response": "He didn't have the guts"
    }
]
```

**Error Handling:**  
If any required parameter is missing or invalid category is provided:
```json
[
    {"error": "invalid or insufficient user input"}
]
```