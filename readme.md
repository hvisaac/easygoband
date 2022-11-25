# EASYGOBAND TEST ( ZOMBIE APOCALIPSIS API )

## HOST

---

> **LOCAL**
```
http://localhost:3000
```

> **AWS**

```
https://w08ugzz2g2.execute-api.us-east-1.amazonaws.com/dev
```

## ADD SURVIVOR

---

> **ENDPOINT**

- POST
```
/survivors/add-survivor
```

> **REQUEST** 

```json
{
    "survivor": {
        "name": "Isaac",
        "age": 26,
        "gender": "Male",
        "lastLocation": {
            "latitude": 12.23,
            "longitude": 14.123
        }
    },
    "inventory": {
        "water": 30,
        "food": 30,
        "medication": 21,
        "ammunition": 110
    }
}
```

> **RESPONSE**

```json
{
    "data": {
        "survivor": {
            "name": "Isaac",
            "age": 26,
            "gender": "Male",
            "lastLocation": {
                "latitude": 12.23,
                "longitude": 14.123
            },
            "infected": false,
            "_id": "63812efa0d952997171bc62e",
            "__v": 0
        },
        "inventory": {
            "idUser": "63812efa0d952997171bc62e",
            "water": 30,
            "food": 30,
            "medication": 21,
            "ammunition": 110,
            "available": true,
            "_id": "63812efa0d952997171bc630",
            "__v": 0
        }
    },
    "status": 201
}
```

## UPDATE SURVIVOR LOCATION

---

> **ENDPOINT**

- PUT

```
/survivors/update-survivor-location/{id}'
```

> **REQUEST**

```json
{
    "latitude": 13.23,
    "longitude": 16.123
}
```

> **RESPONSE**

```json
{
    "data": {
        "updatedSurvivor": {
            "lastLocation": {
                "latitude": 13.23,
                "longitude": 16.123
            },
            "_id": "63810c3e34a4aa81fafdefd8",
            "name": "example",
            "age": 13,
            "gender": "Male",
            "infected": true,
            "__v": 0
        }
    },
    "status": 200
}
```

## FLAG SURVIVOR AS INFECTED

---

> **ENDPOINT**

- POST

```
/survivors/flag-survivor
```

> **REQUEST**

```json
{
    "flagedSurvivor": "63812ee80d952997171bc62a",
    "reportingSurvivor": "63810c3e34a4aa81fafdefdc"
}
```

> **RESPONSE**

```json
{
    "data": {
        "infectReport": {
            "flagedSurvivor": "63812ee80d952997171bc62a",
            "reportingSurvivor": "63810c3e34a4aa81fafdefdc",
            "_id": "63812f360d952997171bc63f",
            "__v": 0
        }
    },
    "status": 201
}
```

## TRADE RESOURCES

---

> **ENDPOINT**

- POST

```
/inventory/trade-items
```

> **REQUEST**

```json
{
    "aSurvivor": {
        "id": "63810c3e34a4aa81fafdefd8",
        "items": [
            {
                "name": "medication",
                "cuantity": 1
            },
            {
                "name": "ammunition",
                "cuantity": 1
            }
        ]
    },
    "bSurvivor": {
        "id": "63810c3e34a4aa81fafdefdc",
        "items": [
            {
                "name": "food",
                "cuantity": 1
            }
        ]
    }
}
```

> **RESPONSES**

- Accepted

```json
{
    "data": {
        "trade": true,
        "message": "successful trade"
    },
    "status": 200
}
```

- No points to trade

```json
{
    "data": {
        "trade": false,
        "message": "No points to trade"
    },
    "status": 203
}
```

- Insufficient resource or infected survivor

```json
{
    "data": {
        "trade": false,
        "message": "insufficient resource or infected survivor"
    },
    "status": 203
}
```

## REPORTS

---

### **PERCENTAGE OF INFECTED SURVIVORS**

> **ENDPOINT**

- GET

```
/reports/infecteds
```

> **RESPONSE**

```json
{
    "data": {
        "survivors": 4,
        "infecteds": 2,
        "percentaje": "50%"
    },
    "status": 200
}
```
### **PERCENTAGE OF NON-INFECTED SURVIVORS**

> **ENDPOINT**

- GET

```
/reports/non-infecteds
```

> **RESPONSE**

```json
{
    "data": {
        "survivors": 4,
        "nonInfecteds": 2,
        "percentaje": "50%"
    },
    "status": 200
}
```

### **Average amount of each kind of resource by survivor**

> **ENDPOINT**

- GET

```
/reports/items
```

> **RESPONSE**

```json
{
    "data": {
        "survivors": 2,
        "resourcesPerSurvivor": {
            "water": 30,
            "food": 38.5,
            "medication": 47,
            "ammunition": 32
        }
    },
    "status": 200
}
```

### **LOSED POINTS BECAUSE OF INFECTED SURVIVOR**

> **ENDPOINT**

- GET

```
/reports/losed-points
```

> **RESPONSE**

```json
{
    "data": {
        "losedPoints": 201
    },
    "status": 200
}
```

