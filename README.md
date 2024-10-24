# Spirii Code Challenge

Livnote: It's been great fun working this example and learning to use NestJS was a treat.

To start this project run `npm start` then navigate to http://localhost:3000/api# for the full OpenAPI experience or http://localhost:3000/api-json for the following json document:

```json
{
  "openapi": "3.0.0",
  "paths": {
    "/users/updateTransactions": {
      "post": {
        "operationId": "UserController_updateTransactions",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/users/{userId}": {
      "get": {
        "operationId": "UserController_findUser",
        "parameters": [
          {
            "name": "userId",
            "required": true,
            "in": "path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    },
    "/users/requestedPayouts": {
      "post": {
        "operationId": "UserController_getRequestedPayouts",
        "parameters": [],
        "responses": {
          "201": {
            "description": ""
          }
        }
      }
    },
    "/users": {
      "get": {
        "operationId": "UserController_getAllUsers",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        }
      }
    }
  },
  "info": {
    "title": "Amazing User Aggregation Api",
    "description": "The Users API description",
    "version": "1.0",
    "contact": {}
  },
  "tags": [],
  "servers": [],
  "components": {
    "schemas": {}
  }
}
```

## Future Testing Strategy

With more time and effort two kinds of tests should be implemented: Testing of business logic and end to end integration testing.
For the former there should be a clear distinction in what is worth testing and what is not: Testing the business critical function `addUserBalances` should be done with great care and attention, whereas `getRandomTransactionType` can be safely left along as the type system ensures functionality at all times.
The exception to this is if you wish to do testing lock-in, i.e. implementing tests as a layer of control against future developer intervention.

Integrations testing for a service such as this would mean building a testing scenario where the rest endpoints are tested with both positive result and negative result tests so that we ensure functionality is covered both in use cases and failure cases.
This would also be a future point of development where errors in code are handling and reported upwards as their respective http codes, 200, 404, etc. so that end users be they developers, third party developers or customers never, ever see a 500 Server Error.

## Leadership Case: Technical Alignment

Typically, queues are used as message carriers with one kind of schematic object in each queue or topic with segregation between topics as objects, in simpler terms: One queue carries only one kind of information.
Additionally messages in queues should only contain enough meaningful information that the receiving part is not overwhelmed, if e.g. a message is very large with multiple nested collections or carrying a collection of types then the receiver is suddenly responsible for interpreting data which should be avoided at all costs.

Alignment for queues and messages should happen between stakeholders so that the sending and receiving party agree on which messages are sent and on which terms.
In general, I would caution against organization wide mandates for message contents.
Metadata should be aligned across the entire organization, as should the terms of contents, but the specifics should be handled by individual or team stakeholders. 
In order to help facilitate these transactions I would involve the required parties, as few as possible, and align them on queue content.
It is imperative that as few people are involved as possible as multiple stakeholders will often have opposing ideas.
Instead, if two receiving parties are oppositional in how their messages should be structured or their contents the sending party should simply post their messages on two queues. 
This will ensure teams can easily and most importantly quickly move forward instead of spending time on a compromise that may not suit either.
